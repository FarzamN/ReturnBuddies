import React from "react";
import styles from "./buttonStyle";
import { FullImage, Text } from "..";
import { appImages } from "../../assets";
import responsive, { scaleSize, width } from "../../theme/responsive";
import { TouchableOpacity, View } from "react-native";
import { globalStyle, Row } from "../../theme/globalStyle";

const LabelPickerButton = (props) => {
  const { onPress, source, title, weight, noImage, isError, isUrl } = props;
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
          alignItems: "center",
          flexDirection: "row",
          justifyContent: noImage ? "center" : "space-between",
        }}
      >
        <Row>
          <FullImage
            isUrl={isUrl}
            source={type == "pdf" ? appImages.pdf : source}
            resizeMode={noImage ? "cover" : "contain"}
            style={[
              styles.ImageIcon,
              {
                borderRadius: scaleSize(type == "pdf" ? 0 : 12),

                width: responsive.width(noImage ? 30 : 40),
                height: responsive.width(noImage ? 30 : 40),
              },
            ]}
          />
          <View>
            <Text
              title={title}
              numberOfLines={2}
              width={noImage ? "100%" : width / 1.7}
              style={styles.uploadText}
            />

            {weight && (
              <Text
                style={[styles.ImageText, { fontWeight: "500" }]}
                title={`${weight} kb •`}
              />
            )}
          </View>
        </Row>
        {!noImage && (
          <FullImage source={appImages.edit} style={globalStyle.iconImage} />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default LabelPickerButton;
