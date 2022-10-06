import { AppDataSource } from "../data-source";
import { Wallet } from "../entity/wallet";

export class WalletService {
  private walletRepository = AppDataSource.getRepository(Wallet);

  async all(userId: number) {
    return await this.walletRepository.findBy({ user: { id: userId } });
  }

  async create(body, userId) {
    const { name } = body;
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
}
