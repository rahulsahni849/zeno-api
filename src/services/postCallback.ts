import getRawBody from "raw-body";
import { Response, Request } from "express";
import { auth, resolver, loaders } from "@iden3/js-iden3-auth";

import { requestMap } from "../utils";
import { AuthorizationResponseMessage } from "@iden3/js-iden3-auth/dist/cjs/protocol";

let counter = 1;

const postCallback = async (req: Request, res: Response) => {
  // Get session ID from request
  const sessionId = req.query.sessionId;

  // get JWZ token params from the post request
  const raw = await getRawBody(req);
  const tokenStr = raw.toString().trim();

  // fetch authRequest from sessionID
  const authRequest = requestMap.get(`${sessionId}`);

  // Locate the directory that contains circuit's verification keys
  const verificationKeyloader = new loaders.FSKeyLoader("../data");

  const sLoader = new loaders.UniversalSchemaLoader("ipfs.io");

  // Add Polygon Mumbai RPC node endpoint - needed to read on-chain state and identity state contract address
  const ethStateResolver = new resolver.EthStateResolver(
    "https://polygon-mainnet.g.alchemy.com/v2/DIcaFByhk8o3CRGtSCYebcOMHDGtpc1L",
    "0xb8a86e138C3fe64CbCba9731216B1a638EEc55c8"
  );

  // EXECUTE VERIFICATION
  const verifier = new auth.Verifier(
    verificationKeyloader,
    sLoader,
    ethStateResolver
  );

  let authResponse: AuthorizationResponseMessage;

  try {
    authResponse = await verifier.fullVerify(tokenStr, authRequest);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
  
  console.log("chalra hai");
  counter++;

  return res
    .status(200)
    .set("Content-Type", "application/json")
    .send("user with ID: " + authResponse.from + " Succesfully authenticated");
};

export default postCallback;
