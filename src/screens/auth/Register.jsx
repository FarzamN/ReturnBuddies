import {
  required,
  maxLength,
  minLength,
  emailPattern,
} from "../../utils/constants";
import AuthOTP from "./AuthOTP";
import styles from "./authStyle";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { wp } from "../../theme/responsive";
import { registerInput } from "../../utils/data";
import { Height, Row } from "../../theme/globalStyle";
import { useNavigation } from "@react-navigation/native";
import MainInput from "../../components/Inputs/MainInput";
import { ScrollView, TouchableOpacity } from "react-native";
import { Body, MainButton, Header, Text } from "../../components";
import { registerAPI } from "../../redux/queries/authQueries";

const Register = () => {
  const showOTP = useRef(false);
  const dispatch = useDispatch();
  const { goBack } = useNavigation();

  const [isLoading, setLoading] = useState(false);

  const openOTP = () => showOTP.current?.show();
  const [saveEmail, setSaveEmail] = useState("");
  const onSubmit = (value) => {
    registerAPI(value, openOTP, setSaveEmail, setLoading);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });
  return (
    <>
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
                // defaultValue={def}
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
      </Body>
      <AuthOTP ref={showOTP} email={saveEmail} />
    </>
  );
};

export default Register;
