import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { wp } from "../../theme/responsive";
import { appImages } from "../../assets";
import { globalStyle } from "../../theme/globalStyle";
import styles from "./headerStyle";
import { colors } from "../../theme/colors";
import Icon from "react-native-dynamic-vector-icons";

const Header = ({
  imageLogo,
  leftIcon,
  onleftIconPress,
  title,
  rightIcon,
  onrightIconPress,
}) => {
  return (
    <View style={[globalStyle.space_Between, styles.headerCont]}>
      {leftIcon ? (
        <TouchableOpacity onPress={onleftIconPress}>
          <Icon
            type="Ionicons"
            name="arrow-back"
            size={20}
            color={colors.black}
          />
        </TouchableOpacity>
      ) : (
        <Text></Text>
      )}
      {title && <Text style={styles.leftLabel}>{title}</Text>}
      {imageLogo && (
        <Image
          source={appImages.logoFullName}
          style={{ width: wp(38), height: wp(4) }}
        />
      )}
      {rightIcon ? (
        <TouchableOpacity onPress={onrightIconPress}>
          <Icon
            type="Ionicons"
            name="flag-outline"
            size={20}
            color={colors.black}
          />
        </TouchableOpacity>
      ) : (
        <Text></Text>
      )}
    </View>
  );
};

export default Header;
