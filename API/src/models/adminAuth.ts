import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import { generateResetToken, getDate } from '../helper';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// findAdmin by emain
export const checkExistAdmin = async (email: string) => {
  const admin = await prisma.admins.findUnique({ where: { email: email } });
  return admin;
};
// create admin
export const createNewAdmin = async (res: any) => {
  const admin = await prisma.admins.create({ data: res });
  return admin;
};

// create admin session
export const createAdminSession = async (
  admin_id: BigInt,
  ipAddress: string,
  userAgent: string | undefined,
) => {
  const session_key = uuidv4() as string;
  const session = await prisma.adminSessions.create({
    data: {
      admin_id: admin_id as bigint,
      session_key,
      salt: uuidv4() as string,
      logged_in: 1,
      expires_at: getDate(10),
      ip_address: ipAddress,
      user_agent: userAgent,
      auth_token: jwt.sign({ admin_id: admin_id }, session_key, {
        expiresIn: '10d',
      }),
    },
  });
  return session;
};

export const afterLoginVerified = async (user: any) => {
  const resp = await prisma.admins.update({
    where: { id: user?.id },
    data: {
      num_logins: (user.num_logins || 0) + 1,
      last_login_at: new Date(),
    },
  });
  return resp;
};

export const signOut = async (user: any) => {
  const resp = await prisma.admins.update({
    where: { id: user?.id },
    data: {
      num_logouts: (user.num_logouts || 0) + 1,
      last_logout_at: new Date(),
    },
  });
  return resp;
};

export const sessionOut = async (session: any) => {
  const resp = await prisma.adminSessions.update({
    where: { id: session?.id },
    data: {
      logged_in: 0,
      expires_at: new Date(),
    },
  });
  return resp;
};

// set forgot password
export const setForgotPassword = async(email:string)=>{
  const updateUser = await prisma.admins.update({
    where: {
        email: email,
    },
    data: {
        reset_password_token: await generateResetToken(),
        reset_password_sent_at: new Date().toISOString(),
        reset_password: true,
    },
});
return updateUser;
}
