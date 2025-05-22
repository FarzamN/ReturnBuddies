import { View, ScrollView } from "react-native";
import React from "react";
import { Body, Header, MainButton, Text } from "../../../components";
import { wp } from "../../../theme/responsive";
import styles from "../userStyle";
import { Height } from "../../../theme/globalStyle";
import { iOS } from "../../../utils/constants";

const AddDraftItem = () => {
  return (
    <Body horizontal={wp(5)}>
      <Header title={"Order Details"} />
      <Height />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.draftTitle} title={"What are you returning?"} />
      </ScrollView>
      <Text
        center
        numberOfLines={1}
        style={{ fontSize: wp(3) }}
        title={
          "*Only add items that belong to this same return shipping label."
        }
      />
      <MainButton title="Save Order" />
    </Body>
  );
};

export default AddDraftItem;
