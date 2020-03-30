const getDay = require('date-fns/getDay');
const format = require('date-fns/format');
const addDays = require('date-fns/addDays');
const getDate = require('date-fns/getDate');
const getYear = require('date-fns/getYear');
const isToday = require('date-fns/isToday');
const getMonth = require('date-fns/getMonth');
const isWeekend = require('date-fns/isWeekend');
const addMonths = require('date-fns/addMonths');
const subMonths = require('date-fns/subMonths');
const startOfDay = require('date-fns/startOfDay');
const endOfMonth = require('date-fns/endOfMonth');
const startOfWeek = require('date-fns/startOfWeek');
const isSameMonth = require('date-fns/isSameMonth');
const startOfMonth = require('date-fns/startOfMonth');
const isLastDayOfMonth = require('date-fns/isLastDayOfMonth');
const eachDayOfInterval = require('date-fns/eachDayOfInterval');
const isFirstDayOfMonth = require('date-fns/isFirstDayOfMonth');

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

function get(date) {
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

module.exports = {
  get,
  getCalendar: get,
};
