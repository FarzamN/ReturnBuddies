import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { colors } from "../../theme/colors";
import Icon from "react-native-dynamic-vector-icons";
import { globalStyle } from "../../theme/globalStyle";
import { Text } from "..";
import { fontScale } from "../../theme/responsive";
import { fonts } from "../../assets";

const CircleCheck = ({ focus, onPress, title }) => {
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

const styles = StyleSheet.create({
  checkBoxText: {
    top: fontScale(1),
    marginLeft: 7,
    width: "90%",
    fontFamily: fonts[400],
    fontSize: fontScale(13),
  },
});
