import { Response, Request } from "express";

import { sendEvent } from "../../utils";
import getAuthRequest from "../../services/getAuthRequest";
import postCallback from "../../services/postCallback";

class PolygonIDController {
  public static async getEvent(req: Request, res: Response) {
    try {
      if (req.headers.accept === "text/event-stream") {
        sendEvent(res);
      } else {
        res.json({ message: "Ok" });
      }
    } catch (err) {
      console.error(err);
    }
  }

  public static async signIn(req: Request, res: Response) {
    try {        
      getAuthRequest(req, res);
    } catch (err) {
      console.error(err);
    }
  }

  public static async callBack(req: Request, res: Response) {
    try {
      postCallback(req, res);
    } catch (err) {
      console.error(err);
    }
  }
}

export default PolygonIDController;
