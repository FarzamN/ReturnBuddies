import { Text } from "react-native";
import React from "react";
import { colors } from "../../theme/colors";
import style from "./helperStyle";

const RequiredText = ({ title, required }) => {
  return (
    <Text style={style.requiredTitle}>
      {title}
      {required && <Text style={{ color: colors.error }}> *</Text>}
    </Text>
  );
};

export default RequiredText;
