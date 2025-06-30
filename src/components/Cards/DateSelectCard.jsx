import { TouchableOpacity } from "react-native";
import React from "react";
import { Text } from "..";
import { colors } from "../../theme/colors";
import { fonts } from "../../assets";
import { fontScale } from "../../theme/responsive";

const DateSelectCard = ({ date, onPress, focus }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flex: 1,
        padding: 15,
        paddingHorizontal: 20,
        borderRadius: 12,
        marginHorizontal: 5,
        alignItems: "center",
        backgroundColor: focus ? colors.purple : "#FFFFFF",
      }}
    >
      <Text
        color={focus ? colors.white : "#94A3B8"}
        style={{
          fontSize: fontScale(12),
          fontFamily: fonts[400],
        }}
        title={date.format("ddd")} // Days
      />
      <Text
        color={focus ? colors.white : colors.purple}
        style={{
          marginVertical: 7,
          fontFamily: fonts[600],
          fontSize: fontScale(18),
        }}
        title={date.format("D")} // date
      />
      <Text
        color={focus ? colors.white : "#94A3B8"}
        style={{
          fontSize: fontScale(13),
          fontFamily: focus ? fonts[600] : fonts[500],
        }}
        title={date.format("MMM")} // month
      />
    </TouchableOpacity>
  );
};

export default DateSelectCard;
