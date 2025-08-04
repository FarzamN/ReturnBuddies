import {
  Body,
  Text,
  Header,
  MainButton,
  ReturnSection,
} from "../../../components";
import styles from "../userStyle";
import { wp } from "../../../theme/responsive";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Height } from "../../../theme/globalStyle";
import { getSelectedReturnItem } from "../../../apis/draftQueries";
import { setDraftReturn, setLabelID } from "../../../redux/slices/draftSlice";
import { iOS } from "../../../utils/constants";

const SchedulePickup = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { navigate } = navigation;
  const { returnLabel } = route.params;

  const { draftSelectedRetun } = useSelector((state) => state.draft);
  const [isPending, setIsLoading] = useState(false);

  const getPositive = draftSelectedRetun
    .map((item) => item.status !== "pending")
    .includes(false);

  const onSubmit = () => {
    dispatch(setDraftReturn({ _id: returnLabel }));
    navigate("schedulePickup", { isEdit: false });
  };

  useEffect(() => {
    dispatch(setLabelID(returnLabel));
    getSelectedReturnItem(returnLabel, setIsLoading)(dispatch);
  }, []);

  return (
    <Body horizontal={wp(4)}>
      <Header leftTitle="Shipping Label" />
      {!getPositive && (
        <>
          <Text style={styles.draftTitle} title={"Check your labels"} />
          <Text
            style={styles.draftSub}
            title={"See which items have return labels missing"}
          />
        </>
      )}

      <Height />
      <ScrollView showsVerticalScrollIndicator={false}>
        {draftSelectedRetun.map((section) => (
          <ReturnSection
            isLabel
            section={section}
            key={section._id}
            isPositive={section.status !== "pending"}
          />
        ))}
      </ScrollView>

      {!getPositive && !isPending && (
        <>
          <MainButton title="Continue" onPress={onSubmit} />
          {iOS && <Height />}
        </>
      )}
    </Body>
  );
};

export default SchedulePickup;
