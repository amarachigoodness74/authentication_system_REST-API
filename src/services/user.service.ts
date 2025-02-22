import { omit } from 'lodash';
import { NextFunction } from 'express';
import UserModel from '../models/user.model';
import { UserDocument } from '../schema/user.schema';
import { logger } from '../utils';
import { CustomException } from '../utils/errors';
import { IUser, IUserRefreshToken } from '../interfaces/user.interface';

export const createUser = async (data: UserDocument, next: NextFunction) => {
  try {
    const user = await UserModel.create(data);
    return omit(user.toJSON(), 'password');
  } catch (error: any) {
    logger.error(`createUser UserService Error: ${error.message}`);
    return next(new (CustomException as any)(500, 'Operation unsuccessful'));
  }
};

export const validateUser = async (
  email: string,
  password: string,
  next: NextFunction
) => {
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return false;
    }

    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) return false;

    return omit(user.toJSON(), 'password');
  } catch (error: any) {
    logger.error(`validateUser UserService Error: ${error.message}`);
    return next(new (CustomException as any)(500, 'Operation unsuccessful'));
  }
};

export const isUser = async (email: string, next: NextFunction) => {
  try {
    const user = await UserModel.findOne({
      where: {
        email,
      },
    });
    return user !== null;
  } catch (error: any) {
    logger.error(`isUser UserService Error: ${error.message}`);
    return next(new (CustomException as any)(500, 'Operation unsuccessful'));
  }
};

export const findUserByEmail = async (email: string, next: NextFunction) => {
  try {
    const user = await UserModel.findOne({
      where: {
        email,
      },
    });
    return user;
  } catch (error: any) {
    logger.error(`findUserByEmail UserService Error: ${error.message}`);
    return next(new (CustomException as any)(500, 'Operation unsuccessful'));
  }
};

export const updatePassword = async (
  email: string,
  password: string,
  next: NextFunction
) => {
  try {
    const user = await findUserByEmail(email, next);
    if (user) {
      const hashedPassword = await user.hashPassword(password);
      const updatedUser = await UserModel.updateOne(
        { email: email },
        { password: hashedPassword }
      );
      if (updatedUser) {
        return true;
      }
    }
  } catch (error: any) {
    logger.error(`updatePassword UserService Error: ${error.message}`);
    return next(new (CustomException as any)(500, 'Operation unsuccessful'));
  }
};

export const findUsers = async (next: NextFunction) => {
  try {
    return await UserModel.find({});
  } catch (error: any) {
    logger.error(`findUsers UserService Error: ${error.message}`);
    return next(new (CustomException as any)(500, 'Operation unsuccessful'));
  }
};

export const findUserById = async (id: string, next: NextFunction) => {
  try {
    const user = await UserModel.findById(id);
    if (user) {
      return omit(user.toJSON(), 'password');
    }
  } catch (error: any) {
    logger.error(`findUserById UserService Error: ${error.message}`);
    return next(new (CustomException as any)(500, 'Operation unsuccessful'));
  }
};

export const updateUser = async (
  id: string,
  data: IUser | IUserRefreshToken,
  next: NextFunction
) => {
  try {
    const user = await findUserById(id, next);
    if (user) {
      const updatedUser = await UserModel.updateOne(
        { _id: user._id },
        { ...data }
      );
      if (updatedUser) {
        return true;
      }
    }
  } catch (error: any) {
    logger.error(`updateUser UserService Error: ${error.message}`);
    return next(new (CustomException as any)(500, 'Operation unsuccessful'));
  }
};

export const deleteUser = async (id: string, next: NextFunction) => {
  try {
    const user = await findUserById(id, next);
    if (user) {
      const deletedUser = await UserModel.deleteOne({ _id: user._id });
      if (deletedUser) {
        return user;
      }
    }
  } catch (error: any) {
    logger.error(`deleteUser UserService Error: ${error.message}`);
    return next(new (CustomException as any)(500, 'Operation unsuccessful'));
  }
};
