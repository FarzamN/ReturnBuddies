import {
  Body,
  Text,
  Header,
  SelectDate,
  MainButton,
  RequiredText,
  ReturnSection,
  UploadLabelCard,
  LabelPickerButton,
  DatePicker,
} from "../../../components";
import styles from "../userStyle";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { appImages } from "../../../assets";
import { colors } from "../../../theme/colors";
import { wp } from "../../../theme/responsive";
import { Height } from "../../../theme/globalStyle";
import { ScrollView, Text as T } from "react-native";
import { pick, types } from "@react-native-documents/picker";
import { showNotification } from "../../../components/Helpers/notifierHelper";
// import { uploadLabelData as draftSelectedRetun } from "../../../utils/data";

const UploadLabel = ({ route }) => {
  const { labels } = route.params;
  const { draftSelectedRetun } = useSelector((state) => state.draft);

  const [selectedReturns, setSelectedReturns] = useState(null);
  const [labelDocs, setLabelDocs] = useState({}); // { [productId]: documentObject }
  const [showDate, setShowDate] = useState({ open: false, date: null });

  const handleItemSelect = (productId) => {
    setSelectedReturns((prev) => (prev === productId ? null : productId));
  };

  const handleDocumentPick = async () => {
    if (!selectedReturns) {
      showNotification("error", "Please select any Item first", "Error");
      return;
    }
    try {
      const [result] = await pick({
        mode: "open",
        type: [types.pdf, types.images],
      });
      if (result) {
        setLabelDocs((prev) => ({
          ...prev,
          [selectedReturns]: result,
        }));
      }
    } catch (err) {
      console.error(err);
    }
  };
  const getSelectedProduct = () => {
    for (const bundle of draftSelectedRetun) {
      const match = bundle.products.find((p) => p._id === selectedReturns);
      if (match) return match;
    }
    return null;
  };

  const selectedProduct = getSelectedProduct();
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

      <ScrollView showsVerticalScrollIndicator={false}>
        <>
          <LabelPickerButton
            onPress={handleDocumentPick}
            type={selectedProduct?.labelPath?.type}
            // noImage={!selectedProduct?.labelPath?.type}
            source={
              labelDocs[selectedReturns]?.uri
                ? { uri: labelDocs[selectedReturns].uri }
                : selectedProduct?.labelPath?.uri
                ? { uri: selectedProduct.labelPath.uri }
                : appImages.addLabel
            }
            title={
              labelDocs[selectedReturns]?.name ||
              selectedProduct?.labelPath?.name ||
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
        </>

        <UploadLabelCard
          data={labels}
          onItemSelect={handleItemSelect}
          selectedReturns={selectedReturns}
        />

        <>
          <RequiredText title={"Return item by"} required />
          <SelectDate
            title={showDate.data || "Select Date"}
            onPress={() => setShowDate({ open: true, data: null })}
          />
          <Height />
        </>
      </ScrollView>
      <Height />
      {/* <MainButton title="Upload" onPress={handle} /> */}
      <Height />
      <DatePicker
        visible={showDate.open}
        onClose={() => setShowDate({ open: false, data: null })}
        onPress={(date) => {
          setShowDate({ open: false, data: date });
        }}
      />
    </Body>
  );
};

export default UploadLabel;
