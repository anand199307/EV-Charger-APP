import { httpApi } from "./http.api";

export const login = (loginPayload) =>
  httpApi.post("admin/login", { ...loginPayload }).then(({ data }) => data);

// export const currentUser = () =>
//   httpApi.get("/current_user").then(({ data }) => data);

// forgot password API

export const forgotPwd = (email) =>
  httpApi.post("admin/forgot_password", { email }).then(({ data }) => data);

// Reset password API

export const resetPwd = (resetData) =>
  httpApi
    .put("admin/update_password", { ...resetData })
    .then(({ data }) => data);
