import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// find existing
export const findExistingConnector = async (id: bigint) => {
  const resp = await prisma.connectors.findUnique({ where: { id: id } });
  return resp;
};

// create charger
export const addConnector = async (data: any) => {
  const resp = await prisma.connectors.create({ data: data });
  return resp;
};

// update charger
export const updateConnector = async (id: number, data: any) => {
  const updatedCharger = await prisma.connectors.update({
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
export const deleteConnector = async (id: number) => {
  const resp = await prisma.connectors.delete({
    where: {
      id: id,
    },
  });
  return resp;
};

export const validateConnector = async (oem_connector_number: any) => {
    const resp = await prisma.connectors.findFirst({
        where:{
            oem_connector_number: oem_connector_number
        }
    })
    return resp
}
