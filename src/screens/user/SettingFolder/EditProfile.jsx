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
import { View, TextInput, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import settingStyle from "./settingStyle";
import { colors } from "../../../theme/colors";
import { useIskeyboard } from "../../../hooks";
import { wp } from "../../../theme/responsive";
import { appImages, fonts } from "../../../assets";
import { required } from "../../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import inputStyles from "../../../components/Inputs/inputStyle";
import { globalStyle, Height } from "../../../theme/globalStyle";
import {
  editProfileAPI,
  deleteAccountAPI,
  phoneVerficationAPI,
} from "../../../apis/authQueries";
import { showNotification } from "../../../function";

const EditProfile = () => {
  const dispatch = useDispatch();
  const { navigate } = useNavigation();
  const { isKeyboard } = useIskeyboard();

  const { user } = useSelector((state) => state.auth);

  const [isVerified, setIsVerified] = useState(user?.phoneVerified);
  useEffect(() => {
    setIsVerified(user?.phoneVerified);
  }, [user?.phoneVerified]);
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
    if (phoneValue.value) {
      const data = { phone: phoneValue.value };
      phoneVerficationAPI(data, navigate, setVerifyLoad)(dispatch);
    } else {
      setPhoneValue({ error: true, message: "Phone number is required" });
    }
  };
  const onSubmit = (data) => {
    if (!isVerified) {
      showNotification("error", "please Verify Phone number", "Error");
      return;
    }
    editProfileAPI(data, setIsPending)(dispatch);
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
              placeholder="+12 345678967"
              style={settingStyle.phoneInput}
              placeholderTextColor="#B0B0B0"
              onChangeText={(text) => {
                setPhoneValue({ error: false, value: text, message: "" });
                setIsVerified(false);
              }}
            />

            <TouchableOpacity
              onPress={onVerify}
              disabled={verifyLoad || isVerified}
              style={[
                settingStyle.verifyButton,
                { backgroundColor: isVerified ? "#E8F8E8" : "#F4E8FF" },
              ]}
            >
              <Text
                color={isVerified ? "#66CE67" : colors.purple}
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
          disabled
          name={"email"}
          control={control}
          noTitle
          Container={{ marginTop: 0 }}
        />
        <Height />

        <Text
          style={settingStyle.settingEmailText}
          title="This is the email associated with your account and cannot be changed."
        />

        <TouchableOpacity
          // onPress={() => navigate("deleteAccount")}
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
