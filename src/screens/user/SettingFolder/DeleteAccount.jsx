import { useNavigation } from "@react-navigation/native";
import React from "react";
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

const DeleteAccount = () => {
  const { navigate } = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });
  return (
    <Body horizontal={wp(5)}>
      <Header title="Delete Account" />
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
          password
          control={control}
          name={"password"}
          title={"Password"}
          isError={errors?.name}
          placeholder={"Password"}
          message={errors?.name?.message}
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
        title="Delete Account"
        onPress={() => navigate("deleteOTP")}
      />
      <Height />
    </Body>
  );
};

export default DeleteAccount;
