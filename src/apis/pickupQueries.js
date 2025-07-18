import {apiRequest, showNotification} from '../function';
import {setPickupData, setPickupDetailData} from '../redux/slices/pickupSlice';

export const getPickupAPI = load => {
  return async dispatch => {
    apiRequest({
      endpoint: 'get-pickup-status',
      onSuccess: ({data}) => {
        dispatch(setPickupData({active: data.active, past: data.past}));
      },
      onFinally: load,
    });
  };
};
export const pickupDetailAPI = (id, load) => {
  return async dispatch => {
    apiRequest({
      endpoint: `/get-pickup-by-id/${id}`,
      onSuccess: ({data, trackingNumber}) => {
        dispatch(setPickupDetailData({data, trackingNumber}));
      },
      onFinally: load,
    });
  };
};

export const deletePickupAPI = (id, load, showDelete) => {
  return async dispatch => {
    console.log('id', id);
    apiRequest({
      method: 'post',
      endpoint: `/canceled-pickup/${id}`,
      onSuccess: () => {
        showDelete(false);
        getPickupAPI(load)(dispatch);
        pickupDetailAPI(id, load)(dispatch);
      },
      onFinally: load,
    });
  };
};

export const checkPromocode = (id, setPromoCode, load) => {
  apiRequest({
    endpoint: `/get-Promo?code=${id}`,
    onSuccess: ({promo, message}) => {
      showNotification('success', 'Success', message);
      setPromoCode({discount: promo.Discount, visible: true});
    },
    onNotFound: () => {
      showNotification('error', 'error', 'Promo code not found');
    },
    onFinally: setPromoCode({load: true}),
  });
};
