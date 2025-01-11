import sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');
export async function sendMialTo(to: string, subject: string, body: string) {
  const msg = {
    to: to, // Change to your recipient
    // from: 'google-security@caesars.com', // Change to your verified sender
    from: 'arpit@aptonworks.com', // Change to your verified sender
    subject: subject,
    html: body,
  };
  try {
    return await sgMail.send(msg);
  } catch (error) {
    console.log('error');
    console.error(error);

    if ((error as any).response) {
      console.error((error as any).response.body);
    }
  }
}
export default sendMialTo;
