import React from "react";
import { TouchableOpacity } from "react-native";
import { Text } from "..";
import styles from "./cardStyle";
import { colors } from "../../theme/colors";
import { Space_Between } from "../../theme/globalStyle";
import DynamicIcon from "../../utils/DynamicLucideIcon";

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
        <DynamicIcon
          name={focus ? "CheckCircle2" : "Circle"}
          size={22}
          color={focus ? colors.purple : colors.grey}
        />
      </Space_Between>
      <Text title={data.detail} style={styles.pickupMethodDetail} />
    </TouchableOpacity>
  );
};

export default PickupMethodCard;
