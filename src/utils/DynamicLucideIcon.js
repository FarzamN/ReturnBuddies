import React from "react";
import * as Icons from "lucide-react-native";

export const DynamicIcon = ({ name, size = 24, color = "black", ...props }) => {
  const Icon = Icons[name];
  if (!Icon) {
    console.error(`Lucide icon "${name}" not found.`);
    return null;
  }
  return <Icon size={size} color={color} {...props} />;
};
