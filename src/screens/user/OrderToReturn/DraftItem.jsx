import { View, Text, FlatList } from "react-native";
import React from "react";
import { Body, DraftHeader, Empty } from "../../../components";
import { wp } from "../../../theme/responsive";

const DraftItem = () => {
  return (
    <Body horizontal={wp(5)}>
      <DraftHeader />
      <FlatList
        data={[]}
        ListEmptyComponent={
          <Empty
            title="No Items to Return"
            sub="Add orders with prepaid shipping labels or QR Codes to schedule a pickup. Packaging is optional."
          />
        }
      />
    </Body>
  );
};

export default DraftItem;
