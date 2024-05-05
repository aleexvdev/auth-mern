import { Router } from "express";
import { RoleService } from "../services/role.service";
import { UserService } from "../services/user.service";
import { UserController } from "../controllers/user/user.controller";
import { validateCreateUser, validateDeleteUser, validateGetUserById, validateUpdateUser } from "../validators/user.validator";
import { authJwt } from "../middlewares";

const userRouter = Router();
const roleService = new RoleService();
const userService = new UserService(roleService);
const userController = new UserController(userService);

userRouter.get("/all", [ authJwt.verifyBearerToken, authJwt.isModeratorOrAdmin ], userController.getAllUsers);
userRouter.get("/", [ authJwt.verifyBearerToken ], validateGetUserById, userController.getUserById);
userRouter.post("/", [ authJwt.verifyBearerToken, authJwt.isModeratorOrAdmin ], validateCreateUser, userController.createUser);
userRouter.put("/", [ authJwt.verifyBearerToken, authJwt.isAdmin ], validateUpdateUser, userController.updateUser);
userRouter.delete("/", [ authJwt.verifyBearerToken, authJwt.isAdmin ], validateDeleteUser, userController.deleteUser);

export default userRouter;