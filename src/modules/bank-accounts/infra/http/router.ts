import express from 'express';
import { bankAccountsController } from '../../controllers';

const bankAccountsRouter = express.Router();

bankAccountsRouter.get('/', (req, res) => bankAccountsController.getAccountsForUser(req, res));
bankAccountsRouter.post('/', (req, res) => bankAccountsController.createAccountForUser(req, res));

export { bankAccountsRouter };