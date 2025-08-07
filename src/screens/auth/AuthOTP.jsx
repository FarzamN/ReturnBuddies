import styles from "./authStyle";
import Modal from "react-native-modal";
import { appImages } from "../../assets";
import { useDispatch } from "react-redux";
import { View, Text } from "react-native";
import { colors } from "../../theme/colors";
import React, { useEffect, useState } from "react";
import { verifyOTPAPI } from "../../apis/authQueries";
import { FullImage, MainButton } from "../../components";
import { useNavigation } from "@react-navigation/native";
import { globalStyle, Height } from "../../theme/globalStyle";
import { CodeField, Cursor } from "react-native-confirmation-code-field";

const AuthOTP = ({ visible, email, onClose }) => {
  const dispatch = useDispatch();
  const { replace } = useNavigation();

  const [error, setError] = useState(false);
  const [verify, setVerify] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const [isPending, setIsPending] = useState(false);

  const onSubmit = () => {
    if (verify) {
      replace("login");
    } else {
      const data = { email, otp: otpValue };
      verifyOTPAPI(data, setIsPending, setError, setVerify)(dispatch);
    }
  };

  useEffect(() => {
    if (visible) {
      setError(false);
      setOtpValue("");
    }
  }, [visible]);

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      style={styles.modalContainer}
    >
      <View style={[styles.card, globalStyle.pv10]}>
        <FullImage
          style={{ width: 150, height: 150 }}
          source={verify ? appImages.otpSuccess : appImages.otpImage}
        />
        <Height />
        <Text style={styles.title}>
          {verify ? "Account Created!" : "Verify your email"}
        </Text>
        <Text style={styles.subText}>
          {verify
            ? "Your account has been successfully created. Please log in to start returning!"
            : "We've sent you a 5-digit verification code. Please check your email."}
        </Text>

        {!verify && (
          <>
            <View
              style={[styles.otpContainer, { marginBottom: error ? 10 : 30 }]}
            >
              <CodeField
                autoFocus
                cellCount={5}
                value={otpValue}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                onChangeText={(txt) => {
                  setOtpValue(txt);
                  if (error) setError(false);
                }}
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
                    <Text style={styles.cellText}>
                      {symbol || (isFocused ? <Cursor /> : null)}
                    </Text>
                  </View>
                )}
              />
            </View>
            {error && (
              <Text
                style={{ color: colors.error, fontSize: 14, marginBottom: 10 }}
              >
                Invalid OTP
              </Text>
            )}
          </>
        )}

        <MainButton
          load={isPending}
          onPress={onSubmit}
          title={verify ? "Login" : "Verify"}
        />
      </View>
    </Modal>
  );
};

export default AuthOTP;
