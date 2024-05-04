import { Request, Response } from "express";
import { UserService } from "../../services/user.service";
import { CustomError } from "../../helpers/custom-error";
import { validationResult } from "express-validator";

export class UserController {

  constructor(private userService: UserService) { }

  getAllUsers = async (_req: Request, res: Response) => {
    try {
      const data = await this.userService.getAllUsers();
      res.status(200).json({ success: true, data: data });
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ success: false, error: error.message });
      } else {
        res.status(500).json({ message: error });
      }
    }
  }

  getUserById = async (req: Request, res: Response): Promise<Response> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) throw new CustomError(errors.array()[0].msg, 400);

    try {
      const data = this.userService.getUserById(req.params.id);
      if (!data) return res.status(404).send({ success: false, message: 'User not found' });
      return res.status(200).json({ success: true, data: data });
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ success: false, error: error.message });
      } else {
        return res.status(500).json({ success: false, error: "Internal Server Error" });
      }
    }
  }

  createUser = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) throw new CustomError(errors.array()[0].msg, 400);

    try {
      const createdUser = this.userService.createUser(req.body);
      return res.status(200).json({ success: true, data: createdUser });
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ success: false, error: error.message });
      } else {
        return res.status(500).json({ success: false, error: "Internal Server Error" });
      }
    }
  }

  updateUser = async (req: Request, res: Response): Promise<Response> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) throw new CustomError(errors.array()[0].msg, 400);

    try {
      const deletedUser = this.userService.updateUser(req.params.id, req.body);
      if (!deletedUser) return res.status(404).send({ success: false, message: 'User not found' });
      return res.status(200).json({  success: true, data: `User deleted successfully: ${deletedUser}` });
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ success: false, error: error.message });
      } else {
        return res.status(500).json({ success: false, error: "Internal Server Error" });
      }
    }
  }

  deleteUser = async (req: Request, res: Response): Promise<Response> => {
    try {
      const deletedUser = await this.userService.deleteUser(req.params.id);
      if (!deletedUser) return res.status(404).send({ success: false, message: 'User not found' });
      return  res.status(200).json({ success: true, message: 'User deleted' });
    } catch (error) {
      if (error instanceof CustomError) {
        return  res.status(error.statusCode).json({ success: false, error: error.message });
      } else {
        return  res.status(500).json({ success: false, error: "Internal Server Error" });
      }
    }
  }

}