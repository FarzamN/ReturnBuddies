import { StyleSheet } from "react-native";
import { hp, wp } from "../../../theme/responsive";
import { colors } from "../../../theme/colors";

export default StyleSheet.create({
  contactUStext: {
    fontSize: hp(1.6),
    color: colors.description,
    lineHeight: 20,
    textAlign: "left",
  },
  headingTitle: {
    fontSize: hp(2),
    fontWeight: "600",
    color: colors.black,
    lineHeight: 24,
    textAlign: "left",
  },
  ImageStyle: {
    borderWidth: 1,
    borderColor: colors.borderColor,
    padding: 10,
    borderRadius: 20,
  },
  ContactImageStyle: {
    width: wp(15),
    height: wp(15),
    borderWidth: 1,
    borderColor: colors.borderColor,
    padding: 10,
    borderRadius: 20,
  },

  cell: {
    width: wp(17),
    height: wp(13),
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.borderColor,
    backgroundColor: "#FAFAFA",
    color: colors.black,
    fontSize: hp(2.4),
    fontWeight: "600",
    textAlign: "center",
    lineHeight: wp(12),
  },
  timerText: {
    fontSize: hp(1.6),
    fontWeight: "500",
    color: colors.description,
    marginTop: wp(5),
    textAlign: "center",
  },
  timerSecondText: {
    fontSize: hp(1.6),
    fontWeight: "600",
    color: colors.purple,
    marginTop: wp(5),
  },
  resendText: {
    fontSize: hp(1.6),
    fontWeight: "500",
    color: colors.description,
    marginTop: wp(5),
    textAlign: "center",
  },
});
