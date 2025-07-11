import {
  Row,
  Divider,
  globalStyle,
  Space_Between,
} from '../../theme/globalStyle';

import React from 'react';
import moment from 'moment';
import styles from './cardStyle';
import {FullImage, Text} from '..';
import {appImages} from '../../assets';
import {colors} from '../../theme/colors';
import {Text as RNText, View} from 'react-native';
import {scaleSize} from '../../theme/responsive';
import Icon from 'react-native-dynamic-vector-icons';

const PickupSection = ({data, onPress}) => {
  const d = {
    Payment: '686fd559f22a2d4274095606',
    __v: 0,
    _id: '686fd7eff22a2d4274095655',
    bundleId: [
      {
        BundleName: 'Return #3',
        __v: 0,
        _id: '686fd7c8f22a2d427409563f',
        createdAt: '2025-07-10T15:10:00.278Z',
        history: [Array],
        payment: null,
        pickupAddress: null,
        pickupTime: '2025-07-23T00:00:00.000Z',
        products: [Array],
        status: 'processed',
        userId: '686f64b1f22a2d42740955a0',
      },
    ],
    createdAt: '2025-07-10T15:10:39.228Z',
    isOversize: false,
    note: '',
    phone: '03110367927',
    pickupAddress: '686fd571f22a2d4274095612',
    pickupDate: '2025-07-16T00:00:00.000Z',
    pickupTime: '9:00 AM - 6:00 PM',
    pickupType: 'Doorstep',
    status: 'awaiting pickup',
    totalPrice: 10,
    updatedAt: '2025-07-10T15:10:39.228Z',
    userId: {
      FirstLogin: false,
      __v: 0,
      _id: '686f64b1f22a2d42740955a0',
      createdAt: '2025-07-10T06:58:57.373Z',
      email: 'frzamn64ml@gmail.com',
      googleId: null,
      name: 'Farzam Noor',
      otp: null,
      password: '$2b$10$U9DvhysOG9MHIkXL71Vja.ad8miqZMODn15GFGAOOv6F5Xf9GdkBm',
      payment: '686fd559f22a2d4274095606',
      phone: '03110367927',
      phoneOtp: null,
      phoneVerified: false,
      pickupAddress: '686fd571f22a2d4274095612',
      profile:
        'https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?ga=GA1.1.756143352.1747218968&semt=ais_hybrid&w=740',
      role: 'user',
      updatedAt: '2025-07-10T15:00:01.148Z',
      verified: true,
    },
  };
  return (
    <View style={[styles.sectionContainer, globalStyle.ph0]}>
      <View style={globalStyle.ph10}>
        <View
          style={[
            globalStyle.space_Between,
            {flexWrap: 'wrap', marginBottom: scaleSize(5)},
          ]}>
          <RNText
            allowFontScaling
            numberOfLines={1}
            style={styles.sectionTitle}>
            {data.bundleId[0].BundleName}
          </RNText>
          <Text
            color={colors.grey}
            style={styles.labelTitle}
            title={moment(data.createdAt).format('dddd, MMM do yyyy')}
          />
        </View>
        <Divider />
        <Row style={globalStyle.mt10}>
          <Row>
            <FullImage
              isUrl
              radius={10}
              style={styles.sectionImage}
              source={data?.bundleId[0].products[0].thumbnail}
            />
            {data?.bundleId[0].products[1]?.thumbnail && (
              <FullImage
                isUrl
                radius={10}
                style={[globalStyle.shadow, styles.pickup1stImage]}
                source={data?.bundleId[0].products[1]?.thumbnail}
              />
            )}
            {data?.bundleId[0].products.length > 2 && (
              <View style={[styles.pickupSectionLenghtBox]}>
                <Text
                  style={styles.pickupSectionLenght}
                  title={`+${data?.bundleId[0].products.length - 2}`}
                />
              </View>
            )}
          </Row>

          <View
            style={{
              marginLeft:
                data?.bundleId[0].products.length === 2 && scaleSize(15),
            }}>
            <Text
              style={styles.labelName}
              color={colors.grey}
              title={data?.bundleId[0].products[0].productName}
            />
            <View style={[styles.itemLengthBox, globalStyle.center]}>
              <Text
                color={colors.purple}
                style={styles.itemLengthText}
                title={`${data?.bundleId[0].products.length} ${
                  data?.bundleId[0].products.length > 1 ? 'items' : 'item'
                }`}
              />
            </View>
          </View>
        </Row>
      </View>
      <Divider />
      <Space_Between style={[globalStyle.ph10, globalStyle.mt10]}>
        <Row>
          <FullImage
            source={
              data?.status === 'Pickup Canceled'
                ? appImages.cancelled
                : data?.status === 'Completed'
                ? appImages.complete
                : appImages.pickup
            }
            style={{width: 30, height: 30}}
          />
          <Text
            color={data?.status === 'Pickup Canceled' ? '#9E2424' : '#318252'}
            title={data?.status}
            style={styles.pickupDetailText}
          />
        </Row>
        <Icon
          size={20}
          type="Feather"
          onPress={onPress}
          name="chevron-right"
          color={colors.black}
        />
      </Space_Between>
    </View>
  );
};

export default PickupSection;
