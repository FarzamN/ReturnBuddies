import React from "react";
import { FullImage } from "..";
import styles from "./buttonStyle";
import { appImages, fonts } from "../../assets";
import { colors } from "../../theme/colors";
import { globalStyle, Row } from "../../theme/globalStyle";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

const MainButton = (props) => {
  const {
    load,
    style,
    title,
    onPress,
    disabled,
    marginTop,
    textStyle,
    social,
    apple,
  } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
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
              Login with {apple ? "Apple" : "Google"}
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
