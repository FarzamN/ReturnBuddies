import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Modal from "react-native-modal";
import styles from "./modalStyle";
import { globalStyle, Height } from "../../theme/globalStyle";
import { MainButton } from "..";
import Icon from "react-native-dynamic-vector-icons";
import { colors } from "../../theme/colors";
import { fonts } from "../../assets";
import { fontScale } from "../../theme/responsive";

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
            onPress={() => toggleCheck(index)}
            style={[globalStyle.row, { marginBottom: 10 }]}
          >
            <Icon
              type="Ionicons"
              name={checked[index] ? "radio-button-on" : "radio-button-off"}
              size={22}
              color={colors.purple}
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
