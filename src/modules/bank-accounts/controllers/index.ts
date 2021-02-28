import { BankAccountRepository } from "../repos/bank-account-repository";
import BankAccountsController from "./bank-account-controller";

const bankAccountRepo = new BankAccountRepository();

const bankAccountsController = new BankAccountsController(bankAccountRepo);

export {
  bankAccountsController
}