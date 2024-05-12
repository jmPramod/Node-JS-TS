import express from 'express';

import bcrypt from 'bcryptjs';
import { userModel, validateUserModel } from '../model/user.schema';
const register = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { error, value } = validateUserModel.validate(req.body);

    if (error) {
      return res.status(400).json({
        statusCode: 400,
        data: null,
        error: error.details[0].message,
        message: '',
      });
    }
    const saltRounds = 10;
    const hashPass = await bcrypt.hash(value.password, saltRounds);
    value.password = hashPass;
    let registerData = new userModel(value);
    console.log(registerData);

    let data = await registerData.save();
    return res.status(200).json({
      statusCode: 200,
      data: data,
      error: null,
      message: 'User Created Successfully.',
    });
  } catch (error) {
    next(error);
  }
};
const profileUpdate = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    let { id } = req.params;
    const { error, value } = validateUserModel.validate(req.body);

    if (error) {
      return res.status(400).json({
        statusCode: 400,
        data: null,
        error: error.details[0].message,
        message: '',
      });
    }
    const saltRounds = 10;
    const hashPass = await bcrypt.hash(value.password, saltRounds);
    value.password = hashPass;
    let registerData = new userModel(value);
    console.log(registerData);

    let data = await userModel.findByIdAndUpdate({ _id: id }, value);
    return res.status(200).json({
      statusCode: 200,
      data: data,
      error: null,
      message: 'Profile updated Successfully.',
    });
  } catch (error) {
    next(error);
  }
};
const forgotPassword = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
  } catch (error) {
    next(error);
  }
};
export { register, profileUpdate, forgotPassword };
