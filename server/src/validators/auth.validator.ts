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