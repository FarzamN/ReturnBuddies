import {
  check,
  request,
  RESULTS,
  PERMISSIONS,
  openSettings,
} from "react-native-permissions";

import { useState } from "react";
import { iOS } from "../utils/constants";
import { Alert, Platform } from "react-native";
import ImagePicker from "react-native-image-crop-picker";

export const useGalleryPermission = () => {
  const [picker, setPicker] = useState(false);

  const getPermissionType = (type) => {
    if (iOS) {
      return type === "camera"
        ? PERMISSIONS.IOS.CAMERA
        : PERMISSIONS.IOS.PHOTO_LIBRARY;
    } else {
      if (type === "camera") {
        return PERMISSIONS.ANDROID.CAMERA;
      } else {
        return Platform.Version >= 33
          ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
          : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
      }
    }
  };

  // ✅ Reusable permission request handler
  const requestPermission = async (type) => {
    const permission = getPermissionType(type);
    const result = await check(permission);

    switch (result) {
      case RESULTS.GRANTED:
        return true;

      case RESULTS.DENIED: {
        const newResult = await request(permission);
        return newResult === RESULTS.GRANTED;
      }

      case RESULTS.BLOCKED:
        Alert.alert(
          "Permission Required",
          `Please enable ${type} access from settings.`,
          [
            { text: "Cancel", style: "cancel" },
            { text: "Open Settings", onPress: () => openSettings() },
          ]
        );
        return null;

      default:
        return null;
    }
  };

  // ✅ Gallery picker
  const openGallery = async () => {
    const hasPermission = await requestPermission("gallery");
    if (!hasPermission) return null;

    try {
      const result = await ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: true,
        mediaType: "photo",
      });

      setPicker(false);
      return {
        name: result.path.split("/").pop() || "",
        uri: result.path,
        type: "image/jpeg",
      };
    } catch (err) {
      if (err.code !== "E_PICKER_CANCELLED")
        console.warn("Image Picker Error:", err);
      return null;
    }
  };

  // ✅ Camera picker
  const openCamera = async () => {
    const hasPermission = await requestPermission("camera");
    if (!hasPermission) return null;

    try {
      const result = await ImagePicker.openCamera({
        width: 300,
        height: 300,
        cropping: true,
        mediaType: "photo",
      });

      setPicker(false);
      return {
        name: result.path.split("/").pop() || "",
        uri: result.path,
        type: "image/jpeg",
      };
    } catch (err) {
      if (err.code !== "E_PICKER_CANCELLED")
        console.warn("Image Picker Error:", err);
      return null;
    }
  };

  return { openGallery, openCamera, picker, setPicker };
};
