import React from "react";
import { Text } from "..";
import styles from "./cardStyle";
import { colors } from "../../theme/colors";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-dynamic-vector-icons";
import { Space_Between } from "../../theme/globalStyle";

const PickupMethodCard = ({ data, onPress, focus }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => onPress(data.title)}
      style={[
        styles.pickupMethodCont,
        {
          borderWidth: focus ? 1 : 0,
        },
      ]}
    >
      <Space_Between>
        <Text title={data.title} style={styles.pickupMethodTitle} />
        <Icon
          size={22}
          type={focus ? "Ionicons" : "Entypo"}
          color={focus ? colors.purple : colors.grey}
          name={focus ? "checkmark-circle" : "circle"}
        />
      </Space_Between>
      <Text title={data.detail} style={styles.pickupMethodDetail} />
    </TouchableOpacity>
  );
};

export default PickupMethodCard;
