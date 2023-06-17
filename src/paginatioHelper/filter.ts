import { Request } from 'express';

export const buildFilterObject = (req: Request) => {
  const {
    minPrice,
    maxPrice,
    location,
    searchTerm,
  } = req.query as {
    minPrice?: string,
    maxPrice?: string,
    location?: string,
    searchTerm?: string,
  };

  const filter: any = {};

  if (minPrice) {
    filter.price = { $gte: Number(minPrice) };
  }

  if (maxPrice) {
    filter.price = { ...filter.price, $lte: Number(maxPrice) };
  }

  if (location) {
    filter.location = { $regex: location, $options: 'i' };
  }

  if (searchTerm) {
    filter.$or = [
      { location: { $regex: searchTerm, $options: 'i' } },
      { breed: { $regex: searchTerm, $options: 'i' } },
      { category: { $regex: searchTerm, $options: 'i' } },
    ];
  }

  return filter;
};
