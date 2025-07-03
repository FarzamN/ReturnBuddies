import { View, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Modal from "react-native-modal";
import { FullImage, Text } from "..";
import { Height, Space_evenly } from "../../theme/globalStyle";
import {
  fontScale,
  height,
  scaleSize,
  verticalScale,
} from "../../theme/responsive";
import { appImages, fonts } from "../../assets";
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
      <View style={styles.modalContent}>
        <FullImage source={appImages.toastDelete} style={styles.image} />
        <Text style={styles.title} title={title} />
        <Height height={10} />
        <Text style={styles.message} center title={message} />
        <Height />
        <Space_evenly>
          <TouchableOpacity
            onPress={onCancelPressed}
            style={[styles.modalButton, styles.cancelButton]}
          >
            <Text style={styles.cancelText} title={cancelText} />
          </TouchableOpacity>

          <TouchableOpacity
            disabled={showProgress}
            onPress={onConfirmPressed}
            style={[styles.modalButton, styles.deleteButton]}
          >
            <Text
              style={styles.deleteText}
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
    width: "85%",
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

  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 999, // full rounded
    alignItems: "center",
    marginHorizontal: scaleSize(10),
  },

  cancelButton: {
    backgroundColor: "#F5F5F5",
  },

  deleteButton: {
    backgroundColor: "#FEE5E9",
  },

  cancelText: {
    color: "#000",
    fontSize: scaleSize(13),
    fontFamily: fonts[500],
  },

  deleteText: {
    color: "#E53945",
    fontSize: scaleSize(13),
    fontFamily: fonts[500],
  },

  image: {
    width: scaleSize(50),
    aspectRatio: 1 / 1,
    alignSelf: "center",
    marginBottom: verticalScale(10),
  },
});
