import { Text } from "..";
import React from "react";
import styles from "./headerStyle";
import { useSelector } from "react-redux";
import { colors } from "../../theme/colors";
import { iOS } from "../../utils/constants";
import { scaleSize, wp } from "../../theme/responsive";
import { Space_Between } from "../../theme/globalStyle";
import { useNavigation } from "@react-navigation/native";
import { StatusBar, TouchableOpacity } from "react-native";
import { DynamicIcon } from "../../utils/DynamicLucideIcon";

const DraftHeader = (props) => {
  const { pickup } = props;
  const { navigate } = useNavigation();
  const { name, FirstLogin } = useSelector((state) => state.auth.user);

  return (
    <Space_Between
      style={{
        paddingHorizontal: wp(5),
        marginTop: iOS ? scaleSize(0) : StatusBar.currentHeight + scaleSize(20),
      }}
    >
      <Text
        style={styles.nameHeader}
        width={"90%"}
        title={
          pickup
            ? "My Pickups"
            : `Welcome${FirstLogin ? "" : " back"}, ${name.split(" ").shift()}!`
        }
      />
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => navigate("settingRoute")}
      >
        <DynamicIcon size={22} color={colors.black} name="Settings" />
      </TouchableOpacity>
    </Space_Between>
  );
};

export default DraftHeader;
