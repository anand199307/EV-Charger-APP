import { Request, Response } from 'express';
import {
  checkexistingAccount,
  createAccount,
  deleteAccount,
  findAccount,
  updateAccount,
} from '../../models/account';
import { accountRequiredFields, locationRequiredFields } from '../../helper/peramValidation';
import { checkExistingLocation, createLocation, deleteLocation } from '../../models/location';
import logger from '../../library/logger';

// create
export const newAccount = async (request: Request, response: Response) => {
  try {
    const { name, email, location_details } = request.body;
    const missingParams = accountRequiredFields.filter((field) => !request.body[field]);
    if (missingParams.length > 0) {
      return response
        .status(400)
        .json({ error: `Missing parameters: ${missingParams.join(', ')}` });
    }
    const locationParams = locationRequiredFields.filter((field) => !location_details[field]);
    if (locationParams.length > 0) {
      return response
        .status(400)
        .json({ error: `Missing parameters in location details: ${locationParams.join(', ')}` });
    }
    // Check if an account with the provided email or name already exists
    const existingAccount = await checkexistingAccount(email, name);
    if (existingAccount) {
      return response.status(400).json({ error: 'Account with this email or name already exists' });
    }
    const existingLocation = await checkExistingLocation(location_details);
    if (existingLocation) {
      return response.status(400).json({ error: 'Location already exists or invalid location' });
    }
    const location = await createLocation(location_details);
    if (location) {
      request.body['location_Id'] = Number(location.id);
      request.body['status'] = 1;
      delete request.body['location_details'];
    }
    const newAccount = await createAccount(request.body);
    return response.status(200).json({ message: 'Account created successfully', data: newAccount });
  } catch (error: any) {
    if (request.body.location_Id) {
      await deleteLocation(request.body.location_Id);
    }
    logger.error(error.message);
    return response.status(500).json({ error: 'Failed to create account' });
  }
};

// edit account
export const editAccount = async (request: Request, response: Response) => {
  try {
    const { accountId } = request.params;
    // Check if an account with the provided email or name already exists
    const existingAccount = await findAccount(accountId);
    if (!existingAccount) {
      return response.status(400).json({ error: 'Account not found.' });
    }
    const resp = await updateAccount(accountId, request.body);
    if (resp)
      return response.status(201).json({ message: 'Account updated successfully', data: resp });
  } catch (error: any) {
    logger.error(error.message);
    return response.status(500).json({ error: 'Failed to update account' });
  }
};

// list accoun
export const removeAccount = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const existingAccount = await findAccount(id);
    if (!existingAccount) {
      return response.status(400).json({ error: 'Account not found.' });
    }
    const resp = await deleteAccount(id);
    return response.status(200).json({ message: 'Account deleted successfully', resp });
  } catch (error) {
    return response.status(500).json({ error: 'Failed to delete account' });
  }
};
