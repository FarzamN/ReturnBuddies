import { View, Text as T } from "react-native";
import React from "react";
import styles from "./modalStyle";
import Modal from "react-native-modal";
import { FullImage, Text } from "..";
import { appImages } from "../../assets";
import { Height } from "../../theme/globalStyle";
import Icon from "react-native-dynamic-vector-icons";
import { colors } from "../../theme/colors";

const AboutOversize = ({ visible, onClose }) => {
  return (
    <Modal
      isVisible={visible}
      animationIn="fadeInUp"
      animationOut="fadeOut"
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      style={styles.modalContainer}
    >
      <View style={[styles.modalBox]}>
        <Height />
        <Icon
          onPress={onClose}
          name="close"
          type="AntDesign"
          size={30}
          color={colors.description}
          style={styles.oversizeClose}
        />
        <FullImage
          source={appImages.oversize}
          style={{ width: 100, height: 100 }}
        />

        <Height />

        <Text style={{ fontWeight: "600" }} title="Oversized Items" center />
        <Height />

        <T style={{ textAlign: "center", color: colors.description }}>
          Any item weighing over 15 lbs or measuring more than 25 inches in any
          dimension is considered oversized and may incur an{" "}
          <Text center style={{ fontWeight: "600" }} title="additional fee." />
        </T>
        <Height />
        <Text
          center
          style={{ color: colors.description }}
          title="Oversized fees will only be charged after it’s checked at our warehouse."
        />
        <Height />
      </View>
    </Modal>
  );
};

export default AboutOversize;
