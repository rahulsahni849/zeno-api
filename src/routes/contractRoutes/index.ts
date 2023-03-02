import { Router } from "express";
import ContractController from "../../controllers/ContractController";

const ContractRouter: Router = Router();
const contractController = new ContractController();

ContractRouter.post("/contract", contractController.addContract);
ContractRouter.get("/contract/:chainId", contractController.getContract);

export default ContractRouter;
