import { createAction, createSlice } from "@reduxjs/toolkit";
import {
  persistUser,
  readUser,
} from "../../services/localStorage.service";

const initialState = {
  user: readUser(),
};

export const setUser = createAction("user/setUser", (newUser) => {
  persistUser(newUser);
  return {
    payload: newUser,
  };
});

// export const setUserType = createAction("user/setUserType", (newUserType) => {
//   return {
//     payload: newUserType,
//   };
// });

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers:  (builder) => {
    builder
      .addCase(setUser, (state, action) => {
      state.user = action.payload;
      })
    //   .addCase(setUserType, (state, action) => {
    //   state.userType = action.pay
    // })
  },
});

export default userSlice.reducer;

// userSlice.js (assuming you have a user slice)

// import { createSlice } from "@reduxjs/toolkit";

// const userSlice = createSlice({
//   name: "user",
//   initialState: {
//     auth_Token: null,
//   },
//   reducers: {
//     setUser: (state, action) => {
//       state.auth_Token = action.payload;
//       console.log((state.auth_Token = action.payload));
//     },
//     // other reducers for updating user-related state
//   },
// });

// export const { setUser } = userSlice.actions;
// export default userSlice.reducer;
