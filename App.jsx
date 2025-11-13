import Splash from "./src/screens/splash";
import { colors } from "./src/theme/colors";
import TabNav from "./src/navigaton/TabNav";
import { useEffect, useState } from "react";
import AuthNav from "./src/navigaton/AuthNav";
import { useDispatch, useSelector } from "react-redux";
import { NotifierWrapper } from "react-native-notifier";
import { getBasePriceAPI } from "./src/apis/draftQueries";
import { StripeProvider } from "@stripe/stripe-react-native";
import { OneSignal, LogLevel } from "react-native-onesignal";
import { NavigationContainer } from "@react-navigation/native";
import navigationColor from "react-native-system-navigation-bar";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { getFAQsAPI, sendPlayerIdToBackend } from "./src/apis/authQueries";
import {
  STRIPE_PUBLISHABLE_KEY,
  ONESIGNAL_APP_ID,
  iosClientId,
  webClientId,
} from "./src/constants";
const App = () => {
  const dispatch = useDispatch();
  const { user, getPayments } = useSelector((state) => state.auth);

  GoogleSignin.configure({
    webClientId,
    iosClientId,
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
        publishableKey={STRIPE_PUBLISHABLE_KEY}
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
