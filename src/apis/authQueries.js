import {
  setOTP,
  setLogin,
  setLogout,
  setGetAddress,
  setGetPayments,
  updatePaymentCard,
  updateAddress,
} from "../redux/slices/authSlice";
import instance from "../utils/urls";
import { getItem, setItem } from "../utils/storage";
import { apiRequest, catchFun, showNotification } from "../function";

// export const  = (data, showOTP, saveEmail, load) => {
//   return async (dispatch) => {
//     try {
//       load(true);
//       const response = await instance.post("user/", data);
//       const { status, message, user, token } = response.data;
//       load(false);
//       if (status === 200) {

//       } else if (status === 201) {

//       } else {
//         showNotification("error", message, "Status Code 401");
//       }
//     } catch (err) {
//       const msg = err?.response?.data?.message || err.message;
//       catchFun(msg);
//       load(false);
//     }
//   };
// };

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
    onFailure: (response) => {
      console.log("response", response);
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

export const deleteAccountPasswordAPI = async (data, load, nav) => {
  apiRequest({
    method: "post",
    endpoint: "user/delete-account",
    data,
    onSuccess: () => {
      nav("deleteOTP");
    },
    onFinally: load,
  });
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

export const editProfileAPI = (data, type, navigation, load) => {
  return async (dispatch) => {
    apiRequest({
      method: "post",
      endpoint: "/user/updateNameandPhone",
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
      method: "get",
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
      method: "get",
      endpoint: "get-payment-card",
      onSuccess: ({ cards }) => {
        console.log("cards", cards);
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
