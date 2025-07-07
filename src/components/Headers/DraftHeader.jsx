import React from "react";
import { Row, Space_Between } from "../../theme/globalStyle";
import styles from "./headerStyle";
import Icon from "react-native-dynamic-vector-icons";
import { colors } from "../../theme/colors";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { wp } from "../../theme/responsive";
import { android } from "../../utils/constants";
import { Text } from "..";
import { useSelector } from "react-redux";

const DraftHeader = (props) => {
  const { pickup } = props;
  const { navigate } = useNavigation();
  const { name } = useSelector((state) => state.auth.user);

  return (
    <Space_Between
      style={{ paddingHorizontal: wp(5), marginTop: android ? 20 : 0 }}
    >
      <Text
        style={styles.nameHeader}
        title={pickup ? "My Pickups" : `Welcome, ${name}!`}
      />
      <Row>
        <TouchableOpacity onPress={() => navigate("settingRoute")}>
          <Icon
            size={22}
            type="Ionicons"
            color={colors.black}
            name="settings-outline"
          />
        </TouchableOpacity>
      </Row>
    </Space_Between>
  );
};

export default DraftHeader;
