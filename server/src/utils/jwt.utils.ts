import jwt from 'jsonwebtoken';
import config from '../config/config';
import { IRoleDocument } from '../models/role.model';

export const generateToken = async (userId: string, roles: IRoleDocument['_id'][]) => {
  const token = jwt.sign({ userId, roles }, config.jwtSecret, { expiresIn: '1h' });
  return token;
};