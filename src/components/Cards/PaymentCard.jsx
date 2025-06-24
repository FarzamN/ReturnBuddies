import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import React from "react";
import { Row, Space_Between } from "../../theme/globalStyle";
import { FullImage } from "..";
import { appImages } from "../../assets";
import { colors } from "../../theme/colors";

const PaymentCard = ({ data, onPress, focus }) => {
  const getCardType = (cardNumber) => {
    if (!cardNumber) return null;
    const firstDigit = cardNumber[0];
    if (firstDigit === "4") return "visa";
    if (firstDigit === "5") return "mastercard";
    return "visa";
  };

  const maskCardNumber = (cardNumber) => {
    if (!cardNumber) return "•••• •••• •••• ••••";
    const lastFour = cardNumber.slice(-4);
    return `•••• ${lastFour}`;
  };

  const cardType = getCardType(data?.cardNumber);

  return (
    <TouchableOpacity
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
            source={
              cardType === "mastercard" ? appImages.master : appImages.visa
            }
            style={styles.cardLogo}
          />
          <View style={styles.cardDetails}>
            <Text style={styles.cardTypeText}>
              {cardType === "mastercard" ? "MASTER" : "VISA"}{" "}
              {maskCardNumber(data?.cardNumber)}
            </Text>
            <Text style={styles.expiryText}>Expires {data?.expiryDate}</Text>
          </View>
        </Row>

        {data?.isDefault === "1" && (
          <View style={styles.defaultBadge}>
            <Text style={styles.defaultText}>Default</Text>
          </View>
        )}
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
