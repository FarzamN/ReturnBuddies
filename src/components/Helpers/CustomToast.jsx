import React from "react";
import helperStyle from "./helperStyle";
import { Text, View } from "react-native";
import { colors } from "../../theme/colors";
import { fontScale } from "../../theme/responsive";
import DynamicIcon from "../../utils/DynamicLucideIcon";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CustomToast = ({ title, message }) => {
  const { top: marginTop } = useSafeAreaInsets();

  return (
    <View style={[helperStyle.toastCont, { marginTop }]}>
      <View style={helperStyle.ToastIconBox}>
        <DynamicIcon size={20} color={colors.white} name="CircleX" />
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
          {/* {message} */}
          Error
        </Text>
      </View>
    </View>
  );
};

export default CustomToast;
