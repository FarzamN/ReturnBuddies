import { StyleSheet } from "react-native";
import { hp, wp } from "../../theme/responsive";
import { colors } from "../../theme/colors";

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
    width: wp(15),
    height: wp(15),
    borderRadius: 8,
    marginRight: wp(3),
  },
  returtnHistoryTitle: {
    fontSize: hp(2),
    fontWeight: "600",
    color: colors.black,
  },
  returtnHistoryStatus: {
    fontSize: hp(1.8),
    fontWeight: "500",
    color: "#777777",
  },
  returtnHistoryDate: {
    marginLeft: 8,
    fontSize: hp(1.6),
    fontWeight: "500",
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
  DraftTitle: {
    fontSize: hp(1.8),
    color: colors.black,
    fontWeight: "600",
  },
  DraftStatus: {
    marginTop: wp(2),
    fontSize: hp(1.6),
    color: "#777777",
    fontWeight: "500",
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
    fontSize: 16,
    fontWeight: "bold",
    color: colors.black,
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
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.black,
  },
  sectionDate: {
    fontSize: 13,
    color: "#777",
    marginTop: 2,
  },
  labelBox: {
    paddingHorizontal: 10,
    borderRadius: 5,
    paddingVertical: 2,
  },
  labelTitle: { fontSize: 13, fontWeight: "600" },

  pickupMethodCont: {
    marginTop: 20,
    borderRadius: 20,
    borderColor: colors.purple,
    padding: 20,
    backgroundColor: colors.white,
  },
  pickupMethodTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  pickupMethodDetail: {
    marginTop: 10,
    fontSize: 15,
    color: "#5C5A5A",
    fontWeight: "500",
  },
});
