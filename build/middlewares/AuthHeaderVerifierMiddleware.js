"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path = require("path");
dotenv_1.default.config({ path: path.resolve(__dirname + '/../.env') });
function authHeaderMiddleware(req, res, next) {
    try {
        const authKey = req.headers["authorization"];
        if (authKey != process.env["AUTH_KEY"]) {
            throw 'Unauthorized attempt!';
        }
        else {
            next();
        }
    }
    catch (e) {
        res.status(401).json({
            error: e,
            status: 401,
        });
    }
}
exports.default = authHeaderMiddleware;
