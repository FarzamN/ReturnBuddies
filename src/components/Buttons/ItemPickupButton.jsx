import React from "react";
import { Text } from "..";
import styles from "./buttonStyle";
import { colors } from "../../theme/colors";
import { TouchableOpacity } from "react-native";
import { ChevronRight } from "lucide-react-native";
import { globalStyle } from "../../theme/globalStyle";

const ItemPickupButton = (props) => {
  const { title, onPress } = props;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[globalStyle.space_Between, styles.PickupCont]}
    >
      <Text style={styles.pickupTitle} title={title} />
      <ChevronRight size={20} color={colors.black} strokeWidth={3} />
    </TouchableOpacity>
  );
};

export default ItemPickupButton;
