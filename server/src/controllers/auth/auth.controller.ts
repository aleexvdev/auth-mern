import { Request, Response } from "express";
import { AuthService } from "../../services/auth.service";
import { validationResult } from "express-validator";
import { errorResponse, successResponse } from "../../helpers/responseHandler";

export class AuthController {

  constructor(private authService: AuthService) {}

  signUpHandler = async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) errorResponse(res, 500, 'Bad Request', errors.array());

    try {
      const data = await this.authService.signUpHandler(req.body);
      if (!data) errorResponse(res, 500, 'Error signing up user', 'Failed to sign up user');
      successResponse(res, 'User signed up successfully', data);
    } catch (error: any) {
      errorResponse(res, 500, 'Internal Server Error', error.message);
    }
  }

  signInHandler = async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) errorResponse(res, 500, 'Bad Request', errors.array());

    try {
      const data = await this.authService.signInHandler(req.body);
      if (!data) errorResponse(res, 500, 'Error signing in user', 'Failed to sign in user');
      successResponse(res, 'User signed in successfully', data);
    } catch (error: any) {
      errorResponse(res, 500, 'Internal Server Error', error.message);
    }
  }

  refreshTokenHandler = async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) errorResponse(res, 500, 'Bad Request', errors.array());

    try {
      const data = await this.authService.refreshTokenHandler(req.body);
      if (!data) errorResponse(res, 500, 'Error refreshing token', 'Failed to refresh token');
      successResponse(res, 'Token refreshed successfully', data);
    } catch (error: any) {
      errorResponse(res, 500, 'Internal Server Error', error.message);
    }
  }

}