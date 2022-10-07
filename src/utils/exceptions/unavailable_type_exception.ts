import { IAppException } from "./iapp_exception";

export class UnavailableTypeException extends IAppException {
  constructor(response?: any) {
    super(response || "Unavailable type!", 400);
  }
}
