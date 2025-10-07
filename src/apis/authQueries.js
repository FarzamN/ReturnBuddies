import {
  setOTP,
  setFaqs,
  setLogin,
  setLogout,
  setGetAddress,
  updateAddress,
  setGetPayments,
  updatePaymentCard,
} from "../redux/slices/authSlice";
import instance from "../utils/urls";
import { getItem, setItem } from "../utils/storage";
import { apiRequest, catchFun, showNotification } from "../function";
import appleAuth from "@invertase/react-native-apple-authentication";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

export const googleLoginAPI = (idToken) => {
  return async (dispatch) => {
    apiRequest({
      data: { idToken },
      method: "post",
      endpoint: "user/Login-with-google",
      onSuccess: ({ user, token }) => {
        setItem("token", token);
        setItem("userID", user._id);
        dispatch(setLogin({ user, token }));
      },
    });
  };
};

export const appleLoginAPI = (idToken) => {
  return async (dispatch) => {
    apiRequest({
      data: { idToken },
      method: "post",
      endpoint: "user/Login-with-apple",
      onSuccess: ({ user, token }) => {
        setItem("token", token);
        setItem("userID", user._id);
        dispatch(setLogin({ user, token }));
      },
    });
  };
};

export const loginAPI = (data, showOTP, error, saveEmail, load) => {
  return async (dispatch) => {
    apiRequest({
      data,
      method: "post",
      noNotification: true,
      endpoint: "user/login",
      onSuccess: ({ user, token, otp }) => {
        setItem("token", token);
        setItem("userID", user._id);
        dispatch(setLogin({ user, token }));
      },
      onNotFound: () => {
        showOTP(true);
        saveEmail(data.email);
      },
      onFailure: ({ message }) => error({ msg: message, visible: true }),

      onFinally: load,
    });
  };
};

export const registerAPI = async (data, showOTP, error, saveEmail, load) => {
  apiRequest({
    data,
    method: "post",
    noNotification: true,
    endpoint: "user/register",
    onSuccess: () => {
      showOTP(true);
      saveEmail(data.email);
    },

    onCatchFailure: (message) => error({ msg: message, visible: true }),
    onFinally: load,
  });
};

export const verifyOTPAPI = async (data, load, error, verify) => {
  apiRequest({
    data,
    method: "post",
    onFinally: load,
    noNotification: true,
    endpoint: "user/verifyemail",
    onFailure: () => error(true),
    onCatchFailure: () => error(true),
    onSuccess: () => verify((pre) => !pre),
  });
};

export const deleteAccountAPI = (load) => {
  return async (dispatch) => {
    apiRequest({
      method: "post",
      onFinally: load,
      endpoint: "user/delete-account",
      onSuccess: () => {
        dispatch(setLogout());
        GoogleSignin.signOut();
        appleAuth.Operation.LOGOUT;
      },
    });
  };
};

export const deleteAccountOTPAPI = (data, load) => {
  return async (dispatch) => {
    apiRequest({
      data,
      method: "post",
      onFinally: load,
      endpoint: "user/verify-&-delete-account",
      onSuccess: () => dispatch(setLogout()),
    });
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
    } else {
      showNotification(message, "Status Code 401");
    }
  } catch (err) {
    load(false);
    const msg = err?.response?.data?.message || err.message;
    catchFun(msg);
  }
};

export const addPhoneNumberAPI = (data, type, navigation, load) => {
  return async (dispatch) => {
    apiRequest({
      data,
      method: "post",
      onFinally: load,
      endpoint: "user/updatePhone",
      onSuccess: ({ OTP }) => {
        dispatch(setOTP(OTP));
        navigation.navigate("userOTP", { number: data.phone, type });
      },
    });
  };
};

export const editProfileAPI = (data, goBack, load) => {
  return async (dispatch) => {
    apiRequest({
      data,
      method: "post",
      onFinally: load,
      endpoint: "user/editProfile",
      onSuccess: ({ user }) => {
        goBack();
        dispatch(setLogin({ user }));
      },
    });
  };
};

