import { IAppException } from "./iapp_exception";

export class UserNotFoundException extends IAppException {
  constructor(response?: any) {
    super(response || "User not found.", 404);
  }
}
