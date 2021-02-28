import { Op } from "sequelize";
import PaymentRequest from "../domain/payment-requests";

export interface IPaymentRequestFilter {
  from: number;
  paid: number;
  requestedBefore: Date;
}

export interface IPaymentRequestRepository { 
  createPaymentRequest(paymentRequest: PaymentRequest): Promise<null>;
  getPaymentRequestsForUser(userId: number, options: IPaymentRequestFilter): Promise<PaymentRequest[]>;
  getPaymentRequestById(paymentRequestId: number): Promise<PaymentRequest | null>;
  updatePaymentRequestStatus(paymentRequestId: number, active: number): Promise<any>;
}

export class PaymentRequestRepository implements IPaymentRequestRepository {

  async updatePaymentRequestStatus(paymentRequestId: number, active: number) {
    const paymentRequest = await PaymentRequest.findByPk(paymentRequestId);
    paymentRequest!.active = active;
    return paymentRequest!.save();
  }

  getPaymentRequestById(paymentRequestId: number): Promise<PaymentRequest | null> {
    return PaymentRequest.findByPk(paymentRequestId);
  }

  getPaymentRequestsForUser(userId: number, options: IPaymentRequestFilter): Promise<PaymentRequest[]> {
    const baseQuery = this.buildBaseQuery(options);

    return PaymentRequest.findAll({
      where: {
        payee: userId,
        ...baseQuery
      }
    })
  }

  createPaymentRequest(paymentRequest: PaymentRequest): Promise<any> {
    return PaymentRequest.create(paymentRequest);
  }
  
  private buildBaseQuery(options: IPaymentRequestFilter): any {
    const baseQuery: any = {};

    if (options.from) 
      baseQuery["payer"] = options.from;

    if (options.paid)
      baseQuery["active"] = options.paid;

    if (options.requestedBefore)
      baseQuery["created_on"] = { [Op.lt]: options.requestedBefore };

    return baseQuery;
  }

}