import {
  Body,
  Text,
  Header,
  MainButton,
  ReturnSection,
  DraftSkeleton,
} from "../../../components";
import styles from "../userStyle";
import { wp } from "../../../theme/responsive";
import React, { useEffect, useState } from "react";
import { FlatList, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { globalStyle, Height } from "../../../theme/globalStyle";
import { getSelectedReturnItem } from "../../../apis/draftQueries";
import { setDraftReturn, setLabelID } from "../../../redux/slices/draftSlice";
// import { draftData as draftSelectedRetun } from "../../../utils/data";

const SchedulePickup = ({ navigation, route }) => {
  const { navigate } = navigation;
  const { returnLabel } = route.params;
  const dispatch = useDispatch();

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
      {isPending ? (
        <FlatList
          data={[1, 1, 1]}
          contentContainerStyle={globalStyle.ph15}
          keyExtractor={(_, index) => index.toString()}
          renderItem={() => <DraftSkeleton height={70} />}
        />
      ) : (
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
      )}

      {!getPositive && !isPending && (
        <MainButton title="Continue" onPress={onSubmit} />
      )}
    </Body>
  );
};

export default SchedulePickup;
