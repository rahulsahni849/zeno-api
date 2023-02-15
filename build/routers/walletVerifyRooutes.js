"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verfierRoute = (0, express_1.Router)();
verfierRoute.get("/adhaar", (req, resp, next) => {
    resp.send("adhaar endpoint");
    next();
});
verfierRoute.get("/pan", (req, resp) => {
    resp.send("pan endpoint");
});
verfierRoute.get("/wallet", (req, resp) => {
    resp.send("wallet endpoint");
});
exports.default = verfierRoute;
