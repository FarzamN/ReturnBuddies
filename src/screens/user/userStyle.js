import { StyleSheet } from "react-native";
import { colors } from "../../theme/colors";
import { iOS } from "../../utils/constants";
import responsive, { wp } from "../../theme/responsive";

export default StyleSheet.create({
  draftTitle: {
    fontSize: wp(6),
    fontWeight: "600",
  },
  draftSub: {
    marginTop: 5,
    fontSize: wp(3),
    color: colors.black,
  },
  sectionHeader: {
    fontSize: 16,
    marginTop: 16,
    marginBottom: 8,
    fontWeight: "bold",
    color: colors.black,
  },
  button: {
    width: "80%",
    borderRadius: 15,
    alignSelf: "center",
    backgroundColor: "#F3E8F9",
    marginBottom: iOS ? 25 : 0,
    height: responsive.height(45),
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.purple,
  },
});
