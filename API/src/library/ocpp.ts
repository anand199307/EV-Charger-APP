import axios from "axios";
import logger from "./logger";

const baseUrl = process.env.OCPP_URL;

export async function remoteStartCharging(requestData: any) {
    const apiUrl = `${baseUrl}/ocpp/remote-start-charging`;
    try {
        const response = await axios.post(apiUrl, requestData)
        return response.data;
    } catch (error:any) {
        console.log(error)
        return error.response.data
    }
}


export async function remoteStopCharging(requestData: any) {
    const apiUrl = `${baseUrl}/ocpp/remote-stop-charging`;
    try {
        const response = await axios.post(apiUrl, requestData);
        return response.data;
    } catch (error:any) {
        return error.response.data
    }
}

