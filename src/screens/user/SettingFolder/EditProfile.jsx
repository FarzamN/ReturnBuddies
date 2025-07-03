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
  View,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useIskeyboard } from "../../../hooks";
import { colors } from "../../../theme/colors";
import { appImages, fonts } from "../../../assets";
import { required } from "../../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import inputStyles from "../../../components/Inputs/inputStyle";
import { globalStyle, Height } from "../../../theme/globalStyle";
import { fontScale, scaleSize, wp } from "../../../theme/responsive";
import {
  deleteAccountAPI,
  deleteAccountPasswordAPI,
  editProfileAPI,
  phoneVerficationAPI,
} from "../../../apis/authQueries";

const EditProfile = () => {
  const dispatch = useDispatch();
  const { navigate } = useNavigation();
  const { isKeyboard } = useIskeyboard();

  const { user } = useSelector((state) => state.auth);

  const isVerified = user?.phoneVerified;
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
    <Body horizontal={wp(5)}>
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

          <View style={editStyle.phoneWrapper}>
            <TextInput
              value={phoneValue.value}
              onChangeText={(text) =>
                setPhoneValue({ error: false, value: text, message: "" })
              }
              placeholder="+12 345678967"
              keyboardType="phone-pad"
              placeholderTextColor="#B0B0B0"
              style={editStyle.phoneInput}
            />

            <TouchableOpacity
              onPress={onVerify}
              disabled={verifyLoad}
              style={[
                editStyle.verifyButton,
                { backgroundColor: isVerified ? "#E8F8E8" : "#F4E8FF" },
              ]}
            >
              <Text
                color={isVerified ? "#66CE67" : colors.purple}
                style={editStyle.verifyText}
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
          style={{ fontFamily: fonts[500] }}
          title="This is the email associated with your account and cannot be changed."
        />

        <TouchableOpacity
          // onPress={() => navigate("deleteAccount")}
          onPress={() => setShowDelete(true)}
          style={[globalStyle.row, editStyle.deleteButton]}
        >
          <FullImage source={appImages.delete} style={globalStyle.iconImage} />

          <Text
            style={editStyle.deleteText}
            color={colors.error}
            title="Delete Account"
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
        title="Delete account?"
        show={showDelete}
        message={
          "Deleting your account will permanently remove all your information, including return history, any scheduled pickups, and personal details. This action cannot be undone."
        }
        showProgress={deleteLoad}
        onCancelPressed={() => setShowDelete(false)}
        onConfirmPressed={() => deleteAccountAPI(setDeleteLoad)(dispatch)}
      />
    </Body>
  );
};

export default EditProfile;

const editStyle = StyleSheet.create({
  phoneWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#EEEEEE",
    borderRadius: scaleSize(15),
    paddingHorizontal: scaleSize(10),
    paddingVertical: wp(2),
    backgroundColor: colors.white,
  },

  phoneInput: {
    flex: 1,
    top: fontScale(1.5),
    fontSize: fontScale(13),
    color: colors.black,
    fontFamily: fonts[400],
  },

  verifyButton: {
    paddingHorizontal: wp(4),
    paddingVertical: wp(1),
    borderRadius: wp(5),
  },

  verifyText: {
    fontSize: fontScale(12),
    fontFamily: fonts[400],
  },

  deleteButton: {
    alignSelf: "center",
    backgroundColor: "#FDEFF2",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 999, // pill shape
    marginTop: 20,
  },

  deleteInner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  deleteText: {
    top: 1,
    fontFamily: fonts[500],
    fontSize: fontScale(12),
    marginHorizontal: scaleSize(5),
  },
});
