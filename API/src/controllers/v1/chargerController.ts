import { Request, Response } from 'express';
import logger from '../../library/logger';
import { errorResponse, generateUUID, successResponse } from '../../helper';
import { PrismaClient } from '@prisma/client';
import { chargerRequiredFields } from '../../helper/peramValidation';
import {
  addCharger,
  findExistingCharger,
  updateCharger,
  validateCharger,
} from '../../models/charger';
const prisma = new PrismaClient();

// add new

export const createCharger = async (request: Request, response: Response) => {
  try {
    const { body } = request;
    const { name, serial_number } = request.body;
    // Check for missing parameters
    const missingParams = chargerRequiredFields.filter((field) => !body[field]);
    if (missingParams.length > 0) {
      return response
        .status(400)
        .json({ error: `Missing parameters: ${missingParams.join(', ')}` });
    }
    const existingCharger = await validateCharger(name, serial_number);
    if (existingCharger) {
      return response
        .status(400)
        .json({ error: 'charger name or given serial number already exist' });
    }
    request.body['uuid'] = await generateUUID();
    const res = await addCharger(body);
    return successResponse(response, 200, { data: res });
  } catch (error: any) {
    logger.error(error.message);
    return errorResponse(response, String(error));
  }
};

// update
export const addChanges = async (request: Request, response: Response) => {
  try {
    const { chargerId } = request.params;
    const { body } = request;
    const existCharger = await findExistingCharger(Number(chargerId));
    if (!existCharger) {
      return response.status(404).json({ error: 'charger id not found' });
    }
    const resp = await updateCharger(Number(chargerId), body);
    return successResponse(response, 200, { data: resp });
  } catch (error: any) {
    logger.error(error.message);
    return errorResponse(response, String(error));
  }
};

// list
export const chargerList = async (request: Request, response: Response) => {
  try {
    let { skip, limit } = response.locals;
    let { search = '' } = request.query;
    const chargerQuery = {
      where: {
        OR: [{ name: { contains: search as string } }],
      },
      take: limit,
      skip: skip,
    };
    const chargers = await prisma.chargers.findMany(chargerQuery);

    // Fetching connector count for each charger
    const chargersWithConnectorsCount = await Promise.all(
      chargers.map(async (charger:any) => {
        const connectorCount = await prisma.connectors.count({
          where: {
            charger_id: charger.id,
          },
        });
        return {
          ...charger,
          connectorCount: connectorCount,
        };
      }),
    );

    const count = await prisma.chargers.count({ where: chargerQuery.where });
    return successResponse(response, 200, { data: chargersWithConnectorsCount, count: count });
  } catch (error: any) {
    logger.error(error.message);
    return errorResponse(response, String(error));
  }
};

//charger with connecotr by chargerId
export const fetchChargerDetails = async (request: Request, response: Response) => {
  try {
    const { chargerId } = request.params;
    const existCharger = await findExistingCharger(Number(chargerId));
    if (!existCharger) {
      return response.status(404).json({ error: 'charger  not found' });
    }
    const resp = await prisma.chargers.findUnique({
      where: { id: chargerId as unknown as number },
      include: {
        Connectors: true,
      },
    });
    return successResponse(response, 200, { data: resp });
  } catch (error: any) {
    logger.error(error.message);
    return errorResponse(response, String(error));
  }
};

// suggested nearby chargers
export const nearbyChargers = async (request: Request, response: Response) => {
  try {
    const { latitude, longitude } = request.query;
    const { skip = 0, limit = 10 } = response.locals;

    if (!latitude || !longitude) {
      return response.status(404).json({ error: 'Latitude or longitude is missing.' });
    }

    const parsedLatitude = parseFloat(latitude.toString());
    const parsedLongitude = parseFloat(longitude.toString());

    // Fetch count of nearby chargers
    const count = await prisma.chargers.count({
      where: {
        latitude: {
          gte: parsedLatitude - 0.1,
          lte: parsedLatitude + 0.1,
        },
        longitude: {
          gte: parsedLongitude - 0.1,
          lte: parsedLongitude + 0.1,
        },
      },
    });

    // Fetch nearby charger details
    const nearbyChargers = await prisma.chargers.findMany({
      select: {
        name: true,
        latitude: true,
        longitude: true,
        property: {
          select: {
            location: true,
          },
        },
      },
      where: {
        latitude: {
          gte: parsedLatitude - 0.1,
          lte: parsedLatitude + 0.1,
        },
        longitude: {
          gte: parsedLongitude - 0.1,
          lte: parsedLongitude + 0.1,
        },
      },
      take: limit,
      skip: skip,
    });

    return successResponse(response, 200, { count, data: nearbyChargers });
  } catch (error: any) {
    logger.error(error.message);
    return errorResponse(response, String(error));
  }
};
