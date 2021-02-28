import { BankAccountRepository } from "../../bank-accounts/repos/bank-account-repository";
import { PaymentRequestRepository } from "../repos/payment-request-repository";
import PaymentRequestsController from "./payment-requests-controller";

const paymentRequestRepo = new PaymentRequestRepository();
const bankAccountRepo = new BankAccountRepository();

const paymentRequestsController = new PaymentRequestsController(paymentRequestRepo, bankAccountRepo);

export {
  paymentRequestsController
}