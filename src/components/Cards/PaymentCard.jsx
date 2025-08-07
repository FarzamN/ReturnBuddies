import React from "react";
import { FullImage } from "..";
import { iOS } from "../../utils/constants";
import { colors } from "../../theme/colors";
import { appImages, fonts } from "../../assets";
import { maskCardNumber } from "../../function";
import { fontScale } from "../../theme/responsive";
import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import { globalStyle, Row, Space_Between } from "../../theme/globalStyle";

const PaymentCard = ({ data, onPress, focus, disabled, onEdit }) => {
  const getCardType = (cardNumber) => {
    if (!cardNumber) return null;
    const firstDigit = cardNumber[0];
    if (firstDigit === "3") return "amex";
    if (firstDigit === "4") return "visa";
    if (firstDigit === "5") return "master";
    return "unknown";
  };

  const cardType = getCardType(data?.cardNumber);

  const CARD_TYPES = {
    master: {
      image: appImages.master,
      displayName: "Master",
    },
    amex: {
      image: appImages.amex,
      displayName: "Amex",
    },
    visa: {
      image: appImages.visa,
      displayName: "Visa",
    },
    default: {
      image: appImages.card,
      displayName: "Unknown",
    },
  };

  const getCardInfo = (cardType) => {
    return CARD_TYPES[cardType] || CARD_TYPES.default;
  };

  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={0.7}
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
        <TouchableOpacity
          onPress={onEdit}
          activeOpacity={0.7}
          style={globalStyle.ml10}
        >
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
    fontSize: 14,
    color: colors.black,
    fontFamily: fonts[600],
  },
  expiryText: {
    fontSize: 11,
    color: "#717171",
    fontFamily: fonts[400],
  },
  defaultBadge: {
    marginLeft: 12,
    borderRadius: 15,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: "#EAF5EA",
  },
  defaultText: {
    fontSize: 13,
    color: "#67CE67",
    fontFamily: fonts[500],
    top: fontScale(iOS ? 0 : 1),
  },
});

export default PaymentCard;
