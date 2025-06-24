import { Keyboard } from "react-native";
import { useEffect, useState } from "react";

export const useIskeyboard = () => {
  const [isKeyboard, setIsKeyboard] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => setIsKeyboard(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => setIsKeyboard(false)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return {
    isKeyboard,
  };
};
