import React from "react";
import { colors } from "../../theme/colors";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-dynamic-vector-icons";
import styles from "./helperStyle";

const PlusBox = (props) => {
  const { onPress, style } = props;
  return (
    <TouchableOpacity onPress={onPress} style={[styles.PlusCont, style]}>
      <Icon name="plus" size={25} color={colors.white} type={"Entypo"} />
    </TouchableOpacity>
  );
};

export default PlusBox;
