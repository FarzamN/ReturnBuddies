import { fonts } from "../../assets";
import { StyleSheet } from "react-native";
import { colors } from "../../theme/colors";
import { scaleSize, wp } from "../../theme/responsive";

export default StyleSheet.create({
  draftTitle: {
    fontSize: 18,
    fontFamily: fonts[600],
  },
  draftSub: {
    fontSize: 14,
    color: "#211F1C",
    fontFamily: fonts[400],
    marginTop: scaleSize(5),
  },

  draftCustomText: {
    fontSize: 15,
    fontFamily: fonts[400],
  },

  button: {
    height: 37,
    width: "80%",
    borderRadius: 15,
    alignSelf: "center",
    backgroundColor: "#F3E8F9",
    // marginBottom: iOS ? 25 : 0,
  },
  buttonText: {
    fontSize: 12,
    color: colors.purple,
    fontFamily: fonts[400],
  },

  uploadSelectText: {
    fontSize: 14,
    color: colors.black,
    fontFamily: fonts[500],
  },

  pickupTitle: {
    fontSize: 14,
    fontFamily: fonts[600],
    marginBottom: scaleSize(8),
  },

  dateContainer: {
    borderRadius: 12,
    paddingVertical: 15,
    flexDirection: "row",
    marginTop: scaleSize(10),
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

  cell: {
    width: wp(16),
    height: wp(16),
    borderWidth: 1,
    marginRight: 5,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
  },

  timerText: {
    fontSize: 12,
    textAlign: "center",
    color: colors.black,
    fontFamily: fonts[400],
  },
  timerSecondText: {
    fontSize: 13,
    marginTop: wp(5),
    color: colors.purple,
    fontFamily: fonts[500],
  },
  resendText: {
    fontSize: 13,
    textAlign: "center",
    fontFamily: fonts[600],
    marginTop: scaleSize(15),
  },
});
