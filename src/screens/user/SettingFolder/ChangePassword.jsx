import { ScrollView } from "react-native";
import React from "react";
import { Body, Header, MainButton, Text } from "../../../components";
import { wp } from "../../../theme/responsive";
import styles from "./settingStyle";
import { maxLength, minLength, required } from "../../../utils/constants";
import { changePasswordInput } from "../../../utils/data";
import { useForm } from "react-hook-form";
import MainInput from "../../../components/Inputs/MainInput";
import { Height } from "../../../theme/globalStyle";

const ChangePassword = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });
  return (
    <Body horizontal={wp(5)}>
      <Header title="Change Password" />
      <Text
        style={[styles.contactUStext, { marginVertical: wp(5) }]}
        title={
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        }
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        {changePasswordInput.map(({ name, p, label }) => {
          const isError = errors[name];
          return (
            <MainInput
              small
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
              isError={!!isError}
              password
              message={isError?.message}
              Container={{ marginTop: wp(5) }}
            />
          );
        })}
      </ScrollView>
      <MainButton title="Save Changes" />
      <Height />
    </Body>
  );
};

export default ChangePassword;
