import instance from "../../utils/urls";
import { getItem, setItem } from "../../utils/storage";
import { setLogin, setLogout, setOTP } from "../slices/authSlice";
import { catchFun, showNotification } from "../../function";

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
        setItem("userID", user._id);
        dispatch(setLogin({ user, token }));
      } else if (status === 201) {
        showOTP();
        saveEmail(data.email);
      } else {
        showNotification("error", "Status Code 401", message);
      }
    } catch (err) {
      const msg = err?.response?.data?.message || err.message;
      catchFun(msg);
      load(false);
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
    load(false);
    const msg = err?.response?.data?.message || err.message;
    catchFun(msg);
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
      load(false);
      const msg = err?.response?.data?.message || err.message;
      catchFun(msg);
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
    const msg = err?.response?.data?.message || err.message;
    catchFun(msg);
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
      const msg = err?.response?.data?.message || err.message;
      catchFun(msg);
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

export const editProfileAPI = (data, type, navigation, load) => {
  return async (dispatch) => {
    try {
      load(true);

      const token = getItem("token");
      const response = await instance.post("/user/updateNameandPhone", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { status, message, OTP } = response.data;
      load(false);
      if (status === 200) {
        dispatch(setOTP(OTP));
        navigation.navigate("userOTP", { number: data.phone, type });
        showNotification("success", "Hurry", message);
      } else {
        showNotification("error", message, "Status Code 401");
      }
    } catch (err) {
      load(false);
      const msg = err?.response?.data?.message || err.message;
      catchFun(msg);
    }
  };
};

export const editProfileVerificationAPI = (data, type, navigation) => {
  return async (dispatch) => {
    try {
      // load(true);

      const token = getItem("token");
      const response = await instance.post(
        "/user/updateNameandPhoneVerification",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { status, message, user } = response.data;
      // load(false);
      if (status === 200) {
        console.log("user", user);
        dispatch(setLogin({ user }));
        navigation.goBack();
        navigation.goBack();
        showNotification("success", "Hurry", message);
      } else {
        showNotification("error", message, "Status Code 401");
      }
    } catch (err) {
      // load(false);
      const msg = err?.response?.data?.message || err.message;
      catchFun(msg);
    }
  };
};
