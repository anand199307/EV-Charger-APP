import { httpApi } from "./http.api";

export const PropertyAllList = async () => {
  const res = await httpApi.get(`/properties`);
  return res;
};

export const PropertyList = async (currentPage, limit) => {
  try {
    const page = currentPage ? `&page=${currentPage}` : "";
    const limits = limit ? `&limit=${limit}` : `&limit=10`;

    const res = await httpApi.get(`/properties?${page}&${limits}`);
    return res;
  } catch (error) {
    console.error("Error fetching property list:", error);
    throw error;
  }
};

export const ChargerView = async (id) => {
  const res = await httpApi.get(`/charger/${id}`);
  return res;
};

export const Amenitieslist = async () => {
  const res = await httpApi.get(`property/amenities?name=`);
  return res;
};
