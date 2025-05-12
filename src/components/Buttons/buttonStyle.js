import { StyleSheet } from "react-native";
import { colors } from "../../theme/colors";
import {
  BORDER_RADIUS,
  FONT_SIZES,
  HEIGHT_SIZES,
} from "../../theme/responsive";

export default StyleSheet.create({
  containerStyle: {
    marginTop: 5,
    width: "100%",
    backgroundColor: colors.purple,
    overflow: "hidden",
    height: HEIGHT_SIZES.LARGE,
    borderRadius: BORDER_RADIUS.CIRCLE ? 35 : 20,
    justifyContent: "center",
    alignItems: "center",
  },

  font: {
    color: colors.white,
    fontWeight: "600",
    fontSize: FONT_SIZES.BODY,
  },
});
