import { Request, Response } from "express";
import { AuthService } from "../../services/auth.service";
import { RoleService } from "../../services/role.service";
import { AuthController } from "./auth.controller";
import { validationResult, Result } from 'express-validator';

jest.mock('express-validator');

describe("AuthController", () => {
  let authController: AuthController;
  let authService: AuthService;
  let roleService: RoleService;

  beforeEach(() => {
    authService = new AuthService(roleService);
    authController = new AuthController(authService);
  });

  describe('signUpHandler', () => {
    it('should return 201 and success data on successful sign up', async () => {
      const req = { body: { username: 'testuser', email: 'test@example.com', password: 'password', confirmPassword: 'password' } } as Request;
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
      const validationResultMock = { isEmpty: jest.fn().mockReturnValue(true) } as unknown;
      (validationResult as jest.MockedFunction<typeof validationResult>).mockReturnValue(validationResultMock as Result<any>);
      authService.signUpHandler = jest.fn().mockResolvedValue({ id: 1, username: 'testuser', email: 'test@example.com' });
      await authController.signUpHandler(req, res);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ success: true, data: { id: 1, username: 'testuser', email: 'test@example.com' } });
    });
  });

  describe('signInHandler', () => {
    it('should return 200 and success data on successful sign in', async () => {
      const req = { body: { email: 'test@example.com', password: 'password' } } as Request;
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
      const validationResultMock = { isEmpty: jest.fn().mockReturnValue(true) } as any;
      (validationResult as jest.MockedFunction<typeof validationResult>).mockReturnValue(validationResultMock);
      authService.signInHandler = jest.fn().mockResolvedValue({ user: { id: 1, email: 'test@example.com' }, token: 'mockToken' });
      await authController.signInHandler(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ data: { user: { id: 1, email: 'test@example.com' }, token: 'mockToken' } });
    });
  });

  describe('refreshTokenHandler', () => {
    it('should return 200 and new token on successful token refresh', async () => {
      const req = { body: { refreshToken: 'mockRefreshToken' } } as Request;
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
      const validationResultMock = { isEmpty: jest.fn().mockReturnValue(true) } as any;
      (validationResult as jest.MockedFunction<typeof validationResult>).mockReturnValue(validationResultMock);
      authService.refreshTokenHandler = jest.fn().mockResolvedValue({ user: { id: 1, email: 'test@example.com' }, token: 'newMockToken' });
      
      await authController.refreshTokenHandler(req, res);
      
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ data: { user: { id: 1, email: 'test@example.com' }, token: 'newMockToken' } });
    });
  });

});