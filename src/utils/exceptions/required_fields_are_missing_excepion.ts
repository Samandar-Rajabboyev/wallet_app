import { IAppException } from "./iapp_exception";

export class RequiredFieldsAreMissingException extends IAppException {
  constructor(message?: any, fields?: any) {
    super(
      message || {
        message: "all fields are required!",
        fields: fields || [],
      },
      400
    );
  }
}
