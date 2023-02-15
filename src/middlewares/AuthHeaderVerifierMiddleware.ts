import dotenv from 'dotenv';
import { Request, Response } from 'express';
import path = require('path');

dotenv.config({ path:path.resolve(__dirname+'/../.env')})


function authHeaderMiddleware(req:Request, res:Response, next:any) {
  try {
    const authKey = req.headers["authorization"]
    if (authKey!=process.env["AUTH_KEY"]) {
      throw 'Unauthorized attempt!';
    } else {
      next();
    }
  } catch(e) {
    res.status(401).json({
        error:e,
        status:401,
    })
    }
}


export default authHeaderMiddleware;