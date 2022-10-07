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

  @Column({ default: "", zerofill: true })
  description: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @Column({ select: false })
  userId: number;

  @ManyToOne(() => User, (user) => user.transactions, { onDelete: "CASCADE" })
  user: User;

  @Column({ select: false })
  walletId: number;

  @ManyToOne(() => Wallet, (wallet) => wallet.transactions, {
    onDelete: "CASCADE",
  })
  wallet: Wallet;
}
