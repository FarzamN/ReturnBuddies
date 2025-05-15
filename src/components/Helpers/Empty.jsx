import { View } from "react-native";
import React from "react";
import { FullImage, Text } from "..";
import { appImages } from "../../assets";
import { wp } from "../../theme/responsive";
import styles from "./helperStyle";

const Empty = (props) => {
  const { sub, title } = props;
  return (
    <View
      style={{
        alignItems: "center",
        marginTop: wp(20),
      }}
    >
      <FullImage
        source={appImages.emptyDraft}
        style={{ width: wp(60), height: wp(60) }}
      />
      <Text
        title={title}
        style={[styles.emptyTitle, { marginVertical: wp(5) }]}
      />

      <Text style={styles.emptyDesc} title={sub} />
    </View>
  );
};

export default Empty;
