/* 
import { View, Text } from 'react-native'
import React,{useEffect, useState} from 'react'
import { pickupDetailAPI } from '../../../apis/pickupQueries';
import { useDispatch } from 'react-redux';

const PickupDetail = ({route}) => {
  const { item } = route.params;

  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);
    useEffect(() => {
    pickupDetailAPI(item._id, setLoad)(dispatch);
  }, []);
  return (
    <View>
      <Text>PickupDetail</Text>
    </View>
  )
}

export default PickupDetail
*/

import {
  View,
  FlatList,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import {
  Body,
  Text,
  Header,
  FullImage,
  CustomAlert,
  TrackingCard,
  PickupButton,
  ReturnSection,
} from "../../../components";

import moment from "moment";
import styles from "../userStyle";
import { iOS } from "../../../utils/constants";
import { colors } from "../../../theme/colors";
import React, { useEffect, useState } from "react";
import { appImages, fonts } from "../../../assets";
import { useDispatch, useSelector } from "react-redux";
import settingStyle from "../SettingFolder/settingStyle";
import { useNavigation } from "@react-navigation/native";
import { scaleSize, wp } from "../../../theme/responsive";
import { globalStyle, Height } from "../../../theme/globalStyle";
import { deletePickupAPI, pickupDetailAPI } from "../../../apis/pickupQueries";

const PickupDetail = ({ route }) => {
  const { item } = route.params;
  const dispatch = useDispatch();
  const { navigate } = useNavigation();

  const { data, trackingNumber, Carrier } = useSelector(
    (state) => state.pickup.pickupDetailData
  );

  const dd = useSelector((state) => state.pickup.pickupDetailData);

  const [load, setLoad] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const cancelled = data?.status === "Pickup Cancelled";

  const stepConfig = [
    {
      key: "Pickup Requested",
      label: "Pickup Requested",
      icon: appImages.pickup_truck,
      completedIf: [
        "Pickup Requested",
        "Picked Up",
        "Inspected",
        "In Transit",
        "Completed",
      ],
    },
    {
      key: "Picked Up",
      label: cancelled ? "Pickup Cancelled" : "Picked up by RB",
      icon: cancelled ? appImages.pickup_cross : appImages.pickup_user_cart,
      completedIf: ["Picked Up", "Inspected", "In Transit", "Completed"],
    },
    {
      key: "Inspected",
      label: "At RB Warehouse",
      icon: appImages.pickup_warehouse,
      completedIf: ["Inspected", "In Transit", "Completed"],
    },
    {
      key: "In Transit",
      label: `Dropped off at ${Carrier}`,
      icon: appImages.pickup_cube,
      completedIf: ["In Transit", "Completed"],
    },
  ];

  // Build dynamic steps from history
  const steps = stepConfig.map((cfg) => {
    const matched = data?.statusHistory?.find((s) => s.status === cfg.key);
    return {
      label: cfg.label,
      icon: cfg.icon,
      date: matched?.updatedAt || null,
      completed: cfg.completedIf.includes(data?.status),
    };
  });

  useEffect(() => {
    pickupDetailAPI(item._id, setLoad)(dispatch);
  }, []);

  return (
    <Body horizontal={wp(4)}>
      <Header leftTitle="Return Details" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={load}
            tintColor={colors.purple}
            onRefresh={() => pickupDetailAPI(item._id, setLoad)(dispatch)}
          />
        }
      >
        <Text style={styles.pickupTitle} title={`Pickup #${item.PickupName}`} />

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <View style={setpStyle.stepContainer}>
                <View
                  cla
                  style={[
                    setpStyle.iconWrapper,
                    {
                      borderWidth: 2,
                      borderColor: cancelled ? "#9E2424" : "#A259FF",
                      backgroundColor: cancelled
                        ? "#9E2424"
                        : step.completed
                        ? "#A259FF"
                        : "#fff",
                    },
                  ]}
                >
                  <FullImage
                    style={{ width: 20, height: 20 }}
                    source={step.icon}
                    color={
                      cancelled ? "#fff" : step.completed ? "#fff" : "#A259FF"
                    }
                  />
                </View>
                <Text style={setpStyle.label} title={step.label} />
                <Text
                  style={setpStyle.date}
                  title={
                    step.date ? moment(step.date).format("DD MMM, YYYY") : ""
                  }
                />
              </View>

              <View
                style={[
                  setpStyle.line,
                  { backgroundColor: cancelled ? "#9E2424" : colors.purple },
                ]}
              />
            </React.Fragment>
          ))}
        </ScrollView>

        <Height />
        {(!cancelled || Carrier !== "Not Available") && (
          <TrackingCard message={trackingNumber} carrier={Carrier} />
        )}

        <FlatList
          scrollEnabled={false}
          data={item?.bundleId}
          showsVerticalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          ListHeaderComponent={
            <Text style={styles.pickupTitle} title="Pickup Items" />
          }
          renderItem={({ item }) => <ReturnSection disabled section={item} />}
        />
        <Text
          style={[styles.pickupTitle, { marginBottom: -10 }]}
          title="Pickup Details"
        />
        <PickupButton
          disable
          isTwoDetail={data?.note}
          detail={data?.pickupType}
          source={appImages.location}
          twoDetail={`Notes: ${data?.note}`}
          title={data?.pickupAddress?.street}
        />
        <PickupButton
          disable
          source={appImages.clock}
          detail={data?.pickupTime}
          title={moment(data?.pickupDate).format("dddd, MMM DD, yy")}
        />
        <PickupButton disable source={appImages.call} title={data?.phone} />
        <PickupButton
          disable
          title={"Total"}
          source={appImages.priceTag}
          detail={`$${data?.totalPrice}`}
        />
        {/* {!(data?.status !== "Completed" || !cancelled) && ( */}
        {cancelled && (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setShowDelete(true)}
            style={[globalStyle.row, settingStyle.deleteButton]}
          >
            <Text
              color={colors.error}
              title="Cancel pickup"
              style={settingStyle.deleteText}
            />
          </TouchableOpacity>
        )}

        <Height />
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigate("support")}
        >
          <Text
            center
            color={colors.purple}
            style={styles.promoCode}
            title="Contact us for help"
          />
        </TouchableOpacity>
        <Height />
        {iOS && (
          <>
            <Height />
            <Height />
          </>
        )}
      </ScrollView>

      <CustomAlert
        isNote="No fees "
        show={showDelete}
        showProgress={load}
        cancelText="Keep pickup"
        confirmText="Cancel pickup"
        messageStyle={{ color: "#424242" }}
        onCancelPressed={() => setShowDelete(false)}
        title="Are you sure you want to cancel this pickup?"
        secMessage="If you wish to reschedule, please contact us."
        message={"will apply if cancelled before 9:00 AM on the day of pickup."}
        onConfirmPressed={() =>
          deletePickupAPI(item._id, setLoad, setShowDelete)(dispatch)
        }
      />
    </Body>
  );
};

export default PickupDetail;

const setpStyle = {
  stepContainer: {
    width: scaleSize(150),
    alignItems: "center",
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    color: "#333",
    marginTop: 10,
    marginVertical: 15,
    textAlign: "center",
    fontFamily: fonts[500],
  },
  date: {
    fontSize: 11,
    color: "#888",
    fontFamily: fonts[400],
  },
  line: {
    top: 20,
    height: 2,
    zIndex: -1,
    left: "15%",
    width: `${70}%`,
    position: "absolute",
  },
};
