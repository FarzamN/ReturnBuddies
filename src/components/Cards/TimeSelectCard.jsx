import React from "react";
import { globalStyle, Space_Between } from "../../theme/globalStyle";
import { Text } from "..";
import Icon from "react-native-dynamic-vector-icons";
import { colors } from "../../theme/colors";
import { TouchableOpacity } from "react-native";
const TimeSelectCard = ({ data, focus, onPress, index }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        globalStyle.space_Between,
        {
          marginTop: index === 0 ? 0 : 10,
          backgroundColor: focus ? colors.skipButton : "#FAFAFA",
          borderRadius: 10,
          padding: 12,
          borderWidth: 1,
          borderColor: focus ? colors.purple : "#E3E3E3",
          marginHorizontal: 10,
        },
      ]}
    >
      <Text
        title={data}
        color={focus ? colors.purple : colors.black}
        style={{ fontWeight: "600" }}
      />
      <Icon
        size={22}
        color={focus ? colors.purple : colors.grey}
        type={focus ? "Ionicons" : "Entypo"}
        name={focus ? "checkmark-circle" : "circle"}
      />
    </TouchableOpacity>
  );
};

export default TimeSelectCard;
