import { Request, Response } from 'express';
import logger from '../../library/logger';
import { errorResponse, successResponse } from '../../helper';
import { PrismaClient } from '@prisma/client';
import { startChargerRequireFields, stopChargerRequireFields } from '../../helper/peramValidation';
import { remoteStartCharging, remoteStopCharging } from '../../library/ocpp';
const prisma = new PrismaClient();

// start charger
export const startCharger = async (request: Request, response: Response) => {
  // Get the current date
  const currentDate = new Date();

  try {
    const { cpid, connectorId, limit, limitType } = request.body;
    const { user } = response.locals;
    const { body } = request;
    const missingParams = startChargerRequireFields.filter((field) => !body[field]);
    if (missingParams.length > 0) {
      return response
        .status(400)
        .json({ error: `Missing parameters: ${missingParams.join(', ')}` });
    }
    if (Number(user.wallet_amount) <= 0) {
      return response.status(400).json({ error: `Insufficient balance to start the session` });
    }
    const idTag = await prisma.idTags.findFirst({
      where: {
        userId: user.id,
      },
    });
    // Check if the expiry date is in the past
    if (idTag && idTag.expiry_date) {
      // Added null check for expiry_date
      const isExpired = idTag.expiry_date < currentDate;
      if (isExpired) {
        return response.status(400).json({ error: `Your Tag value is expired.` });
      } else {
        const data = {
          cpid: cpid as string,
          connectorId: connectorId,
          limit: limit,
          limitType: limitType,
          idTag: idTag.tag_value,
        };
        const resp = await remoteStartCharging(data);
        if (resp.status === 'Error') {
          return response.status(400).json({ error: resp.message });
        }
        return successResponse(response, 200, {
          data: {
            status: resp.details.payload.status,
            transactionId: resp.transactionId,
            message: resp.message,
            idTag: idTag.tag_value,
          },
        });
      }
    }
  } catch (error: any) {
    logger.error(error.message);
    return errorResponse(response, String(error));
  }
};


export const stopCharger = async (request: Request, response: Response) => {
  try {
    const { cpid, transactionId, idTag } = request.body;
    const { body } = request;
    const missingParams = stopChargerRequireFields.filter((field) => !body[field]);
    if (missingParams.length > 0) {
      return response
        .status(400)
        .json({ error: `Missing parameters: ${missingParams.join(', ')}` });
    }
    const data = {
      cpid: cpid as string,
      idTag: idTag,
      transactionId: transactionId,
    };
    const resp = await remoteStopCharging(data);
    if (resp.status === 'Error') {
      return response.status(400).json({ error: resp.message });
    }
    if (resp.details.payload.status === 'Accepted') {
        return successResponse(response, 200, {
            data: resp,
          });
    }
  } catch (error: any) {
    logger.error(error.message);
    return errorResponse(response, String(error));
  }
};
