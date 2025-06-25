import {
  Body,
  Empty,
  Header,
  MainButton,
  AddressCard,
  PaymentCard,
} from "../../../components";
import { appImages } from "../../../assets";
import { wp } from "../../../theme/responsive";
import { colors } from "../../../theme/colors";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FlatList, RefreshControl } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getPaymentAPI } from "../../../redux/queries/authQueries";

const SelectPaymentMethod = ({ route }) => {
  const { isPickup } = route.params || {};
  const disptch = useDispatch();

  const { navigate } = useNavigation();
  const { getPayments } = useSelector((state) => state.auth);

  const [load, setLoad] = useState(false);
  const [select, setSelect] = useState({ index: "", data: null });

  const onRefresh = () => {
    getPaymentAPI(setLoad)(disptch);
  };

  useEffect(() => {
    getPaymentAPI(setLoad)(disptch);
  }, []);

  return (
    <Body horizontal={wp(5)}>
      <Header
        leftTitle="Payment methods"
        addBTN={getPayments.length !== 0}
        onPress={() => navigate("addPaymentMethod")}
      />

      <FlatList
        data={getPayments}
        keyExtractor={(_, i) => i.toString()}
        refreshControl={
          <RefreshControl
            refreshing={load}
            onRefresh={onRefresh}
            colors={[colors.purple]}
            tintColor={colors.purple}
          />
        }
        renderItem={({ item, index }) => (
          <PaymentCard
            data={item}
            disabled={!isPickup}
            focus={index === select.index}
            onPress={() => setSelect({ index, data: item })}
            onEdit={() => navigate("addPaymentMethod", { item, editing: true })}
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

      {isPickup && getPayments.length !== 0 && <MainButton title="Continue" />}
    </Body>
  );
};

export default SelectPaymentMethod;
