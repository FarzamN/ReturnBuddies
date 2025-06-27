import { useDispatch, useSelector } from "react-redux";
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
import { deleteAccountOTPAPI } from "../../../redux/queries/authQueries";

const DeleteOTP = () => {
  const dispatch = useDispatch();
  const [otpValue, setOtpValue] = useState("");
  const [seconds, setCountDown] = useState(60);
  const [isPending, setIsPending] = useState(false);
  const { user } = useSelector((state) => state.auth);

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

  const onSubmit = () => {
    const data = { otp: otpValue, email: user.email };
    deleteAccountOTPAPI(data, setIsPending)(dispatch);
  };

  return (
    <Body horizontal={wp(5)}>
      <Header title="Delete Account" />
      <Height />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text
          style={styles.contactUStext}
          title="Check your email inbox for the OTP code we sent you. Please enter it below to proceed."
        />

        <CodeField
          cellCount={4}
          value={otpValue}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          rootStyle={{
            marginTop: hp(5),
            justifyContent: "space-evenly",
          }}
          onChangeText={(txt) => setOtpValue(txt)}
          renderCell={({ index, symbol, isFocused }) => (
            <T key={index} style={[styles.cell]}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </T>
          )}
        />
        <T style={styles.timerText}>
          You can resend the code in{" "}
          <T style={styles.timerSecondText}>
            {seconds !== 0 ? (seconds > 9 ? seconds : `0${seconds}`) : "0"}
          </T>{" "}
          {seconds !== 0 ? "seconds" : "second"}
        </T>
        <T
          disabled={seconds != 0}
          style={styles.resendText}
          onPress={() => setCountDown(60)}
        >
          Resend code
        </T>
      </ScrollView>
      <MainButton
        load={isPending}
        onPress={onSubmit}
        title="Delete Account"
        style={{ backgroundColor: colors.error }}
      />
      <Height />
    </Body>
  );
};

export default DeleteOTP;
