import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Icon from "react-native-dynamic-vector-icons";
import styles from "./buttonStyle";
import { globalStyle, Row, Space_Between } from "../../theme/globalStyle";
import { FullImage } from "..";

const LabelPickerButton = (props) => {
  const { onPress, source, title, weight, noImage, isError } = props;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.ImageButton,
        globalStyle.row,
        {
          //   justifyContent: "center",
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
                width: 40,
                height: 40,
              },
            ]}
          />
          <View>
            <Text
              style={[
                styles.uploadText,
                {
                  width: noImage ? "100%" : "75%",
                },
              ]}
            >
              {title}
            </Text>
            {weight && (
              <Text style={[styles.ImageText, { fontWeight: "500" }]}>
                {weight} kb •
              </Text>
            )}
          </View>
        </Row>
        {!noImage && <Icon name="edit" type="AntDesign" size={20} />}
      </Space_Between>
    </TouchableOpacity>
  );
};

export default LabelPickerButton;
