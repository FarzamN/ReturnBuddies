import { StyleSheet } from "react-native";
import { FONT_SIZES, SPACING, tab } from "../../theme/responsive";
import { colors } from "../../theme/colors";

const inputStyles = StyleSheet.create({
  mainInputCont: {
    width: "100%",
    marginTop: SPACING.SMALL,
  },
  inputStyles: {
    fontWeight: "500",
    fontSize: FONT_SIZES.BODY,
    color: colors.black,
    paddingHorizontal: 20, // inner spacing
    height: 50, // match height
    borderWidth: 1,
  },

  SearchInput: {
    fontWeight: "400",
    color: colors.black,
    marginHorizontal: 5,
    fontSize: tab ? 16 : 14,
    width: tab ? "90%" : "83%",
  },
  SearchBox: {
    borderWidth: 1,
    marginTop: 15,
    marginBottom: 10,
    height: tab ? 70 : 45,
    paddingHorizontal: 15,
    borderColor: colors.grey,
    borderRadius: tab ? 25 : 20,
  },
});

export default inputStyles;
