// hooks/useFreezeScreen.js
import { useEffect } from "react";
import { BackHandler, View, StyleSheet, StatusBar } from "react-native";

export const useFreezeScreen = (isPending) => {
  useEffect(() => {
    if (!isPending) return;

    const backAction = () => {
      return true; // Prevent going back when loading
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [isPending]);

  const Overlay = ({ children }) => {
    if (!isPending) return null;

    return (
      <View style={overlay}>
        {children || (
          <>
            <StatusBar backgroundColor="#E0E0E0" translucent={false} />
          </>
        )}
      </View>
    );
  };

  return { Overlay };
};

const overlay = {
  ...StyleSheet.absoluteFillObject,
  backgroundColor: "rgba(0,0,0,0.1)",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 999,
};
