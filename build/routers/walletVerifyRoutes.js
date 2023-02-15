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
const mongoose_1 = require("mongoose");
const verfierRoute = (0, express_1.Router)();
verfierRoute.post("/token", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!(0, walletVerifier_1.walletVerifier)(req.body["walletAddress"])) {
            resp.send("Wallet address is not valid!");
            return;
        }
        let prevToken = yield zkpSchema_1.default.findOne({ walletAddress: req.body["walletAddress"] });
        console.log(prevToken);
        let token;
        if (prevToken != null) {
            if (prevToken.expiryDate.getTime() >= new Date().getTime()) {
                resp.send(prevToken);
                return;
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
        // console.log(token)
        token.save().then((value) => {
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
verfierRoute.get("/token/:walletAddress", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        let wallet = (_a = req.params["walletAddress"]) === null || _a === void 0 ? void 0 : _a.toString();
        if (wallet == null) {
            resp.send("bad request");
            return;
        }
        // console.log(wallet)   
        if (!(0, walletVerifier_1.walletVerifier)(wallet)) {
            resp.send("Wallet address is not valid!");
            return;
        }
        let token = yield zkpSchema_1.default.findOne({ walletAddress: wallet });
        // console.log(token)
        if (token == null) {
            return;
        }
        if (token.expiryDate.getTime() >= new Date().getTime()) {
            resp.send(token);
            return;
        }
        // console.log(token)
        resp.send("No token exists!");
        // let etherBalance = await getEtherBalance(wallet)
        // let chainid =await getChainIds(wallet)
        // resp.send(`
        //     Ether balance: ${etherBalance}
        //     chainId: ${chainid}
        // `)
    }
    catch (error) {
        let message = {
            error: mongoose_1.Error.Messages,
            status: 500
        };
        resp.json(message);
    }
}));
exports.default = verfierRoute;
