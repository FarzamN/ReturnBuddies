import React, { useEffect, useState } from "react";
import { Body, Header, Text, Validation } from "../../../components";
import styles from "../userStyle";
import { wp } from "../../../theme/responsive";
import { Height } from "../../../theme/globalStyle";
import { View, Text as RNText } from "react-native";
import { CodeField, Cursor } from "react-native-confirmation-code-field";
import { colors } from "../../../theme/colors";
import authStyle from "../../auth/authStyle";
import BackgroundTimer from "react-native-background-timer";
import { useDispatch, useSelector } from "react-redux";
import { editProfileVerificationAPI } from "../../../redux/queries/authQueries";

const UserOTP = ({ navigation, route }) => {
  const { number, type } = route.params;
  const dispatch = useDispatch();
  const { otp, user } = useSelector((state) => state.auth);

  console.log("otp", otp);

  const [otpValue, setOtpValue] = useState("");
  const [seconds, setCountDown] = useState(60);
  const [error, setErrot] = useState({ visible: false, msg: "" });

  const onSubmit = () => {
    if (otpValue !== otp) {
      setErrot({ visible: true, msg: "Wrong OTP code, please try again" });
      return;
    }

    const data = {
      phone: number,
      name: user.name,
    };
    editProfileVerificationAPI(data, type, navigation)(dispatch);
    setErrot({ visible: false, msg: "" });
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
        style={{ fontSize: wp(7), fontWeight: "800" }}
        center
        title="Enter Code"
      />
      <Text
        center
        style={styles.draftSub}
        title={`Enter the OTP code we sent to ${number}.`}
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
      <RNText style={styles.timerText}>
        You can resend the OTP code in{" "}
        <Text
          style={styles.timerSecondText}
          title={seconds !== 0 ? (seconds > 9 ? seconds : `0${seconds}`) : "00"}
        />{" "}
        seconds
      </RNText>
      <RNText
        disabled={seconds != 0}
        onPress={() => setCountDown(60)}
        style={[
          styles.resendText,
          {
            color: seconds == 0 ? colors.purple : colors.black,
          },
        ]}
      >
        Resend code
      </RNText>
    </Body>
  );
};

export default UserOTP;
