import React from "react";
import { FullImage } from "..";
import styles from "./buttonStyle";
import { appImages } from "../../assets";
import responsive from "../../theme/responsive";
import { Text, TouchableOpacity } from "react-native";
import { globalStyle, Row, Space_Between } from "../../theme/globalStyle";

const ImageButton = (props) => {
  const { onPress, source, title, noImage, isError } = props;
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[
        styles.ImageButton,
        globalStyle.row,
        {
          borderColor: isError ? "red" : "#D1D5DB",
        },
      ]}
    >
      <Space_Between>
        <Row>
          <FullImage
            radius={10}
            source={source}
            resizeMode="cover"
            style={[
              styles.ImageIcon,
              {
                width: noImage ? responsive.width(25) : responsive.width(40),
                height: noImage ? responsive.width(25) : responsive.width(40),
              },
            ]}
          />
          <Text
            style={[
              styles.ImageText,
              {
                width: noImage ? "100%" : "75%",
              },
            ]}
          >
            {title}
          </Text>
        </Row>
        {!noImage && (
          <FullImage source={appImages.edit} style={globalStyle.iconImage} />
        )}
      </Space_Between>
    </TouchableOpacity>
  );
};

export default ImageButton;
