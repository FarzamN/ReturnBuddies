import React, { useEffect, useState } from "react";
import settingStyle from "./settingStyle";
import { wp } from "../../../theme/responsive";
import { colors } from "../../../theme/colors";
import { Body, Header, Text } from "../../../components";
import { View, FlatList, Switch, ScrollView } from "react-native";
import { Height, Space_Between } from "../../../theme/globalStyle";
import {
  getNotificationAPI,
  postNotificationAPI,
} from "../../../apis/authQueries";

const Notification = () => {
  const [textData, setTextData] = useState([
    {
      _id: "PickupUpdates",
      title: "Pickup Updates",
      detail:
        "Messages confirming your scheduled pickup, item pickup, and dropoff.",
      value: false,
    },
    {
      _id: "PickupReminder",
      title: "Pickup Reminder",
      detail:
        "A morning message letting you know a pickup is scheduled for today.",
      value: false,
    },
    {
      _id: "LabelIssues",
      title: "Label Issues",
      detail:
        "Messages if your return label is missing, inval_id, or can’t be processed.",
      value: false,
    },
  ]);

  const [emailData, setEmailData] = useState([
    {
      _id: "AccountSecurity",
      title: "Account & Security",
      detail: "Important account, support and security related messages.",
      value: false,
    },
    {
      _id: "DraftReminder",
      title: "Draft Reminders",
      detail: "Reminder to finish scheduling items saved in drafts.",
      value: false,
    },
    {
      _id: "PickupConfirmation",
      title: "Pickup Confirmations",
      detail:
        "Details of when your pickup is scheduled, upcoming, completed, or rescheduled.",
      value: false,
    },
  ]);

  const handleToggle = (section, index) => {
    let updatedTextData = [...textData];
    let updatedEmailData = [...emailData];

    if (section === "text") {
      updatedTextData[index].value = !updatedTextData[index].value;
      setTextData(updatedTextData);
    } else {
      updatedEmailData[index].value = !updatedEmailData[index].value;
      setEmailData(updatedEmailData);
    }

    // ✅ Merge both arrays after updating
    const merged = [...updatedTextData, ...updatedEmailData];

    // ✅ Convert to desired object format
    const data = merged.reduce((acc, item) => {
      acc[item._id] = item.value;
      return acc;
    }, {});

    postNotificationAPI(data);
  };

  useEffect(() => {
    getNotificationAPI(setEmailData, setTextData);
  }, []);

  const renderItem = (item, index, section) => (
    <View style={settingStyle.toggleItemContainer}>
      <View style={{ flex: 1 }}>
        <Space_Between>
          <Text style={settingStyle.itemTitle} title={item.title} />
          <Switch
            value={item.value}
            thumbColor={colors.white}
            onValueChange={() => handleToggle(section, index)}
            trackColor={{ false: colors.description, true: colors.purple }}
          />
        </Space_Between>
        <Text style={settingStyle.itemDetail} title={item.detail} />
      </View>
    </View>
  );

  return (
    <Body horizontal={wp(4)}>
      <Header leftTitle="Notifications" />
      <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled>
        <Text style={settingStyle.settingTitle} title="Text Message" />
        <FlatList
          data={textData}
          nestedScrollEnabled
          scrollEnabled={false}
          keyExtractor={(item) => item._id}
          contentContainerStyle={settingStyle.whiteFlatlistBox}
          renderItem={({ item, index }) => renderItem(item, index, "text")}
          ItemSeparatorComponent={() => <View style={settingStyle.separator} />}
        />
        <Height />

        <Text style={settingStyle.settingTitle} title="Email Notification" />
        <FlatList
          data={emailData}
          nestedScrollEnabled
          scrollEnabled={false}
          keyExtractor={(item) => item._id}
          contentContainerStyle={settingStyle.whiteFlatlistBox}
          renderItem={({ item, index }) => renderItem(item, index, "email")}
          ItemSeparatorComponent={() => <View style={settingStyle.separator} />}
        />
      </ScrollView>
    </Body>
  );
};

export default Notification;
