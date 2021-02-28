import { Model } from "sequelize/types";
import User from "../../users/domain/user";
import BankAccount from "../domain/bank-account";
import UserBankAccount from "../domain/user-bank-account";
// import BankAccount from "../domain/bank-account";

export interface IBankAccountRepository { 
  getAccountsForUser(userId: number): Promise<BankAccount[]>;
  updateBalance(bankAccountId: number, newBalance: number): Promise<any>;
  getAccountById(accountId: number): Promise<BankAccount | null>;
  createAccountForUser(userId: number, account: BankAccount): Promise<any>;
}

export class BankAccountRepository implements IBankAccountRepository {

  async createAccountForUser(userId: number, account: BankAccount): Promise<any> {
    var account = await BankAccount.create(account);
    await UserBankAccount.create({userId: userId, bankAccountId: account.id});
  }

  getAccountById(accountId: number): Promise<BankAccount | null> {
    return BankAccount.findByPk(accountId);
  }

  updateBalance(bankAccountId: number, newBalance: number): Promise<any> {
    return new Promise((resolve, reject) => {
      BankAccount.findByPk(bankAccountId)
        .then(result => {
          result?.update({
            balance: newBalance
          })
          .then(updateResult => resolve(updateResult))
          .catch(err => reject(err));
        })
        .catch(err => reject(err));
    });
  }

  getAccountsForUser(userId: number): Promise<BankAccount[]> {
    return BankAccount.findAll({
      where: {
        '$users.user_id$': userId
      },
      include: {
        model: User, 
        as: "users"
      },
    });
  }

}