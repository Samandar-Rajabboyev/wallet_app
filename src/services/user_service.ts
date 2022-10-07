import { AppDataSource } from "../data-source";
import { User } from "../entity/user";
import { checkTokenAndGetUser } from "../utils/helper/check_token_and_get_user";
import { exceptionHandler } from "../utils/helper/exception_handler";
import { hashPwd } from "../utils/helper/password_hash";
import { verifyToken } from "../utils/helper/token_generator";
import { TransactionService } from "./transaction_service";

export class UserService {
  private userRepository = AppDataSource.getRepository(User);
  private transactionService = new TransactionService();

  async create(body: { password: string }) {
    body.password = await hashPwd(body.password);
    return this.userRepository.save(body);
  }

  async findUserViaUsername(username: string) {
    return await this.userRepository.findOneBy({ username: username });
  }

  async findUserViaToken(token: string) {
    const username = (await verifyToken(token)).username;
    return await this.userRepository.findOneBy({ username: username });
  }

  async sum(request, response) {
    try {
      const user = await checkTokenAndGetUser(request.headers.authorization);
      const walletId = request.query.walletId;
      const type = request.query.type;

      if (!type) {
        const sumOfIncomes = await this.transactionService.sum(
          user.id,
          walletId,
          "income"
        );
        const sumOfExpanses = await this.transactionService.sum(
          user.id,
          walletId,
          "expanse"
        );
        const sum = sumOfIncomes.sum - sumOfExpanses.sum;

        return {
          sum: sum || 0,
          incomes: {
            sum: +sumOfIncomes.sum || 0,
            count: +sumOfIncomes.count,
          },
          expanses: {
            sum: +sumOfExpanses.sum || 0,
            count: +sumOfExpanses.count,
          },
        };
      } else {
        return await this.transactionService.sum(user.id, walletId, type);
      }
    } catch (err) {
      return exceptionHandler(err, response);
    }
  }
}
