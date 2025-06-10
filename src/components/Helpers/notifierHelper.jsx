import { Notifier } from "react-native-notifier";
import Component from "./CustomToast";

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
