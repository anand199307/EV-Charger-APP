import { Request } from 'express';
export async function getPaginateParams(req: Request) {
    const { limit = 10, skip = 0 } = req.query;
    console.log('limit', limit, {
      skip: Number(skip),
      take: Number(limit),
    });
    return {
      skip: Number(skip),
      take: Number(limit),
    };
  }