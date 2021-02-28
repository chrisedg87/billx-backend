require('dotenv').config()

import { Sequelize } from 'sequelize';

const { 
  DB_USER, 
  DB_PASS, 
  DB_HOST,
  DB_NAME
} = process.env;

export const sequelize = new Sequelize(DB_NAME!, DB_USER!, DB_PASS!, {
  host: DB_HOST!,
  dialect: 'mysql',
  define: {
    timestamps: false
  }
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Successfully connected to database");
  })
  .catch(err => {
    console.error("Error connecting to database: ", err);
  });