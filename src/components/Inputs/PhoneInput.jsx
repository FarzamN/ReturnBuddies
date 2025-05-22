import React, { useRef } from "react";
import { View, StyleSheet, Text } from "react-native";
import Input from "react-native-phone-number-input";
import Icon from "react-native-dynamic-vector-icons";
import { globalStyle } from "../../theme/globalStyle";
import { hp, wp } from "../../theme/responsive";
import { colors } from "../../theme/colors";
import { android } from "../../utils/constants";

const PhoneInput = (props) => {
  const phoneInput = useRef(null);

  phoneInput.current?.setState({
    countryCode: props.countryAbbreviationCode
      ? props.countryAbbreviationCode
      : "",
    code: props.countryCode.toString(),
    number: props.phoneNumber,
  });

  return (
    <View style={{ marginVertical: hp(1) }}>
      <View style={globalStyle.space_Between}>
        <Text style={[styles.titleStyle]}>Phone Number</Text>
        <Text onPress={props.onrightTextPress} style={[styles.rightTitleStyle]}>
          {props.rghtText}
        </Text>
      </View>
      <Input
        containerStyle={[styles.inputBox, { width: "100%" }]}
        flagButtonStyle={{
          width: wp(25),
          height: hp(6),
          backgroundColor: "#FAFAFA",
          borderColor: colors.borderColor,
          borderWidth: 1,
          borderRadius: 10,
        }}
        textInputStyle={{
          height: hp(6),
          fontWeight: "500",
          fontSize: hp(1.6),
          color: colors.black,
          backgroundColor: "#FAFAFA",
        }}
        codeTextStyle={{
          fontWeight: "500",
          fontSize: hp(1.6),
          color: colors.black,
          backgroundColor: "#FAFAFA",
        }}
        countryPickerButtonStyle={{
          width: wp(25),
          height: hp(6),
          backgroundColor: "#FAFAFA",
          borderColor: colors.borderColor,
          borderWidth: 1,
          borderRadius: 10,
        }}
        textContainerStyle={{
          flex: 2,
          backgroundColor: "#FAFAFA",
          height: hp(6),
          marginLeft: wp(3),
          borderColor: colors.borderColor,
          borderWidth: 1,
          borderRadius: 10,
        }}
        renderDropdownImage={
          <Icon
            name="chevron-down"
            type="Entypo"
            size={20}
            color={colors.black}
          />
        }
        ref={phoneInput}
        defaultCode={"US"} // Set default country code
        value={props.phoneNumber} // Set current phone number value
        layout={"second"}
        placeholder="Country Of Residence"
        textInputProps={{
          placeholderTextColor: colors.grey,
        }}
        onChangeText={(text) => {
          props.setValue(`${text}`);
        }}
        onChangeCountry={(text) => {
          props.setSelectedCode(`${text?.callingCode}`);
        }}
      />
    </View>
  );
};

export default PhoneInput;

const styles = StyleSheet.create({
  rightTitleStyle: {
    paddingVertical: wp(2),
    fontSize: hp(1.4),
    fontWeight: "600",
    color: colors.description,
    textDecorationLine: "underline",
  },
  titleStyle: {
    paddingVertical: wp(2),
    fontSize: hp(1.6),
    fontWeight: "600",

    color: colors.black,
    textAlign: "left",
  },
  inputBox: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    flex: 2,
    marginLeft: wp(2),
    fontWeight: "500",
    color: colors.black,
  },
  codeBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: hp(1.5),
    alignItems: "center",
    width: wp(15),
  },
  codeText: {
    color: colors.black,
    fontWeight: "500",
    fontSize: 13,
  },
  codeIcon: {
    height: 18,
    width: 18,
    resizeMode: "contain",
    marginHorizontal: wp(1.5),
  },
  codeListBox: {
    position: "absolute",
    top: android ? hp(8.5) : hp(7),
    left: 0,
    zIndex: 1,
    width: "18%",
    padding: wp(1),
    paddingHorizontal: wp(2),
    alignItems: "center",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.black,
    backgroundColor: colors.white,
    borderRadius: 10,
  },
  codeList: {
    color: colors.black,
    fontWeight: "500",
    textDecorationLine: "underline",
    marginVertical: hp(0.5),
    fontSize: 14,
  },
});
