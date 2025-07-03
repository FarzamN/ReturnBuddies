import React from "react";
import { Row, globalStyle } from "../../theme/globalStyle";
import { FullImage, Text } from "..";
import { TouchableOpacity, View } from "react-native";
import styles from "./buttonStyle";
import { width } from "../../theme/responsive";
import { appImages } from "../../assets";
import { colors } from "../../theme/colors";

const PickupButton = (props) => {
  const { title, detail, source, onPress, isPayment, note } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[globalStyle.space_Between, styles.PickupCont]}
    >
      <Row>
        {!isPayment && <FullImage source={source} style={styles.pickupImage} />}

        <View>
          {isPayment ? (
            <Row>
              <Text style={styles.pickupTitle} title={"Pay Via"} />

              <Text
                style={[
                  styles.pickupTitle,
                  { color: colors.purple, marginLeft: 5 },
                ]}
                width={width / 1.7}
                title={title}
              />
            </Row>
          ) : (
            <Text
              style={styles.pickupTitle}
              width={width / 1.7}
              title={title}
            />
          )}
          {detail && (
            <Text
              color="#717171"
              width={width / 1.7}
              style={styles.pickupDetail}
              title={detail}
            />
          )}
          {note && (
            <Text
              color="#717171"
              width={width / 1.7}
              style={styles.pickupDetail}
              title={note}
            />
          )}
        </View>
      </Row>
      <FullImage source={appImages.edit} style={globalStyle.iconImage} />
    </TouchableOpacity>
  );
};

export default PickupButton;

//
