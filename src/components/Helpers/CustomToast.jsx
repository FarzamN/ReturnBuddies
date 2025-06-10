import helperStyle from "./helperStyle";
import React from "react";
import { Text, View } from "react-native";
import Icon from "react-native-dynamic-vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../../theme/colors";
import { FONT_SIZES } from "../../theme/responsive";

const toastColors = {
  success: {
    icon: "check",
    bg: "#f6fff9",
    border: "#47C1B5",
    iconBg: "#47C1B5",
    iconType: "Feather",
  },
  error: {
    bg: "#FFF5F3",
    icon: "close",
    border: "#F3CBC4",
    iconBg: "#DF452F",
    iconType: "Ionicons",
  },
  info: {
    bg: "#F4F8FE",
    border: "#9DC0EE",
    iconBg: "#3391B6",
    icon: "information",
    iconType: "Ionicons",
  },
  warning: {
    bg: "#FFF8EC",
    border: "#F4D9AB",
    iconBg: "#FD9904",
    icon: "exclamation",
    iconType: "AntDesign",
  },
};

const CustomToast = ({ title, message, type }) => {
  const { top } = useSafeAreaInsets();

  const { bg, border, iconBg, icon, iconType } =
    toastColors[type] || toastColors.info;

  return (
    <View
      style={[
        helperStyle.toastCont,
        { borderColor: border, marginTop: top, backgroundColor: bg },
      ]}
    >
      <View style={[helperStyle.ToastIconBox, { backgroundColor: iconBg }]}>
        <Icon size={20} color={colors.white} name={icon} type={iconType} />
      </View>
      <View style={{ width: "90%" }}>
        <Text style={helperStyle.ToastText1}>{title}</Text>
        <Text
          style={[
            helperStyle.ToastText2,
            {
              fontSize: message.length > 30 ? 9 : FONT_SIZES.SMALL,
            },
          ]}
        >
          {message}
        </Text>
      </View>
    </View>
  );
};

export default CustomToast;
