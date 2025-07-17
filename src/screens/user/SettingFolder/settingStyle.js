import {StyleSheet} from 'react-native';
import {
  fontScale,
  hp,
  scaleSize,
  verticalScale,
  wp,
} from '../../../theme/responsive';
import {colors} from '../../../theme/colors';
import {fonts} from '../../../assets';

export default StyleSheet.create({
  contactUStext: {
    fontSize: fontScale(12),
    fontFamily: fonts[400],
    color: '#949595',
  },
  headingTitle: {
    fontSize: fontScale(14),
    fontFamily: fonts[500],
    color: colors.black,
  },
  ImageStyle: {
    borderWidth: 1,
    borderColor: colors.borderColor,
    padding: 10,
    borderRadius: 20,
  },
  ContactImageStyle: {
    width: wp(15),
    height: wp(15),
    borderWidth: 1,
    borderColor: colors.borderColor,
    padding: 10,
    borderRadius: 20,
  },

  emailText: {
    fontFamily: fonts[500],
    fontSize: fontScale(12),
    color: colors.purple,
  },
  cell: {
    width: wp(17),
    height: wp(13),
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.borderColor,
    backgroundColor: '#FAFAFA',
    color: colors.black,
    fontSize: hp(2.4),
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: wp(12),
  },
  timerText: {
    marginTop: wp(5),
    textAlign: 'center',
    fontFamily: fonts[500],
    fontSize: fontScale(16),
    color: colors.description,
  },
  timerSecondText: {
    fontSize: fontScale(16),
    fontFamily: fonts[600],
    color: colors.purple,
    marginTop: wp(5),
  },
  resendText: {
    fontFamily: fonts[500],
    fontSize: fontScale(12),
    marginTop: scaleSize(15),
    color: colors.description,
    textAlign: 'center',
  },

  FAQsectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: 'space-between',
    marginTop: verticalScale(20),
  },
  FAQcontent: {
    padding: wp(2),
  },
  FAQcontentText: {
    color: '#2C2F32',
    fontFamily: fonts[400],
    fontSize: fontScale(12),
  },
  FAQSectionText: {
    width: '90%',
    fontFamily: fonts[500],
    fontSize: fontScale(13),
  },

  separator: {
    height: 1,
    backgroundColor: '#EAEAEA',
  },
  settingTitle: {
    color: colors.black,
    fontFamily: fonts[600],
    fontSize: fontScale(16),
    marginBottom: verticalScale(10),
  },

  whiteFlatlistBox: {
    borderRadius: scaleSize(20),
    backgroundColor: colors.white,
    paddingHorizontal: scaleSize(10),
  },
  toggleItemContainer: {
    paddingVertical: verticalScale(15),
  },
  itemTitle: {
    fontSize: fontScale(15),
    fontFamily: fonts[500],
  },
  itemDetail: {
    marginTop: 4,
    color: '#949595',
    fontSize: fontScale(11),
    fontFamily: fonts[400],
  },

  deleteButton: {
    alignSelf: 'center',
    backgroundColor: '#FDEFF2',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 999, // pill shape
    marginTop: 20,
  },

  deleteText: {
    top: 1,
    fontFamily: fonts[500],
    fontSize: fontScale(12),
    marginHorizontal: scaleSize(5),
  },
});
