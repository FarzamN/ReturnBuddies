import React from "react";
import { useState } from "react";
import styles from "./settingStyle";
import { useForm } from "react-hook-form";
import { ScrollView } from "react-native";
import { wp } from "../../../theme/responsive";
import { Height } from "../../../theme/globalStyle";
import { showNotification } from "../../../function";
import { useNavigation } from "@react-navigation/native";
import { changePasswordInput } from "../../../utils/data";
import { changePasswordAPI } from "../../../apis/authQueries";
import { maxLength, minLength, required } from "../../../utils/constants";
import { Body, Header, MainButton, Text, MainInput } from "../../../components";

const ChangePassword = () => {
  const { goBack } = useNavigation();
  const [isPending, setIsPending] = useState(false);

  const onSubmit = (data) => {
    if (data.newPassword !== data.confirmPassword) {
      showNotification(
        "New Password and Confirm Password do not match",
        "Password Error"
      );
      return;
    }
    changePasswordAPI(data, setIsPending, goBack);
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });
  return (
    <Body horizontal={wp(4)}>
      <Header title="Change Password" />
      <Text
        style={[styles.contactUStext, { marginVertical: wp(5) }]}
        title={
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        }
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        {changePasswordInput.map(({ name, p, label }) => (
          <MainInput
            small
            // rounded
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
      </ScrollView>
      <MainButton
        load={isPending}
        title="Save Changes"
        onPress={handleSubmit(onSubmit)}
      />
      <Height />
    </Body>
  );
};

export default ChangePassword;
