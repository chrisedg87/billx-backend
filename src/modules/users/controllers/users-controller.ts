import { Request, Response } from "express";
import { userRepository } from "../repos";
import { IUserRepository } from "../repos/user-repository";

export default class UsersController {

  private userRepository: IUserRepository;

  constructor(userRepo: IUserRepository) {
    this.userRepository = userRepo;
  }

  getAll(req: Request, res: Response) {
    this.userRepository.getAllUsers().then(result => res.json(result));
  }

  getById(req: Request, res: Response) {
    const userId: number = +req.params.userId;

    userRepository.getByUserId(userId)
      .then((result) => {
        console.log(result?.bankAccounts);
        res.json(result);
      })
      .catch((error) => {
        console.error('err', error);
        res.status(400).json(error);
      });
  }

  getByEmail(req: Request, res: Response) {
    if (!req.query.email) {
      res.status(400).json({message: 'Please specify an email address'});
    }

    const email = req.query.email as string;

    userRepository.getByEmail(email)
      .then((result) => {
        res.json(result);
      })
      .catch((error) => {
        res.status(400).json(error);
      });
  }

}