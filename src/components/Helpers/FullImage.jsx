import React from "react";
import { View, Image } from "react-native";
import { imageURl } from "../../utils/urls";
import FastImage from "react-native-fast-image";
import { globalStyle } from "../../theme/globalStyle";

const FullImage = (props) => {
  const {
    style,
    color,
    source,
    radius,
    resizeMode,
    ImageStyle,
    isUrl = false,
  } = props;
  const getImageSource = () => {
    let cleanedSource = source;
    if (typeof cleanedSource === "string") {
      cleanedSource = cleanedSource.replace(/\\/g, "/");
    }

    if (isUrl) {
      const isFullUrl =
        cleanedSource.startsWith("http://") ||
        cleanedSource.startsWith("https://");
      return { uri: isFullUrl ? cleanedSource : imageURl + cleanedSource };
    }

    return cleanedSource;
  };

  return (
    <View style={style}>
      {isUrl ? (
        <FastImage
          source={getImageSource()}
          resizeMode={FastImage.resizeMode.contain}
          style={[globalStyle.full, ImageStyle, { borderRadius: radius }]}
        />
      ) : (
        <Image
          source={source}
          tintColor={color}
          resizeMode={resizeMode ? resizeMode : "contain"}
          style={[globalStyle.full, ImageStyle, { borderRadius: radius }]}
        />
      )}
    </View>
  );
};

export default FullImage;
