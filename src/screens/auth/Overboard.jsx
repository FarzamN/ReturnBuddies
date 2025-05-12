import React, { useRef, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import { useDispatch } from "react-redux";
import { hp, width, wp } from "../../theme/responsive";
import { appImages } from "../../assets";
import { colors } from "../../theme/colors";
import { globalStyle } from "../../theme/globalStyle";
import { MainButton } from "../../components";

const onboardingArray = [
  {
    title: "Easy returns from your doorstep",
    desc: "Say goodbye to return hassles",
    image: appImages.onboard4,
  },
  {
    title: "Choose items you want to return",
    desc: "Add your return items to your bag",
    image: appImages.onboard6,
  },
  {
    title: "Select a pickup time and date that works for you",
    desc: "Flexible scheduling to fit your day",
    image: appImages.onboard5,
  },
];

const Onboarding = ({ navigation }) => {
  const { replace, navigate } = navigation;
  const dispatch = useDispatch();
  const swiperRef = useRef(null);
  const [paginationIndex, setPaginationIndex] = useState(0);

  const handleButtonPress = () => {
    if (paginationIndex < onboardingArray.length - 1) {
      swiperRef.current.scrollToIndex({ index: paginationIndex + 1 });
      setPaginationIndex(paginationIndex + 1);
    } else {
      // dispatch(saveSplash(true));
      //   replace(routes.welcome);
    }
  };

  const DotComponent = ({ paginationIndex }) => (
    <View style={[globalStyle.row, globalStyle.center, globalStyle.mb30]}>
      {[...Array(onboardingArray.length)].map((_, index) => (
        <View key={index} style={[styles.dotWrapper]}>
          <View
            style={[
              styles.dot,
              {
                backgroundColor:
                  paginationIndex === index
                    ? colors.purple
                    : colors.borderColor,
                width: wp(3),
              },
            ]}
          />
        </View>
      ))}
    </View>
  );

  return (
    <View style={[globalStyle.Container, styles.container]}>
      <View
        style={[
          globalStyle.space_Between,
          {
            paddingTop: wp(5),
            paddingHorizontal: wp(5),
          },
        ]}
      >
        <Image source={appImages.logoFullName} style={styles.imageLogo} />
      </View>

      <View style={styles.swiperContainer}>
        <SwiperFlatList
          ref={swiperRef}
          showPagination
          PaginationComponent={DotComponent}
          onChangeIndex={({ index }) => setPaginationIndex(index)}
          data={onboardingArray}
          renderItem={({ item }) => (
            <View style={styles.slide}>
              <Image source={item.image} style={styles.dynamicImage} />
              <View style={globalStyle.mh10}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.subtitle}>{item.desc}</Text>
              </View>
            </View>
          )}
        />
      </View>

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
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: colors.white,
    paddingTop: wp(12),
  },
  imageLogo: {
    width: wp(43),
    height: wp(4.6),
    alignSelf: "center",
  },
  swiperContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  slide: {
    width,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: wp(4),
  },
  dynamicImage: {
    width: wp(94),
    height: wp(112),
    alignSelf: "center",
  },
  title: {
    fontSize: hp(2.3),
    lineHeight: hp(4.2),
    textAlign: "center",
    fontWeight: "500",

    color: colors.black,
    marginTop: hp(2),
  },
  subtitle: {
    fontSize: hp(1.5),
    lineHeight: hp(2.6),
    textAlign: "center",
    fontWeight: "400",
    color: colors.description,
    marginTop: hp(2),
  },
  dotWrapper: {
    borderRadius: 10,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  dot: {
    height: wp(3),
    borderRadius: 50,
  },
  rowButtonWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: wp(5),
    paddingTop: hp(3),
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
