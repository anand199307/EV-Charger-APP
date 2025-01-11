import { v4 as uuidv4 } from 'uuid';
import { prisma } from '../core/db';
import jwt from 'jsonwebtoken';
import { generateUUID, getDate, generateOtp } from '../helper';

//  find user
export const findUser = async (phone_number: string) => {
  let user = await prisma.users.findUnique({
    where: { phone_number: phone_number },
  });
  return user;
};

export const findUserById = async(id: any)=>{
  let user = await prisma.users.findUnique({where:{
    id: id
  }})
  return user;
}

//  create user
export const createUser = async (phone_number: string, account_id: number, location_id: number) => {
  const newUser = await prisma.users.create({
    data: {
      account_id: account_id,
      phone_number: phone_number,
      is_phone_verified: false,
      location_id: location_id,
      uuid: await generateUUID(),
      status: 1,
    },
  });
  return newUser;
};
// create user session
export const createUserSession = async (
  user_id: BigInt,
  ipAddress: string,
  userAgent: string | undefined,
) => {
  const session_key = uuidv4() as string;
  const session = await prisma.userSessions.create({
    data: {
      user_id: user_id as bigint,
      session_key,
      salt: uuidv4() as string,
      logged_in: 1,
      expires_at: getDate(10),
      ip_address: ipAddress,
      user_agent: userAgent,
      auth_token: jwt.sign({ user_id: user_id }, session_key, {
        expiresIn: '10d',
      }),
    },
  });
  return session;
};

export const userLoginVerified = async (user: any) => {
  const resp = await prisma.users.update({
    where: { id: user?.id },
    data: {
      num_logins: (Number(user.num_logins) || 0) + 1,
      last_login_at: new Date(),
    },
  });
  return resp;
};

export const userSignOut = async (data: any) => {
  const user = JSON.parse(data);
  const resp = await prisma.users.update({
    where: { id: user?.id },
    data: {
      num_logouts: (Number(user.num_logouts) || 0) + 1,
      last_logout_at: new Date(),
    },
  });
  return resp;
};

export const userSessionOut = async (session: any) => {
  const data = JSON.parse(session);
  const resp = await prisma.userSessions.update({
    where: { id: data?.id },
    data: {
      logged_in: 0,
      expires_at: new Date(),
    },
  });
  return resp;
};

export const sendOtp = async (phone_number: string) => {
  const updateUser = await prisma.users.update({
    where: {
      phone_number: phone_number,
    },
    data: {
      phone_number_code: await generateOtp(),
      phone_code_expire_at: new Date(Date.now() + 2 * 60 * 1000),
    },
  });
  return updateUser;
};
export const verfiyOtp = async (user_id: any) => {
  const updateUser = await prisma.users.update({
    where: {
      id: user_id,
    },
    data: {
      is_phone_verified: true,
    },
  });
  return updateUser;
};
