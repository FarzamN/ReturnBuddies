import React from "react";
import moment from "moment";
import styles from "./cardStyle";
import { View } from "react-native";
import { Text, FullImage } from "..";
import { colors } from "../../theme/colors";
import { width } from "../../theme/responsive";

const ItemsToBePickedupCard = ({ data }) => {
  return (
    <View style={[styles.sectionCard, { backgroundColor: colors.background }]}>
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
