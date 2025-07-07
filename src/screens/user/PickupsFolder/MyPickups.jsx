import { ScrollView, FlatList, BackHandler } from "react-native";
import React, { useEffect } from "react";
import {
  Body,
  Text,
  Header,
  PrimeryTab,
  DraftHeader,
  PickupSection,
} from "../../../components";
import styles from "../userStyle";
import { wp } from "../../../theme/responsive";
import { Height } from "../../../theme/globalStyle";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { setPathType } from "../../../redux/slices/pickupSlice";
import { pickupData } from "../../../utils/data";

const MyPickups = () => {
  const dispatch = useDispatch();
  const { goBack, navigate } = useNavigation();
  const { pathType } = useSelector((state) => state.pickup);
  const isPickup = pathType === "setting";

  useEffect(() => {
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
      <ScrollView
        nestedScrollEnabled
        style={{ paddingHorizontal: wp(isPickup ? 0 : 5) }}
        showsVerticalScrollIndicator={false}
      >
        <Height />
        <FlatList
          data={pickupData}
          nestedScrollEnabled
          scrollEnabled={false}
          ListHeaderComponent={
            <Text style={styles.pickupTitle} title="Active Pickups" />
          }
          ListEmptyComponent={
            <Text title="You don't have any pickups scheduled yet." />
          }
          renderItem={({ item }) => <PickupSection data={item} />}
        />
        <Height />
        <FlatList
          data={[]}
          nestedScrollEnabled
          scrollEnabled={false}
          ListHeaderComponent={
            <Text style={styles.pickupTitle} title="Past Pickups" />
          }
          ListEmptyComponent={
            <Text title="You don't have any return history at the moment." />
          }
        />
      </ScrollView>
      {pathType !== "setting" && <PrimeryTab currentTab="myPickups" />}
    </Body>
  );
};

export default MyPickups;
