import { Request, Response } from "express";
import AuthService from "../services/auth.service";

export class AuthController {

  constructor(private authService: AuthService) {}

  signUpHandler = async (req: Request, res: Response) => {
    try {
      const data = await this.authService.signUpHandler(req.body);
      res.status(201).json({ data });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  signInHandler = async (req: Request, res: Response) => {
    try {
      const data = await this.authService.signInHandler(req.body);
      res.status(200).json({ data });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

}