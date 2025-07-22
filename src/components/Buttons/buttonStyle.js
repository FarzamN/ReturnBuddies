import { fonts } from "../../assets";
import { StyleSheet } from "react-native";
import { colors } from "../../theme/colors";
import responsive, { fontScale, scaleSize, wp } from "../../theme/responsive";
import { iOS } from "../../utils/constants";

export default StyleSheet.create({
  containerStyle: {
    marginTop: 5,
    width: "100%",
    marginBottom: 15,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: fontScale(2),
    height: 56,
    borderRadius: scaleSize(35),
  },

  font: {
    color: colors.white,
    fontFamily: fonts[600],
    fontSize: fontScale(13),
    top: fontScale(iOS ? 0 : 1),
  },

  socialImage: {
    width: responsive.height(20),
    height: responsive.height(20),
    marginRight: scaleSize(8),
  },

  // Image Btuuon style

  ImageButton: {
    borderWidth: 1,
    padding: scaleSize(15),
    borderRadius: scaleSize(12),
    borderStyle: "dashed",
    backgroundColor: colors.white,
  },
  ImageIcon: {
    overflow: "hidden",
    marginRight: wp(3),
  },
  ImageText: {
    fontSize: 12,
    color: "#111827",
    top: fontScale(iOS ? 0 : 2),
    fontFamily: fonts[400],
  },
  uploadText: {
    fontSize: 14,
    top: iOS ? 0 : 1,
    color: colors.black,
    fontFamily: fonts[600],
  },

  selectDate: {
    borderWidth: 1,
    borderRadius: 50,
    padding: 12,
    width: 130,
  },
  PickupCont: {
    backgroundColor: colors.white,
    paddingVertical: 20,
    borderRadius: 15,
    paddingHorizontal: 10,
    marginTop: 20,
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
