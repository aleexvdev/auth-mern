import { NextFunction, Request, Response } from "express";
import { ROLES } from "../models/role.model";
import { errorResponse } from "../helpers/responseHandler";
import { User } from "../models/user.model";

export const checkRolesExisted = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  if (req.body.roles) {
    for (let index = 0; index < req.body.roles.length; index++) {
      if (!ROLES.includes(req.body.roles[index])) {
        errorResponse(res, 400, `Role ${req.body.roles[index]} does not exist in the system.`);
      }
    }
  }
  next();
}

export const checkedDuplicateUsernameOrEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const user = await User.findOne({ username: req.body.username });
  if (user) return errorResponse(res, 500, 'Bad Request', { "Username": `Username ${req.body.username} is already exists.` });
  
  const email = await User.findOne({ email: req.body.email });
  if (email) return errorResponse(res, 500, 'Bad Request', { "Email": `Email ${req.body.email} is already exists.` });
  next();
}