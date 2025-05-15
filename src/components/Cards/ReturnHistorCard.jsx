import { View } from "react-native";
import React from "react";
import { Row, Space_Between } from "../../theme/globalStyle";
import { FullImage, Text } from "..";
import styles from "./cardStyle";
import Icon from "react-native-dynamic-vector-icons";
import { colors } from "../../theme/colors";
import moment from "moment";

const ReturnHistorCard = ({ data }) => {
  const { title, image, detail, createdAt } = data;

  return (
    <Space_Between style={styles.returtnHistoryCont}>
      <Row>
        <FullImage source={data.image} style={styles.returtnHistoryImage} />
        <View style={{ marginLeft: 10 }}>
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
