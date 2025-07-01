import { View, Text } from "react-native";
import React from "react";
import { Body, Empty, MainButton } from "../../../components";
import { fontScale, width, wp } from "../../../theme/responsive";
import { globalStyle, Height, Space_Between } from "../../../theme/globalStyle";
import Icon from "react-native-dynamic-vector-icons";
import { colors } from "../../../theme/colors";
import { appImages, fonts } from "../../../assets";

const TrackPickup = () => {
  return (
    <Body horizontal={wp(5)}>
      <Height />

      <View style={[globalStyle.flex, { justifyContent: "space-between" }]}>
        <Space_Between>
          <View />
          <Icon name="close" size={20} color={colors.black} type="AntDesign" />
        </Space_Between>
        <Empty
          source={appImages.trackingBus}
          imageStyle={{
            width: width / 2,
            aspectRatio: 1 / 1,
          }}
          titleStyle={{ fontSize: fontScale(20), fontFamily: fonts[600] }}
          title="Your pickup is confirmed for May 29, 2025"
          sub={"We’ll arrive between 10:00 AM-2:00 PM."}
        />
        <MainButton title="Track my pickup " />
      </View>
    </Body>
  );
};

export default TrackPickup;
