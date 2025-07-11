import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  Login,
  UserOTP,
  Register,
  Support,
  Overboard,
  CheckEmail,
  ForgetPassword,
} from '../screens/auth';

const AuthNavigation = () => {
  const {Navigator, Screen} = createNativeStackNavigator();

  return (
    <Navigator
      initialRouteName="overboard"
      o
      screenOptions={{
        headerShown: false,
        animation: 'ios_from_left',
        orientation: 'portrait_up',
      }}>
      {[
        {n: 'login', c: Login},
        {n: 'otp', c: UserOTP},
        {n: 'register', c: Register},
        {n: 'overboard', c: Overboard},
        {n: 'support', c: Support},
        {n: 'checkEmail', c: CheckEmail},
        {n: 'forgetPassword', c: ForgetPassword},
      ].map(({n, c}) => (
        <Screen
          name={n}
          component={c}
          key={n}
          options={{orientation: 'portrait_up'}}
        />
      ))}
    </Navigator>
  );
};

export default AuthNavigation;
