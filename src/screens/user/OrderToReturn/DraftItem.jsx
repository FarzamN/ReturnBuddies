import {
  View,
  BackHandler,
  RefreshControl,
  Text as RNText,
  FlatList,
  TouchableOpacity,
  ScrollView,
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
import { SwipeListView } from "react-native-swipe-list-view";
import { Height, globalStyle } from "../../../theme/globalStyle";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { getReturnItem, deleteBundle } from "../../../apis/draftQueries";
import DynamicIcon from "../../../utils/DynamicLucideIcon";

const DraftItem = () => {
  const dispatch = useDispatch();
  const { navigate } = useNavigation();

  // const draftData = [];
  const { draftData } = useSelector((state) => state.draft);

  const flatListRef = useRef(null);

  const scrollToBottom = () =>
    flatListRef.current.scrollToEnd({ animated: true });

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

      <ScrollView
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
        ref={flatListRef}
      >
        <SwipeListView
          nestedScrollEnabled
          scrollEnabled={false}
          refreshControl={
            <RefreshControl
              refreshing={isPending}
              colors={[colors.purple]}
              tintColor={colors.purple}
              onRefresh={() => getReturnItem(setIsPending)(dispatch)}
            />
          }
          data={draftData}
          contentContainerStyle={globalStyle.ph15}
          keyExtractor={(_, index) => index.toString()}
          ListFooterComponent={
            <>
              {selectedCount && draftData ? (
                <MainButton
                  style={[
                    styles.button,
                    { width: undefined, paddingHorizontal: 30, height: 45 },
                  ]}
                  textStyle={[
                    styles.buttonText,
                    {
                      fontSize: 14,
                      fontFamily: fonts[500],
                    },
                  ]}
                  title={`Schedule Pickup for ${returnItemCount} Item${
                    returnItemCount > 1 ? "s" : ""
                  }`}
                  onPress={() => {
                    navigate("shippingLabel", { returnLabel: selectedReturns });
                    setSelectedReturns([]);
                  }}
                  // onPress={async () => {
                  //   try {
                  //     const userId = getItem("userID");

                  //     const res = await fetch(`${imageURl}api/test`, {
                  //       method: "POST",
                  //       headers: {
                  //         "Content-Type": "application/json",
                  //         Authorization: `Bearer ${getItem("token")}`,
                  //       },
                  //       body: JSON.stringify({ userId }), // ✅ Must stringify the object
                  //     });

                  //     const response = await res.json();
                  //     console.log(response);
                  //   } catch (error) {
                  //     console.error("Error sending test notification:", error);
                  //   }
                  // }}
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
      </ScrollView>

      {/* {selectedCount && draftData ? (
        <>
          <Height />

          <MainButton
            style={[
              styles.button,
              { width: undefined, paddingHorizontal: 30, height: 45 },
            ]}
            textStyle={[
              styles.buttonText,
              {
                fontSize: 14,
                fontFamily: fonts[500],
              },
            ]}
            title={`Schedule Pickup for ${returnItemCount} Item${
              returnItemCount > 1 ? "s" : ""
            }`}
            onPress={() => {
              navigate("shippingLabel", { returnLabel: selectedReturns });
              setSelectedReturns([]);
            }}
            // onPress={async () => {
            //   try {
            //     const userId = getItem("userID");

            //     const res = await fetch(`${imageURl}api/test`, {
            //       method: "POST",
            //       headers: {
            //         "Content-Type": "application/json",
            //         Authorization: `Bearer ${getItem("token")}`,
            //       },
            //       body: JSON.stringify({ userId }), // ✅ Must stringify the object
            //     });

            //     const response = await res.json();
            //     console.log(response);
            //   } catch (error) {
            //     console.error("Error sending test notification:", error);
            //   }
            // }}
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
      {returnItemCount > 0 && (
        <TouchableOpacity onPress={scrollToBottom}>
          <DynamicIcon
            name="CircleArrowDown"
            color={colors.purple}
            size={35}
            style={{
              position: "absolute",
              right: 30,
              bottom: 120,
            }}
          />
        </TouchableOpacity>
      )}
    </Body>
  );
};

export default DraftItem;
