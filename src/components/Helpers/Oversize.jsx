import React from "react";
import { Text } from "..";
import { colors } from "../../theme/colors";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-dynamic-vector-icons";
import { globalStyle, Space_Between } from "../../theme/globalStyle";

const Oversize = ({ focus, onPress, onAboutPress }) => {
  return (
    <Space_Between>
      <TouchableOpacity onPress={onPress} style={globalStyle.row}>
        <Icon
          size={22}
          style={{ marginRight: 5 }}
          color={focus ? colors.purple : colors.grey}
          type={focus ? "Ionicons" : "MaterialIcons"}
          name={focus ? "checkbox" : "check-box-outline-blank"}
        />
        <Text title={"Oversized Item?"} />
      </TouchableOpacity>

      <TouchableOpacity onPress={onAboutPress}>
        <Icon
          size={25}
          color="#000"
          type="MaterialCommunityIcons"
          name="alert-decagram-outline"
        />
      </TouchableOpacity>
    </Space_Between>
  );
};

export default Oversize;
