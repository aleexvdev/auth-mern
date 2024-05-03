import jwt from 'jsonwebtoken';
import config from '../config/config';

export const generateToken = async (userId: string) => {
  const token = jwt.sign({ userId }, config.jwtSecret, { expiresIn: '1h' });
  return token;
};