export const resendPhoneOTPAPI = (data, coundDown, load) => {
  return async (dispatch) => {
    apiRequest({
      data,
      method: "post",
      onFinally: load,
      endpoint: "/user/updateNameandPhone",
      onSuccess: ({ OTP }) => {
        dispatch(setOTP(OTP));
        coundDown(60);
      },
    });
  };
};

export const editProfileVerificationAPI = (data, type, navigation, load) => {
  return async (dispatch) => {
    apiRequest({
      data,
      method: "post",
      onFinally: load,
      noNotification: true,
      endpoint: "/user/updateNameandPhoneVerification",
      onSuccess: ({ user }) => {
        dispatch(setLogin({ user }));
        navigation.goBack();
        navigation.goBack();
      },
    });
  };
};

export const addAddressAPI = (data, goBack, load, error) => {
  return async (dispatch) => {
    apiRequest({
      data,
      method: "post",
      onFinally: load,
      noNotification: true,
      endpoint: "add-address",
      onSuccess: ({ Address }) => {
        goBack();
        if (Address.isDefault == 1) dispatch(updateAddress(Address));
        getAddressAPI(load)(dispatch);
      },
      onFailure: ({ message }) => error({ msg: message, open: true }),
      onCatchFailure: ({ message }) => error({ msg: message, open: true }),
    });
  };
};

export const getAddressAPI = (load) => {
  return async (dispatch) => {
    apiRequest({
      onFinally: load,
      endpoint: "get-all-address",
      onSuccess: ({ addresses }) =>
        dispatch(setGetAddress(addresses.reverse())),
    });
  };
};

export const editAddressAPI = (_id, data, goBack, load, error) => {
  return async (dispatch) => {
    apiRequest({
      data,
      method: "post",
      onFinally: load,
      noNotification: true,
      endpoint: `edit-address/${_id}`,
      onSuccess: () => {
        goBack();
        getAddressAPI(load)(dispatch);
      },
      onFailure: ({ message }) => error({ msg: message, open: true }),
      onCatchFailure: ({ message }) => error({ msg: message, open: true }),
    });
  };
};

export const addPaymentAPI = (data, goBack, load) => {
  return async (dispatch) => {
    apiRequest({
      data,
      method: "post",
      onFinally: load,
      endpoint: "add-Payment-card",
      onSuccess: ({ card }) => {
        goBack();
        if (card.isDefault == 1) dispatch(updatePaymentCard(card));
        getPaymentAPI(load)(dispatch);
      },
    });
  };
};

export const getPaymentAPI = (load) => {
  return async (dispatch) => {
    apiRequest({
      onFinally: load,
      endpoint: "get-payment-card",
      onSuccess: ({ cards }) => dispatch(setGetPayments(cards.reverse())),
    });
  };
};

export const editPaymentAPI = (_id, data, goBack, load) => {
  return async (dispatch) => {
    apiRequest({
      data,
      method: "post",
      onFinally: load,
      endpoint: `edit-payment-card/${_id}`,
      onSuccess: ({ card }) => {
        goBack();
        if (card.isDefault == 1) dispatch(updatePaymentCard(card));
        getPaymentAPI(load)(dispatch);
      },
    });
  };
};

export const deletePaymentAPI = (_id, setAlert, load) => {
  return async (dispatch) => {
    apiRequest({
      method: "post",
      onFinally: load,
      endpoint: `delete-payment-card/${_id}`,
      onSuccess: () => {
        setAlert({ visible: false, _id: "" });
        getPaymentAPI(load)(dispatch);
      },
    });
  };
};

