"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCalendar = getCalendar;
exports["default"] = void 0;

var _getDay = _interopRequireDefault(require("date-fns/getDay"));

var _format = _interopRequireDefault(require("date-fns/format"));

var _addDays = _interopRequireDefault(require("date-fns/addDays"));

var _getDate = _interopRequireDefault(require("date-fns/getDate"));

var _getYear = _interopRequireDefault(require("date-fns/getYear"));

var _isToday = _interopRequireDefault(require("date-fns/isToday"));

var _getMonth = _interopRequireDefault(require("date-fns/getMonth"));

var _isWeekend = _interopRequireDefault(require("date-fns/isWeekend"));

var _addMonths = _interopRequireDefault(require("date-fns/addMonths"));

var _subMonths = _interopRequireDefault(require("date-fns/subMonths"));

var _startOfDay = _interopRequireDefault(require("date-fns/startOfDay"));

var _endOfMonth = _interopRequireDefault(require("date-fns/endOfMonth"));

var _startOfWeek = _interopRequireDefault(require("date-fns/startOfWeek"));

var _isSameMonth = _interopRequireDefault(require("date-fns/isSameMonth"));

var _startOfMonth = _interopRequireDefault(require("date-fns/startOfMonth"));

var _isLastDayOfMonth = _interopRequireDefault(require("date-fns/isLastDayOfMonth"));

var _eachDayOfInterval = _interopRequireDefault(require("date-fns/eachDayOfInterval"));

var _isFirstDayOfMonth = _interopRequireDefault(require("date-fns/isFirstDayOfMonth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function formatDateObject(days, currentMonth) {
  return days.map(function (day) {
    return {
      dateObj: day,
      date: (0, _getDate["default"])(day),
      isToday: (0, _isToday["default"])(day),
      dayOfWeek: (0, _getDay["default"])(day),
      isWeekend: (0, _isWeekend["default"])(day),
      dayName: (0, _format["default"])(day, 'EEEE'),
      isLastDayOfMonth: (0, _isLastDayOfMonth["default"])(day),
      isFirstDayOfMonth: (0, _isFirstDayOfMonth["default"])(day),
      isSameMonth: (0, _isSameMonth["default"])(day, currentMonth)
    };
  });
}

function getPreviousDaysOfWeek(date) {
  var currentDay = (0, _getDay["default"])(date);
  if (currentDay === 0) return [];
  var firstDay = (0, _startOfWeek["default"])(date);
  var daysArray = [firstDay];

  for (var i = 1; i < currentDay; i++) {
    daysArray.push((0, _addDays["default"])(firstDay, i));
  }

  return daysArray;
}

function getNextDaysOfWeek(date) {
  var currentDay = (0, _getDay["default"])(date);
  if (currentDay === 6) return [];
  var daysArray = [];

  for (var i = currentDay; i < 6; i++) {
    daysArray.push((0, _addDays["default"])(date, i - currentDay + 1));
  }

  return daysArray;
}

function getCalendar() {
  var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();
  var today = new Date();
  var firstDay = (0, _startOfDay["default"])((0, _startOfMonth["default"])(date));
  var lastDay = (0, _startOfDay["default"])((0, _endOfMonth["default"])(date));
  var currentMonth = (0, _getMonth["default"])(date);
  var currentYear = (0, _getYear["default"])(date);
  var currentDate = (0, _getDate["default"])(date);
  var days = (0, _eachDayOfInterval["default"])({
    start: firstDay,
    end: lastDay
  });
  return {
    current: {
      year: currentYear,
      month: currentMonth,
      date: currentDate
    },
    today: {
      year: (0, _getYear["default"])(today),
      month: (0, _getMonth["default"])(today),
      date: (0, _getDate["default"])(today)
    },
    previousMonth: (0, _subMonths["default"])((0, _startOfMonth["default"])(date), 1),
    nextMonth: (0, _addMonths["default"])((0, _startOfMonth["default"])(date), 1),
    days: formatDateObject(days, date),
    daysWithPadding: formatDateObject([].concat(getPreviousDaysOfWeek(firstDay), days, getNextDaysOfWeek(lastDay)), date)
  };
}

var _default = getCalendar;
exports["default"] = _default;