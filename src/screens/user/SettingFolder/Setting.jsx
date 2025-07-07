import {
  View,
  Text,
  Image,
  FlatList,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import {
  wp,
  fontScale,
  scaleSize,
  verticalScale,
} from "../../../theme/responsive";
import { colors } from "../../../theme/colors";
import { FullImage } from "../../../components";
import { appImages, fonts } from "../../../assets";
import Icon from "react-native-dynamic-vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { globalStyle } from "../../../theme/globalStyle";
import { useNavigation } from "@react-navigation/native";
import { setLogout } from "../../../redux/slices/authSlice";
import { setPathType } from "../../../redux/slices/pickupSlice";
import settingStyle from "./settingStyle";

const settingsData = [
  { title: "Profile settings", icon: appImages.user, route: "editProfile" },
  { title: "Pickups", icon: appImages.box, route: "myPickupsRoute" },
  { title: "Addresses", icon: appImages.location, route: "selectNewAddress" },
  {
    title: "Payment methods",
    icon: appImages.wallet_setting,
    route: "selectPaymentMethod",
  },
  {
    title: "Notifications",
    icon: appImages.notification,
    route: "notification",
  },
  { title: "Support", icon: appImages.support, route: "contactUS" },
  { title: "Privacy", icon: appImages.shield, route: "privacy" },
  { title: "Log out", icon: appImages.logout, type: "logout" },
];

const Setting = () => {
  const dispatch = useDispatch();
  const { navigate, goBack } = useNavigation();
  const { name, email } = useSelector((state) => state.auth.user);

  const handlePress = (item) => {
    if (item.type === "logout") {
      dispatch(setLogout());
    } else {
      if (item.title === "Pickups") {
        dispatch(setPathType("setting"));
        navigate("myPickupsRoute");
      }
      navigate(item.route);
    }
  };

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
        <Text style={[settingStyle.settingTitle, { marginTop: scaleSize(20) }]}>
          Settings
        </Text>
        <FlatList
          data={settingsData}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => handlePress(item)}
            >
              <View style={styles.iconCircle}>
                <FullImage
                  source={item.icon}
                  style={{ width: 22, height: 22 }}
                />
              </View>
              <Text style={styles.itemText}>{item.title}</Text>
              <Icon
                size={18}
                color="#666"
                type="Entypo"
                name="chevron-right"
                style={styles.chevron}
              />
            </TouchableOpacity>
          )}
          keyExtractor={(_, i) => i.toString()}
          contentContainerStyle={{ paddingBottom: wp(10) }}
          ItemSeparatorComponent={() => <View style={settingStyle.separator} />}
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
});

export default Setting;
