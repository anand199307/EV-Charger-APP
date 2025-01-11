import { Request, Response } from 'express';
import logger from '../../library/logger';
import { generateHash, generateUUID, successResponse } from '../../helper';
import { hostRequiredFields } from '../../helper/peramValidation';
import {
  addHostAdmin,
  checkexistingHost,
  createNewHost,
  findHostByID,
  updateHost,
} from '../../models/host';
import {
  checkExistingLocation,
  checkLocationById,
  createLocation,
  deleteLocation,
  editLocation,
} from '../../models/location';
import { checkExistAdmin, createNewAdmin, setForgotPassword } from '../../models/adminAuth';
import { findAccount } from '../../models/account';
import { prisma } from '../../core/db';
import sendMialTo from '../../library/mailer';
import { forgotPasswordTmp } from '../../helper/templates';

// create Host
export const createHost = async (request: Request, response: Response) => {
  let newLocation;
  let admin;
  try {
    const { host_name, email, location_details, password } = request.body;
    const missingParams = hostRequiredFields.filter((field) => !request.body[field]);
    if (missingParams.length > 0) {
      return response
        .status(400)
        .json({ error: `Missing parameters: ${missingParams.join(', ')}` });
    }
    const org = await findAccount(request.body.account_id);
    const existHost = await checkexistingHost(host_name);
    if (existHost) {
      return response.status(400).json({ error: 'Host already exist.' });
    }
    const existLocation = await checkExistingLocation(location_details);
    if (existLocation) {
      return response.status(400).json({ error: 'Location already exist' });
    }
    const existAdmin = await checkExistAdmin(email);
    if (existAdmin) {
      return response.status(400).json({ error: 'admin already exist' });
    }
    admin = await createNewAdmin({
      account_id: request.body.account_id,
      organization_id: org?.organization_id,
      uuid: await generateUUID(),
      email: email,
      phone_number: request.body.phone_number,
      role: 3,
      status: 1,
      password_digest: await generateHash(password),
    });
    newLocation = await createLocation(location_details);
    if (newLocation && admin) {
      request.body['location_Id'] = Number(newLocation.id);
      request.body['status'] = 1;
      request.body['uuid'] = await generateUUID();
      delete request.body['location_details'];
      delete request.body['password'];
    }
    const newAccount = await createNewHost(request.body);
    if (admin.id && newAccount.id) {
      const newHost = await addHostAdmin(admin.id, newAccount.id);
      const setPass = await setForgotPassword(admin.email);
      if (newHost && setPass) {
        sendMialTo(
          admin.email,
          'Reset Your Password',
          forgotPasswordTmp(setPass.reset_password_token),
        );
        successResponse(response, 200, {
          data: newAccount,
          admin: { email: admin.email, role: admin.role, status: admin.status },
        });
      } else {
        return response
          .status(400)
          .json({ error: 'Somthing went worng please try after some time.' });
      }
    }
  } catch (error: any) {
    if (newLocation?.id) {
      await deleteLocation(Number(newLocation?.id));
    }
    if (admin?.id) {
      await prisma.admins.delete({ where: { id: admin.id } });
    }
    logger.error(error.message);
    console.log(error);
    return response.status(500).json({ error: error });
  }
};

// update properties
export const editHost = async (request: Request, response: Response) => {
  try {
    const { host_id } = request.params;
    const { body } = request;

    // Check if location details are provided
    if (!body.location_details?.id) {
      return response.status(400).json({ error: 'Location Id not found in the location details.' });
    }

    // Check if the location exists
    const existingLocation = await checkLocationById(Number(body.location_details.id));
    if (!existingLocation) {
      return response.status(404).json({ error: 'Location id not found' });
    }

    // Check if the account exists
    const existingHost = await checkexistingHost(body['host_name']);
    if (!existingHost) {
      return response.status(400).json({ error: 'Host not found.' });
    }

    // Update the location details
    await editLocation(Number(body.location_details.id), body.location_details);

    // Remove location_details from the request body
    delete body['location_details'];

    // Update the property details
    const updatedHost = await updateHost(Number(host_id), body);

    return response.status(200).json({ message: 'Host updated successfully', data: updatedHost });
  } catch (error: any) {
    logger.error(error.message);
    return response.status(500).json({ error: 'Failed to update.' });
  }
};

// by Id
export const hostInfo = async (request: Request, response: Response) => {
  try {
    const { hostId } = request.params;
    // Check if the Host exists
    const existingHost = await findHostByID(Number(hostId));
    if (!existingHost) {
      return response.status(400).json({ error: 'Host not found.' });
    }
    // Return success response
    return response.status(200).json({ data: existingHost });
  } catch (error: any) {
    logger.error(error.message);
    return response.status(500).json({ error: 'Failed to fetch details.' });
  }
};

// host list by accoount
export const accountHost = async (request: Request, response: Response) => {
  try {
    const { account_id } = request.params;
    const { skip, limit } = response.locals;
    const { name = '', phone_number = '' } = request.query;

    const connectorQuery = {
      where: {
        account_id: Number(account_id),
        host_name: { contains: name as string },
        phone_number: { contains: (phone_number as string).toLowerCase() },
      },
      include: { location: true },
      take: limit,
      skip,
    };

    const existingAccount = await findAccount(account_id);

    if (!existingAccount) {
      return response.status(400).json({ error: 'Account not found.' });
    }

    const [hosts, total] = await Promise.all([
      prisma.hosts.findMany(connectorQuery),
      prisma.hosts.count({
        where: {
          host_name: { contains: name as string },
          phone_number: { contains: phone_number as string },
        },
      }),
    ]);
       // Calculate individual host properties count
       const hostsWithPropertiesCount = await Promise.all(
        hosts.map(async (host: any) => {
          const propertiesCount = await prisma.hostProperties.count({
            where: {
              host_id: host.id,
            },
          });
          return { ...host, propertiesCount };
        })
      );

    // Return success response with a more descriptive key
    return response.status(200).json({ hostsWithPropertiesCount, total });
  } catch (error: any) {
    logger.error(error.message);
    return response.status(500).json({ error: 'Failed to fetch details.' });
  }
};
