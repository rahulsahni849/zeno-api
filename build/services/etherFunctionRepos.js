"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChainIds = exports.getEtherBalance = void 0;
const web3_1 = __importDefault(require("web3"));
const etherProviderObj_1 = __importDefault(require("./etherProviderObj"));
function getEtherBalance(address) {
    return new Promise((resolve, reject) => {
        etherProviderObj_1.default.eth.getBalance(address, (err, wei) => {
            if (err) {
                return resolve(err);
            }
            return resolve(web3_1.default.utils.fromWei(wei, 'ether'));
        });
    });
}
exports.getEtherBalance = getEtherBalance;
function getChainIds(address) {
    return new Promise((resolve, reject) => {
        return etherProviderObj_1.default.eth.getChainId((err, version) => {
            if (err) {
                return resolve(err);
            }
            return resolve(version);
        });
    });
}
exports.getChainIds = getChainIds;
