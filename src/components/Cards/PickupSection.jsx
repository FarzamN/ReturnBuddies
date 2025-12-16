import React from "react";
import moment from "moment";
import styles from "./cardStyle";
import { FullImage, Text } from "..";
import { colors } from "../../theme/colors";
import { appImages, fonts } from "../../assets";
import { scaleSize, width } from "../../theme/responsive";
import { DynamicIcon } from "../../utils/DynamicLucideIcon";
import { Row, Divider, globalStyle } from "../../theme/globalStyle";
import { Text as RNText, TouchableOpacity, View } from "react-native";

const PickupSection = ({ data, onPress }) => {
  const all_products = data?.bundleId.flatMap((item) => item.products);

  const updatedStatus = {
    Delivered: {
      title: "Delivered",
      img: appImages.delivered,
    },
    Completed: { title: "Completed", img: appImages.complete },
    Inspected: { title: "At RB Warehouse", img: appImages.pickup },
    "Picked Up": { title: "Picked up by RB", img: appImages.pickup },
    "Pickup Cancelled": { title: "Cancelled", img: appImages.cancelled },
    "Pickup Requested": { title: "Pickup Requested", img: appImages.pickup },
    "In Transit": { title: "Dropped off at Carrier", img: appImages.pickup },
  };
  return (
    <View style={[styles.sectionContainer, globalStyle.ph0]}>
      <View style={globalStyle.ph10}>
        <View style={[globalStyle.space_Between, pickupStyle.headerRow]}>
          {/* Left: Pickup Name */}
          <View style={styles.bundleNameContainer}>
            <RNText style={styles.BundleName}>
              {`Pickup #${data.PickupName}`}
            </RNText>
          </View>

          {/* Right: Date */}
          <View style={pickupStyle.headerRowDate}>
            <Text
              color={"#B1AFB2"}
              style={pickupStyle.dateText}
              title={moment(data.createdAt).format("dddd, MMM Do yyyy")}
            />
          </View>
        </View>

        <Divider />
        <Row style={globalStyle.mt10}>
          <Row>
            <FullImage
              isUrl
              radius={10}
              resizeMode="cover"
              style={styles.sectionImage}
              source={all_products[0].thumbnail}
            />
            {all_products[1]?.thumbnail && (
              <FullImage
                isUrl
                radius={10}
                resizeMode="cover"
                source={all_products[1]?.thumbnail}
                style={[globalStyle.shadow, styles.pickup1stImage]}
              />
            )}
            {all_products.length > 2 && (
              <View style={[styles.pickupSectionLenghtBox]}>
                <Text
                  style={styles.pickupSectionLenght}
                  title={`+${all_products.length - 2}`}
                />
              </View>
            )}
          </Row>

          <View
            style={{
              marginLeft: all_products.length === 2 && scaleSize(15),
            }}
          >
            <Text
              width={width / 1.3}
              style={styles.labelName}
              title={all_products[0].productName}
            />
            <View style={[styles.itemLengthBox, globalStyle.center]}>
              <Text
                color={colors.purple}
                style={styles.itemLengthText}
                title={`${all_products.length} ${
                  all_products.length > 1 ? "items" : "item"
                }`}
              />
            </View>
          </View>
        </Row>
      </View>
      <Divider />
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        style={pickupStyle.endPressingRow}
      >
        <Row>
          <FullImage
            source={updatedStatus[data?.status]?.img}
            style={pickupStyle.statusImage}
          />
          <Text
            style={styles.pickupDetailText}
            title={updatedStatus[data?.status]?.title}
            color={data?.status === "Pickup Cancelled" ? "#9E2424" : "#318252"}
          />
        </Row>
        <DynamicIcon size={20} name="ChevronRight" color={colors.black} />
      </TouchableOpacity>
    </View>
  );
};

export default PickupSection;

const pickupStyle = {
  endPressingRow: [
    globalStyle.ph10,
    globalStyle.mt10,
    globalStyle.space_Between,
  ],
  dateText: {
    fontSize: 12,
    textAlign: "right",
    fontFamily: fonts[400],
  },
  statusImage: {
    width: 30,
    height: 30,
  },
  bundleNameContainer: {
    flex: 1,
    minWidth: "50%",
  },
  headerRow: { flexWrap: "wrap", marginBottom: scaleSize(5) },
  headerRowDate: {
    minWidth: "40%",
    alignItems: "flex-end",
  },
};
