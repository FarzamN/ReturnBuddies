import {
  Body,
  Text,
  Header,
  MainInput,
  MainButton,
  CircleCheck,
  PickupButton,
  ItemPickupButton,
} from '../../../components';
import moment from 'moment';
import styles from '../userStyle';
import {useForm} from 'react-hook-form';
import {appImages} from '../../../assets';
import {wp} from '../../../theme/responsive';
import {colors} from '../../../theme/colors';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {ScrollView, TouchableOpacity} from 'react-native';
import {confirmPickupAPI} from '../../../apis/draftQueries';
import {useFreezeScreen, useIskeyboard} from '../../../hooks';
import {maskCardNumber, showNotification} from '../../../function';
import {globalStyle, Height, Space_Between} from '../../../theme/globalStyle';
import {checkPromocode} from '../../../apis/pickupQueries';

const ConfirmPickup = () => {
  const dispatch = useDispatch();
  const {navigate} = useNavigation();
  const {isKeyboard} = useIskeyboard();

  const {draftSelectedRetun, getBaseData} = useSelector(state => state.draft);
  const {pickupMethod, time, date, selectedAddress, note, selectedPayment} =
    useSelector(state => state.draft.draftReturn);

  const {pickupAddress, phone, payment} = useSelector(state => state.auth.user);

  const [focus, setFocus] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [load, setLoad] = useState(false);
  const [promoCodeLoad, setPromoCodeLoad] = useState(false);

  const {Overlay} = useFreezeScreen(load || promoCodeLoad); // Pass isPending to hook

  const [promocode, setPromoCode] = useState({
    visible: false,
    discount: 0,
    load: false,
  });

  const totalItemCount = draftSelectedRetun
    .map(item => item.products.length)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  const hasOversized = draftSelectedRetun.some(bundle =>
    bundle.products.some(product => product.oversized === true),
  );

  const {BASE_PRICE, FREE_ITEMS_THRESHOLD, ADDITIONAL_ITEM_PRICE} = getBaseData;

  const calculateTotalPrice = () => {
    if (totalItemCount <= FREE_ITEMS_THRESHOLD) {
      return BASE_PRICE - promocode.discount / 100;
    } else {
      const additionalItems = totalItemCount - FREE_ITEMS_THRESHOLD;
      return (
        BASE_PRICE +
        additionalItems * ADDITIONAL_ITEM_PRICE -
        promocode.discount / 100
      );
    }
  };

  useEffect(() => {
    setTotalPrice(calculateTotalPrice());
  }, [totalItemCount, promocode.discount]);

  const onSubmit = () => {
    if (!phone) {
      showNotification('error', 'Error', 'Please set your phone number');
      return;
    }

    const finalPayment = selectedPayment?.cardNumber
      ? selectedPayment
      : payment;
    const finalAddress = selectedAddress?.street
      ? selectedAddress
      : pickupAddress;

    if (!finalPayment?.cardNumber) {
      showNotification('error', 'Error', 'Please set your Payment method');
      return;
    }

    if (!finalAddress?.street) {
      showNotification('error', 'Error', 'Please set your Pickup Address');
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
      bundleId: draftSelectedRetun.map(item => item._id),
    };
    confirmPickupAPI(value, navigate, setLoad)(dispatch);
  };

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({mode: 'all'});
  return (
    <Body horizontal={wp(5)}>
      <Header leftTitle="Confirm Pickup" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <PickupButton
          source={appImages.location}
          title={
            selectedAddress?.street || pickupAddress?.street || 'Add address'
          }
          twoTitle={selectedAddress?.suite}
          onPress={() => navigate('selectNewAddress', {isPickup: true})}
        />
        <PickupButton
          detail={note}
          title={pickupMethod}
          source={appImages.truck}
          onPress={() => navigate('pickupMethod')}
        />
        <PickupButton
          detail={time}
          source={appImages.clock}
          title={moment(date).format('dddd, MMM DD, yy')}
          onPress={() => navigate('schedulePickup', {isEdit: true})}
        />
        <PickupButton
          source={appImages.call}
          title={phone || 'Add phone number'}
          onPress={() => navigate('addPhoneNumber')}
        />
        <ItemPickupButton
          onPress={() => navigate('itemsToBePickedup')}
          title={`Items to be picked up (${totalItemCount})`}
        />

        <Space_Between style={globalStyle.mv10}>
          <Text style={styles.promoCode} title="Pickup" />
          <Text title={`$${BASE_PRICE}`} style={styles.promoCode} />
        </Space_Between>
        <TouchableOpacity
          onPress={() =>
            setPromoCode(pre => ({...pre, visible: !pre.visible}))
          }>
          <Text
            color={colors.purple}
            title="+ Add a Promo Code"
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
            onSubmit={handleSubmit(data =>
              checkPromocode(data.code, setPromoCode, setPromoCodeLoad),
            )}
          />
        )}
        <Height />
        <Space_Between>
          <Text
            style={styles.promoCode}
            title={promocode.load ? 'Wait...' : 'Total'}
          />
          <Text title={`$${totalPrice}`} style={styles.promoCode} />
        </Space_Between>
        <PickupButton
          isPayment={selectedPayment?.cardNumber || payment?.cardNumber}
          source={appImages.wallet}
          title={`${
            selectedPayment?.cardNumber
              ? maskCardNumber(selectedPayment?.cardNumber)
              : payment?.cardNumber
              ? maskCardNumber(payment?.cardNumber)
              : 'Add payment method'
          }`}
          onPress={() => navigate('selectPaymentMethod', {isPickup: true})}
        />
        <Height />
        {hasOversized && (
          <CircleCheck
            focus={focus}
            title="I acknowledge that a surcharge may apply to items exceeding 35 lbs or measuring 30” in any direction."
            onPress={() => setFocus(pre => !pre)}
          />
        )}
        <Height />
        <Overlay />
      </ScrollView>
      {!isKeyboard && (
        <MainButton title="Confirm pickup" onPress={onSubmit} load={load} />
      )}
    </Body>
  );
};

export default ConfirmPickup;
