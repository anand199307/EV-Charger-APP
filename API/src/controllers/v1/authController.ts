import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import logger from '../../library/logger';
import { errorResponse, successResponse, validatePassword, generateResetToken, generateHash } from '../../helper';
import { afterLoginVerified, createAdminSession, sessionOut, signOut } from '../../models/adminAuth';
import sendMialTo from '../../library/mailer';
import { forgotPasswordTmp } from '../../helper/templates';
import { AdminInfoSelector } from '../../helper/selector';
const prisma = new PrismaClient();

// login
export const login = async (request: Request, response: Response) => {
    try {
        const { email, password } = request.body;
        console.log(email, password)
        if (!email || !password) {
            throw new Error("404: Email or password is missing.");
        }

        const admin = await prisma.admins.findUnique({
            where: { email: email },
            select: AdminInfoSelector
        });

        if (!admin) {
            throw new Error('422: Admin not found');
        }

        if (admin.status <= 0) {
            return response.status(401).send({ error: 'Admin is not active' });
        }

        const ipAddress =
            request.ip || request.headers['x-real-ip'] || request.headers['x-forwarded-for'] || request.socket.remoteAddress;
        const userAgent = request.get('user-agent') || '';

        if (await validatePassword(password, admin.password_digest)) {
            const session = await createAdminSession(admin.id, String(ipAddress), userAgent);
            return response.status(200).send({
                auth_token: session.auth_token,
                data: { ...admin, password_digest: undefined},
            });
        } else {
            return response.status(400).send({ error: 'Wrong password' });
        }
    } catch (error: any) {
        logger.error(error.message);
        return errorResponse(response, String(error));
    }
};
// forgot password request
export const forgotPasswordRequest = async (request: Request, response: Response) => {
    try {
        const { email } = request.body;
        if (!email) {
            throw new Error("404:Given email not registered with us.");
        }
        const user = await prisma.admins.findUnique({
            where: {
                email: email,
            },
        });
        if (!user) {
            throw new Error("404:User Not found");
        }
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
        if (updateUser) {
            sendMialTo(updateUser.email, "Reset Your Password", forgotPasswordTmp(updateUser.reset_password_token))
        }
        return successResponse(response, 200, { data: "Email send successfully." })
    } catch (error: any) {
        logger.error("error is reset password request", error)
        return errorResponse(response, String(error));
    }
}

// update Password
export const updatePassword = async (req: Request, res: Response) => {
    try {
        const { reset_password_token, password, confirm_password } = req.body;
        if (!reset_password_token || !password || !confirm_password) {
            throw new Error("401: Required perams missing.")
        }
        if (password !== confirm_password) {
            throw new Error("401: Password mismatch.")
        }
        const user = await prisma.admins.findFirst({
            where: {
                reset_password_token: reset_password_token,
            },
        });
        if (!user) {
            throw new Error("404: User not found.")
        }
        if (user.reset_password_token !== reset_password_token) {
            throw new Error("404: Invalid token.")
        }
        const newPassword = await generateHash(password);
        const updateadmin = await prisma.admins.update({
            where: {
                id: user.id,
            },
            data: {
                reset_password: false,
                password_digest: newPassword,
            }
        });
        return successResponse(res, 200, { data: `${updateadmin.first_name?.toLocaleUpperCase()} Your password updated successfully.` })
    } catch (error: any) {
        logger.error(error.message);
        return errorResponse(res, String(error));
    }
}

// session out
export const logOut = async (req: Request, res: Response) => {
    try {
        const { user, session } = res.locals
        const sessionResp = await sessionOut(session)
        const resp = await signOut(user)
        if (sessionResp && resp) {
            return successResponse(res, 200, "User signout sucessfully")
        } else {
            return errorResponse(res, "Error in logout")
        }
    } catch (error: any) {
        logger.error(error.message);
        return errorResponse(res, String(error));
    }
}

