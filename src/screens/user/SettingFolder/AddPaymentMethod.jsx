import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {
  Body,
  Header,
  FullImage,
  MainButton,
  RequiredText,
} from "../../../components";
import { useDispatch } from "react-redux";
import { colors } from "../../../theme/colors";
import { cardValidator } from "../../../function";
import React, { useState, useEffect } from "react";
import { appImages, fonts } from "../../../assets";
import Icon from "react-native-dynamic-vector-icons";
import { useNavigation } from "@react-navigation/native";
import { fontScale, verticalScale, wp } from "../../../theme/responsive";
import { addPaymentAPI, editPaymentAPI } from "../../../apis/authQueries";
import { globalStyle, Height, Space_Between } from "../../../theme/globalStyle";

const AddPaymentMethod = ({ route }) => {
  const { item, editing } = route?.params || {};

  const dispatch = useDispatch();
  const { goBack } = useNavigation();
  const [cardData, setCardData] = useState({
    name: item?.cardHolderName ?? "",
    number: item?.cardNumber ?? "",
    date: item?.expirationDate ?? "",
    cvv: item?.cvv ?? "",
  });
  const [load, setLoad] = useState(false);
  const [errors, setErrors] = useState({});
  const [focus, setFocus] = useState(item?.isDefault);
  const [cardType, setCardType] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Name validation
    if (!cardData.name.trim()) {
      newErrors.name = "Cardholder name is required";
      isValid = false;
    }

    // Card number validation
    if (!cardData.number.trim()) {
      newErrors.number = "Card number is required";
      isValid = false;
    } else if (
      !cardValidator.isValidCardNumber(cardData.number.replace(/\s/g, ""))
    ) {
      newErrors.number = "Invalid card number";
      isValid = false;
    }

    // Expiry date validation
    if (!cardData.date.trim()) {
      newErrors.date = "Expiry date is required";
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
      newErrors.cvv = "CVV is required";
      isValid = false;
    } else if (
      (cardType === "amex" && cardData.cvv.length !== 4) ||
      (cardType !== "amex" && cardData.cvv.length !== 3)
    ) {
      newErrors.cvv =
        cardType === "amex" ? "4 digits required" : "3 digits required";
      isValid = false;
    }

    setErrors(newErrors);
    setIsFormValid(isValid);
  };

  const handleChange = (name, value) => {
    let formattedValue = value;

    if (name === "number") {
      formattedValue = formatCardNumber(value);
      const type = cardValidator.getCardType(formattedValue);
      setCardType(type);
    } else if (name === "date") {
      formattedValue = formatExpiryDate(value);
    } else if (name === "cvv") {
      formattedValue = value.replace(/\D/g, "");
    }

    setCardData((prev) => ({ ...prev, [name]: formattedValue }));
  };

  const formatCardNumber = (text) => {
    const cleaned = text.replace(/\D/g, "");
    const matches = cleaned.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    return parts.length ? parts.join(" ") : cleaned;
  };

  const formatExpiryDate = (text) => {
    const cleaned = text.replace(/\D/g, "");
    if (cleaned.length >= 3) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }
    return cleaned;
  };

  const validateExpiry = (date) => {
    if (!date || date.length < 5) return "Invalid date";
    const [month, year] = date.split("/");
    const now = new Date();
    const currentYear = now.getFullYear() % 100;
    const currentMonth = now.getMonth() + 1;

    if (
      parseInt(month) > 12 ||
      parseInt(month) < 1 ||
      parseInt(year) < currentYear ||
      (parseInt(year) === currentYear && parseInt(month) < currentMonth)
    ) {
      return "Card expired";
    }
    return true;
  };

  const onSubmit = () => {
    setIsSubmitted(true);
    validateForm();

    if (!isFormValid) return;

    const cardInfo = {
      cardHolderName: cardData.name,
      // cardNumber: cardData.number.replace(/\s/g, ""),
      cardNumber: cardData.number,
      expirationDate: cardData.date,
      cvv: cardData.cvv,
      type: cardType,
      isDefault: focus ? 1 : 0,
    };

    if (editing) {
      editPaymentAPI(item._id, cardInfo, goBack, setLoad)(dispatch);
      return;
    }

    addPaymentAPI(cardInfo, goBack, setLoad)(dispatch);
    console.log(cardInfo);
  };

  useEffect(() => {
    if (isSubmitted) validateForm();
  }, [cardData]);
  return (
    <Body horizontal={wp(5)}>
      <Header leftTitle={`${editing ? "Edit" : "Add"} Payment Method`} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Height />
        {/* Cardholder Name Input */}
        <View style={styles.inputContainer}>
          <RequiredText required title="Card details" />
          <TextInput
            placeholder="Card Name"
            value={cardData.name}
            placeholderTextColor={colors.grey}
            onChangeText={(text) => handleChange("name", text)}
            style={[styles.input, errors.name && styles.errorInput]}
          />
          {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
        </View>

        {/* Card Number Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Card Number</Text>
          <View
            style={[
              styles.input,
              globalStyle.row,
              errors.number && styles.errorInput,
            ]}
          >
            <FullImage
              style={{ width: 30, height: 20 }}
              source={appImages.card}
            />
            <TextInput
              value={cardData.number}
              keyboardType="numeric"
              placeholder="4242 4242 4242 4242"
              placeholderTextColor={colors.grey}
              maxLength={cardType === "amex" ? 17 : 19}
              onChangeText={(text) => handleChange("number", text)}
              style={[styles.CardNameInput]}
            />
          </View>
          {errors.number && (
            <Text style={styles.errorText}>{errors.number}</Text>
          )}
        </View>

        {/* Expiry and CVV */}
        <Space_Between>
          <View style={[styles.inputContainer, { width: "48%" }]}>
            <Text style={styles.label}>Expiry Date</Text>
            <TextInput
              maxLength={5}
              placeholder="MM/YY"
              value={cardData.date}
              keyboardType="numeric"
              placeholderTextColor={colors.grey}
              onChangeText={(text) => handleChange("date", text)}
              style={[styles.input, errors.date && styles.errorInput]}
            />
            {errors.date && <Text style={styles.errorText}>{errors.date}</Text>}
          </View>

          <View style={[styles.inputContainer, { width: "48%" }]}>
            <Text style={styles.label}>CVV</Text>
            <TextInput
              secureTextEntry
              value={cardData.cvv}
              keyboardType="numeric"
              placeholderTextColor={colors.grey}
              maxLength={cardType === "amex" ? 4 : 3}
              placeholder={cardType === "amex" ? "1234" : "123"}
              onChangeText={(text) => handleChange("cvv", text)}
              style={[styles.input, errors.cvv && styles.errorInput]}
            />
            {errors.cvv && <Text style={styles.errorText}>{errors.cvv}</Text>}
          </View>
        </Space_Between>
        <TouchableOpacity
          style={globalStyle.row}
          onPress={() => setFocus((prev) => !prev)}
        >
          <Icon
            size={20}
            type={focus ? "Ionicons" : "Entypo"}
            color={focus ? colors.purple : colors.grey}
            name={focus ? "checkmark-circle" : "circle"}
          />
          <Text style={styles.checkBoxText}>Set as your default card.</Text>
        </TouchableOpacity>
      </ScrollView>

      <MainButton load={load} title="Save Card" onPress={onSubmit} />
    </Body>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: wp(4),
  },
  label: {
    fontSize: fontScale(13),
    fontFamily: fonts[500],
    color: colors.text,
    marginBottom: verticalScale(1),
  },
  input: {
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: wp(4),
    padding: wp(3.5),
    fontSize: wp(4),
    color: colors.black,
    backgroundColor: colors.white,
  },
  CardNameInput: {
    fontSize: wp(4),
    color: colors.black,
    marginLeft: 10,
  },
  errorInput: {
    borderColor: colors.error,
  },
  errorText: {
    color: colors.error,
    fontSize: wp(3.2),
    marginTop: wp(1),
  },

  cardTypeBadge: {
    position: "absolute",
    right: wp(3),
    backgroundColor: colors.grey,
    paddingHorizontal: wp(2),
    paddingVertical: wp(1),
    borderRadius: wp(1),
  },
  checkBoxText: {
    top: fontScale(1),
    marginLeft: 7,
    width: "90%",
    fontFamily: fonts[400],
    fontSize: fontScale(13),
  },
});

export default AddPaymentMethod;
