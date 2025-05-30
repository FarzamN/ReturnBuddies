import { useDispatch } from "react-redux";
import { ScrollView, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Body, MainButton, Header, Text } from "../../components";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { wp } from "../../theme/responsive";
import styles from "./authStyle";
import MainInput from "../../components/Inputs/MainInput";
import {
  emailPattern,
  maxLength,
  minLength,
  required,
} from "../../utils/constants";
import { loginInput } from "../../utils/data";
import { useForm } from "react-hook-form";
import { Height, Row } from "../../theme/globalStyle";
import { setLogin } from "../../redux/slices/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const { goBack, navigate } = useNavigation();
  const { user, token } = useSelector((state) => state.auth);

  const [isPending, setIsPending] = useState(false);

  const onSubmit = (data) => {
    // loginApi(data, navigate, setIsPending)(dispatch);
    dispatch(setLogin({ user: data }));
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });
  return (
    <Body horizontal={wp(4)}>
      <Header flag imageLogo />

      <ScrollView
        keyboardShouldPersistTaps={"always"}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.mainTitle} title="Welcome back" />

        {loginInput.map(({ name, p, label }) => {
          const isPassword = name === "password";
          const isError = errors[isPassword ? "password" : "email"];
          const rules = isPassword
            ? {
                minLength,
                maxLength,
                required: required("Password"),
              }
            : {
                required: required("Email"),
                pattern: emailPattern,
              };
          return (
            <MainInput
              small
              key={name}
              name={name}
              title={label}
              rules={rules}
              placeholder={p}
              control={control}
              isError={!!isError}
              password={isPassword}
              message={isError?.message}
              Container={{ marginTop: wp(5) }}
              keyboardType={!isPassword ? "email-address" : "default"}
            />
          );
        })}

        <Height />
        <Text title={"Or"} style={styles.orTextStyle} />

        {/* <View style={[globalStyle.ph20]}> */}
        <MainButton social google onPress={handleSubmit} />
        <MainButton social apple onPress={handleSubmit} />

        {/* </View> */}
      </ScrollView>
      <MainButton title={"Login"} onPress={handleSubmit(onSubmit)} />
      <Row style={{ justifyContent: "center" }}>
        <Text
          style={styles.dontAccountTextStyle}
          title={"Don’t have an account?"}
        />
        <TouchableOpacity onPress={() => navigate("register")}>
          <Text style={styles.dontAccountSignUpTextStyle} title=" Register" />
        </TouchableOpacity>
      </Row>
      <Height />
      <Height />
    </Body>
  );
};

export default Login;
