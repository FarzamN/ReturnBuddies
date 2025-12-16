import {
  setDraftItem,
  setGetBaseData,
  setDraftReturn,
  setDraftCompleteData,
  setDraftSelectedRetun,
} from "../redux/slices/draftSlice";
import { apiRequest } from "../function";

export const uploadReturnItems = (data, confirmOrder, load, goBack) => {
  return async (dispatch) => {
    apiRequest({
      data,
      method: "post",
      endpoint: "addbundle",
      contentType: "multipart/form-data",
      onSuccess: () => {
        confirmOrder(false);
        getReturnItem(load)(dispatch);
        goBack();
      },
      onFinally: load,
    });
  };
};

// export const uploadReturnItems = (data, confirmOrder, load, goBack) => {
//   return async (dispatch) => {
//     load(true);
//     const token = getItem("token");
//     const userid = getItem("userID");
//     const endpoint =
//       "https://returnbuddies-production.up.railway.app/api/addbundle";
//     try {
//       const response = await fetch(endpoint, {
//         body: data,
//         method: "POST",
//         headers: {
//           userid,
//           Authorization: `Bearer ${token}`,
//           Accept: "application/json",
//         },
//       });

//       const resData = await response.json();
//       const { status, message } = resData;

//       load(false);
//       if (status === 200) {
//         confirmOrder(false);
//         getReturnItem(load)(dispatch);
//         goBack();
//       } else {
//         console.error(message);
//       }
//     } catch (err) {
//       load(false);
//       console.error("chatch", err.message);
//     }
//   };
// };

export const editLabelAPI = (values, load, goBack, _id) => {
  return async (dispatch) => {
    apiRequest({
      data: values,
      method: "post",
      endpoint: "editLabel",
      contentType: "multipart/form-data",
      onSuccess: ({ data }) => {
        const newID = data.bundle._id ?? "";
        const updatedIDs = newID ? [..._id, newID] : [..._id];
        getSelectedReturnItem(updatedIDs, load)(dispatch);
        getReturnItem(load)(dispatch);
        goBack();
      },
      onFinally: load,
    });
  };
};

export const getReturnItem = (load) => {
  return async (dispatch) => {
    apiRequest({
      endpoint: "getAllReturnBundles",
      onSuccess: ({ data }) => {
        dispatch(setDraftItem(data.reverse()));
      },
      onFinally: load,
    });
  };
};

export const getSelectedReturnItem = (bundleIDs, load) => {
  return async (dispatch) => {
    apiRequest({
      endpoint: `getbundle?bundleId=${bundleIDs}`,
      onSuccess: ({ data }) => {
        dispatch(setDraftSelectedRetun(data.reverse()));
      },
      onFinally: load,
    });
  };
};

export const uploadLabelAPI = (values, load, goBack, _id) => {
  return async (dispatch) => {
    apiRequest({
      data: values,
      method: "post",
      endpoint: "/uploadLabel",
      contentType: "multipart/form-data",
      onSuccess: ({ data }) => {
        const newID = data.bundle._id ?? "";
        const updatedIDs = newID ? [..._id, newID] : [..._id];
        getSelectedReturnItem(updatedIDs, load)(dispatch);
        getReturnItem(load)(dispatch);
        goBack();
      },
      onFinally: load,
    });
  };
};

export const deleteBundle = (IDs, alert, load) => {
  return async (dispatch) => {
    apiRequest({
      method: "post",
      endpoint: `deletebundle?bundleId=${IDs}`,
      onSuccess: () => {
        getReturnItem(load)(dispatch);
        alert({ visible: false, _id: "" });
      },
      onFinally: load,
    });
  };
};

export const getBasePriceAPI = () => {
  return async (dispatch) => {
    apiRequest({
      endpoint: `get-baseprice`,
      onSuccess: ({ data }) => {
        dispatch(setGetBaseData(data));
      },
    });
  };
};

export const confirmPickupAPI = (data, nav, load, error) => {
  return async (dispatch) => {
    apiRequest({
      data,
      method: "post",
      endpoint: "add-pickup",
      onSuccess: ({ data }) => {
        nav("trackPickup");
        dispatch(setDraftCompleteData(data));
        dispatch(
          setDraftReturn({
            _id: "",
            note: "",
            date: null,
            time: null,
            selectedDateObj: {},
            selectedAddress: null,
            selectedPayment: null,
            pickupMethod: "Doorstep",
          })
        );
      },
      onFailure: ({ message }) =>
        error((props) => ({ ...props, payment: true, paymentString: message })),
      onCatchFailure: ({ message }) =>
        error((props) => ({ ...props, payment: true, paymentString: message })),
      onFinally: load,
    });
  };
};
