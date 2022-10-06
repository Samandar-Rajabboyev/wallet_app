import "reflect-metadata";
import { DataSource } from "typeorm";
import { Wallet } from "./entity/wallet";
import { Transaction } from "./entity/transaction";
import { User } from "./entity/user";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "root",
  database: "wallet_app",
  synchronize: false,
  logging: true,
  entities: [User, Wallet, Transaction],
  migrations: [],
  subscribers: [],
});
