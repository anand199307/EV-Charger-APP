import { PrismaClient } from '@prisma/client';
import { generateUUID } from '../helper';
const prisma = new PrismaClient();

// find existing
export const findExistingProperty = async (property_id: number) => {
  const resp = await prisma.hostProperties.findUnique({ where: { id: property_id } });
  return resp;
};

// create 
export const createProperty = async (data: any) => {
  const properites = await prisma.hostProperties.create({ data: data});
  return properites;
};

// update
export const updateProperty= async (property_id: number, data: any) => {
  const updatedAccount = await prisma.hostProperties.update({
    where: {
      id: property_id,
    },
    data: {
      ...Object.fromEntries(Object.entries(data).filter(([_, v]) => v !== null && v !== undefined)),
    },
  });
  return updatedAccount;
};

// delete
export const deleteProperty = async (property_id: number) => {
  const resp = await prisma.hostProperties.delete({
    where: {
      id: property_id,
    },
  });
  return resp;
};

// find existing
export const findExistingPropertyInfo = async (property_id: number) => {
  const resp = await prisma.hostProperties.findUnique({
    where: { id: Number(property_id) },
    include: { location: true }, // Include the location relation
  });
  return resp;
};
