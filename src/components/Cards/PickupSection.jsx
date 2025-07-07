import React from "react";
import styles from "./cardStyle";
import { Text as RNText, View } from "react-native";
import {
  Divider,
  globalStyle,
  Row,
  Space_Between,
} from "../../theme/globalStyle";
import { FullImage, Text } from "..";
import { colors } from "../../theme/colors";
import moment from "moment";
import { height, scaleSize, width } from "../../theme/responsive";
import Icon from "react-native-dynamic-vector-icons";
import { appImages } from "../../assets";

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
            style={styles.sectionTitle}
            allowFontScaling
            numberOfLines={1}
          >
            {data.BundleName}
          </RNText>
          <Text
            style={styles.labelTitle}
            color={colors.grey}
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
                style={[
                  globalStyle.shadow,
                  {
                    //  right: scaleSize(-30),
                    width: scaleSize(40),
                    height: scaleSize(40),
                  },
                ]}
                source={data?.products[1]?.thumbnail}
              />
            )}
            {data?.products.length > 2 && (
              <View style={{ backgroundColor: "red" }}>
                <Text title={`+${data?.products.length - 2}`} />
              </View>
            )}
          </Row>

          <View>
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
