import { Request, Response } from "express";
import { RoleService } from "../../services/role.service";
import { errorResponse, successResponse } from "../../helpers/responseHandler";
import { validationResult } from "express-validator";
import { formatErrors } from "../../utils";

export class RoleController {

  constructor( private roleService: RoleService ) {}

  getRolesAll = async (_req: Request, res: Response): Promise<void> => {
    try {
      const roles = await this.roleService.getRolesAll();
      successResponse(res, "Roles fetched successfully", roles);
    } catch (error:any) {
      errorResponse(res, 500, "Failed to fetch roles", error.message);
    }
  }
  
  getRoleById = async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const formattedErrors = formatErrors(errors.array());
      return errorResponse(res, 500, 'Bad Request', formattedErrors);
    }

    try {
      const roleId = req.query.id as string;
      const role = await this.roleService.getRoleById(roleId);
      successResponse(res, "Role fetched successfully", role);
    } catch (error:any) {
      errorResponse(res, 500, "Failed to fetch role", error.message);
    }
  }
}