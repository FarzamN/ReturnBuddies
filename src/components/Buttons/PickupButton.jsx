import React from "react";
import { Space_Between, Row, globalStyle } from "../../theme/globalStyle";
import Icon from "react-native-dynamic-vector-icons";
import { colors } from "../../theme/colors";
import { FullImage, Text } from "..";
import { TouchableOpacity, View } from "react-native";
import styles from "./buttonStyle";

const PickupButton = (props) => {
  const { title, detail, source } = props;
  return (
    <TouchableOpacity style={[globalStyle.space_Between, styles.PickupCont]}>
      <Row>
        <FullImage source={source} style={styles.pickupImage} />
        <View>
          <Text style={styles.pickupTitle} title={title} />
          {detail && (
            <Text color="#717171" style={styles.pickupDetail} title={detail} />
          )}
        </View>
      </Row>
      <Icon type="Feather" name="edit" size={20} color={colors.black} />
    </TouchableOpacity>
  );
};

export default PickupButton;

//
