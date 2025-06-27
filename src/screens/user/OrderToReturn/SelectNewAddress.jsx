import {
  Body,
  Empty,
  Header,
  MainButton,
  AddressCard,
  HiddenDelete,
} from "../../../components";
import { appImages } from "../../../assets";
import { RefreshControl } from "react-native";
import { colors } from "../../../theme/colors";
import { wp } from "../../../theme/responsive";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { SwipeListView } from "react-native-swipe-list-view";
import {
  getAddressAPI,
  deleteAddressAPI,
} from "../../../redux/queries/authQueries";
import { setDraftReturn } from "../../../redux/slices/draftSlice";
import AwesomeAlert from "react-native-awesome-alerts";
import { globalStyle } from "../../../theme/globalStyle";

const SelectNewAddress = ({ route }) => {
  const { isPickup } = route.params || {};
  const dispatch = useDispatch();

  const { navigate, goBack } = useNavigation();
  const { getAddress } = useSelector((state) => state.auth) ?? [];

  const [load, setLoad] = useState(false);
  const [select, setSelect] = useState({ index: "", data: null });
  const [alert, setAlert] = useState({ visible: false, _id: "" });

  const onRefresh = () => {
    getAddressAPI(setLoad)(dispatch);
  };

  useEffect(() => {
    getAddressAPI(setLoad)(dispatch);
  }, []);

  return (
    <Body horizontal={wp(5)}>
      <Header
        leftTitle="Address"
        addBTN={getAddress?.length !== 0}
        onPress={() => navigate("addNewAddress")}
      />

      <SwipeListView
        data={getAddress}
        keyExtractor={(item) => item._id}
        refreshControl={
          <RefreshControl
            refreshing={load}
            onRefresh={onRefresh}
            colors={[colors.purple]}
            tintColor={colors.purple}
          />
        }
        renderItem={({ item, index }) => (
          <AddressCard
            data={item}
            disabled={!isPickup}
            focus={index === select.index}
            onPress={() => setSelect({ index, data: item })}
            onEdit={() => navigate("addNewAddress", { item, editing: true })}
          />
        )}
        ListEmptyComponent={
          <Empty
            isButton
            source={appImages.location_empty}
            title="You don't have any saved addresses yet!"
            onPress={() => navigate("addNewAddress")}
          />
        }
        renderHiddenItem={(data, rowMap) => (
          <HiddenDelete
            onPress={() => {
              rowMap[data.item._id]?.closeRow();
              setAlert({ visible: true, _id: data.item._id });
            }}
          />
        )}
        rightOpenValue={-75}
      />

      {isPickup && getAddress?.length !== 0 && (
        <MainButton
          title="Continue"
          disabled={!select.data}
          onPress={() => {
            goBack();
            dispatch(setDraftReturn({ selectedAddress: select.data }));
          }}
        />
      )}
      <AwesomeAlert
        show={alert.visible}
        showCancelButton={true}
        showConfirmButton={true}
        title="Are you sure?"
        message={`Are you sure you want to delete this Address?\nThis action cannot be undone.`}
        cancelText="Cancel"
        showProgress={load}
        progressColor={colors.purple}
        progressSize={30}
        confirmText={load ? "Loading..." : "Delete"}
        confirmButtonColor={colors.error}
        cancelButtonColor={colors.success}
        onCancelPressed={() => setAlert({ visible: false })}
        onConfirmPressed={() => {
          deleteAddressAPI(alert._id, setAlert, setLoad)(dispatch);
        }}
        titleStyle={globalStyle.alertTitle}
        messageStyle={globalStyle.alertMessage}
        cancelButtonTextStyle={globalStyle.alertCancel}
        confirmButtonTextStyle={globalStyle.alertCancel}
      />
    </Body>
  );
};
// onPress={() => dispatch()}
export default SelectNewAddress;
