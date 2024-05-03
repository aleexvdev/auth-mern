import { Router } from "express";
import { AuthController } from "../controllers/auth/auth.controller";
import AuthService from "../services/auth.service";
import { validateSignIn, validateSignUp } from "../validators/auth.validator";
import { RoleService } from "../services/role.service";

const router = Router();
const roleService = new RoleService();
const authService = new AuthService(roleService);
const authController = new AuthController(authService);


router.post('/sign-up', validateSignUp, authController.signUpHandler);
router.post('/sign-in', validateSignIn, authController.signInHandler);

export default router;