import { Request, Response } from 'express';
import logger from '../../library/logger';
import { errorResponse, successResponse } from '../../helper';
import { PrismaClient } from '@prisma/client';
import { connectorRequiredFields } from '../../helper/peramValidation';
import { addConnector, findExistingConnector, updateConnector, validateConnector } from '../../models/connector';
const prisma = new PrismaClient();

// add new

export const createdConnector = async (request: Request, response: Response) => {
  try {
    const { body } = request;
    const { oem_connector_number } = request.body;
    // Check for missing parameters
    const missingParams = connectorRequiredFields.filter((field) => !body[field]);
    if (missingParams.length > 0) {
      return response
        .status(400)
        .json({ error: `Missing parameters: ${missingParams.join(', ')}` });
    }
    const existingCharger = await validateConnector(oem_connector_number);
    if (existingCharger) {
      return response
        .status(400)
        .json({ error: 'given oem detail already exist' });
    }
    const res = await addConnector(body);
    return successResponse(response, 200, { data: res });
  } catch (error: any) {
    logger.error(error.message);
    return errorResponse(response, String(error));
  }
};

// update
export const addChanges = async (request: Request, response: Response) => {
  try {
    const { connectorId } = request.params;
    const {body} = request;
    const existCharger = await findExistingConnector(connectorId as unknown as bigint)
    if(!existCharger){
        return response.status(404).json({ error: 'connector not found' });
    }
    const resp = await updateConnector(Number(connectorId),body)
    return successResponse(response, 200, { data: resp, });
  } catch (error: any) {
    logger.error(error.message);
    return errorResponse(response, String(error));
  }
};
 