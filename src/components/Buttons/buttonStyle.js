import { fonts } from "../../assets";
import { StyleSheet } from "react-native";
import { colors } from "../../theme/colors";
import { iOS } from "../../utils/constants";
import responsive, { fontScale, scaleSize, wp } from "../../theme/responsive";

export default StyleSheet.create({
  containerStyle: {
    height: 56,
    marginTop: 5,
    width: "100%",
    marginBottom: 15,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: scaleSize(2),
    borderRadius: scaleSize(35),
  },

  font: {
    fontSize: 13,
    color: colors.white,
    fontFamily: fonts[600],
    top: fontScale(iOS ? 0 : 1),
  },

  socialImage: {
    marginRight: scaleSize(8),
    width: responsive.height(20),
    height: responsive.height(20),
  },

  // Image Btuuon style

  ImageButton: {
    borderWidth: 1,
    borderStyle: "dashed",
    padding: scaleSize(15),
    borderRadius: scaleSize(12),
    backgroundColor: colors.white,
  },
  ImageIcon: {
    overflow: "hidden",
    marginRight: wp(3),
  },
  ImageText: {
    fontSize: 12,
    color: "#111827",
    fontFamily: fonts[400],
    top: fontScale(iOS ? 0 : 2),
  },
  uploadText: {
    fontSize: 14,
    top: iOS ? 0 : 1,
    color: colors.black,
    fontFamily: fonts[600],
  },

  selectDate: {
    width: 130,
    padding: 12,
    borderWidth: 1,
    borderRadius: 50,
  },
  PickupCont: {
    marginTop: 20,
    borderRadius: 15,
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: colors.white,
  },
  pickupTitle: {
    fontSize: 14,
    marginLeft: 15,
    top: iOS ? 0 : 2,
    fontFamily: fonts[500],
  },
  pickupDetail: {
    fontSize: 12,
    marginLeft: 15,
    fontFamily: fonts[400],
  },
  pickupImage: {
    width: 25,
    height: 25,
  },
});
