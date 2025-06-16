import React from "react";
import {
  DraftItem,
  AddDraftItem,
  Setting,
  Notification,
  EditProfile,
  ContactUS,
  ChangePassword,
  DeleteAccount,
  DeleteOTP,
  ReturnHistory,
  FAQ,
  Terms,
  Privacy,
  ShippingLabel,
  UploadLabel,
  MyPickups,
} from "../screens/user";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const TabNav = () => {
  const { Navigator, Screen } = createBottomTabNavigator();
  return (
    <Navigator
      initialRouteName="orderRoute"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          display: "none",
        },
      }}
    >
      <Screen name="orderRoute" component={AllOrderToReturn} />
      <Stack.Screen name="addDraftRoute" component={AllAddDraft} />
      <Screen name="myPickupsRoute" component={MyPickups} />
    </Navigator>
  );
};

export default TabNav;

const Stack = createNativeStackNavigator();

const AllOrderToReturn = () => (
  <Stack.Navigator
    screenOptions={{ headerShown: false }}
    initialRouteName="draftItem"
  >
    <Stack.Screen name="draftItem" component={DraftItem} />
    <Stack.Screen name="addDraftRoute" component={AllAddDraft} />
    <Stack.Screen name="notification" component={Notification} />
    <Stack.Screen name="settingRoute" component={AllSettings} />
    <Stack.Screen name="shippingLabel" component={ShippingLabel} />
    <Stack.Screen name="uploadLabel" component={UploadLabel} />
  </Stack.Navigator>
);

const AllAddDraft = () => (
  <Stack.Navigator
    screenOptions={{ headerShown: false }}
    initialRouteName="addDraftItem"
  >
    <Stack.Screen name="addDraftItem" component={AddDraftItem} />
  </Stack.Navigator>
);

const AllSettings = () => (
  <Stack.Navigator
    screenOptions={{ headerShown: false }}
    initialRouteName="setting"
  >
    <Stack.Screen name="setting" component={Setting} />
    <Stack.Screen name="editProfile" component={EditProfile} />
    <Stack.Screen name="contactUS" component={ContactUS} />
    <Stack.Screen name="changePassword" component={ChangePassword} />
    <Stack.Screen name="deleteAccount" component={DeleteAccount} />
    <Stack.Screen name="deleteOTP" component={DeleteOTP} />
    <Stack.Screen name="returnHistory" component={ReturnHistory} />
    <Stack.Screen name="faq" component={FAQ} />
    <Stack.Screen name="terms" component={Terms} />
    <Stack.Screen name="privacy" component={Privacy} />
  </Stack.Navigator>
);

const AllMyPickups = () => (
  <Stack.Navigator
    screenOptions={{ headerShown: false }}
    initialRouteName="myPickups"
  >
    <Stack.Screen name="myPickups" component={MyPickups} />
  </Stack.Navigator>
);
