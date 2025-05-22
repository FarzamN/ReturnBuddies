import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Switch,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { Body, Header } from "../../../components";
import { wp } from "../../../theme/responsive";
import Icon from "react-native-dynamic-vector-icons";
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/slices/authSlice";
import { colors } from "../../../theme/colors";

const settingsData = [
  { title: "Edit Profile", route: "editProfile" },
  { title: "Notification", type: "toggle" },
  { title: "Change Password", route: "changePassword" },
  { title: "Terms of Service", route: "terms" },
  { title: "FAQ's", route: "faq" },
  { title: "Privacy Policy", route: "privacy" },
  { title: "View Return History", route: "returnHistory" },
  { title: "Contact Us", route: "contactUS" },
  { title: "Logout", type: "logout" },
  { title: "Delete Account", route: "deleteAccount" },
];

const Setting = () => {
  const dispatch = useDispatch();
  const { navigate } = useNavigation();
  const [isNotificationEnabled, setNotificationEnabled] = useState(false);

  const toggleNotification = () =>
    setNotificationEnabled((previousState) => !previousState);

  const renderItem = ({ item }) => {
    if (item.type === "toggle") {
      return (
        <View style={styles.row}>
          <Text style={styles.text}>{item.title}</Text>
          <Switch
            value={isNotificationEnabled}
            onValueChange={toggleNotification}
            thumbColor={
              isNotificationEnabled ? colors.purple : colors.placeholder
            }
            trackColor={{ false: colors.borderColor, true: colors.borderColor }}
          />
        </View>
      );
    }

    return (
      <TouchableOpacity
        style={styles.row}
        onPress={() => {
          if (item.type === "logout") {
            dispatch(setUser(null));
          } else {
            navigate(item?.route || "");
          }
        }}
      >
        <Text style={styles.text}>{item.title}</Text>
        <Icon name="chevron-right" type="Entypo" size={18} color="#000" />
      </TouchableOpacity>
    );
  };

  return (
    <Body horizontal={wp(5)}>
      <Header title="Settings" />
      <FlatList
        data={settingsData}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </Body>
  );
};

const styles = StyleSheet.create({
  row: {
    paddingVertical: wp(4),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontSize: wp(4),
    color: "#000",
    fontWeight: "500",
  },
  separator: {
    height: 1,
    backgroundColor: "#E0E0E0",
  },
});

export default Setting;
