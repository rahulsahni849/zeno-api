import express, { Application, Request, Response, Router } from "express";
import verfierRoute from "./routers/walletVerifyRoutes";
import dotenv from "dotenv";
import mongoose, { ConnectOptions } from "mongoose";
import path = require("path");
import authHeaderMiddleware from "./middlewares/AuthHeaderVerifierMiddleware";
import ContractRoute from "./routers/contractRoute";

dotenv.config({ path: path.resolve(__dirname + "/../.env") });

const app: Application = express();

const port: number | string = process.env["PORT"] || 5000;
const db_url: any =
  process.env.ISDEVELOPMENT === "true"
    ? process.env.DEV_DB_URL
    : process.env.PROD_DB_URL;

mongoose.set("strictQuery", false);

mongoose.connect(
  db_url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions,
  (err) => {
    try {
      if (err) {
        throw err;
      }
      console.log(`connected to DB: ${db_url}`);
    } catch (e) {
      console.log("error", e);
    }
  }
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/zkp/", authHeaderMiddleware, verfierRoute);
app.use("/api/v1/zkp/", authHeaderMiddleware, ContractRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("<h1>This is home endpoint</h1>");
});

app.listen(port, () => {
  console.log(`server is listening on ${port}`);
});
