import React from "react";
import { colors } from "../../theme/colors";
import Icon from "react-native-dynamic-vector-icons";
import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import { globalStyle, Row, Space_Between } from "../../theme/globalStyle";
import { fontScale } from "../../theme/responsive";
import { fonts } from "../../assets";

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
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 15,
  },
  defaultText: {
    top: fontScale(1),
    color: "#67CE67",
    fontFamily: fonts[400],
    fontSize: fontScale(11),
  },
});
