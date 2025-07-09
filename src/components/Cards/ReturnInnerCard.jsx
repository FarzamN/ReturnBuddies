import React from "react";
import moment from "moment";
import styles from "./cardStyle";
import { View } from "react-native";
import { Text, FullImage } from "..";
import { width } from "../../theme/responsive";
import { colors } from "../../theme/colors";

const ItemsToBePickedupCard = ({ data, background }) => {
  return (
    <View
      style={[
        styles.sectionCard,
        { backgroundColor: background || colors.background },
      ]}
    >
      <FullImage
        isUrl
        radius={10}
        source={data.thumbnail}
        style={styles.sectionImage}
      />
      <View style={{ flex: 1 }}>
        <Text
          width={width / 1.7}
          title={data.productName}
          style={styles.sectionTitle}
        />

        <Text
          width={width / 1.7}
          style={[styles.sectionDate]}
          title={`Added on ${moment(data.created_at).format("MMMM DD")}`}
        />
      </View>
    </View>
  );
};

export default ItemsToBePickedupCard;
