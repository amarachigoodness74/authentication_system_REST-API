import * as express from 'express';
import isAuthenticated from '../middlewares/isAuthenticated';
import acountLimiter from '../middlewares/rateLimiter';
import {
  userWithoutPasswordValidation,
  validate,
} from '../validations/user.validation';
import {
  getUsersController,
  getUserController,
  updateUserController,
  deleteUserController,
} from '../controllers/user.controlller';

const router = express.Router();

router.get(
  '/',
  isAuthenticated,
  getUsersController
);
router.get(
  '/:userId',
  getUserController
);
router.put(
  '/:userId',
  userWithoutPasswordValidation(),
  validate,
  isAuthenticated,
  updateUserController
);
router.delete(
  '/:userId',
  acountLimiter,
  deleteUserController
);

export default router;
