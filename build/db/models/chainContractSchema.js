"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const zkpSchema = new mongoose_1.default.Schema({
    chainId: String,
    contractAddress: [String],
    createdOn: {
        type: Date,
        default: () => Date.now()
    }
});
const contractChainModel = mongoose_1.default.model("chain-collection", zkpSchema);
exports.default = contractChainModel;
