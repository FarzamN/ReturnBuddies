import {
  View,
  Text,
  FlatList,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { appImages, fonts } from "../../../assets";
import { colors } from "../../../theme/colors";
import {
  fontScale,
  scaleSize,
  verticalScale,
  wp,
} from "../../../theme/responsive";
import Icon from "react-native-dynamic-vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { globalStyle } from "../../../theme/globalStyle";
import { useNavigation } from "@react-navigation/native";
import { FullImage, MainButton } from "../../../components";
import { setLogout } from "../../../redux/slices/authSlice";

const settingsData = [
  { title: "Profile settings", icon: appImages.user, route: "editProfile" },
  { title: "Pickups", icon: appImages.box, route: "returnHistory" },
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
  { title: "Support", icon: appImages.support, route: "contactUS" },
  { title: "FAQs", icon: appImages.support, route: "faq" },
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
      <View style={styles.topSection}>
        {/* <ImageBackground
          resizeMode="contain"
          
          source={appImages.profileBackground}
        > */}
        <Image
          resizeMode="cover"
          source={appImages.profileBackground}
          style={{
            height: 100,
            width: "100%",
            position: "absolute",
            transform: [{ rotate: "-10deg" }], // Rotate 45 degrees
          }}
        />
        <Icon
          onPress={goBack}
          style={styles.backButton}
          size={20}
          type="Ionicons"
          name="arrow-back"
          color={colors.black}
        />
        <View style={styles.profileCard}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.email}>{email}</Text>
        </View>
        {/* </ImageBackground> */}
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.sectionTitle}>Settings</Text>
        <FlatList
          data={settingsData}
          renderItem={renderItem}
          keyExtractor={(_, i) => i.toString()}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          contentContainerStyle={{ paddingBottom: wp(10) }}
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
    top: scaleSize(50),
    zIndex: 9,
  },
  profileCard: {
    backgroundColor: colors.white,
    padding: wp(4),
    borderRadius: wp(4),
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
    // position: "absolute",
    top: scaleSize(50),
    zIndex: 9,
  },
  name: {
    color: colors.black,
    fontFamily: fonts[600],
    fontSize: fontScale(17),
  },
  email: {
    color: "#888",
    fontFamily: fonts[500],
    fontSize: fontScale(12),
  },
  contentContainer: {
    flex: 1,
    paddingTop: wp(5),
    paddingHorizontal: wp(5),
    backgroundColor: colors.background,
  },
  sectionTitle: {
    fontFamily: fonts[600],
    fontSize: fontScale(16),
    marginBottom: verticalScale(5),
    marginTop: scaleSize(20),
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
    flex: 1,
    color: colors.black,
    fontFamily: fonts[600],
    fontSize: fontScale(13),
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
