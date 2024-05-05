import { Request, Response } from "express";
import { UserService } from "../../services/user.service";
import { validationResult } from "express-validator";
import { errorResponse, successResponse } from "../../helpers/responseHandler";

export class UserController {

  constructor(private userService: UserService) { }

  getAllUsers = async (_req: Request, res: Response): Promise<void> => {
    try {
      const users = await this.userService.getAllUsers();
      return successResponse(res, 'Users retrieved successfully', users);
    } catch (error: any) {
      errorResponse(res, 500, 'Internal Server Error', error.message);
    }
  }

  getUserById = async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return errorResponse(res, 500, 'Bad Request', errors.array());

    try {
      const userId = req.query.id as string;
      const user = await this.userService.getUserById(userId);
      if (!user) return errorResponse(res, 404, 'User not found', 'User not found');
      return successResponse(res, 'User retrieved successfully', user);
    } catch (error: any) {
      return errorResponse(res, 500, 'Internal Server Error', error.message);
    }
  }

  createUser = async (req: Request, res: Response): Promise<void>  => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return errorResponse(res, 500, 'Bad Request', errors.array());

    try {
      const createdUser = await this.userService.createUser(req.body);
      if (!createdUser) return errorResponse(res, 409, 'User already exists');
      return successResponse(res, 'User created successfully', createdUser);
    } catch (error: any) {
      return errorResponse(res, 500, 'Internal Server Error', error.message);
    }
  }

  updateUser = async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return errorResponse(res, 500, 'Bad Request', errors.array());

    try {
      const userId = req.query.id as string;
      const deletedUser = await this.userService.updateUser(userId, req.body);
      if (!deletedUser) return errorResponse(res, 404, 'User not found');
      return successResponse(res, 'User updated successfully', deletedUser);
    } catch (error: any) {
      return errorResponse(res, 500, 'Internal Server Error', error.message);
    }
  }

  deleteUser = async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return errorResponse(res, 500, 'Bad Request', errors.array());

    try {
      const userId = req.query.id as string;
      const deletedUser = await this.userService.deleteUser(userId);
      if (!deletedUser) return errorResponse(res, 404, 'User not found');
      return successResponse(res, 'User deleted successfully', userId);
    } catch (error: any) {
      return errorResponse(res, 500, 'Internal Server Error', error.message);
    }
  }

}