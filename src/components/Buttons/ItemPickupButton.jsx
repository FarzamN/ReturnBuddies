import { TouchableOpacity } from "react-native";
import React from "react";
import { Text } from "..";
import styles from "./buttonStyle";
import { globalStyle } from "../../theme/globalStyle";
import Icon from "react-native-dynamic-vector-icons";
import { colors } from "../../theme/colors";
import { useSelector } from "react-redux";

const ItemPickupButton = (props) => {
  const { title, onPress } = props;
  const { draftSelectedRetun } = useSelector((state) => state.draft);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[globalStyle.space_Between, styles.PickupCont]}
    >
      <Text style={styles.pickupTitle} title={title} />
      <Icon type="Entypo" name="chevron-right" size={20} color={colors.black} />
    </TouchableOpacity>
  );
};

export default ItemPickupButton;
