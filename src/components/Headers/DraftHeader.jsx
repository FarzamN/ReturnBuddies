import React from "react";
import { Row, Space_Between } from "../../theme/globalStyle";
import FullImage from "../Helpers/FullImage";
import { appImages } from "../../assets";
import styles from "./headerStyle";
import Icon from "react-native-dynamic-vector-icons";
import { colors } from "../../theme/colors";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { wp } from "../../theme/responsive";
import { android } from "../../utils/constants";

const DraftHeader = () => {
  const { navigate } = useNavigation();
  return (
    <Space_Between
      style={{ paddingHorizontal: wp(5), marginTop: android ? 20 : 0 }}
    >
      <FullImage
        color={colors.background}
        source={appImages.logo}
        style={styles.logoStyle}
      />
      <Row>
        {[
          // {
          //   icon: "bell",
          //   path: "notification",
          // },
          {
            icon: "settings-outline",
            path: "settingRoute",
          },
        ].map((item) => (
          <TouchableOpacity key={item.icon} onPress={() => navigate(item.path)}>
            <Icon
              type="Ionicons"
              name={item.icon}
              size={22}
              color={colors.black}
              // style={styles.iconCircle}
            />
          </TouchableOpacity>
        ))}
      </Row>
    </Space_Between>
  );
};

export default DraftHeader;
