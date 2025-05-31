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
  console.log(returnLabel);

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
      {/* {!getPositive && <></>} */}

      <Height />

      <ScrollView showsVerticalScrollIndicator={false}>
        {draftData.map((section) => (
          <ReturnSection
            isLabel
            section={section}
            key={section.returnLabel}
            isPositive={section.labelPositive === "Label uploaded"}
          />
        ))}
      </ScrollView>
      {!getPositive && <MainButton title="Continue" />}
    </Body>
  );
};

export default SchedulePickup;
