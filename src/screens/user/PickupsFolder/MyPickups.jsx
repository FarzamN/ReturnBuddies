import { View, Text, ScrollView } from "react-native";
import React from "react";
import { Body, Header, PrimeryTab } from "../../../components";
import { wp } from "../../../theme/responsive";

const MyPickups = () => {
  return (
    <Body>
      <Header />
      <ScrollView style={{ paddingHorizontal: wp(5) }}></ScrollView>
      <PrimeryTab currentTab="myPickups" />
    </Body>
  );
};

export default MyPickups;
