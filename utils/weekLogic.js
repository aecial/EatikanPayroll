import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday.js";

dayjs.extend(weekday);

export function getCurrentWeekPeriod() {
  const week = [];
  // Get today's date
  const today = dayjs();
  // Get the Monday of the current week (even if today is Sunday)
  const monday = today
    .weekday(1 - (today.weekday() === 0 ? 7 : 0))
    .format("MM-DD-YYYY");
  // Get the Sunday of the current week
  const sunday = today
    .weekday(7 - (today.weekday() === 0 ? 7 : 0))
    .format("MM-DD-YYYY");
  week.push(monday, sunday);
  return week;
}
