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
      <View
        style={{
          flexDirection: "row",
          justifyContent: noImage ? "center" : "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Row style={{}}>
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
                  width: "100%",
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
      </View>
    </TouchableOpacity>
  );
};

export default LabelPickerButton;
