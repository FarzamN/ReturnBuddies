import {
  setDraftItem,
  setGetBaseData,
  setDraftReturn,
  setDraftCompleteData,
  setDraftSelectedRetun,
} from "../redux/slices/draftSlice";
import { getItem } from "../utils/storage";
import { apiRequest, catchFun, showNotification } from "../function";

export const uploadReturnItems = (data, confirmOrder, load, goBack) => {
  return async (dispatch) => {
    apiRequest({
      method: "post",
      endpoint: "addbundle",
      contentType: "multipart/form-data",
      data,
      onSuccess: (res) => {
        confirmOrder(false);
        showNotification("success", "Success", res.message);
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

export const editLabelAPI = (data, load, goBack, _id) => {
  return async (dispatch) => {
    apiRequest({
      method: "post",
      endpoint: "editLabe",
      contentType: "multipart/form-data",
      data,
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

export const uploadLabelAPI = (data, load, goBack, _id) => {
  return async (dispatch) => {
    apiRequest({
      method: "post",
      endpoint: "/uploadLabel",
      contentType: "multipart/form-data",
      data,
      onSuccess: ({ data, message }) => {
        const newID = data.bundle._id ?? "";
        const updatedIDs = newID ? [..._id, newID] : [..._id];
        getSelectedReturnItem(updatedIDs, load)(dispatch);
        getReturnItem(load)(dispatch);

        showNotification("success", message, "hurry");
        goBack();
      },
      onFinally: load,
    });
  };
};

export const deleteBundle = (IDs, load) => {
  return async (dispatch) => {
    try {
      load(true);
      // const userID = ;
      const url = `deletebundle?bundleId=${IDs[0]}`;

      const res = await fetch(url, {
        method: "POST",
        headers: {
          userid: getItem("userID"),
          Authorization: "Bearer " + getItem("token"),
        },
      });
      // const response = await instance.post(url, {
      //   headers: {
      //     userid: getItem("userID"),
      //     // Authorization: "Bearer " + getItem("token"),
      //   },
      // });
      const { status, message } = res.json;
      load(false);

      if (status === 200) {
        getReturnItem(load)(dispatch);
        showNotification("success", message, "hurry");
      } else {
        showNotification("error", message, "Status Code 401");
      }
    } catch (err) {
      const msg = err?.response?.data?.message || err.message;
      catchFun(msg);
      load(false);
    }
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

export const confirmPickupAPI = (data, nav, load) => {
  return async (dispatch) => {
    apiRequest({
      method: "post",
      endpoint: "add-pickup",
      data,
      onSuccess: ({ data }) => {
        nav("trackPickup");
        dispatch(setDraftCompleteData(data));
        dispatch(
          setDraftReturn({
            _id: "",
            date: null,
            time: null,
            pickupMethod: "Doorstep",
            note: "",
            selectedAddress: null,
            selectedPayment: null,
          })
        );
      },
      onFinally: load,
    });
  };
};
