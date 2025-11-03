import React from "react";
import { FullImage } from "..";
import { iOS } from "../../utils/constants";
import { colors } from "../../theme/colors";
import { appImages, fonts } from "../../assets";
import { Row, Space_Between } from "../../theme/globalStyle";
import { TouchableOpacity, View, StyleSheet, Text } from "react-native";

const PaymentCard = ({ data, onPress, focus, disabled }) => {
  const CARD_TYPES = {
    mastercard: {
      image: appImages.master,
      displayName: "MasterCard",
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

  // Map Stripe brand to your CARD_TYPES keys
  const getCardInfo = (brand) => {
    if (!brand) return CARD_TYPES.default;
    const key = brand.toLowerCase(); // e.g. "MasterCard" -> "mastercard"
    return CARD_TYPES[key] || CARD_TYPES.default;
  };

  const cardInfo = getCardInfo(data?.brand);

  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={0.7}
      style={[
        styles.cardContainer,
        { borderColor: focus ? colors.purple : colors.borderColor },
      ]}
      onPress={onPress}
    >
      <Space_Between style={styles.cardContent}>
        <Row style={styles.cardInfo}>
          <FullImage source={cardInfo.image} style={styles.cardLogo} />
          <View style={styles.cardDetails}>
            <Text style={styles.cardTypeText}>
              {`${cardInfo.displayName} ${"•••• " + data?.last4}`}
            </Text>
            <Text style={styles.expiryText}>
              Expires {data?.exp_month}/{data?.exp_year}
            </Text>
          </View>
        </Row>

        {data?.isDefault === 1 && (
          <View style={styles.defaultBadge}>
            <Text style={styles.defaultText}>Default</Text>
          </View>
        )}

        {/* <TouchableOpacity
          onPress={onEdit}
          activeOpacity={0.7}
          style={globalStyle.ml10}
        >
          <FullImage source={appImages.edit} style={globalStyle.iconImage} />
        </TouchableOpacity> */}
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
    top: iOS ? 0 : 1,
  },
});

export default PaymentCard;
