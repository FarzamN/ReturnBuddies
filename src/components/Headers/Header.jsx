import React from "react";
import styles from "./headerStyle";
import { AddButton, Text } from "..";
import { appImages } from "../../assets";
import { wp } from "../../theme/responsive";
import { colors } from "../../theme/colors";
import { useNavigation } from "@react-navigation/native";
import { globalStyle, Row } from "../../theme/globalStyle";
import { Image, TouchableOpacity, View } from "react-native";
import DynamicIcon from "../../utils/DynamicLucideIcon";

const Header = (props) => {
  const { goBack, navigate } = useNavigation();
  const {
    flag,
    title,
    addBTN,
    onPress,
    imageLogo,
    leftTitle,
    isSetting,
    onBackPress,
  } = props;
  return (
    <View style={[globalStyle.space_Between, styles.headerCont]}>
      <Row>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onBackPress ? onBackPress : goBack}
        >
          <DynamicIcon
            strokeWidth={2}
            name="ArrowLeft"
            size={20}
            color={colors.black}
          />
        </TouchableOpacity>
        {leftTitle && (
          <Text
            style={[styles.leftLabel, { marginLeft: wp(2) }]}
            title={leftTitle}
          />
        )}
      </Row>
      {title && <Text style={styles.leftLabel} title={title} />}

      {imageLogo && (
        <Image
          resizeMode="contain"
          source={appImages.logoFullName}
          style={{ width: wp(38), height: wp(4) }}
        />
      )}
      {flag ? (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigate("support")}
        >
          <Icon
            type="Ionicons"
            name="flag-outline"
            size={20}
            color={colors.black}
          />
        </TouchableOpacity>
      ) : isSetting ? (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigate("settingRoute")}
        >
          <Icon
            size={22}
            type="Ionicons"
            color={colors.black}
            name={"settings-outline"}
          />
        </TouchableOpacity>
      ) : addBTN ? (
        <AddButton onPress={onPress} />
      ) : (
        <View style={{ width: 20 }} />
      )}
    </View>
  );
};

export default Header;
