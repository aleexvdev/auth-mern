import { NextFunction, Request, Response } from "express";
import config from "../config/config";
import jwt, { JwtPayload } from "jsonwebtoken";
import { errorResponse } from "../helpers/responseHandler";
import { User } from "../models/user.model";
import { Role } from "../models/role.model";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export const verifyBearerToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) errorResponse(res, 401, 'Authorization header missing or invalid.', 'Unauthorized');
  const token = authHeader?.split(' ')[1];
  if (!token) errorResponse(res, 403, 'No token provided!');
  try {
    const decoded = jwt.verify(token as string, config.jwtSecret) as JwtPayload;
    req.userId = decoded.userId as string;
    const user = await User.findById(req.userId, { password: 0 });
    if (!user) errorResponse(res, 404, 'No user found.');
    next();
  } catch (error) {
    errorResponse(res, 401, 'Unauthorized');
  }
}

export const isModerator = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await User.findById(req.userId);
    const roles = await Role.find({ _id: { $in: user?.roles } });
    for (let index = 0; index < roles.length; index++) {
      if (roles[index].name === "moderator") {
        next();
        return;
      }
    }
    errorResponse(res, 403, 'Require Moderator role.');
  } catch (error: any) {
    errorResponse(res, 500, 'Internal Server Error', error);
  }
}

export const isAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await User.findById(req.userId);
    const roles = await Role.find({ _id: { $in: user?.roles } });
    for (let index = 0; index < roles.length; index++) {
      if (roles[index].name === "admin") {
        next();
        return;
      }
    }
    errorResponse(res, 403, 'Require Admin role.');
  } catch (error) {
    errorResponse(res, 500, 'Internal Server Error', error);
  }
}

export const isModeratorOrAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await User.findById(req.userId);
    const roles = await Role.find({ _id: { $in: user?.roles } });
    for (let index = 0; index < roles.length; index++) {
      if (roles[index].name === "moderator" || roles[index].name === "admin") {
        next();
        return;
      }
    }
    errorResponse(res, 403, 'Require Admin or Moderator role.');
  } catch (error: any) {
    errorResponse(res, 500, 'Internal Server Error', error);
  }
}

/* export const localVariables = async (req: Request, res: Response, next: NextFunction) => {
  req.app.locals = {
    OTP: null,
    ressetSession
  }
} */