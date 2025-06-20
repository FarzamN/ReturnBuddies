import { useDispatch, useSelector } from "react-redux";
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
import { editProfile } from "../../../utils/data";
import { editProfileAPI } from "../../../redux/queries/authQueries";
import { useNavigation } from "@react-navigation/native";

const EditProfile = () => {
  const dispatch = useDispatch();
  const { goBack } = useNavigation();
  const { user } = useSelector((state) => state.auth);
  const [isPending, setIsPending] = useState(false);
  const onSubmit = (data) => {
    editProfileAPI(data, setIsPending, goBack)(dispatch);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: {
      name: user?.name,
      phone: user?.phone,
    },
  });
  return (
    <Body horizontal={wp(5)}>
      <Header title="Edit Profile" noSetting />
      <Text
        style={[styles.contactUStext, { marginVertical: wp(5) }]}
        title={
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        }
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        {editProfile.map((item) => (
          <MainInput
            rounded
            key={item.name}
            name={item.name}
            control={control}
            title={item.title}
            rules={{
              required: required(item.rules),
            }}
            isError={errors?.[item.name]}
            placeholder={item.placeholder}
            Container={{ marginTop: wp(5) }}
            message={errors?.[item.name]?.message}
            keyboardType={item.keyboardType}
          />
        ))}
      </ScrollView>
      <MainButton
        title="Save Changes"
        load={isPending}
        onPress={handleSubmit(onSubmit)}
      />
      <Height />
    </Body>
  );
};

export default EditProfile;
