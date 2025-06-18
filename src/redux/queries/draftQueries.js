import { catchFun } from "../../function";
import { getItem } from "../../utils/storage";
import instance, { imageURl } from "../../utils/urls";
import { showNotification } from "../../components/Helpers/notifierHelper";
import { setDraftItem, setDraftSelectedRetun } from "../slices/draftSlice";

const { log, error } = console;

export const uploadReturnItems = (data, image, confirmOrder, load, goBack) => {
  return async (dispatch) => {
    load(true);
    const userID = getItem("userID");

    const body = new FormData();
    body.append("items", JSON.stringify(data));
    image.forEach((item, index) => {
      body.append("files", {
        uri: item.uri,
        type: item.type,
        name: item.name,
      });
    });

    try {
      const response = await instance.post("addbundle", body, {
        headers: {
          "Content-Type": "multipart/form-data",
          userid: userID,
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
      load(false);
      showNotification(
        "error",
        err?.response?.data?.message || err.message,
        "Error"
      );

      error(
        "Upload Return Items error:",
        err?.response?.data?.message || err.message
      );
    }
  };
};

//   itemsWithImages.forEach((item, index) => {
//     body.append(`items[${index}][detail]`, item.detail);
//     body.append(`items[${index}][oversized]`, item.oversized);
//     body.append(`items[${index}][image]`, {
//       uri: item.image.uri,
//       type: item.image.type,
//       name: item.image.name,
//     });
//   });
//   image.forEach((item, index) => {
//     body.append(`items[${index}][image]`, {
//       uri: item.image.uri,
//       type: item.image.type,
//       name: item.image.name,
//     });
//   });

export const getReturnItem = (load) => {
  return async (dispatch) => {
    try {
      load(true);
      const userID = getItem("userID");

      const response = await instance.get("getAllReturnBundles", {
        headers: {
          userid: userID,
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
      load(false);
      showNotification(
        "error",
        err?.response?.data?.message || err.message,
        "Error"
      );

      error(
        "get Return Item error:",
        err?.response?.data?.message || err.message
      );
    }
  };
};

export const getSelectedReturnItem = (labelIDs, load) => {
  return async (dispatch) => {
    try {
      load(true);
      const userid = getItem("userID");
      const url = `getbundle?bundleId=${labelIDs}`;
      const response = await instance.get(url, {
        headers: { userid },
      });

      const { status, message, data } = response.data;
      load(false);

      if (status === 200) {
        dispatch(setDraftSelectedRetun(data.reverse()));
      } else {
        showNotification("error", message, "Status Code 401");
      }
    } catch (err) {
      load(false);
      showNotification(
        "error",
        err?.response?.data?.message || err.message,
        "Error"
      );

      error(
        "get Return Item error:",
        err?.response?.data?.message || err.message
      );
    }
  };
};

// export const uploadLabelAPI = (
// bundleId,
// date,
// productIDs,
// docx,
// load,
// goBack,
// _id
// ) => {
//   return async (dispatch) => {
// load(true);
// const productID = productIDs.map((item) => {
//   return { productId: item };
// });
// const body = new FormData();
// body.append("bundleId", bundleId);
// body.append("date", date);
// body.append("productIDs", JSON.parse(productID));
// body.append("label", {
//   uri: docx.uri,
//   type: docx.type,
//   name: docx.name,
// });
//     console.log("body", body);
//     try {
// const response = await instance.post("uploadLabel", body, {
//   headers: {
//     "Content-Type": "multipart/form-data",
//     userid: getItem("userID"),
//     Authorization: "Bearer " + getItem("token"),
//   },
// });
// const { status, message, data } = await response.data;
// if (status === 200) {
//   load(false);
//   const updatedIDs = [..._id, data.bundle._id];
//   getSelectedReturnItem(updatedIDs, load)(dispatch);
//   getReturnItem(load)(dispatch);

//   showNotification("success", message, "hurry");
//   goBack();
// } else {
//   load(false);
//   showNotification("error", message, "Status Code 401");
// }
// } catch (err) {
//   load(false);
//   showNotification(
//     "error",
//     err?.response?.data?.message || err.message,
//     "Error"
//   );

//   error(
//     "uploadLabelAPI error:",
//     err?.response?.data?.message || err.message
//   );
// }
//   };
// };

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
      console.log(response.data);
      if (status === 200) {
        load(false);
        const updatedIDs = [..._id, data.bundle._id];
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
      load(false);
      showNotification(
        "error",
        err?.response?.data?.message || err.message,
        "Error"
      );

      error(
        "uploadLabelAPI error:",
        err?.response?.data?.message || err.message
      );
    }
  };
};

export const deleteBundle = (IDs, load) => {
  return async (dispatch) => {
    try {
      load(true);
      const userid = getItem("userID");
      const url = `deletebundle/:${userid}/:${IDs}`;
      console.log(url);
      const response = await instance.get(url, {
        headers: { userid },
      });

      const { status, message } = response.data;
      load(false);

      if (status === 200) {
        getReturnItem(load)(dispatch);
        showNotification("success", message, "hurry");
      } else {
        showNotification("error", message, "Status Code 401");
      }
    } catch (err) {
      load(false);
      showNotification(
        "error",
        err?.response?.data?.message || err.message,
        "Error"
      );

      error("deleteBundle error:", err?.response?.data?.message || err.message);
    }
  };
};
