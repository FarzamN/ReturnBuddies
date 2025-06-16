import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Icon from "react-native-dynamic-vector-icons";
import styles from "./buttonStyle";
import { globalStyle, Row, Space_Between } from "../../theme/globalStyle";
import { FullImage } from "..";
import { appImages } from "../../assets";

const LabelPickerButton = (props) => {
  const { onPress, source, title, weight, noImage, isError } = props;
  const type = title.slice(title.lastIndexOf(".") + 1);
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
      <View
        style={{
          width: "100%",
          alignItems: "center",
          flexDirection: "row",
          justifyContent: noImage ? "center" : "space-between",
        }}
      >
        <Row style={{}}>
          <FullImage
            source={type == "pdf" ? appImages.pdf : source}
            style={[
              styles.ImageIcon,
              {
                width: 27,
                height: 27,
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
