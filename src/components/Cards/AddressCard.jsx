import React from "react";
import { colors } from "../../theme/colors";
import Icon from "react-native-dynamic-vector-icons";
import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import { globalStyle, Row, Space_Between } from "../../theme/globalStyle";

const AddressCard = ({ data, onPress, focus, disabled, onEdit }) => {
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
          <View style={styles.cardDetails}>
            <Text style={styles.cardTypeText}>{data?.street}</Text>
            <Text style={styles.expiryText}>
              {data?.city + ", " + data?.state + ", " + data?.postalCode}
            </Text>
          </View>
        </Row>

        {data?.isDefault == 1 && (
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

export default AddressCard;

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
