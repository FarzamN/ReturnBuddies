import { useSelector } from "react-redux";
import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ImageBackground,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { colors } from "../../../theme/colors";
import { wp } from "../../../theme/responsive";
import Icon from "react-native-dynamic-vector-icons";
import { setLogout } from "../../../redux/slices/authSlice";
import { globalStyle } from "../../../theme/globalStyle";
import { appImages } from "../../../assets";
import { FullImage, MainButton } from "../../../components";
import { useNavigation } from "@react-navigation/native";

const settingsData = [
  { title: "Profile settings", icon: appImages.user, route: "editProfile" },
  { title: "Pickups", icon: appImages.box, route: "pickups" },
  { title: "Addresses", icon: appImages.location, route: "selectNewAddress" },
  {
    title: "Payment methods",
    icon: appImages.wallet_setting,
    route: "selectPaymentMethod",
  },
  {
    title: "Notifications",
    icon: appImages.notification,
    route: "notifications",
  },
  { title: "Support", icon: appImages.support, route: "support" },
  { title: "Privacy", icon: appImages.shield, route: "privacy" },
  { title: "Log out", icon: appImages.logout, type: "logout" },
];

const Setting = () => {
  const dispatch = useDispatch();
  const { navigate, goBack } = useNavigation();
  const { name, email } = useSelector((state) => state.auth.user);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() =>
        item.type === "logout" ? dispatch(setLogout()) : navigate(item.route)
      }
    >
      <View style={styles.iconCircle}>
        <FullImage source={item.icon} style={{ width: 22, height: 22 }} />
      </View>
      <Text style={styles.itemText}>{item.title}</Text>
      <Icon
        name="chevron-right"
        type="Entypo"
        size={18}
        color="#666"
        style={styles.chevron}
      />
    </TouchableOpacity>
  );

  return (
    <View style={globalStyle.flex}>
      <SafeAreaView style={styles.safeArea} />
      <StatusBar barStyle="dark-content" backgroundColor={colors.lightPurple} />
      <ImageBackground
        source={appImages.profileBackground}
        style={styles.topSection}
      >
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <Icon name="chevron-left" type="Entypo" size={24} color="#000" />
        </TouchableOpacity>
        <View style={styles.profileCard}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.email}>{email}</Text>
        </View>
      </ImageBackground>

      <View style={styles.contentContainer}>
        <Text style={styles.sectionTitle}>Settings</Text>
        <FlatList
          data={settingsData}
          renderItem={renderItem}
          keyExtractor={(_, i) => i.toString()}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          contentContainerStyle={{ paddingBottom: wp(10) }}
          ListFooterComponent={
            <MainButton
              style={{ backgroundColor: "#F31215", marginTop: 10 }}
              title="Delete Account"
              onPress={() => navigate("deleteAccount")}
            />
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.lightPurple,
  },
  topSection: {
    padding: wp(5),
    backgroundColor: colors.lightPurple,
  },
  backButton: {
    marginBottom: wp(3),
  },
  profileCard: {
    backgroundColor: colors.white,
    padding: wp(4),
    borderRadius: wp(4),
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  name: {
    fontSize: wp(5),
    fontWeight: "bold",
    color: colors.black,
  },
  email: {
    fontSize: wp(3.5),
    color: "#888",
    marginTop: wp(1),
  },
  contentContainer: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: wp(5),
    paddingTop: wp(5),
  },
  sectionTitle: {
    fontSize: wp(4.5),
    fontWeight: "bold",
    marginBottom: wp(5),
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: wp(4),
  },
  iconCircle: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(5),
    backgroundColor: "#F4E7FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: wp(4),
  },
  itemText: {
    fontSize: wp(4),
    color: colors.black,
    flex: 1,
    fontWeight: "500",
  },
  chevron: {
    marginLeft: wp(2),
  },
  separator: {
    height: 1,
    backgroundColor: "#EAEAEA",
  },
});

export default Setting;
