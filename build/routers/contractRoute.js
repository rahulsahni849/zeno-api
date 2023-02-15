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
const express_1 = require("express");
const chainContractSchema_1 = __importDefault(require("../db/models/chainContractSchema"));
const responseModel_1 = require("../db/models/responseModel");
const ContractRoute = (0, express_1.Router)();
ContractRoute.post("/contract", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let chainId = req.body["chainId"];
        let chain = yield chainContractSchema_1.default.findOne({ chainId: chainId });
        if (chain != null) {
            let contracts = req.body["contractAddress"];
            let intersectionContracts = contracts.filter((address) => !(chain === null || chain === void 0 ? void 0 : chain.contractAddress.includes(address)));
            if (intersectionContracts.length > 0) {
                let allContracts = new Set([...intersectionContracts, ...chain.contractAddress]);
                chain.contractAddress = [...allContracts];
                chain.save();
                return resp.json((0, responseModel_1.ResultGenerator)(200, chain, "Contract addresses added"));
            }
            return resp.json((0, responseModel_1.ResultGenerator)(200, chain, "Chain already exists"));
        }
        let newChain;
        newChain = new chainContractSchema_1.default({
            chainId: req.body["chainId"],
            contractAddress: req.body["contractAddress"]
        });
        return newChain.save().then((value) => {
            return resp.json((0, responseModel_1.ResultGenerator)(201, value, "Chain Successfully saved"));
        }).catch((err) => {
            return resp.json((0, responseModel_1.ErrorGenerator)(500, err, "Error while saving the document"));
        });
    }
    catch (err) {
        return resp.send(500).json((0, responseModel_1.ErrorGenerator)(500, err, "Exception occurs"));
    }
}));
ContractRoute.get("/contract/:chainId", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        let chainId = (_a = req.params["chainId"]) === null || _a === void 0 ? void 0 : _a.toString();
        if (chainId == null) {
            return resp.json((0, responseModel_1.ErrorGenerator)(400, "Bad request", "Chain Id parameter is null"));
        }
        let chain = yield chainContractSchema_1.default.findOne({ chainId: chainId });
        if (chain == null) {
            return resp.json((0, responseModel_1.ErrorGenerator)(404, "Not found", "Chain doesn't exists"));
        }
        return resp.json((0, responseModel_1.ResultGenerator)(200, chain, "Chain found"));
    }
    catch (error) {
        return resp.json((0, responseModel_1.ErrorGenerator)(500, error, "Exception occurs"));
    }
}));
exports.default = ContractRoute;
