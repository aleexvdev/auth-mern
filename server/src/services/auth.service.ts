import config from "../config/config";
import { User } from "../models/user.model";
import { SignInData, SignUpData } from "../types/auth";
import { arePasswordsEqual, comparePassword, generateToken, hashPassword, verifyToken } from "../utils";
import { RoleService } from "./role.service";

export class AuthService {

  constructor (private roleService: RoleService) { }

  signUpHandler = async (userData: SignUpData) => {
    const { username, email, password, confirmPassword, roles = [] } = userData;
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) throw new Error("User with the provided email or username already exists");

    const passwordsEqual = await arePasswordsEqual(password, confirmPassword);
    if (!passwordsEqual) throw new Error("Passwords do not match");

    const newUser = new User({ username, email, password: await hashPassword(password) });
    if (roles.length > 0) {
      const foundRoles = await this.roleService.findRolesByNames(roles);
      newUser.roles = foundRoles.map((role) => role._id);
    } else {
      const defaultRole = await this.roleService.findDefaultRole();
      newUser.roles = [defaultRole._id];
    }
    const user = await newUser.save();
    return user;
  }

  signInHandler = async (params: SignInData) => {
    const { email, password } = params;
    const existingUser = await User.findOne({ email });
    if (!existingUser) throw new Error("User with the provided email does not exist");

    const isMatch = await comparePassword(password, existingUser.password);
    if (!isMatch) throw new Error("Password is incorrect");

    const token = await generateToken(existingUser._id.toString(), existingUser.email, existingUser.roles);
    return { user: existingUser, token: token };
  }

  refreshTokenHandler = async (refreshToken: string) => {
    const decodedToken = verifyToken(refreshToken, config.jwtSecret);
    if (!decodedToken) throw new Error("Invalid refresh token");

    const user = await User.findById(decodedToken.userId);
    if (!user) throw new Error("User not found");

    const accessToken = generateToken(user._id.toString(), user.email, user.roles);
    return { user, token: accessToken };
  }

}