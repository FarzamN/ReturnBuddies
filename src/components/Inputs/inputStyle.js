import { fonts } from "../../assets";
import { StyleSheet } from "react-native";
import { colors } from "../../theme/colors";
import { fontScale, scaleSize } from "../../theme/responsive";

const inputStyles = StyleSheet.create({
  mainInputCont: {
    width: "100%",
    marginTop: scaleSize(8),
  },
  inputStyles: {
    height: 50,
    borderWidth: 1,
    paddingHorizontal: 20,
    fontFamily: fonts[500],
    fontSize: fontScale(15),
  },
});

export default inputStyles;
