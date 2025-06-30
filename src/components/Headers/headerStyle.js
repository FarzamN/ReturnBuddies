import { fonts } from "../../assets";
import { StyleSheet } from "react-native";
import { colors } from "../../theme/colors";
import { iOS } from "../../utils/constants";
import responsive, { fontScale, wp } from "../../theme/responsive";

export default StyleSheet.create({
  right: {
    width: wp(5),
    height: wp(5),
    tintColor: colors.black,
  },
  leftLabel: {
    textAlign: "center",
    color: colors.black,
    fontFamily: fonts[600],
    fontSize: fontScale(18),
  },
  rightLabel: {
    textAlign: "center",
    color: colors.purple,
    fontFamily: fonts[600],
    fontSize: fontScale(14),
  },

  headerCont: {
    marginTop: iOS ? 10 : 20,
    height: responsive.height(48),
    marginBottom: iOS ? 0 : wp(4),
  },
  logoStyle: {
    width: wp(10),
    height: wp(10),
  },
  iconCircle: {
    borderWidth: 1,
    padding: wp(2),
    marginRight: wp(2),
    borderRadius: wp(10),
    borderColor: colors.borderColor,
  },
  nameHeader: {
    fontFamily: fonts[600],
    fontSize: fontScale(18),
  },
});
