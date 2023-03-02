import { Request, Response } from "express";

import { ErrorGenerator } from "../models/responseModel";

function authHeaderMiddleware(req: Request, res: Response, next: any) {
  try {
    const authKey = req.headers["authorization"];
    if (authKey != process.env["AUTH_KEY"]) {
      return res.json(
        ErrorGenerator(403, "Unauthorized access", "auth key is invalid")
      );
    } else {
      next();
    }
  } catch (e) {
    return res.json(ErrorGenerator(500, JSON.stringify(e), "Exception occurs"));
  }
}

export default authHeaderMiddleware;
