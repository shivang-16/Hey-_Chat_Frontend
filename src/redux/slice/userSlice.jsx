import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  isAuthenticated: false,
  user: {},
};

export const userSlice = createSlice({
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
      state.isAuthenticated = false;
    },
    RegisterSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    RegisterFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },
    LoginRequests: (state) => {
      state.loading = true;
      state.isAuthenticated = false;
    },
    LoginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    LoginFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },
    LoadUserRequests: (state) => {
      state.loading = true;
    },
    LoadUserSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    LoadUserFail: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },
    LogoutRequests: (state) => {
      state.loading = true;
      state.isAuthenticated = true;
    },
    LogoutSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = action.message;
    },
    LogoutFail: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.error = action.message;
    },
  },
});

export const allUsersSlice = createSlice({
  name: "allUsers",
  initialState: { loading: false, allUsers: [] },
  reducers: {
    AllUserRequest: (state) => {
      state.loading = true;
    },
    AllUserSuccess: (state, action) => {
      state.loading = false;
      state.allUsers = action.payload;
    },
    AllUserFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
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

export const { AllUserRequest, AllUserSuccess, AllUserFail } =
  allUsersSlice.actions;

export default userSlice.reducer;
