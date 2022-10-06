import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { TransactionType } from "../config/enums";
import { User } from "./user";
import { Wallet } from "./wallet";

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("enum", { enum: TransactionType, default: TransactionType.income })
  type: TransactionType.income;

  @Column("decimal")
  amount: number;

  @Column()
  describtion: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @ManyToOne(() => User, (user) => user.transactions, { onDelete: "CASCADE" })
  user: User;

  @ManyToOne(() => Wallet, (wallet) => wallet.transactions, {
    onDelete: "CASCADE",
  })
  wallet: Wallet;
}
