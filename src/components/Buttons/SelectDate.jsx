import React from "react";
import { Text } from "..";
import styles from "./buttonStyle";
import { fonts } from "../../assets";
import { colors } from "../../theme/colors";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-dynamic-vector-icons";
import { globalStyle } from "../../theme/globalStyle";

const SelectDate = (props) => {
  const { title, isError, onPress } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        globalStyle.row,
        globalStyle.center,
        styles.selectDate,
        {
          backgroundColor: isError ? colors.background : "#EFE1F7",
          borderStyle: isError ? "dashed" : "solid",
          borderColor: isError ? "red" : "#EFE1F7",
        },
      ]}
    >
      <Icon
        type="Ionicons"
        name="calendar-outline"
        size={20}
        color={isError ? "red" : colors.black}
        style={{ marginRight: 10 }}
      />
      <Text
        title={title}
        style={{ fontFamily: fonts[500] }}
        color={isError ? "red" : colors.black}
      />
    </TouchableOpacity>
  );
};

export default SelectDate;
