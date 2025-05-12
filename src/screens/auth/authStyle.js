import { StyleSheet } from "react-native";
import { hp, wp } from "../../theme/responsive";
import { colors } from "../../theme/colors";

export default StyleSheet.create({
  mainTitle: {
    fontSize: hp(2.5),
    fontWeight: "600",
    color: colors.black,
    marginTop: wp(5),
    textAlign: "left",
  },
});
