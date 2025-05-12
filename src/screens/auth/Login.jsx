import { useDispatch } from "react-redux";
import { ScrollView, Text } from "react-native";
import React from "react";
import { Body, MainButton, Header } from "../../components";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { wp } from "../../theme/responsive";
import styles from "./authStyle";

const Login = () => {
  const dispatch = useDispatch();
  const { goBack } = useNavigation();
  const { user, token } = useSelector((state) => state.auth);

  const handleSubmit = () => {};
  return (
    <Body horizontal={wp(4)}>
      <Header rightIcon leftIcon onleftIconPress={goBack} imageLogo />

      <ScrollView
        keyboardShouldPersistTaps={"always"}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.mainTitle}>Welcome back</Text>
      </ScrollView>
      <MainButton title={"ok"} onPress={handleSubmit} />
    </Body>
  );
};

export default Login;
