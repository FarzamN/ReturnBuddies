import React from "react";
import { FullImage } from "..";
import styles from "./buttonStyle";
import { Text, TouchableOpacity } from "react-native";
import Icon from "react-native-dynamic-vector-icons";
import { globalStyle, Row, Space_Between } from "../../theme/globalStyle";
import responsive from "../../theme/responsive";
import { appImages } from "../../assets";

const ImageButton = (props) => {
  const { onPress, source, title, noImage, isError } = props;
  return (
    <TouchableOpacity
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
            source={source}
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
