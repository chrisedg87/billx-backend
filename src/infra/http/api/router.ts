import express from "express";
import { bankAccountsRouter } from "../../../modules/bank-accounts/infra/http/router";
import { paymentRequestsRouter } from "../../../modules/payment-requests/infra/http/router";
import { userRouter } from "../../../modules/users/infra/http/router";

const apiRouter = express.Router();

apiRouter.use('/users', userRouter);
apiRouter.use('/bankAccounts', bankAccountsRouter)
apiRouter.use('/paymentRequests', paymentRequestsRouter);

export { apiRouter }