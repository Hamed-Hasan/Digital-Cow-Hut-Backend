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
const app_1 = __importDefault(require("./app"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config");
// import { DATABASE_URL, PORT } from '../config';
let server;
function dataBase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(config_1.DATABASE_URL);
            console.log('🛢 Database is connected successfully');
            server = app_1.default.listen(config_1.PORT, () => {
                console.log(`Digital Cow Hut Backend on port ${config_1.PORT}`);
            });
            process.on('SIGTERM', () => {
                console.log('Received SIGTERM. Shutting down gracefully...');
                server.close(() => {
                    console.log('Server closed.');
                    process.exit(0);
                });
            });
            process.on('unhandledRejection', (err) => {
                console.error('Unhandled Promise Rejection:', err);
                process.exit(1);
            });
            process.on('uncaughtException', (err) => {
                console.error('Uncaught Exception:', err);
                process.exit(1);
            });
        }
        catch (err) {
            console.log('Failed to connect to the database', err);
        }
    });
}
dataBase();
