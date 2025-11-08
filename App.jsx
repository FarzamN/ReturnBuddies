import Splash from "./src/screens/splash";
import { colors } from "./src/theme/colors";
import TabNav from "./src/navigaton/TabNav";
import AuthNav from "./src/navigaton/AuthNav";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NotifierWrapper } from "react-native-notifier";
import { getBasePriceAPI } from "./src/apis/draftQueries";
import { StripeProvider } from "@stripe/stripe-react-native";
import { OneSignal, LogLevel } from "react-native-onesignal";
import { NavigationContainer } from "@react-navigation/native";
import navigationColor from "react-native-system-navigation-bar";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { getFAQsAPI, sendPlayerIdToBackend } from "./src/apis/authQueries";

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
      // sendPlayerIdToBackend();
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
      event.notification.display();
      // if (notification.body && token !== null) getNotificationApi()(dispatch);
    };

    const handleSubscriptionChangeEvent = async (event) => {
      if (event.current.optedIn)
        if (user != null) await sendPlayerIdToBackend();
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
      <StripeProvider
        publishableKey={
          "pk_live_51JzTs2Kk0elFW1liNnnXN1Pr3r9Qak4v02CiSIl2WK58Ju7nlnCiGvr1DD1q4NwH8rIXgR5HJlkVtMYQXY9AZyCF00NKobvkyg"
        }
        merchantIdentifier="merchant.identifier" // required for Apple Pay
        urlScheme="retrunbuddies" // required for 3D Secure and bank redirects
      >
        <NotifierWrapper>
          {showSplash ? (
            <Splash />
          ) : (
            <>{user == null ? <AuthNav /> : <TabNav />}</>
          )}
        </NotifierWrapper>
      </StripeProvider>
    </NavigationContainer>
  );
};

export default App;
