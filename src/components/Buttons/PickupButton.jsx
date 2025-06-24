import React from "react";
import { Space_Between, Row, globalStyle } from "../../theme/globalStyle";
import Icon from "react-native-dynamic-vector-icons";
import { colors } from "../../theme/colors";
import { FullImage, Text } from "..";
import { TouchableOpacity, View } from "react-native";
import styles from "./buttonStyle";
import { width } from "../../theme/responsive";

const PickupButton = (props) => {
  const { title, detail, source, onPress, noEdit } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[globalStyle.space_Between, styles.PickupCont]}
    >
      <Row>
        <FullImage source={source} style={styles.pickupImage} />
        <View>
          <Text style={styles.pickupTitle} width={width / 1.7} title={title} />
          {detail && (
            <Text
              color="#717171"
              width={width / 1.7}
              style={styles.pickupDetail}
              title={detail}
            />
          )}
        </View>
      </Row>
      {!noEdit && (
        <Icon type="Feather" name="edit" size={20} color={colors.black} />
      )}
    </TouchableOpacity>
  );
};

export default PickupButton;

//
