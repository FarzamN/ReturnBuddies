import React from "react";
import { Text } from "..";
import { fonts } from "../../assets";
import { colors } from "../../theme/colors";
import { TouchableOpacity } from "react-native";

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
          fontSize: 12,
          fontFamily: fonts[400],
        }}
        title={date.format("ddd")} // Days
      />
      <Text
        color={focus ? colors.white : colors.purple}
        style={{
          fontSize: 18,
          marginVertical: 7,
          fontFamily: fonts[600],
        }}
        title={date.format("D")} // date
      />
      <Text
        color={focus ? colors.white : "#94A3B8"}
        style={{
          fontSize: 13,
          fontFamily: fonts[focus ? 600 : 500],
        }}
        title={date.format("MMM")} // month
      />
    </TouchableOpacity>
  );
};

export default DateSelectCard;
