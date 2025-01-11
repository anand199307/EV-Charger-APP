import { Request, Response } from 'express';
import logger from '../../library/logger';
import { errorResponse, successResponse } from '../../helper';
import {
  userLoginVerified,
  createUserSession,
  userSessionOut,
  userSignOut,
  sendOtp,
  createUser,
  findUser,
  verfiyOtp,
} from '../../models/userAuth';
import { sendSms } from '../../library/sms';
import { createLocation } from '../../models/location';

// login
export const login = async (request: Request, response: Response) => {
  try {
    const { phone_number } = request.body;
    if (!phone_number) {
      throw new Error('401: Phone Number is missing');
    }
    const user = await findUser(phone_number);
    if (user) {
      const otp = await sendOtp(user.phone_number);
      if (otp.phone_number_code) {
        const otpMessage = `Welcome back to Helios.Your one-time password (OTP) is ${otp.phone_number_code}. This OTP vaild for only 2mints. Please use this code to proceed before it expires.`;
        const resp = await sendSms(user.phone_number, otpMessage);
        return successResponse(response, 200, 'User signIn sucessfully');
      } else {
        return response.status(404).send('Service not available.');
      }
    } else {
      const location = await createLocation({
        country_id: 1,
        province_id: 1,
        city_id: 1,
        address_line1: 'chennai',
        postal_index_code: '600001',
      });
      const newUser = await createUser(phone_number, 1, Number(location.id));
      if (!newUser.phone_number) {
        throw new Error('404: user not created');
      }
      if (newUser.phone_number) {
        const otp = await sendOtp(newUser.phone_number);
        if (otp.phone_number_code) {
          const otpMessage = `Welcome to Helios.Your one-time password (OTP) is ${otp.phone_number_code}. This OTP vaild for only 2mints. Please use this code to proceed before it expires.`;
          const resp = await sendSms(newUser.phone_number, otpMessage);
          if (resp) return successResponse(response, 200, 'User created sucessfully');
        } else {
          return response.status(404).send('Service not available.');
        }
      }
    }
  } catch (error: any) {
    logger.error(error.message);
    return errorResponse(response, String(error));
  }
};

//  verfiy otp
export const verifyPhoneOtp = async (request: Request, response: Response) => {
  try {
    const { code, phone_number } = request.body;
    const user = await findUser(phone_number);
    if (!code) {
      throw new Error("404:Param 'code' is missing");
    }
    if (code !== Number(user?.phone_number_code)) {
      throw new Error('400:Invalid Otp');
    }
    if (user?.phone_code_expire_at) {
      if (user.phone_code_expire_at < new Date()) {
        throw new Error('422: Otp code expired!');
      }
      const res = await verfiyOtp(user.id);
      if (res) {
        const ipAddress =
          request.ip ||
          request.headers['x-real-ip'] ||
          request.headers['x-forwarded-for'] ||
          request.socket.remoteAddress;
        const userAgent = request.headers['user-agent'];
        const session = await createUserSession(user.id, String(ipAddress), userAgent);
        await userLoginVerified(user);
        if (session) {
          return response.status(200).send({ auth_token: session.auth_token });
        }
      }
    } else {
      throw new Error('422:code expiry not found');
    }
  } catch (error: any) {
    logger.error(error?.message);
    return errorResponse(response, String(error));
  }
};

// resed otp

export const resedOtp = async (request: Request, response: Response) => {
  try {
    const { phone_number } = request.body;
    if (!phone_number) {
      throw new Error('401: Phone Number is missing');
    }
    const user = await findUser(phone_number);
    if (!user) {
      throw new Error('401: User not fount');
    }
    if (user) {
      const otp = await sendOtp(user.phone_number);
      if (otp.phone_number_code) {
        const otpMessage = `Your one-time password (OTP) is ${otp.phone_number_code}. This OTP vaild for only 2mints. Please use this code to proceed before it expires.`;
        const resp = await sendSms(user.phone_number, otpMessage);
        if (resp) return successResponse(response, 200, 'Otp send sucessfully!.');
      } else {
        return response.status(404).send('Service not available.');
      }
    }
  } catch (error: any) {
    logger.error(error?.message);
    return errorResponse(response, String(error));
  }
};

// session out
export const logOut = async (req: Request, res: Response) => {
  try {
    const { user, session } = res.locals;
    const sessionResp = await userSessionOut(JSON.stringify(session));
    const resp = await userSignOut(JSON.stringify(user));
    if (sessionResp && resp) {
      return successResponse(res, 200, 'User signout sucessfully');
    } else {
      return errorResponse(res, 'Error in logout');
    }
  } catch (error: any) {
    logger.error(error.message);
    return errorResponse(res, String(error));
  }
};
