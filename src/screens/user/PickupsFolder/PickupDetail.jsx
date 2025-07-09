import React from "react";
import {
  Body,
  Header,
  ReturnInnerCard,
  Text,
  TrackingCard,
} from "../../../components";
import { scaleSize, wp } from "../../../theme/responsive";
import styles from "../userStyle";
import { FlatList, ScrollView, View } from "react-native";
import { colors } from "../../../theme/colors";
import Icon from "react-native-dynamic-vector-icons";
import { fonts } from "../../../assets";
import { Height } from "../../../theme/globalStyle";

const PickupDetail = ({ route }) => {
  const { item } = route.params;

  const steps = [
    {
      label: "Pickup Requested",
      icon: "truck",
      date: "17 June, 2025",
      completed: true,
      iconType: "Feather",
    },
    {
      label: "Picked up by RB",
      icon: "shopping-cart",
      date: "17 June, 2025",
      completed: false,
      iconType: "MaterialIcons",
    },
    {
      label: "Dropped off at UPS",
      icon: "cube",
      date: "17 June, 2025",
      completed: true,
      iconType: "Ionicons",
    },
  ];

  return (
    <Body horizontal={wp(5)}>
      <Header leftTitle="Return Details" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.pickupTitle} title={"Return #122"} />

        <View style={setpStyle.timeline}>
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <View style={setpStyle.stepContainer}>
                <View
                  style={[
                    setpStyle.iconWrapper,
                    {
                      borderWidth: 2,
                      borderColor: "#A259FF",
                      backgroundColor: step.completed ? "#A259FF" : "#fff",
                    },
                  ]}
                >
                  <Icon
                    type={step.iconType}
                    name={step.icon}
                    size={20}
                    color={step.completed ? "#fff" : "#A259FF"}
                  />
                </View>
                <Text style={setpStyle.label} title={step.label} />
                <Text style={setpStyle.date} title={step.date} />
              </View>

              {/* Line between steps */}
              {/* {index < steps.length - 1 &&} */}
              <View style={setpStyle.line} />
            </React.Fragment>
          ))}
        </View>
        <Height />
        <TrackingCard tracking={"2793 7264 9389"} />
        <FlatList
          data={item.products}
          showsVerticalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          ListHeaderComponent={
            <Text style={styles.pickupTitle} title="Pickup Items" />
          }
          renderItem={({ item }) => (
            <ReturnInnerCard data={item} background={colors.white} />
          )}
          scrollEnabled={false}
        />
        <Text style={styles.pickupTitle} title="Pickup Details" />
      </ScrollView>
    </Body>
  );
};

export default PickupDetail;

const setpStyle = {
  timeline: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexWrap: "nowrap",
  },
  stepContainer: {
    alignItems: "center",
    width: "30%",
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    marginTop: 10,
    textAlign: "center",
    color: "#333",
    fontFamily: fonts[500],
  },
  date: {
    fontSize: scaleSize(11),
    color: "#888",
    fontFamily: fonts[400],
  },
  line: {
    position: "absolute",
    top: 20,
    left: "20%",
    width: `${100 - 30}%`,
    height: 2,
    backgroundColor: "#A259FF",
    zIndex: -1,
  },
};
