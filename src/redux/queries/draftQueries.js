import instance from "../../utils/urls";
import { getItem } from "../../utils/storage";
import { catchFun, showNotification } from "../../function";
import { setDraftItem, setDraftSelectedRetun } from "../slices/draftSlice";

const { log, error } = console;

export const uploadReturnItems = (
  submittedItems,
  confirmOrder,
  load,
  goBack
) => {
  return async (dispatch) => {
    load(true);
    const body = new FormData();

    // Filter out items with no detail
    const validItems = submittedItems.filter((item) => item.detail?.trim());

    // Map only the valid ones
    const inputs = validItems.map((item) => ({
      detail: item.detail,
      oversized: item.oversized,
    }));

    body.append("items", JSON.stringify(inputs));

    // Append only the matching image files
    validItems.forEach((item) => {
      body.append("files", {
        uri: item.image.uri,
        type: item.image.type,
        name: item.image.name,
      });
    });
    // image.forEach((item, index) => {
    //   body.append("files", {
    //     uri: item.uri,
    //     type: item.type,
    //     name: item.name,
    //   });
    // });

    try {
      const response = await instance.post("addbundle", body, {
        headers: {
          "Content-Type": "multipart/form-data",
          userid: getItem("userID"),
        },
      });

      const { status, message } = response.data;

      load(false);

      if (status === 200) {
        confirmOrder(false);
        showNotification("success", "Success", message);
        // Dispatch Redux actions if needed
        getReturnItem(load)(dispatch);
        goBack();
      } else {
        showNotification(
          "error",
          message || "Something went wrong",
          `Status Code ${status}`
        );
      }
    } catch (err) {
      const msg = err?.response?.data?.message || err.message;
      catchFun(msg);
      load(false);
    }
  };
};

export const getReturnItem = (load) => {
  return async (dispatch) => {
    try {
      load(true);
      const response = await instance.get("getAllReturnBundles", {
        headers: {
          userid: getItem("userID"),
        },
      });

      const { status, message, data } = response.data;
      load(false);

      if (status === 200) {
        dispatch(setDraftItem(data.reverse()));
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

export const getSelectedReturnItem = (labelIDs, load) => {
  return async (dispatch) => {
    try {
      console.log({ labelIDs });
      load(true);
      const url = `getbundle?bundleId=${labelIDs}`;
      const response = await instance.get(url, {
        headers: { userid: getItem("userID") },
      });

      const { status, message, data } = response.data;
      load(false);

      if (status === 200) {
        dispatch(setDraftSelectedRetun(data.reverse()));
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
