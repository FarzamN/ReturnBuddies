import Splash from "./src/screens/splash";
import { colors } from "./src/theme/colors";
import TabNav from "./src/navigaton/TabNav";
import AuthNav from "./src/navigaton/AuthNav";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NotifierWrapper } from "react-native-notifier";
import { NavigationContainer } from "@react-navigation/native";
import navigationColor from "react-native-system-navigation-bar";
import { getBasePriceAPI } from "./src/apis/draftQueries";
import { getFAQsAPI } from "./src/apis/authQueries";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

const App = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  GoogleSignin.configure({
    webClientId:
      "47814484030-jk2std4j9f0n1recohmceaeo4jpihgmq.apps.googleusercontent.com",
    iosClientId:
      "47814484030-ebh93osqqpe7h3i1djc9gudqhlfl8bl4.apps.googleusercontent.com",
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
