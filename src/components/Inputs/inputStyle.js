import { fonts } from "../../assets";
import { StyleSheet } from "react-native";
import { colors } from "../../theme/colors";
import { fontScale, scaleSize, tab } from "../../theme/responsive";

const inputStyles = StyleSheet.create({
  mainInputCont: {
    width: "100%",
    marginTop: scaleSize(8),
  },
  inputStyles: {
    height: 50,
    borderWidth: 1,
    color: colors.black,
    paddingHorizontal: 20,
    fontFamily: fonts[500],
    fontSize: fontScale(15),
  },

  SearchInput: {
    color: colors.black,
    marginHorizontal: 5,
    fontFamily: fonts[500],
    fontSize: tab ? 16 : 14,
    width: tab ? "90%" : "83%",
  },
  SearchBox: {
    marginTop: 15,
    borderWidth: 1,
    marginBottom: 10,
    height: tab ? 70 : 45,
    paddingHorizontal: 15,
    borderColor: colors.grey,
    borderRadius: tab ? 25 : 20,
  },
});

export default inputStyles;
