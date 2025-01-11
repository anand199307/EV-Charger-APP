import { Request, Response } from 'express';
import { prisma } from '../../core/db';
import logger from '../../library/logger';
import { errorResponse, successResponse } from '../../helper';
import { userSelector } from '../../helper/selector';
import { checkLocationById, editLocation } from '../../models/location';
// userInfo
export const userInfo = async (request: Request, response: Response) => {
  try {
    const { user } = response.locals;
    const userInfo = await prisma.users.findUnique({
      where: { phone_number: user.phone_number },
      select: userSelector,
    });
    return successResponse(response, 200, { data: userInfo });
  } catch (error: any) {
    logger.error(error.message);
    return errorResponse(response, String(error));
  }
};

// update user Details
export const updateUser = async (request: Request, response: Response) => {
  try {
    const { uuid } = request.params;
    const { body } = request;
    // Retrieve the user by UUID
    const existingUser = await prisma.users.findFirst({ where: { uuid: uuid } });

    if (!existingUser) {
      throw new Error(`404: User with UUID - ${uuid} not found`);
    }
    if (Object.keys(body).length === 0) {
      throw new Error('404: No update data provided');
    }
    // Update the user fields based on the request body
    const updatedUser = await prisma.users.update({
      where: {
        id: existingUser.id,
      },
      data: {
        first_name: body.first_name || existingUser.first_name,
        last_name: body.last_name || existingUser.last_name,
        email: body.email || existingUser.email,
      },
    });
    if (body.location_details) {
      const existingLocation = await checkLocationById(Number(body.location_details.id));
      if (!existingLocation) {
        throw new Error('404: Location id not found');
      } else {
        const updateLocation = await editLocation(
          Number(body.location_details.id),
          body.location_details,
        );
      }
    }
    return successResponse(response, 200, { data: 'updated succesfully' });
  } catch (error: any) {
    logger.error(error.message);
    return errorResponse(response, String(error));
  }
};

// getusers

export const getUsers = async (request: Request, response: Response) => {
  try {
    // Extract query parameters and ensure they are strings
    const { page = '1', limit = '10', search = '' } = request.query;
    const offset = (Number(page) - 1) * Number(limit);

    // Query to fetch users with pagination and search options
    const users = await prisma.users.findMany({
      where: {
        OR: [
          { email: { contains: search as string } },
          { phone_number: { contains: search as string } },
          { first_name: { contains: search as string } },
          { last_name: { contains: search as string } },
        ],
      },
      select: {
        uuid: true,
        first_name: true,
        last_name: true,
        phone_number: true,
        email: true,
        wallet_amount: true,
        status: true,
        location: true,
        account: {
          select: {
            name: true,
          },
        },
        user_vehicle: {
          select: {
            vehicle: {
              select: {
                variants: true,
                car_model: true,
                status: true,
                manufacturer: true,
              },
            },
          },
        },
      },
      orderBy: { created_at: 'desc' },
      take: Number(limit),
      skip: offset,
    });

    // Count total number of users (for pagination)
    const totalUsers = await prisma.users.count({
      where: {
        OR: [
          { email: { contains: search as string } },
          { phone_number: { contains: search as string } },
          { first_name: { contains: search as string } },
          { last_name: { contains: search as string } },
        ],
      },
    });

    // Return response with users and total count
    return response.status(200).json({ users, totalUsers });
  } catch (error) {
    console.error('Error fetching users:', error);
    return response.status(500).json({ error: 'Failed to fetch users' });
  }
};
