import React from "react";
import { Text } from "..";
import { fonts } from "../../assets";
import { iOS } from "../../utils/constants";
import { colors } from "../../theme/colors";
import { TouchableOpacity } from "react-native";
import { fontScale } from "../../theme/responsive";
import { globalStyle } from "../../theme/globalStyle";
import DynamicIcon from "../../utils/DynamicLucideIcon";

const CircleCheck = (props) => {
  const { focus, onPress, title, isError } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[globalStyle.row]}
    >
      <DynamicIcon
        size={20}
        name={focus ? "CircleCheck" : "Circle"}
        color={focus ? colors.purple : isError ? colors.error : colors.grey}
      />
      <Text
        title={title}
        style={checkBoxText}
        color={isError ? colors.error : colors.black}
      />
    </TouchableOpacity>
  );
};

export default CircleCheck;

const checkBoxText = {
  fontSize: 13,
  marginLeft: 7,
  fontFamily: fonts[400],
  top: fontScale(iOS ? 0 : 1),
};
