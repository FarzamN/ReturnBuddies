import {
  Body,
  Header,
  MainInput,
  MainButton,
  RequiredText,
  CircleCheck,
} from "../../../components";
import React, { useState } from "react";
import { fonts } from "../../../assets";
import { useForm } from "react-hook-form";
import { ScrollView, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { iOS, required } from "../../../utils/constants";
import { useNavigation } from "@react-navigation/native";
import { fontScale, wp } from "../../../theme/responsive";
import { Height, Space_Between } from "../../../theme/globalStyle";
import { editAddressAPI, addAddressAPI } from "../../../apis/authQueries";

const AddNewAddress = ({ route }) => {
  const { item, editing } = route?.params || {};
  const dispatch = useDispatch();
  const { goBack } = useNavigation();

  const { getAddress } = useSelector((state) => state.auth) ?? [];

  const [isPending, setIsPending] = useState(false);

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

  const onSubmit = (data) => {
    if (editing) {
      editAddressAPI(item._id, data, goBack, setIsPending)(dispatch);
      return;
    }
    const updatedData = {
      ...data,
      isDefault: getAddress.length == 0 ? 1 : isDefault,
    };
    addAddressAPI(updatedData, goBack, setIsPending)(dispatch);
  };
  return (
    <Body horizontal={wp(4)}>
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
      {iOS && <Height />}
    </Body>
  );
};

export default AddNewAddress;

const styles = StyleSheet.create({
  checkBoxText: {
    width: "90%",
    fontSize: 13,
    marginLeft: 7,
    fontFamily: fonts[400],
    top: fontScale(iOS ? 0 : 1),
  },
  inputCont: {
    marginTop: 0,
    width: "48%",
    marginBottom: 10,
  },
});
