import {View, Text, TextInput, ScrollView, StyleSheet} from 'react-native';
import {
  Body,
  Header,
  FullImage,
  MainButton,
  RequiredText,
  CircleCheck,
} from '../../../components';
import {useDispatch, useSelector} from 'react-redux';
import {colors} from '../../../theme/colors';
import {cardValidator} from '../../../function';
import React, {useState, useEffect} from 'react';
import {appImages, fonts} from '../../../assets';
import {useNavigation} from '@react-navigation/native';
import {
  fontScale,
  scaleSize,
  verticalScale,
  wp,
} from '../../../theme/responsive';
import {addPaymentAPI, editPaymentAPI} from '../../../apis/authQueries';
import {
  globalStyle,
  Height,
  Row,
  Space_Between,
} from '../../../theme/globalStyle';

const AddPaymentMethod = ({route}) => {
  const {item, editing} = route?.params || {};

  const dispatch = useDispatch();
  const {goBack} = useNavigation();

  const {getPayments} = useSelector(state => state.auth) ?? [];

  const [cardData, setCardData] = useState({
    name: item?.cardHolderName ?? '',
    number: item?.cardNumber ?? '',
    date: item?.expirationDate ?? '',
    cvv: item?.cvv ?? '',
  });
  const [load, setLoad] = useState(false);
  const [errors, setErrors] = useState({});
  const [focus, setFocus] = useState(item?.isDefault);
  const [cardType, setCardType] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Name validation
    if (!cardData.name.trim()) {
      newErrors.name = 'Cardholder name is required';
      isValid = false;
    }

    // Card number validation
    if (!cardData.number.trim()) {
      newErrors.number = 'Card number is required';
      isValid = false;
    } else if (
      !cardValidator.isValidCardNumber(cardData.number.replace(/\s/g, ''))
    ) {
      newErrors.number = 'Invalid card number';
      isValid = false;
    }

    // Expiry date validation
    if (!cardData.date.trim()) {
      newErrors.date = 'Expiry date is required';
      isValid = false;
    } else {
      const expiryError = validateExpiry(cardData.date);
      if (expiryError !== true) {
        newErrors.date = expiryError;
        isValid = false;
      }
    }

    // CVV validation
    if (!cardData.cvv.trim()) {
      newErrors.cvv = 'CVV is required';
      isValid = false;
    } else if (
      (cardType === 'amex' && cardData.cvv.length !== 4) ||
      (cardType !== 'amex' && cardData.cvv.length !== 3)
    ) {
      newErrors.cvv =
        cardType === 'amex' ? '4 digits required' : '3 digits required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (name, value) => {
    let formattedValue = value;

    if (name === 'number') {
      formattedValue = formatCardNumber(value);
      const type = cardValidator.getCardType(formattedValue);
      setCardType(type);
    } else if (name === 'date') {
      formattedValue = formatExpiryDate(value);
    } else if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '');
    }

    setCardData(prev => ({...prev, [name]: formattedValue}));
  };

  const formatCardNumber = text => {
    const cleaned = text.replace(/\D/g, '');
    const matches = cleaned.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    return parts.length ? parts.join(' ') : cleaned;
  };

  const formatExpiryDate = text => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length >= 3) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }
    return cleaned;
  };

  const validateExpiry = date => {
    if (!date || date.length < 5) return 'Invalid date';
    const [month, year] = date.split('/');
    const now = new Date();
    const currentYear = now.getFullYear() % 100;
    const currentMonth = now.getMonth() + 1;

    if (
      parseInt(month) > 12 ||
      parseInt(month) < 1 ||
      parseInt(year) < currentYear ||
      (parseInt(year) === currentYear && parseInt(month) < currentMonth)
    ) {
      return 'Card expired';
    }
    return true;
  };

  const onSubmit = () => {
    setIsSubmitted(true);
    const valid = validateForm();

    if (!valid) return;

    const cardInfo = {
      cardHolderName: cardData.name,
      cardNumber: cardData.number,
      expirationDate: cardData.date,
      cvv: cardData.cvv,
      cardType: cardType,
      isDefault: getPayments.length === 0 ? 1 : focus ? 1 : 0,
    };

    if (editing) {
      editPaymentAPI(item._id, cardInfo, goBack, setLoad)(dispatch);
      return;
    }

    addPaymentAPI(cardInfo, goBack, setLoad)(dispatch);
  };

  useEffect(() => {
    if (isSubmitted) validateForm();
  }, [cardData]);
  return (
    <Body horizontal={wp(5)}>
      <Header leftTitle={`${editing ? 'Edit' : 'Add'} Payment Method`} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Height />
        {/* Cardholder Name Input */}
        <View style={styles.inputContainer}>
          <RequiredText required title="Card details" />
          <TextInput
            placeholder="Card Name"
            value={cardData.name}
            placeholderTextColor={colors.grey}
            onChangeText={text => handleChange('name', text)}
            style={[styles.input, styles.border]}
          />
          {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
        </View>

        {/* Card Number Input */}
        <Height />
        <Row style={styles.border}>
          <View style={styles.inputContainer}>
            <View
              style={[
                styles.input,
                globalStyle.row,
                errors.number && styles.errorInput,
              ]}>
              <FullImage
                style={{width: 30, height: 20}}
                source={appImages.card}
              />
              <TextInput
                keyboardType="numeric"
                value={cardData.number}
                style={[styles.CardNameInput]}
                placeholder="4242 4242 4242 4242"
                placeholderTextColor={colors.grey}
                maxLength={cardType === 'amex' ? 17 : 19}
                onChangeText={text => handleChange('number', text)}
              />
            </View>
          </View>

          {/* Expiry and CVV */}
          <View style={[styles.inputContainer, {}]}>
            <TextInput
              maxLength={5}
              placeholder="MM/YY"
              value={cardData.date}
              keyboardType="numeric"
              placeholderTextColor={colors.grey}
              onChangeText={text => handleChange('date', text)}
              style={[styles.input]}
            />
          </View>

          <View style={[styles.inputContainer, {}]}>
            <TextInput
              secureTextEntry
              value={cardData.cvv}
              keyboardType="numeric"
              placeholderTextColor={colors.grey}
              maxLength={cardType === 'amex' ? 4 : 3}
              placeholder={cardType === 'amex' ? '1234' : '123'}
              onChangeText={text => handleChange('cvv', text)}
              style={[styles.input]}
            />
          </View>
        </Row>
        {errors.number && <Text style={styles.errorText}>{errors.number}</Text>}
        {errors.date && <Text style={styles.errorText}>{errors.date}</Text>}
        {errors.cvv && <Text style={styles.errorText}>{errors.cvv}</Text>}

        <Height />
        <CircleCheck
          focus={focus}
          title="Set as your default card."
          onPress={() => setFocus(prev => !prev)}
        />
      </ScrollView>

      <MainButton load={load} title="Save Card" onPress={onSubmit} />
    </Body>
  );
};

