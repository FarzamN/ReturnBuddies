import { apiRequest, showNotification } from "../function";
import {
  setPickupData,
  setPickupDetailData,
} from "../redux/slices/pickupSlice";

export const getPickupAPI = (load) => {
  return async (dispatch) => {
    apiRequest({
      endpoint: "get-pickup-status",
      onSuccess: ({ data }) => {
        dispatch(setPickupData({ active: data.active, past: data.past }));
      },
      onFinally: load,
    });
  };
};
export const pickupDetailAPI = (id, load) => {
  return async (dispatch) => {
    apiRequest({
      endpoint: `/get-pickup-by-id/${id}`,
      onSuccess: ({ data, trackingNumber }) => {
        console.log("trackingNumber", trackingNumber);
        dispatch(setPickupDetailData({ data, trackingNumber }));
      },
      onFinally: load,
    });
  };
};

export const deletePickupAPI = (id, load, showDelete) => {
  return async (dispatch) => {
    apiRequest({
      method: "post",
      endpoint: `/cancelled-pickup/${id}`,
      onSuccess: () => {
        showDelete(false);
        getPickupAPI(load)(dispatch);
        pickupDetailAPI(id, load)(dispatch);
      },
      onFinally: load,
    });
  };
};

export const checkPromocode = (code, setPromoCode) => {
  setPromoCode((prev) => ({ ...prev, load: true, invalid: false }));
  apiRequest({
    endpoint: `/get-Promo?code=${code}`,
    onSuccess: ({ promo, message }) => {
      showNotification("success", "Success", message);
      setPromoCode((prev) => ({
        ...prev,
        discount: promo.Discount,
        visible: true,
        applied: true,
        load: false,
        invalid: false,
      }));
    },
    onNotFound: () =>
      setPromoCode((prev) => ({
        ...prev,
        invalid: true,
        applied: false,
        load: false,
      })),
  });
};
