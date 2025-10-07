import {
  Body,
  Text,
  Header,
  MainInput,
  FullImage,
  MainButton,
  Validation,
  RequiredText,
  CustomAlert,
} from "../../../components";
import {
  editProfileAPI,
  deleteAccountAPI,
  phoneVerficationAPI,
} from "../../../apis/authQueries";
import settingStyle from "./settingStyle";
import { useForm } from "react-hook-form";
import { appImages } from "../../../assets";
import { colors } from "../../../theme/colors";
import { useIskeyboard } from "../../../hooks";
import { wp } from "../../../theme/responsive";
import React, { useEffect, useState } from "react";
import { required } from "../../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import inputStyles from "../../../components/Inputs/inputStyle";
import { globalStyle, Height } from "../../../theme/globalStyle";
import { View, TextInput, ScrollView, TouchableOpacity } from "react-native";

const EditProfile = () => {
  const dispatch = useDispatch();
  const { navigate, goBack } = useNavigation();
  const { isKeyboard } = useIskeyboard();

  const { user } = useSelector((state) => state.auth);

  const [error, setError] = useState({
    verify: false,
  });
  const [isVerified, setIsVerified] = useState(user?.phoneVerified);
  useEffect(() => {
    setIsVerified(user?.phoneVerified);
  }, [user?.phoneVerified, user]);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteLoad, setDeleteLoad] = useState(false);

  const [verifyLoad, setVerifyLoad] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [phoneValue, setPhoneValue] = useState({
    error: false,
    value: user?.phone,
    message: "",
  });

  const onVerify = () => {
    if (!phoneValue.value) {
      setPhoneValue({
        error: true,
        value: "",
        message: "Phone number is required",
      });
      return;
    }

   const phoneRegex = /^\d{10}$/;
        // const phoneRegex = /^\+\d{1,3}\s?\d{6,}$/;

    if (!phoneRegex.test(phoneValue.value)) {
      setPhoneValue({
        error: true,
        value: phoneValue.value,
        message: "Enter a valid phone number (e.g. 123-456-7890)",
      });
      return;
    }

    // If valid -> continue verification
    const data = { phone: phoneValue.value };
    phoneVerficationAPI(data, navigate, setVerifyLoad)(dispatch);
  };

  const onSubmit = (data) => {
    if (!isVerified) {
      setError({ verify: true });
      return;
    }
    editProfileAPI(data, goBack, setIsPending)(dispatch);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: {
      name: user?.name,
      email: user?.email,
    },
  });
  return (
    <Body horizontal={wp(4)}>
      <Header leftTitle="Profile Settings" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <MainInput
          name={"name"}
          control={control}
          title={"Full Name"}
          isError={errors?.["name"]}
          placeholder={"Full Name"}
          message={errors?.["name"]?.message}
          rules={{ required: required("Name") }}
        />
        <Height />
        <View style={inputStyles.mainInputCont}>
          <RequiredText title="Phone Number" />

          <View style={settingStyle.phoneWrapper}>
            <TextInput
              value={phoneValue.value}
              keyboardType="phone-pad"
              placeholder="123-456-7890"
              style={settingStyle.phoneInput}
              placeholderTextColor="#B0B0B0"
              onChangeText={(text) => {
                setPhoneValue({ error: false, value: text, message: "" });
                setIsVerified(false);
              }}
            />

            <TouchableOpacity
              onPress={onVerify}
              activeOpacity={0.7}
              disabled={verifyLoad || isVerified}
              style={[
                settingStyle.verifyButton,
                {
                  backgroundColor: isVerified
                    ? "#E8F8E8"
                    : error.verify
                    ? "#ED64791A"
                    : "#F4E8FF",
                },
              ]}
            >
              <Text
                color={
                  isVerified
                    ? "#66CE67"
                    : error.verify
                    ? "#ED6479"
                    : colors.purple
                }
                style={settingStyle.verifyText}
                title={
                  verifyLoad ? "loading..." : isVerified ? "Verified" : "Verify"
                }
              />
            </TouchableOpacity>
          </View>
          <Validation isError={phoneValue.error} message={phoneValue.message} />
        </View>

        {/* email input */}
        <Height />
        <RequiredText title="Email" />
        <MainInput
          noTitle
          disabled
          name={"email"}
          control={control}
          Container={{ marginTop: 0 }}
        />
        <Height />

        <Text
          style={settingStyle.settingEmailText}
          title="This is the email associated with your account and cannot be changed."
        />

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setShowDelete(true)}
          style={[globalStyle.row, settingStyle.deleteButton]}
        >
          <FullImage source={appImages.delete} style={globalStyle.iconImage} />

          <Text
            color={colors.error}
            title="Delete Account"
            style={settingStyle.deleteText}
          />
        </TouchableOpacity>
      </ScrollView>
      {!isKeyboard && (
        <MainButton
          title="Save"
          load={isPending}
          onPress={handleSubmit(onSubmit)}
        />
      )}

      <Height />
      <CustomAlert
        isImage
        show={showDelete}
        title="Delete account?"
        showProgress={deleteLoad}
        onCancelPressed={() => setShowDelete(false)}
        onConfirmPressed={() => deleteAccountAPI(setDeleteLoad)(dispatch)}
        message={
          "Deleting your account will permanently remove all your information, including return history, any scheduled pickups, and personal details. This action cannot be undone."
        }
      />
    </Body>
  );
};

export default EditProfile;
