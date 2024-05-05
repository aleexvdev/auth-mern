import { Request, Response } from "express";
import { UserService } from "../../services/user.service";
import { CustomError } from "../../helpers/custom-error";
import { validationResult } from "express-validator";

export class UserController {

  constructor(private userService: UserService) { }

  getAllUsers = async (_req: Request, res: Response): Promise<Response> => {
    try {
      const data = await this.userService.getAllUsers();
      return res.status(200).json({ success: true, data: data });
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ success: false, error: error.message });
      } else {
        return res.status(500).json({ message: error });
      }
    }
  }

  getUserById = async (req: Request, res: Response): Promise<Response> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const userId = req.query.id as string;
      const user = await this.userService.getUserById(userId);
      if (!user) return res.status(404).send({ success: false, message: 'User not found' });
      return res.status(200).json({ success: true, data: user });
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ success: false, error: error.message });
      } else {
        return res.status(500).json({ success: false, error: "Internal Server Error" });
      }
    }
  }

  createUser = async (req: Request, res: Response): Promise<Response>  => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const createdUser = await this.userService.createUser(req.body);
      if (!createdUser) return res.status(409).send({ success: false, message: 'User already exists' });
      return res.status(200).json({ success: true, data: createdUser });
    } catch (error: any) {
      return res.status(400).json({ success: false, error: error.message });
    }
  }

  updateUser = async (req: Request, res: Response): Promise<Response> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) throw new CustomError(errors.array()[0].msg, 400);

    try {
      const userId = req.query.id as string;
      const deletedUser = await this.userService.updateUser(userId, req.body);
      if (!deletedUser) return res.status(404).send({ success: false, message: 'User not found' });
      return res.status(200).json({ success: true, message: 'User updated successfully', data: deletedUser });
    } catch (error: any) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ success: false, error: error.message });
      } else {
        return res.status(400).json({ success: false, error: error.message });
      }
    }
  }

  deleteUser = async (req: Request, res: Response): Promise<Response> => {
    try {
      const userId = req.query.id as string;
      const deletedUser = await this.userService.deleteUser(userId);
      if (!deletedUser) return res.status(404).send({ success: false, message: 'User not found' });
      return res.status(200).json({ success: true, message: 'User deleted' });
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ success: false, error: error.message });
      } else {
        return res.status(500).json({ success: false, error: "Internal Server Error" });
      }
    }
  }

}