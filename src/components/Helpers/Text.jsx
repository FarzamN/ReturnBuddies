import React from "react";
import { Text as T } from "react-native";
import styles from "./helperStyle";
import { colors } from "../../theme/colors";

const Text = (props) => {
  const { title, style, center, numberOfLines, color } = props;
  return (
    <T
      numberOfLines={numberOfLines}
      style={[
        styles.text,
        {
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
