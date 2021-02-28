import { UserRepository } from "../repos/user-repository";
import UsersController from "./users-controller";

const userRepo = new UserRepository();

const usersController = new UsersController(userRepo);

export {
  usersController
}