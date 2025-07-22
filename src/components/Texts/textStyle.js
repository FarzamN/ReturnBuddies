import { fonts } from "../../assets";
import { StyleSheet } from "react-native";
import { colors } from "../../theme/colors";
import { scaleSize } from "../../theme/responsive";
import { iOS } from "../../utils/constants";

const textStyle = StyleSheet.create({
  text: {
    top: iOS ? 0 : 1,
    fontSize: 14,
    fontFamily: fonts[400],
  },

  requiredTitle: {
    fontSize: 14,
    marginBottom: 8,
    color: colors.black,
    fontFamily: fonts[500],
  },
  helperText: {
    fontSize: 10,
    color: colors.error,
    fontFamily: fonts[400],
    marginTop: scaleSize(7),
  },
  promoCode: { fontFamily: fonts[500], fontSize: 13 },
});

export default textStyle;
