import { useDispatch } from "react-redux";
import { View, Text } from "react-native";
import React, { useState } from "react";
import ActionSheet from "react-native-actions-sheet";

import { FullImage, MainButton } from "../../components";
import { appImages } from "../../assets";
import styles from "./authStyle";
import { CodeField, Cursor } from "react-native-confirmation-code-field";
import { colors } from "../../theme/colors";
import { Height } from "../../theme/globalStyle";
import { useNavigation } from "@react-navigation/native";
import { verifyOTPAPI } from "../../redux/queries/authQueries";

const AuthOTP = ({ ref, email }) => {
  const dispatch = useDispatch();
  const { navigate, replace } = useNavigation();

  const [verify, setVerify] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const [isPending, setIsPending] = useState(false);

  const onSubmit = () => {
    if (verify) {
      replace("login");
    } else {
      const data = { email, otp: otpValue };
      verifyOTPAPI(data, setIsPending, setVerify)(dispatch);
    }
  };
  return (
    <ActionSheet
      ref={ref}
      headerAlwaysVisible
      // containerStyle={styles.modalContainer}
    >
      <View style={styles.card}>
        <FullImage
          source={verify ? appImages.otpSuccess : appImages.otpImage}
          style={{ width: 150, height: 150 }}
        />
        <Height />
        <Text style={styles.title}>Account Created!</Text>
        <Text style={styles.subText}>
          {verify
            ? "You’ve successfully create an account, Please login before exploring our app!"
            : "We have sent you a 5-digit verification code.\nPlease check your email."}
        </Text>

        {/* 👉 You will handle this: OTP input fields */}
        {!verify && (
          <View style={styles.otpContainer}>
            <CodeField
              cellCount={5}
              autoFucus
              value={otpValue}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              onChangeText={(txt) => setOtpValue(txt)}
              renderCell={({ index, symbol, isFocused }) => (
                <View
                  key={index}
                  style={[
                    styles.cell,
                    {
                      borderColor: isFocused
                        ? colors.purple
                        : colors.borderColor,
                    },
                  ]}
                >
                  <Text key={index} style={[styles.cellText]}>
                    {symbol || (isFocused ? <Cursor /> : null)}
                  </Text>
                </View>
              )}
            />
          </View>
        )}

        <MainButton onPress={onSubmit} title={verify ? "Login" : "Verify"} />
      </View>
    </ActionSheet>
  );
};

export default AuthOTP;
