import { View, Text } from "react-native";
import React from "react";
import { Body, Empty, MainButton } from "../../../components";
import { fontScale, width, wp } from "../../../theme/responsive";
import { globalStyle, Height, Space_Between } from "../../../theme/globalStyle";
import Icon from "react-native-dynamic-vector-icons";
import { colors } from "../../../theme/colors";
import { appImages, fonts } from "../../../assets";
import { useSelector } from "react-redux";
import moment from "moment";

const TrackPickup = ({ navigation }) => {
  const { replace } = navigation;
  const { draftCompleteData } = useSelector((state) => state.draft);

  const { pickupTime, pickupDate } = draftCompleteData;

  return (
    <Body horizontal={wp(5)}>
      <Height />

      <View style={[globalStyle.flex, { justifyContent: "space-between" }]}>
        <Space_Between>
          <View />
          <Icon
            onPress={() => replace("draftItem")}
            name="close"
            size={20}
            color={colors.black}
            type="AntDesign"
          />
        </Space_Between>
        <Empty
          source={appImages.trackingBus}
          imageStyle={{
            width: width / 2,
            aspectRatio: 1 / 1,
          }}
          titleStyle={{ fontSize: fontScale(20), fontFamily: fonts[600] }}
          title={`Your pickup is confirmed for \n ${moment(pickupDate).format(
            "MMM DD, yyyy"
          )}`}
          sub={`We’ll arrive between ${pickupTime}`}
        />
        <MainButton title="Track my pickup " />
      </View>
    </Body>
  );
};

export default TrackPickup;
