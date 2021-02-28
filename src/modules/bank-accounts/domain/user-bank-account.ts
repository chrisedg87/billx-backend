import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../infra/database";

export default class UserBankAccount extends Model {
  public id!: number;
  public userId!: number;
  public bankAccountId!: number;
}

UserBankAccount.init({
  id: {
    field: "user_to_bank_account_id",
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER
  },
  userId: {
    field: "user_id",
    type: DataTypes.INTEGER
  },
  bankAccountId: {
    field: "bank_account_id",
    type: DataTypes.INTEGER
  }
}, {
  sequelize,
  tableName: "user_to_bank_account"
})
