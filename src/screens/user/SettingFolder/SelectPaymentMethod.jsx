import {
  Body,
  Empty,
  Header,
  HiddenDelete,
  MainButton,
  PaymentCard,
} from "../../../components";
import { appImages } from "../../../assets";
import { wp } from "../../../theme/responsive";
import { RefreshControl } from "react-native";
import { colors } from "../../../theme/colors";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { SwipeListView } from "react-native-swipe-list-view";
import {
  getPaymentAPI,
  deletePaymentAPI,
} from "../../../redux/queries/authQueries";
import { setDraftReturn } from "../../../redux/slices/draftSlice";
import AwesomeAlert from "react-native-awesome-alerts";
import { globalStyle } from "../../../theme/globalStyle";

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
        renderHiddenItem={({ item }, rowMap) => (
          <HiddenDelete
            onPress={() => {
              rowMap[item._id]?.closeRow();
              setAlert({ visible: true, _id: item._id });
            }}
          />
        )}
        rightOpenValue={-75}
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
      <AwesomeAlert
        show={alert.visible}
        showCancelButton
        showConfirmButton
        title="Are you sure?"
        showProgress={load}
        progressColor={colors.purple}
        progressSize={20}
        message={`Are you sure you want to delete this Payment card?\nThis action cannot be undone.`}
        cancelText="Cancel"
        confirmText="Delete"
        confirmButtonColor={colors.error}
        cancelButtonColor={colors.success}
        onCancelPressed={() => setAlert({ visible: false })}
        onConfirmPressed={() => {
          deletePaymentAPI(alert._id, setAlert, setLoad)(dispatch);
        }}
        titleStyle={globalStyle.alertTitle}
        messageStyle={globalStyle.alertMessage}
        cancelButtonTextStyle={globalStyle.alertCancel}
        confirmButtonTextStyle={globalStyle.alertCancel}
      />
    </Body>
  );
};

export default SelectPaymentMethod;
