import { Dimensions } from "react-native";
import DeviceInfo from "react-native-device-info";

export const { width, height } = Dimensions.get("window");

export const wp = (p) => width * (p / 100);
export const hp = (p) => height * (p / 100);

export const f_inch = width <= 350 && height <= 600;
// export const tab = width >= 768 && height >= 1024;
export const tab = DeviceInfo.isTablet();
export const phone = width <= 400 && height <= 800;
const BASE_WIDTH = 375;
const BASE_HEIGHT = 812;

export const scaleSize = (size) => (width / BASE_WIDTH) * size;

export const verticalScale = (size) => (height / BASE_HEIGHT) * size;

export const fontScale = (size) => {
  const scaleFactor = tab
    ? 1.1
    : Math.min(width / BASE_WIDTH, height / BASE_HEIGHT);
  return Math.round(size * scaleFactor);
};

const responsive = {
  width: (size) => scaleSize(size),
  height: (size) => verticalScale(size),
  fontSize: (size) => fontScale(size),
  space: (size) => scaleSize(size),
  borderRadius: (size) => scaleSize(size),
};

export default responsive;
