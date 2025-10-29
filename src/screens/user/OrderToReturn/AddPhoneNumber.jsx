import React from "react";
import { useState } from "react";
import styles from "../userStyle";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { useForm } from "react-hook-form";
import { wp } from "../../../theme/responsive";
import { globalStyle, Height } from "../../../theme/globalStyle";
import { required } from "../../../utils/constants";
import { addPhoneNumberAPI } from "../../../apis/authQueries";
import {
  Body,
  CircleCheck,
  Header,
  MainButton,
  MainInput,
  Text,
  Validation,
} from "../../../components";
import { phoneRegex } from "../../../utils/urls";

const AddPhoneNumber = ({ navigation }) => {
  const dispatch = useDispatch();
  const { navigate } = navigation;
  const { user } = useSelector((state) => state.auth);
  const [load, setLoad] = useState(false);
  const [phoneValue, setPhoneValue] = useState({
    error: false,
    message: "",
  });

  const onSubmit = (e) => {
    setPhoneValue({
      error: false,
      message: "",
    });
    if (!confirm.value) {
      setConfirm((prev) => ({ ...prev, error: true }));
      return;
    }
    if (!phoneRegex.test(e.phone)) {
      setPhoneValue({
        error: true,
        message: "Enter a valid phone number (e.g. 123-456-7890)",
      });
      return;
    }
    const data = {
      phone: e.phone,
      name: user.name,
    };
    addPhoneNumberAPI(
      data,
      "addPhone",
      navigation,
      setLoad,
      setPhoneValue
    )(dispatch);
  };

  const [confirm, setConfirm] = useState({
    error: false,
    value: false,
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });
  return (
    <Body horizontal={wp(4)}>
      <Header leftTitle="Phone number" />

      <Text style={styles.draftTitle} title="Verify your phone number" />
      <Text
        style={styles.draftSub}
        title="We'll send a one-time verification code to your phone number."
      />
      <Height />
      <ScrollView showsVerticalScrollIndicator={false}>
        <MainInput
          noTitle
          name="phone"
          control={control}
          isError={errors?.phone}
          keyboardType="number-pad"
          placeholder="123-456-7890"
          message={errors?.phone?.message}
          rules={{
            required: required("Phone Number"),
          }}
        />
        <Validation isError={phoneValue.error} message={phoneValue.message} />

        <Height />
        <View style={{ paddingRight: wp(3) }}>
          <CircleCheck
            isError={confirm.error}
            focus={confirm.value}
            title="I agree to receive one-time security codes from the ReturnBuddies App. Message frequency varies and is based solely on your account activity. Message and data rates may apply. Reply STOP to cancel. Reply HELP for assistance."
            onPress={() =>
              setConfirm((prev) => ({ value: !prev.value, error: false }))
            }
          />
        </View>
        <Height />

        <TouchableOpacity
          onPress={() => navigate("privacy", { type: "privacy" })}
        >
          <Text
            style={[
              globalStyle.a,
              {
                marginLeft: 28,
              },
            ]}
            title="Privacy Policy"
          />
        </TouchableOpacity>

        <Height />
        <MainButton
          load={load}
          title="Verify"
          onPress={handleSubmit(onSubmit)}
        />
      </ScrollView>
    </Body>
  );
};

export default AddPhoneNumber;
