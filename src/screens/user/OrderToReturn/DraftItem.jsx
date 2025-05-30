import {
  Body,
  Text,
  Empty,
  PrimeryTab,
  DraftHeader,
  ReturnSection,
  MainButton,
} from "../../../components";

import {
  Height,
  Divider,
  globalStyle,
  Space_Between,
} from "../../../theme/globalStyle";

import styles from "../userStyle";
import React, { useState } from "react";
import { iOS } from "../../../utils/constants";
import { wp } from "../../../theme/responsive";
import { draftData } from "../../../utils/data";
import { useNavigation } from "@react-navigation/native";
import { FlatList, ScrollView, View } from "react-native";

const DraftItem = () => {
  const { navigate } = useNavigation();

  const [selectedReturns, setSelectedReturns] = useState([]);

  const toggleSelect = (_id) => {
    setSelectedReturns((prev) =>
      prev.includes(_id)
        ? prev.filter((label) => label !== _id)
        : [...prev, _id]
    );
  };

  const selectedCount = selectedReturns.length;

  return (
    <Body>
      <DraftHeader />
      {iOS && <Height />}
      <Height />

      <View style={{ paddingHorizontal: wp(5) }}>
        <Text style={styles.draftTitle} title={"Your Returns"} />
        <Text
          style={styles.draftSub}
          title={"Select return(s) to schedule pickup"}
        />
      </View>

      <FlatList
        data={draftData}
        nestedScrollEnabled
        scrollEnabled={false}
        contentContainerStyle={globalStyle.p15}
        keyExtractor={(_, index) => index.toString()}
        ListEmptyComponent={
          <Empty
            title="No Drafts Items"
            sub="You don't have any draft returns"
          />
        }
        renderItem={({ item }) => (
          <ReturnSection
            key={item._id}
            section={item}
            onSelect={toggleSelect}
            selected={selectedReturns.includes(item._id)}
          />
        )}
      />

      {selectedCount ? (
        <MainButton
          disabled
          textStyle={styles.buttonText}
          style={styles.button}
          title={`Schedule Pickup for ${selectedReturns.length} Item${
            selectedReturns.length > 1 ? "s" : ""
          }`}
          onPress={() =>
            navigate("schedulePickup", { returnLabel: selectedReturns })
          }
        />
      ) : (
        <PrimeryTab currentTab="Home" />
      )}
    </Body>
  );
};

export default DraftItem;
