import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import {
  check,
  request,
  RESULTS,
  PERMISSIONS,
  openSettings,
} from "react-native-permissions";
import { useState } from "react";
import { Alert, Platform } from "react-native";
import { iOS } from "../utils/constants";

export const useCameraGallery = () => {
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

  // ✅ Open Gallery
  const openGallery = async () => {
    const hasPermission = await requestPermission("gallery");
    if (!hasPermission) return null;

    return new Promise((resolve) => {
      launchImageLibrary({ mediaType: "photo" }, (response) => {
        if (response.didCancel) {
          resolve(null);
        } else if (response.errorMessage) {
          console.warn("Gallery Error:", response.errorMessage);
          resolve(null);
        } else {
          const asset = response.assets[0];
          setPicker(false);
          resolve({
            name: asset.fileName,
            uri: asset.uri,
            type: asset.type,
          });
        }
      });
    });
  };

  // ✅ Open Camera
  const openCamera = async () => {
    const hasPermission = await requestPermission("camera");
    if (!hasPermission) return null;

    return new Promise((resolve) => {
      launchCamera({ mediaType: "photo", saveToPhotos: true }, (response) => {
        if (response.didCancel) {
          resolve(null);
        } else if (response.errorMessage) {
          console.warn("Camera Error:", response.errorMessage);
          resolve(null);
        } else {
          const asset = response?.assets[0];
          setPicker(false);
          resolve({
            name: asset.fileName,
            uri: asset.uri,
            type: asset.type,
          });
        }
      });
    });
  };

  return { openGallery, openCamera, picker, setPicker };
};
