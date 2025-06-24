import { View, Text, FlatList } from "react-native";
import React, { useState } from "react";
import {
  Body,
  Empty,
  Header,
  MainButton,
  PaymentCard,
} from "../../../components";
import { wp } from "../../../theme/responsive";
import { appImages } from "../../../assets";
import { useNavigation } from "@react-navigation/native";

const SelectPaymentMethod = () => {
  const { navigate } = useNavigation();
  const [select, setSelect] = useState({ card: "", data });
  const data = [
    {
      name: "John Doe",
      cardNumber: "5424 2424 2424 1234",
      expiryDate: "12/24",
      cvv: "123",
      isDefault: "1",
    },
    {
      name: "John Doe",
      cardNumber: "2424 2424 2424 1234",
      expiryDate: "12/24",
      cvv: "123",
      isDefault: "0",
    },
  ];
  return (
    <Body horizontal={wp(5)}>
      <Header
        leftTitle="Payment methods"
        addBTN={data.length >= 0}
        onPress={() => navigate("addPaymentMethod")}
      />

      <FlatList
        data={data}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <PaymentCard
            data={item}
            focus={item.cardNumber === select.card}
            onPress={() => setSelect({ card: item.cardNumber, data: item })}
          />
        )}
        ListEmptyComponent={
          <Empty
            isButton
            source={appImages.wallet_empty}
            title="No saved payment methods"
            onPress={() => navigate("addPaymentMethod")}
          />
        }
      />
      <MainButton title="Continue" />
    </Body>
  );
};

export default SelectPaymentMethod;
