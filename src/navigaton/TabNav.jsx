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
  ReturnHistory,
  FAQ,
  Terms,
  Privacy,
  ShippingLabel,
  UploadLabel,
  MyPickups,
  SchedulePickup,
  PickupMethod,
  ConfirmPickup,
  TrackPickup,
  AddNewAddress,
  AddPhoneNumber,
  UserOTP,
  SelectPaymentMethod,
  AddPaymentMethod,
  SelectNewAddress,
  ItemsToBePickedup,
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
        orientation: "portrait",
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
    screenOptions={{ headerShown: false, orientation: "portrait_up" }}
    initialRouteName="draftItem"
  >
    <Stack.Screen name="draftItem" component={DraftItem} />
    <Stack.Screen name="addDraftRoute" component={AllAddDraft} />
    <Stack.Screen name="notification" component={Notification} />
    <Stack.Screen name="settingRoute" component={AllSettings} />
    <Stack.Screen name="shippingLabel" component={ShippingLabel} />
    <Stack.Screen name="schedulePickup" component={SchedulePickup} />
    <Stack.Screen name="uploadLabel" component={UploadLabel} />

    <Stack.Screen name="confirmPickup" component={ConfirmPickup} />
    <Stack.Screen name="trackPickup" component={TrackPickup} />
    <Stack.Screen name="pickupMethod" component={PickupMethod} />
    <Stack.Screen name="selectNewAddress" component={SelectNewAddress} />

    <Stack.Screen name="addPhoneNumber" component={AddPhoneNumber} />
    <Stack.Screen name="userOTP" component={UserOTP} />
    <Stack.Screen name="selectPaymentMethod" component={SelectPaymentMethod} />
    <Stack.Screen name="addPaymentMethod" component={AddPaymentMethod} />
    <Stack.Screen name="addNewAddress" component={AddNewAddress} />

    <Stack.Screen name="itemsToBePickedup" component={ItemsToBePickedup} />
  </Stack.Navigator>
);

const AllAddDraft = () => (
  <Stack.Navigator
    screenOptions={{ headerShown: false, orientation: "portrait_up" }}
    initialRouteName="addDraftItem"
  >
    <Stack.Screen name="addDraftItem" component={AddDraftItem} />
  </Stack.Navigator>
);

const AllSettings = () => (
  <Stack.Navigator
    screenOptions={{ headerShown: false, orientation: "portrait_up" }}
    initialRouteName="setting"
  >
    <Stack.Screen name="setting" component={Setting} />
    <Stack.Screen name="editProfile" component={EditProfile} />
    <Stack.Screen name="contactUS" component={ContactUS} />
    <Stack.Screen name="changePassword" component={ChangePassword} />
    <Stack.Screen name="deleteAccount" component={DeleteAccount} />
    <Stack.Screen name="returnHistory" component={ReturnHistory} />
    <Stack.Screen name="faq" component={FAQ} />
    <Stack.Screen name="terms" component={Terms} />
    <Stack.Screen name="privacy" component={Privacy} />
  </Stack.Navigator>
);

const AllMyPickups = () => (
  <Stack.Navigator
    screenOptions={{ headerShown: false, orientation: "portrait_up" }}
    initialRouteName="myPickups"
  >
    <Stack.Screen name="myPickups" component={MyPickups} />
  </Stack.Navigator>
);
