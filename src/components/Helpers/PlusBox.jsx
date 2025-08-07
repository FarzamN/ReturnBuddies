import React from "react";
import styles from "./helperStyle";
import { colors } from "../../theme/colors";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-dynamic-vector-icons";

const PlusBox = (props) => {
  const { onPress, style } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[styles.PlusCont, style]}
    >
      <Icon name="plus" size={25} color={colors.white} type={"Entypo"} />
    </TouchableOpacity>
  );
};

export default PlusBox;
