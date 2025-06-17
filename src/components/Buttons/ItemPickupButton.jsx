import { TouchableOpacity } from "react-native";
import React from "react";
import { Text } from "..";
import styles from "./buttonStyle";
import { globalStyle } from "../../theme/globalStyle";
import Icon from "react-native-dynamic-vector-icons";
import { colors } from "../../theme/colors";

const ItemPickupButton = (props) => {
  const { title } = props;
  return (
    <TouchableOpacity style={[globalStyle.space_Between, styles.PickupCont]}>
      <Text title={title} />
      <Icon type="Entypo" name="chevron-right" size={20} color={colors.black} />
    </TouchableOpacity>
  );
};

export default ItemPickupButton;
