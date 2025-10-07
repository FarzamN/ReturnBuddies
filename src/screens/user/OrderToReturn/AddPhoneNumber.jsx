import React from "react";
import { useState } from "react";
import styles from "../userStyle";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { ScrollView } from "react-native";
import { useForm } from "react-hook-form";
import { wp } from "../../../theme/responsive";
import { Height } from "../../../theme/globalStyle";
import { required } from "../../../utils/constants";
import { addPhoneNumberAPI } from "../../../apis/authQueries";
import { Body, Header, MainButton, MainInput, Text } from "../../../components";

const AddPhoneNumber = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [load, setLoad] = useState(false);
  const onSubmit = (e) => {
    const data = {
      phone: e.phone,
      name: user.name,
    };
    addPhoneNumberAPI(data, "addPhone", navigation, setLoad)(dispatch);
  };

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
