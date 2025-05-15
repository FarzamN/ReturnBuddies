import { StyleSheet } from "react-native";
import { colors } from "../../theme/colors";
import { HEIGHT_SIZES, hp, wp } from "../../theme/responsive";
import { iOS } from "../../utils/constants";

export default StyleSheet.create({
  right: {
    width: wp(5),
    height: wp(5),
    tintColor: colors.black,
  },
  leftLabel: {
    fontWeight: "600",
    fontSize: hp(1.8),
    textAlign: "center",
    color: colors.black,
  },
  rightLabel: {
    fontWeight: "600",
    fontSize: hp(1.8),
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
    alignItems: iOS ? "center" : "flex-end",
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
    padding: 10,
    marginRight: wp(2),
  },
});
