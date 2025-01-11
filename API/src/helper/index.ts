import crypto from 'crypto';
import { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
const SALT_ROUNDS = 5;
const now = new Date();
const bcrypt = require('bcryptjs');

export const random = (bits: number) => crypto.randomBytes(bits).toString('base64');

export const generateUUID = () => {
  return crypto.randomUUID();
};

export const generateOtp = (): number => Math.floor(1000 + Math.random() * 9000);

export const getDate = (days: number) => new Date(now.setDate(now.getDate() + days));

export const errorResponse = (res: Response, error: string) => {
  let errMessage = error.split(':');
  let status = 500;
  if (!!Number(errMessage[1])) status = Number(errMessage[1]);
  return res.status(status).json({
    statusCode: Number(errMessage[1]) || 500,
    error: String(errMessage[2]),
  });
};

export const successResponse = (res: Response, statusCode: number, response: any) => {
  return res
    .status(Number(statusCode))
    .json({ statusCode: Number(statusCode), response: response });
};

// Function to generate a hash for a password
export async function generateHash(password: string): Promise<string> {
  try {
    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    return hash;
  } catch (error) {
    throw new Error('Error generating hash');
  }
}

// Function to validate a password against its hash
export async function validatePassword(password: string, hash: string | null): Promise<boolean> {
  if (!hash) return false;
  try {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
  } catch (error) {
    throw new Error('Error validating password');
  }
}

export async function generateResetToken(): Promise<string> {
  try {
    const token = uuidv4();

    const hashedToken = await bcrypt.hash(token, SALT_ROUNDS);

    return hashedToken;
  } catch (error) {
    throw new Error('Error generating reset token');
  }
}

export const generateRandomString = (length: number) => {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    result += charset[randomIndex];
  }
  return result;
};

export const calculateAmount = (startValue: number, stopValue: number, tarrifRate: any): number => {
  // Check if input values are valid numbers
  if (isNaN(startValue) || isNaN(stopValue) || isNaN(parseFloat(tarrifRate))) {
    throw new Error('Invalid input values. Please provide valid numbers.');
  }

  // Check if tarrifRate is less than or equal to 0
  if (parseFloat(tarrifRate) <= 0) {
    throw new Error('Invalid tarrif rate. Tarrif rate must be greater than 0.');
  }

  // If stopValue is equal to startValue, return total as 0
  if (stopValue === startValue) {
    return 0;
  }

  // Calculate the unit based on the difference between stopValue and startValue
  const unit = (stopValue - startValue) / 1000;

  // Calculate the total amount by multiplying unit with tarrifRate
  let total = unit * parseFloat(tarrifRate);

  // Round the total amount to two decimal places
  total = parseFloat(total.toFixed(2));

  return total;
};

