import { IAppException } from "./iapp_exception";

export class UserAlreadyExistException extends IAppException {
  constructor(response?: any) {
    super(response || "User already exists!", 400);
  }
}
