import { fonts } from "../../assets";
import { StatusBar, StyleSheet } from "react-native";
import { colors } from "../../theme/colors";
import { iOS } from "../../utils/constants";
import responsive, { fontScale, scaleSize, wp } from "../../theme/responsive";

export default StyleSheet.create({
  right: {
    width: wp(5),
    height: wp(5),
    tintColor: colors.black,
  },
  leftLabel: {
    fontSize: 18,
    textAlign: "center",
    color: colors.black,
    fontFamily: fonts[600],
  },
  rightLabel: {
    textAlign: "center",
    color: colors.purple,
    fontFamily: fonts[600],
    fontSize: 14,
  },

  headerCont: {
    height: responsive.height(48),
    marginBottom: iOS ? 0 : wp(4),
    marginTop: iOS ? 0 : StatusBar.currentHeight + scaleSize(20),
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
    fontSize: 20,
    fontFamily: fonts[600],
  },
});
