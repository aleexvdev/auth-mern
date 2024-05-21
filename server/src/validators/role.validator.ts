import { query } from "express-validator";

export const validateGetRoleById = [
  query('id')
    .exists()
    .withMessage('id is required')
    .notEmpty()
    .withMessage('id is required')
];