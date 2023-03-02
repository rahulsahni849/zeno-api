import { Request, Response } from "express";

import zkpSchema from "../../models/zkp.schema";
import { IToken, ITokenModel } from "../../interfaces/token";
import { walletVerifier } from "../../services/walletVerifier";
import { ErrorGenerator, ResultGenerator } from "../../models/responseModel";

class WalletVerifierController {
  public postTokenClaim = async (req: Request, res: Response) => {
    try {
      const { walletAddress, tokenClaim, panCardHash, aadharCardHash, chains } =
        req.body as ITokenModel;

      if (!walletVerifier(walletAddress)) {
        return res
          .status(400)
          .json(
            ErrorGenerator(400, "Bad request", "Wallet address is not valid")
          );
      }

      const prevToken: IToken | null = await zkpSchema.findOne({
        walletAddress,
      });

      if (prevToken) {
        if (prevToken.expiryDate.getTime() >= new Date().getTime()) {
          return res.json(
            ResultGenerator(200, prevToken, "Token already exists")
          );
        } else {
          await zkpSchema.deleteOne(prevToken);
        }
      }

      const token = new zkpSchema({
        walletAddress,
        tokenClaim,
        panCardHash,
        aadharCardHash,
      });

      token.chains = chains;

      return token
        .save()
        .then((value) => {
          res.json(ResultGenerator(201, value, "Token Successfully saved"));
        })
        .catch((err) => {
          return res.json(
            ErrorGenerator(500, err, "Error while saving the document")
          );
        });
    } catch (err) {
      return res.send(500).json(ErrorGenerator(500, err, "Exception occurs"));
    }
  };

  public getTokenClaim = async (req: Request, res: Response) => {
    try {
      const walletAddress = req.params["walletAddress"]?.toString();

      if (!walletAddress) {
        return res
          .status(400)
          .json(
            ErrorGenerator(400, "Bad request", "WalletAddress is not specified")
          );
      }

      if (!walletVerifier(walletAddress)) {
        return res
          .status(400)
          .json(
            ErrorGenerator(400, "Bad request", "Wallet address is not valid")
          );
      }

      const token: IToken | null = await zkpSchema.findOne({
        walletAddress,
      });

      if (!token) {
        return res
          .status(404)
          .json(ErrorGenerator(404, "Not found", "Token not found"));
      }

      if (token.expiryDate.getTime() < new Date().getTime()) {
        return res
          .status(404)
          .json(ErrorGenerator(404, "Not found", "Token not found"));
      }

      return res.json(ResultGenerator(200, token, "Token found"));
    } catch (err) {
      return res.send(500).json(ErrorGenerator(500, err, "Exception occurs"));
    }
  };
}

export default WalletVerifierController;
