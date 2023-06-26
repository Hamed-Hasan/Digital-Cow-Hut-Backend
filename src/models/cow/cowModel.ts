import mongoose, { Schema, Document, Model } from 'mongoose';
import { BreedEnum, CategoryEnum, LabelEnum, LocationEnum } from './cowConstants';

export interface CowDocument extends Document {
  name: string;
  age: number;
  price: number;
  location: string;
  breed: string;
  weight: number;
  label: string;
  category: string;
  seller: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const CowSchema: Schema<CowDocument> = new Schema<CowDocument>({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  price: { type: Number, required: true },
  location: { type: String, enum: Object.values(LocationEnum), required: true },
  breed: { type: String, enum: Object.values(BreedEnum), required: true },
  weight: { type: Number, required: true },
  label: { type: String, enum: Object.values(LabelEnum), default: LabelEnum.ForSale },
  category: { type: String, enum: Object.values(CategoryEnum), required: true },
  seller: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const CowModel: Model<CowDocument> = mongoose.model<CowDocument>('Cow', CowSchema);

export default CowModel;
