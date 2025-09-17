import Splash from "./src/screens/splash";
import { colors } from "./src/theme/colors";
import TabNav from "./src/navigaton/TabNav";
import AuthNav from "./src/navigaton/AuthNav";
import React, { useEffect, useState } from "react";
import { getFAQsAPI } from "./src/apis/authQueries";
import { useDispatch, useSelector } from "react-redux";
import { NotifierWrapper } from "react-native-notifier";
import { getBasePriceAPI } from "./src/apis/draftQueries";
import { NavigationContainer } from "@react-navigation/native";
import navigationColor from "react-native-system-navigation-bar";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { OneSignal, LogLevel } from "react-native-onesignal";

const App = () => {
  const dispatch = useDispatch();
  const ONESIGNAL_APP_ID = "249b4107-fde7-41c1-9d81-b3c4fa097156";

  const { user } = useSelector((state) => state.auth);

  GoogleSignin.configure({
    webClientId:
      "44903643593-lqp344riggspaem55elarln5esgubu3d.apps.googleusercontent.com",
    iosClientId:
      "44903643593-371v24l963qnkr4hn370mh5ovt7gvrr1.apps.googleusercontent.com",
    offlineAccess: true,
    forceCodeForRefreshToken: true,
  });

  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    if (user != null) {
      getBasePriceAPI()(dispatch);
      getFAQsAPI()(dispatch);
    }
    navigationColor.setNavigationColor(colors.background, "dark", "navigation");
  }, [user]);

  useEffect(() => {
    // Set the log level for debugging
    OneSignal.Debug.setLogLevel(LogLevel.Verbose);
    // Initialize OneSignal
    OneSignal.initialize(ONESIGNAL_APP_ID);

    // Request notification permission
    OneSignal.Notifications.requestPermission(false);

    const handleWillDisplayEvent = (event) => {
      const notification = event.notification;
      event.notification.display();
      // if (notification.body && token !== null) getNotificationApi()(dispatch);

      // Extract any additional data from the notification
    };

    const handleSubscriptionChangeEvent = async (event) => {
      if (event.current.optedIn) {
        const userId = await OneSignal.User.pushSubscription.getIdAsync();
        setItem("notification_id", userId);
      }
    };

    // Handle notifications shown in foreground
    OneSignal.Notifications.addEventListener(
      "foregroundWillDisplay",
      handleWillDisplayEvent
    );

    // Subscription observer for user ID
    OneSignal.User.pushSubscription.addEventListener(
      "change",
      handleSubscriptionChangeEvent
    );

    return () => {
      // Cleanup listeners
      OneSignal.Notifications.removeEventListener(
        "foregroundWillDisplay",
        handleWillDisplayEvent
      );
      OneSignal.User.pushSubscription.removeEventListener(
        "change",
        handleSubscriptionChangeEvent
      );
    };
  }, []);

  setTimeout(() => {
    setShowSplash(false);
  }, 3000);
  return (
    <NavigationContainer>
      <NotifierWrapper>
        {showSplash ? (
          <Splash />
        ) : (
          <>{user == null ? <AuthNav /> : <TabNav />}</>
        )}
      </NotifierWrapper>
    </NavigationContainer>
  );
};

export default App;
