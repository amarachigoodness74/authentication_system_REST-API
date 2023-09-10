import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const userWithoutPasswordValidation = () => [
  body('name').not().isEmpty().trim().escape(),
  body('email').isEmail().normalizeEmail(),
];

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(422).json({
    status: 'error',
    errors: errors.array(),
  });
};
