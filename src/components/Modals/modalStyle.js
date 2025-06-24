import { StyleSheet } from "react-native";
import { colors } from "../../theme/colors";

export default StyleSheet.create({
  modalContainer: {
    margin: 0,
    justifyContent: "flex-end",
    backgroundColor: colors.none,
  },
  modalBox: {
    width: "100%",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingBottom: 30,
    alignSelf: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    justifyContent: "center",
    backgroundColor: colors.white,
  },
  oversizeClose: {
    top: 20,
    right: 20,
    position: "absolute",
  },
});
