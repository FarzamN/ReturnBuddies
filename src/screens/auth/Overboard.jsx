import React, { useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import { height, hp, scaleSize, width, wp } from "../../theme/responsive";
import { appImages, fonts } from "../../assets";
import { colors } from "../../theme/colors";
import { globalStyle, Height } from "../../theme/globalStyle";
import { MainButton } from "../../components";

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
            style={{ width: wp(44) }}
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
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  imageLogo: {
    width: wp(43),
    height: wp(4.6),
    marginHorizontal: wp(5),
    marginTop: scaleSize(20),
    marginBottom: scaleSize(40),
  },
  swiperContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  slide: {
    width,
    alignItems: "center",
    // justifyContent: "center",
    paddingHorizontal: wp(5),
  },
  dynamicImage: {
    width: width,
    height: height / 2,
  },
  title: {
    fontSize: hp(2.3),
    lineHeight: hp(4.2),
    textAlign: "center",
    fontFamily: fonts[500],
    color: colors.black,
    marginTop: hp(2),
  },
  subtitle: {
    fontSize: hp(1.5),
    lineHeight: hp(2.6),
    textAlign: "center",
    fontFamily: fonts[400],
    color: colors.description,
    // marginTop: hp(2),
  },
  dotWrapper: {
    borderRadius: 10,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },

  rowButtonWrapper: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingBottom: hp(2),
  },
  loginButton: {
    width: wp(44),
    backgroundColor: colors.none,
    borderWidth: 1,
    borderColor: colors.purple,
  },
  createAccountButton: {
    width: wp(44),
    borderRadius: 50,
  },
});
