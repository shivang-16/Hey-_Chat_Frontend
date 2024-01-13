import toast from "react-hot-toast";
import axios from "axios";
import { server } from "../../../../Server/app";

export const resgister = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: "OtpRequests" });
    const { data } = await axios.post(
      `${server}/api/user/register`,
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
      `${server}/api/user/verify`,
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
      `${server}/api/user/register`,
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

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: "LoginRequests" });
    const { data } = await axios.post(
      `${server}/api/user/login`,
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
    dispatch({ type: "LoginSuccess", payload: data.user });
    toast.success(data.message);
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message);
    dispatch({ type: "LoginFail", payload: error.response.data.message });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: "LoadUserRequests" });
    const { data } = await axios.get(`${server}/api/user/login`, {
      withCredentials: true,
    });

    console.log(data);
    dispatch({ type: "LoadUserSuccess", payload: data.user });
  } catch (error) {
    console.log(error);
    dispatch({ type: "LoadUserFail", payload: error.response.data.message });
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: "LogoutRequests" });
    const { data } = await axios.get(`${server}/api/user/logout`, {
      withCredentials: true,
    });

    console.log(data);
    dispatch({ type: "LogoutSuccess", payload: data.message });
  } catch (error) {
    console.log(error);
    dispatch({ type: "LogoutFail", payload: error.response.data.message });
  }
};
