import {
  Body,
  Text,
  Header,
  SpaceText,
  MainButton,
  CircleCheck,
  PickupButton,
  ItemPickupButton,
} from "../../../components";

import moment from "moment";
import { appImages } from "../../../assets";
import { scaleSize, wp } from "../../../theme/responsive";
import { colors } from "../../../theme/colors";
import { iOS } from "../../../utils/constants";
import { Height } from "../../../theme/globalStyle";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import settingStyle from "../SettingFolder/settingStyle";
import { useNavigation } from "@react-navigation/native";
import textStyle from "../../../components/Texts/textStyle";
import { checkPromocode } from "../../../apis/pickupQueries";
import { confirmPickupAPI } from "../../../apis/draftQueries";
import { useFreezeScreen, useIskeyboard } from "../../../hooks";
import { maskCardNumber, showNotification } from "../../../function";
import { ScrollView, TextInput, TouchableOpacity, View } from "react-native";

const ConfirmPickup = () => {
  const dispatch = useDispatch();
  const { navigate } = useNavigation();
  const { isKeyboard } = useIskeyboard();

  const { draftSelectedRetun, getBaseData } = useSelector(
    (state) => state.draft
  );
  const { BASE_PRICE, FREE_ITEMS_THRESHOLD, ADDITIONAL_ITEM_PRICE } =
    getBaseData;
  const { pickupMethod, time, date, selectedAddress, note, selectedPayment } =
    useSelector((state) => state.draft.draftReturn);

  const { pickupAddress, phone, payment } = useSelector(
    (state) => state.auth.user
  );

  const [load, setLoad] = useState(false);
  const { Overlay } = useFreezeScreen(load);
  const [focus, setFocus] = useState(false);

  const [totalPrice, setTotalPrice] = useState(0);

  const [promocode, setPromoCode] = useState({
    value: "",
    visible: false,
    discount: 0,
    load: false,
    applied: false,
    invalid: false,
  });

  // const totalItemCount = 20;
  const totalItemCount = draftSelectedRetun
    .map((item) => item.products.length)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  const hasOversized = draftSelectedRetun.some((bundle) =>
    bundle.products.some((product) => product.oversized === true)
  );

  const calculateTotalPrice = () => {
    if (totalItemCount <= FREE_ITEMS_THRESHOLD) {
      return BASE_PRICE - (promocode.discount / 100) * BASE_PRICE;
    } else {
      const additionalItems = totalItemCount - FREE_ITEMS_THRESHOLD;
      return (
        BASE_PRICE +
        additionalItems * ADDITIONAL_ITEM_PRICE -
        (promocode.discount / 100) * BASE_PRICE
      );
    }
  };

  useEffect(() => {
    setTotalPrice(calculateTotalPrice());
  }, [totalItemCount, promocode.discount]);

  const onSubmit = () => {
    if (!phone) {
      showNotification("error", "Error", "Please set your phone number");
      return;
    }

    const finalPayment = selectedPayment?.cardNumber
      ? selectedPayment
      : payment;
    const finalAddress = selectedAddress?.street
      ? selectedAddress
      : pickupAddress;

    if (!finalPayment?.cardNumber) {
      showNotification("error", "Error", "Please set your Payment method");
      return;
    }

    if (!finalAddress?.street) {
      showNotification("error", "Error", "Please set your Pickup Address");
      return;
    }

    const value = {
      note,
      phone,
      pickupDate: date,
      pickupTime: time,
      total: totalPrice,
      pickupType: pickupMethod,
      Payment: finalPayment._id,
      isOversize: focus ? 1 : 0,
      pickupAddress: finalAddress._id,
      bundleId: draftSelectedRetun.map((item) => item._id),
    };
    confirmPickupAPI(value, navigate, setLoad)(dispatch);
  };

  return (
    <Body horizontal={wp(4)}>
      <Header leftTitle="Confirm Pickup" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <PickupButton
          source={appImages.location}
          title={
            selectedAddress?.street || pickupAddress?.street || "Add address"
          }
          twoTitle={selectedAddress?.suite || pickupAddress?.suite}
          onPress={() => navigate("selectNewAddress", { isPickup: true })}
        />
        <PickupButton
          detail={note}
          title={pickupMethod}
          source={appImages.truck}
          onPress={() => navigate("pickupMethod")}
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
          title={`Items to be picked up (${totalItemCount})`}
        />

        <Height />

        <SpaceText title="Pickup" value={`$${BASE_PRICE}`} />
        <Height />

        <SpaceText
          visible={totalItemCount < 11}
          title={`Extra item${totalItemCount > 11 ? "s" : ""}`}
          value={totalItemCount * ADDITIONAL_ITEM_PRICE - FREE_ITEMS_THRESHOLD}
        />
        <TouchableOpacity
          onPress={() =>
            setPromoCode((pre) => ({ ...pre, visible: !pre.visible }))
          }
        >
          <Text
            color={colors.purple}
            title="+ Add a Promo Code"
            style={textStyle.promoCode}
          />
        </TouchableOpacity>

        {promocode.visible && (
          <View
            style={[settingStyle.phoneWrapper, { marginTop: scaleSize(10) }]}
          >
            <TextInput
              value={promocode.value}
              onChangeText={(value) =>
                setPromoCode((prev) => ({ ...prev, value, invalid: false }))
              }
              placeholder="Enter Promo code"
              placeholderTextColor="#B0B0B0"
              style={settingStyle.phoneInput}
              autoCapitalize="characters"
            />

            <TouchableOpacity
              onPress={() =>
                checkPromocode(promocode.value.trim(), setPromoCode)
              }
              disabled={
                promocode.load || promocode.applied || !promocode.value.trim()
              }
              style={[
                settingStyle.verifyButton,
                {
                  backgroundColor: promocode.applied
                    ? "#E8F8E8"
                    : promocode.invalid
                    ? "#ED64791A"
                    : "#F4E8FF",
                },
              ]}
            >
              <Text
                color={
                  promocode.applied
                    ? "#66CE67"
                    : promocode.invalid
                    ? "#ED6479"
                    : colors.purple
                }
                style={settingStyle.verifyText}
                title={
                  promocode.load
                    ? "Loading..."
                    : promocode.applied
                    ? "Applied"
                    : promocode.invalid
                    ? "Invalid"
                    : "Apply"
                }
              />
            </TouchableOpacity>
          </View>
        )}

        {promocode.discount !== 0 && <Height />}
        <SpaceText
          title="Discount"
          load={promocode.load}
          visible={promocode.discount === 0}
          value={`$${(promocode.discount / 100) * BASE_PRICE}`}
        />
        <Height />
        <SpaceText
          title="Total"
          load={promocode.load}
          value={`$${totalPrice}`}
        />

        <PickupButton
          isPayment={selectedPayment?.cardNumber || payment?.cardNumber}
          source={appImages.wallet}
          title={`${
            selectedPayment?.cardNumber
              ? selectedPayment?.cardType +
                " " +
                maskCardNumber(selectedPayment?.cardNumber)
              : payment?.cardNumber
              ? payment?.cardType + " " + maskCardNumber(payment?.cardNumber)
              : "Add payment method"
          }`}
          onPress={() => navigate("selectPaymentMethod", { isPickup: true })}
        />
        <Height />
        {hasOversized && (
          <CircleCheck
            focus={focus}
            title="I acknowledge that a surcharge may apply to items exceeding 35 lbs or measuring 30” in any direction."
            onPress={() => setFocus((pre) => !pre)}
          />
        )}
        <Height />
        <Overlay />
      </ScrollView>
      {!isKeyboard && (
        <MainButton title="Confirm pickup" onPress={onSubmit} load={load} />
      )}
      {iOS && <Height />}
    </Body>
  );
};

export default ConfirmPickup;
