import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// find existing
export const findExistingCharger = async (charger_id: number) => {
  const resp = await prisma.chargers.findUnique({ where: { id: charger_id } });
  return resp;
};

// create charger
export const addCharger = async (data: any) => {
  const resp = await prisma.chargers.create({ data: data });
  return resp;
};

// update charger
export const updateCharger = async (charger_id: number, data: any) => {
  const updatedCharger = await prisma.chargers.update({
    where: {
      id: charger_id,
    },
    data: {
      ...Object.fromEntries(Object.entries(data).filter(([_, v]) => v !== null && v !== undefined)),
    },
  });
  return updatedCharger;
};

// delete charager
export const deleteCharger = async (charger_id: number) => {
  const resp = await prisma.chargers.delete({
    where: {
      id: charger_id,
    },
  });
  return resp;
};

// validate chargers
export const validateCharger = async (name: string, number: string) => {
  const resp = await prisma.chargers.findFirst({
    where: {
      OR: [{ name: name as string }, { serial_number: number as string }],
    },
  });
  return resp;
};
