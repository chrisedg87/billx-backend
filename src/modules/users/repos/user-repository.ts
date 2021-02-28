import { Model } from "sequelize/types";
import BankAccount from "../../bank-accounts/domain/bank-account";
import UserBankAccount from "../../bank-accounts/domain/user-bank-account";
import User from "../domain/user";

export interface IUserRepository {
  getAllUsers(): Promise<User[]>;
  getByEmail(email: string): Promise<User | null>;
  getByUserId(id: number): Promise<User | null>;
}

export class UserRepository implements IUserRepository {

  getByUserId(id: number): Promise<User | null> {
    return User.findByPk(id, {
      include: {
        model: BankAccount, 
        as: "bank_accounts"
      }
    });
  }

  getByEmail(email: string): Promise<User | null> {
    return User.findOne({
      where: {
        email: email
      }
    });
  }

  getAllUsers(): Promise<User[]> {
    return User.findAll();
  }

}