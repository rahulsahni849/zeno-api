"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const zkpSchema = new mongoose_1.default.Schema({
    walletAddress: {
        type: String,
        length: 64
    },
    tokenClaim: {
        type: String,
        expireAfterSeconds: 20
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
            date.setSeconds(date.getSeconds() + 60);
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
