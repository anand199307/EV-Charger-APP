import { Response, Request } from 'express';
import {
  findExistingProperty,
  createProperty,
  updateProperty,
  findExistingPropertyInfo,
} from '../../models/properites';
import logger from '../../library/logger';
import { PrismaClient } from '@prisma/client';
import { errorResponse, generateUUID, successResponse } from '../../helper';
import { propertiesRequiredFields } from '../../helper/peramValidation';
import {
  checkExistingLocation,
  checkLocationById,
  createLocation,
  deleteLocation,
  editLocation,
} from '../../models/location';
import { findHostByID } from '../../models/host';
const prisma = new PrismaClient();

// amenities list
export const amenities = async (request: Request, response: Response) => {
  try {
    const { skip, limit } = response.locals;
    const { name = '' } = request.query;

    const connectorQuery = {
      where: {
        name: {
          contains: name as string,
        },
      },
      select: {
        id: true,
        name: true,
      },
      take: limit,
      skip: skip,
    };

    const [data, count] = await Promise.all([
      prisma.amenities.findMany(connectorQuery),
      prisma.amenities.count({ where: { name: { contains: name as string } } }),
    ]);

    return successResponse(response, 200, { data, count });
  } catch (error: any) {
    logger.error(error.message);
    return errorResponse(response, String(error));
  }
};

//   create properties
export const addProperty = async (request: Request, response: Response) => {
  let locationId;
  try {
    const { body } = request;
    const { amenities } = request.body;


    // Check for missing parameters
    const missingParams = propertiesRequiredFields.filter((field) => !body[field]);
    if (missingParams.length > 0) {
      return response
        .status(400)
        .json({ error: `Missing parameters: ${missingParams.join(', ')}` });
    }

    if (!Array.isArray(amenities)) {
      return response.status(400).json({ error: 'Amenities should be an array' });
    }

    // Check if the location already exists
    const existLocation = await checkExistingLocation(body.location_details);
    if (existLocation) {
      return response.status(400).json({ error: 'Location already exists' });
    }

    // Create a new location
    const newLocation = await createLocation(body.location_details);
    locationId = newLocation.id;
    // Prepare data for creating a new property
    const propertyData = {
      uuid: await generateUUID(),
      host_id: Number(body.host_id),
      location_id: Number(newLocation.id),
      status: 1,
      name: body.name,
      eb_bill_copy: body.eb_bill_copy,
      eb_number: body.eb_number,
    };

    // Create the new property
    const property = await prisma.hostProperties.create({ data: propertyData });

    // Associate amenities with the property
    const updatedProperty = await prisma.hostProperties.update({
      where: { id: Number(property.id) },
      data: {
        amenities: {
          connect: amenities.map((amenityId: number) => ({ id: amenityId })),
        },
      },
    });

    // Return success response
    return response.status(200).json({ data: updatedProperty });
  } catch (error: any) {
    // Log error and return error response
    console.log(error);
    await deleteLocation(locationId);
    logger.error(error.message);
    return errorResponse(response, String(error));
  }
};

// update properties
export const updateDetails = async (request: Request, response: Response) => {
  try {
    const { property_id } = request.params;
    const { body } = request;

    // Check if location details are provided
    if (!body.location_details?.id) {
      return response.status(400).json({ error: 'Location Id not found in the location details.' });
    }

    // Check if the location exists
    const existingLocation = await checkLocationById(Number(body.location_details.id));
    if (!existingLocation) {
      return response.status(404).json({ error: 'Location id not found' });
    }

    // Check if the account exists
    const existingAccount = await findExistingProperty(Number(property_id));
    if (!existingAccount) {
      return response.status(400).json({ error: 'Account not found.' });
    }

    // Update the location details
    await editLocation(Number(body.location_details.id), body.location_details);

    // Remove location_details from the request body
    delete body['location_details'];

    // Update the property details
    const updatedProperty = await updateProperty(Number(property_id), body);

    return response
      .status(200)
      .json({ message: 'Account updated successfully', data: updatedProperty });
  } catch (error: any) {
    logger.error(error.message);
    return response.status(500).json({ error: 'Failed to update.' });
  }
};

// find unique property details
export const propertyInfo = async (request: Request, response: Response) => {
  try {
    const { property_id } = request.params;
    // Check if the account exists
    const existingProperty = await findExistingPropertyInfo(Number(property_id));
    if (!existingProperty) {
      return response.status(400).json({ error: 'Account not found.' });
    }
    // Fetch property details along with associated amenities
    const propertyDetails = await prisma.hostProperties.findUnique({
      where: { id: Number(property_id) },
      include: { amenities: { select: { name: true,id:true } },location:true },
    });

    // Return success response
    return response.status(200).json({ data: propertyDetails });
  } catch (error: any) {
    logger.error(error.message);
    return response.status(500).json({ error: 'Failed to fetch details.' });
  }
};

export const hostPropertiesList = async (request: Request, response: Response) => {
  try {
    const { host_id } = request.params;
    const { skip, limit } = response.locals;
    const { name = '' } = request.query;

    const connectorQuery = {
      where: {
        host_id: Number(host_id),
        name: {
          contains: name as string,
        },
      },
      include: { location: true },
      take: limit,
      skip: skip,
    };
    // Check if the account exists
    const host = await findHostByID(Number(host_id));
    if (!host) {
      return response.status(400).json({ error: 'Host not found.' });
    }
    const [data, count] = await Promise.all([
      prisma.hostProperties.findMany(connectorQuery),
      prisma.hostProperties.count({ where: { name: { contains: name as string } } }),
    ]);
    // Return success response
    return response.status(200).json({ data: data, count: count });
  } catch (error: any) {
    logger.error(error.message);
    return response.status(500).json({ error: 'Failed to fetch details.' });
  }
};

export const propertiesList = async (request: Request, response: Response) => {
  try {
    const { skip, limit } = response.locals;
    const { name = '' } = request.query;
    const connectorQuery = {
      where: {
        name: {
          contains: name as string,
        },
      },
      include: { location: true },
      take: limit,
      skip: skip,
    };
    const [data, count] = await Promise.all([
      prisma.hostProperties.findMany(connectorQuery),
      prisma.hostProperties.count({ where: { name: { contains: name as string } } }),
    ]);
    // Return success response
    return response.status(200).json({ data: data, count: count });
  } catch (error: any) {
    logger.error(error.message);
    return response.status(500).json({ error: 'Failed to fetch details.' });
  }
};
