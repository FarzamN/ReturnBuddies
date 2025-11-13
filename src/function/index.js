import instance from "../utils/urls";
import { getItem } from "../utils/storage";
import { Notifier } from "react-native-notifier";
import Component from "../components/Helpers/CustomToast";
import { sendPlayerIdToBackend } from "../apis/authQueries";
import { LogLevel, OneSignal } from "react-native-onesignal";

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

export const setupOneSignal = (user) => {
  OneSignal.Debug.setLogLevel(LogLevel.Verbose);
  OneSignal.initialize(process.env.ONESIGNAL_APP_ID);
  OneSignal.Notifications.requestPermission(false);
  const handleWillDisplayEvent = (event) => {
    event.notification.display();
  };

  const handleSubscriptionChangeEvent = async (event) => {
    if (event.current.optedIn && user != null) {
      await sendPlayerIdToBackend();
    }
  };
  OneSignal.Notifications.addEventListener(
    "foregroundWillDisplay",
    handleWillDisplayEvent
  );
  OneSignal.User.pushSubscription.addEventListener(
    "change",
    handleSubscriptionChangeEvent
  );
  return () => {
    OneSignal.Notifications.removeEventListener(
      "foregroundWillDisplay",
      handleWillDisplayEvent
    );
    OneSignal.User.pushSubscription.removeEventListener(
      "change",
      handleSubscriptionChangeEvent
    );
  };
};
