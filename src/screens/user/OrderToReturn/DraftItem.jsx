import { FlatList, View } from "react-native";
import React from "react";
import { Body, DraftHeader, Empty, PrimeryTab } from "../../../components";
import { wp } from "../../../theme/responsive";

const DraftItem = () => {
  return (
    <Body>
      <View style={{ paddingHorizontal: wp(5) }}>
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
      </View>
      <PrimeryTab currentTab="Draft Items" />
    </Body>
  );
};

export default DraftItem;
