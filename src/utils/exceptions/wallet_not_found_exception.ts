import { IAppException } from "./iapp_exception";

export class WalletNotFoundException extends IAppException {
  constructor(response?: any) {
    super(response || "Wallet not found.", 404);
  }
}
