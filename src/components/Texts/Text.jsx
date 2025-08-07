import React from "react";
import styles from "./textStyle";
import { Text as T } from "react-native";
import { colors } from "../../theme/colors";

const Text = (props) => {
  const { title, style, center, numberOfLines, color, width } = props;
  return (
    <T
      ellipsizeMode="tail"
      numberOfLines={numberOfLines}
      style={[
        styles.text,
        {
          width,
          textAlign: center ? "center" : "left",
          color: color ? color : colors.black,
        },
        style,
      ]}
    >
      {title}
    </T>
  );
};

export default Text;
