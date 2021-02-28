import { Model, DataTypes, BelongsToManyGetAssociationsMixin, Association } from 'sequelize';
import { sequelize } from "../../../infra/database";
import BankAccount from '../../bank-accounts/domain/bank-account';
import UserBankAccount from '../../bank-accounts/domain/user-bank-account';

export default class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;

  public getBankAccounts!: BelongsToManyGetAssociationsMixin<BankAccount>; 

  public bankAccounts!: BankAccount[]

  public static associations: {
    bankAccounts: Association<User, BankAccount>;
  };
}

User.init({
  id: {
    field: "user_id",
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING
  }
}, {
    sequelize,
    timestamps: false,
    tableName: "users"
  }
);

User.belongsToMany(BankAccount, { through: UserBankAccount, foreignKey: "bank_account_id", as: "bank_accounts" });
BankAccount.belongsToMany(User, { through: UserBankAccount, foreignKey: "user_id", as: "users" });
