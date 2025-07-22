import { StyleSheet } from "react-native";
import { colors } from "../../theme/colors";
import { fontScale, scaleSize, wp } from "../../theme/responsive";
import { fonts } from "../../assets";

export default StyleSheet.create({
  mainTitle: {
    fontFamily: fonts[600],
    fontSize: fontScale(23),
    marginTop: wp(1),
    textAlign: "left",
    color: colors.black,
  },
  orTextStyle: {
    marginBottom: wp(5),
    textAlign: "center",
    fontFamily: fonts[400],
    fontSize: fontScale(14),
    color: colors.grey,
  },
  forgotTextStyle: {
    marginBottom: wp(5),
    textAlign: "right",
    fontFamily: fonts[500],
    fontSize: fontScale(11),
  },
  dontAccountTextStyle: {
    fontSize: fontScale(14),
    fontFamily: fonts[500],
    color: colors.description,
  },
  dontAccountSignUpTextStyle: {
    fontSize: fontScale(14),
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
    color: "#000",
    marginBottom: 8,
    fontFamily: fonts[600],
    fontSize: fontScale(18),
  },
  subText: {
    fontFamily: fonts[400],
    fontSize: fontScale(14),
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
    fontSize: fontScale(14),
    textAlign: "center",
    lineHeight: wp(12),
  },
  otpSub: {
    color: "#211F1C",
    fontFamily: fonts[400],
    marginTop: scaleSize(5),
    fontSize: fontScale(14),
  },
});
