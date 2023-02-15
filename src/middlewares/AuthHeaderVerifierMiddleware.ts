import dotenv from 'dotenv';
import { Request, Response } from 'express';
import path = require('path');
import { ErrorGenerator } from '../db/models/responseModel';
dotenv.config({ path:path.resolve(__dirname+'/../.env')})

function authHeaderMiddleware(req:Request, res:Response, next:any) {
  try {
    const authKey = req.headers["authorization"]
    if (authKey!=process.env["AUTH_KEY"]) {
        return res.json(ErrorGenerator(403,"Unauthorized access","auth key is invalid"))
    } else {
      next();
    }
  } catch(e) {
      return res.json(ErrorGenerator(500,JSON.stringify(e),"Exception occurs"))
    }
}


export default authHeaderMiddleware;