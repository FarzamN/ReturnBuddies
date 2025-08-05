import React from "react";
import { FullImage } from "..";
import { appImages } from "../../assets";
import { colors } from "../../theme/colors";
import { globalStyle } from "../../theme/globalStyle";
import { View, TouchableOpacity } from "react-native";

const HiddenDelete = ({ onPress, height, radius, alignItems }) => {
  return (
    <View style={[container, { alignItems: alignItems ?? "baseline" }]}>
      <TouchableOpacity
        onPress={onPress}
        style={[
          deleteButton,
          { height: height ?? "80%", borderRadius: radius ?? 20 },
        ]}
      >
        <FullImage
          color="#fff"
          source={appImages.delete}
          style={globalStyle.deleteIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

export default HiddenDelete;

const deleteButton = {
  width: 60,
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: colors.error,
};

const container = {
  flex: 1,
  flexDirection: "row",
  justifyContent: "flex-end",
};
