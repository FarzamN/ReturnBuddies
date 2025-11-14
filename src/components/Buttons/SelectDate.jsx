import React from "react";
import { Text } from "..";
import styles from "./buttonStyle";
import { colors } from "../../theme/colors";
import { TouchableOpacity } from "react-native";
import { globalStyle } from "../../theme/globalStyle";
import DynamicIcon from "../../utils/DynamicLucideIcon";

const SelectDate = (props) => {
  const { title, isError, onPress } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        globalStyle.row,
        styles.selectDate,
        globalStyle.center,
        {
          borderStyle: isError ? "dashed" : "solid",
          borderColor: isError ? "red" : "#EFE1F7",
          backgroundColor: isError ? colors.background : "#EFE1F7",
        },
      ]}
    >
      <DynamicIcon
        size={20}
        name="CalendarRange"
        style={{ marginRight: 10 }}
        color={isError ? "red" : colors.black}
      />
      <Text
        title={title}
        style={{ fontSize: 12 }}
        color={isError ? "red" : colors.black}
      />
    </TouchableOpacity>
  );
};

export default SelectDate;
