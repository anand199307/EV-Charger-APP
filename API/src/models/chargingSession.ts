import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// find existing
export const findExistingTransaction = async (transactionId: number) => {
  const resp = await prisma.chargingSessions.findFirst({ where: { transactionId: transactionId } });
  return resp;
};

// create charger
export const addSession = async (data: any) => {
  const resp = await prisma.chargingSessions.create({ data: data });
  return resp;
};

// update charger
export const updateSessionDetails = async (id: any, data: any) => {
  const updatedCharger = await prisma.chargingSessions.update({
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
export const deleteSession = async (id: number) => {
  const resp = await prisma.chargingSessions.delete({
    where: {
      id: id,
    },
  });
  return resp;
};

