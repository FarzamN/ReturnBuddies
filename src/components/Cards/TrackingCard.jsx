import React from "react";
import { FullImage, Text } from "..";
import { colors } from "../../theme/colors";
import { appImages, fonts } from "../../assets";
import { scaleSize } from "../../theme/responsive";
import userStyle from "../../screens/user/userStyle";
import { Share, TouchableOpacity, View } from "react-native";
import { globalStyle, Row, Space_Between } from "../../theme/globalStyle";

const TrackingCard = ({ tracking }) => {
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
          <Text
            style={[userStyle.pickupTitle, { fontFamily: fonts[400] }]}
            title="UPS Tracking #: "
          />
          <Text
            title={tracking}
            color={colors.purple}
            style={[userStyle.pickupTitle, { fontFamily: fonts[400] }]}
          />
        </Row>
        <TouchableOpacity
          onPress={() =>
            Share.share({
              message: tracking,
              title: "Share UPS tracking Code",
            })
          }
        >
          <FullImage
            source={appImages.shareCircle}
            style={globalStyle.deleteIcon}
          />
        </TouchableOpacity>
      </Space_Between>
    </View>
  );
};

export default TrackingCard;
