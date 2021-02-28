import { Model, DataTypes } from 'sequelize';
import { sequelize } from "../../../infra/database";
import BankAccount from '../../bank-accounts/domain/bank-account';

export default class PaymentRequest extends Model {
  public id!: number;
  amount!: number;
  amountPaid!: number;
  intoBank!: number;
  payer!: number;
  payee!: number;
  active!: number;
  createdOn!: Date;
}

const MIN_AMOUNT = 0.01;
const MAX_AMOUNT = 30000;

PaymentRequest.init({
  id: {
    field: "payment_request_id",
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  amount: {
    type: DataTypes.DOUBLE,
    allowNull: false,
    validate: {
      isGreaterThanMinimum(value: any) {
        if (parseInt(value) < MIN_AMOUNT) {
          throw new Error(`Amount must be greater than ${MIN_AMOUNT}`);
        }
      },
      isLeeThanMaximum(value: any) {
        if (parseInt(value) > MAX_AMOUNT) {
          throw new Error(`Amount must be less then ${MAX_AMOUNT}`);
        }
      }
    }
  },
  amountPaid: {
    type: DataTypes.DOUBLE,
    field: "amount_paid",
    allowNull: false
  },
  intoBank: {
    type: DataTypes.INTEGER,
    field: "into_bank",
    allowNull: false
  },
  payer: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  payee: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  active: {
    type: DataTypes.INTEGER, // Should be BIT
    allowNull: false
  },
  created_on: {
    type: DataTypes.DATE
  }
}, {
    sequelize,
    tableName: "payment_requests",
    updatedAt: false,
    createdAt: true
  }
);