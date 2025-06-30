import React from "react";
import { globalStyle, Space_Between } from "../../theme/globalStyle";
import { Text } from "..";
import Icon from "react-native-dynamic-vector-icons";
import { colors } from "../../theme/colors";
import { TouchableOpacity } from "react-native";
import styles from "./cardStyle";
import { width } from "../../theme/responsive";
import { fonts } from "../../assets";
const TimeSelectCard = ({ data, focus, onPress, index }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.TimeSelectCont,
        globalStyle.space_Between,
        {
          marginTop: index === 0 ? 0 : 10,
          backgroundColor: focus ? colors.skipButton : "#FAFAFA",
          borderColor: focus ? colors.purple : "#E3E3E3",
        },
      ]}
    >
      <Text
        title={data}
        color={focus ? colors.purple : colors.black}
        width={width / 1.4}
        style={{ fontFamily: fonts[500] }}
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
