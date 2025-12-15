import {
  Body,
  Text,
  Header,
  MainInput,
  Validation,
  MainButton,
} from "../../components";
import {
  registerAPI,
  appleLoginAPI,
  googleLoginAPI,
} from "../../apis/authQueries";
import AuthOTP from "./AuthOTP";
import styles from "./authStyle";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { wp } from "../../theme/responsive";
import { registerInput } from "../../utils/data";
import React, { useEffect, useState } from "react";
import { Height, Row } from "../../theme/globalStyle";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, TouchableOpacity } from "react-native";
import appleAuth from "@invertase/react-native-apple-authentication";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { iOS, required, minLength, emailPattern } from "../../utils/constants";

const Register = () => {
  const dispatch = useDispatch();
  const { goBack } = useNavigation();

  const [isLoading, setLoading] = useState(false);

  const [showOTP, setShowOTP] = useState(false);
  const [saveEmail, setSaveEmail] = useState("");
  const [error, setError] = useState({
    msg: "",
    visible: false,
  });
  const onSubmit = (value) =>
    registerAPI(value, setShowOTP, setError, setSaveEmail, setLoading);

  // ************ google login *************

  const handleGoodleSignin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const { data } = await GoogleSignin.signIn();
      googleLoginAPI(data.idToken)(dispatch);
    } catch (error) {
      console.error("error", error);
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
  const name = watch("name");
  useEffect(() => {
    setError({
      msg: "",
      visible: false,
    });
  }, [email, password, name]);
  return (
    <>
      <Body horizontal={wp(4)}>
        <Header title="Sign Up" />
        <ScrollView
          keyboardShouldPersistTaps={"always"}
          showsVerticalScrollIndicator={false}
        >
          {registerInput.map(({ name, p, label, error }) => {
            const isPassword = name === "password";
            const isError = errors[name];

            const rules = {
              required: required(error),
              pattern: name === "email" && emailPattern,
              minLength: isPassword && minLength,
            };
            return (
              <MainInput
                rounded
                key={name}
                name={name}
                title={label}
                rules={rules}
                placeholder={p}
                control={control}
                isError={!!isError}
                password={isPassword}
                small={name !== "name"}
                message={isError?.message}
                Container={{ marginTop: wp(5) }}
                keyboardType={!isPassword ? "email-address" : "default"}
              />
            );
          })}
          <Validation isError={error.visible} message={error.msg} />

          <Height />
          <Height />
          <MainButton
            load={isLoading}
            title={"Create Account"}
            onPress={handleSubmit(onSubmit)}
          />

          <Text style={styles.orTextStyle} title={"Or"} />

          <MainButton
            social
            title="Sign up"
            google
            onPress={handleGoodleSignin}
          />
          {iOS && (
            <MainButton
              social
              title="Sign up"
              apple
              onPress={handleAppleSignin}
            />
          )}

          <Row style={{ justifyContent: "center" }}>
            <Text
              style={styles.dontAccountTextStyle}
              title={"Have an account?"}
            />
            <TouchableOpacity activeOpacity={0.7} onPress={goBack}>
              <Text style={styles.dontAccountSignUpTextStyle} title=" Login" />
            </TouchableOpacity>
          </Row>
        </ScrollView>
      </Body>
      <AuthOTP
        visible={showOTP}
        email={saveEmail}
        onClose={() => setShowOTP(false)}
      />
    </>
  );
};

export default Register;
