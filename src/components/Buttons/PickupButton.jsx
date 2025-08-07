import React from "react";
import styles from "./buttonStyle";
import { FullImage, Text } from "..";
import { appImages } from "../../assets";
import { colors } from "../../theme/colors";
import { width } from "../../theme/responsive";
import { TouchableOpacity, View } from "react-native";
import { Row, globalStyle } from "../../theme/globalStyle";

const PickupButton = (props) => {
  const {
    title,
    detail,
    source,
    onPress,
    isPayment,
    twoTitle,
    twoDetail,
    isTwoDetail,
    disable,
  } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disable}
      activeOpacity={0.7}
      style={[globalStyle.space_Between, styles.PickupCont]}
    >
      <Row>
        {!isPayment && <FullImage source={source} style={styles.pickupImage} />}

        <View>
          {isPayment ? (
            <Row>
              <Text style={styles.pickupTitle} title={"Pay Via"} />

              <Text
                title={title}
                width={width / 1.7}
                color={colors.purple}
                style={[styles.pickupTitle, { marginLeft: 5 }]}
              />
            </Row>
          ) : (
            <>
              <Text
                title={title}
                width={width / 1.7}
                style={styles.pickupTitle}
              />
              {twoTitle && (
                <Text
                  title={twoTitle}
                  width={width / 1.7}
                  style={styles.pickupTitle}
                />
              )}
            </>
          )}
          {detail && (
            <Text
              title={detail}
              color="#717171"
              width={width / 1.7}
              style={styles.pickupDetail}
            />
          )}
          {isTwoDetail && (
            <Text
              title={twoDetail}
              color="#717171"
              width={width / 1.7}
              style={styles.pickupDetail}
            />
          )}
        </View>
      </Row>
      {!disable && (
        <FullImage source={appImages.edit} style={globalStyle.iconImage} />
      )}
    </TouchableOpacity>
  );
};

export default PickupButton;
