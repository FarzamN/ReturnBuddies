import { View, FlatList } from "react-native";
import React from "react";
import { Body, Empty, Header } from "../../../components";
import { wp } from "../../../theme/responsive";
import ReturnHistorCard from "../../../components/Cards/ReturnHistorCard";
import { appImages } from "../../../assets";

const ReturnHistory = () => {
  return (
    <Body horizontal={wp(5)}>
      <Header title="Return History" />
      <FlatList
        data={[
          {
            image: appImages.status1,
            title: "Shoes",
            detail: "Need info",
            createdAt: "23.7.2024",
          },
        ]}
        keyExtractor={(_, ix) => ix.toString()}
        ListEmptyComponent={
          <Empty
            title="No item Returned"
            sub="You have not returned any item yet"
          />
        }
        renderItem={({ item }) => <ReturnHistorCard data={item} />}
      />
    </Body>
  );
};

export default ReturnHistory;
