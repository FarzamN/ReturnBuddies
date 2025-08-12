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
import { Body, Header, Text, Validation } from "../../../components";
import { View, Text as RNText, TouchableOpacity } from "react-native";
import { CodeField, Cursor } from "react-native-confirmation-code-field";

const UserOTP = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { number, type } = route.params;
  const { goBack, navigate } = navigation;

  const { otp, user } = useSelector((state) => state.auth);

  const [load, setLoad] = useState(false);
  const [value, setValue] = useState("");
  const [seconds, setCountDown] = useState(60);
  const [error, setError] = useState({ visible: false, msg: "" });

  const data = {
    phone: number,
    name: user?.name || "",
  };
  const onSubmit = (otpValue) => {
    if (type == "forgetPasswrod") {
      const emailData = { email: number, otp: otpValue };
      forgotEmailVerficationCompleteAPI(emailData, setError, navigate, setLoad);
      return;
    }

    if (otpValue !== otp) {
      setError({ visible: true, msg: "Wrong OTP code, please try again" });
      return;
    }
    if (type == "verifyPhoneNumber") {
      const phoneData = { otp: Number(otpValue) };
      phoneVerficationCompleteAPI(
        phoneData,
        setError,
        goBack,
        setLoad
      )(dispatch);
      return;
    }

    editProfileVerificationAPI(data, type, navigation, setLoad)(dispatch);
    setError({ visible: false, msg: "" });
  };

  const handleReset = () => {
    if (type == "verifyPhoneNumber") {
      const phoneData = { phone: number };
      resendPhoneVerficationAPI(phoneData, setCountDown, setLoad)(dispatch);
      return;
    }
    if (type == "forgetPasswrod") {
      const emailData = { email: number };
      resendForgotEmailVerficationAPI(emailData, setCountDown, setLoad);
      return;
    }

    resendPhoneOTPAPI(data, setCountDown, setCountDown, setLoad)(dispatch);
  };

  useEffect(() => {
    if (seconds <= 0) return;
    const intervalId = setInterval(() => {
      setCountDown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [seconds]);

  return (
    <Body horizontal={wp(4)}>
      <Header />
      <Text
        center
        title="Enter Code"
        style={{ fontFamily: fonts[700], fontSize: 24 }}
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
            setError({ visible: false, msg: "" });
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
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={handleReset}
        disabled={seconds != 0}
      >
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
