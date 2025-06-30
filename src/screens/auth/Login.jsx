import {
  required,
  maxLength,
  minLength,
  emailPattern,
} from "../../utils/constants";
import AuthOTP from "./AuthOTP";
import styles from "./authStyle";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { wp } from "../../theme/responsive";
import { loginInput } from "../../utils/data";
import { useFreezeScreen } from "../../hooks";
import React, { useState, useRef } from "react";
import { Height, Row } from "../../theme/globalStyle";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, TouchableOpacity } from "react-native";
import { Body, MainButton, Header, Text, MainInput } from "../../components";
import { loginAPI } from "../../apis/authQueries";

const Login = () => {
  const dispatch = useDispatch();
  const showOTP = useRef(false);
  const { goBack, navigate } = useNavigation();

  const [isPending, setIsPending] = useState(false);
  const { Overlay } = useFreezeScreen(isPending); // Pass isPending to hook

  const openOTP = () => showOTP.current?.show();
  const [saveEmail, setSaveEmail] = useState("");

  const onSubmit = (data) =>
    loginAPI(data, openOTP, setSaveEmail, setIsPending)(dispatch);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });

  return (
    <>
      <Body horizontal={wp(4)}>
        <Header imageLogo />
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
                rounded
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
        </ScrollView>
        <MainButton
          load={isPending}
          title={"Login"}
          onPress={handleSubmit(onSubmit)}
        />
        <Row style={{ justifyContent: "center" }}>
          <Text
            style={styles.dontAccountTextStyle}
            title={"Don't have an account?"}
          />
          <TouchableOpacity onPress={() => navigate("register")}>
            <Text style={styles.dontAccountSignUpTextStyle} title=" Register" />
          </TouchableOpacity>
        </Row>
        <Height />
        <Height />
      </Body>
      <Overlay />
      <AuthOTP ref={showOTP} email={saveEmail} />
    </>
  );
};

export default Login;
