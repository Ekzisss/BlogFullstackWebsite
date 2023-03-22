// import { body } from 'express-validator';
import { body } from 'express-validator';

export const registerValidation = [
  body('email').isEmail(),
  body('password').isLength({ min: 5 }),
  body('fullName').isLength({ min: 2 }),
  body('avatarUrl').optional().isURL(),
];

export const loginValidation = [body('email').isEmail(), body('password').isLength({ min: 5 })];

export const postCreateValidation = [
  body('title').isLength({ min: 3 }).isString(),
  body('text').isLength({ min: 10 }).isString(),
  body('tags').optional().isArray(),
  body('imageUrl').optional().isString(),
];

export const postUpdateValidation = [
  body('title').optional().isLength({ min: 3 }).isString(),
  body('text').optional().isLength({ min: 10 }).isString(),
  body('tags').optional().isArray(),
  body('imageUrl').optional().isString(),
];
