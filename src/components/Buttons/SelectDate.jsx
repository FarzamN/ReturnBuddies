import { TouchableOpacity } from "react-native";
import React from "react";
import { Text } from "..";
import { colors } from "../../theme/colors";

const SelectDate = (props) => {
  const { title, isError } = props;
  return (
    <TouchableOpacity style={[{}]}>
      <Text title={title} color={isError ? "red" : colors.black} />
    </TouchableOpacity>
  );
};

export default SelectDate;
