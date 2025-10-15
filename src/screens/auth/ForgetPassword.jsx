import {
  Body,
  Header,
  MainInput,
  Validation,
  MainButton,
} from "../../components";
import { useForm } from "react-hook-form";
import { wp } from "../../theme/responsive";
import { Height } from "../../theme/globalStyle";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { minLength, required } from "../../utils/constants";
import { changepasswordForgetAPI } from "../../apis/authQueries";

const ForgetPassword = ({ route }) => {
  const { email } = route.params;
  const { navigate } = useNavigation();
  const [load, setload] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = (data) => {
    if (data.password !== data.confirmPassword) {
      setError("New Password and Confirm Password do not match");
      return;
    }

    const e = { password: data.password, email };
    changepasswordForgetAPI(e, setError, setload, navigate);
  };
  const {
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });
  const password = watch("password");
  const c_passowrd = watch("confirmPassword");
  useEffect(() => {
    setError("");
  }, [password, c_passowrd]);

  return (
    <Body horizontal={wp(4)}>
      <Header leftTitle="Forgot password" />
      {[
        {
          label: "Password",
          p: "Enter your new password",
          name: "password",
        },
        {
          label: "Confirm Password",
          p: "Re-enter password",
          name: "confirmPassword",
        },
      ].map(({ name, p, label }) => (
        <MainInput
          small
          rounded
          password
          key={name}
          name={name}
          title={label}
          rules={{
            minLength,
            required: required(label),
          }}
          placeholder={p}
          control={control}
          isError={errors[name]}
          message={errors[name]?.message}
          Container={{ marginTop: wp(5) }}
        />
      ))}
      <Validation isError={error} message={error} />
      <Height />
      <MainButton
        load={load}
        title="Update password"
        onPress={handleSubmit(onSubmit)}
      />
    </Body>
  );
};

export default ForgetPassword;
