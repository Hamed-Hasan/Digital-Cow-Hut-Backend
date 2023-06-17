import mongoose, { Schema, Document, Model } from 'mongoose';

export interface OrderDocument extends Document {
  cow: Schema.Types.ObjectId;
  buyer: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema: Schema<OrderDocument> = new Schema<OrderDocument>(
  {
    cow: { type: Schema.Types.ObjectId, ref: 'Cow', required: true },
    buyer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const OrderModel: Model<OrderDocument> = mongoose.model<OrderDocument>('Order', OrderSchema);
