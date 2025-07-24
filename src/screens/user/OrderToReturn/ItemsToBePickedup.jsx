import React from "react";
import { FlatList } from "react-native";
import { useSelector } from "react-redux";
import { wp } from "../../../theme/responsive";
import { Height } from "../../../theme/globalStyle";
import { Body, Header, ReturnSection } from "../../../components";

const ItemsToBePickedup = () => {
  const { draftSelectedRetun } = useSelector((state) => state.draft);

  return (
    <Body horizontal={wp(4)}>
      <Header leftTitle="Items to be picked up" />
      <Height />
      <FlatList
        data={draftSelectedRetun}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => <ReturnSection section={item} disabled />}
      />
    </Body>
  );
};

export default ItemsToBePickedup;
