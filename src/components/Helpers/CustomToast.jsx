import React from "react";
import helperStyle from "./helperStyle";
import { Text, View } from "react-native";
import { colors } from "../../theme/colors";
import { fontScale } from "../../theme/responsive";
import Icon from "react-native-dynamic-vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { toastColors } from "../../utils/data";

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
        <Text
          style={[
            helperStyle.ToastText1,
            {
              fontSize: title.length < 30 ? fontScale(12) : fontScale(8),
            },
          ]}
        >
          {title}
        </Text>
        <Text
          style={[
            helperStyle.ToastText2,
            {
              fontSize: message.length < 30 ? fontScale(10) : fontScale(8),
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
