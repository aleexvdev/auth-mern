import { verify } from "jsonwebtoken";
import { IUser, User } from "../models/user.model";
import { hashPassword } from "../utils";
import { RoleService } from "./role.service";
import config from "../config/config";
import { JwtPayload } from "../types/auth";

export class UserService {

  constructor (private roleService: RoleService) {}

  getAllUsers = async (): Promise<IUser[] | null> => {
    return await User.find();
  }

  getUserById = async (userId: string): Promise<IUser | null> => {
    return await User.findById(userId);
  }

  getUserByToken = async (tokenUser: string): Promise<IUser | null> => {
    const decodedToken = verify(tokenUser, config.jwtSecret) as JwtPayload;
    if (!decodedToken) throw new Error("Error decoding token");
    const userId = decodedToken.userId as string;
    const foundUser = await User.findById(userId);
    if (!foundUser) throw new Error("User not found");
    return foundUser;
  }

  createUser = async (userData: IUser): Promise<IUser> => {

    const { username, email, password, roles = [] } = userData;
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) throw new Error("User with the provided email or username already exists");

    const newUser = new User({ username, email, password: await hashPassword(password) });
    if (roles.length > 0) {
      const foundRoles = await this.roleService.findRolesByNames(roles);
      newUser.roles = foundRoles.map((role) => role._id);
    } else {
      const defaultRole = await this.roleService.findDefaultRole();
      newUser.roles = [defaultRole._id];
    }
    return await newUser.save();
  }

  updateUser = async (userId: string, userUpdate: IUser): Promise<IUser | null> => {

    if (userUpdate.password) userUpdate.password = await hashPassword(userUpdate.password);
    if (userUpdate.roles.length > 0) {
      const foundRoles = await this.roleService.findRolesByNames(userUpdate.roles);
      userUpdate.roles = foundRoles.map((role) => role._id);
    } else {
      const defaultRole = await this.roleService.findDefaultRole();
      userUpdate.roles = [defaultRole._id];
    }
    console.log(userUpdate)
    return await User.findByIdAndUpdate(userId, userUpdate, { new: true });
  }

  deleteUser = async (userId: string): Promise<IUser | null> => {

    return await User.findByIdAndDelete(userId);
  }
}