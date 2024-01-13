import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  user: {},
};

const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    OtpRequests: (state) => {
      state.loading = true;
    },
    OtpSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    OtpFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    RegisterRequests: (state) => {
      state.loading = true;
    },
    RegisterSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    RegisterFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    LoginRequests: (state) => {
      state.loading = true;
    },
    LoginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    LoginFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    LoadUserRequests: (state) => {
      state.loading = true;
    },
    LoadUserSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    LoadUserFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    LogoutRequests: (state) => {
      state.loading = true;
    },
    LogoutSuccess: (state, action) => {
      state.loading = false;
      state.user = action.message;
    },
    LogoutFail: (state, action) => {
      state.loading = false;
      state.error = action.message;
    },
  },
});

export const {
  OtpRequests,
  OtpSuccess,
  OtpFail,
  RegisterRequests,
  RegisterSuccess,
  RegisterFail,
  LoginRequests,
  LoginSuccess,
  LoginFail,
  LoadUserRequests,
  LoadUserSuccess,
  LoadUserFail,
  LogoutRequests,
  LogoutSuccess,
  LogoutFail,
} = userSlice.actions;
export default userSlice.reducer;
