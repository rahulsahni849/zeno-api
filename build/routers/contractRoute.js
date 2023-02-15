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
const mongoose_1 = require("mongoose");
const ContractRoute = (0, express_1.Router)();
ContractRoute.post("/contract", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let chainId = req.body["chainId"];
        let chain = yield chainContractSchema_1.default.findOne({ chainId: chainId });
        console.log(chain);
        if (chain != null) {
            let contracts = req.body["contractAddress"];
            if (contracts.length > 0) {
                let allContracts = new Set([...contracts, ...chain.contractAddress]);
                chain.contractAddress = [...allContracts];
                chain.save();
                return resp.json(chain);
            }
            return resp.json({
                data: chain,
                message: "chain already exists!"
            });
        }
        let newChain;
        console.log("generation");
        newChain = new chainContractSchema_1.default({
            chainId: req.body["chainId"],
            contractAddress: req.body["contractAddress"]
        });
        newChain.save().then((value) => {
            console.log(value);
            resp.json({
                data: value,
                statusCode: 201
            });
        }).catch((err) => {
            resp.json({
                message: err.message,
                errorStack: err.stack,
                statusCode: 500
            });
        });
    }
    catch (e) {
        resp.send(500).json({
            error: e,
            status: 500
        });
    }
}));
ContractRoute.get("/contract/:chainId", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        let chainId = (_a = req.params["chainId"]) === null || _a === void 0 ? void 0 : _a.toString();
        if (chainId == null) {
            resp.send("bad request");
            return;
        }
        let chain = yield chainContractSchema_1.default.findOne({ chainId: chainId });
        console.log(chain);
        if (chain == null) {
            return resp.send("Chain Id doesn't exists!");
        }
        resp.json(chain);
    }
    catch (error) {
        let message = {
            error: mongoose_1.Error.Messages,
            status: 500
        };
        resp.json(message);
    }
}));
exports.default = ContractRoute;
