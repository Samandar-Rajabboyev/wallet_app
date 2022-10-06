import { IAppException } from "./iapp_exception";

export class TodoNotFoundException extends IAppException {
  constructor(response?: any) {
    super(response || "Todo not found.", 404);
  }
}
