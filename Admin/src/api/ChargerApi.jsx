import { httpApi } from "./http.api";

export const ChargerAllList = async () => {
  const res = await httpApi.get(`/charger/list`);
  return res;
};

export const ChargerListData = async (currentPage, limit) => {
  try {
    const page = currentPage ? `&page=${currentPage}` : "";
    const limits = limit ? `&limit=${limit}` : `&limit=10`;

    const res = await httpApi.get(`/charger/list?${page}&${limits}`);
    return res;
  } catch (error) {
    console.error("Error fetching property list:", error);
    throw error;
  }
};

// Charge Details Api
export const ChargerListDetails = async (id) => {
  const res = await httpApi.get(`charger/${id}`);
  return res;
};

// Customer Details API => Get Method
export const CustomerList = async () => {
  const res = await httpApi.get(`/users`);
  return res;
};

// Transcation Details API => Get Method
export const TranscationList = async () => {
  const res = await httpApi.get(`/sessions`);
  return res;
};
