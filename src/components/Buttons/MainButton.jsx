import React from "react";
import { FullImage } from "..";
import styles from "./buttonStyle";
import { colors } from "../../theme/colors";
import { appImages, fonts } from "../../assets";
import { globalStyle, Row } from "../../theme/globalStyle";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

const MainButton = (props) => {
  const {
    load,
    style,
    title,
    apple,
    social,
    onPress,
    disabled,
    marginTop,
    textStyle,
  } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      disabled={load || disabled}
      style={[
        globalStyle.row,
        styles.containerStyle,
        {
          marginTop: marginTop,
          borderColor: "#F7F7FC",
          backgroundColor: social
            ? colors.white
            : load || disabled
            ? "#BEBEBE"
            : colors.purple,
        },
        style,
      ]}
    >
      {social ? (
        <>
          <Row>
            <FullImage
              source={apple ? appImages.apple : appImages.google}
              style={styles.socialImage}
            />
            <Text
              style={[
                styles.font,
                { color: colors.black, fontFamily: fonts[500] },
              ]}
            >
              {title} with {apple ? "Apple" : "Google"}
            </Text>
          </Row>
        </>
      ) : (
        <>
          {load && (
            <ActivityIndicator
              color={colors.white}
              style={{ marginRight: 7 }}
            />
          )}
          <Text style={[styles.font, textStyle]}>
            {load ? "Loading..." : title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

export default MainButton;
