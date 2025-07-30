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

// export const googleLoginAPI = (data) => {
//   return async (dispatch) => {
//     apiRequest({
//       data,
//       method: "post",
//       endpoint: "user/Login-with-google",
//       onSuccess: ({ user, token }) => {
//         setItem("token", token);
//         setItem("userID", user._id);
//         dispatch(setLogin({ user, token }));
//       },
//     });
//   };
// };

export const googleLoginAPI = (data) => {
  return async (dispatch) => {
    const url =
      "https://returnbuddies-production.up.railway.app/api/user/Login-with-google";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idToken: data }),
      });

      const responseData = await response.json();
      const { status, message, user, token } = responseData;

      if (status === 200) {
        setItem("token", token);
        setItem("userID", user._id);
        dispatch(setLogin({ user, token }));
      } else {
        showNotification("error", message, "Status Code 400");
      }
    } catch (error) {
      catchFun(error, "googleLoginAPI");
    }
  };
};

export const loginAPI = (data, showOTP, saveEmail, load) => {
  return async (dispatch) => {
    apiRequest({
      method: "post",
      endpoint: "user/login",
      data,
      onSuccess: ({ user, token }) => {
        setItem("token", token);
        setItem("userID", user._id);
        dispatch(setLogin({ user, token }));
      },
      onNotFound: () => {
        showOTP();
        saveEmail(data.email);
      },
      onFinally: load,
    });
  };
};

export const registerAPI = async (data, showOTP, saveEmail, load) => {
  apiRequest({
    method: "post",
    endpoint: "user/register",
    data,
    onSuccess: () => {
      showOTP();
      saveEmail(data.email);
    },
    onFinally: load,
  });
};

export const verifyOTPAPI = (data, load, verify) => {
  return async (dispatch) => {
    apiRequest({
      method: "post",
      endpoint: "user/verifyemail",
      data,
      onSuccess: () => {
        verify((pre) => !pre);
      },
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

export const addPhoneNumberAPI = (data, type, navigation, load) => {
  return async (dispatch) => {
    apiRequest({
      method: "post",
      endpoint: "user/updatePhone",
      data,
      onSuccess: ({ OTP, message }) => {
        dispatch(setOTP(OTP));
        navigation.navigate("userOTP", { number: data.phone, type });
        showNotification("success", "Hurry", message);
      },
      onFinally: load,
    });
  };
};

export const editProfileAPI = (data, load) => {
  return async (dispatch) => {
    apiRequest({
      method: "post",
      endpoint: "user/editProfile",
      data,
      onSuccess: ({ message }) => {
        showNotification("success", "Hurry", message);
      },
      onFinally: load,
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
      method: "post",
      endpoint: "/user/updateNameandPhoneVerification",
      data,
      onSuccess: ({ user, message }) => {
        dispatch(setLogin({ user }));
        navigation.goBack();
        navigation.goBack();
        showNotification("success", "Hurry", message);
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
      onSuccess: (data) => {
        dispatch(setGetAddress(data.addresses.reverse()));
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

export const resendPhoneVerficationAPI = (data, load) => {
  return async (dispatch) => {
    apiRequest({
      method: "post",
      endpoint: "user/phoneVerfication",
      data,
      onSuccess: ({ otp }) => {
        dispatch(setOTP(otp));
      },
      onFinally: load,
    });
  };
};

export const phoneVerficationCompleteAPI = (data, goBack, load) => {
  return async (dispatch) => {
    apiRequest({
      method: "post",
      endpoint: "user/verifyPhone",
      data,
      onSuccess: ({ user }) => {
        goBack();
        dispatch(setLogin({ user }));
      },
      onFinally: load,
    });
  };
};

export const checkEmailToForgetPasswordAPI = async (data, navigate, load) => {
  apiRequest({
    method: "post",
    endpoint: "user/forgot-password",
    data,
    onSuccess: () => {
      navigate("otp", { number: data.email, type: "forgetPasswrod" });
    },
    onFinally: load,
  });
};

export const forgotEmailVerficationCompleteAPI = async (data, nav, load) => {
  console.log("data", data);
  apiRequest({
    method: "post",
    endpoint: "user/forgot-verfication",
    data,
    onSuccess: () => {
      nav("forgetPassword", { email: data.email });
    },
    onFinally: load,
  });
};

export const resendForgotEmailVerficationAPI = async (data, load) => {
  apiRequest({
    method: "post",
    endpoint: "user/forgot-password",
    data,
    onSuccess: () => {},
    onFinally: load,
  });
};

export const changepasswordForgetAPI = async (data, load, nav) => {
  apiRequest({
    method: "post",
    endpoint: "user/reset-password",
    data,
    onSuccess: () => {
      nav("login");
    },
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
    onSuccess: () => {},
  });
};
