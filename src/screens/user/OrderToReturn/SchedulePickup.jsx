import {
  Body,
  Text,
  Header,
  MainButton,
  ReturnSection,
} from "../../../components";
import React from "react";
import styles from "../userStyle";
import { ScrollView } from "react-native";
import { wp } from "../../../theme/responsive";
import { draftData } from "../../../utils/data";
import { Height } from "../../../theme/globalStyle";

const SchedulePickup = ({ route }) => {
  const { returnLabel } = route.params;
  const getPositive = draftData
    .map((item) => item.labelPositive === "Label uploaded")
    .includes(false);
  return (
    <Body horizontal={wp(4)}>
      <Header leftTitle="Shipping Label" />
      <Text style={styles.draftTitle} title={"Upload Return Labels"} />
      <Text
        style={styles.draftSub}
        title={"Attach return labels for your items"}
      />
      <Height />

      <ScrollView>
        {draftData.map((section) => (
          <ReturnSection
            isLabel
            key={section.returnLabel}
            section={section}
            isPositive={section.labelPositive === "Label uploaded"}
          />
        ))}
      </ScrollView>
      {!getPositive && <MainButton title="Continue" />}
    </Body>
  );
};

export default SchedulePickup;
