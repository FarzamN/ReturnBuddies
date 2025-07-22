import React, { useState } from "react";
import settingStyle from "./settingStyle";
import { wp } from "../../../theme/responsive";
import { colors } from "../../../theme/colors";
import { Body, Header, Text } from "../../../components";
import { View, FlatList, Switch, ScrollView } from "react-native";
import { Height, Space_Between } from "../../../theme/globalStyle";

const Notification = () => {
  const [textData, setTextData] = useState([
    {
      _id: "pickup_updates",
      title: "Pickup Updates",
      detail:
        "Messages confirming your scheduled pickup, item pickup, and dropoff.",
      value: true,
    },
    {
      _id: "pickup_reminder",
      title: "Pickup Reminder",
      detail:
        "A morning message letting you know a pickup is scheduled for today.",
      value: true,
    },
    {
      _id: "label_issues",
      title: "Label Issues",
      detail:
        "Messages if your return label is missing, inval_id, or can’t be processed.",
      value: true,
    },
  ]);

  const [emailData, setEmailData] = useState([
    {
      _id: "account_security",
      title: "Account & Security",
      detail: "Important account, support and security related messages.",
      value: true,
    },
    {
      _id: "draft_reminders",
      title: "Draft Reminders",
      detail: "Reminder to finish scheduling items saved in drafts.",
      value: true,
    },
    {
      _id: "pickup_confirmations",
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

    // updateNotificationSetting(newData[index]._id, newData[index].value);
    console.log(newData[index]._id, newData[index].value);
  };

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
    <Body horizontal={wp(5)}>
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
