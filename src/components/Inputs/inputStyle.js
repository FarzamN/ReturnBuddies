import { StyleSheet } from "react-native";
import { fonts } from "../../assets";
import { colors } from "../../theme/colors";
import { fontScale, SPACING, tab } from "../../theme/responsive";

const inputStyles = StyleSheet.create({
  mainInputCont: {
    width: "100%",
    marginTop: SPACING.SMALL,
  },
  inputStyles: {
    fontFamily: fonts[500],
    fontSize: fontScale(15),
    color: colors.black,
    paddingHorizontal: 20, // inner spacing
    height: 50, // match height
    borderWidth: 1,
  },

  SearchInput: {
    fontFamily: fonts[500],
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
