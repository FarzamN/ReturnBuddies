import { Text, TouchableOpacity } from "react-native";
import React from "react";
import Icon from "react-native-dynamic-vector-icons";
import styles from "./buttonStyle";
import { globalStyle, Row, Space_Between } from "../../theme/globalStyle";
import { FullImage } from "..";

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
                width: noImage ? 25 : 40,
                height: noImage ? 25 : 40,
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
        {!noImage && <Icon name="edit" type="AntDesign" size={20} />}
      </Space_Between>
    </TouchableOpacity>
  );
};

export default ImageButton;
