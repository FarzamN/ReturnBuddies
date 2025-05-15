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

const scaleSize = (size) => (width / BASE_WIDTH) * size;

const verticalScaleSize = (size) => (height / BASE_HEIGHT) * size;

export const fontScale = (size) => {
  const scaleFactor = tab
    ? 1.1
    : Math.min(width / BASE_WIDTH, height / BASE_HEIGHT);
  return Math.round(size * scaleFactor);
};

const responsive = {
  width: (size) => scaleSize(size),
  height: (size) => verticalScaleSize(size),
  fontSize: (size) => fontScale(size),
  space: (size) => scaleSize(size),
  borderRadius: (size) => scaleSize(size),
};

export default responsive;

// Font Sizes
export const FONT_SIZES = {
  SMALL: fontScale(12),
  BODY: fontScale(16),
  SUB_HEADING: fontScale(20),
  HEADING: fontScale(24),
  LARGE_TITLE: fontScale(32),
};

// Spacing (Padding & Margin)
export const SPACING = {
  SMALL: responsive.space(8),
  DEFAULT: responsive.space(16),
  LARGE: responsive.space(24),
};

// Heights
export const HEIGHT_SIZES = {
  XSMALL: responsive.height(25),
  SMALL: responsive.height(40),
  DEFAULT: responsive.height(48),
  LARGE: responsive.height(56),
};

// Border Radius
export const BORDER_RADIUS = {
  SMALL: responsive.borderRadius(8),
  MEDIUM: responsive.borderRadius(12),
  LARGE: responsive.borderRadius(16),
  CIRCLE: responsive.borderRadius(50),
};
