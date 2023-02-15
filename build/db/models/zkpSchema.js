"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const path = require("path");
dotenv_1.default.config({ path: path.resolve(__dirname + "/../../.env") });
const zkpSchema = new mongoose_1.default.Schema({
    walletAddress: {
        type: String,
        length: 64
    },
    tokenClaim: {
        type: String
    },
    createdOn: {
        type: Date,
        immutable: true,
        default: () => Date.now()
    },
    expiryDate: {
        type: Date,
        immutable: true,
        default: () => {
            let date = new Date();
            if (process.env["EXP_DAY"] == null) {
                return date.setSeconds(date.getSeconds() + 20);
            }
            date.setSeconds(date.getSeconds() + parseInt(process.env["EXP_DAY"]));
            return date;
        }
    },
    panCardHash: String,
    aadharCardHash: String,
    chains: [{
            _id: false,
            chainId: String,
            port: {
                type: Boolean,
                default: false
            },
            clone: {
                type: Boolean,
                default: false
            }
        }]
});
const zkpModel = mongoose_1.default.model("zkp-collection", zkpSchema);
exports.default = zkpModel;
