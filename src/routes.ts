import {
  UserController,
  UserControllerActions,
} from "./controller/user_controller";
import { Methods } from "./config/enums";
import {
  AuthController,
  AuthControllerActions,
} from "./controller/auth_controller";
import {
  WalletController,
  WalletControllerActions,
} from "./controller/wallet_controller";

export const Routes = [
  {
    method: Methods.GET,
    route: "/api/v1/users",
    controller: UserController,
    action: UserControllerActions.all,
  },
  {
    method: Methods.GET,
    route: "/api/v1/user",
    controller: UserController,
    action: UserControllerActions.one,
  },
  {
    method: Methods.POST,
    route: "/api/v1/signup",
    controller: AuthController,
    action: AuthControllerActions.signUp,
  },
  {
    method: Methods.POST,
    route: "/api/v1/signin",
    controller: AuthController,
    action: AuthControllerActions.signIn,
  },
  {
    method: Methods.GET,
    route: "/api/v1/wallets",
    controller: WalletController,
    action: WalletControllerActions.all,
  },
  {
    method: Methods.POST,
    route: "/api/v1/wallets",
    controller: WalletController,
    action: WalletControllerActions.create,
  },
  {
    method: Methods.DELETE,
    route: "/api/v1/wallets/:id",
    controller: WalletController,
    action: WalletControllerActions.remove,
  },
  {
    method: Methods.GET,
    route: "/api/v1/transactions/?tpye=:type&categoryId=:categoryId",
    // controller: TransactionController,
    // action: TransactionControllerActions.all,
  },
  {
    method: Methods.POST,
    route: "/api/v1/transactions",
    // controller: TransactionController,
    // action: TransactionControllerActions.save,
    // body { walletId: required, price: required, type, description }
  },
  {
    method: Methods.PUT,
    route: "/api/v1/transactions/:id",
    // controller: TransactionController,
    // action: TransactionControllerActions.update,
  },
  {
    method: Methods.DELETE,
    route: "/api/v1/transactions/:id",
    // controller: TransactionController,
    // action: TransactionControllerActions.delete,
    // body { price, type, description }
  },
];
