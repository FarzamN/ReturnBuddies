import { View } from "react-native";
import React from "react";
import styles from "./modalStyle";
import Modal from "react-native-modal";
import { Height } from "../../theme/globalStyle";

const DatePicker = ({ visible, onClose, onPress }) => {
  return (
    <Modal
      isVisible={visible}
      animationIn="fadeInUp"
      animationOut="fadeOut"
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      style={styles.modalContainer}
    >
      <View style={styles.modalBox}>
        <Height />
        <Height />
      </View>
    </Modal>
  );
};

export default DatePicker;
