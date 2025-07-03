import React, { useEffect, useState } from "react";
import { Body, Header, Text, Validation } from "../../../components";
import styles from "../userStyle";
import { fontScale, wp } from "../../../theme/responsive";
import { Height } from "../../../theme/globalStyle";
import { View, Text as RNText, TouchableOpacity } from "react-native";
import { CodeField, Cursor } from "react-native-confirmation-code-field";
import { colors } from "../../../theme/colors";
import authStyle from "../../auth/authStyle";
import BackgroundTimer from "react-native-background-timer";
import { useDispatch, useSelector } from "react-redux";
import {
  editProfileVerificationAPI,
  phoneVerficationCompleteAPI,
  resendPhoneOTPAPI,
  resendPhoneVerficationAPI,
} from "../../../apis/authQueries";
import { fonts } from "../../../assets";

const UserOTP = ({ navigation, route }) => {
  const { goBack } = navigation;
  const dispatch = useDispatch();
  const { number, type } = route.params;

  const { otp, user } = useSelector((state) => state.auth);

  const [load, setLoad] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const [seconds, setCountDown] = useState(60);
  const [error, setErrot] = useState({ visible: false, msg: "" });

  const data = {
    phone: number,
    name: user.name,
  };
  const onSubmit = () => {
    if (otpValue !== otp) {
      setErrot({ visible: true, msg: "Wrong OTP code, please try again" });
      return;
    }
    if (type == "verifyPhoneNumber") {
      const phoneData = { otp: Number(otp) };
      phoneVerficationCompleteAPI(phoneData, goBack, setLoad)(dispatch);
      return;
    }
    editProfileVerificationAPI(data, type, navigation, setLoad)(dispatch);
    setErrot({ visible: false, msg: "" });
  };

  const handleReset = () => {
    if (type == "verifyPhoneNumber") {
      const phoneData = { phone: number };
      resendPhoneVerficationAPI(phoneData, setLoad)(dispatch);
      return;
    }
    resendPhoneOTPAPI(data, setCountDown, setLoad)(dispatch);
  };

  // *********************** Timer Start ***********************
  useEffect(() => {
    const intervalId = BackgroundTimer.setInterval(() => {
      if (seconds > 0) {
        setCountDown(seconds - 1);
      }
    }, 1000);

    // Cancel the timer when you are done with it
    return () => BackgroundTimer.clearInterval(intervalId);
  }, [seconds]);

  return (
    <Body horizontal={wp(5)}>
      <Header />
      <Text
        style={{ fontFamily: fonts[700], fontSize: fontScale(22) }}
        center
        title="Enter Code"
      />
      <Text
        center
        style={styles.draftSub}
        title={`Enter the OTP code we sent to ${number}. ${otp}`}
      />
      <Height />
      <Height />
      <View
        style={[
          authStyle.otpContainer,
          {
            justifyContent: "center",
          },
        ]}
      >
        <CodeField
          cellCount={5}
          autoFucus
          value={otpValue}
          keyboardType="number-pad"
          onSubmitEditing={onSubmit}
          textContentType="oneTimeCode"
          onChangeText={(txt) => setOtpValue(txt)}
          renderCell={({ index, symbol, isFocused }) => (
            <View
              key={index}
              style={[
                styles.cell,
                {
                  borderColor: isFocused ? colors.purple : "#EEEEEE",
                },
              ]}
            >
              <RNText key={index} style={[authStyle.cellText]}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </RNText>
            </View>
          )}
        />
      </View>
      <Validation center isError={error.visible} message={error.msg} />
      <Validation center isError={load} message={"Please wait..."} />
      <RNText style={styles.timerText}>
        You can resend the OTP code in{" "}
        <Text
          style={styles.timerSecondText}
          title={seconds !== 0 ? (seconds > 9 ? seconds : `0${seconds}`) : "00"}
        />{" "}
        seconds
      </RNText>
      <TouchableOpacity disabled={seconds != 0} onPress={handleReset}>
        <Text
          style={styles.resendText}
          color={seconds == 0 ? colors.purple : colors.black}
          title="Resend code"
        />
      </TouchableOpacity>
    </Body>
  );
};

export default UserOTP;
