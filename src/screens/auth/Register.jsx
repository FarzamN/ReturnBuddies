import {
  required,
  maxLength,
  minLength,
  emailPattern,
} from "../../utils/constants";
import AuthOTP from "./AuthOTP";
import styles from "./authStyle";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { wp } from "../../theme/responsive";
import { registerInput } from "../../utils/data";
import { Height, Row } from "../../theme/globalStyle";
import { useNavigation } from "@react-navigation/native";
import MainInput from "../../components/Inputs/MainInput";
import { ScrollView, TouchableOpacity } from "react-native";
import { Body, MainButton, Header, Text } from "../../components";
import { checkingAPIdata, registerAPI } from "../../redux/queries/authQueries";

const Register = () => {
  const dispatch = useDispatch();
  const { goBack, navigate } = useNavigation();

  const [isLoading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState({ visible: false });

  const onSubmit = (value) => {
    registerAPI(value, navigate, setShowOTP, setLoading);
  };

  useEffect(() => {
    checkingAPIdata()(dispatch);
  }, []);

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
        <MainButton
          load={isLoading}
          title={"Create Account"}
          onPress={handleSubmit(onSubmit)}
        />

        <Text style={styles.orTextStyle} title={"Or"} />

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
