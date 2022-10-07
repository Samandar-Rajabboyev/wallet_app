import { IAppException } from "./iapp_exception";

export class RequiredFieldsAreMissingException extends IAppException {
  constructor(message?: any, fields?: any) {
    super(
      message || {
        message: "important fields are missed!",
        fields: fields || [],
      },
      400
    );
  }
}
