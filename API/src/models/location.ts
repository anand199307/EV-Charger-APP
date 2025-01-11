import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
// check location
export const checkExistingLocation = async (locationData: any) => {
  const existingLocation = await prisma.locations.findFirst({
    where: locationData,
  });
  return existingLocation;
};

// create location
export const createLocation = async (data: any) => {
  const resp = await prisma.locations.create({ data: data });
  return resp;
};

// delete location
export const deleteLocation = async (id: any) => {
  const resp = await prisma.locations.delete({ where: { id: id } });
  return resp;
};

// update location
export const editLocation = async (id: number, data: any) => {
  const resp = await prisma.locations.update({
    where: { id: id },
    data: {
      ...Object.fromEntries(Object.entries(data).filter(([_, v]) => v !== null && v !== undefined)),
    },
  });
  return resp;
};

// check by Id
export const checkLocationById = async (id: any) => {
  const existingLocation = await prisma.locations.findUnique({ where: { id: id } });
  return existingLocation;
};
