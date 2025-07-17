import React from 'react';
import styles from './cardStyle';
import {colors} from '../../theme/colors';
import Icon from 'react-native-dynamic-vector-icons';
import buttonStyle from '../../screens/user/userStyle';
import {ReturnInnerCard, MainButton, Text} from '..';
import {useNavigation} from '@react-navigation/native';
import {globalStyle, Row} from '../../theme/globalStyle';
import {View, Pressable, FlatList, Text as RNText} from 'react-native';
import {fontScale} from '../../theme/responsive';

const ReturnSection = props => {
  const {navigate} = useNavigation();
  const {section, selected, onSelect, isLabel, isPositive, disabled} = props;
  return (
    <Pressable
      disabled={isLabel || disabled}
      onPress={() => onSelect(section)}
      style={[styles.sectionContainer, selected && styles.selectedSection]}>
      <View
        style={[
          styles.headerRow,
          globalStyle.space_Between,
          {flexWrap: 'wrap'},
        ]}>
        <Row>
          {selected && (
            <Icon
              size={20}
              name="checkbox"
              type="Ionicons"
              color={colors.purple}
            />
          )}
          <RNText
            style={[
              styles.sectionTitle,
              {
                marginLeft: selected ? 5 : 0,
              },
            ]}
            allowFontScaling
            numberOfLines={1}>
            {section.BundleName}
          </RNText>
        </Row>
        {isLabel && (
          <View
            style={[
              styles.labelBox,
              {backgroundColor: isPositive ? '#F0FBF0' : '#FEF0F2'},
            ]}>
            <Text
              style={styles.labelTitle}
              color={isPositive ? '#4CD963' : '#ED6479'}
              title={isPositive ? 'Label uploaded' : 'No return label uploaded'}
            />
          </View>
        )}
      </View>

      <FlatList
        data={section.products}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item}) => <ReturnInnerCard data={item} />}
        scrollEnabled={false}
      />
      {isLabel && (
        <MainButton
          style={buttonStyle.button}
          title={isPositive ? 'Edit label' : 'Upload Label'}
          textStyle={[buttonStyle.buttonText, {fontSize: fontScale(12)}]}
          onPress={() =>
            navigate('uploadLabel', {labels: section, isEdit: isPositive})
          }
        />
      )}
    </Pressable>
  );
};

export default ReturnSection;
