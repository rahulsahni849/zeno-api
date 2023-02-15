"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path = require("path");
const responseModel_1 = require("../db/models/responseModel");
dotenv_1.default.config({ path: path.resolve(__dirname + '/../.env') });
function authHeaderMiddleware(req, res, next) {
    try {
        const authKey = req.headers["authorization"];
        if (authKey != process.env["AUTH_KEY"]) {
            return res.json((0, responseModel_1.ErrorGenerator)(403, "Unauthorized access", "auth key is invalid"));
        }
        else {
            next();
        }
    }
    catch (e) {
        return res.json((0, responseModel_1.ErrorGenerator)(500, JSON.stringify(e), "Exception occurs"));
    }
}
exports.default = authHeaderMiddleware;
