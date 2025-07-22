import React from "react";
import style from "./textStyle";
import { Text } from "react-native";
import { colors } from "../../theme/colors";

const RequiredText = ({ title, required, styles }) => {
  return (
    <Text style={[style.requiredTitle, styles]}>
      {title}
      {required && <Text style={{ color: colors.error }}> *</Text>}
    </Text>
  );
};

export default RequiredText;
