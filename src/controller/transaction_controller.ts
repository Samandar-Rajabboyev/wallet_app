import { NextFunction, Request, Response } from "express";
import { TransactionService } from "../services/transaction_service";
import { RequiredFieldsAreMissingException } from "../utils/exceptions/required_fields_are_missing_excepion";
import { checkTokenAndGetUser } from "../utils/helper/check_token_and_get_user";
import { exceptionHandler } from "../utils/helper/exception_handler";

export class TransactionController {
  private transactionService = new TransactionService();

  async all(request: Request, response: Response, next: NextFunction) {
    try {
      const walletId = request.query.walletId;
      const type: any = request.query.type;

      const user = await checkTokenAndGetUser(request.headers.authorization);

      const transactions = await this.transactionService.all(
        user.id,
        walletId,
        type
      );

      return { message: "Success", data: transactions };
    } catch (err) {
      return exceptionHandler(err, response);
    }
  }

  async save(request: Request, response: Response, next: NextFunction) {
    return this.transactionService.save(request, response);
  }

  async update(request: Request, response: Response, next: NextFunction) {
    return this.transactionService.update(request, response);
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    return this.transactionService.remove(request, response);
  }
}

export enum TransactionControllerActions {
  all = "all",
  save = "save",
  update = "update",
  remove = "remove",
}
