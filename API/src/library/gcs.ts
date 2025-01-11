import { Storage, GetSignedUrlConfig } from '@google-cloud/storage';

// config
const bucketName = process.env.BUCKET_NAME;
const storage = new Storage({ keyFilename: process.env.KEYFILE_NAME });

// create signed url
export async function generateUploadSignedUrl(uuid: string, fileType: string, imageType: string) {
  const fileName = `image-${new Date().getTime()}.${fileType}`;
  let filePath = uuid + '/' + imageType + '/' + fileName;
  const options: GetSignedUrlConfig = {
    version: 'v4',
    action: 'write',
    expires: Date.now() + 15 * 60 * 1000,
    contentType: `image/${fileType}`,
  };
  const url = await storage
    .bucket(bucketName as string)
    .file(filePath)
    .getSignedUrl(options);
  return url;
}

//  delete profile , gallery and id images from gcp
export async function deleteImagefromGCP(filePath: string) {
  const response = await storage
    .bucket(bucketName as string)
    .file(filePath)
    .delete();
  return response;
}
