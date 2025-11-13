import { Text } from "..";
import React from "react";
import { Plus } from "lucide-react-native";
import { colors } from "../../theme/colors";
import { TouchableOpacity } from "react-native";
import { globalStyle } from "../../theme/globalStyle";
import buttonStyle from "../../screens/user/userStyle";

const AddButton = ({ onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[
        globalStyle.row,
        globalStyle.ph10,
        buttonStyle.button,
        { width: undefined, borderRadius: 50 },
      ]}
    >
      <Plus size={17} color={colors.purple} />
      <Text
        title=" Add"
        color={colors.purple}
        textStyle={buttonStyle.buttonText}
      />
    </TouchableOpacity>
  );
};

export default AddButton;
