import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/user";
import { UserService } from "../services/user_service";
import { checkTokenAndGetUser } from "../utils/helper/check_token_and_get_user";
import { exceptionHandler } from "../utils/helper/exception_handler";

export class UserController {
  private userRepository = AppDataSource.getRepository(User);
  private userService = new UserService();

  async all(request: Request, response: Response, next: NextFunction) {
    const users = await this.userRepository.find({
      select: {
        id: true,
        username: true,
        fullName: true,
      },
    });
    return { message: "Success", data: users };
  }

  async save(request: Request, response: Response, next: NextFunction) {
    return this.userService.create(request.body);
  }

  async one(request: Request, response: Response, next: NextFunction) {
    try {
      return await checkTokenAndGetUser(request.headers.authorization);
    } catch (err) {
      return exceptionHandler(err, response);
    }
  }

  async sum(request: Request, response: Response, next: NextFunction) {
    return this.userService.sum(request, response);
  }
}

export enum UserControllerActions {
  all = "all",
  save = "save",
  one = "one",
  sum = "sum",
}
