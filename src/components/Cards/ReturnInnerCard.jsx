import React from "react";
import moment from "moment";
import { Text, FullImage } from "..";
import { View } from "react-native";
import styles from "./cardStyle";
import { width } from "../../theme/responsive";

const ItemsToBePickedupCard = ({ source, title, created_at }) => {
  return (
    <View style={styles.sectionCard}>
      <FullImage
        isUrl
        radius={10}
        style={styles.sectionImage}
        source={source}
        //
      />
      <View style={{ flex: 1 }}>
        <Text
          width={width / 1.7}
          style={styles.sectionTitle}
          title={title}
          //
        />

        <Text
          style={[styles.sectionDate]}
          width={width / 1.7}
          title={`Added on ${moment(created_at).format("MMMM DD")}`}
          //   title={`Added on ${moment(item.created_at).format(
          //     "MMMM DD"
          //   )}`}
        />
      </View>
    </View>
  );
};

export default ItemsToBePickedupCard;
