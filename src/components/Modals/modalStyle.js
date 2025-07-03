import { fonts } from "../../assets";
import { StyleSheet } from "react-native";
import { colors } from "../../theme/colors";
import { fontScale } from "../../theme/responsive";

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
    textAlign: "center",
    fontFamily: fonts[500],
    fontSize: fontScale(12),
    color: colors.description,
  },

  confirmationText: {
    flex: 1,
    marginLeft: 10,
    fontFamily: fonts[400],
    fontSize: fontScale(13),
  },
});
