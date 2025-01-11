import { Request, Response } from 'express';
import { successResponse } from '../../helper';
import { PrismaClient } from '@prisma/client';
import { addTags, findExistingTag, updateTags } from '../../models/idTags';
const prisma = new PrismaClient();

// add new

export const createdTag = async (request: Request, response: Response) => {
    try {
        const { userId, tag_value } = request.body;
        const expiry_date = new Date();
        expiry_date.setMonth(expiry_date.getMonth() + 3);
        const data =  {
            userId,
            tag_value,
            expiry_date,
          }
        const idTag = await addTags(data)
        return successResponse(response, 200, { data: idTag });
      } catch (error) {
        console.error('Error creating ID tag:', error);
        response.status(500).json({ error: 'Failed to create ID tag' });
      }
};

// update
export const addChanges = async (request: Request, response: Response) => {
    try {
        const {id} =request.params;
        const existTag = await findExistingTag(id as unknown as number)
        if(!existTag){
            return response.status(404).json({ error: 'connector not found' }); 
        }
        const updatedIdTag = await updateTags(id as unknown as number,request.body)
    
        return successResponse(response, 200, { data: updatedIdTag });
      } catch (error) {
        console.error('Error updating ID tag:', error);
        response.status(500).json({ error: 'Failed to create ID tag' });
      }
};
 
// delete
export const deleteTags = async (request: Request, response: Response) => {
    try {
        const id = parseInt(request.params.id);
        await prisma.idTags.delete({
          where: { id },
        });
        return successResponse(response, 200, { message: 'ID tag deleted successfully'  });
      } catch (error) {
        console.error('Error deleting ID tag:', error);
        response.status(500).json({ error: 'Failed to delete ID tag' });
      }
}