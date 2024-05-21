import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config/config';
import { IRoleDocument } from '../models/role.model';

export const generateToken = async (userId: string, email: string, roles: IRoleDocument['_id'][]) => {
  const token = jwt.sign({ userId, email, roles }, config.jwtSecret, { expiresIn: '1d' });
  return token;
};

export const verifyToken = (token: string, secret: string): JwtPayload | null => {
  try {
    const decoded = jwt.verify(token, secret) as JwtPayload;
    return decoded;
  } catch (error) {
    return null;
  }
};