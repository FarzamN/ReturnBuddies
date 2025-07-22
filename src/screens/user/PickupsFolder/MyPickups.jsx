import {
  FlatList,
  ScrollView,
  BackHandler,
  RefreshControl,
} from "react-native";
import {
  Body,
  Text,
  Header,
  PrimeryTab,
  DraftHeader,
  PickupSection,
  DraftSkeleton,
} from "../../../components";

import styles from "../userStyle";
import { wp } from "../../../theme/responsive";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { getPickupAPI } from "../../../apis/pickupQueries";
import { setPathType } from "../../../redux/slices/pickupSlice";
import { globalStyle, Height } from "../../../theme/globalStyle";
import { colors } from "react-native-swiper-flatlist/src/themes";

const MyPickups = () => {
  const dispatch = useDispatch();
  const { goBack, navigate } = useNavigation();
  const { pathType, pickupData } = useSelector((state) => state.pickup);
  const isPickup = pathType === "setting";

  const [load, setLoad] = useState(false);

  const onRefresh = () => {
    getPickupAPI(setLoad)(dispatch);
  };
  useEffect(() => {
    getPickupAPI(setLoad)(dispatch);

    const backAction = () => {
      dispatch(setPathType("notSetting"));
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, []);

  return (
    <Body horizontal={wp(isPickup ? 5 : 0)}>
      {isPickup ? (
        <Header
          leftTitle="Pickups"
          onBackPress={() => {
            goBack();
            dispatch(setPathType("notSetting"));
          }}
        />
      ) : (
        <DraftHeader pickup />
      )}

      {load ? (
        <>
          <FlatList
            data={[1, 1, 1]}
            contentContainerStyle={globalStyle.ph15}
            keyExtractor={(_, index) => index.toString()}
            renderItem={() => <DraftSkeleton height={70} />}
          />
        </>
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={load}
              onRefresh={onRefresh}
              tintColor={colors.purple}
            />
          }
          nestedScrollEnabled
          showsVerticalScrollIndicator={false}
          style={{ paddingHorizontal: wp(isPickup ? 0 : 5) }}
        >
          <Height />

          <FlatList
            nestedScrollEnabled
            scrollEnabled={false}
            data={pickupData.active}
            ListHeaderComponent={
              <Text style={styles.pickupTitle} title="Active Pickups" />
            }
            ListEmptyComponent={
              <Text
                style={{ fontSize: 12 }}
                title="You don't have any pickups scheduled yet."
              />
            }
            renderItem={({ item }) => (
              <PickupSection
                data={item}
                onPress={() => navigate("pickupDetail", { item })}
              />
            )}
          />
          <Height />
          <FlatList
            nestedScrollEnabled
            data={pickupData.past}
            scrollEnabled={false}
            ListHeaderComponent={
              <Text style={styles.pickupTitle} title="Past Pickups" />
            }
            ListEmptyComponent={
              <Text
                style={{ fontSize: 12 }}
                title="You don't have any return history at the moment."
              />
            }
            renderItem={({ item }) => (
              <PickupSection
                data={item}
                onPress={() => navigate("pickupDetail", { item })}
              />
            )}
          />
        </ScrollView>
      )}

      {pathType !== "setting" && <PrimeryTab currentTab="myPickups" />}
    </Body>
  );
};

export default MyPickups;
