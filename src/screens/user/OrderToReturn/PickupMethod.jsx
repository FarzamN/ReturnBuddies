import { ScrollView } from "react-native";
import React, { useState } from "react";
import {
  Text,
  Body,
  Header,
  PickupMethodCard,
  RequiredText,
  MainButton,
} from "../../../components";
import { wp } from "../../../theme/responsive";
import styles from "../userStyle";
import MainInput from "../../../components/Inputs/MainInput";
import { useForm } from "react-hook-form";
import { Height } from "../../../theme/globalStyle";
import { useDispatch } from "react-redux";
import { setDraftReturn } from "../../../redux/slices/draftSlice";
import { useNavigation } from "@react-navigation/native";

const PickupMethod = () => {
  const dispatch = useDispatch();
  const { navigate } = useNavigation();
  const [selectPickup, setSelectPickup] = useState("Doorstep");

  const onSubmit = (data) => {
    const { note } = data;
    dispatch(setDraftReturn({ pickupMethod: selectPickup, note }));
    navigate("confirmPickup");
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
  });
  return (
    <Body horizontal={wp(4)}>
      <Header leftTitle="Pickup method" noSetting />
      <Text
        style={styles.draftTitle}
        title={"How should we collect your items?"}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        {[
          {
            title: "Doorstep",
            detail:
              "Place your items outside your door before your scheduled pickup time.",
          },
          {
            title: "Direct Handoff",
            detail:
              "Hand your items directly to our driver at your scheduled pickup time.",
          },
        ].map((item) => (
          <PickupMethodCard
            data={item}
            key={item.title}
            onPress={setSelectPickup}
            focus={selectPickup === item.title}
          />
        ))}
        <Height />
        <RequiredText title={"Additional Notes"} />

        <MainInput
          small
          noTitle
          name={"note"}
          control={control}
          isError={!!errors?.note?.detail}
          Container={{ marginTop: 0 }}
          message={errors?.note?.message}
          placeholder="Any notes comments"
        />
      </ScrollView>
      <MainButton title="continue" onPress={handleSubmit(onSubmit)} />
    </Body>
  );
};

export default PickupMethod;
