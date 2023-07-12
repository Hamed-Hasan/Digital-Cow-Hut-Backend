"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCow = exports.updateCow = exports.getCowById = exports.getCowsWithFilters = exports.getAllCows = exports.createCow = void 0;
const cowValidation_1 = require("./cowValidation");
const cowModel_1 = __importDefault(require("./cowModel"));
const apiError_1 = require("../../utils/apiError");
const responseHandler_1 = require("../../utils/responseHandler");
const pagination_1 = require("../../paginatioHelper/pagination");
const filter_1 = require("../../paginatioHelper/filter");
const createCow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validatedData = cowValidation_1.createCowSchema.parse(req.body);
        const cow = yield cowModel_1.default.create(validatedData);
        const populatedCow = yield cow.populate('seller');
        (0, responseHandler_1.handleResponse)(res, 201, 'Cow created successfully', populatedCow);
    }
    catch (error) {
        if (error instanceof apiError_1.APIError) {
            (0, responseHandler_1.handleResponse)(res, error.statusCode, error.message);
        }
        else {
            (0, responseHandler_1.handleResponse)(res, 500, 'Internal Server Error');
        }
    }
});
exports.createCow = createCow;
const getAllCows = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cows = yield cowModel_1.default.find();
        (0, responseHandler_1.handleResponse)(res, 200, 'Cows retrieved successfully', cows);
    }
    catch (error) {
        (0, responseHandler_1.handleResponse)(res, 500, 'Internal Server Error');
    }
});
exports.getAllCows = getAllCows;
const getCowsWithFilters = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { skip, pageSize, sortOptions } = (0, pagination_1.parsePaginationParams)(req);
        const filter = (0, filter_1.buildFilterObject)(req);
        const cows = yield cowModel_1.default.find(filter)
            .sort(sortOptions)
            .skip(skip)
            .limit(pageSize);
        const totalDocs = yield cowModel_1.default.countDocuments(filter);
        const totalPages = Math.ceil(totalDocs / pageSize);
        const response = {
            docs: cows,
            totalDocs,
            totalPages,
        };
        (0, responseHandler_1.handleResponse)(res, 200, 'Cows retrieved successfully', response);
    }
    catch (error) {
        (0, responseHandler_1.handleResponse)(res, 500, 'Internal Server Error');
    }
});
exports.getCowsWithFilters = getCowsWithFilters;
// export const getCowById = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { id } = req.params;
//     const cow (id); // Assuming getCowById is defined somewhere
//     if (!cow) {
//       throw new APIError(404, 'Cow not found');
//     }
//     handleResponse(res, 200, 'Cow retrieved successfully', cow);
//   } catch (error) {
//     if (error instanceof APIError) {
//       handleResponse(res, error.statusCode, error.message);
//     } else {
//       handleResponse(res, 500, 'Internal Server Error');
//     }
//   }
// };
const getCowById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const cow = yield cowModel_1.default.findById(id);
        if (!cow) {
            throw new apiError_1.APIError(404, 'Cow not found');
        }
        (0, responseHandler_1.handleResponse)(res, 200, 'Cow retrieved successfully', cow);
    }
    catch (error) {
        if (error instanceof apiError_1.APIError) {
            (0, responseHandler_1.handleResponse)(res, error.statusCode, error.message);
        }
        else {
            (0, responseHandler_1.handleResponse)(res, 500, 'Internal Server Error');
        }
    }
});
exports.getCowById = getCowById;
const updateCow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const validatedData = req.body;
        console.log(id);
        console.log(validatedData);
        const cow = yield cowModel_1.default.findByIdAndUpdate(id, validatedData, { new: true });
        if (!cow) {
            throw new apiError_1.APIError(404, 'Cow not found');
        }
        (0, responseHandler_1.handleResponse)(res, 200, 'Cow updated successfully', cow);
    }
    catch (error) {
        if (error instanceof apiError_1.APIError) {
            (0, responseHandler_1.handleResponse)(res, error.statusCode, error.message);
        }
        else {
            (0, responseHandler_1.handleResponse)(res, 500, 'Internal Server Error');
        }
    }
});
exports.updateCow = updateCow;
const deleteCow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const cow = yield cowModel_1.default.findByIdAndDelete(id);
        if (!cow) {
            throw new apiError_1.APIError(404, 'Cow not found');
        }
        (0, responseHandler_1.handleResponse)(res, 200, 'Cow deleted successfully', cow);
    }
    catch (error) {
        if (error instanceof apiError_1.APIError) {
            (0, responseHandler_1.handleResponse)(res, error.statusCode, error.message);
        }
        else {
            (0, responseHandler_1.handleResponse)(res, 500, 'Internal Server Error');
        }
    }
});
exports.deleteCow = deleteCow;
