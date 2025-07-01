import React from "react";
import styles from "./helperStyle";
import { View } from "react-native";
import { appImages } from "../../assets";
import { fontScale, wp } from "../../theme/responsive";
import { AddButton, FullImage, Text } from "..";

const Empty = (props) => {
  const { sub, title, source, isButton, onPress, imageStyle, titleStyle } =
    props;
  return (
    <View
      style={[
        {
          marginTop: wp(20),
          alignItems: "center",
        },
      ]}
    >
      <FullImage
        source={source ? source : appImages.emptyDraft}
        style={[
          { width: wp(source ? 20 : 60), aspectRatio: 1 / 1 },
          imageStyle,
        ]}
      />
      <Text
        center
        title={title}
        style={[
          styles.emptyTitle,
          { fontSize: source ? fontScale(14) : fontScale(18) },
          titleStyle,
        ]}
      />
      {!isButton && <Text style={styles.emptyDesc} title={sub} />}

      {isButton && <AddButton onPress={onPress} />}
    </View>
  );
};

export default Empty;
