import React from "react";
import { View, Text, SectionList, TouchableOpacity } from "react-native";
import { Body, Empty, Header } from "../../../components";
import { wp } from "../../../theme/responsive";
import Icon from "react-native-dynamic-vector-icons";
import { colors } from "../../../theme/colors";

const notificationData = [
  {
    title: "Today",
    data: [
      {
        id: 1,
        title: "Account Security Alert",
        message:
          "We’ve noticed some unusual activity on your account. Please review your recent logins and update your password if necessary.",
        time: "09:41 AM",
        icon: "shield",
        new: true,
      },
      {
        id: 2,
        title: "System Update Available",
        message:
          "A new system update is ready for installation. It includes performance improvements and bug fixes.",
        time: "09:41 AM",
        icon: "info",
        new: true,
      },
    ],
  },
  {
    title: "Yesterday",
    data: [
      {
        id: 3,
        title: "Password Reset Successful",
        message:
          "Your password has been successfully reset. If you didn’t request this change, please contact support immediately.",
        time: "09:41 AM",
        icon: "lock",
        new: false,
      },
      {
        id: 4,
        title: "Exciting New Feature",
        message:
          "We’ve just launched a new feature that will enhance your user experience, check it out now!",
        time: "09:41 AM",
        icon: "star",
        new: false,
      },
    ],
  },
];

const renderItem = ({ item }) => (
  <TouchableOpacity
    style={{
      flexDirection: "row",
      alignItems: "flex-start",
      paddingVertical: wp(4),
      borderBottomWidth: 0.5,
      borderColor: "#ccc",
    }}
  >
    {/* Icon */}
    <View
      style={{
        width: wp(10),
        height: wp(10),
        borderRadius: wp(5),
        backgroundColor: "#f0f0f0",
        justifyContent: "center",
        alignItems: "center",
        marginRight: wp(3),
      }}
    >
      <Icon type="Feather" name={item.icon} size={18} color="#555" />
    </View>

    {/* Text Content */}
    <View style={{ flex: 1 }}>
      <Text style={{ fontWeight: "600", fontSize: 14 }}>{item.title}</Text>
      <Text style={{ color: "#666", fontSize: 13, marginTop: 2 }}>
        {item.message}
      </Text>
      <Text style={{ color: "#aaa", fontSize: 11, marginTop: 4 }}>
        {item.time}
      </Text>
    </View>

    {/* New dot */}
    {item.new && (
      <View
        style={{
          width: 8,
          height: 8,
          borderRadius: 4,
          backgroundColor: colors.purple,
          marginTop: 6,
        }}
      />
    )}

    {/* Arrow */}
    <Icon
      type="Feather"
      name="chevron-right"
      size={18}
      color="#ccc"
      style={{ marginLeft: 6, marginTop: 2 }}
    />
  </TouchableOpacity>
);

const renderSectionHeader = ({ section: { title } }) => (
  <Text
    style={{
      fontWeight: "600",
      color: "#999",
      marginTop: wp(5),
      marginBottom: wp(2),
    }}
  >
    {title}
  </Text>
);

const Notification = () => {
  return (
    <Body horizontal={wp(5)}>
      <Header title="Notification" />

      {notificationData.length === 0 ? (
        <Empty
          title="No Notification"
          sub="You will receive notifications here"
        />
      ) : (
        <SectionList
          sections={notificationData}
          keyExtractor={(item, index) =>
            item.id?.toString() || index.toString()
          }
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
          showsVerticalScrollIndicator={false}
        />
      )}
    </Body>
  );
};

export default Notification;
