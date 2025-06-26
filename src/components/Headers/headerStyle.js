import { StyleSheet } from "react-native";
import { colors } from "../../theme/colors";
import { fontScale, HEIGHT_SIZES, hp, wp } from "../../theme/responsive";
import { iOS } from "../../utils/constants";
import { fonts } from "../../assets";

export default StyleSheet.create({
  right: {
    width: wp(5),
    height: wp(5),
    tintColor: colors.black,
  },
  leftLabel: {
    fontFamily: fonts[600],
    fontSize: fontScale(14),
    textAlign: "center",
    color: colors.black,
  },
  rightLabel: {
    fontFamily: fonts[600],
    fontSize: fontScale(14),
    textAlign: "center",
    color: colors.purple,
  },
  addButton: {
    fontSize: hp(1.2),
    fontWeight: "600",
    color: colors.white,
    lineHeight: 20,
  },
  headerCont: {
    height: HEIGHT_SIZES.LARGE,
    marginBottom: iOS ? 0 : wp(4),
    marginTop: iOS ? 10 : 20,
  },
  logoStyle: {
    width: wp(10),
    height: wp(10),
  },
  iconCircle: {
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: wp(10),
    // width: wp(10),
    // height: wp(10),
    padding: wp(2),
    marginRight: wp(2),
  },
});
