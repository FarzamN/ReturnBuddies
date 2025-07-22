import {
  Body,
  Text,
  Header,
  MainButton,
  CircleCheck,
  TimeSelectCard,
} from "../../../components";
import styles from "../userStyle";
import { wp } from "../../../theme/responsive";
import { ScrollView, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Height } from "../../../theme/globalStyle";
import { DateSelectCard } from "../../../components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { setDraftReturn } from "../../../redux/slices/draftSlice";
import { getNextWeekdays, showNotification } from "../../../function";
import { iOS } from "../../../utils/constants";

const SchedulePickup = ({ route }) => {
  const { isEdit } = route.params;
  const dispatch = useDispatch();
  const { navigate } = useNavigation();
  const { time, date } = useSelector((state) => state.draft.draftReturn);

  const [dates, setDates] = useState([]);
  const [load, setLoad] = useState(false);
  const [selection, setSelection] = useState({
    dates: date,
    times: time,
    confirm: true,
  });

  const onSubmit = () => {
    const requiredFields = {
      dates: "Date",
      times: "Time",
      confirm: "Confirmation",
    };
    for (const field in requiredFields) {
      if (!selection[field]) {
        showNotification(
          "error",
          `${requiredFields[field]} is required`,
          "Error"
        );
        return;
      }
    }

    setLoad(true);
    dispatch(
      setDraftReturn({
        date: selection.dates,
        time: selection.times,
      })
    );
    navigate(isEdit ? "confirmPickup" : "pickupMethod");
    setLoad(false);
  };

  useEffect(() => {
    const weekdays = getNextWeekdays(6);
    weekdays.shift();
    setDates(weekdays);
  }, []);

  return (
    <Body horizontal={wp(4)}>
      <Header leftTitle="Schedule Pickup" />
      <Text
        title={"Choose Pickup date\nand time"}
        style={[styles.draftTitle, { fontSize: 17 }]}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <ScrollView horizontal style={styles.dateContainer}>
          {dates.map((date, index) => {
            const formatted = date.format("YYYY-MM-DD");
            const isSelected = selection.dates === formatted;

            return (
              <DateSelectCard
                date={date}
                key={index}
                focus={isSelected}
                onPress={() =>
                  setSelection((prev) => ({ ...prev, dates: formatted }))
                }
              />
            );
          })}
        </ScrollView>

        <View style={[styles.dateContainer, { flexDirection: "column" }]}>
          {[
            "9:00 AM - 6:00 PM",
            "9:00AM - 1:00PM",
            "11:00 AM - 3:00 PM",
            "2:00 PM - 6:00 PM",
          ].map((times, index) => (
            <TimeSelectCard
              data={times}
              key={index}
              index={index}
              focus={times === selection.times}
              onPress={() => setSelection((prev) => ({ ...prev, times }))}
            />
          ))}
        </View>
      </ScrollView>
      <CircleCheck
        focus={selection.confirm}
        title="I confirm the return deadline for all items is at least 2 business days after my selected pickup date"
        onPress={() =>
          setSelection((prev) => ({ ...prev, confirm: !prev.confirm }))
        }
      />
      <Height />
      <MainButton title="Continue" load={load} onPress={onSubmit} />
      {iOS && <Height />}
    </Body>
  );
};

export default SchedulePickup;
