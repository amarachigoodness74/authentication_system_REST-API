import * as express from 'express';
import { isAuthenticated, acountLimiter } from '../middlewares';
import {
  signupValidation,
  loginValidation,
  forgetPasswordValidation,
  resetPasswordValidation,
  validate,
} from '../validations/auth.validation';
import {
  signupController,
  loginController,
  forgotPasswordController,
  resetPasswordController,
  refreshTokenController,
  logoutController,
} from '../controllers/auth.controller';

const router = express.Router();

router.post(
  '/signup',
  signupValidation(),
  validate,
  signupController
);

router.post(
  '/login',
  acountLimiter,
  loginValidation(),
  validate,
  loginController
);
router.post(
  '/forgot-password',
  acountLimiter,
  forgetPasswordValidation(),
  validate,
  forgotPasswordController
);
router.put(
  '/reset-password',
  resetPasswordValidation(),
  validate,
  isAuthenticated,
  resetPasswordController
);

router.get('/refresh-token', refreshTokenController);
router.get('/logout', logoutController);

export default router;
