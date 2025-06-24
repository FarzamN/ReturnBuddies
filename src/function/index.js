import moment from "moment";
import { Notifier } from "react-native-notifier";
import Component from "../components/Helpers/CustomToast";

export const showNotification = (type, title, message) => {
  Notifier.showNotification({
    title,
    Component,
    description: message,
    componentProps: {
      type,
      title,
      message,
    },
    duration: 3000,
  });
};

export const catchFun = (msg) => showNotification("error", msg, "Error");

export const getNextWeekdays = (count) => {
  const days = [];
  let current = moment();

  while (days.length < count) {
    const dayOfWeek = current.day(); // 0 = Sun, 6 = Sat
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      days.push(moment(current)); // clone to avoid mutation
    }
    current = current.add(1, "day");
  }

  return days;
};

export const cardValidator = {
  getCardType: (number) => {
    const num = number.replace(/\s/g, "");
    if (/^4/.test(num)) return "visa";
    if (/^5[1-5]/.test(num)) return "mastercard";
    if (/^3[47]/.test(num)) return "amex";
    if (/^6(?:011|5)/.test(num)) return "discover";
    return "unknown";
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
