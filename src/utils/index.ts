import { Response } from "express";

const SEND_INTERVAL: number = Number(process.env.SEND_INTERVAL) || 1000;

export const writeEvent = (res: Response) => {
    res.write("Status : Done");
};

export const sendEvent = (res: Response) => {
    res.writeHead(200, {
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      "Content-Type": "text/event-stream",
    });
  
    setInterval(() => {
      writeEvent(res);
    }, SEND_INTERVAL);
  
    writeEvent(res);
  };

export const requestMap = new Map();