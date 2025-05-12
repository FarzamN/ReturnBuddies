import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { globalStyle } from "../../theme/globalStyle";
import styles from "./buttonStyle";

const MainButton = ({
  load,
  style,
  title,
  onPress,
  disabled,
  marginTop,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        globalStyle.row,
        styles.containerStyle,
        { marginTop: marginTop },
        style,
      ]}
    >
      <Text style={[styles.font, textStyle]}>
        {load ? "Loading..." : title}
      </Text>
    </TouchableOpacity>
  );
};

export default MainButton;
