import React from "react";
import styles from "./headerStyle";
import { AddButton, Text } from "..";
import { appImages } from "../../assets";
import { wp } from "../../theme/responsive";
import { colors } from "../../theme/colors";
import Icon from "react-native-dynamic-vector-icons";
import { useNavigation } from "@react-navigation/native";
import { globalStyle, Row } from "../../theme/globalStyle";
import { Image, TouchableOpacity, View } from "react-native";

const Header = (props) => {
  const { goBack, navigate } = useNavigation();
  const {
    title,
    flag,
    imageLogo,
    leftTitle,
    isSetting,
    addBTN,
    onPress,
    onBackPress,
  } = props;
  return (
    <View style={[globalStyle.space_Between, styles.headerCont]}>
      <Row>
        <TouchableOpacity onPress={onBackPress ? onBackPress : goBack}>
          <Icon
            type="Ionicons"
            name="arrow-back"
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
        <TouchableOpacity onPress={() => navigate("support")}>
          <Icon
            type="Ionicons"
            name="flag-outline"
            size={20}
            color={colors.black}
          />
        </TouchableOpacity>
      ) : isSetting ? (
        <TouchableOpacity onPress={() => navigate("settingRoute")}>
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
