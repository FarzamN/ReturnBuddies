import {
  iOS,
  required,
  maxLength,
  minLength,
  emailPattern,
} from "../../utils/constants";
import AuthOTP from "./AuthOTP";
import styles from "./authStyle";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { colors } from "../../theme/colors";
import { wp } from "../../theme/responsive";
import { loginInput } from "../../utils/data";
import { useFreezeScreen } from "../../hooks";
import React, { useState, useRef } from "react";
import { Height, Row } from "../../theme/globalStyle";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, TouchableOpacity } from "react-native";
import { googleLoginAPI, loginAPI } from "../../apis/authQueries";
import appleAuth from "@invertase/react-native-apple-authentication";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { Body, MainButton, Header, Text, MainInput } from "../../components";

const Login = () => {
  const dispatch = useDispatch();
  const { navigate } = useNavigation();

  const showOTP = useRef(false);
  const openOTP = () => showOTP.current?.show();

  const [isPending, setIsPending] = useState(false);
  const { Overlay } = useFreezeScreen(isPending);

  const [saveEmail, setSaveEmail] = useState("");

  const onSubmit = (data) =>
    loginAPI(data, openOTP, setSaveEmail, setIsPending)(dispatch);

  // ************ google login *************

  const handleGoodleSignin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const {
        data: { idToken },
      } = await GoogleSignin.signIn();
      googleLoginAPI(idToken)(dispatch);
    } catch (error) {
      console.log("error", error);
    }
  };

  // ************ apple login *************

  const handleAppleSignin = async () => {
    try {
      // Perform login request
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      // Get current authentication state
      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user
      );

      // Check if credential is valid
      if (credentialState === appleAuth.AUTHORIZED) {
        return appleAuthRequestResponse;
      }
    } catch (error) {
      console.error("Apple Sign-In Error:", error);
      throw error;
    }
  };
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

          {loginInput.map(({ name, p, label, keyboard }) => {
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
                bold
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
                keyboardType={keyboard}
                message={isError?.message}
                Container={{ marginTop: wp(5) }}
              />
            );
          })}

          <Height />
          <TouchableOpacity onPress={() => navigate("checkEmail")}>
            <Text
              color={colors.purple}
              title={"Forgot password?"}
              style={styles.forgotTextStyle}
            />
          </TouchableOpacity>
          <Text title={"Or"} style={styles.orTextStyle} />

          <MainButton social google onPress={handleGoodleSignin} />
          {/* {appleAuthAndroid.isSupported && ( */}
          <MainButton
            social
            apple
            onPress={() =>
              handleAppleSignin().then((user) => console.log(user))
            }
          />
          {/* )} */}
        </ScrollView>
        <MainButton
          title={"Login"}
          load={isPending}
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
        {iOS && <Height />}
        <Height />
      </Body>
      <Overlay />
      <AuthOTP ref={showOTP} email={saveEmail} />
    </>
  );
};

export default Login;
