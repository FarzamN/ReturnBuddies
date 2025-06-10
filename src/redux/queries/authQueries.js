import axios from "axios";
import { setLogin, setLogout } from "../slices/authSlice";
import instance from "../../utils/urls";
import { catchFun } from "../../function";
import { showNotification } from "../../components/Helpers/notifierHelper";
import { getItem, setItem } from "../../utils/storage";

const { log, error } = console;

export const loginAPI = (data, showOTP, saveEmail, load) => {
  return async (dispatch) => {
    try {
      load(true);
      const response = await instance.post("user/login", data);
      const { status, message, user, token } = response.data;
      load(false);
      if (status === 200) {
        setItem("token", token);
        dispatch(setLogin({ user, token }));
      } else if (status === 201) {
        showOTP();
        saveEmail(data.email);
      } else {
        showNotification("error", "Status Code 401", message);
      }
    } catch (err) {
      catchFun();
      load(false);
      error("Login error:", err?.response?.data || err.message);
    }
  };
};

export const registerAPI = async (data, showOTP, saveEmail, load) => {
  try {
    load(true);
    const response = await instance.post("user/register", data);
    const { status, message } = response.data;
    load(false);
    if (status === 200) {
      showOTP();
      saveEmail(data.email);
    } else {
      showNotification("error", "Status Code 401", message);
    }
  } catch (err) {
    catchFun();
    load(false);
    error("Register error:", err?.response?.data.message || err.message);
  }
};

export const verifyOTPAPI = (data, load, verify) => {
  return async (dispatch) => {
    try {
      load(true);
      const response = await instance.post("user/verifyemail", data);
      const { status, message } = response.data;
      load(false);
      if (status === 200) {
        verify((pre) => !pre);
      } else {
        showNotification("error", "Status Code 401", message);
      }
    } catch (err) {
      catchFun();
      load(false);
      error("Verify OTP error:", err?.response?.data.message || err.message);
    }
  };
};

export const deleteAccountPasswordAPI = async (data, load, nav) => {
  try {
    load(true);

    const token = getItem("token");
    const response = await instance.post("user/delete-account", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { status, message } = response.data;
    load(false);

    if (status === 200) {
      nav("deleteOTP");
    } else {
      showNotification("error", message, "Status Code 401");
    }
  } catch (err) {
    load(false);
    catchFun();
    error("Delete Account error:", err?.response?.data?.message || err.message);
  }
};

export const deleteAccountOTPAPI = (data, load) => {
  return async (dispatch) => {
    try {
      load(true);

      const token = getItem("token");
      const response = await instance.post(
        "user/verify-&-delete-account",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { status, message } = response.data;
      load(false);
      if (status === 200) {
        dispatch(setLogout());
      } else {
        showNotification("error", message, "Status Code 401");
      }
    } catch (err) {
      load(false);
      catchFun();
      error(
        "Delete Account OTP error:",
        err?.response?.data?.message || err.message
      );
    }
  };
};

export const changePasswordAPI = async (data, load, goBack) => {
  try {
    load(true);

    const token = getItem("token");
    const response = await instance.post("/user/change-password", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { status, message } = response.data;
    load(false);
    if (status === 200) {
      goBack();
      showNotification("success", "Hurry", message);
    } else {
      showNotification("error", message, "Status Code 401");
    }
  } catch (err) {
    load(false);
    catchFun();
    error(
      "Delete Account OTP error:",
      err?.response?.data?.message || err.message
    );
  }
};

export const editProfileAPI = (data, load, goBack) => {
  return async (dispatch) => {
    try {
      load(true);

      const token = getItem("token");
      const response = await instance.post("/user/updateNameandPhone", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      const { status, message, user } = response.data;
      load(false);
      if (status === 200) {
        goBack();
        dispatch(setLogin({ user }));
        showNotification("success", "Hurry", message);
      } else {
        showNotification("error", message, "Status Code 401");
      }
    } catch (err) {
      load(false);
      catchFun();
      error("Edit Profile error:", err?.response?.data?.message || err.message);
    }
  };
};
