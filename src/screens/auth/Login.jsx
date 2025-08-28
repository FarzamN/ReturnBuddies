import {
  Body,
  Text,
  Header,
  MainInput,
  MainButton,
  Validation,
} from "../../components";
import {
  iOS,
  required,
  maxLength,
  minLength,
  emailPattern,
} from "../../utils/constants";
import {
  loginAPI,
  appleLoginAPI,
  googleLoginAPI,
} from "../../apis/authQueries";

import AuthOTP from "./AuthOTP";
import styles from "./authStyle";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { colors } from "../../theme/colors";
import { wp } from "../../theme/responsive";
import { loginInput } from "../../utils/data";
import { useFreezeScreen } from "../../hooks";
import React, { useEffect, useState } from "react";
import { Height, Row } from "../../theme/globalStyle";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, TouchableOpacity } from "react-native";
import appleAuth from "@invertase/react-native-apple-authentication";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

const Login = () => {
  const dispatch = useDispatch();
  const { navigate } = useNavigation();

  const [showOTP, setShowOTP] = useState(false);

  const [isPending, setIsPending] = useState(false);
  const { Overlay } = useFreezeScreen(isPending);

  const [saveEmail, setSaveEmail] = useState("");
  const [error, setError] = useState({
    msg: "",
    visible: false,
  });

  const onSubmit = (data) =>
    loginAPI(data, setShowOTP, setError, setSaveEmail, setIsPending)(dispatch);

  // ************ google login *************

  const handleGoodleSignin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const { data } = await GoogleSignin.signIn();
      googleLoginAPI(data.idToken)(dispatch);
    } catch (error) {
      console.log("error", error);
    }
  };

  // ************ apple login *************

  const handleAppleSignin = async () => {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      const idToken = appleAuthRequestResponse.identityToken;
      appleLoginAPI(idToken)(dispatch);
    } catch (error) {
      console.error("Apple Sign-In Error:", error);
      throw error;
    }
  };

  const {
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });

  const email = watch("email");
  const password = watch("password");
  useEffect(() => {
    setError({
      msg: "",
      visible: false,
    });
  }, [email, password]);
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
          <Validation isError={error.visible} message={error.msg} />
          <Height />
          <TouchableOpacity
            activeOpacity={0.7}
            style={{ alignSelf: "flex-end" }}
            onPress={() => navigate("checkEmail")}
          >
            <Text
              color={colors.purple}
              title="Forgot password?"
              style={styles.forgotTextStyle}
            />
          </TouchableOpacity>

          <Height />
          <Text title={"Or"} style={styles.orTextStyle} />

          <MainButton social google onPress={handleGoodleSignin} />
          {iOS && (
            <MainButton
              social
              apple
              onPress={() =>
                handleAppleSignin().then((user) => console.log(user))
              }
            />
          )}
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
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigate("register")}
          >
            <Text style={styles.dontAccountSignUpTextStyle} title=" Register" />
          </TouchableOpacity>
        </Row>
        {iOS && <Height />}
        <Height />
      </Body>
      <Overlay />
      <AuthOTP
        email={saveEmail}
        visible={showOTP}
        onClose={() => setShowOTP(false)}
      />
    </>
  );
};

export default Login;
