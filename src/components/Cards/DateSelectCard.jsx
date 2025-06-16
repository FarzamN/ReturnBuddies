import { TouchableOpacity } from "react-native";
import React from "react";
import { Text } from "..";
import { colors } from "../../theme/colors";

const DateSelectCard = ({ date, onPress, focus }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flex: 1,
        alignItems: "center",
        padding: 15,
        borderRadius: 12,
        marginHorizontal: 5,
        backgroundColor: focus ? colors.purple : "#FFFFFF",
      }}
    >
      <Text
        color={focus ? colors.white : "#94A3B8"}
        style={{
          fontWeight: "600",
          fontSize: 14,
        }}
        title={date.format("ddd")} // Days
      />
      <Text
        color={focus ? colors.white : colors.purple}
        style={{
          fontSize: 22,
          fontWeight: "700",
          marginVertical: 10,
        }}
        title={date.format("D")} // date
      />
      <Text
        color={focus ? colors.white : "#94A3B8"}
        style={{
          fontSize: 15,
          fontWeight: focus ? "600" : "500",
        }}
        title={date.format("MMM")} // month
      />
    </TouchableOpacity>
  );
};

export default DateSelectCard;
