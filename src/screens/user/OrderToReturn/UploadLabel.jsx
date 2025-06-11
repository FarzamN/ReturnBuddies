import React from "react";
import {
  Body,
  Text,
  Header,
  LabelPickerButton,
  RequiredText,
  SelectDate,
} from "../../../components";
import styles from "../userStyle";
import { wp } from "../../../theme/responsive";
import { appImages } from "../../../assets";
import { Height } from "../../../theme/globalStyle";
import { Text as T } from "react-native";
import { colors } from "../../../theme/colors";

const UploadLabel = ({ route }) => {
  const { labels } = route.params;
  return (
    <Body horizontal={wp(4)}>
      <Header leftTitle="Upload Label" noSetting />
      <Text
        style={styles.draftTitle}
        title={"Upload Return Label or QR Code"}
      />
      <Text
        style={styles.draftSub}
        title={
          "Upload a file or screenshot of your shipping label from the retailer"
        }
      />
      <Height />
      <LabelPickerButton
        // onPress={() => handleImagePick(index)}
        source={
          // images[index]?.uri
          //   ? { uri: images[index].uri }
          //   :
          appImages.addLabel
        }
        noImage
        title={
          // images[index]?.name ||
          "Tap to upload label"
        }
      />
      <Height />

      <T style={styles.uploadSelectText}>
        Select
        <Text
          title=" only "
          style={{ fontWeight: "600" }}
          color={colors.purple}
        />
        items the label above applies to
      </T>
      <Height />

      <RequiredText title={"Return item by"} required />
      <SelectDate title="Select Date" />
    </Body>
  );
};

export default UploadLabel;
