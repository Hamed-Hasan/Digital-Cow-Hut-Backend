import { Request } from 'express';

export const parsePaginationParams = (req: Request) => {
  const {
    page = 1,
    limit = 10,
    sortBy = 'createdAt',
    sortOrder = 'desc',
  } = req.query as {
    page?: string,
    limit?: string,
    sortBy?: string,
    sortOrder?: string,
  };

  const pageNumber = Number(page);
  const pageSize = Number(limit);

  const skip = (pageNumber - 1) * pageSize;

  const sortOptions: Record<string, any> = {};
  sortOptions[sortBy as string] = sortOrder === 'asc' ? 1 : -1;

  return {
    skip,
    pageSize,
    sortOptions,
  };
};
