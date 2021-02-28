import express from 'express';
import { paymentRequestsController } from '../../controllers';

const paymentRequestsRouter = express.Router();

paymentRequestsRouter.post("/", (req, res) => paymentRequestsController.createPaymentRequest(req, res));
paymentRequestsRouter.get("/", (req, res) => paymentRequestsController.getPaymentRequests(req, res));
paymentRequestsRouter.post("/:requestId/pay", (req, res) => paymentRequestsController.createPaymentForRequest(req, res));
paymentRequestsRouter.patch("/:requestId", (req, res) => paymentRequestsController.updatePaymentRequestStatus(req, res));

export { paymentRequestsRouter };