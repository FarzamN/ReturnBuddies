import { MMKV } from "react-native-mmkv";
export const storage = new MMKV();

export const reduxStorage = {
  setItem: (key, value) => {
    storage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: (key) => {
    const value = storage.getString(key);
    return Promise.resolve(value || null);
  },
  removeItem: (key) => {
    storage.delete(key);
    return Promise.resolve();
  },
};

export const setItem = (key, value) => {
  storage.set(key, JSON.stringify(value));
};

export const getItem = (key) => {
  const value = storage.getString(key);
  return value ? JSON.parse(value) : null;
};

export const removeItem = (key) => storage.delete(key);
