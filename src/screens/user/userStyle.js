import { StyleSheet } from "react-native";
import { hp, wp } from "../../theme/responsive";
import { colors } from "../../theme/colors";

export default StyleSheet.create({
  draftTitle: {
    fontWeight: "600",
    fontSize: wp(6),
  },
  draftListContainer: {
    backgroundColor: colors.white,
    borderRadius: wp(3),
  },
  draftSelectAllText: {
    fontSize: hp(1.6),
    color: colors.black,
    marginLeft: wp(0.5),
  },
});
