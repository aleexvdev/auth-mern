import { body, query } from "express-validator";

export const validateGetUserById = [
  query('id')
    .exists()
    .withMessage('ID User is required')
    .notEmpty()
    .withMessage('ID User is required')
];

export const validateCreateUser = [
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

export const validateUpdateUser = [
  query('id')
    .exists()
    .withMessage('ID User is required')
    .notEmpty()
    .withMessage('ID User is required'),
  body("username")
    .optional()
    .isString()
    .isLength({ min: 4, max: 10 })
    .withMessage("Username must be between 4 and 10 characters"),
  body("email")
    .optional()
    .isEmail()
    .withMessage("Invalid email address"),
  body("password")
    .optional()
    .isString()
    .isLength({ min: 6 })
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\s\S]*$/)
    .withMessage("Password must be at least 6 characters long, contain at least one uppercase letter, one lowercase letter, and one number"),
  body("roles")
    .notEmpty()
    .withMessage('Roles field is required')
    .isArray({ min: 1 })
    .withMessage('Roles must be an array with at least one value')
    .custom((value) => {
      const validRoles = ['admin', 'user', 'moderator'];
      const invalidRoles = value.filter((role: string) => !validRoles.includes(role));
      if (invalidRoles.length > 0) {
        throw new Error(`Invalid roles: ${invalidRoles.join(', ')}`);
      }
      return true;
    }),
];

export const validateDeleteUser = [
  query('id')
    .exists()
    .withMessage('ID User is required')
    .notEmpty()
    .withMessage('ID User is required')
];
