import { Platform } from "react-native";
import { emailRegex } from "./urls";

export const OS = Platform.OS;
export const iOS = Platform.OS === "ios";
export const android = Platform.OS === "android";

export const minLength = {
  value: 8,
  message: "Password must be at least 8 characters",
};

export const maxLength = {
  value: 16,
  message: "Password must be less than 20 characters",
};

export const emailPattern = {
  value: emailRegex,
  message: "Email is not valid",
};

export const required = (type) => {
  return `${type} is required`;
};
