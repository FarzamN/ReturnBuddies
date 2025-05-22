import React from "react";
import Icon from "react-native-dynamic-vector-icons";
import { colors } from "../../theme/colors";
import { Text } from "..";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { wp } from "../../theme/responsive";
import styles from "./helperStyle";
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
            <Icon name="edit" type="AntDesign" color="black" size={wp(5)} />
          </MenuOption>
        ))}
      </MenuOptions>
    </Menu>
  );
};

export default PopupMenu;
