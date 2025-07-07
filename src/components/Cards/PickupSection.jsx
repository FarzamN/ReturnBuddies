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
import { appImages } from "../../assets";
import { colors } from "../../theme/colors";
import { Text as RNText, View } from "react-native";
import { scaleSize } from "../../theme/responsive";
import Icon from "react-native-dynamic-vector-icons";

const PickupSection = (props) => {
  const { data } = props;
  return (
    <View style={[styles.sectionContainer, globalStyle.ph0]}>
      <View style={globalStyle.ph10}>
        <View
          style={[
            globalStyle.space_Between,
            { flexWrap: "wrap", marginBottom: scaleSize(5) },
          ]}
        >
          <RNText
            allowFontScaling
            numberOfLines={1}
            style={styles.sectionTitle}
          >
            {data.BundleName}
          </RNText>
          <Text
            color={colors.grey}
            style={styles.labelTitle}
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
              source={data?.products[0].thumbnail}
            />
            {data?.products[1]?.thumbnail && (
              <FullImage
                isUrl
                radius={10}
                style={[globalStyle.shadow, styles.pickup1stImage]}
                source={data?.products[1]?.thumbnail}
              />
            )}
            {data?.products.length > 2 && (
              <View style={[styles.pickupSectionLenghtBox]}>
                <Text
                  style={styles.pickupSectionLenght}
                  title={`+${data?.products.length - 2}`}
                />
              </View>
            )}
          </Row>

          <View
            style={{ marginLeft: data?.products.length === 2 && scaleSize(15) }}
          >
            <Text
              style={styles.labelName}
              color={colors.grey}
              title={data?.products[0].productName}
            />
            <View style={[styles.itemLengthBox, globalStyle.center]}>
              <Text
                color={colors.purple}
                style={styles.itemLengthText}
                title={`${data?.products.length} items`}
              />
            </View>
          </View>
        </Row>
      </View>
      <Divider />
      <Space_Between style={[globalStyle.ph10, globalStyle.mt10]}>
        <Row>
          <FullImage
            source={appImages.pickup}
            style={{ width: 30, height: 30 }}
          />
          <Text
            color={"#318252"}
            title="Pickup Requested"
            style={styles.pickupDetailText}
          />
        </Row>
        <Icon
          name="chevron-right"
          type="Feather"
          size={20}
          color={colors.black}
        />
      </Space_Between>
    </View>
  );
};

export default PickupSection;
