import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import storage from "redux-persist/lib/storage";

import { login, forgotPwd, resetPwd } from "../../api/AuthApi";
import {
  deleteToken,
  deleteUser,
  persistToken,
  readToken,
} from "../../services/localStorage.service";

import { setUser } from "./UserSlice";

const initialState = {
  token: readToken(),
  isAuthencation: false,
  Error: null,
  toastState: false,
  toastmsg: "",

  // UserData: persistData(),
};

export const doLogin = createAsyncThunk(
  "admin/login",
  async (loginPayload, { dispatch }) => {
    try {
      const response = await login(loginPayload);
      dispatch(setUser(response.data));
      persistToken(response.auth_token);
      // console.log(response);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

// export const CurrentUserInfo = createAsyncThunk("/current_user", async () => {
//   try {
//     const res = await currentUser();
//     return res;
//   } catch (error) {
//     if (error) {
//       window.location.replace("/login");
//     }
//   }
// });

export const ResetPaswd = createAsyncThunk("reset", async (resetData) => {
  const res = resetPwd(resetData);
  return res;
});

export const ForgotPaswd = createAsyncThunk("forgot", async (email) => {
  const res = forgotPwd(email);
  return res;
});

export const doLogout = createAsyncThunk(
  "user/logout",
  (payload, { dispatch }) => {
    deleteToken();
    deleteUser();
    dispatch(setUser(null));
    localStorage.removeItem("activeMenuItem");
    storage.removeItem("persist:root");
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuth: (state) => {
      state.isAuthencation = false;
    },
    setToastState: (state, action) => {
      state.toastState = action.payload;
    },
    setToastmsg: (state, action) => {
      state.toastmsg = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(doLogin.fulfilled, (state, action) => {
      state.token = action.payload;
      state.isAuthencation = true;
    });
    builder.addCase(doLogout.fulfilled, (state, action) => {
      state.token = action.payload;
    });
    // builder.addCase(CurrentUserInfo.fulfilled, (state, action) => {
    //   state.userInfo = action.payload.response;
    // });
  },
});
export const { resetAuth, setToastState, setToastmsg } = authSlice.actions;

export default authSlice.reducer;
