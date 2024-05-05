import { Router } from "express";
import { RoleService } from "../services/role.service";
import { UserService } from "../services/user.service";
import { UserController } from "../controllers/user/user.controller";
import { validateCreateUser, validateDeleteUser, validateGetUserById, validateUpdateUser } from "../validators/user.validator";

const userRouter = Router();
const roleService = new RoleService();
const userService = new UserService(roleService);
const userController = new UserController(userService);

userRouter.get("/all", userController.getAllUsers);
userRouter.get("/", validateGetUserById, userController.getUserById);
userRouter.post("/", validateCreateUser, userController.createUser);
userRouter.put("/", validateUpdateUser, userController.updateUser);
userRouter.delete("/", validateDeleteUser, userController.deleteUser);

export default userRouter;