import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Transaction } from "./transaction";
import { User } from "./user";

@Entity()
export class Wallet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @Column({ select: false })
  userId: number;

  @ManyToOne(() => User, (user) => user.wallets, { onDelete: "CASCADE" })
  user: User;

  @OneToMany(() => Transaction, (transaction) => transaction.wallet)
  transactions: Transaction[];
}
