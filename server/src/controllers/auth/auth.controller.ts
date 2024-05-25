import { Request, Response } from "express";
import { AuthService } from "../../services/auth.service";
import { validationResult } from "express-validator";
import { errorResponse, successResponse } from "../../helpers/responseHandler";
import { formatErrors } from "../../utils";

export class AuthController {

  constructor(private authService: AuthService) {}

  signUpHandler = async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const formattedErrors = formatErrors(errors.array());
      return errorResponse(res, 500, 'Bad Request', formattedErrors);
    }

    try {
      const data = await this.authService.signUpHandler(req.body);
      if (!data) return errorResponse(res, 500, 'Error signing up user', 'Failed to sign up user');
      return successResponse(res, 'User signed up successfully', data);
    } catch (error: any) {
      return errorResponse(res, 500, 'Internal Server Error', error.message);
    }
  }

  signInHandler = async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const formattedErrors = formatErrors(errors.array());
      return errorResponse(res, 500, 'Bad Request', formattedErrors);
    }

    try {
      const data = await this.authService.signInHandler(req.body);
      if (!data) return errorResponse(res, 500, 'Error signing in user', 'Failed to sign in user');
      return successResponse(res, 'User signed in successfully', data);
    } catch (error: any) {
      return errorResponse(res, 500, 'Internal Server Error', error.message);
    }
  }

  refreshTokenHandler = async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const formattedErrors = formatErrors(errors.array());
      return errorResponse(res, 500, 'Bad Request', formattedErrors);
    }

    try {
      const data = await this.authService.refreshTokenHandler(req.body);
      if (!data) return errorResponse(res, 500, 'Error refreshing token', 'Failed to refresh token');
      return successResponse(res, 'Token refreshed successfully', data);
    } catch (error: any) {
      return errorResponse(res, 500, 'Internal Server Error', error.message);
    }
  }

  signOutHandler = async (_req: Request, res: Response): Promise<Response> => {
    return res.status(200).json({ message: 'Session closed successfully.' });
  }

  verifyTokenAndGetUser = async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const formattedErrors = formatErrors(errors.array());
      return errorResponse(res, 500, 'Bad Request', formattedErrors);
    }

    try {
      const data = await this.authService.verifyTokenAndGetUser(req.body);
      if (!data) return errorResponse(res, 500, 'Error verifying token', 'Failed to verify token');
      return successResponse(res, 'Token verified successfully', data);
    } catch (error: any) {
      return errorResponse(res, 500, 'Internal Server Error', error.message);
    }
  }

}