import React from "react";
import { View } from "react-native";
import Image from "react-native-fast-image";
import { globalStyle } from "../../theme/globalStyle";

const FullImage = (props) => {
  const { style, source, ImageStyle, radius, resizeMode, color } = props;
  return (
    <View style={style}>
      <Image
        source={source}
        tintColor={color}
        style={[globalStyle.full, ImageStyle, { borderRadius: radius }]}
        resizeMode={resizeMode ? resizeMode : Image.resizeMode.contain}
      />
    </View>
  );
};

export default FullImage;
