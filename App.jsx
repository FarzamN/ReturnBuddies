import Splash from "./src/screens/splash";
import { colors } from "./src/theme/colors";
import TabNav from "./src/navigaton/TabNav";
import AuthNav from "./src/navigaton/AuthNav";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NotifierWrapper } from "react-native-notifier";
import { NavigationContainer } from "@react-navigation/native";
import navigationColor from "react-native-system-navigation-bar";

const App = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  console.log("user", user);

  const [showSplash, setShowSplash] = useState(true);

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
