import { Request, Response, NextFunction } from 'express';
import { oauth2Client } from '../config/oauth2Config';

export const refreshTokenMiddleware = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const tokens = await oauth2Client.refreshAccessToken();
    oauth2Client.setCredentials(tokens.credentials);
    next();
  } catch (error) {
    res.status(500).json({ message: 'Failed to refresh access token', error });
  }
}