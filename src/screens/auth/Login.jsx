import { useDispatch } from "react-redux";
import { View, Text } from "react-native";
import React from "react";
import { Body, MainButton } from "../../components";
import { setUser } from "../../redux/slices/authSlice";
import { useSelector } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  const handleSubmit = () => {
    dispatch(setUser("Farzam"));
    console.log("user", user);
  };
  return (
    <Body>
      <Text>Login</Text>
      <MainButton title={"ok"} onPress={handleSubmit} />
    </Body>
  );
};

export default Login;
