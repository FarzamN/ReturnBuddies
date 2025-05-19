import React, { useEffect, useRef } from "react";
import { Animated, Image, StatusBar, View } from "react-native";
import { appImages } from "../assets";
import { globalStyle } from "../theme/globalStyle";
import { colors } from "../theme/colors";

export default function Splash() {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(1000),
    ]).start();
  }, []);

  return (
    <View style={[globalStyle.Container, globalStyle.center]}>
      <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
      <Animated.View style={{ opacity, transform: [{ scale }] }}>
        <Image source={appImages.logo} style={{ width: 200, height: 200 }} />
      </Animated.View>
    </View>
  );
}
