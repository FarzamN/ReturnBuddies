import {
  Body,
  Text,
  Header,
  MainButton,
  TimeSelectCard,
} from "../../../components";
import styles from "../userStyle";
import { useDispatch, useSelector } from "react-redux";
import { wp } from "../../../theme/responsive";
import { colors } from "../../../theme/colors";
import React, { useEffect, useState } from "react";
import { DateSelectCard } from "../../../components";
import Icon from "react-native-dynamic-vector-icons";
import { useNavigation } from "@react-navigation/native";
import { globalStyle, Height } from "../../../theme/globalStyle";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { setDraftReturn } from "../../../redux/slices/draftSlice";
import { getNextWeekdays, showNotification } from "../../../function";

const SchedulePickup = ({ route }) => {
  const { isEdit } = route.params;
  const dispatch = useDispatch();
  const { navigate } = useNavigation();
  const { pickupMethod, time, date } = useSelector(
    (state) => state.draft.draftReturn
  );
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
    // setSelection((prev) => ({
    //   ...prev,
    //   dates: weekdays[0].format("YYYY-MM-DD"),
    // })); // default selected
  }, []);

  return (
    <Body horizontal={wp(4)}>
      <Header leftTitle="Schedule Pickup" />
      <Text style={styles.draftTitle} title={"Choose Pickup date\nand time"} />

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
      <TouchableOpacity
        style={globalStyle.row}
        onPress={() =>
          setSelection((prev) => ({ ...prev, confirm: !prev.confirm }))
        }
      >
        <Icon
          size={22}
          color={selection.confirm ? colors.purple : colors.grey}
          type={selection.confirm ? "Ionicons" : "Entypo"}
          name={selection.confirm ? "checkmark-circle" : "circle"}
        />
        <Text
          title="I confirm the return deadline for all items is at least 2 business days after my selected pickup date"
          style={{ marginLeft: 15, width: "90%" }}
        />
      </TouchableOpacity>
      <Height />
      <MainButton title="Continue" load={load} onPress={onSubmit} />
    </Body>
  );
};

export default SchedulePickup;
