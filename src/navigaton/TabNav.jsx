import {
  Terms,
  Setting,
  Privacy,
  Support,
  UserOTP,
  MyPickups,
  DraftItem,
  UploadLabel,
  EditProfile,
  TrackPickup,
  PickupDetail,
  PickupMethod,
  AddDraftItem,
  Notification,
  ConfirmPickup,
  ShippingLabel,
  AddNewAddress,
  ChangePassword,
  SchedulePickup,
  AddPhoneNumber,
  AddPaymentMethod,
  SelectNewAddress,
  ItemsToBePickedup,
  SelectPaymentMethod,
} from "../screens/user";
import React from "react";
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
      <Screen name="addDraftRoute" component={AllAddDraft} />
      <Screen name="myPickupsRoute" component={AllMyPickups} />
    </Navigator>
  );
};

export default TabNav;

const { Navigator, Screen } = createNativeStackNavigator();

const AllOrderToReturn = () => (
  <Navigator
    screenOptions={{
      animation: "none",
      headerShown: false,
      orientation: "portrait_up",
    }}
    initialRouteName="draftItem"
  >
    <Screen name="draftItem" component={DraftItem} />
    <Screen name="uploadLabel" component={UploadLabel} />
    <Screen name="settingRoute" component={AllSettings} />
    <Screen name="addDraftRoute" component={AllAddDraft} />
    <Screen name="notification" component={Notification} />
    <Screen name="shippingLabel" component={ShippingLabel} />
    <Screen name="schedulePickup" component={SchedulePickup} />

    <Screen name="trackPickup" component={TrackPickup} />
    <Screen name="pickupMethod" component={PickupMethod} />
    <Screen name="confirmPickup" component={ConfirmPickup} />
    <Screen name="selectNewAddress" component={SelectNewAddress} />

    <Screen name="userOTP" component={UserOTP} />
    <Screen name="addNewAddress" component={AddNewAddress} />
    <Screen name="addPhoneNumber" component={AddPhoneNumber} />
    <Screen name="addPaymentMethod" component={AddPaymentMethod} />
    <Screen name="selectPaymentMethod" component={SelectPaymentMethod} />

    <Screen name="myPickupsRoute" component={AllMyPickups} />
    <Screen name="itemsToBePickedup" component={ItemsToBePickedup} />
  </Navigator>
);

const AllAddDraft = () => (
  <Navigator
    screenOptions={{
      animation: "none",
      headerShown: false,
      orientation: "portrait_up",
    }}
    initialRouteName="addDraftItem"
  >
    <Screen name="addDraftItem" component={AddDraftItem} />
  </Navigator>
);

const AllSettings = () => (
  <Navigator
    screenOptions={{
      headerShown: false,
      orientation: "portrait_up",
    }}
    initialRouteName="setting"
  >
    <Screen name="terms" component={Terms} />
    <Screen name="privacy" component={Privacy} />
    <Screen name="setting" component={Setting} />
    <Screen name="support" component={Support} />
    <Screen name="editProfile" component={EditProfile} />
    <Screen name="myPickupsRoute" component={AllMyPickups} />
    <Screen name="notification" component={Notification} />
    <Screen name="changePassword" component={ChangePassword} />
  </Navigator>
);

const AllMyPickups = () => (
  <Navigator
    screenOptions={{
      animation: "none",
      headerShown: false,
      orientation: "portrait_up",
    }}
    initialRouteName="myPickups"
  >
    <Screen name="support" component={Support} />
    <Screen name="myPickups" component={MyPickups} />
    <Screen name="pickupDetail" component={PickupDetail} />
    <Screen name="settingRoute" component={AllSettings} />
  </Navigator>
);
