import {
  Body,
  Text,
  Header,
  MainInput,
  MainButton,
  PickupButton,
  ItemPickupButton,
} from "../../../components";
import moment from "moment";
import styles from "../userStyle";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { appImages } from "../../../assets";
import { wp } from "../../../theme/responsive";
import { colors } from "../../../theme/colors";
import { useIskeyboard } from "../../../hooks";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, TouchableOpacity } from "react-native";
import { globalStyle, Height, Space_Between } from "../../../theme/globalStyle";

const ConfirmPickup = () => {
  const { navigate } = useNavigation();
  const { isKeyboard } = useIskeyboard();
  const { draftSelectedRetun } = useSelector((state) => state.draft);
  const { pickupMethod, time, date, selectedAddress, note, selectedPayment } =
    useSelector((state) => state.draft.draftReturn);
  const { address, phone, payment } = useSelector((state) => state.auth.user);

  const [promocode, setPromoCode] = useState({ visible: false });
  const data = {
    _id: ["68495eb05e3292f1838947f4"],
    date: "2025-06-18",
    time: "2:00 PM - 6:00 PM",
    pickupMethod: "Doorstep",
    note: "",
    selectedAddress: {
      street: "53 park view",
      suits: "apt 11e",
      city: "new York",
      state: "NY",
      zip: "10001",
      isDefault: "1",
    },
    selectedPayment: {
      name: "John Doe",
      cardNumber: "5424 2424 2424 1234",
      expiryDate: "12/24",
      cvv: "123",
      isDefault: "1",
    },
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  const totalItemCount = draftSelectedRetun
    .map((item) => item.products.length)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });
  return (
    <Body horizontal={wp(5)}>
      <Header leftTitle="Confirm Pickup" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <PickupButton
          source={appImages.location}
          title={selectedAddress || address || "Add address"}
          onPress={() => navigate("selectNewAddress", { isPickup: true })}
        />
        <PickupButton
          title={pickupMethod}
          source={appImages.truck}
          onPress={() => navigate("pickupMethod")}
          detail={
            pickupMethod === "Doorstep"
              ? "I placed the items on the front porch."
              : "I will directly handoff the items."
          }
        />
        <PickupButton
          detail={time}
          source={appImages.clock}
          title={moment(date).format("dddd, MMM DD, yy")}
          onPress={() => navigate("schedulePickup", { isEdit: true })}
        />
        <PickupButton
          source={appImages.call}
          title={phone || "Add phone number"}
          onPress={() => navigate("addPhoneNumber")}
        />
        <ItemPickupButton
          onPress={() => navigate("itemsToBePickedup")}
          title={`Items to be pickedup (${totalItemCount})`}
        />

        <Space_Between style={globalStyle.mv10}>
          <Text style={styles.promoCode} title="Pickup" />
          <Text title="$ 0.00" style={styles.promoCode} />
        </Space_Between>
        <TouchableOpacity
          onPress={() =>
            setPromoCode((pre) => ({ ...pre, visible: !pre.visible }))
          }
        >
          <Text
            color={colors.purple}
            title="+ Add Promo Code"
            style={styles.promoCode}
          />
        </TouchableOpacity>

        {promocode.visible && (
          <MainInput
            noTitle
            name="code"
            control={control}
            isError={errors?.code}
            placeholder="Enter Promo code"
            message={errors?.code?.message}
          />
        )}
        <Height />
        <Space_Between>
          <Text style={styles.promoCode} title="Total" />
          <Text title="$ 9.99" style={styles.promoCode} />
        </Space_Between>
        <PickupButton
          noEdit
          onPress={() => navigate("selectPaymentMethod", { pickup: true })}
          source={appImages.wallet}
          title={selectedPayment || payment || "Add Payment method"}
        />
      </ScrollView>
      {!isKeyboard && (
        <MainButton title="Confirm pickup" onPress={handleSubmit(onSubmit)} />
      )}
    </Body>
  );
};

export default ConfirmPickup;
