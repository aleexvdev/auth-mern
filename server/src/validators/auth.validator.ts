import { body } from "express-validator";

export const validateSignUp = [
  body("username")
    .isString()
    .isLength({ min: 4, max: 10 })
    .withMessage("Username must be between 4 and 10 characters"),
  body("email")
    .isEmail()
    .withMessage("Invalid email address"),
  body("password")
    .isString()
    .isLength({ min: 6 })
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\s\S]*$/)
    .withMessage("Password must be at least 6 characters long, contain at least one uppercase letter, one lowercase letter, and one number"),
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Passwords do not match');
    }
    return true;
  }),
  body("roles")
    .optional()
    .isArray()
    .withMessage("Roles must be an array")
];

export const validateSignIn = [
  body("email")
    .isEmail()
    .withMessage("Invalid email address"),
  body("password")
    .isString()
    .withMessage("Password is required")
];

export const validateRefreshToken = [
  body('refreshToken')
    .notEmpty()
    .withMessage('Refresh token is required')
];

export const validateVerifyToken = [
  body('token')
    .notEmpty()
    .withMessage('Refresh token is required')
];

export const validateRecoveryCode = [
  body('email')
    .isEmail()
    .withMessage("Invalid email address")
];

export const validateSendCodeOTPMail = [
  body('email')
    .isEmail()
    .withMessage("Invalid email address")
    .notEmpty()
];

export const validateVerifyOTPOAuth = [
  body('email')
    .isEmail()
    .withMessage("Invalid email address")
    .notEmpty(),
  body('otp')
    .notEmpty()
    .withMessage('OTP is required')
    .isLength({ min: 6, max: 6 })
    .withMessage('OTP must be 6 characters long')
    .isNumeric()
    .withMessage('OTP must be a number')
    .matches(/^[0-9]*$/)
    .withMessage('OTP must be a number')
];

export const validateRecoverPassword = [
  body("email")
    .isEmail()
    .withMessage("Invalid email address")
    .notEmpty(),
  body("password")
    .isString()
    .isLength({ min: 6 })
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\s\S]*$/)
    .withMessage("Password must be at least 6 characters long, contain at least one uppercase letter, one lowercase letter, and one number"),
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Passwords do not match');
    }
    return true;
  })
];