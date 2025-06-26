import {
  Body,
  Empty,
  Header,
  MainButton,
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
import { setDraftReturn } from "../../../redux/slices/draftSlice";

const SelectPaymentMethod = ({ route }) => {
  const { isPickup } = route.params || {};
  const dispatch = useDispatch();

  const { navigate, goBack } = useNavigation();
  const { getPayments } = useSelector((state) => state.auth) ?? [];
  // const getPayments = useSelector((state) => state.auth.getPayments) ;

  const [load, setLoad] = useState(false);
  const [select, setSelect] = useState({ index: "", data: null });

  const onRefresh = () => {
    getPaymentAPI(setLoad)(dispatch);
  };

  useEffect(() => {
    getPaymentAPI(setLoad)(dispatch);
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

      {isPickup && getPayments.length !== 0 && (
        <MainButton
          title="Continue"
          disabled={!select.data}
          onPress={() => {
            goBack();
            dispatch(setDraftReturn({ selectedPayment: select.data }));
          }}
        />
      )}
    </Body>
  );
};

export default SelectPaymentMethod;
