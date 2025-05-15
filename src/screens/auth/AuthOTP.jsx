import { View, Text, Alert } from "react-native";
import React, { useState } from "react";
import Modal from "react-native-modal";
import { FullImage, MainButton } from "../../components";
import { appImages } from "../../assets";
import styles from "./authStyle";
import { CodeField, Cursor } from "react-native-confirmation-code-field";
import { colors } from "../../theme/colors";
import { Height } from "../../theme/globalStyle";
import { useNavigation } from "@react-navigation/native";

const AuthOTP = ({ visible, onDismiss }) => {
  const { navigate, replace } = useNavigation();
  const [otpValue, setOtpValue] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [verify, setVerify] = useState(false);

  const handleSubmit = () => {
    if (verify) {
      replace("login");
      onDismiss();
    }
    setVerify((pre) => !pre);
  };
  return (
    <Modal isVisible={visible} style={styles.modalContainer}>
      <View style={styles.card}>
        <FullImage
          source={verify ? appImages.otpSuccess : appImages.otpImage}
          style={{ width: 200, height: 200 }}
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
          onPress={handleSubmit}
          title={verify ? "Login" : "Verifty"}
        />
      </View>
    </Modal>
  );
};

export default AuthOTP;