const styles = StyleSheet.create({
  border: {
    overflow: 'hidden',
    borderWidth: scaleSize(1),
    borderRadius: scaleSize(20),
    borderColor: colors.lightGrey,
  },
  label: {
    color: colors.text,
    fontFamily: fonts[500],
    fontSize: fontScale(13),
    marginBottom: verticalScale(1),
  },
  input: {
    color: colors.black,
    fontFamily: fonts[500],
    fontSize: fontScale(15),
    height: verticalScale(56),
    backgroundColor: colors.white,
    paddingHorizontal: scaleSize(10),
  },
  CardNameInput: {
    marginLeft: 10,
    color: colors.black,
    fontFamily: fonts[500],
    fontSize: fontScale(15),
  },
  errorInput: {
    borderColor: colors.error,
  },
  errorText: {
    marginTop: wp(1),
    color: colors.error,
    fontSize: fontScale(15),
  },

  cardTypeBadge: {
    right: wp(3),
    borderRadius: wp(1),
    position: 'absolute',
    paddingVertical: wp(1),
    paddingHorizontal: wp(2),
    backgroundColor: colors.grey,
  },
  checkBoxText: {
    width: '90%',
    marginLeft: 7,
    top: fontScale(1),
    fontFamily: fonts[400],
    fontSize: fontScale(13),
  },
});

export default AddPaymentMethod;
