import { Twilio } from 'twilio';
import logger from './logger';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_PHONE_NUMBER;

export const sendSms = async (phone: string, message: string) => {
  if (accountSid && authToken && phone && twilioNumber) {
    const client = new Twilio(accountSid, authToken);
   const resp = await client.messages
      .create({
        body: message,
        from: twilioNumber,
        to:  phone
      })
      .then((message) => {
        if(message.sid){
            return true
        }
      })
      .catch((error: any) => {
        logger.error(error?.message);
         throw new Error('404: Failed to send Otp');
      });
     return resp;
  } else {
    logger.info('One of the Twilio variable is missing or empty!!');
    throw new Error('422: One of the Twilio variable is missing or empty!!');
  }
};
