import {
  Body,
  Empty,
  Header,
  MainButton,
  CustomAlert,
  PaymentCard,
  HiddenDelete,
} from "../../../components";
import { appImages } from "../../../assets";
import { RefreshControl } from "react-native";
import { iOS } from "../../../utils/constants";
import { wp } from "../../../theme/responsive";
import { colors } from "../../../theme/colors";
import React, { useEffect, useState } from "react";
import { Height } from "../../../theme/globalStyle";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { SwipeListView } from "react-native-swipe-list-view";
import { setDraftReturn } from "../../../redux/slices/draftSlice";
import { getPaymentAPI, deletePaymentAPI } from "../../../apis/authQueries";

const SelectPaymentMethod = ({ route }) => {
  const { isPickup } = route.params || {};
  const dispatch = useDispatch();

  const { navigate, goBack } = useNavigation();
  const { getPayments } = useSelector((state) => state.auth) ?? [];

  const [load, setLoad] = useState(false);
  const [select, setSelect] = useState({ index: "", data: null });
  const [alert, setAlert] = useState({
    visible: false,
    _id: "",
  });

  const onRefresh = () => {
    getPaymentAPI(setLoad)(dispatch);
  };

  const onSubmit = () => {
    goBack();
    dispatch(setDraftReturn({ selectedPayment: select.data }));
  };
  useEffect(() => {
    getPaymentAPI(setLoad)(dispatch);
  }, []);
  return (
    <Body horizontal={wp(4)}>
      <Header
        leftTitle="Payment methods"
        addBTN={getPayments.length !== 0}
        onPress={() => navigate("addPaymentMethod")}
      />

      <SwipeListView
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
        renderHiddenItem={({ item, index }, rowMap) => (
          <HiddenDelete
            onPress={() => {
              rowMap[index]?.closeRow();
              setAlert({ visible: true, _id: item._id });
            }}
          />
        )}
        disableRightSwipe
        rightOpenValue={-75}
      />

      {isPickup && getPayments.length !== 0 && (
        <MainButton
          title="Continue"
          onPress={onSubmit}
          disabled={!select.data}
        />
      )}
      {iOS && <Height />}

      <CustomAlert
        showProgress={load}
        show={alert.visible}
        onCancelPressed={() => setAlert({ visible: false })}
        message={
          "Are you sure you want to delete this Payment card?\nThis action cannot be undone."
        }
        onConfirmPressed={() =>
          deletePaymentAPI(alert._id, setAlert, setLoad)(dispatch)
        }
      />
    </Body>
  );
};

export default SelectPaymentMethod;
