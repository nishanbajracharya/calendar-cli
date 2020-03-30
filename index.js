import getDay from 'date-fns/getDay';
import format from 'date-fns/format';
import addDays from 'date-fns/addDays';
import getDate from 'date-fns/getDate';
import getYear from 'date-fns/getYear';
import isToday from 'date-fns/isToday';
import getMonth from 'date-fns/getMonth';
import isWeekend from 'date-fns/isWeekend';
import addMonths from 'date-fns/addMonths';
import subMonths from 'date-fns/subMonths';
import startOfDay from 'date-fns/startOfDay';
import endOfMonth from 'date-fns/endOfMonth';
import startOfWeek from 'date-fns/startOfWeek';
import isSameMonth from 'date-fns/isSameMonth';
import startOfMonth from 'date-fns/startOfMonth';
import isLastDayOfMonth from 'date-fns/isLastDayOfMonth';
import eachDayOfInterval from 'date-fns/eachDayOfInterval';
import isFirstDayOfMonth from 'date-fns/isFirstDayOfMonth';

function formatDateObject(days, currentMonth) {
  return days.map(day => ({
    dateObj: day,
    date: getDate(day),
    isToday: isToday(day),
    dayOfWeek: getDay(day),
    isWeekend: isWeekend(day),
    dayName: format(day, 'EEEE'),
    isLastDayOfMonth: isLastDayOfMonth(day),
    isFirstDayOfMonth: isFirstDayOfMonth(day),
    isSameMonth: isSameMonth(day, currentMonth),
  }));
}

function getPreviousDaysOfWeek(date) {
  const currentDay = getDay(date);

  if (currentDay === 0) return [];

  const firstDay = startOfWeek(date);
  const daysArray = [firstDay];

  for (let i = 1; i < currentDay; i++) {
    daysArray.push(addDays(firstDay, i));
  }

  return daysArray;
}

function getNextDaysOfWeek(date) {
  const currentDay = getDay(date);

  if (currentDay === 6) return [];

  const daysArray = [];

  for (let i = currentDay; i < 6; i++) {
    daysArray.push(addDays(date, i - currentDay + 1));
  }

  return daysArray;
}

export function getCalendar(date) {
  const today = new Date();

  const firstDay = startOfDay(startOfMonth(date));
  const lastDay = startOfDay(endOfMonth(date));

  const currentMonth = getMonth(date);
  const currentYear = getYear(date);
  const currentDate = getDate(date);

  const days = eachDayOfInterval({
    start: firstDay,
    end: lastDay,
  });

  return {
    current: { year: currentYear, month: currentMonth, date: currentDate },
    today: {
      year: getYear(today),
      month: getMonth(today),
      date: getDate(today),
    },
    previousMonth: subMonths(startOfMonth(date), 1),
    nextMonth: addMonths(startOfMonth(date), 1),
    days: formatDateObject(days, date),
    daysWithPadding: formatDateObject(
      [].concat(
        getPreviousDaysOfWeek(firstDay),
        days,
        getNextDaysOfWeek(lastDay)
      ),
      date
    ),
  };
}

export default getCalendar;
