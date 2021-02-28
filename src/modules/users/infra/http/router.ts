import express from 'express';
import { usersController } from '../../controllers';

const userRouter = express.Router();

userRouter.get('/', (req, res) => usersController.getAll(req, res));
userRouter.get('/search', (req, res) => usersController.getByEmail(req, res));


export { userRouter };