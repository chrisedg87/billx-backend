import { Model, DataTypes } from 'sequelize';
import { sequelize } from "../../../infra/database";
import User from "../../users/domain/user"
import UserBankAccount from './user-bank-account';

export default class BankAccount extends Model {
  public id!: number;
  public balance!: number;
  public name!: string;
  public number!: string;
  public sortCode!: string;
}

console.log('Bank init');

BankAccount.init({
  id: {
    field: "back_account_id", // Should be bank_account_id
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  balance: { 
    type: DataTypes.DOUBLE, // This should be a decimal type
    allowNull: false
  },
  name: {
    type: DataTypes.STRING(128),
    allowNull: false,
    defaultValue: ""
  },
  number: {
    type: DataTypes.STRING(12),
    allowNull: false,
    defaultValue: "",
  },
  sortCode: {
    type: DataTypes.STRING(8),
    allowNull: false,
    defaultValue: "",
    field: "sort_code"
  }
}, {
    sequelize,
    timestamps: false,
    tableName: "bank_accounts"
  }
);
