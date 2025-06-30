import React from "react";
import { FullImage, Text } from "..";
import { colors } from "../../theme/colors";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-dynamic-vector-icons";
import { globalStyle, Space_Between } from "../../theme/globalStyle";
import { appImages } from "../../assets";
import responsive from "../../theme/responsive";

const Oversize = ({ focus, onPress, onAboutPress }) => {
  return (
    <Space_Between>
      <TouchableOpacity onPress={onPress} style={globalStyle.row}>
        {/* <Icon
          size={22}
          color={focus ? colors.purple : colors.grey}
          type={focus ? "Ionicons" : "MaterialIcons"} 
          name={focus ? "checkbox" : "check-box-outline-blank"}
          /> */}
        <Icon
          size={20}
          style={{ marginRight: 5 }}
          type={focus ? "Ionicons" : "Feather"}
          name={focus ? "checkmark-circle" : "circle"}
          color={focus ? colors.purple : colors.lightGrey}
        />
        <Text title={"Oversized Item?"} />
      </TouchableOpacity>

      <TouchableOpacity onPress={onAboutPress}>
        <FullImage
          source={appImages.information}
          style={{ width: responsive.width(20), height: responsive.width(20) }}
        />
      </TouchableOpacity>
    </Space_Between>
  );
};

export default Oversize;
