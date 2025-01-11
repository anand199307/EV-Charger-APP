import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// host info
export const findHostByID = async (hostId: number) => {
  const host = await prisma.hosts.findUnique({
    where: { id: hostId },
    include: {
      location: true,
    },
  });
  return host;
};
// Check if an host with the provided email or name already exists
export const checkexistingHost = async (name: string) => {
  const existingHost = await prisma.hosts.findFirst({
    where: { host_name: name },
  });
  return existingHost;
};

// create account
export const createNewHost = async (data: any) => {
  const resp = await prisma.hosts.create({ data: data });
  return resp;
};

// update account
export const updateHost = async (host_id: number, data: any) => {
  const updatedAccount = await prisma.hosts.update({
    where: {
      id: host_id,
    },
    include: {
      location: true,
    },
    data: {
      ...Object.fromEntries(Object.entries(data).filter(([_, v]) => v !== null && v !== undefined)),
    },
  });
  return updatedAccount;
};

// delete account
export const deleteHost = async (hostId: any) => {
  const resp = await prisma.hosts.delete({
    where: {
      id: hostId,
    },
  });
  return resp;
};

// host admin model
export const addHostAdmin = async (adminId: any, hostId: any) => {
  const resp = await prisma.hostAdmins.create({
    data: {
      admin_id: adminId,
      host_id: hostId,
    },
  });
  return resp;
};
// remove host admin
export const removeHostAdmin = async (id: any) => {
  const resp = await prisma.hostAdmins.delete({ where: { id: id } });
  return resp;
};

// fetchby accountid
export const findByAccountId =async (id: number) => {
  
}