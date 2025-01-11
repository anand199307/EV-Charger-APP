import { Response, Request } from 'express';
import { checkLocationById, deleteLocation, editLocation } from '../../models/location';
import logger from '../../library/logger';
import { PrismaClient } from '@prisma/client';
import { errorResponse, successResponse } from '../../helper';
import { citySelector, countrySelector, proviceSelector } from '../../helper/selector';
const prisma = new PrismaClient();

// delete location
export const removeLocation = async (request: Request, response: Response) => {
  try {
    const { locationId } = request.params;
    const existingLocation = await checkLocationById(locationId);
    if (!existingLocation) {
      return response.status(400).json({ error: 'invalid location Id.' });
    }
    const resp = await deleteLocation(locationId);
    return response.status(200).send({ data: resp });
  } catch (error: any) {
    logger.error(error.message);
    return response.status(500).json({ error: error });
  }
};

// fetch country
export const countries = async (request: Request, response: Response) => {
  try {
    let { skip, limit } = response.locals;
    let { search = '' } = request.query;
    const countryQuery = {
      where: {
        OR: [{ name: { contains: search as string } }],
      },
      take: limit,
      skip: skip,
      select: countrySelector,
    };
    const countries = await prisma.country.findMany(countryQuery);
    const count = await prisma.country.count({ where: countryQuery.where });
    return successResponse(response, 200, { data: countries, count: count });
  } catch (error: any) {
    logger.error(error.message);
    return errorResponse(response, String(error));
  }
};

// fetch provice
export const province = async (request: Request, response: Response) => {
  try {
    let { skip, limit } = response.locals;
    let { search = '' } = request.query;
    let { countryId } = request.params;
    const provinceQuery = {
      where: {
        AND: [
          { country_id: Number(countryId) },
          { OR: [{ name: { contains: search as string } }] },
        ],
      },
      take: limit,
      skip: skip,
      select: proviceSelector,
    };
    const admins = await prisma.province.findMany(provinceQuery);
    const count = await prisma.province.count({ where: provinceQuery.where });

    return response.status(200).send({ data: admins, count: count });
  } catch (error: any) {
    logger.error(error.message);
    return errorResponse(response, String(error));
  }
};

//cities list
export const cities = async (request: Request, response: Response) => {
  try {
    let { skip, limit } = response.locals;
    let { search = '' } = request.query;
    let { provinceId } = request.params;
    const citiesQuery = {
      where: {
        AND: [
          { province_id: Number(provinceId) },
          { OR: [{ name: { contains: search as string } }] },
        ],
      },
      take: limit,
      skip: skip,
      select: citySelector,
    };
    const admins = await prisma.city.findMany(citiesQuery);
    const count = await prisma.city.count({ where: citiesQuery.where });

    return response.status(200).send({ data: admins, count: count });
  } catch (error: any) {
    logger.error(error.message);
    return errorResponse(response, String(error));
  }
};

// edit location
export const updateLocation = async (request: Request, response: Response) => {
  try {
    const { locationId } = request.params;
    const existingLocation = await checkLocationById(locationId);
    if (!existingLocation) {
      return response.status(400).json({ error: 'invalid location Id.' });
    }
    const resp = await editLocation(Number(locationId), request.body);
    return successResponse(response, 200, { data: resp });
  } catch (error: any) {
    logger.error(error.message);
    return errorResponse(response, String(error));
  }
};
