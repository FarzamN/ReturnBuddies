import React from "react";
import styles from "./settingStyle";
import Icon from "react-native-dynamic-vector-icons";
import { Body, FullImage, Header, Text } from "../../../components";
import { FlatList, TouchableOpacity, View, Linking } from "react-native";
import { wp } from "../../../theme/responsive";
import { globalStyle, Height } from "../../../theme/globalStyle";
import { colors } from "../../../theme/colors";
import { appImages } from "../../../assets";

const ContactUS = () => {
  const contactUsList = [
    {
      id: 1,
      icon: "email",
      mainTitle: "Email",
      link: "mailto: support@expo.io",
      email: "Support@returnbuddies.com",
      desc: "Our friendly team is here to help.",
    },
    {
      id: 2,
      link: "tel:+123456789",
      email: "(646) 450-7960",
      mainTitle: "Give us a Call",
      icon: "phone-in-talk-outline",
      desc: "Lorem ipsum dolor it amet.",
    },
  ];

  const socialButton = [
    { img: appImages.instagram, link: "https://instagram.com" },
    { img: appImages.x, link: "https://x.com" },
    { img: appImages.website, link: "https://google.com" },
  ];

  return (
    <Body horizontal={wp(4)}>
      <Header title="Contact Us" />
      <Text
        style={[styles.contactUStext]}
        title={
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        }
      />
      <FlatList
        data={contactUsList}
        keyExtractor={(_) => _.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => Linking.openURL(item.link)}
            style={[globalStyle.row, globalStyle.mt20]}
          >
            <Icon
              type="MaterialCommunityIcons"
              name={item.icon}
              size={30}
              color={colors.purple}
              style={styles.ImageStyle}
            />
            <View style={{ marginLeft: wp(3) }}>
              <Text style={styles.headingTitle} title={item.mainTitle} />
              <Text style={styles.contactUStext} title={item.desc} />
              <Text style={styles.emailText} title={item.email} />
            </View>
          </TouchableOpacity>
        )}
      />
      <View style={globalStyle.row_justify_center}>
        {socialButton.map(({ img, link }) => (
          <TouchableOpacity
            key={link}
            onPress={() => Linking.openURL(link)}
            style={{ margin: wp(2) }}
          >
            <FullImage source={img} style={styles.ContactImageStyle} />
          </TouchableOpacity>
        ))}
      </View>
      <Height />
    </Body>
  );
};

export default ContactUS;
