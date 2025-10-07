import {
  View,
  BackHandler,
  RefreshControl,
  Text as RNText,
} from "react-native";
import {
  Body,
  Text,
  Empty,
  MainButton,
  PrimeryTab,
  DraftHeader,
  CustomAlert,
  HiddenDelete,
  ReturnSection,
} from "../../../components";
import styles from "../userStyle";
import { fonts } from "../../../assets";
import { colors } from "../../../theme/colors";
import { wp } from "../../../theme/responsive";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useMemo, useState } from "react";
import { SwipeListView } from "react-native-swipe-list-view";
import { Height, globalStyle } from "../../../theme/globalStyle";
import { getReturnItem, deleteBundle } from "../../../apis/draftQueries";

const DraftItem = () => {
  const dispatch = useDispatch();
  const { navigate } = useNavigation();

  // const draftData = [];
  const { draftData } = useSelector((state) => state.draft);

  const [isPending, setIsPending] = useState(false);
  const [hasUnselected, setHasUnselected] = useState(false);
  const [selectedReturns, setSelectedReturns] = useState([]);
  const [alert, setAlert] = useState({ visible: false, _id: "" });

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

  useEffect(() => {
    getReturnItem(setIsPending)(dispatch);
  }, []);

  useEffect(() => {
    const backAction = () => {
      if (selectedReturns.length > 0 && !hasUnselected) {
        setSelectedReturns([]);
        setHasUnselected(true);
        return true;
      }

      return false;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    setHasUnselected(false);
    return () => backHandler.remove();
  }, [selectedReturns, hasUnselected]);

  return (
    <Body>
      <DraftHeader />
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

      <SwipeListView
        refreshControl={
          <RefreshControl
            refreshing={isPending}
            colors={[colors.purple]}
            tintColor={colors.purple}
            onRefresh={() => getReturnItem(setIsPending)(dispatch)}
          />
        }
        data={draftData}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={globalStyle.ph15}
        keyExtractor={(_, index) => index.toString()}
        ListFooterComponent={
          <>
            {selectedCount && draftData ? (
              <MainButton
                style={[
                  styles.button,
                  { width: undefined, paddingHorizontal: 30,height: 45 },
                ]}
                textStyle={[styles.buttonText,{
                  fontSize: 12.5,
                  fontFamily: fonts[500],
                }]}
                title={`Schedule Pickup for ${returnItemCount} Item${
                  returnItemCount > 1 ? "s" : ""
                }`}
                onPress={() => {
                  navigate("shippingLabel", { returnLabel: selectedReturns });
                  setSelectedReturns([]);
                }}
              />
            ) : (
              <></>
            )}
          </>
        }
        ListEmptyComponent={
          <Empty
            title="You have no items to return"
            titleStyle={{ fontFamily: fonts[600], fontSize: 19 }}
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
        renderHiddenItem={({ item, index }, rowMap) => (
          <HiddenDelete
            height={70}
            radius={12}
            alignItems="center"
            onPress={() => {
              rowMap[index]?.closeRow();
              setAlert({ visible: true, _id: item._id });
            }}
          />
        )}
        disableRightSwipe
        rightOpenValue={-75}
      />

      {/* {selectedCount && draftData ? (
        <>
          <MainButton
            style={[styles.button, { width: undefined, paddingHorizontal: 15 }]}
            textStyle={styles.buttonText}
            title={`Schedule Pickup for ${returnItemCount} Item${
              returnItemCount > 1 ? "s" : ""
            }`}
            onPress={() => {
              navigate("shippingLabel", { returnLabel: selectedReturns });
              setSelectedReturns([]);
            }}
          />
          <Height />
        </>
      ) : (
        <PrimeryTab currentTab="Home" />
      )} */}
        <PrimeryTab currentTab="Home" />

      <CustomAlert
        show={alert.visible}
        showProgress={isPending}
        onCancelPressed={() => setAlert({ visible: false })}
        onConfirmPressed={() =>
          deleteBundle(alert._id, setAlert, setIsPending)(dispatch)
        }
        message={`Are you sure you want to delete this Bundle?\nThis action cannot be undone.`}
      />
    </Body>
  );
};

export default DraftItem;
