import { StyleSheet } from "react-native";
import { fontScale, hp, scaleSize, wp } from "../../../theme/responsive";
import { colors } from "../../../theme/colors";
import { fonts } from "../../../assets";

export default StyleSheet.create({
  contactUStext: {
    fontSize: fontScale(12),
    fontFamily: fonts[500],
    color: colors.description,
    lineHeight: 20,
    textAlign: "left",
  },
  headingTitle: {
    fontSize: fontScale(15),
    fontFamily: fonts[600],
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

  emailText: { fontFamily: fonts[500], fontSize: fontScale(11) },
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
    marginTop: wp(5),
    textAlign: "center",
    fontFamily: fonts[500],
    fontSize: fontScale(16),
    color: colors.description,
  },
  timerSecondText: {
    fontSize: fontScale(16),
    fontFamily: fonts[600],
    color: colors.purple,
    marginTop: wp(5),
  },
  resendText: {
    fontFamily: fonts[500],
    fontSize: fontScale(12),
    marginTop: scaleSize(15),
    color: colors.description,
    textAlign: "center",
  },

  FAQsectionHeader: {
    padding: wp(2),
    marginTop: wp(5),
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: "#FAFAFA",
    justifyContent: "space-between",
  },
  FAQcontent: {
    padding: wp(2),
    backgroundColor: "#FAFAFA",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopColor: colors.borderColor,
    borderTopWidth: 1,
  },
  FAQcontentText: {
    fontSize: fontScale(12),
    fontFamily: fonts[400],

    color: "#777777",
    lineHeight: hp(2.1),
  },
  FAQSectionText: {
    fontSize: fontScale(13),

    width: "90%",
    fontFamily: fonts[600],
  },
});
