import React, { useState } from "react";
import { colors } from "../../theme/colors";
import Icon from "react-native-dynamic-vector-icons";
import { globalStyle, Space_Between } from "../../theme/globalStyle";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Text, Tootlip } from "..";

const Oversize = ({ focus, onPress }) => {
  const [showTootip, setTooltip] = useState(false);
  return (
    <Space_Between>
      <TouchableOpacity onPress={onPress} style={globalStyle.row}>
        <Icon
          size={22}
          style={{ marginRight: 5 }}
          color={focus ? colors.purple : colors.grey}
          type={focus ? "Ionicons" : "MaterialIcons"}
          name={focus ? "checkbox" : "check-box-outline-blank"}
        />
        <Text title={"Oversized Item?"} />
      </TouchableOpacity>

      <Tootlip
        visible={showTootip}
        text="Oversize means oversize"
        onClose={() => setTooltip(false)}
      >
        <TouchableOpacity onPress={() => setTooltip(true)}>
          <Icon
            size={25}
            color="#000"
            type="MaterialCommunityIcons"
            name="alert-decagram-outline"
          />
        </TouchableOpacity>
      </Tootlip>
    </Space_Between>
  );
};

export default Oversize;
