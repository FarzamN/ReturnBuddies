import { showNotification } from "../../components/Helpers/notifierHelper";
import { catchFun } from "../../function";
import { getItem } from "../../utils/storage";
import instance from "../../utils/urls";
import { setDraftItem, setDraftSelectedRetun } from "../slices/draftSlice";

const { log, error } = console;

export const uploadReturnItems = (data, image, confirmOrder, load) => {
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
      } else {
        showNotification(
          "error",
          message || "Something went wrong",
          `Status Code ${status}`
        );
      }
    } catch (error) {
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
      const userID = getItem("userID");
      const url = `getbundle?bundleId=${labelIDs}`;
      const response = await instance.get(url, {
        headers: {
          userid: userID,
        },
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
