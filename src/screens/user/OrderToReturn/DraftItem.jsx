import {
  Body,
  Text,
  Empty,
  PrimeryTab,
  DraftHeader,
  ReturnSection,
  MainButton,
  DraftSkeleton,
} from "../../../components";

import {
  Height,
  Divider,
  globalStyle,
  Space_Between,
} from "../../../theme/globalStyle";

import styles from "../userStyle";
import React, { useEffect, useState } from "react";
import { wp } from "../../../theme/responsive";
// import { draftData } from "../../../utils/data";
import { useNavigation } from "@react-navigation/native";
import { FlatList, View } from "react-native";
import {
  deleteBundle,
  getReturnItem,
} from "../../../redux/queries/draftQueries";
import { useDispatch, useSelector } from "react-redux";
import Icon from "react-native-dynamic-vector-icons";

const DraftItem = () => {
  const dispatch = useDispatch();
  const { navigate } = useNavigation();

  const { draftData } = useSelector((state) => state.draft);

  const [isPending, setIsPending] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [selectedReturns, setSelectedReturns] = useState([]);
  const [returnItemCount, setReturnItemCount] = useState(0);
  const toggleSelect = (returns) => {
    const { _id, products } = returns;
    setSelectedReturns((prev) => {
      let newSelected;
      if (prev.includes(_id)) {
        newSelected = prev.filter((label) => label !== _id);
        setReturnItemCount((count) => count - products.length);
      } else {
        newSelected = [...prev, _id];
        setReturnItemCount((count) => count + products.length);
      }
      return newSelected;
    });
  };
  const selectedCount = selectedReturns.length;
  // const selectedCount = 0;

  useEffect(() => {
    getReturnItem(setIsPending)(dispatch);
  }, []);

  return (
    <Body>
      <DraftHeader />
      {/* <Height /> */}
      <Icon
        type="AntDesign"
        name="behance-square"
        color="red"
        size={30}
        style={{ position: "absolute", top: 20, left: 20 }}
        onPress={() => deleteBundle(selectedReturns, setIsPending)(dispatch)}
      />
      <View style={{ paddingHorizontal: wp(5) }}>
        <Text style={styles.draftTitle} title="Your Returns" />
        <Text
          style={styles.draftSub}
          title="Select return(s) to schedule pickup"
        />
        <Height />
      </View>

      {isPending ? (
        <FlatList
          data={[1, 1, 1]}
          contentContainerStyle={globalStyle.ph15}
          keyExtractor={(_, index) => index.toString()}
          renderItem={() => <DraftSkeleton height={70} />}
        />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          refreshing={refresh}
          onRefresh={() => {
            setRefresh(true);
            getReturnItem(setIsPending)(dispatch);
            setRefresh(false);
          }}
          data={draftData}
          contentContainerStyle={globalStyle.ph15}
          keyExtractor={(_, index) => index.toString()}
          ListEmptyComponent={
            <Empty
              title="No Drafts Items"
              sub="Please Add items by pressing (Plus +) button"
            />
          }
          renderItem={({ item }) => (
            <ReturnSection
              section={item}
              onSelect={toggleSelect}
              selected={selectedReturns.includes(item._id)}
            />
          )}
        />
      )}

      {selectedCount ? (
        <MainButton
          style={styles.button}
          textStyle={styles.buttonText}
          title={`Schedule Pickup for ${returnItemCount} Item${
            returnItemCount > 1 ? "s" : ""
          }`}
          onPress={() =>
            navigate("shippingLabel", { returnLabel: selectedReturns })
          }
        />
      ) : (
        <PrimeryTab currentTab="Home" />
      )}
    </Body>
  );
};

export default DraftItem;
