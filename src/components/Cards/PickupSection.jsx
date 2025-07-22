import {
  Row,
  Divider,
  globalStyle,
  Space_Between,
} from "../../theme/globalStyle";

import React from "react";
import moment from "moment";
import styles from "./cardStyle";
import { FullImage, Text } from "..";
import { appImages, fonts } from "../../assets";
import { colors } from "../../theme/colors";
import { Text as RNText, View } from "react-native";
import { scaleSize, width } from "../../theme/responsive";
import Icon from "react-native-dynamic-vector-icons";

const PickupSection = ({ data, onPress }) => {
  const all_products = data?.bundleId.flatMap((item) => item.products);
  return (
    <View style={[styles.sectionContainer, globalStyle.ph0]}>
      <View style={globalStyle.ph10}>
        <View
          style={[
            globalStyle.space_Between,
            { flexWrap: "wrap", marginBottom: scaleSize(5) },
          ]}
        >
          <RNText allowFontScaling numberOfLines={1} style={styles.BundleName}>
            {data.bundleId[0].BundleName}
          </RNText>
          <Text
            color={"#B1AFB2"}
            style={{ fontSize: 12, fontFamily: fonts[400] }}
            title={moment(data.createdAt).format("dddd, MMM do yyyy")}
          />
        </View>
        <Divider />
        <Row style={globalStyle.mt10}>
          <Row>
            <FullImage
              isUrl
              radius={10}
              style={styles.sectionImage}
              source={all_products[0].thumbnail}
            />
            {all_products[1]?.thumbnail && (
              <FullImage
                isUrl
                radius={10}
                style={[globalStyle.shadow, styles.pickup1stImage]}
                source={all_products[1]?.thumbnail}
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
              style={styles.labelName}
              width={width / 1.3}
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
      <Space_Between style={[globalStyle.ph10, globalStyle.mt10]}>
        <Row>
          <FullImage
            source={
              data?.status === "Pickup Canceled"
                ? appImages.cancelled
                : data?.status === "Completed"
                ? appImages.complete
                : appImages.pickup
            }
            style={{ width: 30, height: 30 }}
          />
          <Text
            color={data?.status === "Pickup Canceled" ? "#9E2424" : "#318252"}
            title={data?.status}
            style={styles.pickupDetailText}
          />
        </Row>
        <Icon
          size={20}
          type="Feather"
          onPress={onPress}
          name="chevron-right"
          color={colors.black}
        />
      </Space_Between>
    </View>
  );
};

export default PickupSection;
