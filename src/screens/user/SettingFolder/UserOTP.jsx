import {
  resendPhoneOTPAPI,
  resendPhoneVerficationAPI,
  editProfileVerificationAPI,
  phoneVerficationCompleteAPI,
  resendForgotEmailVerficationAPI,
  forgotEmailVerficationCompleteAPI,
} from "../../../apis/authQueries";

import styles from "../userStyle";
import { fonts } from "../../../assets";
import authStyle from "../../auth/authStyle";
import { colors } from "../../../theme/colors";
import { wp } from "../../../theme/responsive";
import React, { useEffect, useState } from "react";
import { Height } from "../../../theme/globalStyle";
import { useDispatch, useSelector } from "react-redux";
import BackgroundTimer from "react-native-background-timer";
import { Body, Header, Text, Validation } from "../../../components";
import { View, Text as RNText, TouchableOpacity, Platform } from "react-native";
import { CodeField, Cursor } from "react-native-confirmation-code-field";

const UserOTP = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { number, type } = route.params;
  const { goBack, navigate } = navigation;

  const { otp, user } = useSelector((state) => state.auth);

  const [load, setLoad] = useState(false);
  const [value, setValue] = useState("");
  const [seconds, setCountDown] = useState(60);
  const [error, setErrot] = useState({ visible: false, msg: "" });

  const data = {
    phone: number,
    name: user?.name || "",
  };
  const onSubmit = (otpValue) => {
    console.log("otpValue", otpValue);
    if (type == "forgetPasswrod") {
      const emailData = { email: number, otp: otpValue };
      forgotEmailVerficationCompleteAPI(emailData, navigate, setLoad);
      return;
    }

    if (otpValue !== otp) {
      setErrot({ visible: true, msg: "Wrong OTP code, please try again" });
      return;
    }
    if (type == "verifyPhoneNumber") {
      const phoneData = { otp: Number(otpValue) };
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
    if (type == "forgetPasswrod") {
      const emailData = { email: number };
      resendForgotEmailVerficationAPI(emailData, setLoad);
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
        style={{ fontFamily: fonts[700], fontSize: 24 }}
        center
        title="Enter Code"
      />
      <Text
        center
        style={authStyle.otpSub}
        title={`Enter the OTP code we sent to\n${number}. ${otp}`}
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
          autoFocus
          cellCount={5}
          value={value}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          onSubmitEditing={() => onSubmit(value)}
          onChangeText={(txt) => {
            setValue(txt);
            if (txt.length === 5) onSubmit(txt);
          }}
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
      <Text
        center
        style={[styles.timerSecondText, { color: "#525252", marginTop: wp(3) }]}
        title="Having trouble?"
      />
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
