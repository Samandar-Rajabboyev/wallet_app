import { IAppException } from "./iapp_exception";

export class UnauthorizedException extends IAppException {
  constructor(response?: any) {
    super(response || "Unauthorized!", 401);
  }
}
