import {
  Body,
  Text,
  Header,
  MainButton,
  ReturnSection,
  DraftSkeleton,
} from "../../../components";

import React, { useEffect, useState } from "react";
import styles from "../userStyle";
import { FlatList, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { wp } from "../../../theme/responsive";
import { globalStyle, Height } from "../../../theme/globalStyle";
import { getSelectedReturnItem } from "../../../redux/queries/draftQueries";
import { setDraftReturn } from "../../../redux/slices/draftSlice";
// import { draftData as draftSelectedRetun } from "../../../utils/data";

const SchedulePickup = ({ navigation, route }) => {
  const { navigate } = navigation;
  const { returnLabel } = route.params;
  const dispatch = useDispatch();
  const [isPending, setIsLoading] = useState(false);

  const { draftSelectedRetun } = useSelector((state) => state.draft);
  const getPositive = draftSelectedRetun
    .map((item) => item.status !== "pending")
    .includes(false);

  useEffect(() => {
    getSelectedReturnItem(returnLabel, setIsLoading)(dispatch);
  }, []);

  return (
    <Body horizontal={wp(4)}>
      <Header leftTitle="Shipping Label" noSetting />
      <Text style={styles.draftTitle} title={"Upload Return Labels"} />
      <Text
        style={styles.draftSub}
        title={"Attach return labels for your items"}
      />

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

      {!getPositive && (
        <MainButton
          title="Continue"
          onPress={() => {
            dispatch(
              setDraftReturn({
                _id: returnLabel,
              })
            );
            navigate("schedulePickup");
          }}
        />
      )}
    </Body>
  );
};

export default SchedulePickup;
