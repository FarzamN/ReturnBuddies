// hooks/useGalleryPermission.js

import { useState } from "react";
import { Alert, Platform } from "react-native";
import {
  check,
  request,
  PERMISSIONS,
  RESULTS,
  openSettings,
} from "react-native-permissions";
import ImagePicker from "react-native-image-crop-picker";
import { iOS } from "../utils/constants";

export const useGalleryPermission = () => {
  const getPermissionType = () => {
    if (iOS) {
      return PERMISSIONS.IOS.PHOTO_LIBRARY;
    } else {
      return Platform.Version >= 33
        ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
        : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
    }
  };

  const requestGalleryPermission = async () => {
    const permission = getPermissionType();
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
          "Please enable gallery access in settings.",
          [
            { text: "Cancel", style: "cancel" },
            { text: "Open Settings", onPress: () => openSettings() },
          ]
        );
        return false;
      default:
        return false;
    }
  };

  const openGallery = async () => {
    const hasPermission = await requestGalleryPermission();
    if (!hasPermission) return null;
    try {
      const result = await ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: true,
        mediaType: "photo",
      });

      return {
        name: result.path.split("/").pop() || "",
        uri: result.path,
        type: "image/jpeg",
      };
    } catch (err) {
      if (err.code !== "E_PICKER_CANCELLED") {
        console.warn("Image Picker Error:", err);
      }
      return null;
    }
  };

  return { openGallery };
};
