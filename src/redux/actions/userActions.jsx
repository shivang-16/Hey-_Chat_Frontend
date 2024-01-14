import toast from "react-hot-toast";
import axios from "axios";
import { Hey_Server } from "../../main";
import {
  AllUserFail,
  AllUserRequest,
  AllUserSuccess,
  LoadUserFail,
  LoadUserRequests,
  LoadUserSuccess,
  LoginFail,
  LoginRequests,
  LoginSuccess,
  LogoutFail,
  LogoutRequests,
  LogoutSuccess,
} from "../slice/userSlice";

export const resgister = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: "OtpRequests" });
    const { data } = await axios.post(
      `${Hey_Server}/api/user/register`,
      {
        name,
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      },
    );

    console.log(data);
    dispatch({ type: "OtpSuccess", payload: data.message });
    toast.success(data.message);
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message);
    dispatch({ type: "OtpFail", payload: error.response.data.message });
  }
};

export const verifyOtp = (otp) => async (dispatch) => {
  try {
    dispatch({ type: "RegisterRequests" });
    const { data } = await axios.post(
      `${Hey_Server}/api/user/verify`,
      {
        otp,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      },
    );

    console.log(data);
    dispatch({ type: "RegisterSuccess", payload: data.user });
    toast.success(data.message);
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message);
    dispatch({ type: "RegisterFail", payload: error.response.data.message });
  }
};

export const resendOtp = (email) => async (dispatch) => {
  try {
    dispatch({ type: "OtpRequests" });
    const { data } = await axios.post(
      `${Hey_Server}/api/user/register`,
      {
        email,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      },
    );

    console.log(data);
    dispatch({ type: "OtpSuccess", payload: data.message });
    toast.success(data.message);
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message);
    dispatch({ type: "OtpFail", payload: error.response.data.message });
  }
};

export const login =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      dispatch(LoginRequests());
      console.log(email, password);
      const { data } = await axios.post(
        `${Hey_Server}/api/user/login`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );

      console.log(data);
      dispatch(LoginSuccess(data.user));
      toast.success(data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      dispatch(LoginFail(error.response.data.message));
    }
  };

export const loadUser = () => async (dispatch) => {
  try {
    dispatch(LoadUserRequests());
    const { data } = await axios.get(`${Hey_Server}/api/user/profile`, {
      withCredentials: true,
    });

    console.log(data);
    dispatch(LoadUserSuccess(data.user));
  } catch (error) {
    console.log(error);
    dispatch(LoadUserFail(error.response.data.message));
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch(LogoutRequests());
    const { data } = await axios.get(`${Hey_Server}/api/user/logout`, {
      withCredentials: true,
    });

    console.log(data);
    dispatch(LogoutSuccess(data.message));
    toast.success(data.message);
  } catch (error) {
    console.log(error);
    dispatch(LogoutFail(error.response.data.message));
    toast.error(error.response.data.message);
  }
};

export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch(AllUserRequest());
    const { data } = await axios.get(`${Hey_Server}/api/user/all`, {
      withCredentials: true,
    });

    console.log(data);
    dispatch(AllUserSuccess(data.allUsers));
  } catch (error) {
    console.log(error);
    dispatch(AllUserFail(error.response.data.message));
  }
};
