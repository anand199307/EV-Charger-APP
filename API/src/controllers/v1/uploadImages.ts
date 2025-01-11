import { Request, Response } from 'express';
import { generateUploadSignedUrl } from '../../library/gcs'
import { errorResponse, successResponse } from '../../helper';
import logger from '../../library/logger';

// upload logo
export const getSignedUrl = async (req: Request, res: Response) => {
    try {
        
        const { uuid, fileType, imageType } = req.query;
        if (!imageType || !uuid || !fileType) {
            throw new Error("404: Required perams are missed.");
        }
        const url = await generateUploadSignedUrl(uuid as string, fileType as string, String(imageType));
        successResponse(res, 200, {
            url: url[0],
        });
    } catch (error: any) {
        console.log("error")
        logger.error(error?.message);
        return errorResponse(res, String(error));
    }
};