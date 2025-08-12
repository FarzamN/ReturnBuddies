import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import userStyle from "../user/userStyle";
import { wp } from "../../theme/responsive";
import { Height } from "../../theme/globalStyle";
import { required } from "../../utils/constants";
import { useNavigation } from "@react-navigation/native";
import { checkEmailToForgetPasswordAPI } from "../../apis/authQueries";
import {
  Body,
  Header,
  MainButton,
  MainInput,
  Text,
  Validation,
} from "../../components";

const CheckEmail = () => {
  const { navigate } = useNavigation();
  const [load, setLoad] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = (e) =>
    checkEmailToForgetPasswordAPI(e, setError, navigate, setLoad);
  const {
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });
  const email = watch("email");

  useEffect(() => {
    setError("");
  }, [email]);

  return (
    <Body horizontal={wp(4)}>
      <Header leftTitle="Forgot password" />
      <Height />
      <Text
        style={[userStyle.draftTitle, { fontSize: 16 }]}
        title="Let’s get you back in"
      />
      <Text
        style={userStyle.draftSub}
        title="Enter your email address and we’ll send you a one-time verification code to reset your password."
      />
      <Height />
      <MainInput
        noTitle
        small
        name="email"
        control={control}
        isError={errors?.email}
        placeholder="Enter email address"
        message={errors?.email?.message}
        rules={{
          required: required("Email"),
        }}
      />
      <Validation isError={error} message={error} />
      <Height />

      <MainButton
        load={load}
        title="Continue"
        onPress={handleSubmit(onSubmit)}
      />
    </Body>
  );
};

export default CheckEmail;
