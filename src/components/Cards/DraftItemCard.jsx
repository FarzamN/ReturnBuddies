import { View, TouchableOpacity } from "react-native";
import React from "react";
import styles from "./cardStyle";
import { Divider, globalStyle, Space_Between } from "../../theme/globalStyle";
import { colors } from "../../theme/colors";
import Icon from "react-native-dynamic-vector-icons";
import { FullImage, PopupMenu, Text } from "..";
import { wp } from "../../theme/responsive";

const DraftItemCard = ({ onCheckPress, focus, data, options }) => {
  return (
    <>
      <Space_Between
        style={[
          styles.DraftCont,
          {
            borderWidth: focus ? 1 : 0,
          },
        ]}
      >
        <View style={[globalStyle.row, globalStyle.pv5]}>
          <TouchableOpacity
            onPress={onCheckPress}
            style={{ marginRight: wp(4) }}
          >
            <Icon
              size={24}
              type={focus ? "Ionicons" : "MaterialIcons"}
              color={focus ? colors.purple : "#8F8F8F"}
              name={
                focus ? "checkmark-circle-outline" : "radio-button-unchecked"
              }
            />
          </TouchableOpacity>
          <FullImage source={data.image} style={styles.DraftImage} />
          <View style={styles.DraftInfoContainer}>
            <Text style={styles.DraftTitle} title={data.title} />
            <Text style={styles.DraftStatus} title={data.status} />
          </View>
        </View>
        {/* <PopupMenu options={options} /> */}
      </Space_Between>
      <Divider />
    </>
  );
};

export default DraftItemCard;
