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
const zkpSchema_1 = __importDefault(require("../db/models/zkpSchema"));
const walletVerifier_1 = require("../services/walletVerifier");
const responseModel_1 = require("../db/models/responseModel");
const verfierRoute = (0, express_1.Router)();
verfierRoute.post("/token", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!(0, walletVerifier_1.walletVerifier)(req.body["walletAddress"])) {
            return resp.json((0, responseModel_1.ErrorGenerator)(400, "Bad request", "Wallet address is not valid"));
        }
        let prevToken = yield zkpSchema_1.default.findOne({ walletAddress: req.body["walletAddress"] });
        console.log(prevToken);
        let token;
        if (prevToken != null) {
            if (prevToken.expiryDate.getTime() >= new Date().getTime()) {
                return resp.json((0, responseModel_1.ResultGenerator)(200, prevToken, "Token already exists"));
            }
            else {
                console.log("deleting time");
                yield zkpSchema_1.default.deleteOne(prevToken);
            }
        }
        console.log("generation");
        token = new zkpSchema_1.default({
            walletAddress: req.body["walletAddress"],
            tokenClaim: req.body["tokenClaim"],
            panCardHash: req.body["panCardHash"],
            aadharCardHash: req.body["aadharCardHash"],
        });
        let chains = Array.from(req.body["chains"]);
        token.chains = chains;
        return token.save().then((value) => {
            console.log(value);
            resp.json((0, responseModel_1.ResultGenerator)(201, value, "Token Successfully saved"));
        }).catch((err) => {
            return resp.json((0, responseModel_1.ErrorGenerator)(500, err, "Error while saving the document"));
        });
    }
    catch (e) {
        return resp.json((0, responseModel_1.ErrorGenerator)(500, e, "Exception occurs"));
    }
}));
verfierRoute.get("/token/:walletAddress", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        let wallet = (_a = req.params["walletAddress"]) === null || _a === void 0 ? void 0 : _a.toString();
        if (wallet == null) {
            return resp.json((0, responseModel_1.ErrorGenerator)(400, "Bad request", "WalletAddress is not specified"));
        }
        if (!(0, walletVerifier_1.walletVerifier)(wallet)) {
            return resp.json((0, responseModel_1.ErrorGenerator)(400, "Bad request", "Wallet address is not valid"));
        }
        let token = yield zkpSchema_1.default.findOne({ walletAddress: wallet });
        if (token == null) {
            return resp.json((0, responseModel_1.ErrorGenerator)(404, "Not found", "Token does not exists"));
        }
        if (token.expiryDate.getTime() >= new Date().getTime()) {
            return resp.json((0, responseModel_1.ResultGenerator)(200, token, "Token found"));
        }
        return resp.json((0, responseModel_1.ErrorGenerator)(404, "Not found", "Either token doesn't exists or it got expire"));
    }
    catch (error) {
        return resp.json((0, responseModel_1.ErrorGenerator)(500, error, "Exception occurs"));
    }
}));
exports.default = verfierRoute;
