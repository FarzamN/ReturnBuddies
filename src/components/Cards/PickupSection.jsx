import React from "react";
import moment from "moment";
import styles from "./cardStyle";
import { FullImage, Text } from "..";
import { colors } from "../../theme/colors";
import { appImages, fonts } from "../../assets";
import Icon from "react-native-dynamic-vector-icons";
import { scaleSize, width } from "../../theme/responsive";
import { Row, Divider, globalStyle } from "../../theme/globalStyle";
import { Text as RNText, TouchableOpacity, View } from "react-native";

const PickupSection = ({ data, onPress }) => {
  // const flat_products = data?.bundleId.flat().map((item) => item.products)[0];

  const all_products = data?.bundleId.flatMap((item) => item.products);
  // console.log({ flat_products, all_products });
  return (
    <View style={[styles.sectionContainer, globalStyle.ph0]}>
      <View style={globalStyle.ph10}>
        <View
          style={[
            globalStyle.space_Between,
            { flexWrap: "wrap", marginBottom: scaleSize(5) },
          ]}
        >
          {/* Left: Pickup Name */}
          <View style={{ flex: 1, minWidth: "50%" }}>
            <RNText style={styles.BundleName}>
              {`Pickup #${data.PickupName}`}
            </RNText>
          </View>

          {/* Right: Date */}
          <View style={{ minWidth: "40%", alignItems: "flex-end" }}>
            <Text
              color={"#B1AFB2"}
              style={{
                fontSize: 12,
                fontFamily: fonts[400],
                textAlign: "right",
              }}
              title={moment(data.createdAt).format("dddd, MMM do yyyy")}
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
      <TouchableOpacity
        onPress={onPress}
        style={[globalStyle.ph10, globalStyle.mt10, globalStyle.space_Between]}
      >
        <Row>
          <FullImage
            source={
              data?.status === "Pickup cancelled"
                ? appImages.cancelled
                : data?.status === "Completed"
                ? appImages.complete
                : appImages.pickup
            }
            style={{ width: 30, height: 30 }}
          />
          <Text
            title={data?.status}
            style={styles.pickupDetailText}
            color={data?.status === "Pickup cancelled" ? "#9E2424" : "#318252"}
          />
        </Row>
        <Icon
          size={20}
          type="Feather"
          name="chevron-right"
          color={colors.black}
        />
      </TouchableOpacity>
    </View>
  );
};

export default PickupSection;
