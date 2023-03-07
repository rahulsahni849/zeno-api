import { Router } from "express";
import PolygonIDController from "../../controllers/PolygonIDController";

const polygonIDRouter: Router = Router();

// ContractRouter.post("/contract", contractController.addContract);
// ContractRouter.get("/contract/:chainId", contractController.getContract);

polygonIDRouter.get("/event", PolygonIDController.getEvent);
polygonIDRouter.get("/sign-in", PolygonIDController.signIn);
polygonIDRouter.post("/callback", PolygonIDController.callBack);

export default polygonIDRouter;
