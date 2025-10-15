import React from "react";
import Modal from "react-native-modal";
import { colors } from "../../theme/colors";
import FullImage from "../Helpers/FullImage";
import { appImages, fonts } from "../../assets";
import { globalStyle } from "../../theme/globalStyle";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

const SelectDocumentOrPhotoModal = ({ onPDF, visible, onClose, onPicture }) => {
  const { bottom } = useSafeAreaInsets();

  const actions = [
    {
      iconName: appImages.modalPhoto,
      label: "Upload picture",
      onPress: onPicture,
      subLabel: "Choose from gallery",
    },
    {
      iconName: appImages.modalPDF,
      label: "Upload PDF",
      onPress: onPDF,
      subLabel: "Open Document",
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
                source={action.iconName}
                style={{ marginRight: 10, width: 23, height: 23 }}
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
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E0E0E0",
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

export default SelectDocumentOrPhotoModal;
