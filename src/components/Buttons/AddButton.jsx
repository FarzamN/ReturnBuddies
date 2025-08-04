import { Text } from "..";
import React from "react";
import { colors } from "../../theme/colors";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-dynamic-vector-icons";
import { globalStyle } from "../../theme/globalStyle";
import buttonStyle from "../../screens/user/userStyle";

const AddButton = ({ onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        globalStyle.row,
        globalStyle.ph10,
        buttonStyle.button,
        { width: undefined, borderRadius: 50 },
      ]}
    >
      <Icon name="plus-square" type="Feather" color={colors.purple} size={15} />
      <Text
        title=" Add"
        color={colors.purple}
        textStyle={buttonStyle.buttonText}
      />
    </TouchableOpacity>
  );
};

export default AddButton;
