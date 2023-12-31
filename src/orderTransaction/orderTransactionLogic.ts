import CowModel from "../models/cow/cowModel";
import { OrderModel } from "../models/cowOrderTransaction/OrderModel";
import UserModel from "../models/user/UserModel";
import { APIError } from "../utils/apiError";


export const performTransaction = async (cow: string, buyer: string): Promise<void> => {
  // Check if the cow and buyer exist
  const [existingCow, existingBuyer] = await Promise.all([
    CowModel.findById(cow),
    UserModel.findById(buyer),
  ]);

  if (!existingCow || !existingBuyer) {
    throw new APIError('Cow or buyer not found', 404);
  }

  // Check if the cow is available for sale
  if (existingCow.label !== 'for sale') {
    throw new APIError('The cow is not available for sale', 400);
  }

  // Check if the buyer has enough money to buy the cow
  if (existingBuyer.budget < existingCow.price) {
    throw new APIError('Not enough funds to buy the cow', 400);
  }

  // Start a transaction
  const session = await OrderModel.startSession();
  session.startTransaction();

  try {
    // Update the cow's label to 'sold out'
    existingCow.label = 'sold out';
    await existingCow.save({ session });

    // Deduct the cost from the buyer's budget
    existingBuyer.budget -= existingCow.price;
    await existingBuyer.save({ session });

    // Add the same amount to the seller's income
    const seller = await UserModel.findById(existingCow.seller);
    if (!seller) {
      throw new APIError('Seller not found', 404);
    }
    seller.income += existingCow.price;
    await seller.save({ session });

    // Create the order entry
    const order = await OrderModel.create(
      [
        {
          cow,
          buyer,
        },
      ],
      { session }
    );

    // Commit the transaction
    await session.commitTransaction();

    // End the transaction session
    session.endSession();
  } catch (error) {
    // Rollback the transaction if any error occurs
    await session.abortTransaction();

    // End the transaction session
    session.endSession();

    throw error;
  }
};
