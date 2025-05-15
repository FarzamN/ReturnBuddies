import React from "react";
import { Text as T } from "react-native";
import styles from "./helperStyle";

const Text = ({ title, style, center }) => {
  return (
    <T
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
