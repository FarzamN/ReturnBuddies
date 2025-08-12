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

export const googleLoginAPI = (idToken) => {
  return async (dispatch) => {
    apiRequest({
      data: JSON.stringify({ idToken }),
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

export const loginAPI = (data, showOTP, error, saveEmail, load) => {
  return async (dispatch) => {
    apiRequest({
      data,
      method: "post",
      noNotification: true,
      endpoint: "user/login",
      onSuccess: ({ user, token }) => {
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

export const verifyOTPAPI = (data, load, error, verify) => {
  return async (dispatch) => {
    apiRequest({
      data,
      method: "post",
      noNotification: true,
      endpoint: "user/verifyemail",
      onSuccess: () => {
        verify((pre) => !pre);
      },
      onFailure: () => error(true),
      onCatchFailure: () => error(true),
      onFinally: load,
    });
  };
};

export const deleteAccountAPI = (load) => {
  return async (dispatch) => {
    apiRequest({
      method: "post",
      endpoint: "user/delete-account",
      data: {},
      onSuccess: () => {
        dispatch(setLogout());
      },
      onFinally: load,
    });
  };
};

export const deleteAccountOTPAPI = (data, load) => {
  return async (dispatch) => {
    apiRequest({
      method: "post",
      endpoint: "user/verify-&-delete-account",
      data,
      onSuccess: () => {
        dispatch(setLogout());
      },
      onFinally: load,
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
      method: "post",
      endpoint: "user/updatePhone",
      data,
      onSuccess: ({ OTP }) => {
        dispatch(setOTP(OTP));
        navigation.navigate("userOTP", { number: data.phone, type });
      },
      onFinally: load,
    });
  };
};

export const editProfileAPI = (data, load) => {
  return async (dispatch) => {
    apiRequest({
      data,
      method: "post",
      endpoint: "user/editProfile",
      onFinally: load,
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
      method: "post",
      endpoint: "/user/updateNameandPhone",
      data,
      onSuccess: ({ OTP }) => {
        dispatch(setOTP(OTP));
        coundDown(60);
      },
      onFinally: load,
    });
  };
};

export const editProfileVerificationAPI = (data, type, navigation, load) => {
  return async (dispatch) => {
    apiRequest({
      data,
      method: "post",
      noNotification: true,
      endpoint: "/user/updateNameandPhoneVerification",
      onSuccess: ({ user }) => {
        dispatch(setLogin({ user }));
        navigation.goBack();
        navigation.goBack();
      },
      onFinally: load,
    });
  };
};

export const addAddressAPI = (data, goBack, load) => {
  return async (dispatch) => {
    apiRequest({
      method: "post",
      endpoint: "add-address",
      data,
      onSuccess: ({ Address }) => {
        goBack();
        if (Address.isDefault == 1) dispatch(updateAddress(Address));
        getAddressAPI(load)(dispatch);
      },
      onFinally: load,
    });
  };
};

export const getAddressAPI = (load) => {
  return async (dispatch) => {
    apiRequest({
      endpoint: "get-all-address",
      onSuccess: ({ addresses }) => {
        dispatch(setGetAddress(addresses.reverse()));
      },
      onFinally: load,
    });
  };
};

export const editAddressAPI = (_id, data, goBack, load) => {
  return async (dispatch) => {
    apiRequest({
      method: "post",
      endpoint: `edit-address/${_id}`,
      data,
      onSuccess: () => {
        goBack();
        getAddressAPI(load)(dispatch);
      },
      onFinally: load,
    });
  };
};

export const addPaymentAPI = (data, goBack, load) => {
  return async (dispatch) => {
    apiRequest({
      method: "post",
      endpoint: "add-Payment-card",
      data,
      onSuccess: ({ card }) => {
        goBack();
        if (card.isDefault == 1) dispatch(updatePaymentCard(card));
        getPaymentAPI(load)(dispatch);
      },
      onFinally: load,
    });
  };
};

export const getPaymentAPI = (load) => {
  return async (dispatch) => {
    apiRequest({
      endpoint: "get-payment-card",
      onSuccess: ({ cards }) => {
        dispatch(setGetPayments(cards.reverse()));
      },
      onFinally: load,
    });
  };
};

export const editPaymentAPI = (_id, data, goBack, load) => {
  return async (dispatch) => {
    apiRequest({
      method: "post",
      endpoint: `edit-payment-card/${_id}`,
      data,
      onSuccess: ({ card }) => {
        goBack();
        if (card.isDefault == 1) dispatch(updatePaymentCard(card));
        getPaymentAPI(load)(dispatch);
      },
      onFinally: load,
    });
  };
};

export const deletePaymentAPI = (_id, setAlert, load) => {
  return async (dispatch) => {
    apiRequest({
      method: "post",
      endpoint: `delete-payment-card/${_id}`,
      data: {},
      onSuccess: () => {
        setAlert({ visible: false, _id: "" });
        getPaymentAPI(load)(dispatch);
      },
      onFinally: load,
    });
  };
};

export const deleteAddressAPI = (_id, setAlert, load) => {
  return async (dispatch) => {
    apiRequest({
      method: "post",
      endpoint: `delete-address/${_id}`,
      data: {},
      onSuccess: () => {
        setAlert({ visible: false, _id: "" });
        getAddressAPI(load)(dispatch);
      },
      onFinally: load,
    });
  };
};

export const phoneVerficationAPI = (data, nav, load) => {
  return async (dispatch) => {
    apiRequest({
      method: "post",
      endpoint: "user/phoneVerfication",
      data,
      onSuccess: ({ otp }) => {
        dispatch(setOTP(otp));
        nav("userOTP", { number: data.phone, type: "verifyPhoneNumber" });
      },
      onFinally: load,
    });
  };
};

export const resendPhoneVerficationAPI = (data, setCountDown, load) => {
  return async (dispatch) => {
    apiRequest({
      method: "post",
      endpoint: "user/phoneVerfication",
      data,
      onSuccess: ({ otp }) => {
        dispatch(setOTP(otp));
        setCountDown(60);
      },
      onFinally: load,
    });
  };
};

export const phoneVerficationCompleteAPI = (data, errot, goBack, load) => {
  return async (dispatch) => {
    apiRequest({
      data,
      method: "post",
      noNotification: true,
      endpoint: "user/verifyPhone",
      onSuccess: ({ user }) => {
        goBack();
        dispatch(setLogin({ user }));
      },
      onFailure: ({ message }) => errot({ msg: message, visible: true }),
      onCatchFailure: ({ message }) => errot({ msg: message, visible: true }),
      onFinally: load,
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
    noNotification: true,
    endpoint: "user/forgot-password",
    onSuccess: () => {
      navigate("otp", { number: data.email, type: "forgetPasswrod" });
    },
    onFailure: ({ message }) => setError(message),
    onFinally: load,
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
    noNotification: true,
    endpoint: "user/forgot-verfication",
    onSuccess: () => {
      nav("forgetPassword", { email: data.email });
    },
    onFailure: ({ message }) => error({ msg: message, visible: true }),
    onFinally: load,
  });
};

export const resendForgotEmailVerficationAPI = async (
  data,
  countDown,
  load
) => {
  apiRequest({
    method: "post",
    endpoint: "user/forgot-password",
    data,
    onSuccess: () => countDown(60),
    onFinally: load,
  });
};

export const changepasswordForgetAPI = async (data, error, load, nav) => {
  apiRequest({
    method: "post",
    endpoint: "user/reset-password",
    data,
    onSuccess: () => {
      nav("login");
    },
    onFailure: ({ message }) => error(message),
    onFinally: load,
  });
};

export const getFAQsAPI = () => {
  return async (dispatch) => {
    apiRequest({
      endpoint: "get-all-faq",
      onSuccess: ({ data }) => {
        dispatch(setFaqs(data));
      },
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
