import { v4 as uuidv4 } from "uuid";
import { Request, Response } from "express";
import { auth, resolver, loaders } from "@iden3/js-iden3-auth";

const requestMap = new Map();

// Audience is verifier id
const hostUrl = "https://polygonid.onrender.com";
const sessionId = uuidv4();
const callbackURL = "/api/callback";

// Create a map to store the auth requests and their session IDs
const audience = "113J1L2koQMHB2dzFqFw5Q252rykoikBnrjHFqRUQG";

const getAuthRequest = async (req: Request, res: Response) => {

  const uri = `${hostUrl}${callbackURL}?sessionId=${sessionId}`;

  // Generate request for basic authentication
  const request = auth.createAuthorizationRequest("test flow", audience, uri);

  request.id = "29593465-c364-4522-8aa3-983756603c25";
  request.thid = "29593465-c364-4522-8aa3-983756603c25";

  // Store auth request in map associated with session ID
  requestMap.set(`${sessionId}`, request);

  return res.status(200).set("Content-Type", "application/json").send(request);
};

export default getAuthRequest;
