import React from "react";
import * as Icons from "lucide-react-native";

const DynamicIcon = ({ name, size = 24, color = "black", ...props }) => {
  const Icon = Icons[name];
  if (!Icon) {
    console.warn(`Lucide icon "${name}" not found.`);
    return null;
  }
  return <Icon size={size} color={color} {...props} />;
};

export default DynamicIcon;
