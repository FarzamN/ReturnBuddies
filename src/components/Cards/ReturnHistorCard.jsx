import React from "react";
import moment from "moment";
import styles from "./cardStyle";
import { View } from "react-native";
import { FullImage, Text } from "..";
import { colors } from "../../theme/colors";
import Icon from "react-native-dynamic-vector-icons";
import { Row, Space_Between } from "../../theme/globalStyle";
import { width } from "../../theme/responsive";

const ReturnHistorCard = ({ data }) => {
  const { title, detail } = data;
  return (
    <Space_Between style={styles.returtnHistoryCont}>
      <Row>
        <FullImage source={data.image} style={styles.returtnHistoryImage} />
        <View style={{ marginLeft: 10, width: width / 3 }}>
          <Text style={styles.returtnHistoryTitle} title={title} />
          <Text style={styles.returtnHistoryStatus} title={detail} />
        </View>
      </Row>
      <Row>
        <Icon name="calendar" size={20} type="Ionicons" color={colors.purple} />
        <Text
          style={styles.returtnHistoryDate}
          title={moment().format("DD/MM/YYYY")}
        />
      </Row>
    </Space_Between>
  );
};

export default ReturnHistorCard;
