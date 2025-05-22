import React from "react";
import { Text } from "../components";
import { appImages } from "../assets";
import { colors } from "../theme/colors";
import { iOS } from "../utils/constants";
import { wp } from "../theme/responsive";
import { globalStyle } from "../theme/globalStyle";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Pressable, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const PrimeryTab = (props) => {
  const { currentTab } = props;
  const { navigate } = useNavigation();
  const { bottom } = useSafeAreaInsets();

  const tabItems = [
    {
      id: 1,
      title: "Draft Items",
      path: "draftItem",
      icon: appImages.draft,
    },

    {
      id: 2,
      path: "addDraftRoute",

      title: "Plus",
      icon: appImages.plus,
      isPlus: true,
    },
    {
      id: 3,
      path: "tradeRoute",
      title: "My Pickups",
      icon: appImages.pickup,
    },
  ];
  return (
    <Animatable.View
      animation="slideInUp"
      style={[
        styles.primeryCont,
        globalStyle.space_around,
        { marginBottom: iOS ? bottom : 0 },
      ]}
    >
      {tabItems.map(({ id, title, icon, isPlus, path }) => {
        const isFocused = currentTab === title;
        return (
          <Pressable
            key={id}
            onPress={() => navigate(path)}
            style={[globalStyle.center, isPlus ? styles.plusBox : null]}
          >
            <Image
              source={icon}
              resizeMode="contain"
              tintColor={isFocused ? colors.purple : undefined}
              style={isPlus ? styles.plusImage : styles.primeryImage}
            />

            {!isPlus && (
              <Text
                style={[
                  styles.primeryText,
                  {
                    color: isFocused ? colors.purple : "#9CA3AF",
                  },
                ]}
                title={title}
              />
            )}
          </Pressable>
        );
      })}
    </Animatable.View>
  );
};

export default PrimeryTab;

const styles = StyleSheet.create({
  plusBox: {
    backgroundColor: colors.purple,
    width: 40,
    height: 40,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: -50,
  },
  primeryCont: {
    width: "100%",
    height: 75,
    alignSelf: "center",
    backgroundColor: colors.white,
    marginTop: 5,
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomWidth: 0,
  },
  primeryText: {
    fontWeight: "600",
    fontSize: wp(3),
    marginTop: 5,
  },
  plusImage: {
    width: wp(15),
    height: wp(15),
  },
  primeryImage: {
    width: wp(7),
    height: wp(7),
  },
});
