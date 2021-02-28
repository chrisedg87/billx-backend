import { Request, Response } from "express";
import BankAccount from "../domain/bank-account";
import { IBankAccountRepository } from "../repos/bank-account-repository";

export default class BankAccountsController {

  private bankAccountRepository: IBankAccountRepository;

  constructor(bankAccountRepo: IBankAccountRepository) {
    this.bankAccountRepository = bankAccountRepo;
  }

  createAccountForUser(req: Request, res: Response) {
    const userId  = req.headers['x-user-id'];
    if (!userId) {
      res.status(400).json({message: 'User Id not provided in header'});
      return;
    }
    const account = req.body as BankAccount;
    this.bankAccountRepository.createAccountForUser(+userId, account)
      .then(result => res.status(201).send())
      .catch(err => res.status(400).json(err));
  }

  getAccountsForUser(req: Request, res: Response) {
    const userId  = req.headers['x-user-id'];
    if (!userId) {
      res.status(400).json({message: 'User Id not provided in header'});
      return;
    }
    this.bankAccountRepository.getAccountsForUser(+userId).then(result => res.json(result));
  }

}