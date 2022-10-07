import { TransactionType } from "../config/enums";
import { AppDataSource } from "../data-source";
import { Transaction } from "../entity/transaction";
import { RequiredFieldsAreMissingException } from "../utils/exceptions/required_fields_are_missing_excepion";
import { UnavailableTypeException } from "../utils/exceptions/unavailable_type_exception";
import { checkTokenAndGetUser } from "../utils/helper/check_token_and_get_user";
import { exceptionHandler } from "../utils/helper/exception_handler";
import { WalletService } from "./wallet_service";

export class TransactionService {
  private transactionRepository = AppDataSource.getRepository(Transaction);
  private walletService = new WalletService();

  async all(userId?: any, walletId?: any, type?: string) {
    return await this.transactionRepository.findBy({
      type: TransactionType[type],
      user: { id: userId },
      wallet: { id: walletId },
    });
  }

  async save(request, response) {
    try {
      const user = await checkTokenAndGetUser(request.headers.authorization);
      const { walletId, amount, type, description } = request.body;
      if (!walletId || !amount)
        throw new RequiredFieldsAreMissingException(null, [
          "walletId",
          "amount",
        ]);

      const typeInEnum = TransactionType[type];
      if (!typeInEnum) throw new UnavailableTypeException();

      await this.walletService.walletExists(walletId);

      const transaction = {
        walletId: walletId,
        userId: user.id,
        amount: amount,
        type: typeInEnum,
        description: description,
      };
      return this.transactionRepository.save(transaction);
    } catch (err) {
      return exceptionHandler(err, response);
    }
  }

  async update(request, response) {
    try {
      const user = await checkTokenAndGetUser(request.headers.authorization);
      const id = request.params.id;
      if (!id)
        throw new RequiredFieldsAreMissingException("id missed!", ["id"]);

      const { amount, type, description, walletId } = request.body;
      if (!amount && !type && !description && !walletId)
        throw new RequiredFieldsAreMissingException("At least one field!", [
          "amount",
          "type",
          "description",
          "walletId",
        ]);

      const typeInEnum = TransactionType[type];
      if (!typeInEnum) throw new UnavailableTypeException();

      await this.walletService.walletExists(walletId);

      return (
        await this.transactionRepository
          .createQueryBuilder()
          .update(Transaction)
          .set({
            amount: amount,
            type: type,
            description: description,
            walletId: walletId,
          })
          .where("id = :id", { id: id })
          .returning("*")
          .execute()
      ).raw[0];
    } catch (err) {
      return exceptionHandler(err, response);
    }
  }

  async remove(request, response) {
    try {
      const user = await checkTokenAndGetUser(request.headers.authorization);
      const id = request.params.id;
      if (!id)
        throw new RequiredFieldsAreMissingException("id missed!", ["id"]);

      const result = await this.transactionRepository
        .createQueryBuilder()
        .delete()
        .from(Transaction)
        .where("transaction.id = :id", {
          id: id,
        })
        .execute();
      return true;
    } catch (err) {
      return exceptionHandler(err, response);
    }
  }

  async sum(userId: number, walletId: number, type) {
    let sumOfAmount;
    if (walletId) {
      sumOfAmount = await this.transactionRepository
        .createQueryBuilder("transaction")
        .select("SUM(transaction.amount)", "sum")
        .addSelect("COUNT(transaction)", "count")
        .where("transaction.userId = :userId", { userId: userId })
        .andWhere("transaction.walletId = :walletId", { walletId: walletId })
        .andWhere("transaction.type = :type", { type: type })
        .getRawOne();
    } else {
      sumOfAmount = await this.transactionRepository
        .createQueryBuilder("transaction")
        .select("SUM(transaction.amount)", "sum")
        .addSelect("COUNT(transaction)", "count")
        .where("transaction.userId = :userId", { userId: userId })
        .andWhere("transaction.type = :type", { type: type })
        .getRawOne();
    }

    return sumOfAmount;
  }
}
