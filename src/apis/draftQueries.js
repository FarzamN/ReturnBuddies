import instance from "../utils/urls";
import { getItem } from "../utils/storage";
import { apiRequest, catchFun, showNotification } from "../function";
import {
  setDraftItem,
  setGetBaseData,
  setDraftSelectedRetun,
  setDraftReturn,
  setDraftCompleteData,
} from "../redux/slices/draftSlice";

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
      method: "get",
      endpoint: "getAllReturnBundles",
      onSuccess: ({ data }) => {
        dispatch(setDraftItem(data.reverse()));
      },
      onFinally: load,
    });
  };
};

export const getSelectedReturnItem = (labelIDs, load) => {
  return async (dispatch) => {
    apiRequest({
      method: "get",
      endpoint: `getbundle?bundleId=${labelIDs}`,
      onSuccess: ({ data }) => {
        dispatch(setDraftSelectedRetun(data.reverse()));
      },
      onFinally: load,
    });
  };
};

export const uploadLabelAPI = (
  bundleId,
  date,
  productIDs,
  docx,
  load,
  goBack,
  _id
) => {
  return async (dispatch) => {
    load(true);
    const productID = productIDs.map((item) => {
      return { productId: item };
    });
    const body = new FormData();
    body.append("bundleId", bundleId);
    body.append("date", date);
    body.append("productIDs", JSON.stringify(productID));
    body.append("label", {
      uri: docx.uri,
      type: docx.type,
      name: docx.name,
    });
    try {
      const response = await instance.post("uploadLabel", body, {
        headers: {
          "Content-Type": "multipart/form-data",
          userid: getItem("userID"),
          Authorization: "Bearer " + getItem("token"),
        },
      });
      const { status, message, data } = await response.data;
      if (status === 200) {
        load(false);
        const newID = data.bundle._id ?? "";
        const updatedIDs = newID ? [..._id, newID] : [..._id];
        getSelectedReturnItem(updatedIDs, load)(dispatch);
        getReturnItem(load)(dispatch);

        showNotification("success", message, "hurry");
        goBack();
      } else {
        load(false);
        showNotification("error", message, "Status Code 401");
      }
      load(false);
    } catch (err) {
      const msg = err?.response?.data?.message || err.message;
      catchFun(msg);
      load(false);
    }
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
      method: "get",
      endpoint: `get-baseprice`,
      onSuccess: ({ data }) => {
        dispatch(setGetBaseData(data));
      },
    });
  };
};

export const confirmPickupAPI = (data, nav, load) => {
  return async (dispatch) => {
    console.log("data", data);
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
