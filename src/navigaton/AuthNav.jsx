import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  Login,
  Overboard,
  // Register,
  // CheckEmail,
  // OtpScreen,
  // ChangePassword,
  // PersonalInfo,
  // Country,
} from "../screens/auth";

const AuthNavigation = () => {
  const { Navigator, Screen } = createNativeStackNavigator();

  return (
    <Navigator
      initialRouteName="overboard"
      screenOptions={{ headerShown: false, animation: "ios_from_left" }}
    >
      {[
        { n: "overboard", c: Overboard },
        { n: "login", c: Login },
        // { n: "register", c: Register },
        // { n: "checkEmail", c: CheckEmail },
        // { n: "otpScreen", c: OtpScreen },
        // { n: "changePassword", c: ChangePassword },
        // { n: "personalInfo", c: PersonalInfo },
        // { n: "country", c: Country },
        // { n: "forgetPassword", c: ForgetPassword },
      ].map(({ n, c }) => (
        <Screen name={n} component={c} key={n} />
      ))}
    </Navigator>
  );
};

export default AuthNavigation;
