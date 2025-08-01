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
import settingStyle from "./settingStyle";
import { colors } from "../../../theme/colors";
import { FullImage } from "../../../components";
import { appImages, fonts } from "../../../assets";
import Icon from "react-native-dynamic-vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { globalStyle } from "../../../theme/globalStyle";
import { useNavigation } from "@react-navigation/native";
import { wp, scaleSize } from "../../../theme/responsive";
import { setLogout } from "../../../redux/slices/authSlice";
import { setPathType } from "../../../redux/slices/pickupSlice";

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
  { title: "Support", icon: appImages.support, route: "support" },
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
      <View style={styles.safeArea} />
      <StatusBar
        barStyle="dark-content"
        backgroundColor={colors.none}
        translucent
      />

      <Image
        resizeMode="cover"
        source={appImages.profileBackground}
        style={{
          height: 230,
          width: "100%",
          position: "absolute",
        }}
      />

      <Icon
        size={20}
        type="Ionicons"
        onPress={goBack}
        name="arrow-back"
        color={colors.black}
        style={styles.backButton}
      />
      <View style={styles.profileCard}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.email}>{email}</Text>
        {/* </ImageBackground> */}
      </View>
      <View style={styles.contentContainer}>
        <Text style={[settingStyle.settingTitle, { marginTop: scaleSize(35) }]}>
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
    height: 35,
    backgroundColor: colors.lightPurple,
  },
  backButton: {
    zIndex: 9,
    top: scaleSize(80),
    marginBottom: wp(5),
    marginHorizontal: wp(5),
  },
  profileCard: {
    zIndex: 9,
    elevation: 3,
    padding: wp(4),
    shadowRadius: 6,
    top: scaleSize(60),
    shadowOpacity: 0.05,
    borderRadius: wp(4),
    shadowColor: "#000",
    marginVertical: wp(6),
    marginHorizontal: wp(5),
    backgroundColor: colors.white,
  },
  name: {
    fontSize: 17,
    color: colors.black,
    fontFamily: fonts[600],
  },
  email: {
    fontSize: 12,
    color: "#888",
    fontFamily: fonts[500],
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
    marginRight: wp(4),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.lightPurple,
  },
  itemText: {
    flex: 1,
    fontSize: 13,
    color: colors.black,
    fontFamily: fonts[500],
  },
  chevron: {
    marginLeft: wp(2),
  },
});

export default Setting;