export const deleteAddressAPI = (_id, setAlert, load) => {
  return async (dispatch) => {
    apiRequest({
      data: {},
      method: "post",
      onFinally: load,
      endpoint: `delete-address/${_id}`,
      onSuccess: () => {
        setAlert({ visible: false, _id: "" });
        getAddressAPI(load)(dispatch);
      },
    });
  };
};

export const phoneVerficationAPI = (data, nav, load) => {
  return async (dispatch) => {
    apiRequest({
      data,
      method: "post",
      onFinally: load,
      endpoint: "user/phoneVerfication",
      onSuccess: ({ otp }) => {
        dispatch(setOTP(otp));
        nav("userOTP", { number: data.phone, type: "verifyPhoneNumber" });
      },
    });
  };
};

export const resendPhoneVerficationAPI = (data, setCountDown, load) => {
  return async (dispatch) => {
    apiRequest({
      data,
      method: "post",
      onFinally: load,
      endpoint: "user/phoneVerfication",
      onSuccess: ({ otp }) => {
        dispatch(setOTP(otp));
        setCountDown(60);
      },
    });
  };
};

export const phoneVerficationCompleteAPI = (data, errot, goBack, load) => {
  return async (dispatch) => {
    apiRequest({
      data,
      method: "post",
      onFinally: load,
      noNotification: true,
      endpoint: "user/verifyPhone",
      onSuccess: ({ user }) => {
        dispatch(setLogin({ user }));
        goBack();
      },
      onFailure: ({ message }) => errot({ msg: message, visible: true }),
      onCatchFailure: ({ message }) => errot({ msg: message, visible: true }),
    });
  };
};

export const checkEmailToForgetPasswordAPI = async (
  data,
  setError,
  navigate,
  load
) => {
  apiRequest({
    data,
    method: "post",
    onFinally: load,
    noNotification: true,
    endpoint: "user/forgot-password",
    onSuccess: () => {
      navigate("otp", { number: data.email, type: "forgetPasswrod" });
    },
    onFailure: ({ message }) => setError(message),
  });
};

export const forgotEmailVerficationCompleteAPI = async (
  data,
  error,
  nav,
  load
) => {
  apiRequest({
    data,
    method: "post",
    onFinally: load,
    noNotification: true,
    endpoint: "user/forgot-verfication",
    onSuccess: () => nav("forgetPassword", { email: data.email }),
    onFailure: ({ message }) => error({ msg: message, visible: true }),
  });
};

export const resendForgotEmailVerficationAPI = async (
  data,
  countDown,
  load
) => {
  apiRequest({
    data,
    method: "post",
    onFinally: load,
    endpoint: "user/forgot-password",
    onSuccess: () => countDown(60),
  });
};

export const changepasswordForgetAPI = async (data, error, load, nav) => {
  apiRequest({
    data,
    method: "post",
    onFinally: load,
    onSuccess: () => nav("login"),
    endpoint: "user/reset-password",
    onFailure: ({ message }) => error(message),
  });
};

export const getFAQsAPI = () => {
  return async (dispatch) => {
    apiRequest({
      endpoint: "get-all-faq",
      onSuccess: ({ data }) => dispatch(setFaqs(data)),
    });
  };
};

export const getNotificationAPI = async (email, text) => {
  apiRequest({
    endpoint: "get-notifications",
    onSuccess: ({ Notifications }) => {
      email(Notifications.email);
      text(Notifications.text);
    },
  });
};

export const postNotificationAPI = async (data) => {
  apiRequest({
    data,
    method: "post",
    endpoint: "add-notifications",
  });
};

export const getSorts = async (setDates) => {
  apiRequest({
    endpoint: "get-disabled-slots",
    onSuccess: ({ data }) => {
      const sortedData = data
        .map((item) => ({
          ...item,
          formattedDate: new Date(item.date).toISOString().split("T")[0],
        }))
        .sort((a, b) => new Date(a.date) - new Date(b.date));

      setDates((prev) => ({
        ...prev,
        date: sortedData,
      }));
    },
  });
};
