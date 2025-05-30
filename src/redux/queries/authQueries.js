import axios from "axios";
import { setLogin } from "../slices/authSlice";
import instance from "../../utils/urls";

const { log, error } = console;
export const checkingAPIdata = (load) => {
  return async (dispatch) => {
    load(true);
    try {
      const response = await axios.get(
        "https://wrongly-free-crawdad.ngrok-free.app/time-dealy"
      );
      const { status, success, data } = response.data;
      const token = "token";
      load(false);
      if (status === 200 && success) {
        log(response);
        dispatch(
          setLogin({
            //   user: data,
            token,
            rememberMe: false, // from the checkbox
          })
        );
      }
    } catch (err) {
      load(false);
    }
  };
};

export const registerAPI = async (data, navigate, setShowOTP, load) => {
  try {
    load(true);
    log(data);
    const response = await instance.post("user/register", data);
    const { status, success, message } = response.data;
    load(false);
    if (status === 200 && success) {
      log(message);
      setShowOTP({ visible: true });
    }
  } catch (err) {
    load(false);
    error("Register error:", err?.response?.data || err.message);
    // Optional: show error to user
  }
};
