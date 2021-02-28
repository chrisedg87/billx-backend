import { Request, Response } from "express";
import { sequelize } from "../../../infra/database";
import { IBankAccountRepository } from "../../bank-accounts/repos/bank-account-repository";
import IPayment from "../domain/payment";
import { IPaymentRequestFilter, IPaymentRequestRepository } from "../repos/payment-request-repository";

export default class PaymentRequestsController {

  private paymentRequestRepository: IPaymentRequestRepository;
  private bankAccountRespository: IBankAccountRepository;

  constructor(paymentRequestRepo: IPaymentRequestRepository, bankAccountRespository: IBankAccountRepository) {
    this.paymentRequestRepository = paymentRequestRepo;
    this.bankAccountRespository = bankAccountRespository;
  }

  updatePaymentRequestStatus(req: Request, res: Response) {
    const requestId = req.params.requestId;
    const status = req.body.active;
    this.paymentRequestRepository.updatePaymentRequestStatus(+requestId, +status)
      .then(result => {
        res.status(204).send();
      })
      .catch(err => res.status(400).json(err));
  }

  createPaymentRequest(req: Request, res: Response) {
    this.paymentRequestRepository.createPaymentRequest(req.body)
      .then(result => {
        console.log('done');
        res.status(201).send();
      })
      .catch(err => res.status(400).json({err}));
  }

  getPaymentRequests(req: Request, res: Response) {
    const userId  = req.headers['x-user-id'];
    if (!userId) {
      res.status(400).json({message: 'User Id not provided in header'});
      return;
    }

    const options = req.query as any as IPaymentRequestFilter;

    console.log('options', options);

    this.paymentRequestRepository.getPaymentRequestsForUser(+userId, options)
      .then(result => {
        res.json(result);
      })
      .catch(error => {
        res.json(error);
      });
  }

  async createPaymentForRequest(req: Request, res: Response) {
    const requestId = req.params.requestId;
    const payment = req.body as IPayment;

    if (payment.amount <= 0) {
      res.status(400).json({message: 'Amount is invalid'});
      return;
    }

    try {
      const paymentRequest = await this.paymentRequestRepository.getPaymentRequestById(+requestId);
      const payeeAccount = await this.bankAccountRespository.getAccountById(paymentRequest!.intoBank);
      const payerAccount = await this.bankAccountRespository.getAccountById(payment.fromAccount);

      if (paymentRequest!.active == 0) {
        res.status(400).json({message: "Request has been closed"});
        return;
      }

      if (!payeeAccount) {
        res.status(400).json({message: "Payee account not found"});
        return;
      }

      if (!payerAccount) {
        res.status(400).json({messsage: "Payer account not found"});
        return;
      }

      if (payeeAccount!.balance < payment.amount) {
        res.status(400).json({message: "Account balance is not sufficient"});
        return;
      }

      if (payment.amount > paymentRequest!.amount) {
        res.status(400).json({message: "Amount is greater than requested"});
        return;
      }

      const tx = await sequelize.transaction(async (t) => {
        payeeAccount!.balance = payeeAccount!.balance + payment.amount;
        await payeeAccount!.save({ transaction: t });

        payerAccount!.balance = payerAccount!.balance - payment.amount;
        await payerAccount!.save({ transaction: t });

        const active = paymentRequest!.amountPaid + payment.amount == paymentRequest!.amount ? 0 : 1;

        paymentRequest!.amountPaid = paymentRequest!.amountPaid + payment.amount;
        paymentRequest!.active = active;
        await paymentRequest!.save({ transaction: t });
      });

      res.json({message: "Payment successful"});
    }
    catch(err) {
      res.status(400).json(err);
    }
  }

}