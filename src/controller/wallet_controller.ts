import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { WalletService } from "../services/wallet_service";
import { checkTokenAndGetUser } from "../utils/helper/check_token_and_get_user";
import { exceptionHandler } from "../utils/helper/exception_handler";
import { RequiredFieldsAreMissingException } from "../utils/exceptions/required_fields_are_missing_excepion";

export class WalletController {
  private walletService = new WalletService();

  async all(request: Request, response: Response, next: NextFunction) {
    try {
      const user = await checkTokenAndGetUser(request.headers.authorization);

      const wallets = await this.walletService.all(user.id);
      return { message: "Success", data: wallets };
    } catch (err) {
      return exceptionHandler(err, response);
    }
  }

  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const user = await checkTokenAndGetUser(request.headers.authorization);

      return this.walletService.create(request.body, user.id);
    } catch (err) {
      return exceptionHandler(err, response);
    }
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    try {
      const user = await checkTokenAndGetUser(request.headers.authorization);

      const { id } = request.params;
      if (!id) throw new RequiredFieldsAreMissingException(null, ["id"]);

      return this.walletService.remove(request.params.id);
    } catch (err) {
      return exceptionHandler(err, response);
    }
  }
}

export enum WalletControllerActions {
  all = "all",
  create = "create",
  remove = "remove",
}
