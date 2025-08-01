import {
  hp,
  wp,
  scaleSize,
  fontScale,
  verticalScale,
} from "../../../theme/responsive";
import { fonts } from "../../../assets";
import { StyleSheet } from "react-native";
import { colors } from "../../../theme/colors";
import { iOS } from "../../../utils/constants";

export default StyleSheet.create({
  contactUStext: {
    fontSize: 12,
    color: "#949595",
    fontFamily: fonts[400],
  },
  headingTitle: {
    fontSize: 14,
    color: colors.black,
    fontFamily: fonts[500],
  },
  ImageStyle: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: colors.borderColor,
  },
  ContactImageStyle: {
    padding: 10,
    width: wp(15),
    height: wp(15),
    borderWidth: 1,
    borderRadius: 20,
    borderColor: colors.borderColor,
  },

  emailText: {
    fontSize: 12,
    color: colors.purple,
    fontFamily: fonts[500],
  },
  cell: {
    width: wp(17),
    height: wp(13),
    borderWidth: 1,
    borderRadius: 15,
    fontSize: hp(2.4),
    lineHeight: wp(12),
    textAlign: "center",
    color: colors.black,
    fontFamily: fonts[600],
    backgroundColor: "#FAFAFA",
    borderColor: colors.borderColor,
  },
  timerText: {
    fontSize: 16,
    marginTop: wp(5),
    textAlign: "center",
    fontFamily: fonts[500],
    color: colors.description,
  },
  timerSecondText: {
    fontSize: 16,
    marginTop: wp(5),
    color: colors.purple,
    fontFamily: fonts[600],
  },
  resendText: {
    fontSize: 12,
    textAlign: "center",
    fontFamily: fonts[500],
    marginTop: scaleSize(15),
    color: colors.description,
  },

  FAQsectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginTop: verticalScale(20),
    justifyContent: "space-between",
  },
  FAQcontent: {
    padding: wp(2),
  },
  FAQcontentText: {
    fontSize: 12,
    color: "#2C2F32",
    fontFamily: fonts[400],
  },
  FAQSectionText: {
    width: "90%",
    fontSize: 15,
    fontFamily: fonts[500],
  },

  separator: {
    height: 1,
    backgroundColor: "#EAEAEA",
  },
  settingTitle: {
    fontSize: 16,
    color: colors.black,
    fontFamily: fonts[500],
    marginBottom: verticalScale(10),
  },

  whiteFlatlistBox: {
    borderRadius: scaleSize(20),
    backgroundColor: colors.white,
    paddingHorizontal: scaleSize(10),
  },
  toggleItemContainer: {
    paddingVertical: verticalScale(15),
  },
  itemTitle: {
    fontSize: 15,
    fontFamily: fonts[500],
  },
  itemDetail: {
    fontSize: 11,
    marginTop: 4,
    color: "#949595",
    fontFamily: fonts[400],
  },

  deleteButton: {
    marginTop: 20,
    borderRadius: 999,
    alignSelf: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#FDEFF2",
  },

  deleteText: {
    fontSize: 14,
    top: iOS ? 0 : 1,
    fontFamily: fonts[500],
    marginHorizontal: scaleSize(5),
  },

  verifyButton: {
    borderRadius: wp(5),
    paddingVertical: wp(1.3),
    paddingHorizontal: wp(4),
  },

  verifyText: {
    fontSize: 12,
    fontFamily: fonts[400],
  },
  phoneWrapper: {
    height: 50,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    borderColor: "#EEEEEE",
    borderRadius: scaleSize(15),
    backgroundColor: colors.white,
  },

  phoneInput: {
    flex: 1,
    fontSize: 13,
    color: colors.black,
    fontFamily: fonts[400],
    top: fontScale(iOS ? 0 : 1.5),
  },

  settingEmailText: {
    fontSize: 10,
    marginLeft: 5,
    color: "#3A3A3A",
    fontFamily: fonts[500],
  },
});
