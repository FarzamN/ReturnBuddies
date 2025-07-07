import React, { useState } from "react";
import { View, FlatList, Switch, ScrollView } from "react-native";
import { wp } from "../../../theme/responsive";
import { Body, Header, Text } from "../../../components";
import settingStyle from "./settingStyle";
import { Height, Space_Between } from "../../../theme/globalStyle";

const Notification = () => {
  const [textData, setTextData] = useState([
    {
      id: "pickup_updates",
      title: "Pickup Updates",
      detail:
        "Messages confirming your scheduled pickup, item pickup, and dropoff.",
      value: true,
    },
    {
      id: "pickup_reminder",
      title: "Pickup Reminder",
      detail:
        "A morning message letting you know a pickup is scheduled for today.",
      value: true,
    },
    {
      id: "label_issues",
      title: "Label Issues",
      detail:
        "Messages if your return label is missing, invalid, or can’t be processed.",
      value: true,
    },
  ]);

  const [emailData, setEmailData] = useState([
    {
      id: "account_security",
      title: "Account & Security",
      detail: "Important account, support and security related messages.",
      value: false,
    },
    {
      id: "draft_reminders",
      title: "Draft Reminders",
      detail: "Reminder to finish scheduling items saved in drafts.",
      value: true,
    },
    {
      id: "pickup_confirmations",
      title: "Pickup Confirmations",
      detail:
        "Details of when your pickup is scheduled, upcoming, completed, or rescheduled.",
      value: true,
    },
  ]);

  const handleToggle = (section, index) => {
    const newData = [...(section === "text" ? textData : emailData)];
    newData[index].value = !newData[index].value;

    if (section === "text") setTextData(newData);
    else setEmailData(newData);

    // API Call
    // updateNotificationSetting(newData[index].id, newData[index].value);
    console.log(newData[index].id, newData[index].value);
  };

  const renderItem = (item, index, section) => (
    <View style={settingStyle.toggleItemContainer}>
      <View style={{ flex: 1 }}>
        <Space_Between>
          <Text style={settingStyle.itemTitle} title={item.title} />
          <Switch
            value={item.value}
            onValueChange={() => handleToggle(section, index)}
            trackColor={{ false: "#ccc", true: "#A259FF" }}
            thumbColor="#fff"
          />
        </Space_Between>
        <Text style={settingStyle.itemDetail} title={item.detail} />
      </View>
    </View>
  );

  return (
    <Body horizontal={wp(5)}>
      <Header leftTitle="Notifications" />
      <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled>
        <Text style={settingStyle.settingTitle} title="Text Message" />
        <Height />
        <FlatList
          scrollEnabled={false}
          nestedScrollEnabled
          data={textData}
          keyExtractor={(item) => item.id}
          contentContainerStyle={settingStyle.whiteFlatlistBox}
          ItemSeparatorComponent={() => <View style={settingStyle.separator} />}
          renderItem={({ item, index }) => renderItem(item, index, "text")}
        />
        <Height />

        <Text style={settingStyle.settingTitle} title="Email Notification" />
        <FlatList
          scrollEnabled={false}
          nestedScrollEnabled
          data={emailData}
          keyExtractor={(item) => item.id}
          contentContainerStyle={settingStyle.whiteFlatlistBox}
          ItemSeparatorComponent={() => <View style={settingStyle.separator} />}
          renderItem={({ item, index }) => renderItem(item, index, "email")}
        />
      </ScrollView>
    </Body>
  );
};

export default Notification;
