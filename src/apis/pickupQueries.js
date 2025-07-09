import { apiRequest } from "../function";
import { setPickupData } from "../redux/slices/pickupSlice";

export const getPickupAPI = (load) => {
  return async (dispatch) => {
    apiRequest({
      endpoint: "get-pickup-status",
      onSuccess: ({ data }) => {
        dispatch(setPickupData(data));
      },
      onFinally: load,
    });
  };
};

const data = {
  active: [
    {
      _id: "6866a054cb6649f4dcb4f00b",
      userId: {
        _id: "68669dcecb6649f4dcb4efcd",
        name: "farzam",
        email: "farzamnoor5@gmail.com",
        profile:
          "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?ga=GA1.1.756143352.1747218968&semt=ais_hybrid&w=740",
        password:
          "$2b$10$2qBTeKa.AFxBdOdfnTgfO.OX0TcLS7ZxZeWPiar2XUzGHxG3aMCYW",
        verified: true,
        googleId: null,
        otp: null,
        phoneOtp: 76511,
        phoneVerified: true,
        phone: "0312312312",
        role: "user",
        createdAt: "2025-07-03T15:12:14.052Z",
        updatedAt: "2025-07-04T12:53:23.947Z",
        __v: 0,
        pickupAddress: "6867cd92cb6649f4dcb4f13b",
        payment: "6867cec3cb6649f4dcb4f14f",
      },
      bundleId: [
        {
          _id: "68669fbccb6649f4dcb4efe7",
          userId: "68669dcecb6649f4dcb4efcd",
          BundleName: "Return #6",
          products: ["68669fbccb6649f4dcb4efe5"],
          history: [],
          pickupAddress: null,
          payment: null,
          pickupTime: null,
          status: "processed",
          createdAt: "2025-07-03T15:20:28.541Z",
          __v: 0,
        },
      ],
      status: "awaiting pickup",
      pickupAddress: "6866a038cb6649f4dcb4effb",
      note: "",
      pickupDate: "2025-07-04T00:00:00.000Z",
      pickupTime: "9:00 AM - 6:00 PM",
      pickupType: "Direct Handoff",
      Payment: "6866a04fcb6649f4dcb4f005",
      isOversize: false,
      totalPrice: 10,
      phone: "0312312312",
      createdAt: "2025-07-03T15:23:00.980Z",
      updatedAt: "2025-07-03T15:23:00.980Z",
      __v: 0,
    },
  ],
  post: [
    {
      _id: "6866a0a8cb6649f4dcb4f014",
      userId: {
        _id: "68669dcecb6649f4dcb4efcd",
        name: "farzam",
        email: "farzamnoor5@gmail.com",
        profile:
          "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?ga=GA1.1.756143352.1747218968&semt=ais_hybrid&w=740",
        password:
          "$2b$10$2qBTeKa.AFxBdOdfnTgfO.OX0TcLS7ZxZeWPiar2XUzGHxG3aMCYW",
        verified: true,
        googleId: null,
        otp: null,
        phoneOtp: 76511,
        phoneVerified: true,
        phone: "0312312312",
        role: "user",
        createdAt: "2025-07-03T15:12:14.052Z",
        updatedAt: "2025-07-04T12:53:23.947Z",
        __v: 0,
        pickupAddress: "6867cd92cb6649f4dcb4f13b",
        payment: "6867cec3cb6649f4dcb4f14f",
      },
      bundleId: [
        {
          _id: "68669fbccb6649f4dcb4efe7",
          userId: "68669dcecb6649f4dcb4efcd",
          BundleName: "Return #6",
          products: ["68669fbccb6649f4dcb4efe5"],
          history: [],
          pickupAddress: null,
          payment: null,
          pickupTime: null,
          status: "processed",
          createdAt: "2025-07-03T15:20:28.541Z",
          __v: 0,
        },
      ],
      status: "canceled",
      pickupAddress: "6866a038cb6649f4dcb4effb",
      note: "",
      pickupDate: "2025-07-04T00:00:00.000Z",
      pickupTime: "9:00 AM - 6:00 PM",
      pickupType: "Doorstep",
      Payment: "6866a04fcb6649f4dcb4f005",
      isOversize: false,
      totalPrice: 10,
      phone: "0312312312",
      createdAt: "2025-07-03T15:24:24.157Z",
      updatedAt: "2025-07-03T15:24:24.157Z",
      __v: 0,
    },
  ],
};
