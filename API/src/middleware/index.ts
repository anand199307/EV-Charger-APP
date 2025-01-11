import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { prisma } from '../core/db';
import { errorResponse } from "../helper";
import logger from "../library/logger";

// session validation for both admin and users
export async function validateSession(request: Request, response: Response, next: any) {
    try {
        if (!request.headers.authorization) {
            return response.status(401).send("authorization token is missing")
        }
        const userSession = await prisma.userSessions.findFirst({
            where: {
                auth_token: request.headers.authorization,
            },
        });
        const adminSession = await prisma.adminSessions.findFirst({
            where: {
                auth_token: request.headers.authorization,
            },
        });
        const session = userSession || adminSession;
        if (!session) {
            return response.status(401).send("invalid authorization token ")
        }
        if(session.logged_in===0){
            return response.status(401).send("invalid authorization token ")
        }
        const decoded = jwt.verify(request.headers.authorization, session.session_key);
        let userId = parseInt((decoded as any).user_id) as unknown as bigint;
        let adminId = parseInt((decoded as any).admin_id) as unknown as bigint;
        if (userId) {
            const user = await prisma.users.findFirst({
                where: {
                    id: userId,
                },
            });

            if (!user) return response.status(401).send("invalid user's authorization token");
            // const expiresAtTimestamp: number = session.expires_at!.getTime()/1000;
            // const currentTimestamp: number = Math.floor(Date.now() / 1000);
            // if (expiresAtTimestamp <= currentTimestamp) {
            //     return response.status(403).send("Session Expired!! ")

            // }
            response.locals.user = user;
            response.locals.session = session;
        } else if (adminId) {
            const admin = await prisma.admins.findFirst({
                where: {
                    id: adminId,
                },
            });
            if (!admin) return response.status(401).send("invalid admin's authorization token");
            // const expiresAtTimestamp: number = session.expires_at!.getTime() / 1000;
            // const currentTimestamp: number = Math.floor(Date.now() / 1000);
            // if (expiresAtTimestamp <= currentTimestamp) {
            //     return response.status(403).send("Session Expired!! ")
            // }
            response.locals.user = admin;
            response.locals.session = session;
        }
    } catch (error: any) {
        logger.error("session validation", error)
        return response.status(401).send(error.message);
    }
    next();
}

export const parsePagination = (req: Request, res: Response, next: NextFunction) => {
    let { page = 1, limit = 10} = req.query;
    const pageNumber = parseInt(page as string, 10);
    const limitNumber = parseInt(limit as string, 10);
    res.locals.limit = limitNumber;
    res.locals.skip = (pageNumber - 1) * limitNumber;
    next();
  };