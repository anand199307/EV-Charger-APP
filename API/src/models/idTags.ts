import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// find existing
export const findExistingTag = async (id: number) => {
  const resp = await prisma.idTags.findUnique({ where: { id: id } });
  return resp;
};

// create charger
export const addTags = async (data: any) => {
  const resp = await prisma.idTags.create({ data: data });
  return resp;
};

// update charger
export const updateTags = async (id: number, data: any) => {
  const updatedCharger = await prisma.idTags.update({
    where: {
      id: id,
    },
    data: {
      ...Object.fromEntries(Object.entries(data).filter(([_, v]) => v !== null && v !== undefined)),
    },
  });
  return updatedCharger;
};

// delete charager
export const deleteTags = async (id: number) => {
  const resp = await prisma.idTags.delete({
    where: {
      id: id,
    },
  });
  return resp;
};

