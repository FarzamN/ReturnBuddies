import {
  Body,
  Text,
  Header,
  DatePicker,
  SelectDate,
  MainButton,
  RequiredText,
  UploadLabelCard,
  LabelPickerButton,
} from "../../../components";

import moment from "moment";
import styles from "../userStyle";
import { colors } from "../../../theme/colors";
import { wp } from "../../../theme/responsive";
import { imageURl } from "../../../utils/urls";
import { useFreezeScreen } from "../../../hooks";
import React, { useEffect, useState } from "react";
import { appImages, fonts } from "../../../assets";
import { Height } from "../../../theme/globalStyle";
import { ScrollView, Text as T } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { pick, types } from "@react-native-documents/picker";
import { editLabelAPI, uploadLabelAPI } from "../../../apis/draftQueries";

const UploadLabel = ({ route }) => {
  const { labels, isEdit } = route.params;
  const dispatch = useDispatch();
  const { goBack } = useNavigation();

  const { draftSelectedRetun, labelID } = useSelector((state) => state.draft);

  const [load, setLoad] = useState(false);
  const { Overlay } = useFreezeScreen(load);
  const [labelDocs, setLabelDocs] = useState();
  const [selectedReturns, setSelectedReturns] = useState([]);
  const [showDate, setShowDate] = useState({
    open: false,
    date: isEdit ? labels?.formattedDate : null,
  });

  const [error, setError] = useState({
    items: false,
    label: false,
    date: false,
  });

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
    if (!isEdit && !labelDocs) {
      setError((prev) => ({ ...prev, label: true }));
      return;
    }
    if (selectedReturns.length === 0) {
      setError((prev) => ({ ...prev, items: true }));
      return;
    }
    if (!isEdit && !showDate.date) {
      setError((prev) => ({ ...prev, date: true }));
      return;
    }

    const productID = selectedReturns.map((item) => {
      return { productId: item };
    });
    const body = new FormData();
    body.append("bundleId", labels._id);
    body.append("date", showDate.date);
    body.append("productIDs", JSON.stringify(productID));
    labelDocs
      ? body.append("label", {
          uri: labelDocs.uri,
          type: labelDocs.type,
          name: labelDocs.name,
        })
      : labels?.labelReceipt;
    if (isEdit) {
      editLabelAPI(body, setLoad, goBack, labelID)(dispatch);
      return;
    }
    uploadLabelAPI(body, setLoad, goBack, labelID)(dispatch);
  };

  useEffect(() => {
    if (labelDocs) {
      setError((prev) => ({ ...prev, label: false }));
    }
    if (selectedReturns.length > 0) {
      setError((prev) => ({ ...prev, items: false }));
    }
    if (showDate.date) {
      setError((prev) => ({ ...prev, date: false }));
    }
  }, [labelDocs, selectedReturns, showDate.date]);
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
      <Header leftTitle="Upload Label" />
      <Height />

      <Text
        style={[styles.draftTitle, { fontSize: 16 }]}
        title={"Upload Return Label or QR Code"}
      />
      <Text
        width={"90%"}
        style={[styles.draftSub, { fontSize: 11 }]}
        title="Upload a file or screenshot of your shipping label from the retailer"
      />
      <Height />

      <ScrollView showsVerticalScrollIndicator={false}>
        <>
          <LabelPickerButton
            // isUrl={labelDocs?.uri || isEdit}
            isError={error.label}
            type={labelDocs?.type}
            onPress={handleDocumentPick}
            // noImage={!labelDocs?.type ?? !labels?.labelReceipt !== "pending"}
            source={
              labelDocs?.uri
                ? { uri: labelDocs.uri }
                : isEdit
                ? { uri: labels?.labelReceipt }
                : appImages.addLabel
            }
            title={
              labelDocs?.name
                ? labelDocs?.name
                : isEdit
                ? labels.labelReceipt
                : labelDocs?.name || "Tap to upload label"
            }
          />

          <Height />
          <T style={styles.uploadSelectText}>
            Select
            <Text
              title=" only "
              style={{ fontFamily: fonts[500] }}
              color={colors.purple}
            />
            items the label above applies to
          </T>
          <Height />
        </>

        <UploadLabelCard
          data={labels}
          isError={error.items}
          onItemSelect={handleItemSelect}
          selectedReturns={selectedReturns}
        />

        <>
          <RequiredText title={"Return item by"} required />
          <SelectDate
            isError={error.date}
            title={showDate.date || "Select Date"}
            onPress={() => setShowDate({ open: true, date: null })}
          />
          <Height />
        </>
      </ScrollView>
      <Height />
      <MainButton load={load} title="Confirm" onPress={handleUpload} />
      <Height />
      <DatePicker
        visible={showDate.open}
        onClose={() => setShowDate({ open: false, date: null })}
        onPress={(date) =>
          setShowDate({ open: false, date: moment(date).format("MM/DD/YYYY") })
        }
      />

      <Overlay />
    </Body>
  );
};

export default UploadLabel;
