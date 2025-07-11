import moment from 'moment';
import instance from '../utils/urls';
import {getItem} from '../utils/storage';
import {Notifier} from 'react-native-notifier';
import Component from '../components/Helpers/CustomToast';

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

export const catchFun = (msg, url) =>
  showNotification('error', msg, `Internal server error at ${url}`);

export const getNextWeekdays = count => {
  const days = [];
  let current = moment();

  while (days.length < count) {
    const dayOfWeek = current.day(); // 0 = Sun, 6 = Sat
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      days.push(moment(current)); // clone to avoid mutation
    }
    current = current.add(1, 'day');
  }

  return days;
};

export const maskCardNumber = cardNumber => {
  if (!cardNumber) return '•••• •••• •••• ••••';
  const lastFour = cardNumber.slice(-4);
  return `•••• ${lastFour}`;
};

export const cardValidator = {
  getCardType: number => {
    const num = number.replace(/\s/g, '');
    if (/^4/.test(num)) return 'visa';
    if (/^5[1-5]/.test(num)) return 'mastercard';
    if (/^3[47]/.test(num)) return 'amex';
    if (/^6(?:011|5)/.test(num)) return 'discover';
    return 'unknown';
  },

  isValidCardNumber: number => {
    const num = number.replace(/\s/g, '');
    if (!/^\d+$/.test(num)) return 'Only numbers allowed';

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

    return sum % 10 === 0 || 'Invalid card number';
  },
};

export const apiRequest = async ({
  method = 'get',
  endpoint,
  data = {},
  contentType = 'application/json',
  onSuccess,
  onNotFound,
  onFailure,
  onFinally,
}) => {
  try {
    onFinally?.(true);
    const token = getItem('token');
    const userID = getItem('userID');

    const headers = {
      userid: userID,
      Authorization: `Bearer ${token}`,
      ...(contentType && {'Content-Type': contentType}),
    };

    const response =
      method === 'get'
        ? await instance.get(endpoint, {headers})
        : await instance.post(endpoint, data, {headers});
    const {status, message} = response.data;
    if (status === 200) {
      onSuccess?.(response.data);
    } else if (status === 201) {
      onNotFound?.(response.data);
    } else {
      showNotification('error', message, `Status Code ${status + endpoint}`);
      onFailure?.(response.data);
      console.log('error', message, `Status Code ${status + endpoint}`);
    }
  } catch (err) {
    const msg = err?.response?.data?.message || err.message;
    catchFun(msg, endpoint);
    onFailure?.(err);
    console.log('error', msg, `Status Code ${endpoint}`);
  } finally {
    onFinally?.(false);
  }
};
