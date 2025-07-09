import React from "react";
import { View } from "react-native";
import { FullImage, Text } from "..";
import { appImages } from "../../assets";
import { colors } from "../../theme/colors";
import { scaleSize } from "../../theme/responsive";
import userStyle from "../../screens/user/userStyle";
import { globalStyle, Row, Space_Between } from "../../theme/globalStyle";

const TrackingCard = (props) => {
  return (
    <View
      style={{
        padding: scaleSize(10),
        backgroundColor: "#F5F1F8",
        marginBottom: scaleSize(10),
        borderRadius: scaleSize(10),
      }}
    >
      <Text style={userStyle.pickupTitle} title="Track your return" />
      <Space_Between>
        <Row style={{ top: 5 }}>
          <Text style={userStyle.pickupTitle} title="UPS Tracking #: " />
          <Text
            title={props.tracking}
            color={colors.purple}
            style={userStyle.pickupTitle}
          />
        </Row>
        <FullImage
          source={appImages.shareCircle}
          style={globalStyle.deleteIcon}
        />
      </Space_Between>
    </View>
  );
};

export default TrackingCard;
