import { showNotification } from "../components/Helpers/notifierHelper";
import moment from "moment";

export const catchFun = () =>
  showNotification("error", "Status 500", "Try again later");

export const getNextWeekdays = (count) => {
  const days = [];
  let current = moment();

  while (days.length < count) {
    const dayOfWeek = current.day(); // 0 = Sun, 6 = Sat
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      days.push(moment(current)); // clone to avoid mutation
    }
    current = current.add(1, "day");
  }

  return days;
};
