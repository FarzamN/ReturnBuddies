import {
  Body,
  Text,
  Empty,
  MainButton,
  PrimeryTab,
  DraftHeader,
  ReturnSection,
  DraftSkeleton,
} from "../../../components";

import { Height, globalStyle } from "../../../theme/globalStyle";

import styles from "../userStyle";
import { wp } from "../../../theme/responsive";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { BackHandler, FlatList, View, Text as RNText } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { getReturnItem, deleteBundle } from "../../../apis/draftQueries";
import { colors } from "../../../theme/colors";

const DraftItem = () => {
  const dispatch = useDispatch();
  const { navigate } = useNavigation();

  const { draftData } = useSelector((state) => state.draft);

  const [hasUnselected, setHasUnselected] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [selectedReturns, setSelectedReturns] = useState([]);
  // const [returnItemCount, setReturnItemCount] = useState(0);

  const toggleSelect = (returns) => {
    const { _id } = returns;
    setSelectedReturns((prev) =>
      prev.includes(_id)
        ? prev.filter((label) => label !== _id)
        : [...prev, _id]
    );
  };

  const returnItemCount = useMemo(() => {
    return selectedReturns.reduce((total, labelId) => {
      const returnObj = draftData.find((r) => r._id === labelId);
      return total + (returnObj?.products?.length || 0);
    }, 0);
  }, [selectedReturns, draftData]);

  const selectedCount = selectedReturns.length;
  // const selectedCount = 0;

  useEffect(() => {
    // setReturnItemCount(0);
    getReturnItem(setIsPending)(dispatch);
  }, []);

  useEffect(() => {
    const backAction = () => {
      if (selectedReturns.length > 0 && !hasUnselected) {
        setSelectedReturns([]);
        setHasUnselected(true);
        // setReturnItemCount(0);
        return true; // Block navigation, just unselect
      }

      return false; // Allow navigation now
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    setHasUnselected(false); // Reset when screen is exited
    return () => backHandler.remove();
  }, [selectedReturns, hasUnselected]);

  return (
    <Body>
      <DraftHeader />
      {/* <Height /> 
      <Icon
        type="AntDesign"
        name="behance-square"
        color="red"
        size={30}
        style={{ position: "absolute", top: 20, left: 20 }}
        onPress={() => deleteBundle(selectedReturns, setIsPending)(dispatch)}
      />
      */}
      <Height />

      {draftData && draftData.length > 0 && (
        <View style={{ paddingHorizontal: wp(5) }}>
          <Text style={styles.draftTitle} title="Your Returns" />
          <Text
            style={styles.draftSub}
            title={`Select item${
              draftData.length > 1 ? "s" : ""
            } to schedule pickup`}
          />
          <Height />
        </View>
      )}

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
              title="You have no items to return"
              customText={() => (
                <RNText
                  style={[
                    styles.draftCustomText,
                    {
                      color: colors.grey,
                    },
                  ]}
                >
                  Tap the{" "}
                  <Text
                    title="+"
                    color={colors.purple}
                    style={styles.draftCustomText}
                  />{" "}
                  button to start returning!
                </RNText>
              )}
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

      {selectedCount && draftData ? (
        <MainButton
          style={styles.button}
          textStyle={styles.buttonText}
          title={`Schedule Pickup for ${returnItemCount} Item${
            returnItemCount > 1 ? "s" : ""
          }`}
          onPress={() => {
            navigate("shippingLabel", { returnLabel: selectedReturns });
            setSelectedReturns([]);
          }}
        />
      ) : (
        <PrimeryTab currentTab="Home" />
      )}
    </Body>
  );
};

export default DraftItem;
