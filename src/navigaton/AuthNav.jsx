import {
  Login,
  UserOTP,
  Register,
  Support,
  Overboard,
  CheckEmail,
  ForgetPassword,
} from "../screens/auth";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const AuthNavigation = () => {
  const { Navigator, Screen } = createNativeStackNavigator();

  return (
    <Navigator
      initialRouteName="overboard"
      screenOptions={{
        animation: "none",
        headerShown: false,
        orientation: "portrait_up",
      }}
    >
      {[
        { n: "login", c: Login },
        { n: "otp", c: UserOTP },
        { n: "support", c: Support },
        { n: "register", c: Register },
        { n: "overboard", c: Overboard },
        { n: "checkEmail", c: CheckEmail },
        { n: "forgetPassword", c: ForgetPassword },
      ].map(({ n, c }) => (
        <Screen
          key={n}
          name={n}
          component={c}
          options={{ orientation: "portrait_up" }}
        />
      ))}
    </Navigator>
  );
};

export default AuthNavigation;
