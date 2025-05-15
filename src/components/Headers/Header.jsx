import { Text } from "..";
import React from "react";
import styles from "./headerStyle";
import { appImages } from "../../assets";
import { wp } from "../../theme/responsive";
import { colors } from "../../theme/colors";
import { globalStyle } from "../../theme/globalStyle";
import Icon from "react-native-dynamic-vector-icons";
import { Image, TouchableOpacity, View } from "react-native";
import { iOS } from "../../utils/constants";
import { useNavigation } from "@react-navigation/native";

const Header = ({ title, flag, imageLogo }) => {
  const { goBack, navigate } = useNavigation();

  return (
    <View style={[globalStyle.space_Between, styles.headerCont]}>
      <TouchableOpacity onPress={goBack}>
        <Icon
          type="Ionicons"
          name="arrow-back"
          size={20}
          color={colors.black}
        />
      </TouchableOpacity>
      {title && <Text style={styles.leftLabel} title={title} />}
      {imageLogo && (
        <Image
          resizeMode="contain"
          source={appImages.logoFullName}
          style={{ width: wp(38), height: wp(4) }}
        />
      )}
      {flag ? (
        <TouchableOpacity onPress={() => navigate("contactUS")}>
          <Icon
            type="Ionicons"
            name="flag-outline"
            size={20}
            color={colors.black}
          />
        </TouchableOpacity>
      ) : (
        <View />
      )}
    </View>
  );
};

export default Header;
