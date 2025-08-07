import {
  View,
  StyleSheet,
  Text as RNText,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { FullImage, Text } from "..";
import Modal from "react-native-modal";
import { colors } from "../../theme/colors";
import { appImages, fonts } from "../../assets";
import { Height, Space_evenly } from "../../theme/globalStyle";
import { scaleSize, verticalScale } from "../../theme/responsive";

const CustomAlert = (props) => {
  const {
    show,
    isNote,
    message,
    isImage,
    secMessage,
    showProgress,
    messageStyle,
    onCancelPressed,
    onConfirmPressed,
    cancelText = "Cancel",
    confirmText = "Delete",
    title = "Are you sure?",
  } = props;

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
        {isImage && (
          <FullImage source={appImages.toastDelete} style={styles.image} />
        )}

        <Text style={styles.title} title={title} />
        <Height height={10} />

        <RNText style={styles.message}>
          {isNote && (
            <Text
              center
              title={isNote}
              style={[
                styles.message,
                {
                  color: "#424242",
                  fontFamily: fonts[600],
                },
              ]}
            />
          )}{" "}
          {message}
        </RNText>
        {secMessage && (
          <Text style={[styles.message, messageStyle]} center title={message} />
        )}
        <Height />
        <Space_evenly>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onCancelPressed}
            style={[styles.modalButton, styles.cancelButton]}
          >
            <Text style={styles.cancelText} title={cancelText} />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
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
    fontSize: 16,
    color: "#424242",
    textAlign: "center",
    fontFamily: fonts[600],
  },
  message: {
    fontSize: 12,
    color: "#5D5D5D",
    textAlign: "center",
    fontFamily: fonts[400],
  },

  modalButton: {
    flex: 1,
    borderRadius: 999,
    paddingVertical: 12,
    alignItems: "center",
    marginHorizontal: scaleSize(10),
  },

  cancelButton: {
    backgroundColor: "#D1D1D1",
  },

  deleteButton: {
    backgroundColor: "#FEE5E9",
  },

  cancelText: {
    fontSize: 13,
    color: "#454545",
    fontFamily: fonts[400],
  },

  deleteText: {
    color: "#ED6479",
    fontSize: scaleSize(11),
    fontFamily: fonts[400],
  },

  image: {
    width: scaleSize(50),
    aspectRatio: 1 / 1,
    alignSelf: "center",
    marginBottom: verticalScale(10),
  },
});
