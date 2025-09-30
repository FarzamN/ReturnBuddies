import React from "react";
import WebView from "react-native-webview";
import { wp } from "../../../theme/responsive";
import { Body, Header } from "../../../components";
import { globalStyle } from "../../../theme/globalStyle";

const Privacy = () => {
  const uri = "https://returnbuddies-production.up.railway.app/privacy-policy/";
  return (
    <Body horizontal={wp(4)}>
      <Header title="Privacy Policy" />
      <WebView source={{ uri }} style={globalStyle.flex} />
    </Body>
  );
};

export default Privacy;
