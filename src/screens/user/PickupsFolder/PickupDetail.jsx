import {
  Body,
  Text,
  Header,
  CustomAlert,
  TrackingCard,
  PickupButton,
  ReturnInnerCard,
  FullImage,
} from '../../../components';

import moment from 'moment';
import styles from '../userStyle';
import {colors} from '../../../theme/colors';
import React, {useEffect, useState} from 'react';
import {appImages, fonts} from '../../../assets';
import Icon from 'react-native-dynamic-vector-icons';
import {useDispatch, useSelector} from 'react-redux';
import {height, scaleSize, width, wp} from '../../../theme/responsive';
import settingStyle from '../SettingFolder/settingStyle';
import {globalStyle, Height} from '../../../theme/globalStyle';
import {FlatList, ScrollView, TouchableOpacity, View} from 'react-native';
import {deletePickupAPI, pickupDetailAPI} from '../../../apis/pickupQueries';
import {useNavigation} from '@react-navigation/native';

const PickupDetail = ({route}) => {
  const {item} = route.params;
  const dispatch = useDispatch();
  const {navigate} = useNavigation();

  const {data, trackingNumber} = useSelector(
    state => state.pickup.pickupDetailData,
  );
  const [load, setLoad] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const cancelled = data?.status === 'Pickup Canceled';

  const steps = [
    {
      label: 'Pickup Requested',
      icon: appImages.pickup_truck,
      date: '17 June, 2025',
      completed: data?.status === 'Pickup Requeste ',
    },
    {
      label: 'Picked up by RB',
      icon: appImages.pickup_user_cart,
      date: '17 June, 2025',
      completed: data?.status === 'in transit',
    },
    {
      label: 'At RB Warehouse',
      icon: appImages.pickup_warehouse,
      date: '17 June, 2025',
      completed: data?.status === 'completed',
    },
    {
      label: 'Dropped off at UPS',
      icon: appImages.pickup_cube,
      date: '17 June, 2025',
      completed: data?.status === 'completed',
    },
  ];

  useEffect(() => {
    pickupDetailAPI(item._id, setLoad)(dispatch);
  }, []);

  return (
    <Body horizontal={wp(5)}>
      <Header leftTitle="Return Details" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.pickupTitle} title={'Return #122'} />

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <View style={setpStyle.stepContainer}>
                <View
                  style={[
                    setpStyle.iconWrapper,
                    {
                      borderWidth: 2,
                      borderColor: cancelled ? '#9E2424' : '#A259FF',
                      backgroundColor: cancelled
                        ? '#9E2424'
                        : step.completed
                        ? '#A259FF'
                        : '#fff',
                    },
                  ]}>
                  {/* <Icon
                    type={step.iconType}
                    name={step.icon}
                    size={20}
                    
                  /> */}
                  <FullImage
                    style={{width: 20, height: 20}}
                    source={step.icon}
                    color={
                      cancelled ? '#fff' : step.completed ? '#fff' : '#A259FF'
                    }
                  />
                </View>
                <Text style={setpStyle.label} title={step.label} />
                <Text style={setpStyle.date} title={step.date} />
              </View>

              <View
                style={[
                  setpStyle.line,
                  {backgroundColor: cancelled ? '#9E2424' : colors.purple},
                ]}
              />
            </React.Fragment>
          ))}
        </ScrollView>

        <Height />
        {!cancelled && <TrackingCard tracking={trackingNumber} />}
        <FlatList
          data={item.bundleId[0].products}
          showsVerticalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          ListHeaderComponent={
            <Text style={styles.pickupTitle} title="Pickup Items" />
          }
          renderItem={({item}) => (
            <ReturnInnerCard data={item} background={colors.white} />
          )}
          scrollEnabled={false}
        />
        <Text style={styles.pickupTitle} title="Pickup Details" />
        <PickupButton
          disable
          isTwoDetail={data?.note}
          detail={data?.pickupType}
          source={appImages.location}
          twoDetail={`Notes: ${data?.note}`}
          title={data?.pickupAddress?.street}
        />
        <PickupButton
          disable
          detail={data?.pickupTime}
          source={appImages.clock}
          title={moment(data?.pickupDate).format('dddd, MMM DD, yy')}
        />
        <PickupButton disable source={appImages.call} title={data?.phone} />
        <PickupButton
          disable
          title={'Total'}
          source={appImages.priceTag}
          detail={`$${data?.totalPrice}`}
        />
        {!cancelled && (
          <TouchableOpacity
            onPress={() => setShowDelete(true)}
            style={[globalStyle.row, settingStyle.deleteButton]}>
            <Text
              style={settingStyle.deleteText}
              color={colors.error}
              title="Cancel pickup"
            />
          </TouchableOpacity>
        )}

        <Height />
        <TouchableOpacity onPress={() => navigate('support')}>
          <Text
            center
            color={colors.purple}
            title="Contact us for help"
            style={styles.promoCode}
          />
        </TouchableOpacity>
        <Height />
      </ScrollView>

      <CustomAlert
        title="Are you sure you want to cancel this pickup?"
        show={showDelete}
        isNote="No fees"
        message={
          ' will apply if cancelled before 9:00 AM on the day of pickup.'
        }
        cancelText="Keep pickup"
        confirmText="Cancel pickup"
        secMessage="If you wish to reschedule, please contact us."
        showProgress={load}
        onCancelPressed={() => setShowDelete(false)}
        onConfirmPressed={() =>
          deletePickupAPI(item._id, setLoad, setShowDelete)(dispatch)
        }
      />
    </Body>
  );
};

export default PickupDetail;

const setpStyle = {
  stepContainer: {
    width: scaleSize(150),
    alignItems: 'center',
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    color: '#333',
    marginTop: 10,
    textAlign: 'center',
    fontFamily: fonts[500],
  },
  date: {
    color: '#888',
    fontFamily: fonts[400],
    fontSize: scaleSize(11),
  },
  line: {
    top: 20,
    height: 2,
    zIndex: -1,
    left: '15%',
    position: 'absolute',
    width: `${70}%`,
  },
};
