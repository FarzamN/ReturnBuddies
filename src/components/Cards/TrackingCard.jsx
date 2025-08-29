import React from "react";
import { FullImage, Text } from "..";
import { colors } from "../../theme/colors";
import { appImages, fonts } from "../../assets";
import { scaleSize } from "../../theme/responsive";
import userStyle from "../../screens/user/userStyle";
import { Share, TouchableOpacity, View } from "react-native";
import { globalStyle, Row, Space_Between } from "../../theme/globalStyle";

const TrackingCard = ({ message, carrier }) => {
  return (
    <View
      style={{
        padding: scaleSize(10),
        backgroundColor: "#F5F1F8",
        marginBottom: scaleSize(10),
        borderRadius: scaleSize(10),
      }}
    >
      <Text
        style={userStyle.pickupTitle}
        title={message ? "Track your return" : "Waiting for tracking info..."}
      />
      {message ? (
        <Space_Between>
          <Row style={{ top: 5 }}>
            <Text
              style={[userStyle.pickupTitle, { fontFamily: fonts[400] }]}
              title={`${carrier} Tracking #: `}
            />
            <Text
              title={message}
              color={colors.purple}
              style={[userStyle.pickupTitle, { fontFamily: fonts[400] }]}
            />
          </Row>
          <TouchableOpacity
            onPress={() =>
              Share.share({
                message,
                title: `Share ${carrier} tracking Code`,
              })
            }
            activeOpacity={0.7}
          >
            <FullImage
              source={appImages.shareCircle}
              style={globalStyle.deleteIcon}
            />
          </TouchableOpacity>
        </Space_Between>
      ) : (
        <Text
          style={[userStyle.pickupTitle, { fontFamily: fonts[400] }]}
          title="We’ll show your tracking number here soon."
        />
      )}
    </View>
  );
};

export default TrackingCard;
