import *  as process from 'process';
import * as dotenv from 'dotenv';
import * as path from 'path';

const getDotEnvPath = (env: any) =>{
    if (env == 'DEVELOPMENT'){
        return '.env.development';
    }
    return '.env'
}

export function loadEnv() {
    dotenv.config({
        path: path.resolve(process.cwd(), getDotEnvPath(process.env.NODE_ENV?.toUpperCase())),
      });
}