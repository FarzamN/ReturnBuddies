import { StyleSheet } from "react-native";
import { colors } from "../../theme/colors";
import { iOS } from "../../utils/constants";
import responsive, { fontScale, hp, wp } from "../../theme/responsive";
import { fonts } from "../../assets";

export default StyleSheet.create({
  draftTitle: {
    fontFamily: fonts[600],
    fontSize: fontScale(20),
  },
  draftSub: {
    fontFamily: fonts[400],
    fontSize: fontScale(12),
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
    height: responsive.height(40),
  },
  buttonText: {
    color: colors.purple,
    fontFamily: fonts[500],
    fontSize: fontScale(12),
  },

  uploadSelectText: {
    fontSize: wp(4),
    fontWeight: "500",
    color: colors.black,
  },

  dateContainer: {
    marginTop: 20,
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

  itemTitle: {
    fontSize: wp(3.5),
    fontWeight: "500",
  },

  iconContainer: {
    gap: wp(2),
    flexDirection: "row",
  },
  promoCode: { fontWeight: "500", fontSize: 13 },

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
    fontSize: hp(1.6),
    // fontFamily: fontFamily.UrbanistRegular,
    color: colors.black,
    marginTop: wp(5),
    textAlign: "center",
  },
  timerSecondText: {
    fontSize: hp(1.6),
    // fontFamily: fontFamily.UrbanistSemiBold,
    color: colors.purple,
    marginTop: wp(5),
  },
  resendText: {
    fontSize: hp(1.6),
    // fontFamily: fontFamily.UrbanistRegular,
    marginTop: wp(5),
    textAlign: "center",
  },
});
