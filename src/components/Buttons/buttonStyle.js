import { StyleSheet } from "react-native";
import { colors } from "../../theme/colors";
import responsive, {
  BORDER_RADIUS,
  FONT_SIZES,
  fontScale,
  HEIGHT_SIZES,
  SPACING,
} from "../../theme/responsive";

export default StyleSheet.create({
  containerStyle: {
    marginTop: 5,
    width: "100%",
    overflow: "hidden",
    height: responsive.height(52),
    borderRadius: BORDER_RADIUS.CIRCLE ? 35 : 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    borderWidth: fontScale(2),
  },

  font: {
    color: colors.white,
    fontWeight: "600",
    fontSize: FONT_SIZES.BODY,
  },
  socialImage: {
    width: responsive.height(20),
    height: responsive.height(20),
    marginRight: SPACING.SMALL,
  },

  // Image Btuuon style

  ImageButton: {
    borderStyle: "dashed",
    borderWidth: 1,
    padding: 15,
    borderRadius: 12,
    backgroundColor: colors.white,
  },
  ImageIcon: {
    marginRight: 10,
  },
  ImageText: {
    color: "#111827", // Tailwind's gray-900
    fontSize: 14,
  },
  uploadText: {
    color: colors.black,
    fontSize: 15,
    fontWeight: "600",
  },

  selectDate: {
    borderWidth: 1,
    borderRadius: 50,
    padding: 12,
    width: 130,
  },
});
