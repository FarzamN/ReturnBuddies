import {
  Body,
  Empty,
  Header,
  MainButton,
  AddressCard,
} from "../../../components";
import { appImages } from "../../../assets";
import { wp } from "../../../theme/responsive";
import { colors } from "../../../theme/colors";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FlatList, RefreshControl } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getAddressAPI } from "../../../redux/queries/authQueries";

const SelectNewAddress = ({ route }) => {
  const { isPickup } = route.params || {};
  const disptch = useDispatch();

  const { navigate } = useNavigation();
  const { getAddress } = useSelector((state) => state.auth);

  const [load, setLoad] = useState(false);
  const [select, setSelect] = useState({ index: "", data: null });

  const onRefresh = () => {
    getAddressAPI(setLoad)(disptch);
  };

  useEffect(() => {
    getAddressAPI(setLoad)(disptch);
  }, []);

  return (
    <Body horizontal={wp(5)}>
      <Header
        leftTitle="Address"
        addBTN={getAddress.length !== 0}
        onPress={() => navigate("addNewAddress")}
      />

      <FlatList
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
            title="You dont have any saved addresses yet!"
            onPress={() => navigate("addNewAddress")}
          />
        }
      />
      {isPickup && getAddress.length !== 0 && <MainButton title="Continue" />}
    </Body>
  );
};
// onPress={() => disptch()}
export default SelectNewAddress;
