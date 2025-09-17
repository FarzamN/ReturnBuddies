import {
  Body,
  Text,
  Header,
  MainButton,
  CircleCheck,
  TimeSelectCard,
} from "../../../components";

import moment from "moment";
import styles from "../userStyle";
import { iOS } from "../../../utils/constants";
import { wp } from "../../../theme/responsive";
import { colors } from "../../../theme/colors";
import { ScrollView, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Height } from "../../../theme/globalStyle";
import { DateSelectCard } from "../../../components";
import { getSorts } from "../../../apis/authQueries";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { setDraftReturn } from "../../../redux/slices/draftSlice";

const SchedulePickup = ({ route }) => {
  const { isEdit } = route.params;
  const dispatch = useDispatch();
  const { navigate } = useNavigation();
  const { time, date, selectedDateObj } = useSelector(
    (state) => state.draft.draftReturn
  );

  const [dates, setDates] = useState({
    date: [],
    timeSlots: [
      {
        time: "9:00 AM to 6:00 PM",
        value: true,
      },
      {
        time: "9:00 AM to 1:00 PM",
        value: true,
      },
      {
        time: "11:00 AM to 3:00 PM",
        value: true,
      },
      {
        time: "2:00 PM to 6:00 PM",
        value: true,
      },
    ],
  });
  const [load, setLoad] = useState(false);
  const [selection, setSelection] = useState({
    dates: date,
    times: time,
    confirm: true,
    selectedDateObj,
  });
  const [error, setError] = useState({
    date: false,
    time: false,
    confirm: false,
  });
  const onSubmit = () => {
    if (!selection.dates) {
      setError((prev) => ({ ...prev, date: true }));
      return;
    } else if (!selection.times) {
      setError((prev) => ({ ...prev, time: true }));
      return;
    } else if (!selection.confirm) {
      setError((prev) => ({ ...prev, confirm: true }));
      return;
    }

    setLoad(true);
    dispatch(
      setDraftReturn({
        date: selection.dates,
        time: selection.times.time,
        selectedDateObj: selection.selectedDateObj,
      })
    );
    navigate(isEdit ? "confirmPickup" : "pickupMethod");
    setLoad(false);
  };

  useEffect(() => {
    getSorts(setDates);
  }, []);

  useEffect(() => {
    if (selection.confirm) setError((prev) => ({ ...prev, confirm: false }));
    if (selection.dates) setError((prev) => ({ ...prev, date: false }));
    if (selection.times) setError((prev) => ({ ...prev, time: false }));
  }, [selection.dates, selection.times, selection.confirm]);

  return (
    <Body horizontal={wp(4)}>
      <Header leftTitle="Schedule Pickup" />
      <Text title={"Choose Pickup date\nand time"} style={styles.draftTitle} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <ScrollView
          horizontal
          style={[
            styles.dateContainer,
            {
              borderWidth: error.date ? 1 : 0,
              borderColor: error.date && colors.error,
            },
          ]}
        >
          {dates.date.map((item, index) => {
            const formatted = moment(item.date).format("YYYY-MM-DD");
            const isSelected = selection.dates === formatted;

            return (
              <DateSelectCard
                key={index}
                date={item.date}
                focus={isSelected}
                disabled={item.disabled}
                onPress={() =>
                  setSelection((prev) => ({
                    ...prev,
                    times: null,
                    dates: formatted || date,
                    selectedDateObj: item,
                  }))
                }
              />
            );
          })}
        </ScrollView>

        <View
          style={[
            styles.dateContainer,
            {
              flexDirection: "column",
              borderWidth: error.time ? 1 : 0,
              borderColor: error.time && colors.error,
            },
          ]}
        >
          {(selection.selectedDateObj?.timeSlots || dates.timeSlots).map(
            (slot, index) => (
              <TimeSelectCard
                key={index}
                index={index}
                data={slot.time}
                disabled={slot.value}
                focus={
                  selection.times === slot.time ||
                  selection.times?.time === slot.time
                }
                onPress={() =>
                  setSelection((prev) => ({ ...prev, times: slot }))
                }
              />
            )
          )}
        </View>
      </ScrollView>
      <View style={{ paddingRight: wp(3) }}>
        <CircleCheck
          isError={error.confirm}
          focus={selection.confirm}
          title="I confirm the return deadline for all items is at least 2 business days after my selected pickup date"
          onPress={() =>
            setSelection((prev) => ({ ...prev, confirm: !prev.confirm }))
          }
        />
      </View>
      <Height />
      <MainButton title="Continue" load={load} onPress={onSubmit} />
      {iOS && <Height />}
    </Body>
  );
};

export default SchedulePickup;
