import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import AuthService from "../services/auth.service";

const router = Router();
const authService = new AuthService();
const authController = new AuthController(authService);


router.post('/sign-up', authController.signUpHandler);
router.post('/sign-in', authController.signInHandler);

export default router;