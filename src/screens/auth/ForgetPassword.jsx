import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { wp } from "../../theme/responsive";
import { showNotification } from "../../function";
import { useNavigation } from "@react-navigation/native";
import { Body, Header, MainButton, MainInput } from "../../components";
import { maxLength, minLength, required } from "../../utils/constants";
import { Height } from "../../theme/globalStyle";
import { changepasswordForgetAPI } from "../../apis/authQueries";

const ForgetPassword = ({ route }) => {
  const { email } = route.params;
  const { navigate } = useNavigation();
  const [load, setload] = useState(false);

  const onSubmit = (data) => {
    if (data.password !== data.confirmPassword) {
      showNotification(
        "error",
        "New Password and Confirm Password do not match",
        "Password Error"
      );
      return;
    }

    const e = { password: data.password, email };
    changepasswordForgetAPI(e, setload, navigate);
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });
  return (
    <Body horizontal={wp(5)}>
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
            maxLength,
            required: required(label),
          }}
          placeholder={p}
          control={control}
          isError={errors[name]}
          message={errors[name]?.message}
          Container={{ marginTop: wp(5) }}
        />
      ))}
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
