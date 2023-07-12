"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsePaginationParams = void 0;
const parsePaginationParams = (req) => {
    const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc', } = req.query;
    const pageNumber = Number(page);
    const pageSize = Number(limit);
    const skip = (pageNumber - 1) * pageSize;
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;
    return {
        skip,
        pageSize,
        sortOptions,
    };
};
exports.parsePaginationParams = parsePaginationParams;
