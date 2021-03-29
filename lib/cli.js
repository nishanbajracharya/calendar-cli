"use strict";

var _commander = require("commander");

var _format = require("./format");

var _index = require("./index");

var program = new _commander.Command().arguments('[date]').action(function (date) {
  var dateObj = date ? new Date(date) : new Date();
  console.log(dateObj.toDateString());
  var calendar = (0, _index.getCalendar)(dateObj);
  (0, _format.display)(calendar.daysWithPadding);
}).parse();