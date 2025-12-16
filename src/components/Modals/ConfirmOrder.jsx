import { MainButton } from "..";
import styles from "./modalStyle";
import Modal from "react-native-modal";
import { colors } from "../../theme/colors";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { DynamicIcon } from "../../utils/DynamicLucideIcon";
import { globalStyle, Height } from "../../theme/globalStyle";

const ConfirmOrder = ({ visible, onClose, onPress, load }) => {
  const agreements = [
    "I confirm I have a valid return shipping label for this item.",
    "I accept that Returnbuddies is not liable for items deemed non-returnable.",
  ];
  const [checked, setChecked] = useState([]);

  useEffect(() => {
    if (!visible) setChecked(Array(agreements.length).fill(false));
  }, [visible, agreements.length]);

  const toggleCheck = (index) => {
    const newChecked = [...checked];
    newChecked[index] = !newChecked[index];
    setChecked(newChecked);
  };

  const allChecked = checked.every((val) => val);

  return (
    <Modal
      isVisible={visible}
      statusBarTranslucent
      animationIn="fadeInUp"
      animationOut="fadeOut"
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      style={styles.modalContainer}
    >
      <View style={styles.modalBox}>
        <Height />
        <Height />

        {agreements.map((text, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.7}
            onPress={() => toggleCheck(index)}
            style={[globalStyle.row, { marginBottom: 10 }]}
          >
            <DynamicIcon
              name={checked[index] ? "CircleCheck" : "Circle"}
              size={22}
              color={checked[index] ? colors.purple : "#E6E4E0"}
            />
            <Text style={styles.confirmationText}>{text}</Text>
          </TouchableOpacity>
        ))}
        <Height />
        <MainButton
          title={"Confirm"}
          onPress={onPress}
          load={load}
          disabled={!allChecked}
        />
      </View>
    </Modal>
  );
};

export default ConfirmOrder;
