import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import {
  Body,
  Header,
  MainButton,
  CircleCheck,
  RequiredText,
} from "../../../components";
import { fonts } from "../../../assets";
import React, { useState } from "react";
import { colors } from "../../../theme/colors";
import { iOS } from "../../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { addPaymentAPI } from "../../../apis/authQueries";
import { globalStyle, Height } from "../../../theme/globalStyle";
import { useStripe, CardField } from "@stripe/stripe-react-native";
import { wp, scaleSize, verticalScale } from "../../../theme/responsive";

const AddPaymentMethod = ({ route }) => {
  const { item, editing } = route?.params || {};
  const dispatch = useDispatch();
  const { goBack } = useNavigation();
  const { createPaymentMethod } = useStripe();

  const { getPayments, user } = useSelector((state) => state.auth) ?? [];

  const [cardHolderName, setCardHolderName] = useState(
    item?.cardHolderName ?? ""
  );
  const [isDefault, setIsDefault] = useState(item?.isDefault || false);
  const [cardDetails, setCardDetails] = useState({});
  const [error, setError] = useState("");
  const [load, setLoad] = useState(false);

  const onSubmit = async () => {
    setError("");

    if (!cardHolderName.trim()) {
      setError("Cardholder name is required.");
      return;
    }

    if (!cardDetails?.complete) {
      setError("Please complete your card details.");
      return;
    }

    try {
      setLoad(true);
      const { paymentMethod, error: stripeError } = await createPaymentMethod({
        paymentMethodType: "Card",
        paymentMethodData: {
          billingDetails: { name: cardHolderName },
        },
      });
      if (stripeError) {
        setError(stripeError.message);
        setLoad(false);
        return;
      }

      const cardInfo = {
        cardHolderName,
        stripePaymentMethodId: paymentMethod.id,
        brand: paymentMethod.Card.brand,
        last4: paymentMethod.Card.last4,
        exp_month: paymentMethod.Card.expMonth,
        exp_year: paymentMethod.Card.expYear,
        isDefault: getPayments.length === 0 ? 1 : isDefault ? 1 : 0,
        name: user.name,
        email: user.email,
      };
      addPaymentAPI(cardInfo, goBack, setLoad)(dispatch);
    } catch (err) {
      console.error("Error creating payment method:", err);
      setError("Something went wrong while adding the card.");
      setLoad(false);
    }
  };

  return (
    <Body horizontal={wp(4)}>
      <Header leftTitle={`${editing ? "Edit" : "Add"} payment card`} />
      <KeyboardAvoidingView
        style={globalStyle.flex}
        behavior={iOS ? "padding" : "height"}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <Height />

          {/* Cardholder Name */}
          <View style={styles.inputContainer}>
            <RequiredText required title="Cardholder Name" />
            <TextInput
              value={cardHolderName}
              placeholder="John Doe"
              placeholderTextColor={colors.grey}
              style={[styles.input, styles.border]}
              onChangeText={setCardHolderName}
            />
          </View>

          <Height />

          {/* Stripe Card Field */}
          <View style={styles.inputContainer}>
            <RequiredText required title="Card details" />
            <CardField
              postalCodeEnabled={false}
              placeholders={{
                number: "0000 0000 0000 0000",
              }}
              cardStyle={styles.cardStyle}
              style={[styles.cardField, styles.border]}
              onCardChange={(card) => setCardDetails(card)}
            />
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <Height />

          <CircleCheck
            focus={isDefault}
            title="Set as your default card."
            onPress={() => setIsDefault((prev) => !prev)}
          />

          <Height size={50} />
        </ScrollView>

        <MainButton title="Save" onPress={onSubmit} load={load} />
        {iOS && <Height />}
      </KeyboardAvoidingView>
    </Body>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: verticalScale(10),
  },
  input: {
    height: 56,
    fontSize: 15,
    color: colors.black,
    fontFamily: fonts[500],
    paddingHorizontal: 10,
  },
  cardStyle: {
    backgroundColor: "#fff",
    textColor: "#000",
    placeholderColor: colors.grey,
    fontSize: 15,
  },
  border: {
    borderWidth: scaleSize(1),
    borderRadius: scaleSize(15),
    borderColor: colors.lightGrey,
    backgroundColor: colors.white,
  },
  cardField: {
    height: 50,
    overflow: "hidden",
  },
  errorText: {
    color: colors.error,
    fontSize: 15,
    marginTop: wp(2),
  },
});

export default AddPaymentMethod;
