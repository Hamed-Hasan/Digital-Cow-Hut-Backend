import { z } from 'zod';
import { BreedEnum, CategoryEnum, LabelEnum, LocationEnum } from './cowConstants';

const locationValues = Object.values(LocationEnum);
const breedValues = Object.values(BreedEnum);
const labelValues = Object.values(LabelEnum);
const categoryValues = Object.values(CategoryEnum);

export const createCowSchema = z.object({
  name: z.string().nonempty(),
  age: z.number().positive(),
  price: z.number().positive(),
  location: z.enum([...locationValues] as [string, ...string[]]),
  breed: z.enum([...breedValues] as [string, ...string[]]),
  weight: z.number().positive(),
  label: z.enum([...labelValues] as [string, ...string[]]).optional(),
  category: z.enum([...categoryValues] as [string, ...string[]]),
  seller: z.string().nonempty(),
});

export const updateCowSchema = z.object({
    name: z.string().nonempty().optional(),
    age: z.number().positive().optional(),
    price: z.number().positive().optional(),
    location: z.enum(locationValues as [string, ...string[]]).optional(),
    breed: z.enum(breedValues as [string, ...string[]]).optional(),
    weight: z.number().positive().optional(),
    label: z.enum(labelValues as [string, ...string[]]).optional(),
    category: z.enum(categoryValues as [string, ...string[]]).optional(),
  });
  
  