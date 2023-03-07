import ContractRouter from "./contractRoutes";
import WalletRouter from "./walletVerifyRoutes";
import polygonIDRouter from "./polygonIdRoutes";

const routes = {
  ContractRoute: ContractRouter,
  WalletVerfierRoute: WalletRouter,
  PolygonIDRoute: polygonIDRouter
};

export default routes;
