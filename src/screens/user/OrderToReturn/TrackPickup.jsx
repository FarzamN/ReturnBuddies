import { View, Text } from "react-native";
import React, { useState } from "react";
import { Body, Empty, MainButton } from "../../../components";
import { fontScale, width, wp } from "../../../theme/responsive";
import { globalStyle, Height, Space_Between } from "../../../theme/globalStyle";
import Icon from "react-native-dynamic-vector-icons";
import { colors } from "../../../theme/colors";
import { appImages, fonts } from "../../../assets";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { getPickupAPI } from "../../../apis/pickupQueries";
import { getReturnItem } from "../../../apis/draftQueries";
import { iOS } from "../../../utils/constants";

const TrackPickup = ({ navigation }) => {
  const { replace } = navigation;
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);
  const { draftCompleteData } = useSelector((state) => state.draft);

  const { pickupTime, pickupDate } = draftCompleteData;

  const onPress = () => {
    getReturnItem(setLoad)(dispatch);
    getPickupAPI(setLoad)(dispatch);
    replace("myPickupsRoute");
  };
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
