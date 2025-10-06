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
import momentTimeZone from "moment-timezone";
import { colors } from "../../../theme/colors";
import { iOS } from "../../../utils/constants";
import { maskCardNumber } from "../../../function";
import React, { useEffect, useState } from "react";
import { Height } from "../../../theme/globalStyle";
import { useDispatch, useSelector } from "react-redux";
import settingStyle from "../SettingFolder/settingStyle";
import { useNavigation } from "@react-navigation/native";
import { scaleSize, wp } from "../../../theme/responsive";
import textStyle from "../../../components/Texts/textStyle";
import { checkPromocode } from "../../../apis/pickupQueries";
import { confirmPickupAPI } from "../../../apis/draftQueries";
import { useFreezeScreen, useIskeyboard } from "../../../hooks";
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

  const [error, setError] = useState({
    address: false,
    phone: false,
    payment: false,
    oversized: false,
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

  console.log(time)
  const finalPayment = selectedPayment?.cardNumber ? selectedPayment : payment;
  const finalAddress = selectedAddress?.street
    ? selectedAddress
    : pickupAddress;
  const onSubmit = () => {
    if (!finalAddress?.street) {
      setError((prev) => ({ ...prev, address: true }));
      return;
    }
    if (!phone) {
      setError((prev) => ({ ...prev, phone: true }));
      return;
    }

    if (!finalPayment?.cardNumber) {
      setError((prev) => ({ ...prev, payment: true }));
      return;
    }
    if (hasOversized && !focus) {
      setError((prev) => ({ ...prev, oversized: true }));
      return;
    }

    const tzDate = momentTimeZone.tz(date, "America/New_York").format();

    const value = {
      note,
      phone,
      pickupDate: tzDate,
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
  useEffect(() => {
    if (phone) setError((prev) => ({ ...prev, phone: false }));
    if (finalPayment?.cardNumber)
      setError((prev) => ({ ...prev, payment: false }));
    if (finalAddress?.street) setError((prev) => ({ ...prev, address: false }));
  }, [phone, finalPayment?.cardNumber, finalAddress?.street]);

  return (
    <Body horizontal={wp(4)}>
      <Header leftTitle="Confirm Pickup" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <PickupButton
          isError={error.address}
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
          isError={error.phone}
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
          value={`$${
            totalItemCount * ADDITIONAL_ITEM_PRICE - FREE_ITEMS_THRESHOLD
          }`}
        />
        <TouchableOpacity
          activeOpacity={0.7}
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
              autoCapitalize="characters"
              placeholder="Enter Promo code"
              style={settingStyle.phoneInput}
              placeholderTextColor="#B0B0B0"
              onChangeText={(value) =>
                setPromoCode((prev) => ({ ...prev, value, invalid: false }))
              }
            />

            <TouchableOpacity
              activeOpacity={0.7}
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
          isError={error.payment}
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
            isError={error.oversized}
            focus={focus}
            title="I acknowledge that a surcharge may apply to items exceeding 35 lbs or measuring 30” in any direction."
            onPress={() => {
              setFocus((pre) => !pre);
              setError({
                address: false,
                phone: false,
                payment: false,
                oversized: false,
              });
            }}
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
