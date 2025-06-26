import React from "react";
import { FullImage } from "..";
import { appImages } from "../../assets";
import { colors } from "../../theme/colors";
import { globalStyle, Row, Space_Between } from "../../theme/globalStyle";
import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import Icon from "react-native-dynamic-vector-icons";

const PaymentCard = ({ data, onPress, focus, disabled, onEdit }) => {
  const getCardType = (cardNumber) => {
    if (!cardNumber) return null;
    const firstDigit = cardNumber[0];
    if (firstDigit === "3") return "amex";
    if (firstDigit === "4") return "visa";
    if (firstDigit === "5") return "mastercard";
    return "unknown";
  };

  const maskCardNumber = (cardNumber) => {
    if (!cardNumber) return "•••• •••• •••• ••••";
    const lastFour = cardNumber.slice(-4);
    return `•••• ${lastFour}`;
  };

  const cardType = getCardType(data?.cardNumber);

  const CARD_TYPES = {
    mastercard: {
      image: appImages.master,
      displayName: "MASTER",
    },
    amex: {
      image: appImages.amex,
      displayName: "AMEX",
    },
    visa: {
      image: appImages.visa,
      displayName: "VISA",
    },
    default: {
      image: appImages.card,
      displayName: "UNKNOWN",
    },
  };

  const getCardInfo = (cardType) => {
    return CARD_TYPES[cardType] || CARD_TYPES.default;
  };

  return (
    <TouchableOpacity
      disabled={disabled}
      style={[
        styles.cardContainer,
        {
          borderColor: focus ? colors.purple : colors.borderColor,
        },
      ]}
      onPress={onPress}
    >
      <Space_Between style={styles.cardContent}>
        <Row style={styles.cardInfo}>
          <FullImage
            source={getCardInfo(cardType).image}
            style={styles.cardLogo}
          />
          <View style={styles.cardDetails}>
            <Text style={styles.cardTypeText}>
              {`${getCardInfo(cardType).displayName} ${maskCardNumber(
                data?.cardNumber
              )}`}
            </Text>
            <Text style={styles.expiryText}>
              Expires {data?.expirationDate}
            </Text>
          </View>
        </Row>

        {data?.isDefault === 1 && (
          <View style={styles.defaultBadge}>
            <Text style={styles.defaultText}>Default</Text>
          </View>
        )}
        <TouchableOpacity onPress={onEdit} style={globalStyle.ml10}>
          <Icon name="edit" type="AntDesign" size={20} color={colors.black} />
        </TouchableOpacity>
      </Space_Between>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
  },

  cardContent: {
    alignItems: "center",
  },
  cardInfo: {
    flex: 1,
  },
  cardLogo: {
    width: 40,
    height: 25,
    marginRight: 16,
  },
  cardDetails: {
    flex: 1,
  },
  cardTypeText: {
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 2,
  },
  expiryText: {
    fontSize: 11,
    color: "#717171",
  },
  defaultBadge: {
    backgroundColor: "#EAF5EA",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 15,
    marginLeft: 12,
  },
  defaultText: {
    fontSize: 13,
    color: "#67CE67",
  },
});

export default PaymentCard;
