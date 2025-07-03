import {
  Body,
  Text,
  Header,
  MainInput,
  MainButton,
  RequiredText,
  CircleCheck,
} from "../../../components";
import React, { useState } from "react";
import { fonts } from "../../../assets";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { colors } from "../../../theme/colors";
import { required } from "../../../utils/constants";
import Icon from "react-native-dynamic-vector-icons";
import { useNavigation } from "@react-navigation/native";
import { fontScale, wp } from "../../../theme/responsive";
import { ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { globalStyle, Height, Space_Between } from "../../../theme/globalStyle";
import { editAddressAPI, addAddressAPI } from "../../../apis/authQueries";

const AddNewAddress = ({ route }) => {
  const { item, editing } = route?.params || {};
  const dispatch = useDispatch();
  const { goBack } = useNavigation();
  const [isPending, setIsPending] = useState(false);
  const onSubmit = (data) => {
    if (editing) {
      editAddressAPI(item._id, data, goBack, setIsPending)(dispatch);
      return;
    }
    addAddressAPI(data, goBack, setIsPending)(dispatch);
  };

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: {
      street: item?.street ?? "",
      suite: item?.suite ?? "",
      city: item?.city ?? "",
      state: item?.state ?? "",
      postalCode: item?.postalCode ?? "",
      isDefault: item?.isDefault ?? 0, // direct bind
    },
  });
  const isDefault = watch("isDefault");
  return (
    <Body horizontal={wp(5)}>
      <Header leftTitle={`${editing ? "Edit" : "Add New"} Address`} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <RequiredText title="Address" required />
        {[
          {
            name: "street",
            placeholder: "Street Address",
          },
          {
            name: "suite",
            placeholder: "Apt, suits, unit, etc",
            required: false,
          },
          {
            name: "city",
            placeholder: "City",
          },
        ].map((item) => (
          <MainInput
            small
            noTitle
            key={item.name}
            name={item.name}
            control={control}
            isError={!!errors[item.name]}
            placeholder={item.placeholder}
            message={errors[item.name]?.message}
            rules={
              item.name !== "suite" && { required: required(item.placeholder) }
            }
            Container={{ marginTop: 0, marginBottom: 10 }}
          />
        ))}
        <Space_Between>
          {[
            {
              name: "state",
              placeholder: "State",
            },
            {
              name: "postalCode",
              placeholder: "Zip Code",
            },
          ].map((item) => (
            <MainInput
              small
              noTitle
              key={item.name}
              name={item.name}
              control={control}
              isError={!!errors[item.name]}
              placeholder={item.placeholder}
              keyboardType={
                item.name === "postalCode" ? "number-pad" : "default"
              }
              message={errors[item.name]?.message}
              rules={{ required: required(item.placeholder) }}
              Container={styles.inputCont}
            />
          ))}
        </Space_Between>
        <Height />
        <CircleCheck
          focus={isDefault === 1}
          title="Set as your default address."
          onPress={() => setValue("isDefault", isDefault ? 0 : 1)}
        />
      </ScrollView>
      <MainButton
        title="Save"
        load={isPending}
        onPress={handleSubmit(onSubmit)}
      />
    </Body>
  );
};

export default AddNewAddress;

const styles = StyleSheet.create({
  checkBoxText: {
    top: fontScale(1),
    marginLeft: 7,
    width: "90%",
    fontFamily: fonts[400],
    fontSize: fontScale(13),
  },
  inputCont: {
    marginTop: 0,
    marginBottom: 10,
    width: "48%",
  },
});
