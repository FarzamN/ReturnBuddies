import {
  Text,
  Body,
  Header,
  MainInput,
  MainButton,
  RequiredText,
  PickupMethodCard,
} from "../../../components";
import styles from "../userStyle";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ScrollView } from "react-native";
import { useIskeyboard } from "../../../hooks";
import { iOS } from "../../../utils/constants";
import { wp } from "../../../theme/responsive";
import { Height } from "../../../theme/globalStyle";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { setDraftReturn } from "../../../redux/slices/draftSlice";

const PickupMethod = () => {
  const dispatch = useDispatch();
  const { navigate } = useNavigation();
  const { isKeyboard } = useIskeyboard();

  const { pickupMethod } = useSelector((state) => state.draft.draftReturn);
  const [selectPickup, setSelectPickup] = useState(pickupMethod);

  const onSubmit = (data) => {
    const { note } = data;
    dispatch(setDraftReturn({ pickupMethod: selectPickup, note }));
    navigate("confirmPickup");
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });
  return (
    <Body horizontal={wp(4)}>
      <Header leftTitle="Pickup method" />
      {iOS && <Height />}
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
      {!isKeyboard && (
        <MainButton title="Continue" onPress={handleSubmit(onSubmit)} />
      )}
      {iOS && <Height />}
    </Body>
  );
};

export default PickupMethod;
