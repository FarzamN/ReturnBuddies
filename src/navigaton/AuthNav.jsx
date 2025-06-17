import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  Login,
  Overboard,
  Register,
  ContactUS,
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
      o
      screenOptions={{
        headerShown: false,
        animation: "ios_from_left",
        orientation: "portrait_up",
      }}
    >
      {[
        { n: "overboard", c: Overboard },
        { n: "login", c: Login },
        { n: "register", c: Register },
        { n: "contactUS", c: ContactUS },
        // { n: "checkEmail", c: CheckEmail },
        // { n: "otpScreen", c: OtpScreen },
        // { n: "changePassword", c: ChangePassword },
        // { n: "personalInfo", c: PersonalInfo },
        // { n: "country", c: Country },
        // { n: "forgetPassword", c: ForgetPassword },
      ].map(({ n, c }) => (
        <Screen
          name={n}
          component={c}
          key={n}
          options={{ orientation: "portrait_up" }}
        />
      ))}
    </Navigator>
  );
};

export default AuthNavigation;
