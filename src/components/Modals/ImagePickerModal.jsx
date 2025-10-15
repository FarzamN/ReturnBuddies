import React from "react";
import Modal from "react-native-modal";
import { colors } from "../../theme/colors";
import FullImage from "../Helpers/FullImage";
import { fonts, appImages } from "../../assets";
import { globalStyle } from "../../theme/globalStyle";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

const ImagePickerModal = ({ visible, onClose, onPicture, onCamera }) => {
  const { bottom } = useSafeAreaInsets();

  const actions = [
    {
      label: "Upload picture",
      subLabel: "Choose from gallery",
      onPress: onPicture,
      icon: appImages.modalPhoto,
    },
    {
      label: "Take a picture",
      subLabel: "Open camera",
      onPress: onCamera,
      icon: appImages.modalCamera,
    },
  ];

  return (
    <Modal
      isVisible={visible}
      statusBarTranslucent
      style={styles.modal}
      backdropOpacity={0.3}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
    >
      <View style={styles.container}>
        {/* Action Buttons */}
        <View style={styles.sheet}>
          {actions.map((action, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                onClose();
                setTimeout(() => action.onPress(), 500);
              }}
              activeOpacity={0.7}
              style={[
                styles.actionBtn,
                index !== actions.length - 1 && styles.divider,
              ]}
            >
              <FullImage
                source={action.icon}
                style={{ marginRight: 12, width: 24, height: 24 }}
              />
              <View>
                <Text style={styles.actionText}>{action.label}</Text>
                <Text style={styles.subText}>{action.subLabel}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Cancel Button */}
        <TouchableOpacity
          onPress={onClose}
          style={[styles.sheet, globalStyle.center]}
          activeOpacity={0.7}
        >
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>

        <View style={{ height: bottom }} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: "flex-end",
  },
  container: {
    width: "100%",
    paddingHorizontal: 10,
  },
  sheet: {
    backgroundColor: colors.white,
    borderRadius: 12,
    marginBottom: 8,
    overflow: "hidden",
  },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 18,
  },
  divider: {
    borderBottomColor: "#E0E0E0",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  actionText: {
    fontSize: 15,
    color: colors.black,
    fontFamily: fonts[600],
  },
  subText: {
    fontSize: 12,
    color: "#666",
    fontFamily: fonts[400],
    marginTop: 2,
  },
  cancelText: {
    fontSize: 16,
    fontFamily: fonts[600],
    color: colors.error,
    textAlign: "center",
    paddingVertical: 14,
  },
});

export default ImagePickerModal;
