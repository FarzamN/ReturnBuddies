import { View, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Modal from "react-native-modal";
import { Text } from "..";
import { Height, Space_evenly } from "../../theme/globalStyle";
import { fontScale, scaleSize } from "../../theme/responsive";
import { fonts } from "../../assets";
import { colors } from "../../theme/colors";
import { toastColors } from "../../utils/data";

const CustomAlert = (props) => {
  const {
    show,
    title = "Are you sure?",
    message,
    cancelText = "Cancel",
    confirmText = "Delete",
    onCancelPressed,
    onConfirmPressed,
    type = "error",
    showProgress,
  } = props;

  const { bg, border, iconBg, icon, iconType } =
    toastColors[type] || toastColors.info;

  return (
    <Modal
      isVisible={show}
      animationIn="fadeIn"
      animationOut="fadeOut"
      onBackdropPress={onCancelPressed}
      onBackButtonPress={onCancelPressed}
      backdropOpacity={0.5}
      style={styles.modalContainer}
    >
      <View style={[styles.modalContent, { borderColor: border }]}>
        <Text style={styles.title} title={title} />
        <Height height={10} />
        <Text style={styles.message} center title={message} />
        <Height />
        <Space_evenly>
          <TouchableOpacity
            style={[
              styles.ButtonBox,
              {
                backgroundColor: colors.success,
              },
            ]}
            onPress={onCancelPressed}
          >
            <Text style={styles.ButtonText} title={cancelText} />
          </TouchableOpacity>
          <TouchableOpacity
            disabled={showProgress}
            style={[
              styles.ButtonBox,
              {
                backgroundColor: iconBg,
              },
            ]}
            onPress={onConfirmPressed}
          >
            <Text
              style={styles.ButtonText}
              title={showProgress ? "Loading..." : confirmText}
            />
          </TouchableOpacity>
        </Space_evenly>
      </View>
    </Modal>
  );
};

export default CustomAlert;

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 0,
  },
  modalContent: {
    backgroundColor: colors.white,
    borderRadius: scaleSize(15),
    width: "80%",
    borderWidth: scaleSize(2),
    padding: scaleSize(20),
  },
  title: {
    color: colors.black,
    fontSize: fontScale(18),
    fontFamily: fonts[600],
    textAlign: "center",
  },
  message: {
    color: colors.grey,
    fontSize: fontScale(13),
    fontFamily: fonts[400],
  },
  ButtonBox: {
    paddingVertical: scaleSize(5),
    paddingHorizontal: scaleSize(20),
    borderRadius: scaleSize(10),
  },
  ButtonText: {
    color: colors.white,
    fontSize: fontScale(13),
    fontFamily: fonts[500],
  },
});
