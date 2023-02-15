"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.walletVerifier = void 0;
const web3_1 = __importDefault(require("web3"));
const walletVerifier = (tokenid) => {
    try {
        let valid = web3_1.default.utils.isAddress(tokenid);
        return valid;
    }
    catch (e) {
        return e;
    }
};
exports.walletVerifier = walletVerifier;
