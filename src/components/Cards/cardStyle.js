import {StyleSheet} from 'react-native';
import responsive, {
  fontScale,
  hp,
  scaleSize,
  verticalScale,
  wp,
} from '../../theme/responsive';
import {colors} from '../../theme/colors';
import {fonts} from '../../assets';

export default StyleSheet.create({
  returtnHistoryCont: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
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
    color: '#777777',
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
    paddingHorizontal: 12,
    paddingVertical: 12,
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
    color: '#717171',
    fontFamily: fonts[500],
    fontSize: fontScale(11),
  },
  sectionCard: {
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionImage: {
    width: scaleSize(52),
    height: scaleSize(52),
    borderRadius: scaleSize(8),
    marginRight: scaleSize(12),
  },

  labelBox: {
    borderRadius: 5,
    paddingVertical: 2,
    paddingHorizontal: 10,
  },
  labelTitle: {fontSize: fontScale(11), fontFamily: fonts[500]},

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
    color: '#5C5A5A',
    fontFamily: fonts[500],
    fontSize: fontScale(12),
  },
  TimeSelectCont: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 10,
  },

  pickupDetailText: {
    fontFamily: fonts[500],
    marginLeft: scaleSize(7),
    textTransform: 'capitalize',
  },
  itemLengthBox: {
    // flex: 1,
    width: 60,
    borderRadius: 50,
    paddingVertical: 3,
    backgroundColor: '#F4E5FC',
    marginTop: verticalScale(5),
    // marginHorizontal: scaleSize(10),
  },

  itemLengthText: {
    fontSize: scaleSize(10),
    fontFamily: fonts[400],
  },
  labelName: {
    color: colors.black,
    fontFamily: fonts[500],
    fontSize: fontScale(14),
  },

  // pickup section card style\

  pickup1stImage: {
    position: 'absolute',
    left: scaleSize(30),
    width: scaleSize(40),
    height: scaleSize(40),
  },

  pickupSectionLenght: {
    top: 0,
    fontSize: scaleSize(10),
    fontFamily: fonts[500],
  },
  pickupSectionLenghtBox: {
    borderWidth: 1,
    borderRadius: 50,
    aspectRatio: 1 / 1,
    top: scaleSize(20),
    right: scaleSize(5),
    padding: scaleSize(2),
    borderColor: colors.purple,
    backgroundColor: colors.white,
  },
});
