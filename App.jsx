import React, { useEffect, useState } from "react";
import { colors } from "./src/theme/colors";
import TabNav from "./src/navigaton/TabNav";
import AuthNav from "./src/navigaton/AuthNav";
import { useDispatch, useSelector } from "react-redux";
import { NotifierWrapper } from "react-native-notifier";
import { NavigationContainer } from "@react-navigation/native";
import navigationColor from "react-native-system-navigation-bar";
import Splash from "./src/screens/splash";

const App = () => {
  const dispatch = useDispatch();

  const { user, token } = useSelector((state) => state.auth);
  console.log("token", token);

  const [showSplash, setShowSplash] = useState(true);
  useEffect(() => {
    // if (user !== null && token !== null) fetchData();
  }, [token]);

  useEffect(() => {
    navigationColor.setNavigationColor(colors.background, "dark", "navigation");
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
