import React, { useEffect, useState } from "react";
import {
  Body,
  Header,
  MainButton,
  PhoneInput,
  Text,
} from "../../../components";
import { wp } from "../../../theme/responsive";
import styles from "./settingStyle";
import MainInput from "../../../components/Inputs/MainInput";
import { useForm } from "react-hook-form";
import { required } from "../../../utils/constants";
import { ScrollView } from "react-native";
import { Height } from "../../../theme/globalStyle";

const EditProfile = () => {
  const [phoneValue, setPhoneValue] = useState({
    number: "",
    code: "",
    countryAbbreviationCode: "",
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });
  return (
    <Body horizontal={wp(5)}>
      <Header title="Edit Profile" />
      <Text
        style={[styles.contactUStext, { marginVertical: wp(5) }]}
        title={
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        }
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <MainInput
          name={"name"}
          title={"Full Name"}
          rules={{
            required: required("Full Name"),
          }}
          placeholder={"Enter Full Name"}
          control={control}
          isError={errors?.name}
          message={errors?.name?.message}
          Container={{ marginTop: wp(5) }}
        />
        <PhoneInput
          phoneNumber={phoneValue.number}
          countryCode={phoneValue.code ?? "1"}
          countryAbbreviationCode={phoneValue.countryAbbreviationCode || "US"}
          onChangeCountry={(country) => {
            console.log("Country:", country);
            // ... rest of your code
          }}
          setSelectedCode={(code) => {
            console.log("code", code);
            setPhoneValue({ code });
          }}
          setValue={(text) => {
            setPhoneValue({ number: text });
          }}
        />
      </ScrollView>
      <MainButton title="Save Changes" />
      <Height />
    </Body>
  );
};

export default EditProfile;
