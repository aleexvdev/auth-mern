import { Request, Response } from "express";
import { UserService } from "../../services/user.service";
import { validationResult } from "express-validator";
import { errorResponse, successResponse } from "../../helpers/responseHandler";
import { formatErrors } from "../../utils";

export class UserController {

  constructor(private userService: UserService) { }

  getAllUsers = async (_req: Request, res: Response): Promise<void> => {
    try {
      const users = await this.userService.getAllUsers();
      successResponse(res, "Users fetched successfully", users);
    } catch (error: any) {
      errorResponse(res, 500, "Failed to fetch users", error.message);
    }
  }

  getUserById = async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const formattedErrors = formatErrors(errors.array());
      return errorResponse(res, 500, 'Bad Request', formattedErrors);
    }

    try {
      const userId = req.query.id as string;
      const user = await this.userService.getUserById(userId);
      if (!user) errorResponse(res, 404, 'User not found', 'User not found');
      successResponse(res, 'User retrieved successfully', user);
    } catch (error: any) {
      errorResponse(res, 500, 'Failed to fetch user', error.message);
    }
  }

  getUserByToken = async (req: Request, res: Response) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return errorResponse(res, 401, 'Unauthorized', 'Invalid token format');
      }
      const token = authHeader.split(' ')[1];
      const user = await this.userService.getUserByToken(token);
      if (!user) errorResponse(res, 404, 'User not found', 'User not found');
      successResponse(res, 'User retrieved successfully', user);
    } catch (error: any) {
      errorResponse(res, 500, 'Failed to fetch user', error.message);
    }
  }

  createUser = async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const formattedErrors = formatErrors(errors.array());
      return errorResponse(res, 500, 'Bad Request', formattedErrors);
    }

    try {
      const createdUser = await this.userService.createUser(req.body);
      if (!createdUser) errorResponse(res, 409, 'User already exists');
      successResponse(res, 'User created successfully', createdUser);
    } catch (error: any) {
      errorResponse(res, 500, 'Internal Server Error', error.message);
    }
  }

  updateUser = async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const formattedErrors = formatErrors(errors.array());
      return errorResponse(res, 500, 'Bad Request', formattedErrors);
    }

    try {
      const userId = req.query.id as string;
      const deletedUser = await this.userService.updateUser(userId, req.body);
      if (!deletedUser) errorResponse(res, 404, 'User not found');
      successResponse(res, 'User updated successfully', deletedUser);
    } catch (error: any) {
      errorResponse(res, 500, 'Internal Server Error', error.message);
    }
  }

  deleteUser = async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const formattedErrors = formatErrors(errors.array());
      return errorResponse(res, 500, 'Bad Request', formattedErrors);
    }

    try {
      const userId = req.query.id as string;
      const deletedUser = await this.userService.deleteUser(userId);
      if (!deletedUser) errorResponse(res, 404, 'User not found');
      successResponse(res, 'User deleted successfully', userId);
    } catch (error: any) {
      errorResponse(res, 500, 'Internal Server Error', error.message);
    }
  }

}