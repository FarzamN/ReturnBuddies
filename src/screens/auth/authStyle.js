import { fonts } from "../../assets";
import { StyleSheet } from "react-native";
import { colors } from "../../theme/colors";
import { scaleSize, wp } from "../../theme/responsive";

export default StyleSheet.create({
  mainTitle: {
    fontSize: 23,
    marginTop: wp(1),
    textAlign: "left",
    color: colors.black,
    fontFamily: fonts[600],
  },
  orTextStyle: {
    fontSize: 14,
    marginBottom: wp(5),
    textAlign: "center",
    color: colors.grey,
    fontFamily: fonts[400],
  },
  forgotTextStyle: {
    fontSize: 11,
    textAlign: "right",
    marginBottom: wp(5),
    fontFamily: fonts[500],
  },
  dontAccountTextStyle: {
    fontSize: 14,
    fontFamily: fonts[500],
    color: colors.description,
  },
  dontAccountSignUpTextStyle: {
    fontSize: 14,
    fontFamily: fonts[500],
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
    fontSize: 18,
    color: "#000",
    marginBottom: 8,
    fontFamily: fonts[600],
  },
  subText: {
    fontSize: 14,
    fontFamily: fonts[400],
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
    fontFamily: fonts[500],
    fontSize: 14,
    textAlign: "center",
    lineHeight: wp(12),
  },
  otpSub: {
    fontSize: 14,
    color: "#7C746A",
    fontFamily: fonts[400],
    marginTop: scaleSize(5),
  },
});
