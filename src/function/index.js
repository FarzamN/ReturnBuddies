import moment from "moment";
import instance from "../utils/urls";
import { getItem } from "../utils/storage";
import { Notifier } from "react-native-notifier";
import Component from "../components/Helpers/CustomToast";

export const showNotification = (title, message) => {
  Notifier.showNotification({
    title,
    Component,
    description: message,
    componentProps: {
      type: "error",

      title,
      message,
    },
    duration: 3000,
  });
};

export const catchFun = (msg) => showNotification(msg, "Internal server error");

export const getNextWeekdays = (count) => {
  const days = [];
  let current = moment();

  while (days.length < count) {
    const dayOfWeek = current.day();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      days.push(moment(current));
    }
    current = current.add(1, "day");
  }

  return days;
};

export const maskCardNumber = (cardNumber) => {
  if (!cardNumber) return "•••• •••• •••• ••••";
  const lastFour = cardNumber.slice(-4);
  return `•••• ${lastFour}`;
};

export const cardValidator = {
  getCardType: (number) => {
    const num = number.replace(/\s/g, "");
    if (/^4/.test(num)) return "Visa";
    if (/^5[1-5]/.test(num)) return "Master";
    if (/^3[47]/.test(num)) return "Amex";
    if (/^6(?:011|5)/.test(num)) return "Discover";
    return "Unknown";
  },

  isValidCardNumber: (number) => {
    const num = number.replace(/\s/g, "");
    if (!/^\d+$/.test(num)) return "Only numbers allowed";

    // Luhn algorithm
    let sum = 0;
    for (let i = 0; i < num.length; i++) {
      let digit = parseInt(num[i]);
      if ((num.length - i) % 2 === 0) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
    }

    return sum % 10 === 0 || "Invalid card number";
  },
};

export const apiRequest = async ({
  method = "get",
  endpoint,
  data = {},
  contentType = "application/json",
  onSuccess,
  onNotFound,
  onFailure,
  onFinally,
  noNotification = false,
  onCatchFailure,
}) => {
  try {
    onFinally?.(true);
    const token = getItem("token");
    const userid = getItem("userID");

    const headers = {
      userid,
      Authorization: `Bearer ${token}`,
      ...(contentType && { "Content-Type": contentType }),
    };
    const response =
      method === "get"
        ? await instance.get(endpoint, { headers })
        : await instance.post(endpoint, data, { headers });
    const { status, message } = response.data;
    if (status === 200) {
      onSuccess?.(response.data);
    } else if (status === 201) {
      onNotFound?.(response.data);
    } else {
      if (!noNotification)
        showNotification(message, `Status Code ${status + " " + endpoint}`);
      onFailure?.(response.data);
      console.log(message, `Status Code ${status + " " + endpoint}`);
    }
  } catch (err) {
    const msg = err?.response?.data?.message || err.message;
    if (!noNotification) catchFun(msg, endpoint);
    onCatchFailure?.(msg);
    console.log(msg, endpoint, "catch");
  } finally {
    onFinally?.(false);
  }
};

const dd = {
  id: "pm_1SPNPIKk0elFW1liN09TVpxc",
  paymentMethodType: "Card",
  livemode: true,
  billingDetails: {
    email: null,
    phone: null,
    name: "Farzam",
    address: {
      state: null,
      country: null,
      line2: null,
      city: null,
      line1: null,
      postalCode: null,
    },
  },
  AuBecsDebit: {
    fingerprint: null,
    last4: null,
    bsbNumber: null,
  },
  USBankAccount: {
    accountHolderType: "Unknown",
    bankName: null,
    fingerprint: null,
    accountType: "Unknown",
    last4: null,
    routingNumber: null,
    linkedAccount: null,
    supportedNetworks: null,
    preferredNetworks: null,
  },
  customerId: null,
  BacsDebit: {
    fingerprint: null,
    last4: null,
    sortCode: null,
  },
  SepaDebit: {
    bankCode: null,
    country: null,
    last4: null,
    fingerprint: null,
  },
  Fpx: {
    bank: "",
  },
  Upi: {
    vpa: null,
  },
  Ideal: {
    bankIdentifierCode: "",
    bankName: "",
  },
  Card: {
    funding: "debit",
    preferredNetwork: null,
    country: "PK",
    threeDSecureUsage: {
      isSupported: true,
    },
    fingerprint: null,
    expMonth: 5,
    availableNetworks: ["mastercard"],
    brand: "MasterCard",
    last4: "7802",
    expYear: 2029,
  },
};
