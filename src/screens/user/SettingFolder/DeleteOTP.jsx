import { View, Text as T, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { Body, Header, MainButton } from "../../../components";
import { wp, hp } from "../../../theme/responsive";
import { Height } from "../../../theme/globalStyle";
import styles from "./settingStyle";
import { CodeField, Cursor } from "react-native-confirmation-code-field";
import BackgroundTimer from "react-native-background-timer";
import { Text } from "../../../components";
import { colors } from "../../../theme/colors";

const DeleteOTP = () => {
  const [otpValue, setOtpValue] = useState("");
  const [seconds, setCountDown] = useState(60);

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
      <Header title="Delete Account" />
      <Height />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text
          style={styles.contactUStext}
          title="Check your email inbox for the OTP code we sent you. Please enter it below to proceed."
        />
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignSelf: "center",
            marginTop: hp(5),
          }}
        >
          <CodeField
            value={otpValue}
            onChangeText={(txt) => setOtpValue(txt)}
            cellCount={4}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({ index, symbol, isFocused }) => (
              <T key={index} style={[styles.cell]}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </T>
            )}
          />
        </View>
        <T style={styles.timerText}>
          You can resend the code in{" "}
          <T style={styles.timerSecondText}>
            {seconds !== 0 ? (seconds > 9 ? seconds : `0${seconds}`) : "0"}
          </T>{" "}
          {seconds !== 0 ? "seconds" : "second"}
        </T>
        <T
          disabled={seconds != 0 ? true : false}
          onPress={() => setCountDown(60)}
          style={styles.resendText}
        >
          Resend code
        </T>
      </ScrollView>
      <MainButton
        style={{ backgroundColor: colors.error }}
        title="Delete Account"
      />
      <Height />
    </Body>
  );
};

export default DeleteOTP;
