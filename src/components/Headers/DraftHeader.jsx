import { Text } from "..";
import React from "react";
import styles from "./headerStyle";
import { useSelector } from "react-redux";
import { colors } from "../../theme/colors";
import { iOS } from "../../utils/constants";
import Icon from "react-native-dynamic-vector-icons";
import { scaleSize, wp } from "../../theme/responsive";
import { useNavigation } from "@react-navigation/native";
import { StatusBar, TouchableOpacity } from "react-native";
import { Row, Space_Between } from "../../theme/globalStyle";

const DraftHeader = (props) => {
  const { pickup } = props;
  const { navigate } = useNavigation();
  const { name, FirstLogin } = useSelector((state) => state.auth.user);

  return (
    <Space_Between
      style={{
        paddingHorizontal: wp(5),
        marginTop: iOS
          ? scaleSize(20)
          : StatusBar.currentHeight + scaleSize(20),
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
        <Icon
          size={22}
          type="Ionicons"
          color={colors.black}
          name="settings-outline"
        />
      </TouchableOpacity>
    </Space_Between>
  );
};

export default DraftHeader;
