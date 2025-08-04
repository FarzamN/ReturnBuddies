import React from "react";
import { colors } from "../../theme/colors";
import Icon from "react-native-dynamic-vector-icons";
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
        <Icon name="delete" type="MaterialIcons" size={24} color="#fff" />
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
