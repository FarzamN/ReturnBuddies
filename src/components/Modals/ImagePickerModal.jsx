import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import Modal from "react-native-modal";
import { colors } from "../../theme/colors";
import Icon from "react-native-dynamic-vector-icons";
import { fonts } from "../../assets";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ImagePickerModal = ({ visible, onClose, onPicture, onCamera }) => {
  const { bottom } = useSafeAreaInsets();

  const actions = [
    {
      label: "Upload picture",
      onPress: onPicture,
      iconName: "photo",
    },
    {
      label: "Take a picture",
      iconName: "photo-camera",
      onPress: onCamera,
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
        {actions.map((action, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              onClose(); // ✅ close modal first
              setTimeout(() => action.onPress(), 1000);
            }}
            style={styles.modalBtn}
          >
            <Icon
              size={30}
              type="MaterialIcons"
              color={colors.purple}
              name={action.iconName}
            />
            <Text style={styles.text}>{action.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={{ height: bottom, backgroundColor: colors.white }} />
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: "flex-end",
  },
  container: {
    paddingVertical: 15,
    width: "100%",
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: "row",
  },
  modalBtn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 12,
    color: colors.purple,
    fontFamily: fonts[500],
  },
});

export default ImagePickerModal;
