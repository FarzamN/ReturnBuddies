import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";

import React from "react";
import styles from "./helperStyle";
import { FullImage, Text } from "..";
import { appImages } from "../../assets";
import { colors } from "../../theme/colors";
import Icon from "react-native-dynamic-vector-icons";
import { globalStyle } from "../../theme/globalStyle";

const PopupMenu = ({ options }) => {
  return (
    <Menu>
      <MenuTrigger>
        <Icon
          type="Entypo"
          name="dots-three-vertical"
          size={20}
          color={colors.black}
        />
      </MenuTrigger>

      <MenuOptions
        customStyles={{}}
        optionsContainerStyle={styles.optionsContainerStyle}
      >
        {options.map((item, index) => (
          <MenuOption
            key={index}
            onSelect={item.onSelect}
            style={globalStyle.space_Between}
          >
            <Text style={styles.textStyle} title={item.label} />
            <FullImage source={appImages.edit} style={globalStyle.iconImage} />
          </MenuOption>
        ))}
      </MenuOptions>
    </Menu>
  );
};

export default PopupMenu;
