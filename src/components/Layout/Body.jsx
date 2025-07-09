import React from "react";
import { colors } from "../../theme/colors";
import { globalStyle } from "../../theme/globalStyle";
import { SafeAreaView, StatusBar, View } from "react-native";

const Body = ({ children, style, horizontal, purple }) => {
  return (
    <View
      style={[globalStyle.Container, { paddingHorizontal: horizontal }, style]}
    >
      <SafeAreaView
        style={{ backgroundColor: purple ? colors.purple : colors.background }}
      />
      <StatusBar
        translucent={false}
        barStyle="dark-content"
        backgroundColor={colors.background}
      />
      {children}
    </View>
  );
};

export default Body;
