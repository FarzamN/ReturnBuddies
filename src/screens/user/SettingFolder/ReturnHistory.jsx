import React from "react";
import { FlatList } from "react-native";
import { appImages } from "../../../assets";
import { wp } from "../../../theme/responsive";
import { Body, Empty, Header, ReturnHistorCard } from "../../../components";

const ReturnHistory = () => {
  return (
    <Body horizontal={wp(5)}>
      <Header title="Return History" noSetting />
      <FlatList
        data={[
          {
            title: "Shoes",
            detail: "Need info",
            createdAt: "23.7.2024",
            image: appImages.status1,
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
