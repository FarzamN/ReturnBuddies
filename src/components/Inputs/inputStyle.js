import { fonts } from "../../assets";
import { StyleSheet } from "react-native";
import { scaleSize } from "../../theme/responsive";

const inputStyles = StyleSheet.create({
  mainInputCont: {
    width: "100%",
    marginTop: scaleSize(8),
  },
  inputStyles: {
    height: 50,
    fontSize: 15,
    borderWidth: 1,
    paddingHorizontal: 20,
    fontFamily: fonts[500],
  },
});

export default inputStyles;
