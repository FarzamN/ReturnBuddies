import React from 'react';
import {FullImage, Text} from '..';
import Modal from 'react-native-modal';
import {colors} from '../../theme/colors';
import {toastColors} from '../../utils/data';
import {appImages, fonts} from '../../assets';
import {Height, Space_evenly} from '../../theme/globalStyle';
import {fontScale, scaleSize, verticalScale} from '../../theme/responsive';
import {View, StyleSheet, TouchableOpacity, Text as RNText} from 'react-native';

const CustomAlert = props => {
  const {
    show,
    isNote,
    message,
    isImage,
    secMessage,
    showProgress,
    type = 'error',
    onCancelPressed,
    onConfirmPressed,
    cancelText = 'Cancel',
    confirmText = 'Delete',
    title = 'Are you sure?',
  } = props;

  const {bg, border, iconBg, icon, iconType} =
    toastColors[type] || toastColors.info;

  return (
    <Modal
      isVisible={show}
      animationIn="fadeIn"
      animationOut="fadeOut"
      onBackdropPress={onCancelPressed}
      onBackButtonPress={onCancelPressed}
      backdropOpacity={0.5}
      style={styles.modalContainer}>
      <View style={styles.modalContent}>
        {isImage && (
          <FullImage source={appImages.toastDelete} style={styles.image} />
        )}

        <Text style={styles.title} title={title} />
        <Height height={10} />

        <RNText style={styles.message}>
          {isNote && (
            <Text
              center
              title={isNote}
              style={[
                styles.message,
                {
                  color: colors.black,
                  fontFamily: fonts[600],
                },
              ]}
            />
          )}{' '}
          {message}
        </RNText>
        {secMessage && <Text style={styles.message} center title={message} />}
        <Height />
        <Space_evenly>
          <TouchableOpacity
            onPress={onCancelPressed}
            style={[styles.modalButton, styles.cancelButton]}>
            <Text style={styles.cancelText} title={cancelText} />
          </TouchableOpacity>

          <TouchableOpacity
            disabled={showProgress}
            onPress={onConfirmPressed}
            style={[styles.modalButton, styles.deleteButton]}>
            <Text
              style={styles.deleteText}
              title={showProgress ? 'Loading...' : confirmText}
            />
          </TouchableOpacity>
        </Space_evenly>
      </View>
    </Modal>
  );
};

export default CustomAlert;

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
  },
  modalContent: {
    backgroundColor: colors.white,
    borderRadius: scaleSize(15),
    width: '85%',
    padding: scaleSize(20),
  },
  title: {
    textAlign: 'center',
    color: colors.black,
    fontSize: fontScale(13),
    fontFamily: fonts[600],
  },
  message: {
    color: colors.grey,
    textAlign: 'center',
    fontFamily: fonts[400],
    fontSize: fontScale(12),
  },

  modalButton: {
    flex: 1,
    borderRadius: 999,
    paddingVertical: 12,
    alignItems: 'center',
    marginHorizontal: scaleSize(10),
  },

  cancelButton: {
    backgroundColor: '#D1D1D1',
  },

  deleteButton: {
    backgroundColor: '#FEE5E9',
  },

  cancelText: {
    color: '#454545',
    fontSize: scaleSize(11),
    fontFamily: fonts[400],
  },

  deleteText: {
    color: '#ED6479',
    fontSize: scaleSize(11),
    fontFamily: fonts[400],
  },

  image: {
    width: scaleSize(50),
    aspectRatio: 1 / 1,
    alignSelf: 'center',
    marginBottom: verticalScale(10),
  },
});
