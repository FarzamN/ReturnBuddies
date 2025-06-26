import { StyleSheet } from "react-native";
import { colors } from "../../theme/colors";
import responsive, {
  BORDER_RADIUS,
  fontScale,
  SPACING,
} from "../../theme/responsive";
import { fonts } from "../../assets";

export default StyleSheet.create({
  containerStyle: {
    marginTop: 5,
    width: "100%",
    marginBottom: 15,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: fontScale(2),
    height: responsive.height(52),
    borderRadius: BORDER_RADIUS.CIRCLE ? 35 : 20,
  },

  font: {
    top: fontScale(1),
    color: colors.white,
    fontFamily: fonts[500],
    fontSize: fontScale(13),
  },

  socialImage: {
    width: responsive.height(20),
    height: responsive.height(20),
    marginRight: SPACING.SMALL,
  },

  // Image Btuuon style

  ImageButton: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 12,
    borderStyle: "dashed",
    backgroundColor: colors.white,
  },
  ImageIcon: {
    marginRight: 10,
  },
  ImageText: {
    color: "#111827",
    top: fontScale(2),
    fontSize: fontScale(12),
    fontFamily: fonts[500],
  },
  uploadText: {
    color: colors.black,
    fontSize: 15,
    fontWeight: "600",
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
    top: 2,
    marginLeft: 15,
    fontFamily: fonts[500],
    fontSize: fontScale(14),
  },
  pickupDetail: {
    marginLeft: 15,
    fontFamily: fonts[500],
    fontSize: fontScale(12),
  },
  pickupImage: {
    width: 25,
    height: 25,
  },
});
