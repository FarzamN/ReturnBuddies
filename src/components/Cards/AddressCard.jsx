import React from "react";
import { FullImage } from "..";
import { colors } from "../../theme/colors";
import { iOS } from "../../utils/constants";
import { appImages, fonts } from "../../assets";
import { fontScale } from "../../theme/responsive";
import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import { globalStyle, Row, Space_Between } from "../../theme/globalStyle";

const AddressCard = ({ data, onPress, focus, disabled, onEdit }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
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
            {data?.suite && (
              <Text style={styles.cardTypeText}>{data?.suite}</Text>
            )}
            <Text style={styles.cardTypeText}>
              {data?.city + ", " + data?.state + ", " + data?.postalCode}
            </Text>
          </View>
        </Row>

        {data?.isDefault == 1 && (
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
    fontSize: 13,
    color: colors.black,
    fontFamily: fonts[400],
  },

  defaultBadge: {
    backgroundColor: "#EAF5EA",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 15,
  },
  defaultText: {
    fontSize: 11,
    color: "#67CE67",
    fontFamily: fonts[400],
    top: fontScale(iOS ? 0 : 1),
  },
});
