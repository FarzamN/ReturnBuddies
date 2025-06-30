import { useSelector } from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native";
import React from "react";
import { Body, Header, MainButton, MainInput, Text } from "../../../components";
import { wp } from "../../../theme/responsive";
import { useForm } from "react-hook-form";
import { useIskeyboard } from "../../../hooks";
import { Height } from "../../../theme/globalStyle";
import styles from "../userStyle";
import { required } from "../../../utils/constants";
import { editProfileAPI } from "../../../apis/authQueries";

const AddPhoneNumber = ({ navigation }) => {
  const dispatch = useDispatch();
  const { isKeyboard } = useIskeyboard();
  const { user } = useSelector((state) => state.auth);
  const [load, setLoad] = useState(false);
  const onSubmit = (e) => {
    const data = {
      phone: e.phone,
      name: user.name,
    };
    editProfileAPI(data, "addPhone", navigation, setLoad)(dispatch);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });
  return (
    <Body horizontal={wp(5)}>
      <Header leftTitle="Add New phone number" />

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
          placeholder="Phone number"
          message={errors?.phone?.message}
          rules={{
            required: required("Phone Number"),
          }}
        />
      </ScrollView>
      {!isKeyboard && (
        <MainButton title="Verify" onPress={handleSubmit(onSubmit)} />
      )}
    </Body>
  );
};

export default AddPhoneNumber;
