import React from "react";
import { Body, Header, Text } from "../../../components";
import { wp } from "../../../theme/responsive";
import styles from "../userStyle";

const SchedulePickup = () => {
  return (
    <Body horizontal={wp(4)}>
      <Header leftTitle="Schedule Pickup" noSetting />
      <Text style={styles.draftTitle} title={"Choose Pickup data and time"} />
    </Body>
  );
};

export default SchedulePickup;
