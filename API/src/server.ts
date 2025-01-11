import { loadEnv } from "./core/env";
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

(BigInt.prototype as any).toJSON = function () {
    return this.toString();
}
loadEnv();
export const app = express();
const allowedOrigins = '*';
const options: cors.CorsOptions = {
    origin: allowedOrigins
};

app.use(cors(options));
app.use(express.json());
app.use(express.json());
app.use(morgan('tiny'))
