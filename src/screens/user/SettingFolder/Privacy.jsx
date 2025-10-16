import React, { useState, useRef } from "react";
import WebView from "react-native-webview";
import { wp } from "../../../theme/responsive";
import { imageURl } from "../../../utils/urls";
import { Body, Header } from "../../../components";
import { globalStyle } from "../../../theme/globalStyle";

const Privacy = ({ route }) => {
  const { type } = route.params;
  const path = type === "privacy" ? "privacy-policy" : "term-and-condition";
  const name = type === "privacy" ? "Privacy Policy" : "Terms & Conditions";
  const uri = `${imageURl}${path}`;

  const webViewRef = useRef(null);
  const [showTitle, setShowTitle] = useState(false);

  const handleScroll = (event) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    if (scrollY > 60 && !showTitle) {
      setShowTitle(true);
    } else if (scrollY <= 60 && showTitle) {
      setShowTitle(false);
    }
  };

  return (
    <Body horizontal={wp(4)}>
      <Header leftTitle={showTitle ? name : ""} />
      <WebView
        ref={webViewRef}
        source={{ uri }}
        style={globalStyle.flex}
        onScroll={handleScroll}
        scrollEventThrottle={16} // for smoother scroll detection
      />
    </Body>
  );
};

export default Privacy;
