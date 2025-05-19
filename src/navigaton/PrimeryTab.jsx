import React from "react";
import { appImages } from "../assets";
import { colors } from "../theme/colors";
import { iOS } from "../utils/constants";
import { FullImage, Text } from "../components";
import { globalStyle } from "../theme/globalStyle";
import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "react-native-dynamic-vector-icons";

const PrimeryTab = (props) => {
  const { currentTab } = props;
  const { navigate } = useNavigation();
  const { bottom } = useSafeAreaInsets();

  const tabItems = [
    {
      id: 1,
      title: "Draft Items",
      path: "homeRoute",
      icon: appImages.draft,
      icon: require("../assets/images/draft.png"),
    },

    {
      id: 2,
      path: "aiRoute",
      title: "Plus",
      icon: require("../assets/images/plus.png"),

      isPlus: true,
    },
    {
      id: 3,
      path: "tradeRoute",
      title: "My Pickups",
      icon: require("../assets/images/pickup.png"),
    },
  ];
  return (
    <View
      style={[
        globalStyle.space_around,
        styles.primeryCont,
        { marginBottom: iOS ? bottom : 0 },
      ]}
    >
      {tabItems.map(({ id, title, icon, isPlus, path }) => {
        const isFocused = currentTab === title;
        return (
          <TouchableOpacity
            key={id}
            onPress={() => navigate(path)}
            style={[globalStyle.center, isPlus ? styles.plusBox : null]}
          >
            {/* <Icon
              type="Ionicons"
              name="document-text"
              color={isFocused ? colors.purple : undefined}
              size={30}
            /> */}
            <Image
              resizeMode="contain"
              source={icon}
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
          </TouchableOpacity>
        );
      })}
    </View>
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
    position: "absolute",
    bottom: 0,
    borderBottomWidth: 0,
  },
  primeryText: {
    fontWeight: "600",
    fontSize: 13,
    marginTop: 5,
  },
  plusImage: {
    width: 70,
    height: 70,
  },
  primeryImage: {
    width: 30,
    height: 30,
  },
});
