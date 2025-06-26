import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Icon from "react-native-dynamic-vector-icons";
import { colors } from "../../theme/colors";

const HiddenDelete = ({ onPress }) => {
  return (
    <View style={container}>
      <TouchableOpacity onPress={onPress} style={deleteButton}>
        <Icon name="delete" type="MaterialIcons" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default HiddenDelete;

const deleteButton = {
  width: 60,
  height: "85%",
  backgroundColor: colors.error,
  borderRadius: 20,
  justifyContent: "center",
  alignItems: "center",
};

const container = {
  flex: 1,
  flexDirection: "row",
  justifyContent: "flex-end",
};
