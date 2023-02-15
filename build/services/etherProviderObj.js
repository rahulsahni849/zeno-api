"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const web3_1 = __importDefault(require("web3"));
let provider = "https://mainnet.infura.io/v3/117c62fb9d0a4d4d85cfc5fe57197eed";
var web3_pack = new web3_1.default(provider);
exports.default = web3_pack;
