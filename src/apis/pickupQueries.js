import {
  setPickupData,
  setPickupDetailData,
} from "../redux/slices/pickupSlice";
import { apiRequest } from "../function";

export const getPickupAPI = (load) => {
  return async (dispatch) => {
    apiRequest({
      endpoint: "get-pickup-status",
      onSuccess: ({ data }) => {
        dispatch(
          setPickupData({
            active: data.active.reverse(),
            past: data.past.reverse(),
          })
        );
      },
      onFinally: load,
    });
  };
};
export const pickupDetailAPI = (id, load) => {
  return async (dispatch) => {
    // console.log(
    //   `https://returnbuddies-production.up.railway.app/api/get-pickup-by-id/${id}`
    // );
    apiRequest({
      endpoint: `/get-pickup-by-id/${id}`,
      onSuccess: (data) => {
        console.log(data);
      },
      // onSuccess: ({ data, trackingNumber, Carrier }) => {
      //   dispatch(setPickupDetailData({ data, trackingNumber, Carrier }));
      // },
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
    noNotification: true,
    endpoint: `/get-Promo?code=${code}`,
    onSuccess: ({ promo }) =>
      setPromoCode((prev) => ({
        ...prev,
        discount: promo.Discount,
        visible: true,
        applied: true,
        load: false,
        invalid: false,
      })),
    onFailure: () =>
      setPromoCode((prev) => ({
        ...prev,
        invalid: true,
        applied: false,
        load: false,
      })),
    onNotFound: () =>
      setPromoCode((prev) => ({
        ...prev,
        invalid: true,
        applied: false,
        load: false,
      })),
  });
};
