"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.format = format;
exports.display = display;

var _colors = _interopRequireDefault(require("colors"));

var _cliTable = _interopRequireDefault(require("cli-table"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function format(days) {
  var formattedDays = [];

  for (var i = 0; i < days.length; i += 7) {
    var arr = days.slice(i, i + 7);
    var calendarDays = arr.map(function (day) {
      return day.isSameMonth ? day.date : '';
    });
    formattedDays.push(calendarDays);
  }

  return formattedDays;
}

function display() {
  var days = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var table = new _cliTable["default"]();
  var headers = ['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(function (day) {
    return _colors["default"].green.bold(day);
  });
  table.push(headers);
  var formattedDays = format(days);
  formattedDays.forEach(function (dayArray) {
    return table.push(dayArray);
  });
  console.log(table.toString());
}