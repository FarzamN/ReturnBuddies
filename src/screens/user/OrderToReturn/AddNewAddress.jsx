import { ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import {
  Body,
  Text,
  Header,
  MainInput,
  MainButton,
  RequiredText,
} from "../../../components";
import { wp } from "../../../theme/responsive";
import { useForm } from "react-hook-form";
import { required } from "../../../utils/constants";
import { globalStyle, Row, Space_Between } from "../../../theme/globalStyle";
import Icon from "react-native-dynamic-vector-icons";
import { colors } from "../../../theme/colors";
import styles from "../userStyle";

const AddNewAddress = () => {
  const [focus, setFocus] = useState(false);
  const onSubmit = (data) => {
    console.log(data);
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });
  return (
    <Body horizontal={wp(5)}>
      <Header leftTitle="Add New Address" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <RequiredText title="Address" required />
        {[
          {
            name: "address",
            placeholder: "Street Address",
          },
          {
            name: "apt",
            placeholder: "Apt, suits, unit, etc",
          },
          {
            name: "city",
            placeholder: "City",
          },
        ].map((item) => (
          <MainInput
            key={item.name}
            small
            noTitle
            name={item.name}
            control={control}
            isError={!!errors[item.name]}
            placeholder={item.placeholder}
            message={errors[item.name]?.message}
            rules={{ required: required(item.placeholder) }}
            Container={{
              marginTop: 0,
              marginBottom: 10,
            }}
          />
        ))}
        <Space_Between>
          {[
            {
              name: "state",
              placeholder: "State",
            },
            {
              name: "zipCode",
              placeholder: "Zip Code",
            },
          ].map((item) => (
            <MainInput
              key={item.name}
              small
              noTitle
              name={item.name}
              control={control}
              isError={!!errors[item.name]}
              placeholder={item.placeholder}
              message={errors[item.name]?.message}
              rules={{ required: required(item.placeholder) }}
              Container={{
                marginTop: 0,
                marginBottom: 10,
                width: "48%",
              }}
            />
          ))}
        </Space_Between>
        <TouchableOpacity
          style={globalStyle.row}
          onPress={() => setFocus((prev) => !prev)}
        >
          <Icon
            size={20}
            color={focus ? colors.purple : colors.grey}
            type={focus ? "Ionicons" : "Entypo"}
            name={focus ? "checkmark-circle" : "circle"}
          />
          <Text
            title="Set as your default address."
            style={{ marginLeft: 7, width: "90%" }}
          />
        </TouchableOpacity>
      </ScrollView>
      <MainButton title="Save" onPress={handleSubmit(onSubmit)} />
    </Body>
  );
};

export default AddNewAddress;
