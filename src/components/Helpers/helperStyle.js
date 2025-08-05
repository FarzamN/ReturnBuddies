import { StyleSheet } from "react-native";
import responsive, {
  fontScale,
  scaleSize,
  verticalScale,
  wp,
} from "../../theme/responsive";
import { colors } from "../../theme/colors";
import { fonts } from "../../assets";

const { black } = colors;
const helperStyle = StyleSheet.create({
  divider: {
    backgroundColor: "#D9D9D9",
    height: responsive.height(1),
    borderRadius: scaleSize(50),
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
    borderColor: "#F3CBC4",
    backgroundColor: "#FFF5F3",
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
    backgroundColor: "#DF452F",

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
    fontFamily: fonts[500],
    color: colors.black,
    marginVertical: verticalScale(10),
  },
  emptyDesc: {
    fontSize: 13,
    fontFamily: fonts[500],
    textAlign: "center",
    color: colors.description,
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
});

export default helperStyle;
