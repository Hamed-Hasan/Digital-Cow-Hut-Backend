"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildFilterObject = void 0;
const buildFilterObject = (req) => {
    const { minPrice, maxPrice, location, searchTerm, } = req.query;
    const filter = {};
    if (minPrice) {
        filter.price = { $gte: Number(minPrice) };
    }
    if (maxPrice) {
        filter.price = Object.assign(Object.assign({}, filter.price), { $lte: Number(maxPrice) });
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
exports.buildFilterObject = buildFilterObject;
