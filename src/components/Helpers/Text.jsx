import React from "react";
import { Text as T } from "react-native";
import styles from "./helperStyle";

const Text = (props) => {
  const { title, style, center, numberOfLines } = props;
  return (
    <T
      numberOfLines={numberOfLines}
      style={[
        styles.text,
        {
          textAlign: center ? "center" : "left",
        },
        style,
      ]}
    >
      {title}
    </T>
  );
};

export default Text;
