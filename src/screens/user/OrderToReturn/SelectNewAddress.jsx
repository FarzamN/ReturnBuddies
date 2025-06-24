import { FlatList } from "react-native";
import React, { useState } from "react";
import {
  Body,
  Empty,
  Header,
  MainButton,
  AddressCard,
} from "../../../components";
import { wp } from "../../../theme/responsive";
import { appImages } from "../../../assets";
import { useNavigation } from "@react-navigation/native";

const SelectNewAddress = () => {
  const { navigate } = useNavigation();
  const [select, setSelect] = useState({ card: "", data });
  const data = [
    {
      streen: "53 park view",
      suits: "apt 11e",
      city: "new York",
      state: "NY",
      zip: "10001",
      isDefault: "1",
    },
    {
      streen: "53 park view",
      suits: "apt 11e",
      city: "new York",
      state: "NY",
      zip: "10001",
      isDefault: "0",
    },
  ];
  return (
    <Body horizontal={wp(5)}>
      <Header
        leftTitle="Address"
        addBTN={data.length >= 0}
        onPress={() => navigate("addNewAddress")}
      />

      <FlatList
        data={data}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <AddressCard
            data={item}
            focus={item.streen === select.card}
            onPress={() => setSelect({ card: item.streen, data: item })}
          />
        )}
        ListEmptyComponent={
          <Empty
            isButton
            source={appImages.location_empty}
            title="You dont have any saved addresses yet!"
            onPress={() => navigate("addNewAddress")}
          />
        }
      />
      <MainButton title="Continue" />
    </Body>
  );
};

export default SelectNewAddress;
