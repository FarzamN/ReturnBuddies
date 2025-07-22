import React from "react";
import styles from "./modalStyle";
import { FullImage, Text } from "..";
import Modal from "react-native-modal";
import { colors } from "../../theme/colors";
import { View, Text as T } from "react-native";
import { appImages, fonts } from "../../assets";
import { Height } from "../../theme/globalStyle";
import { fontScale } from "../../theme/responsive";
import Icon from "react-native-dynamic-vector-icons";

const AboutOversize = ({ visible, onClose }) => {
  return (
    <Modal
      isVisible={visible}
      animationIn="fadeInUp"
      animationOut="fadeOut"
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      style={styles.modalContainer}
      statusBarTranslucent
    >
      <View style={[styles.modalBox]}>
        <Height />
        <Icon
          size={25}
          name="close"
          type="AntDesign"
          onPress={onClose}
          color={colors.description}
          style={styles.oversizeClose}
        />
        <FullImage
          source={appImages.oversize}
          style={{ width: 100, height: 100 }}
        />

        <Height />

        <Text
          style={{ fontFamily: fonts[600], fontSize: 16 }}
          title="Oversized Items"
          center
        />
        <Height />

        <T style={styles.overSizeText}>
          Any item weighing over 15 lbs or measuring more than 25 inches in any
          dimension is considered oversized and may incur an{" "}
          <Text
            center
            style={{ fontFamily: fonts[600], color: " #717171" }}
            title="additional fee."
          />
        </T>
        <Height />
        <Text
          style={styles.overSizeText}
          title="Oversized fees will only be charged after it’s checked at our warehouse."
        />
        <Height />
      </View>
    </Modal>
  );
};

export default AboutOversize;
