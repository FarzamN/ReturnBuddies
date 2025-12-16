import React from "react";
import { FullImage, Text } from "..";
import { appImages } from "../../assets";
import { colors } from "../../theme/colors";
import { TouchableOpacity } from "react-native";
import responsive from "../../theme/responsive";
import { DynamicIcon } from "../../utils/DynamicLucideIcon";
import { globalStyle, Space_Between } from "../../theme/globalStyle";

const Oversize = ({ focus, onPress, onAboutPress }) => {
  return (
    <Space_Between>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPress}
        style={globalStyle.row}
      >
        <DynamicIcon
          size={18}
          style={{ marginRight: 5 }}
          name={focus ? "CheckCircle2" : "Circle"}
          color={focus ? colors.purple : colors.lightGrey}
        />
        <Text title={"Oversized Item?"} />
      </TouchableOpacity>

      <TouchableOpacity activeOpacity={0.7} onPress={onAboutPress}>
        <FullImage
          source={appImages.information}
          style={{ width: responsive.width(20), height: responsive.width(20) }}
        />
      </TouchableOpacity>
    </Space_Between>
  );
};

export default Oversize;
