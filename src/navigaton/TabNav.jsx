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
} from '../screens/user';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const TabNav = () => {
  const {Navigator, Screen} = createBottomTabNavigator();
  return (
    <Navigator
      initialRouteName="orderRoute"
      screenOptions={{
        headerShown: false,
        orientation: 'portrait',
        tabBarStyle: {
          display: 'none',
        },
      }}>
      <Screen name="orderRoute" component={AllOrderToReturn} />
      <Stack.Screen name="addDraftRoute" component={AllAddDraft} />
      <Screen name="myPickupsRoute" component={AllMyPickups} />
    </Navigator>
  );
};

export default TabNav;

const Stack = createNativeStackNavigator();

const AllOrderToReturn = () => (
  <Stack.Navigator
    screenOptions={{headerShown: false, orientation: 'portrait_up'}}
    initialRouteName="draftItem">
    <Stack.Screen name="draftItem" component={DraftItem} />
    <Stack.Screen name="uploadLabel" component={UploadLabel} />
    <Stack.Screen name="settingRoute" component={AllSettings} />
    <Stack.Screen name="addDraftRoute" component={AllAddDraft} />
    <Stack.Screen name="notification" component={Notification} />
    <Stack.Screen name="shippingLabel" component={ShippingLabel} />
    <Stack.Screen name="schedulePickup" component={SchedulePickup} />

    <Stack.Screen name="trackPickup" component={TrackPickup} />
    <Stack.Screen name="pickupMethod" component={PickupMethod} />
    <Stack.Screen name="confirmPickup" component={ConfirmPickup} />
    <Stack.Screen name="selectNewAddress" component={SelectNewAddress} />

    <Stack.Screen name="userOTP" component={UserOTP} />
    <Stack.Screen name="addNewAddress" component={AddNewAddress} />
    <Stack.Screen name="addPhoneNumber" component={AddPhoneNumber} />
    <Stack.Screen name="addPaymentMethod" component={AddPaymentMethod} />
    <Stack.Screen name="selectPaymentMethod" component={SelectPaymentMethod} />

    <Stack.Screen name="myPickupsRoute" component={AllMyPickups} />
    <Stack.Screen name="itemsToBePickedup" component={ItemsToBePickedup} />
  </Stack.Navigator>
);

const AllAddDraft = () => (
  <Stack.Navigator
    screenOptions={{headerShown: false, orientation: 'portrait_up'}}
    initialRouteName="addDraftItem">
    <Stack.Screen name="addDraftItem" component={AddDraftItem} />
  </Stack.Navigator>
);

const AllSettings = () => (
  <Stack.Navigator
    screenOptions={{headerShown: false, orientation: 'portrait_up'}}
    initialRouteName="setting">
    <Stack.Screen name="terms" component={Terms} />
    <Stack.Screen name="privacy" component={Privacy} />
    <Stack.Screen name="setting" component={Setting} />
    <Stack.Screen name="support" component={Support} />
    <Stack.Screen name="editProfile" component={EditProfile} />
    <Stack.Screen name="myPickupsRoute" component={AllMyPickups} />
    <Stack.Screen name="notification" component={Notification} />
    <Stack.Screen name="changePassword" component={ChangePassword} />
  </Stack.Navigator>
);

const AllMyPickups = () => (
  <Stack.Navigator
    screenOptions={{headerShown: false, orientation: 'portrait_up'}}
    initialRouteName="myPickups">
    <Stack.Screen name="support" component={Support} />
    <Stack.Screen name="myPickups" component={MyPickups} />
    <Stack.Screen name="pickupDetail" component={PickupDetail} />
    <Stack.Screen name="settingRoute" component={AllSettings} />
  </Stack.Navigator>
);
