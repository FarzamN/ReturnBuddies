import React from "react";
import { Text } from "..";
import { fonts } from "../../assets";
import { iOS } from "../../utils/constants";
import { colors } from "../../theme/colors";
import { TouchableOpacity } from "react-native";
import { fontScale } from "../../theme/responsive";
import Icon from "react-native-dynamic-vector-icons";
import { globalStyle } from "../../theme/globalStyle";

const CircleCheck = (props) => {
  const { focus, onPress, title } = props;
  return (
    <TouchableOpacity style={[globalStyle.row]} onPress={onPress}>
      <Icon
        size={20}
        type={focus ? "Ionicons" : "Entypo"}
        color={focus ? colors.purple : colors.grey}
        name={focus ? "checkmark-circle" : "circle"}
      />
      <Text title={title} style={styles.checkBoxText} />
    </TouchableOpacity>
  );
};

export default CircleCheck;

const styles = {
  checkBoxText: {
    fontSize: 14,
    marginLeft: 7,
    fontFamily: fonts[400],
    top: fontScale(iOS ? 0 : 1),
  },
};
