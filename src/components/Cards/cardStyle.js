import { StyleSheet } from "react-native";
import responsive, {
  fontScale,
  hp,
  scaleSize,
  wp,
} from "../../theme/responsive";
import { colors } from "../../theme/colors";
import { fonts } from "../../assets";

export default StyleSheet.create({
  returtnHistoryCont: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  returtnHistoryImage: {
    width: scaleSize(40),
    height: scaleSize(40),
    borderRadius: 8,
    marginRight: wp(3),
  },
  returtnHistoryTitle: {
    fontSize: fontScale(13),
    fontFamily: fonts[600],
    color: colors.black,
  },
  returtnHistoryStatus: {
    fontSize: fontScale(12),
    fontFamily: fonts[500],
    color: "#777777",
  },
  returtnHistoryDate: {
    marginLeft: 8,
    fontSize: fontScale(12),
    fontFamily: fonts[500],
    color: colors.black,
  },

  DraftCont: {
    marginTop: wp(1),
    borderColor: colors.purple,
    borderRadius: 10,
  },
  DraftImage: {
    width: wp(15),
    height: wp(15),
    borderRadius: 8,
    marginRight: wp(3),
  },
  sectionContainer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.white,
  },
  selectedSection: {
    borderWidth: 1,
    borderColor: colors.purple,
  },
  headerRow: {
    marginBottom: 12,
  },
  sectionTitle: {
    color: colors.black,
    fontFamily: fonts[600],
    fontSize: fontScale(14),
  },
  sectionDate: {
    marginTop: 2,
    color: "#777",
    fontFamily: fonts[500],
    fontSize: fontScale(11),
  },
  sectionCard: {
    flexDirection: "row",
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    alignItems: "center",
  },
  sectionImage: {
    width: scaleSize(50),
    height: scaleSize(50),
    borderRadius: scaleSize(8),
    marginRight: scaleSize(12),
  },

  labelBox: {
    paddingHorizontal: 10,
    borderRadius: 5,
    paddingVertical: 2,
  },
  labelTitle: { fontSize: fontScale(11), fontFamily: fonts[500] },

  pickupMethodCont: {
    padding: 20,
    marginTop: 20,
    borderRadius: 20,
    borderColor: colors.purple,
    backgroundColor: colors.white,
  },
  pickupMethodTitle: {
    fontFamily: fonts[600],
    fontSize: fontScale(16),
  },
  pickupMethodDetail: {
    marginTop: 5,
    color: "#5C5A5A",
    fontFamily: fonts[500],
    fontSize: fontScale(12),
  },
  TimeSelectCont: {
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    marginHorizontal: 10,
  },
});
