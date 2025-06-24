import { StyleSheet } from "react-native";
import { colors } from "../../theme/colors";
import { hp, wp } from "../../theme/responsive";

export default StyleSheet.create({
  mainTitle: {
    fontSize: hp(2.5),
    fontWeight: "600",
    marginTop: wp(5),
    textAlign: "left",
    color: colors.black,
  },
  orTextStyle: {
    marginBottom: wp(5),
    textAlign: "center",
    fontSize: hp(1.6),
    fontWeight: "500",
    color: colors.grey,
  },
  dontAccountTextStyle: {
    fontSize: hp(1.6),
    fontWeight: "500",
    color: colors.description,
  },
  dontAccountSignUpTextStyle: {
    fontSize: hp(1.6),
    fontWeight: "500",
    color: colors.purple,
  },

  modalContainer: {
    flex: 1,
    margin: 0,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  card: {
    width: "100%",
    borderRadius: 30,
    paddingHorizontal: 25,
    alignItems: "center",
    backgroundColor: "white",
  },
  title: {
    fontSize: 20,
    color: "#000",
    marginBottom: 10,
    fontWeight: "bold",
  },
  subText: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
    marginBottom: 25,
  },
  otpContainer: {
    width: "100%",
    marginBottom: 30,
    flexDirection: "row",
    paddingHorizontal: 10,
    justifyContent: "space-between",
  },
  cell: {
    width: wp(16),
    height: wp(13),
    borderWidth: 1,
    marginRight: 5,
    borderRadius: 30,
    backgroundColor: "#FAFAFA",
  },
  cellText: {
    color: colors.black,
    fontSize: hp(2.4),
    fontWeight: "600",
    textAlign: "center",
    lineHeight: wp(12),
  },
});
