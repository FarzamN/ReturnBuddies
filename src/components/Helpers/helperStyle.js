import { StyleSheet } from "react-native";
import responsive, {
  BORDER_RADIUS,
  FONT_SIZES,
  fontScale,
  hp,
  wp,
} from "../../theme/responsive";
import { colors } from "../../theme/colors";
import { fonts } from "../../assets";

const { black } = colors;
const helperStyle = StyleSheet.create({
  helperText: {
    fontFamily: fonts[400],
    color: colors.error,
    fontSize: fontScale(10),
    marginTop: responsive.space(7),
  },
  text: {
    fontWeight: "400",
    fontSize: responsive.fontSize(14),
  },
  divider: {
    backgroundColor: "#D9D9D9",
    height: responsive.height(1),
    borderRadius: BORDER_RADIUS.CIRCLE,
  },

  // Toast styling

  toastCont: {
    height: 70,
    width: "85%",
    borderWidth: 1,
    borderRadius: 10,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  ToastText1: {
    color: black,
    fontFamily: fonts[600],
  },
  ToastText2: {
    color: black,
    fontFamily: fonts[500],
  },
  ToastIconBox: {
    width: 25,
    borderRadius: 5,
    marginRight: 12,
    aspectRatio: 1 / 1,
    alignItems: "center",
    justifyContent: "center",

    elevation: 5,
    shadowColor: black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  emptyTitle: {
    fontWeight: "600",
    color: colors.black,
  },
  emptyDesc: {
    fontWeight: "500",
    fontSize: hp(1.6),
    lineHeight: hp(2.4),
    color: colors.description,
    textAlign: "center",
  },
  PlusCont: {
    position: "absolute",

    zIndex: 9,
    width: 50,
    aspectRatio: 1 / 1,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.purple,
  },
  optionsContainerStyle: {
    borderRadius: 5,
    padding: 2,
    marginTop: wp(6),
    borderBottomWidth: 3,
  },

  requiredTitle: {
    color: colors.black,
    marginBottom: 8,
    fontSize: fontScale(13),
    fontFamily: fonts[500],
  },
});

export default helperStyle;
