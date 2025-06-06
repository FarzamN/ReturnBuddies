import React from "react";
import { Text } from "../components";
import { appImages } from "../assets";
import { colors } from "../theme/colors";
import { android, iOS } from "../utils/constants";
import { wp } from "../theme/responsive";
import { globalStyle } from "../theme/globalStyle";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Pressable, Image, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const PrimeryTab = (props) => {
  const { currentTab } = props;
  const { navigate } = useNavigation();
  const { bottom } = useSafeAreaInsets();

  const tabItems = [
    {
      id: 1,
      title: "Home",
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
    <>
      <View style={[styles.primeryCont, globalStyle.space_around]}>
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
      </View>
      <View style={{ height: bottom, backgroundColor: colors.white }} />
    </>
  );
};

export default PrimeryTab;

const styles = StyleSheet.create({
  plusBox: {
    width: 40,
    height: 40,
    marginTop: -50,
    borderRadius: 50,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.purple,
  },
  primeryCont: {
    width: "100%",
    elevation: 10,
    shadowRadius: 5,
    shadowOpacity: 0.1,
    flexDirection: "row",
    alignItems: "center",
    height: android && 75,
    paddingHorizontal: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: colors.white,
    justifyContent: "space-around",
  },
  primeryText: {
    marginTop: 5,
    fontSize: wp(3),
    fontWeight: "600",
  },
  plusImage: {
    width: wp(15),
    height: wp(15),
  },
  primeryImage: {
    width: wp(9),
    height: wp(9),
  },
});
