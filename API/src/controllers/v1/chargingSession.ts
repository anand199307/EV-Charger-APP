import { Request, Response } from 'express';
import logger from '../../library/logger';
import { calculateAmount, errorResponse, successResponse } from '../../helper';
import { PrismaClient } from '@prisma/client';
import { findUserById } from '../../models/userAuth';
import { findExistingTransaction, updateSessionDetails } from '../../models/chargingSession';
import { findExistingConnector } from '../../models/connector';
import { sessionSelector } from '../../helper/selector';
const prisma = new PrismaClient();

export const recentlyChargedStationsByUserId = async (request: Request, response: Response) => {
  try {
    const { userId } = request.params;
    const { skip = 0, limit = 10 } = response.locals;

    if (!userId) {
      return response.status(400).json({ error: 'User ID is required.' });
    }

    const existingUser = await findUserById(userId);
    if (!existingUser) {
      return response.status(400).json({ error: 'User not found.' });
    }

    const count = await prisma.chargingSessions.count({
      where: {
        userId: parseInt(userId),
      },
    });

    const recentSessions = await prisma.chargingSessions.findMany({
      where: {
        userId: parseInt(userId),
      },
      select: {
        id: true,
        total: true,
        limit: true,
        limitType: true,
        refund: true,
        reason: true,
        updated_at: true,
        charger: {
          select: {
            id: true,
            name: true,
            latitude: true,
            longitude: true,
            property: {
              select: {
                location: {
                  select: {
                    address_line1: true,
                    address_line2: true,
                    postal_index_code: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        startTime: 'desc', // Sorting by startTime in descending order
      },
      take: limit,
      skip: skip,
    });

    return successResponse(response, 200, { count, data: recentSessions });
  } catch (error: any) {
    logger.error(error.message);
    return errorResponse(response, String(error));
  }
};

export const fareUpdate = async (request: Request, response: Response) => {
  try {
    const { user } = response.locals;
    const { transactionId } = request.body;

    if (!transactionId) {
      return response.status(400).json({ error: 'Transaction ID is required.' });
    }
    const transaction = await findExistingTransaction(transactionId);
    if (!transaction) {
      return response.status(404).json({ error: 'Transaction not found.' });
    }
    const connecotorDetail = await findExistingConnector(
      transaction.connectorId as unknown as bigint,
    );

    const meterStart = transaction.meterStart ?? 0;
    const meterStop = transaction.meterStop ?? 0;
    const total = calculateAmount(meterStart, meterStop, connecotorDetail?.tariff_rate);
    const refund = Number(user.wallet_amount) - total;

    // Update session details and user wallet amount within a single transaction
    await prisma.$transaction([
      prisma.chargingSessions.update({
        where: { id: transaction.id },
        data: { total: total, refund: refund },
      }),
      prisma.users.update({
        where: { id: user.id },
        data: { wallet_amount: refund },
      }),
    ]);
    const sessions = await prisma.chargingSessions.findFirst({
      where: {
        transactionId: transactionId as unknown as number,
      },
      select: sessionSelector,
    });

    return successResponse(response, 200, {
      message: 'Transaction updated successfully.',
      transaction: sessions,
    });
  } catch (error: any) {
    logger.error(error.message);
    return errorResponse(response, String(error));
  }
};

export const chargingHistory = async (request: Request, response: Response) => {
  try {
    const { userId } = request.params;
    const { skip = 0, limit = 10 } = response.locals;

    if (!userId) {
      return response.status(400).json({ error: 'User ID is required.' });
    }

    const existingUser = await findUserById(userId);
    if (!existingUser) {
      return response.status(400).json({ error: 'User not found.' });
    }

    const count = await prisma.chargingSessions.count({
      where: {
        userId: parseInt(userId),
      },
    });

    const recentSessions = await prisma.chargingSessions.findMany({
      where: {
        userId: parseInt(userId),
      },
      // select: {
      //   charger: {
      //     select: {
      //       id: true,
      //       name: true,
      //       latitude: true,
      //       longitude: true,
      //       property: {
      //         select: {
      //           location: {
      //             select: {
      //               address_line1: true,
      //               address_line2: true,
      //               postal_index_code: true,
      //             },
      //           },
      //         },
      //       },
      //     },
      //   },
      //   total: true,
      //   limit: true,
      //   limitType: true,
      //   refund: true,
      //   reason: true,
      // },
      take: limit,
      skip: skip,
    });

    return successResponse(response, 200, { count, data: recentSessions });
  } catch (error: any) {
    logger.error(error.message);
    return errorResponse(response, String(error));
  }
};

export const sessionInfo = async (request: Request, response: Response) => {
  try {
    const { transactionId } = request.query;
    if (!transactionId) {
      return response.status(400).json({ error: 'Transaction ID is required.' });
    }
    const transaction = await findExistingTransaction(transactionId as unknown as number);
    if (!transaction) {
      return response.status(404).json({ error: 'Transaction not found.' });
    }
    const sessions = await prisma.chargingSessions.findFirst({
      where: {
        transactionId: transactionId as unknown as number,
      },
      select: {
        id: true,
        total: true,
        limit: true,
        limitType: true,
        refund: true,
        reason: true,
        updated_at: true,
        charger: {
          select: {
            name: true,
            property: {
              select: {
                location: {
                  select: {
                    address_line1: true,
                    address_line2: true,
                    postal_index_code: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    return successResponse(response, 200, { data: sessions });
  } catch (error: any) {
    logger.error(error.message);
    return errorResponse(response, String(error));
  }
};

export const getChargingSessions = async (request: Request, response: Response) => {
  try {
    // Extract query parameters and ensure they are strings
    const { page = '1', limit = '10', search = '' } = request.query;
    const offset = (Number(page) - 1) * Number(limit);

    // Query charging sessions with pagination and search options
    const chargingSessions = await prisma.chargingSessions.findMany({
      where: {
        OR: [
          { idTagId: { contains: search as string } },
          { reason: { contains: search as string } },
          { limitType: { contains: search as string } },
        ],
      },
      orderBy: { created_at: 'desc' }, // Sort by created_at in descending order
      take: Number(limit),
      skip: offset,
      include: {
        user:{
          select:{
            uuid: true,
            first_name: true,
            last_name: true,
            phone_number: true,
          }
        },
        charger:{
          select:{
            name: true,
            land_mark: true,
            property:{
              select:{
                name: true,
              }
            }
          }
        } 
      },
    });

    // Count total number of charging sessions (for pagination)
    const totalChargingSessions = await prisma.chargingSessions.count({
      where: {
        OR: [
          { idTagId: { contains: search as string } },
          { reason: { contains: search as string } },
          { limitType: { contains: search as string } },
        ],
      },
    });

    // Return response with charging sessions and total count
    return response.status(200).json({ chargingSessions, totalChargingSessions });
  } catch (error) {
    console.error('Error fetching charging sessions:', error);
    return response.status(500).json({ error: 'Failed to fetch charging sessions' });
  }
};