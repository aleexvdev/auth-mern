import { Role } from "../models/role.model"

export class RoleService {

  getRolesAll = async () => {
    const roles = await Role.find();
    return roles;
  }

  getRoleById = async (id: string) => {
    const role = await Role.findById(id);
    if (!role) throw new Error('Role not found');
    return role;
  }

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