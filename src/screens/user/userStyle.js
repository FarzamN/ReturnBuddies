import { fonts } from "../../assets";
import { StyleSheet } from "react-native";
import { colors } from "../../theme/colors";
import { iOS } from "../../utils/constants";
import responsive, { fontScale, scaleSize, wp } from "../../theme/responsive";

export default StyleSheet.create({
  draftTitle: {
    fontFamily: fonts[600],
    fontSize: fontScale(16),
  },
  draftSub: {
    fontFamily: fonts[400],
    fontSize: fontScale(11),
    color: colors.black,
  },

  draftCustomText: {
    fontFamily: fonts[500],
    fontSize: fontScale(11),
  },

  button: {
    width: "80%",
    borderRadius: 15,
    alignSelf: "center",
    backgroundColor: "#F3E8F9",
    marginBottom: iOS ? 25 : 0,
    height: responsive.height(40),
  },
  buttonText: {
    color: colors.purple,
    fontFamily: fonts[500],
    fontSize: fontScale(12),
  },

  uploadSelectText: {
    fontSize: fontScale(14),
    fontFamily: fonts[500],
    color: colors.black,
  },

  pickupTitle: {
    fontSize: fontScale(14),
    fontFamily: fonts[600],
    marginBottom: scaleSize(8),
  },

  dateContainer: {
    marginTop: scaleSize(10),
    borderRadius: 12,
    flexDirection: "row",
    paddingVertical: 15,
    backgroundColor: colors.white,
  },
  itemCard: {
    elevation: 2,
    padding: wp(3),
    shadowRadius: 2,
    shadowOpacity: 0.1,
    borderRadius: wp(3),
    marginBottom: wp(3),
    shadowColor: "#000",
    backgroundColor: colors.white,
    shadowOffset: { width: 0, height: 1 },
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  cardImage: {
    width: wp(15),
    height: wp(15),
    borderRadius: wp(2),
    marginRight: wp(3),
  },

  textContainer: {
    flex: 1,
  },

  iconContainer: {
    gap: wp(2),
    flexDirection: "row",
  },
  promoCode: { fontFamily: fonts[500], fontSize: fontScale(13) },

  cell: {
    width: wp(16),
    height: wp(16),
    borderWidth: 1,
    marginRight: 5,
    borderRadius: 10,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
  },

  timerText: {
    textAlign: "center",
    fontFamily: fonts[500],
    fontSize: fontScale(12),
    color: colors.black,
  },
  timerSecondText: {
    fontSize: fontScale(13),
    fontFamily: fonts[500],
    color: colors.purple,
    marginTop: wp(5),
  },
  resendText: {
    textAlign: "center",
    fontFamily: fonts[500],
    fontSize: fontScale(12),
    marginTop: scaleSize(15),
  },
});
