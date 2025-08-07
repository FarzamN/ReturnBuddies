import {
  View,
  Text,
  Image,
  StatusBar,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import React, { useRef } from "react";
import { colors } from "../../theme/colors";
import { iOS } from "../../utils/constants";
import { MainButton } from "../../components";
import { appImages, fonts } from "../../assets";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import { globalStyle, Height } from "../../theme/globalStyle";
import { hp, wp, width, height, scaleSize } from "../../theme/responsive";

const onboardingArray = [
  {
    key: 0,
    title: "Easy returns from your doorstep",
    desc: "Say goodbye to return hassles",
    image: appImages.onboard4,
  },
  {
    key: 1,
    title: "Choose items you want to return",
    desc: "Add your return items to your bag",
    image: appImages.onboard6,
  },
  {
    key: 2,
    title: "Select a pickup time and date that works for you",
    desc: "Flexible scheduling to fit your day",
    image: appImages.onboard5,
  },
];

const Onboarding = ({ navigation }) => {
  const { navigate } = navigation;
  const swiperRef = useRef(null);

  const DotComponent = ({ page }) => (
    <View style={[globalStyle.row_justify_center, globalStyle.mb30]}>
      {[1, 1, 1].map((_, index) => (
        <View key={index} style={styles.dotWrapper}>
          <View
            style={{
              borderRadius: 50,
              width: page === index ? wp(2) : wp(3),
              height: page === index ? wp(2) : wp(3),
              backgroundColor:
                page === index ? colors.purple : colors.borderColor,
            }}
          />
        </View>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={[globalStyle.Container]}>
      <StatusBar backgroundColor={colors.background} barStyle="dark-content" />
      <Image
        resizeMode="contain"
        style={styles.imageLogo}
        source={appImages.logoFullName}
      />
      <View style={styles.swiperContainer}>
        <SwiperFlatList
          ref={swiperRef}
          data={onboardingArray}
          renderItem={({ item }) => (
            <View style={styles.slide}>
              <Image
                source={item.image}
                style={styles.dynamicImage}
                resizeMode="contain"
              />
              <View style={globalStyle.mh10}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.subtitle}>{item.desc}</Text>
              </View>
              <Height />
              <DotComponent page={item.key} />
            </View>
          )}
        />
        <View style={styles.rowButtonWrapper}>
          <MainButton
            style={styles.loginButton}
            textStyle={{ color: colors.purple }}
            onPress={() => navigate("login")}
            title={"Login"}
          />
          <MainButton
            style={styles.createAccountButton}
            onPress={() => navigate("register")}
            title={"Create account"}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  imageLogo: {
    width: wp(43),
    height: wp(4.6),
    marginHorizontal: wp(5),
    marginBottom: scaleSize(20),
    marginTop: iOS ? scaleSize(20) : StatusBar.currentHeight + 20,
  },
  swiperContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  slide: {
    width,
    alignItems: "center",
    paddingHorizontal: wp(5),
  },
  dynamicImage: {
    width: width,
    height: height / 2,
  },
  title: {
    fontSize: 22,
    marginTop: hp(2),
    textAlign: "center",
    color: colors.black,
    fontFamily: fonts[600],
  },
  subtitle: {
    fontSize: 15,
    textAlign: "center",
    fontFamily: fonts[400],
    marginTop: scaleSize(5),
    color: colors.description,
  },
  dotWrapper: {
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
  },

  rowButtonWrapper: {
    width,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingBottom: iOS ? 0 : hp(2),
  },
  loginButton: {
    width: wp(45),
    borderWidth: 1,
    borderColor: colors.purple,
    backgroundColor: colors.none,
  },
  createAccountButton: {
    width: wp(45),
    borderWidth: 1,
  },
});
