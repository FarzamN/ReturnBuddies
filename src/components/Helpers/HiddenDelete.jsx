import React from "react";
import { FullImage } from "..";
import { appImages } from "../../assets";
import { colors } from "../../theme/colors";
import { View, TouchableOpacity } from "react-native";

const HiddenDelete = ({ onPress, height, radius, alignItems }) => {
  return (
    <View style={[container, { alignItems: alignItems ?? "baseline" }]}>
      <View style={{ width: 20 }} />
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        style={[
          deleteButton,
          { height: height ?? "80%", borderRadius: radius ?? 20 },
        ]}
      >
        <FullImage
          style={deleteIcon}
          color={colors.white}
          source={appImages.delete}
        />
      </TouchableOpacity>
    </View>
  );
};

export default HiddenDelete;

const { deleteIcon, container, deleteButton } = {
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  deleteButton: {
    width: 60,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.error,
  },
  deleteIcon: { width: 23, height: 23 },
};
