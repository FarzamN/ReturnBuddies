import { useNavigation } from "@react-navigation/native";
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
import { useDispatch, useSelector } from "react-redux";
import { appImages } from "../../../assets";
import { colors } from "../../../theme/colors";
import { wp } from "../../../theme/responsive";
import { Height } from "../../../theme/globalStyle";
import { ScrollView, Text as T } from "react-native";
import { pick, types } from "@react-native-documents/picker";
import { showNotification } from "../../../components/Helpers/notifierHelper";
import { uploadLabelAPI } from "../../../redux/queries/draftQueries";
import { useFreezeScreen } from "../../../hooks";
// import { uploadLabelData as draftSelectedRetun } from "../../../utils/data";

const UploadLabel = ({ route }) => {
  const { labels } = route.params;
  const dispatch = useDispatch();
  const { goBack } = useNavigation();

  const { draftSelectedRetun, labelID } = useSelector((state) => state.draft);
  const [selectedReturns, setSelectedReturns] = useState([]);
  const [load, setLoad] = useState(false);
  const { Overlay } = useFreezeScreen(load);
  const [labelDocs, setLabelDocs] = useState();
  const [showDate, setShowDate] = useState({ open: false, date: null });

  const handleItemSelect = (productId) => {
    setSelectedReturns((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  const handleDocumentPick = async () => {
    try {
      const [result] = await pick({
        mode: "open",
        type: [types.pdf, types.images],
      });
      if (result) {
        setLabelDocs({ uri: result.uri, type: result.type, name: result.name });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpload = () => {
    if (!selectedReturns) {
      showNotification("error", "Please select any Item first", "Error");
      return;
    }
    if (!labelDocs) {
      showNotification("error", "Please upload label", "Error");
      return;
    }
    if (!showDate.date) {
      showNotification("error", "Please select date", "Error");
      return;
    }
    uploadLabelAPI(
      labels._id,
      showDate.date,
      selectedReturns,
      labelDocs,
      setLoad,
      goBack,
      labelID
    )(dispatch);
  };
  // const getSelectedProduct = () => {
  //   for (const bundle of draftSelectedRetun) {
  //     const match = bundle.products.find((p) => p._id === selectedReturns);
  //     if (match) return match;
  //   }
  //   return null;
  // };

  // const selectedProduct = getSelectedProduct();
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
            type={labelDocs?.type}
            noImage={!labelDocs?.type}
            source={
              labelDocs?.uri
                ? { uri: labelDocs.uri }
                : // : selectedProduct?.labelPath?.uri
                  // ? { uri: selectedProduct.labelPath.uri }
                  appImages.addLabel
            }
            title={
              labelDocs?.name ||
              // selectedProduct?.labelPath?.name ||
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
            title={showDate.date || "Select Date"}
            onPress={() => setShowDate({ open: true, date: null })}
          />
          <Height />
        </>
      </ScrollView>
      <Height />
      <MainButton load={load} title="Upload" onPress={handleUpload} />
      <Height />
      <DatePicker
        visible={showDate.open}
        onClose={() => setShowDate({ open: false, date: null })}
        onPress={(date) => {
          setShowDate({ open: false, date });
        }}
      />

      {/* <Overlay /> */}
    </Body>
  );
};

export default UploadLabel;
