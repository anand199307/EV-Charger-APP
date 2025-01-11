import { Request, Response } from 'express';
import logger from '../../library/logger';
import { errorResponse, successResponse } from '../../helper';
import { PrismaClient } from '@prisma/client';
import { userVehicle } from '../../helper/selector';
const prisma = new PrismaClient();
// Create Vehicle

export const createVehicle = async (req: Request, res: Response) => {
  try {
    const { manufacturer, car_model, battery_capacity, variants, avatar, status } = req.body;
    // Check if required fields are missing in the request body
    if (!manufacturer || !car_model) {
      return res.status(400).json({ error: 'Manufacturer and car model are required fields' });
    }
    // Check if the vehicle with the same manufacturer and car model already exists
    const existingVehicle = await prisma.vehicles.findFirst({
      where: { manufacturer: manufacturer, car_model: car_model },
    });

    if (existingVehicle) {
      return res
        .status(409)
        .json({ error: 'Vehicle with the same manufacturer and car model already exists' });
    }
    const newVehicle = await prisma.vehicles.create({
      data: {
        manufacturer,
        car_model,
        battery_capacity,
        variants,
        avatar,
        status,
      },
    });
    return res.status(201).json({ message: 'Vehicle created successfully', data: newVehicle });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to create vehicle' });
  }
};

// update vechicle
export const updateVehicle = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { manufacturer, car_model, battery_capacity, variants, avatar, status } = req.body;

    // Fetch the existing vehicle data
    const existingVehicle = await prisma.vehicles.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!existingVehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }
    // Prepare data to update only provided fields
    const updatedData: any = {};
    if (manufacturer !== undefined) updatedData.manufacturer = manufacturer;
    if (car_model !== undefined) updatedData.car_model = car_model;
    if (battery_capacity !== undefined) updatedData.battery_capacity = battery_capacity;
    if (variants !== undefined) updatedData.variants = variants;
    if (avatar !== undefined) updatedData.avatar = avatar;
    if (status !== undefined) updatedData.status = status;

    const updatedVehicle = await prisma.vehicles.update({
      where: {
        id: parseInt(id),
      },
      data: updatedData,
    });

    return res.status(200).json({ message: 'Vehicle updated successfully', data: updatedVehicle });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to update vehicle' });
  }
};

// list of vechicles
export const vehiclesList = async (request: Request, response: Response) => {
  try {
    const { skip, limit } = response.locals;
    const { manufacturer = '', car_model = '' } = request.query;
    const vehiclesQuery = {
      where: {
        // Apply search criteria if manufacturer or car_model is provided
        AND: [
          manufacturer ? { manufacturer: { contains: manufacturer as string } } : {},
          car_model ? { car_model: { contains: car_model as string } } : {},
          { status: true },
        ],
      },
      take: limit,
      skip: skip,
    };

    const res = await prisma.vehicles.findMany(vehiclesQuery);
    const count = await prisma.vehicles.count(vehiclesQuery);

    return successResponse(response, 200, { data: res, count: count });
  } catch (error: any) {
    logger.error(error.message);
    return errorResponse(response, String(error));
  }
};

// Create a user vehicle record (skipping parameters without values)
export const createUserVehicle = async (req: Request, res: Response) => {
  try {
    const { user_id, vehicle_id, vin_number,status } = req.body;

    // Check if the user already has the same vehicle
    const existingUserVehicle = await prisma.userVehicles.findFirst({
      where: {
        user_id,
        vehicle_id,
      },
    });
    if (existingUserVehicle) {
      return res.status(400).json({ error: 'User already has this vehicle' });
    }
    // Create a new record with only parameters that have values
    const data = {
      user_id,
      vehicle_id,
      vin_number,
      status
    };
    if (vin_number) {
      data.vin_number = vin_number;
    }
    // Add other parameters in a similar way based on their presence in the request
    const newUserVehicle = await prisma.userVehicles.create({
      data: data as any,
    });

    return res
      .status(201)
      .json({ message: 'User vehicle created successfully', data: newUserVehicle });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Failed to create user vehicle' });
  }
};

//  user vehicle record by ID
export const getUserVehicles = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const userVehicles = await prisma.userVehicles.findMany({
      where: {
        user_id: parseInt(userId),
        status: true,
      },
      select: userVehicle,
    });
    return res.status(200).json({ data: userVehicles });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch user vehicles' });
  }
};

//  remove user vechile
export const removeUserVechile = async (req: Request, res: Response) => {
  try {
    const { vechicleId } = req.params;
    const existingVehicle = await prisma.userVehicles.findUnique({
      where: { id: Number(vechicleId) },
    });
    if (!existingVehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }
    const removeVechile = await prisma.userVehicles.delete({
      where: { id: Number(vechicleId) },
    });
    return res.status(200).json({ data: removeVechile });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to remove user vehicles' });
  }
};

// list of connectors
export const evConnectors = async (request: Request, response: Response) => {
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
      prisma.connectorTypes.findMany(connectorQuery),
      prisma.connectorTypes.count({ where: { name: { contains: name as string } } }),
    ]);

    return successResponse(response, 200, { data, count });
  } catch (error: any) {
    logger.error(error.message);
    return errorResponse(response, String(error));
  }
};
