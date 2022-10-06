import { IAppException } from "./iapp_exception";

export class PasswordIncorrectException extends IAppException {
  constructor(message?: any) {
    super(message || "login or password is invalid!", 401);
  }
}
