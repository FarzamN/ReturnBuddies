import React from "react";
import { Text } from "..";
import styles from "./buttonStyle";
import { colors } from "../../theme/colors";
import { TouchableOpacity } from "react-native";
import { globalStyle } from "../../theme/globalStyle";
import { DynamicIcon } from "../../utils/DynamicLucideIcon";

const ItemPickupButton = (props) => {
  const { title, onPress } = props;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[globalStyle.space_Between, styles.PickupCont]}
    >
      <Text style={styles.pickupTitle} title={title} />
      <DynamicIcon
        size={20}
        strokeWidth={3}
        name="ChevronRight"
        color={colors.black}
      />
    </TouchableOpacity>
  );
};

export default ItemPickupButton;
