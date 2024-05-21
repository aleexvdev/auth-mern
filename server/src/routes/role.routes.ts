import { Router } from "express";
import { authJwt } from "../middlewares";
import { RoleController } from "../controllers/role/role.controller";
import { RoleService } from "../services/role.service";
import { validateGetRoleById } from "../validators/role.validator";

const roleRouter = Router();
const roleService = new RoleService();
const roleController = new RoleController(roleService);

roleRouter.get("/", [ authJwt.verifyBearerToken, authJwt.isAdmin ], roleController.getRolesAll);
roleRouter.post("/", [ authJwt.verifyBearerToken, authJwt.isAdmin ], validateGetRoleById, roleController.getRoleById);

export default roleRouter;