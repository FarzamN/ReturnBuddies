import React from "react";
import styles from "./helperStyle";
import { View } from "react-native";
import { appImages } from "../../assets";
import { fontScale, wp } from "../../theme/responsive";
import { AddButton, FullImage, Text } from "..";

const Empty = (props) => {
  const { sub, title, source, isButton, onPress } = props;
  return (
    <View
      style={{
        marginTop: wp(20),
        alignItems: "center",
      }}
    >
      <FullImage
        source={source ? source : appImages.emptyDraft}
        style={{ width: wp(source ? 20 : 60), aspectRatio: 1 / 1 }}
      />
      <Text
        title={title}
        style={[
          styles.emptyTitle,
          { fontSize: source ? fontScale(14) : fontScale(18) },
        ]}
      />
      {!isButton && <Text style={styles.emptyDesc} title={sub} />}

      {isButton && <AddButton onPress={onPress} />}
    </View>
  );
};

export default Empty;
