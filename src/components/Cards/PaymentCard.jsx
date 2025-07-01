import React from "react";
import { FullImage } from "..";
import { colors } from "../../theme/colors";
import { appImages, fonts } from "../../assets";
import { fontScale } from "../../theme/responsive";
import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import { globalStyle, Row, Space_Between } from "../../theme/globalStyle";
import { maskCardNumber } from "../../function";

const PaymentCard = ({ data, onPress, focus, disabled, onEdit }) => {
  const getCardType = (cardNumber) => {
    if (!cardNumber) return null;
    const firstDigit = cardNumber[0];
    if (firstDigit === "3") return "amex";
    if (firstDigit === "4") return "visa";
    if (firstDigit === "5") return "mastercard";
    return "unknown";
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
          <FullImage source={appImages.edit} style={globalStyle.iconImage} />
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
    fontFamily: fonts[600],
    fontSize: fontScale(14),
  },
  expiryText: {
    color: "#717171",
    fontFamily: fonts[400],
    fontSize: fontScale(11),
  },
  defaultBadge: {
    backgroundColor: "#EAF5EA",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 15,
    marginLeft: 12,
  },
  defaultText: {
    top: fontScale(1),
    color: "#67CE67",
    fontFamily: fonts[400],
    fontSize: fontScale(11),
  },
});

export default PaymentCard;
