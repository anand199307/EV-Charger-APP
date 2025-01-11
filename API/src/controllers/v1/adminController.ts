import { Request, Response } from 'express';
import logger from '../../library/logger';
import { successResponse, errorResponse, generateUUID, generateHash } from '../../helper';
import { PrismaClient } from '@prisma/client';
import { adminSelctor } from '../../helper/selector';
const prisma = new PrismaClient();

// read all
export const getAdmins = async (request: Request, response: Response) => {
  try {
    let { skip, limit } = response.locals;
    let { search = '' } = request.query;
    const adminsQuery = {
      where: {
        OR: [
          { first_name: { contains: search as string } },
          { last_name: { contains: search as string } },
          { phone_number: { contains: search as string } },
        ],
      },
      take: limit,
      skip: skip,
      select: adminSelctor, // Replace 'adminSelctor' with your desired selector
    };

    const admins = await prisma.admins.findMany(adminsQuery);
    const count = await prisma.admins.count({ where: adminsQuery.where });

    return response.status(200).send({ data: admins, count: count });
  } catch (error: any) {
    logger.error(error.message);
    return errorResponse(response, String(error));
  }
};

// find one
export const findAdmin = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const user = await prisma.admins.findUnique({
      where: {
        id: id as unknown as bigint,
      },
    });
    if (user) return response.status(200).send({ data: user });
    else return response.status(404).send({ error: 'not found' });
  } catch (error: any) {
    return response.status(400).render('error', {
      error: `Error: ${error.message}`,
    });
  }
};
// create admins
export const createAdmin = async (request: Request, response: Response) => {
  try {
    const {
      first_name,
      last_name,
      email,
      phone_number,
      account_id,
      organization_id,
      password,
      confirm_password,
    } = request.body;
    request.body['uuid'] = await generateUUID();
    request.body['password_digest'] = await generateHash(password);
    request.body['status'] = 1;
    if (!first_name || !last_name || !email || !phone_number || !account_id || !organization_id) {
      throw new Error('404: Required params is missing');
    }
    if (password !== confirm_password) {
      throw new Error('404: Paswords are mismatch');
    }
    delete request.body['password'];
    delete request.body['confirm_password'];
    const existingAdmin: any = await prisma.admins.findFirst({
      where: {
        OR: [{ email: { equals: email } }, { phone_number: { equals: phone_number } }],
      },
    });
    if (existingAdmin) {
      throw new Error('422:Admin alredy exist!');
    }
    const admin = await prisma.admins.create({
      data:{
        account_id: account_id,
        organization_id: organization_id,
        uuid: await generateUUID(),
        status: 1,
        password_digest: await generateHash(password),
        email: email,
        phone_number:phone_number,
        first_name: first_name,
        last_name:last_name
      },
    });
    if (admin) {
      successResponse(response, 200, { data: 'admin created sucessfully' });
    } else {
      throw new Error('422:Failed To Create');
    }
  } catch (error: any) {
    logger.error(error.message);
    return errorResponse(response, String(error));
  }
};
