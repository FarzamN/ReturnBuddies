import {apiRequest} from '../function';
import {setPickupData, setPickupDetailData} from '../redux/slices/pickupSlice';

export const getPickupAPI = load => {
  return async dispatch => {
    apiRequest({
      endpoint: 'get-pickup-status',
      onSuccess: ({data}) => {
        dispatch(setPickupData({active: data.active, past: data.past}));
        console.log('data', {
          active: [
            {
              Payment: '686fd559f22a2d4274095606',
              __v: 0,
              _id: '686fd7eff22a2d4274095655',
              bundleId: [Array],
              createdAt: '2025-07-10T15:10:39.228Z',
              isOversize: false,
              note: '',
              phone: '03110367927',
              pickupAddress: '686fd571f22a2d4274095612',
              pickupDate: '2025-07-16T00:00:00.000Z',
              pickupTime: '9:00 AM - 6:00 PM',
              pickupType: 'Doorstep',
              status: 'awaiting pickup',
              totalPrice: 10,
              updatedAt: '2025-07-10T15:10:39.228Z',
              userId: [Object],
            },
          ],
          past: [
            {
              Payment: '686fd559f22a2d4274095606',
              __v: 0,
              _id: '686fd67cf22a2d4274095626',
              bundleId: [Array],
              createdAt: '2025-07-10T15:04:28.903Z',
              isOversize: false,
              note: '',
              phone: '03110367927',
              pickupAddress: '686fd571f22a2d4274095612',
              pickupDate: '2025-07-14T00:00:00.000Z',
              pickupTime: '9:00AM - 1:00PM',
              pickupType: 'Doorstep',
              status: 'Pickup Canceled',
              totalPrice: 10,
              updatedAt: '2025-07-11T12:38:11.417Z',
              userId: [Object],
            },
          ],
        });
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

const dd = {
  data: {
    Payment: '686fd559f22a2d4274095606',
    __v: 0,
    _id: '686fd67cf22a2d4274095626',
    bundleId: [[Object]],
    createdAt: '2025-07-10T15:04:28.903Z',
    isOversize: false,
    note: '',
    phone: '03110367927',
    pickupAddress: '686fd571f22a2d4274095612',
    pickupDate: '2025-07-14T00:00:00.000Z',
    pickupTime: '9:00AM - 1:00PM',
    pickupType: 'Doorstep',
    status: 'awaiting pickup',
    totalPrice: 10,
    updatedAt: '2025-07-10T15:04:28.903Z',
    userId: {
      FirstLogin: false,
      __v: 0,
      _id: '686f64b1f22a2d42740955a0',
      createdAt: '2025-07-10T06:58:57.373Z',
      email: 'frzamn64ml@gmail.com',
      googleId: null,
      name: 'Farzam Noor',
      otp: null,
      password: '$2b$10$U9DvhysOG9MHIkXL71Vja.ad8miqZMODn15GFGAOOv6F5Xf9GdkBm',
      payment: '686fd559f22a2d4274095606',
      phone: '03110367927',
      phoneOtp: null,
      phoneVerified: false,
      pickupAddress: '686fd571f22a2d4274095612',
      profile:
        'https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?ga=GA1.1.756143352.1747218968&semt=ais_hybrid&w=740',
      role: 'user',
      updatedAt: '2025-07-10T15:00:01.148Z',
      verified: true,
    },
  },
  message: 'Pickup fetched successfully',
  status: 200,
  success: true,
  trackingNumber: '123456789',
};
