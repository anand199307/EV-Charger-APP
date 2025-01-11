import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// account info
export const findAccount = async(accountId: any) =>{
    const account = await prisma.accounts.findUnique({where:{id:accountId}})
    return account;
}
// Check if an account with the provided email or name already exists
export const checkexistingAccount = async (email: string,name: string) => {
    const existingAccount = await prisma.accounts.findFirst({
        where: {
            OR: [
                { email: email },
                { name: name },
            ],
        },
    });
    return existingAccount
}

// create account
export const createAccount = async (data: any) => {
  const resp = await prisma.accounts.create({ data: data});
  return resp;
};

// update account 
export const updateAccount =async (account_id:any,data:any) => {
    const updatedAccount = await prisma.accounts.update({
        where: {
            id: account_id,
        },
        data: {
            ...Object.fromEntries(
              Object.entries(data).filter(([_, v]) => v !== null && v !== undefined)
            ),
          },
    });
    return updatedAccount;
}

// delete account
export const deleteAccount =async (account_id: any) => {
  const resp =  await prisma.accounts.delete({
        where: {
            id: account_id,
        },
    });
    return resp
}
