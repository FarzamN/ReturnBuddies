import React from "react";
import { Text } from "..";
import styles from "./cardStyle";
import { fonts } from "../../assets";
import { colors } from "../../theme/colors";
import { width } from "../../theme/responsive";
import { TouchableOpacity } from "react-native";
import DynamicIcon from "../../utils/DynamicLucideIcon";
import { globalStyle } from "../../theme/globalStyle";

const TimeSelectCard = ({ data, focus, onPress, index, disabled }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      disabled={disabled}
      style={[
        styles.TimeSelectCont,
        globalStyle.space_Between,
        {
          marginTop: index === 0 ? 0 : 10,
          borderColor: focus ? colors.purple : "#E3E3E3",
          backgroundColor: focus ? colors.skipButton : "#FAFAFA",
        },
      ]}
    >
      <Text
        title={data}
        width={width / 1.4}
        color={focus ? colors.purple : disabled ? "#A9A9A9" : colors.black}
        style={{ fontFamily: fonts[500], fontSize: 12 }}
      />
      <DynamicIcon
        size={22}
        name={focus ? "CheckCircle2" : "Circle"}
        color={focus ? colors.purple : disabled ? "#A9A9A9" : colors.grey}
      />
    </TouchableOpacity>
  );
};

export default TimeSelectCard;
