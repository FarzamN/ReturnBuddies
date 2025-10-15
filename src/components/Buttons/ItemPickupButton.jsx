import React from "react";
import { Text } from "..";
import styles from "./buttonStyle";
import { useSelector } from "react-redux";
import { colors } from "../../theme/colors";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-dynamic-vector-icons";
import { globalStyle } from "../../theme/globalStyle";

const ItemPickupButton = (props) => {
  const { title, onPress } = props;
  const { draftSelectedRetun } = useSelector((state) => state.draft);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[globalStyle.space_Between, styles.PickupCont]}
    >
      <Text style={styles.pickupTitle} title={title} />
      <Icon type="Entypo" name="chevron-right" size={20} color={colors.black} />
    </TouchableOpacity>
  );
};

export default ItemPickupButton;
