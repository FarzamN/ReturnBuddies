import styles from "./authStyle";
import React, { useState } from "react";
import { appImages } from "../../assets";
import { useDispatch } from "react-redux";
import { View, Text } from "react-native";
import { colors } from "../../theme/colors";
import { Height } from "../../theme/globalStyle";
import { verifyOTPAPI } from "../../apis/authQueries";
import ActionSheet from "react-native-actions-sheet";
import { FullImage, MainButton } from "../../components";
import { useNavigation } from "@react-navigation/native";
import { CodeField, Cursor } from "react-native-confirmation-code-field";

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
          style={{ width: 150, height: 150 }}
          source={verify ? appImages.otpSuccess : appImages.otpImage}
        />
        <Height />
        <Text style={styles.title}>
          {verify ? "Account Created!" : " Verify your email"}
        </Text>
        <Text style={styles.subText}>
          {verify
            ? "Your account has been successfully created. Please log in to start returning!"
            : "We've sent you a 5-digit verification code. Please check on your email."}
        </Text>

        {/* 👉 You will handle this: OTP input fields */}
        {!verify && (
          <View style={styles.otpContainer}>
            <CodeField
              autoFocus
              cellCount={5}
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

        <MainButton
          load={isPending}
          onPress={onSubmit}
          title={verify ? "Login" : "Verify"}
        />
      </View>
    </ActionSheet>
  );
};

export default AuthOTP;
