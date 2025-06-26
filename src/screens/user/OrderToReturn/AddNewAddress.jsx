import {
  Body,
  Text,
  Header,
  MainInput,
  MainButton,
  RequiredText,
} from "../../../components";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { wp } from "../../../theme/responsive";
import { colors } from "../../../theme/colors";
import { required } from "../../../utils/constants";
import Icon from "react-native-dynamic-vector-icons";
import { ScrollView, TouchableOpacity } from "react-native";
import {
  addAddressAPI,
  editAddressAPI,
} from "../../../redux/queries/authQueries";
import { globalStyle, Space_Between } from "../../../theme/globalStyle";
import { useNavigation } from "@react-navigation/native";

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
              name: "postalCode",
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
          onPress={() => setValue("isDefault", isDefault ? 0 : 1)}
        >
          <Icon
            size={20}
            type={isDefault === 1 ? "Ionicons" : "Entypo"}
            color={isDefault === 1 ? colors.purple : colors.grey}
            name={isDefault === 1 ? "checkmark-circle" : "circle"}
          />
          <Text
            title="Set as your default address."
            style={{ marginLeft: 7, width: "90%" }}
          />
        </TouchableOpacity>
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
