import { AppDataSource } from "../data-source";
import { Wallet } from "../entity/wallet";
import { RequiredFieldsAreMissingException } from "../utils/exceptions/required_fields_are_missing_excepion";
import { WalletNotFoundException } from "../utils/exceptions/wallet_not_found_exception";

export class WalletService {
  private walletRepository = AppDataSource.getRepository(Wallet);

  async all(userId: number) {
    return await this.walletRepository.findBy({ user: { id: userId } });
  }

  async create(body, userId) {
    const { name } = body;
    if (!name) throw new RequiredFieldsAreMissingException(null, ["name"]);

    const wallet = { name: name, userId: userId };
    return await this.walletRepository.save(wallet);
  }

  async remove(id) {
    const result = await this.walletRepository
      .createQueryBuilder()
      .delete()
      .from(Wallet)
      .where("wallet.id = :id", {
        id: id,
      })
      .execute();
    return true;
  }

  async walletExists(id) {
    const wallet = await this.walletRepository.findOneBy({ id: id });

    if (!wallet) throw new WalletNotFoundException();
  }
}
