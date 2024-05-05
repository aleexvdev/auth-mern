import { Router } from "express";
import { AuthController } from "../controllers/auth/auth.controller";
import { AuthService } from "../services/auth.service";
import { validateRefreshToken, validateSignIn, validateSignUp } from "../validators/auth.validator";
import { RoleService } from "../services/role.service";
import { verifySingUp } from "../middlewares";

const router = Router();
const roleService = new RoleService();
const authService = new AuthService(roleService);
const authController = new AuthController(authService);


router.post('/sign-up', [ verifySingUp.checkedDuplicateUsernameOrEmail, verifySingUp.checkRolesExisted ], validateSignUp, authController.signUpHandler);
router.post('/sign-in', validateSignIn, authController.signInHandler);
router.post('/refresh-token', validateRefreshToken, authController.refreshTokenHandler);
router.post('/sign-out', authController.signOutHandler);

// router.post('/recover-password', authController.recoverPassword);
// router.post('/sign-in-google', authController.signInGoogle);

export default router;