import {Text} from '..';
import React from 'react';
import styles from './headerStyle';
import {useSelector} from 'react-redux';
import {colors} from '../../theme/colors';
import {TouchableOpacity} from 'react-native';
import {scaleSize, wp} from '../../theme/responsive';
import Icon from 'react-native-dynamic-vector-icons';
import {useNavigation} from '@react-navigation/native';
import {Row, Space_Between} from '../../theme/globalStyle';

const DraftHeader = props => {
  const {pickup} = props;
  const {navigate} = useNavigation();
  const {name, FirstLogin} = useSelector(state => state.auth.user);

  return (
    <Space_Between style={{paddingHorizontal: wp(5), marginTop: scaleSize(20)}}>
      <Text
        style={styles.nameHeader}
        title={
          pickup
            ? 'My Pickups'
            : `Welcome${FirstLogin ? '' : ' back'}, ${name}!`
        }
      />
      <Row>
        <TouchableOpacity onPress={() => navigate('settingRoute')}>
          <Icon
            size={22}
            type="Ionicons"
            color={colors.black}
            name="settings-outline"
          />
        </TouchableOpacity>
      </Row>
    </Space_Between>
  );
};

export default DraftHeader;
