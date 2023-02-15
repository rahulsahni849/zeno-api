"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const walletVerifyRoutes_1 = __importDefault(require("./routers/walletVerifyRoutes"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const path = require("path");
const AuthHeaderVerifierMiddleware_1 = __importDefault(require("./middlewares/AuthHeaderVerifierMiddleware"));
const contractRoute_1 = __importDefault(require("./routers/contractRoute"));
dotenv_1.default.config({ path: path.resolve(__dirname + '/../.env') });
const app = (0, express_1.default)();
const port = process.env["PORT"] || 5000;
let db_url = process.env["ISDEVELOPMENT"] ? process.env["DEV_DB_URL"] : process.env["PROD_DB_URL"];
console.log(db_url);
mongoose_1.default.set('strictQuery', false);
mongoose_1.default.connect(db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    try {
        if (err) {
            throw err;
        }
        console.log("db got connected!");
    }
    catch (e) {
        console.log("error", e);
    }
});
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api/v1/zkp/", AuthHeaderVerifierMiddleware_1.default, walletVerifyRoutes_1.default);
app.use("/api/v1/zkp/", AuthHeaderVerifierMiddleware_1.default, contractRoute_1.default);
app.get('/', (req, res) => {
    res.send('Home Route');
});
app.listen(port, () => {
    console.log(`server is listening on ${port}`);
});
