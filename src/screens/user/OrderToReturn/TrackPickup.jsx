import moment from "moment";
import React, { useState } from "react";
import { colors } from "../../../theme/colors";
import { iOS } from "../../../utils/constants";
import { View, StatusBar } from "react-native";
import { appImages, fonts } from "../../../assets";
import { width, wp } from "../../../theme/responsive";
import { useDispatch, useSelector } from "react-redux";
import { getPickupAPI } from "../../../apis/pickupQueries";
import { getReturnItem } from "../../../apis/draftQueries";
import { Body, Empty, MainButton } from "../../../components";
import { globalStyle, Height, Space_Between } from "../../../theme/globalStyle";
import DynamicIcon from "../../../utils/DynamicLucideIcon";

const TrackPickup = ({ navigation }) => {
  const dispatch = useDispatch();
  const { replace } = navigation;
  const [load, setLoad] = useState(false);
  const { draftCompleteData } = useSelector((state) => state.draft);

  const { pickupTime, pickupDate } = draftCompleteData;

  const onPress = () => {
    getReturnItem(setLoad)(dispatch);
    getPickupAPI(setLoad)(dispatch);
    replace("myPickupsRoute");
  };
  return (
    <Body horizontal={wp(4)}>
      <View style={[globalStyle.flex, { justifyContent: "space-between" }]}>
        <Space_Between style={{ marginTop: StatusBar.currentHeight + 20 }}>
          <View />
          <DynamicIcon
            size={20}
            name="CircleX"
            color={colors.black}
            onPress={() => replace("draftItem")}
          />
        </Space_Between>
        <Empty
          source={appImages.trackingBus}
          imageStyle={{
            width: width / 2,
            aspectRatio: 1 / 1,
          }}
          titleStyle={{ fontSize: 20, fontFamily: fonts[700] }}
          title={`Your pickup is confirmed for \n ${moment(pickupDate).format(
            "MMM DD, yyyy"
          )}`}
          sub={`We’ll arrive between ${pickupTime}`}
        />
        <View>
          <MainButton title="Track my pickup" onPress={onPress} load={load} />
          {iOS && <Height />}
        </View>
      </View>
    </Body>
  );
};

export default TrackPickup;
