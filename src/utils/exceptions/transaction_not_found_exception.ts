import { IAppException } from "./iapp_exception";

export class TransactionNotFoundException extends IAppException {
  constructor(response?: any) {
    super(response || "Transaction not found.", 404);
  }
}
