import { Role } from "../models/role.model";
import { User } from "../models/user.model";
import { comparePassword, generateToken, hashPassword } from "../utils";

class AuthService {

  // constructor(private userService: UserService) {}

  signUpHandler = async (userData: { username: string, email: string, password: string, roles: string[] }) => {
    const { username, email, password, roles = [] } = userData;
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) throw new Error("User with the provided email or username already exists");

    const newUser = new User({ username, email, password: await hashPassword(password) });
    if (roles.length > 0) {
      const foundRoles = await Role.find({ name: { $in: roles } });
      newUser.roles = foundRoles.map((role) => role._id);
    } else {
      const userRole = await Role.findOne({ name: "user" });
      if (!userRole) {
        throw new Error('Default "user" role not found');
      }
      newUser.roles = [userRole._id];
    }
    const user = await newUser.save();
    return user;
  }

  signInHandler = async (params: { email: string, password: string }) => {
    const { email, password } = params;
    const existingUser = await User.findOne({ email });
    if (!existingUser) throw new Error("User with the provided email does not exist");

    const isMatch = await comparePassword(password, existingUser.password);
    if (!isMatch) throw new Error("Password is incorrect");

    const token = await generateToken(existingUser._id.toString());

    return { user: existingUser, token: token };
  }

}

export default AuthService;