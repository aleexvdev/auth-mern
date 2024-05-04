import { Request, Response } from "express";
import { AuthService } from "../../services/auth.service";
import { validationResult } from "express-validator";
import { CustomError } from "../../helpers/custom-error";

export class AuthController {

  constructor(private authService: AuthService) {}

  signUpHandler = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) throw new CustomError(errors.array()[0].msg, 400);

    try {
      const data = await this.authService.signUpHandler(req.body);
      res.status(201).json({
        success: true,
        data
      });
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ success: false, error: error.message });
      } else {
        res.status(500).json({ success: false, error: "Internal Server Error" });
      }
    }
  }

  signInHandler = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) throw new CustomError(errors.array()[0].msg, 400);

    try {
      const data = await this.authService.signInHandler(req.body);
      res.status(200).json({ data });
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }

  refreshTokenHandler = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) throw new CustomError(errors.array()[0].msg, 400);

    try {
      const data = await this.authService.refreshTokenHandler(req.body);
      res.status(200).json({ data });
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }

}