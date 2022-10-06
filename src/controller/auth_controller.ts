import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/user_service";
import { IAppException } from "../utils/exceptions/iapp_exception";
import { PasswordIncorrectException } from "../utils/exceptions/password_incorrect_exception";
import { RequiredFieldsAreMissingException } from "../utils/exceptions/required_fields_are_missing_excepion";
import { UserAlreadyExistException } from "../utils/exceptions/user_already_exist_exception";
import { UserNotFoundException } from "../utils/exceptions/user_not_found_exception";
import { exceptionHandler } from "../utils/helper/exception_handler";
import { checkPwd } from "../utils/helper/password_hash";
import { generateToken } from "../utils/helper/token_generator";
import { UserController } from "./user_controller";

export class AuthController {
  private userController = new UserController();
  private userService = new UserService();

  async signUp(request: Request, response: Response, next: NextFunction) {
    try {
      const { username, password, fullName } = request.body;
      if (!username || !password || !fullName)
        throw new RequiredFieldsAreMissingException(null, [
          "username",
          "password",
          "fullName",
        ]);

      const existUser = await this.userService.findUserViaUsername(username);
      if (existUser) throw new UserAlreadyExistException();

      const user = await this.userController.save(request, response, next);

      const token = generateToken(username);
      delete user.password;
      return { ...user, token: token };
    } catch (err) {
      return exceptionHandler(err, response);
    }
  }

  async signIn(request: Request, response: Response, next: NextFunction) {
    try {
      const { username, password } = request.body;
      if (!username || !password)
        throw new RequiredFieldsAreMissingException(null, [
          "username",
          "password",
        ]);

      const user = await this.userService.findUserViaUsername(username);
      if (!user) throw new PasswordIncorrectException();

      const isPwdCorrect = await checkPwd(password, user.password);
      if (!isPwdCorrect) throw new PasswordIncorrectException();

      const token = generateToken(username);
      delete user.password;
      return { ...user, token };
    } catch (err: any) {
      return exceptionHandler(err, response);
    }
  }
}

export enum AuthControllerActions {
  signUp = "signUp",
  signIn = "signIn",
}
