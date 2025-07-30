import {
  Body,
  Empty,
  Header,
  MainButton,
  CustomAlert,
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
import { setDraftReturn } from "../../../redux/slices/draftSlice";
import { getAddressAPI, deleteAddressAPI } from "../../../apis/authQueries";
import { iOS } from "../../../utils/constants";
import { Height } from "../../../theme/globalStyle";

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
    <Body horizontal={wp(4)}>
      <Header
        leftTitle="Adresses"
        addBTN={getAddress?.length !== 0}
        onPress={() => navigate("addNewAddress")}
      />

      <SwipeListView
        data={getAddress}
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
            onPress={() => navigate("addNewAddress")}
            title="You don't have any saved addresses yet!"
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
      {iOS && <Height />}
      <CustomAlert
        showProgress={load}
        show={alert.visible}
        onCancelPressed={() => setAlert({ visible: false })}
        onConfirmPressed={() =>
          deleteAddressAPI(alert._id, setAlert, setLoad)(dispatch)
        }
        message={`Are you sure you want to delete this Address?\nThis action cannot be undone.`}
      />
    </Body>
  );
};

export default SelectNewAddress;
