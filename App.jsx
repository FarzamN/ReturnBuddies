import Splash from "./src/screens/splash";
import { colors } from "./src/theme/colors";
import TabNav from "./src/navigaton/TabNav";
import { useEffect, useState } from "react";
import AuthNav from "./src/navigaton/AuthNav";
import { setupOneSignal } from "./src/function";
import { useDispatch, useSelector } from "react-redux";
import { NotifierWrapper } from "react-native-notifier";
import { getBasePriceAPI } from "./src/apis/draftQueries";
import { StripeProvider } from "@stripe/stripe-react-native";
import { NavigationContainer } from "@react-navigation/native";
import navigationColor from "react-native-system-navigation-bar";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { getFAQsAPI, sendPlayerIdToBackend } from "./src/apis/authQueries";

const App = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  GoogleSignin.configure({
    webClientId: process.env.webClientId,
    iosClientId: process.env.iosClientId,
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
    const cleanup = setupOneSignal(user, sendPlayerIdToBackend);
    return cleanup;
  }, [user]);

  setTimeout(() => {
    setShowSplash(false);
  }, 3000);
  return (
    <NavigationContainer>
      <StripeProvider
        publishableKey={process.env.STRIPE_PUBLISHABLE_KEY}
        merchantIdentifier="merchant.identifier" // required for Apple Pay
        urlScheme="retrunbuddies"
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
