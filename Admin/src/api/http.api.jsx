import axios from "axios";
import { ApiError } from "../api/ApiError";
import { readToken } from "../services/localStorage.service";

export const httpApi = axios.create({
  // baseURL: process.env.REACT_APP_HELIOS_KEY,
  baseURL: "https://helios-api-c5tbent7ka-el.a.run.app/api/v1/",
});

httpApi.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    Authorization: readToken(),
    AccessControlAllowOrigin: "*",
  };
  return config;
});

httpApi.interceptors.response.use(undefined, (error) => {
  const responseData = error.response?.data;
  const errorMessage =
    typeof responseData === "object" &&
    responseData !== null &&
    "message" in responseData
      ? responseData.message
      : error.message;

  const apiErrorData =
    typeof responseData === "object" &&
    responseData !== null &&
    "apiErrorData" in responseData
      ? responseData.apiErrorData
      : undefined;

  throw new ApiError(errorMessage, apiErrorData);
});

export class ApiErrorData {
  constructor(message) {
    this.message = message;
  }
}
