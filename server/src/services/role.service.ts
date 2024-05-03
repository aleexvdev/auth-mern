import { Role } from "../models/role.model"

export class RoleService {
  findRolesByNames = async (roleNames: string[]) => {
    const roles = await Role.find({ name: { $in: roleNames } });
    return roles;
  }

  findDefaultRole = async () => {
    const defaultRole = await Role.findOne({ name: "user" });
    if (!defaultRole) throw new Error('Default "user" role not found');
    return defaultRole;
  }
}