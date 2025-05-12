import { StyleSheet } from "react-native";
import { colors } from "../../theme/colors";
import { HEIGHT_SIZES, hp, wp } from "../../theme/responsive";

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
    height: HEIGHT_SIZES.DEFAULT,
  },
});
