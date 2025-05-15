import { StyleSheet } from "react-native";
import { hp, wp } from "../../theme/responsive";
import { colors } from "../../theme/colors";

export default StyleSheet.create({
  mainTitle: {
    fontSize: hp(2.5),
    fontWeight: "600",
    color: colors.black,
    marginTop: wp(5),
    textAlign: "left",
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
    justifyContent: "flex-end",
    alignItems: "center",
    flex: 1,
    margin: 0,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 30,
    paddingVertical: 40,
    paddingHorizontal: 25,
    alignItems: "center",
    width: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
  },
  subText: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
    marginBottom: 25,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
    width: "100%",
    paddingHorizontal: 10,
  },
  cell: {
    width: wp(16),
    height: wp(13),
    borderRadius: 30,
    borderWidth: 1,
    backgroundColor: "#FAFAFA",
    marginRight: 5,
  },
  cellText: {
    color: colors.black,
    fontSize: hp(2.4),
    fontWeight: "600",
    textAlign: "center",
    lineHeight: wp(12),
  },
});
