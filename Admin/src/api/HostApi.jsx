import { httpApi } from "./http.api";
import { ApiError } from "./ApiError"; // Adjust the path as per your project structure

export const Country = () =>
  httpApi.get("location/countries").then(({ data }) => data);

export const Province = async (id) => {
  try {
    const res = await httpApi.get(`location/${id}/province`);
    return res.data;
  } catch (error) {
    console.error("Error fetching state data:", error);
    throw error;
  }
};

export const City = async (id) => {
  const res = await httpApi.get(`locations/${id}/cities`);
  return res;
};

// export const HostList = async (id) => {
//   const res = await httpApi.get(`account/${id}/hostlist`);
//   return res;
// };

export const HostList = async (id, currentPage, limit) => {
  try {
    const page = currentPage ? `&page=${currentPage}` : "";
    const limits = limit ? `&limit=${limit}` : `&limit=10`;

    const res = await httpApi.get(`account/${id}/hostlist?${page}&${limits}`);
    return res;
  } catch (error) {
    console.error("Error fetching property list:", error);
    throw error;
  }
};

export const HostAllList = async (id) => {
  const res = await httpApi.get(`account/${id}/hostlist`);
  return res;
};

export const HostView = async (id) => {
  const res = await httpApi.get(`host/${id}`);
  return res;
};

export const PropertyByHost = async (id) => {
  const res = await httpApi.get(`property/${id}/list`);
  return res;
};

// export const editHosts = async (payLoad, id) => {
//   try {
//     console.log(payLoad);
//     const response = await httpApi.put(`host/${id}/edit`, payLoad);
//     console.log("edited:", response);
//   } catch (error) {
//     console.error("Error:", error);
//   }
// };

export const imageUpload = async (uuid, imageType, fileType) => {
  try {
    const response = await httpApi.get(
      `host/getSignedUrl?fileType=${fileType}&uuid=${uuid}&imageType=${imageType}`
    );
    return response.data;
  } catch (error) {
    throw Error(error.response.data.message);
  }
};
