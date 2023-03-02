import { Router } from "express";
import WalletVerifierController from "../../controllers/WalletVerifierController";

const VerifierRouter: Router = Router();
const walletVerifierController = new WalletVerifierController();

VerifierRouter.post("/token", walletVerifierController.postTokenClaim);
VerifierRouter.get(
  "/token/:walletAddress",
  walletVerifierController.getTokenClaim
);

export default VerifierRouter;
