import { fonts } from "../../assets";
import { StyleSheet } from "react-native";
import { colors } from "../../theme/colors";
import { fontScale, scaleSize } from "../../theme/responsive";
import { iOS } from "../../utils/constants";

export default StyleSheet.create({
  modalContainer: {
    margin: 0,
    justifyContent: "flex-end",
    backgroundColor: colors.none,
  },
  centerModalContainer: {
    margin: 0,
    justifyContent: "center",
    backgroundColor: colors.none,
  },
  modalBox: {
    width: "100%",
    paddingBottom: 30,
    alignSelf: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    justifyContent: "center",
    backgroundColor: colors.white,
  },
  oversizeClose: {
    top: 20,
    right: 20,
    position: "absolute",
  },
  overSizeText: {
    fontSize: 12,
    textAlign: "center",
    fontFamily: fonts[400],
    color: colors.description,
  },

  confirmationText: {
    flex: 1,
    fontSize: 12,
    marginLeft: 10,
    color: "#424242",
    fontFamily: fonts[500],
    top: scaleSize(iOS ? 0 : 1),
  },
});
