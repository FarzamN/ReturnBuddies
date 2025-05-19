import styles from "./authStyle";
import {
  required,
  maxLength,
  minLength,
  emailPattern,
} from "../../utils/constants";
import AuthOTP from "./AuthOTP";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { wp } from "../../theme/responsive";
import { registerInput } from "../../utils/data";
import { Height, Row } from "../../theme/globalStyle";
import { useNavigation } from "@react-navigation/native";
import MainInput from "../../components/Inputs/MainInput";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { Body, MainButton, Header, Text } from "../../components";

const Register = () => {
  const dispatch = useDispatch();
  const { goBack, navigate } = useNavigation();
  const { user, token } = useSelector((state) => state.auth);

  const [isPending, setIsPending] = useState(false);
  const [showOTP, setShowOTP] = useState({ visible: false });

  const onSubmit = (data) => {
    console.log(data);
    setShowOTP({ visible: true });
    // loginApi(data, navigate, setIsPending)(dispatch);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });
  return (
    <Body horizontal={wp(4)}>
      <Header flag title="Sign Up" />

      <ScrollView
        keyboardShouldPersistTaps={"always"}
        showsVerticalScrollIndicator={false}
      >
        {/* Input here */}
        {registerInput.map(({ name, p, label, def }) => {
          const isPassword = name === "password";
          const isError = errors[name];

          const rules = {
            required: required(name),
            pattern: name === "email" && emailPattern,
            minLength: isPassword && minLength,
            maxLength: isPassword && maxLength,
          };
          return (
            <MainInput
              small
              key={name}
              defaultValue={def}
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
        <Height />
        <MainButton title={"Create Account"} onPress={handleSubmit(onSubmit)} />

        <Text style={styles.orTextStyle} title={"Or"} />

        {/* <View style={[globalStyle.ph20]}> */}
        <MainButton social google />
        <MainButton social apple />
        <Row style={{ justifyContent: "center" }}>
          <Text
            style={styles.dontAccountTextStyle}
            title={"Have an account?"}
          />
          <TouchableOpacity onPress={goBack}>
            <Text style={styles.dontAccountSignUpTextStyle} title=" Login" />
          </TouchableOpacity>
        </Row>
      </ScrollView>
      <AuthOTP
        visible={showOTP.visible}
        onDismiss={() => setShowOTP({ visible: false })}
      />
    </Body>
  );
};

export default Register;
