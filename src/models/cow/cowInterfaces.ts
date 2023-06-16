import { LocationEnum, BreedEnum, LabelEnum, CategoryEnum } from './cowConstants';

export interface Cow {
  _id: string;
  name: string;
  age: number;
  price: number;
  location: keyof typeof LocationEnum;
  breed: keyof typeof BreedEnum;
  weight: number;
  label: keyof typeof LabelEnum;
  category: keyof typeof CategoryEnum;
  seller: string;
  createdAt: Date;
  updatedAt: Date;
}
