import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Body, Header, MainButton, Text } from "../../../components";
import { wp } from "../../../theme/responsive";
import { Height, Row } from "../../../theme/globalStyle";
import Icon from "react-native-dynamic-vector-icons";
import { colors } from "../../../theme/colors";
import { required } from "../../../utils/constants";
import MainInput from "../../../components/Inputs/MainInput";
import { useForm } from "react-hook-form";
import styles from "./settingStyle";
import { ScrollView } from "react-native";
import { deleteAccountPasswordAPI } from "../../../redux/queries/authQueries";

const DeleteAccount = () => {
  const { navigate } = useNavigation();
  const [isPending, setIsPending] = useState(false);

  const onSubmit = (data) =>
    deleteAccountPasswordAPI(data, setIsPending, navigate);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });
  return (
    <Body horizontal={wp(5)}>
      <Header title="Delete Account" noSetting />
      <Height />
      <Row>
        <Icon name="warning" type="Ionicons" size={23} color={colors.error} />
        <Text
          style={{ color: colors.error, marginLeft: 5 }}
          title={"Delete your account will:"}
        />
      </Row>
      <Height />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text
          title={
            "We're sorry to see you go. If you're sure you want to delete your Returnbuddies Mobile App account, please be aware that this action is permanent and cannot be undone. All of your personal information, including your information and settings, will be permanently deleted."
          }
        />
        <Height />

        <Text
          title={
            "If you're having trouble with your account or have concerns, please reach out to us at [contact email or support page] before proceeding with the account deletion. We'd love to help you resolve any issues and keep you as a valued Returnbuddies Mobile App user."
          }
        />

        <MainInput
          rounded
          password
          control={control}
          name={"password"}
          title={"Password"}
          isError={errors?.password}
          placeholder={"Password"}
          message={errors?.password?.message}
          Container={{ marginTop: wp(5) }}
          rules={{ required: required("Password") }}
        />
        <Height />

        <Text
          style={styles.contactUStext}
          title={
            "To delete your account, please enter your password in the field below and confirm your decision by clicking the 'Delete My Account' button."
          }
        />
      </ScrollView>
      <MainButton
        load={isPending}
        title="Delete Account"
        onPress={handleSubmit(onSubmit)}
      />
      <Height />
    </Body>
  );
};

export default DeleteAccount;
