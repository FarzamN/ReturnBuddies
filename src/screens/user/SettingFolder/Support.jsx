import React, {useState} from 'react';
import styles from './settingStyle';
import Icon from 'react-native-dynamic-vector-icons';
import {Body, FullImage, Header, Text} from '../../../components';
import {
  FlatList,
  TouchableOpacity,
  View,
  Linking,
  Pressable,
  ScrollView,
} from 'react-native';
import responsive, {scaleSize, wp} from '../../../theme/responsive';
import {globalStyle, Height} from '../../../theme/globalStyle';
import {appImages, fonts} from '../../../assets';
import settingStyle from './settingStyle';
import {useSelector} from 'react-redux';

const Support = () => {
  const {getFaqs} = useSelector(state => state.auth);
  const [expandedSection, setExpandedSection] = useState(null);

  const renderAnswerWithBoldEmail = text => {
    const emailRegex = /[\w.-]+@[\w.-]+\.\w+/g;
    const parts = text.split(emailRegex);
    const emails = text.match(emailRegex);

    const output = [];

    for (let i = 0; i < parts.length; i++) {
      output.push(
        <Text
          key={`text-${i}`}
          style={styles.FAQcontentText}
          title={parts[i]}
        />,
      );
      if (emails && emails[i]) {
        output.push(
          <Text
            key={`email-${i}`}
            style={[styles.FAQcontentText, {fontFamily: fonts[600]}]}
            title={emails[i]}
          />,
        );
      }
    }

    return output;
  };

  const contactUsList = [
    {
      id: 1,
      icon: appImages.supportEmail,
      mainTitle: 'Email',
      link: 'mailto: support@returnbuddies.com',
      email: 'support@returnbuddies.com',
      desc: 'Our team is here to help you.',
    },
    {
      id: 2,
      link: 'tel:+1 (646) 450-7960',
      email: '+1 (646) 450-7960',
      mainTitle: 'Give us a Call',
      icon: appImages.supportPhone,
      desc: 'Speak directly with out support team.',
    },
  ];

  const socialButton = [
    {img: appImages.instagram, link: 'https://instagram.com'},
    {img: appImages.x, link: 'https://x.com'},
    {img: appImages.website, link: 'https://google.com'},
  ];

  return (
    <Body horizontal={wp(4)}>
      <Header leftTitle="Support" />
      <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled>
        <Text
          style={settingStyle.settingTitle}
          title="Frequently Asked Questions"
        />
        <FlatList
          nestedScrollEnabled
          scrollEnabled={false}
          data={getFaqs}
          keyExtractor={(_, index) => index.toString()}
          ItemSeparatorComponent={() => <View style={settingStyle.separator} />}
          contentContainerStyle={settingStyle.whiteFlatlistBox}
          renderItem={({item, index}) => {
            const {question, answer} = item;
            return (
              <View>
                <Pressable
                  style={[
                    styles.FAQsectionHeader,
                    {
                      marginBottom: expandedSection !== index && 20,
                    },
                  ]}
                  onPress={() =>
                    setExpandedSection(expandedSection === index ? null : index)
                  }>
                  <Text style={styles.FAQSectionText} title={question} />
                  <Icon
                    type={'Entypo'}
                    size={20}
                    color="black"
                    name={`chevron-${
                      expandedSection === index ? 'up' : 'down'
                    }`}
                  />
                </Pressable>
                {expandedSection === index && (
                  <View style={styles.FAQcontent}>
                    <Text
                      style={styles.FAQcontentText}
                      title={renderAnswerWithBoldEmail(answer)}
                    />
                  </View>
                )}
              </View>
            );
          }}
        />

        <>
          <Height />
          <Text
            style={settingStyle.settingTitle}
            title="Need help or have any questions?"
          />

          <FlatList
            nestedScrollEnabled
            scrollEnabled={false}
            data={contactUsList}
            keyExtractor={(_, index) => index.toString()}
            ItemSeparatorComponent={() => (
              <View style={settingStyle.separator} />
            )}
            contentContainerStyle={settingStyle.whiteFlatlistBox}
            renderItem={({item}) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => Linking.openURL(item.link)}
                style={[{flexDirection: 'row'}, globalStyle.mv20]}>
                <FullImage
                  source={item.icon}
                  style={{
                    width: responsive.width(40),
                    height: responsive.width(40),
                  }}
                />
                <View style={{marginLeft: wp(3)}}>
                  <Text style={styles.headingTitle} title={item.mainTitle} />
                  <Text style={styles.contactUStext} title={item.desc} />
                  <Text style={styles.emailText} title={item.email} />
                </View>
              </TouchableOpacity>
            )}
          />
        </>
      </ScrollView>
      <View style={globalStyle.row_justify_center}>
        {socialButton.map(({img, link}) => (
          <TouchableOpacity
            key={link}
            onPress={() => Linking.openURL(link)}
            style={{margin: wp(2)}}>
            <FullImage source={img} style={styles.ContactImageStyle} />
          </TouchableOpacity>
        ))}
      </View>
      <Height />
    </Body>
  );
};

export default Support;
