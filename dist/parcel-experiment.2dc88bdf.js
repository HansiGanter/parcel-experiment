// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({503:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _typeof;
function _typeof(obj) {
  "@babel/helpers - typeof";

  return exports.default = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}
},{}],491:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toInteger;
function toInteger(dirtyNumber) {
  if (dirtyNumber === null || dirtyNumber === true || dirtyNumber === false) {
    return NaN;
  }
  var number = Number(dirtyNumber);
  if (isNaN(number)) {
    return number;
  }
  return number < 0 ? Math.ceil(number) : Math.floor(number);
}
},{}],490:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = requiredArgs;
function requiredArgs(required, args) {
  if (args.length < required) {
    throw new TypeError(required + ' argument' + (required > 1 ? 's' : '') + ' required, but only ' + args.length + ' present');
  }
}
},{}],243:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toDate;

var _typeof2 = require("@babel/runtime/helpers/esm/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _index = require("../_lib/requiredArgs/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name toDate
 * @category Common Helpers
 * @summary Convert the given argument to an instance of Date.
 *
 * @description
 * Convert the given argument to an instance of Date.
 *
 * If the argument is an instance of Date, the function returns its clone.
 *
 * If the argument is a number, it is treated as a timestamp.
 *
 * If the argument is none of the above, the function returns Invalid Date.
 *
 * **Note**: *all* Date arguments passed to any *date-fns* function is processed by `toDate`.
 *
 * @param {Date|Number} argument - the value to convert
 * @returns {Date} the parsed date in the local time zone
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Clone the date:
 * const result = toDate(new Date(2014, 1, 11, 11, 30, 30))
 * //=> Tue Feb 11 2014 11:30:30
 *
 * @example
 * // Convert the timestamp to date:
 * const result = toDate(1392098430000)
 * //=> Tue Feb 11 2014 11:30:30
 */
function toDate(argument) {
  (0, _index2.default)(1, arguments);
  var argStr = Object.prototype.toString.call(argument);

  // Clone the date
  if (argument instanceof Date || (0, _typeof3.default)(argument) === 'object' && argStr === '[object Date]') {
    // Prevent the date to lose the milliseconds when passed to new Date() in IE10
    return new Date(argument.getTime());
  } else if (typeof argument === 'number' || argStr === '[object Number]') {
    return new Date(argument);
  } else {
    if ((typeof argument === 'string' || argStr === '[object String]') && typeof console !== 'undefined') {
      // eslint-disable-next-line no-console
      console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments");
      // eslint-disable-next-line no-console
      console.warn(new Error().stack);
    }
    return new Date(NaN);
  }
}
},{"@babel/runtime/helpers/esm/typeof":503,"../_lib/requiredArgs/index.js":490}],11:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addDays;

var _index = require("../_lib/toInteger/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../toDate/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../_lib/requiredArgs/index.js");

var _index6 = _interopRequireDefault(_index5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name addDays
 * @category Day Helpers
 * @summary Add the specified number of days to the given date.
 *
 * @description
 * Add the specified number of days to the given date.
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of days to be added. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 * @returns {Date} - the new date with the days added
 * @throws {TypeError} - 2 arguments required
 *
 * @example
 * // Add 10 days to 1 September 2014:
 * const result = addDays(new Date(2014, 8, 1), 10)
 * //=> Thu Sep 11 2014 00:00:00
 */
function addDays(dirtyDate, dirtyAmount) {
  (0, _index6.default)(2, arguments);
  var date = (0, _index4.default)(dirtyDate);
  var amount = (0, _index2.default)(dirtyAmount);
  if (isNaN(amount)) {
    return new Date(NaN);
  }
  if (!amount) {
    // If 0 days, no-op to avoid changing times in the hour before end of DST
    return date;
  }
  date.setDate(date.getDate() + amount);
  return date;
}
},{"../_lib/toInteger/index.js":491,"../toDate/index.js":243,"../_lib/requiredArgs/index.js":490}],15:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addMonths;

var _index = require("../_lib/toInteger/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../toDate/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../_lib/requiredArgs/index.js");

var _index6 = _interopRequireDefault(_index5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name addMonths
 * @category Month Helpers
 * @summary Add the specified number of months to the given date.
 *
 * @description
 * Add the specified number of months to the given date.
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of months to be added. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 * @returns {Date} the new date with the months added
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Add 5 months to 1 September 2014:
 * const result = addMonths(new Date(2014, 8, 1), 5)
 * //=> Sun Feb 01 2015 00:00:00
 */
function addMonths(dirtyDate, dirtyAmount) {
  (0, _index6.default)(2, arguments);
  var date = (0, _index4.default)(dirtyDate);
  var amount = (0, _index2.default)(dirtyAmount);
  if (isNaN(amount)) {
    return new Date(NaN);
  }
  if (!amount) {
    // If 0 months, no-op to avoid changing times in the hour before end of DST
    return date;
  }
  var dayOfMonth = date.getDate();

  // The JS Date object supports date math by accepting out-of-bounds values for
  // month, day, etc. For example, new Date(2020, 0, 0) returns 31 Dec 2019 and
  // new Date(2020, 13, 1) returns 1 Feb 2021.  This is *almost* the behavior we
  // want except that dates will wrap around the end of a month, meaning that
  // new Date(2020, 13, 31) will return 3 Mar 2021 not 28 Feb 2021 as desired. So
  // we'll default to the end of the desired month by adding 1 to the desired
  // month and using a date of 0 to back up one day to the end of the desired
  // month.
  var endOfDesiredMonth = new Date(date.getTime());
  endOfDesiredMonth.setMonth(date.getMonth() + amount + 1, 0);
  var daysInMonth = endOfDesiredMonth.getDate();
  if (dayOfMonth >= daysInMonth) {
    // If we're already at the end of the month, then this is the correct date
    // and we're done.
    return endOfDesiredMonth;
  } else {
    // Otherwise, we now know that setting the original day-of-month value won't
    // cause an overflow, so set the desired day-of-month. Note that we can't
    // just set the date of `endOfDesiredMonth` because that object may have had
    // its time changed in the unusual case where where a DST transition was on
    // the last day of the month and its local time was in the hour skipped or
    // repeated next to a DST transition.  So we use `date` instead which is
    // guaranteed to still have the original time.
    date.setFullYear(endOfDesiredMonth.getFullYear(), endOfDesiredMonth.getMonth(), dayOfMonth);
    return date;
  }
}
},{"../_lib/toInteger/index.js":491,"../toDate/index.js":243,"../_lib/requiredArgs/index.js":490}],67:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = add;

var _typeof2 = require("@babel/runtime/helpers/esm/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _index = require("../addDays/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../addMonths/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../toDate/index.js");

var _index6 = _interopRequireDefault(_index5);

var _index7 = require("../_lib/requiredArgs/index.js");

var _index8 = _interopRequireDefault(_index7);

var _index9 = require("../_lib/toInteger/index.js");

var _index10 = _interopRequireDefault(_index9);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name add
 * @category Common Helpers
 * @summary Add the specified years, months, weeks, days, hours, minutes and seconds to the given date.
 *
 * @description
 * Add the specified years, months, weeks, days, hours, minutes and seconds to the given date.
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Duration} duration - the object with years, months, weeks, days, hours, minutes and seconds to be added. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 *
 * | Key            | Description                        |
 * |----------------|------------------------------------|
 * | years          | Amount of years to be added        |
 * | months         | Amount of months to be added       |
 * | weeks          | Amount of weeks to be added        |
 * | days           | Amount of days to be added         |
 * | hours          | Amount of hours to be added        |
 * | minutes        | Amount of minutes to be added      |
 * | seconds        | Amount of seconds to be added      |
 *
 * All values default to 0
 *
 * @returns {Date} the new date with the seconds added
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Add the following duration to 1 September 2014, 10:19:50
 * const result = add(new Date(2014, 8, 1, 10, 19, 50), {
 *   years: 2,
 *   months: 9,
 *   weeks: 1,
 *   days: 7,
 *   hours: 5,
 *   minutes: 9,
 *   seconds: 30,
 * })
 * //=> Thu Jun 15 2017 15:29:20
 */
function add(dirtyDate, duration) {
  (0, _index8.default)(2, arguments);
  if (!duration || (0, _typeof3.default)(duration) !== 'object') return new Date(NaN);
  var years = duration.years ? (0, _index10.default)(duration.years) : 0;
  var months = duration.months ? (0, _index10.default)(duration.months) : 0;
  var weeks = duration.weeks ? (0, _index10.default)(duration.weeks) : 0;
  var days = duration.days ? (0, _index10.default)(duration.days) : 0;
  var hours = duration.hours ? (0, _index10.default)(duration.hours) : 0;
  var minutes = duration.minutes ? (0, _index10.default)(duration.minutes) : 0;
  var seconds = duration.seconds ? (0, _index10.default)(duration.seconds) : 0;

  // Add years and months
  var date = (0, _index6.default)(dirtyDate);
  var dateWithMonths = months || years ? (0, _index4.default)(date, months + years * 12) : date;

  // Add weeks and days
  var dateWithDays = days || weeks ? (0, _index2.default)(dateWithMonths, days + weeks * 7) : dateWithMonths;

  // Add days, hours, minutes and seconds
  var minutesToAdd = minutes + hours * 60;
  var secondsToAdd = seconds + minutesToAdd * 60;
  var msToAdd = secondsToAdd * 1000;
  var finalDate = new Date(dateWithDays.getTime() + msToAdd);
  return finalDate;
}
},{"@babel/runtime/helpers/esm/typeof":503,"../addDays/index.js":11,"../addMonths/index.js":15,"../toDate/index.js":243,"../_lib/requiredArgs/index.js":490,"../_lib/toInteger/index.js":491}],154:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isWeekend;

var _index = require("../toDate/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name isWeekend
 * @category Weekday Helpers
 * @summary Does the given date fall on a weekend?
 *
 * @description
 * Does the given date fall on a weekend?
 *
 * @param {Date|Number} date - the date to check
 * @returns {Boolean} the date falls on a weekend
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Does 5 October 2014 fall on a weekend?
 * const result = isWeekend(new Date(2014, 9, 5))
 * //=> true
 */
function isWeekend(dirtyDate) {
  (0, _index4.default)(1, arguments);
  var date = (0, _index2.default)(dirtyDate);
  var day = date.getDay();
  return day === 0 || day === 6;
}
},{"../toDate/index.js":243,"../_lib/requiredArgs/index.js":490}],139:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isSunday;

var _index = require("../toDate/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name isSunday
 * @category Weekday Helpers
 * @summary Is the given date Sunday?
 *
 * @description
 * Is the given date Sunday?
 *
 * @param {Date|Number} date - the date to check
 * @returns {Boolean} the date is Sunday
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Is 21 September 2014 Sunday?
 * const result = isSunday(new Date(2014, 8, 21))
 * //=> true
 */
function isSunday(dirtyDate) {
  (0, _index4.default)(1, arguments);
  return (0, _index2.default)(dirtyDate).getDay() === 0;
}
},{"../toDate/index.js":243,"../_lib/requiredArgs/index.js":490}],137:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isSaturday;

var _index = require("../toDate/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name isSaturday
 * @category Weekday Helpers
 * @summary Is the given date Saturday?
 *
 * @description
 * Is the given date Saturday?
 *
 * @param {Date|Number} date - the date to check
 * @returns {Boolean} the date is Saturday
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Is 27 September 2014 Saturday?
 * const result = isSaturday(new Date(2014, 8, 27))
 * //=> true
 */
function isSaturday(dirtyDate) {
  (0, _index4.default)(1, arguments);
  return (0, _index2.default)(dirtyDate).getDay() === 6;
}
},{"../toDate/index.js":243,"../_lib/requiredArgs/index.js":490}],10:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addBusinessDays;

var _index = require("../isWeekend/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../toDate/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../_lib/toInteger/index.js");

var _index6 = _interopRequireDefault(_index5);

var _index7 = require("../_lib/requiredArgs/index.js");

var _index8 = _interopRequireDefault(_index7);

var _index9 = require("../isSunday/index.js");

var _index10 = _interopRequireDefault(_index9);

var _index11 = require("../isSaturday/index.js");

var _index12 = _interopRequireDefault(_index11);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name addBusinessDays
 * @category Day Helpers
 * @summary Add the specified number of business days (mon - fri) to the given date.
 *
 * @description
 * Add the specified number of business days (mon - fri) to the given date, ignoring weekends.
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of business days to be added. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 * @returns {Date} the new date with the business days added
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Add 10 business days to 1 September 2014:
 * const result = addBusinessDays(new Date(2014, 8, 1), 10)
 * //=> Mon Sep 15 2014 00:00:00 (skipped weekend days)
 */
function addBusinessDays(dirtyDate, dirtyAmount) {
  (0, _index8.default)(2, arguments);
  var date = (0, _index4.default)(dirtyDate);
  var startedOnWeekend = (0, _index2.default)(date);
  var amount = (0, _index6.default)(dirtyAmount);
  if (isNaN(amount)) return new Date(NaN);
  var hours = date.getHours();
  var sign = amount < 0 ? -1 : 1;
  var fullWeeks = (0, _index6.default)(amount / 5);
  date.setDate(date.getDate() + fullWeeks * 7);

  // Get remaining days not part of a full week
  var restDays = Math.abs(amount % 5);

  // Loops over remaining days
  while (restDays > 0) {
    date.setDate(date.getDate() + sign);
    if (!(0, _index2.default)(date)) restDays -= 1;
  }

  // If the date is a weekend day and we reduce a dividable of
  // 5 from it, we land on a weekend date.
  // To counter this, we add days accordingly to land on the next business day
  if (startedOnWeekend && (0, _index2.default)(date) && amount !== 0) {
    // If we're reducing days, we want to add days until we land on a weekday
    // If we're adding days we want to reduce days until we land on a weekday
    if ((0, _index12.default)(date)) date.setDate(date.getDate() + (sign < 0 ? 2 : -1));
    if ((0, _index10.default)(date)) date.setDate(date.getDate() + (sign < 0 ? 1 : -2));
  }

  // Restore hours to avoid DST lag
  date.setHours(hours);
  return date;
}
},{"../isWeekend/index.js":154,"../toDate/index.js":243,"../_lib/toInteger/index.js":491,"../_lib/requiredArgs/index.js":490,"../isSunday/index.js":139,"../isSaturday/index.js":137}],13:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addMilliseconds;

var _index = require("../_lib/toInteger/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../toDate/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../_lib/requiredArgs/index.js");

var _index6 = _interopRequireDefault(_index5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name addMilliseconds
 * @category Millisecond Helpers
 * @summary Add the specified number of milliseconds to the given date.
 *
 * @description
 * Add the specified number of milliseconds to the given date.
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of milliseconds to be added. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 * @returns {Date} the new date with the milliseconds added
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Add 750 milliseconds to 10 July 2014 12:45:30.000:
 * const result = addMilliseconds(new Date(2014, 6, 10, 12, 45, 30, 0), 750)
 * //=> Thu Jul 10 2014 12:45:30.750
 */
function addMilliseconds(dirtyDate, dirtyAmount) {
  (0, _index6.default)(2, arguments);
  var timestamp = (0, _index4.default)(dirtyDate).getTime();
  var amount = (0, _index2.default)(dirtyAmount);
  return new Date(timestamp + amount);
}
},{"../_lib/toInteger/index.js":491,"../toDate/index.js":243,"../_lib/requiredArgs/index.js":490}],9:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addHours;

var _index = require("../_lib/toInteger/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../addMilliseconds/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../_lib/requiredArgs/index.js");

var _index6 = _interopRequireDefault(_index5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MILLISECONDS_IN_HOUR = 3600000;

/**
 * @name addHours
 * @category Hour Helpers
 * @summary Add the specified number of hours to the given date.
 *
 * @description
 * Add the specified number of hours to the given date.
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of hours to be added. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 * @returns {Date} the new date with the hours added
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Add 2 hours to 10 July 2014 23:00:00:
 * const result = addHours(new Date(2014, 6, 10, 23, 0), 2)
 * //=> Fri Jul 11 2014 01:00:00
 */
function addHours(dirtyDate, dirtyAmount) {
  (0, _index6.default)(2, arguments);
  var amount = (0, _index2.default)(dirtyAmount);
  return (0, _index4.default)(dirtyDate, amount * MILLISECONDS_IN_HOUR);
}
},{"../_lib/toInteger/index.js":491,"../addMilliseconds/index.js":13,"../_lib/requiredArgs/index.js":490}],494:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDefaultOptions = getDefaultOptions;
exports.setDefaultOptions = setDefaultOptions;
var defaultOptions = {};
function getDefaultOptions() {
  return defaultOptions;
}
function setDefaultOptions(newOptions) {
  defaultOptions = newOptions;
}
},{}],226:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = startOfWeek;

var _index = require("../toDate/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/toInteger/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../_lib/requiredArgs/index.js");

var _index6 = _interopRequireDefault(_index5);

var _index7 = require("../_lib/defaultOptions/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name startOfWeek
 * @category Week Helpers
 * @summary Return the start of a week for the given date.
 *
 * @description
 * Return the start of a week for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|Number} date - the original date
 * @param {Object} [options] - an object with options.
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @returns {Date} the start of a week
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
 *
 * @example
 * // The start of a week for 2 September 2014 11:55:00:
 * const result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Sun Aug 31 2014 00:00:00
 *
 * @example
 * // If the week starts on Monday, the start of the week for 2 September 2014 11:55:00:
 * const result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0), { weekStartsOn: 1 })
 * //=> Mon Sep 01 2014 00:00:00
 */
function startOfWeek(dirtyDate, options) {
  var _ref, _ref2, _ref3, _options$weekStartsOn, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
  (0, _index6.default)(1, arguments);
  var defaultOptions = (0, _index7.getDefaultOptions)();
  var weekStartsOn = (0, _index4.default)((_ref = (_ref2 = (_ref3 = (_options$weekStartsOn = options === null || options === void 0 ? void 0 : options.weekStartsOn) !== null && _options$weekStartsOn !== void 0 ? _options$weekStartsOn : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.weekStartsOn) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions.weekStartsOn) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.weekStartsOn) !== null && _ref !== void 0 ? _ref : 0);

  // Test if weekStartsOn is between 0 and 6 _and_ is not NaN
  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError('weekStartsOn must be between 0 and 6 inclusively');
  }
  var date = (0, _index2.default)(dirtyDate);
  var day = date.getDay();
  var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
  date.setDate(date.getDate() - diff);
  date.setHours(0, 0, 0, 0);
  return date;
}
},{"../toDate/index.js":243,"../_lib/toInteger/index.js":491,"../_lib/requiredArgs/index.js":490,"../_lib/defaultOptions/index.js":494}],218:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = startOfISOWeek;

var _index = require("../startOfWeek/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name startOfISOWeek
 * @category ISO Week Helpers
 * @summary Return the start of an ISO week for the given date.
 *
 * @description
 * Return the start of an ISO week for the given date.
 * The result will be in the local timezone.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param {Date|Number} date - the original date
 * @returns {Date} the start of an ISO week
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // The start of an ISO week for 2 September 2014 11:55:00:
 * const result = startOfISOWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Mon Sep 01 2014 00:00:00
 */
function startOfISOWeek(dirtyDate) {
  (0, _index4.default)(1, arguments);
  return (0, _index2.default)(dirtyDate, {
    weekStartsOn: 1
  });
}
},{"../startOfWeek/index.js":226,"../_lib/requiredArgs/index.js":490}],90:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getISOWeekYear;

var _index = require("../toDate/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../startOfISOWeek/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../_lib/requiredArgs/index.js");

var _index6 = _interopRequireDefault(_index5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name getISOWeekYear
 * @category ISO Week-Numbering Year Helpers
 * @summary Get the ISO week-numbering year of the given date.
 *
 * @description
 * Get the ISO week-numbering year of the given date,
 * which always starts 3 days before the year's first Thursday.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param {Date|Number} date - the given date
 * @returns {Number} the ISO week-numbering year
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Which ISO-week numbering year is 2 January 2005?
 * const result = getISOWeekYear(new Date(2005, 0, 2))
 * //=> 2004
 */
function getISOWeekYear(dirtyDate) {
  (0, _index6.default)(1, arguments);
  var date = (0, _index2.default)(dirtyDate);
  var year = date.getFullYear();
  var fourthOfJanuaryOfNextYear = new Date(0);
  fourthOfJanuaryOfNextYear.setFullYear(year + 1, 0, 4);
  fourthOfJanuaryOfNextYear.setHours(0, 0, 0, 0);
  var startOfNextYear = (0, _index4.default)(fourthOfJanuaryOfNextYear);
  var fourthOfJanuaryOfThisYear = new Date(0);
  fourthOfJanuaryOfThisYear.setFullYear(year, 0, 4);
  fourthOfJanuaryOfThisYear.setHours(0, 0, 0, 0);
  var startOfThisYear = (0, _index4.default)(fourthOfJanuaryOfThisYear);
  if (date.getTime() >= startOfNextYear.getTime()) {
    return year + 1;
  } else if (date.getTime() >= startOfThisYear.getTime()) {
    return year;
  } else {
    return year - 1;
  }
}
},{"../toDate/index.js":243,"../startOfISOWeek/index.js":218,"../_lib/requiredArgs/index.js":490}],217:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = startOfISOWeekYear;

var _index = require("../getISOWeekYear/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../startOfISOWeek/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../_lib/requiredArgs/index.js");

var _index6 = _interopRequireDefault(_index5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name startOfISOWeekYear
 * @category ISO Week-Numbering Year Helpers
 * @summary Return the start of an ISO week-numbering year for the given date.
 *
 * @description
 * Return the start of an ISO week-numbering year,
 * which always starts 3 days before the year's first Thursday.
 * The result will be in the local timezone.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param {Date|Number} date - the original date
 * @returns {Date} the start of an ISO week-numbering year
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // The start of an ISO week-numbering year for 2 July 2005:
 * const result = startOfISOWeekYear(new Date(2005, 6, 2))
 * //=> Mon Jan 03 2005 00:00:00
 */
function startOfISOWeekYear(dirtyDate) {
  (0, _index6.default)(1, arguments);
  var year = (0, _index2.default)(dirtyDate);
  var fourthOfJanuary = new Date(0);
  fourthOfJanuary.setFullYear(year, 0, 4);
  fourthOfJanuary.setHours(0, 0, 0, 0);
  var date = (0, _index4.default)(fourthOfJanuary);
  return date;
}
},{"../getISOWeekYear/index.js":90,"../startOfISOWeek/index.js":218,"../_lib/requiredArgs/index.js":490}],492:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getTimezoneOffsetInMilliseconds;
/**
 * Google Chrome as of 67.0.3396.87 introduced timezones with offset that includes seconds.
 * They usually appear for dates that denote time before the timezones were introduced
 * (e.g. for 'Europe/Prague' timezone the offset is GMT+00:57:44 before 1 October 1891
 * and GMT+01:00:00 after that date)
 *
 * Date#getTimezoneOffset returns the offset in minutes and would return 57 for the example above,
 * which would lead to incorrect calculations.
 *
 * This function returns the timezone offset in milliseconds that takes seconds in account.
 */
function getTimezoneOffsetInMilliseconds(date) {
  var utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
  utcDate.setUTCFullYear(date.getFullYear());
  return date.getTime() - utcDate.getTime();
}
},{}],213:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = startOfDay;

var _index = require("../toDate/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name startOfDay
 * @category Day Helpers
 * @summary Return the start of a day for the given date.
 *
 * @description
 * Return the start of a day for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|Number} date - the original date
 * @returns {Date} the start of a day
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // The start of a day for 2 September 2014 11:55:00:
 * const result = startOfDay(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 02 2014 00:00:00
 */
function startOfDay(dirtyDate) {
  (0, _index4.default)(1, arguments);
  var date = (0, _index2.default)(dirtyDate);
  date.setHours(0, 0, 0, 0);
  return date;
}
},{"../toDate/index.js":243,"../_lib/requiredArgs/index.js":490}],27:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = differenceInCalendarDays;

var _index = require("../_lib/getTimezoneOffsetInMilliseconds/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../startOfDay/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../_lib/requiredArgs/index.js");

var _index6 = _interopRequireDefault(_index5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MILLISECONDS_IN_DAY = 86400000;

/**
 * @name differenceInCalendarDays
 * @category Day Helpers
 * @summary Get the number of calendar days between the given dates.
 *
 * @description
 * Get the number of calendar days between the given dates. This means that the times are removed
 * from the dates and then the difference in days is calculated.
 *
 * @param {Date|Number} dateLeft - the later date
 * @param {Date|Number} dateRight - the earlier date
 * @returns {Number} the number of calendar days
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // How many calendar days are between
 * // 2 July 2011 23:00:00 and 2 July 2012 00:00:00?
 * const result = differenceInCalendarDays(
 *   new Date(2012, 6, 2, 0, 0),
 *   new Date(2011, 6, 2, 23, 0)
 * )
 * //=> 366
 * // How many calendar days are between
 * // 2 July 2011 23:59:00 and 3 July 2011 00:01:00?
 * const result = differenceInCalendarDays(
 *   new Date(2011, 6, 3, 0, 1),
 *   new Date(2011, 6, 2, 23, 59)
 * )
 * //=> 1
 */
function differenceInCalendarDays(dirtyDateLeft, dirtyDateRight) {
  (0, _index6.default)(2, arguments);
  var startOfDayLeft = (0, _index4.default)(dirtyDateLeft);
  var startOfDayRight = (0, _index4.default)(dirtyDateRight);
  var timestampLeft = startOfDayLeft.getTime() - (0, _index2.default)(startOfDayLeft);
  var timestampRight = startOfDayRight.getTime() - (0, _index2.default)(startOfDayRight);

  // Round the number of days to the nearest integer
  // because the number of milliseconds in a day is not constant
  // (e.g. it's different in the day of the daylight saving time clock shift)
  return Math.round((timestampLeft - timestampRight) / MILLISECONDS_IN_DAY);
}
},{"../_lib/getTimezoneOffsetInMilliseconds/index.js":492,"../startOfDay/index.js":213,"../_lib/requiredArgs/index.js":490}],221:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setISOWeekYear;

var _index = require("../_lib/toInteger/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../toDate/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../startOfISOWeekYear/index.js");

var _index6 = _interopRequireDefault(_index5);

var _index7 = require("../differenceInCalendarDays/index.js");

var _index8 = _interopRequireDefault(_index7);

var _index9 = require("../_lib/requiredArgs/index.js");

var _index10 = _interopRequireDefault(_index9);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name setISOWeekYear
 * @category ISO Week-Numbering Year Helpers
 * @summary Set the ISO week-numbering year to the given date.
 *
 * @description
 * Set the ISO week-numbering year to the given date,
 * saving the week number and the weekday number.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} isoWeekYear - the ISO week-numbering year of the new date
 * @returns {Date} the new date with the ISO week-numbering year set
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Set ISO week-numbering year 2007 to 29 December 2008:
 * const result = setISOWeekYear(new Date(2008, 11, 29), 2007)
 * //=> Mon Jan 01 2007 00:00:00
 */
function setISOWeekYear(dirtyDate, dirtyISOWeekYear) {
  (0, _index10.default)(2, arguments);
  var date = (0, _index4.default)(dirtyDate);
  var isoWeekYear = (0, _index2.default)(dirtyISOWeekYear);
  var diff = (0, _index8.default)(date, (0, _index6.default)(date));
  var fourthOfJanuary = new Date(0);
  fourthOfJanuary.setFullYear(isoWeekYear, 0, 4);
  fourthOfJanuary.setHours(0, 0, 0, 0);
  date = (0, _index6.default)(fourthOfJanuary);
  date.setDate(date.getDate() + diff);
  return date;
}
},{"../_lib/toInteger/index.js":491,"../toDate/index.js":243,"../startOfISOWeekYear/index.js":217,"../differenceInCalendarDays/index.js":27,"../_lib/requiredArgs/index.js":490}],12:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addISOWeekYears;

var _index = require("../_lib/toInteger/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../getISOWeekYear/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../setISOWeekYear/index.js");

var _index6 = _interopRequireDefault(_index5);

var _index7 = require("../_lib/requiredArgs/index.js");

var _index8 = _interopRequireDefault(_index7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name addISOWeekYears
 * @category ISO Week-Numbering Year Helpers
 * @summary Add the specified number of ISO week-numbering years to the given date.
 *
 * @description
 * Add the specified number of ISO week-numbering years to the given date.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of ISO week-numbering years to be added. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 * @returns {Date} the new date with the ISO week-numbering years added
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Add 5 ISO week-numbering years to 2 July 2010:
 * const result = addISOWeekYears(new Date(2010, 6, 2), 5)
 * //=> Fri Jun 26 2015 00:00:00
 */
function addISOWeekYears(dirtyDate, dirtyAmount) {
  (0, _index8.default)(2, arguments);
  var amount = (0, _index2.default)(dirtyAmount);
  return (0, _index6.default)(dirtyDate, (0, _index4.default)(dirtyDate) + amount);
}
},{"../_lib/toInteger/index.js":491,"../getISOWeekYear/index.js":90,"../setISOWeekYear/index.js":221,"../_lib/requiredArgs/index.js":490}],14:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addMinutes;

var _index = require("../_lib/toInteger/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../addMilliseconds/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../_lib/requiredArgs/index.js");

var _index6 = _interopRequireDefault(_index5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MILLISECONDS_IN_MINUTE = 60000;

/**
 * @name addMinutes
 * @category Minute Helpers
 * @summary Add the specified number of minutes to the given date.
 *
 * @description
 * Add the specified number of minutes to the given date.
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of minutes to be added. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 * @returns {Date} the new date with the minutes added
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Add 30 minutes to 10 July 2014 12:00:00:
 * const result = addMinutes(new Date(2014, 6, 10, 12, 0), 30)
 * //=> Thu Jul 10 2014 12:30:00
 */
function addMinutes(dirtyDate, dirtyAmount) {
  (0, _index6.default)(2, arguments);
  var amount = (0, _index2.default)(dirtyAmount);
  return (0, _index4.default)(dirtyDate, amount * MILLISECONDS_IN_MINUTE);
}
},{"../_lib/toInteger/index.js":491,"../addMilliseconds/index.js":13,"../_lib/requiredArgs/index.js":490}],16:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addQuarters;

var _index = require("../_lib/toInteger/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../addMonths/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../_lib/requiredArgs/index.js");

var _index6 = _interopRequireDefault(_index5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name addQuarters
 * @category Quarter Helpers
 * @summary Add the specified number of year quarters to the given date.
 *
 * @description
 * Add the specified number of year quarters to the given date.
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of quarters to be added. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 * @returns {Date} the new date with the quarters added
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Add 1 quarter to 1 September 2014:
 * const result = addQuarters(new Date(2014, 8, 1), 1)
 * //=> Mon Dec 01 2014 00:00:00
 */
function addQuarters(dirtyDate, dirtyAmount) {
  (0, _index6.default)(2, arguments);
  var amount = (0, _index2.default)(dirtyAmount);
  var months = amount * 3;
  return (0, _index4.default)(dirtyDate, months);
}
},{"../_lib/toInteger/index.js":491,"../addMonths/index.js":15,"../_lib/requiredArgs/index.js":490}],17:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addSeconds;

var _index = require("../_lib/toInteger/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../addMilliseconds/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../_lib/requiredArgs/index.js");

var _index6 = _interopRequireDefault(_index5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name addSeconds
 * @category Second Helpers
 * @summary Add the specified number of seconds to the given date.
 *
 * @description
 * Add the specified number of seconds to the given date.
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of seconds to be added. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 * @returns {Date} the new date with the seconds added
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Add 30 seconds to 10 July 2014 12:45:00:
 * const result = addSeconds(new Date(2014, 6, 10, 12, 45, 0), 30)
 * //=> Thu Jul 10 2014 12:45:30
 */
function addSeconds(dirtyDate, dirtyAmount) {
  (0, _index6.default)(2, arguments);
  var amount = (0, _index2.default)(dirtyAmount);
  return (0, _index4.default)(dirtyDate, amount * 1000);
}
},{"../_lib/toInteger/index.js":491,"../addMilliseconds/index.js":13,"../_lib/requiredArgs/index.js":490}],18:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addWeeks;

var _index = require("../_lib/toInteger/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../addDays/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../_lib/requiredArgs/index.js");

var _index6 = _interopRequireDefault(_index5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name addWeeks
 * @category Week Helpers
 * @summary Add the specified number of weeks to the given date.
 *
 * @description
 * Add the specified number of week to the given date.
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of weeks to be added. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 * @returns {Date} the new date with the weeks added
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Add 4 weeks to 1 September 2014:
 * const result = addWeeks(new Date(2014, 8, 1), 4)
 * //=> Mon Sep 29 2014 00:00:00
 */
function addWeeks(dirtyDate, dirtyAmount) {
  (0, _index6.default)(2, arguments);
  var amount = (0, _index2.default)(dirtyAmount);
  var days = amount * 7;
  return (0, _index4.default)(dirtyDate, days);
}
},{"../_lib/toInteger/index.js":491,"../addDays/index.js":11,"../_lib/requiredArgs/index.js":490}],19:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addYears;

var _index = require("../_lib/toInteger/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../addMonths/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../_lib/requiredArgs/index.js");

var _index6 = _interopRequireDefault(_index5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name addYears
 * @category Year Helpers
 * @summary Add the specified number of years to the given date.
 *
 * @description
 * Add the specified number of years to the given date.
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of years to be added. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 * @returns {Date} the new date with the years added
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Add 5 years to 1 September 2014:
 * const result = addYears(new Date(2014, 8, 1), 5)
 * //=> Sun Sep 01 2019 00:00:00
 */
function addYears(dirtyDate, dirtyAmount) {
  (0, _index6.default)(2, arguments);
  var amount = (0, _index2.default)(dirtyAmount);
  return (0, _index4.default)(dirtyDate, amount * 12);
}
},{"../_lib/toInteger/index.js":491,"../addMonths/index.js":15,"../_lib/requiredArgs/index.js":490}],20:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = areIntervalsOverlapping;

var _index = require("../toDate/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name areIntervalsOverlapping
 * @category Interval Helpers
 * @summary Is the given time interval overlapping with another time interval?
 *
 * @description
 * Is the given time interval overlapping with another time interval? Adjacent intervals do not count as overlapping.
 *
 * @param {Interval} intervalLeft - the first interval to compare. See [Interval]{@link https://date-fns.org/docs/Interval}
 * @param {Interval} intervalRight - the second interval to compare. See [Interval]{@link https://date-fns.org/docs/Interval}
 * @param {Object} [options] - the object with options
 * @param {Boolean} [options.inclusive=false] - whether the comparison is inclusive or not
 * @returns {Boolean} whether the time intervals are overlapping
 * @throws {TypeError} 2 arguments required
 * @throws {RangeError} The start of an interval cannot be after its end
 * @throws {RangeError} Date in interval cannot be `Invalid Date`
 *
 * @example
 * // For overlapping time intervals:
 * areIntervalsOverlapping(
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
 *   { start: new Date(2014, 0, 17), end: new Date(2014, 0, 21) }
 * )
 * //=> true
 *
 * @example
 * // For non-overlapping time intervals:
 * areIntervalsOverlapping(
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
 *   { start: new Date(2014, 0, 21), end: new Date(2014, 0, 22) }
 * )
 * //=> false
 *
 * @example
 * // For adjacent time intervals:
 * areIntervalsOverlapping(
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
 *   { start: new Date(2014, 0, 20), end: new Date(2014, 0, 30) }
 * )
 * //=> false
 *
 * @example
 * // Using the inclusive option:
 * areIntervalsOverlapping(
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
 *   { start: new Date(2014, 0, 20), end: new Date(2014, 0, 24) }
 * )
 * //=> false
 * areIntervalsOverlapping(
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
 *   { start: new Date(2014, 0, 20), end: new Date(2014, 0, 24) },
 *   { inclusive: true }
 * )
 * //=> true
 */
function areIntervalsOverlapping(intervalLeft, intervalRight, options) {
  (0, _index4.default)(2, arguments);
  var leftStartTime = (0, _index2.default)(intervalLeft === null || intervalLeft === void 0 ? void 0 : intervalLeft.start).getTime();
  var leftEndTime = (0, _index2.default)(intervalLeft === null || intervalLeft === void 0 ? void 0 : intervalLeft.end).getTime();
  var rightStartTime = (0, _index2.default)(intervalRight === null || intervalRight === void 0 ? void 0 : intervalRight.start).getTime();
  var rightEndTime = (0, _index2.default)(intervalRight === null || intervalRight === void 0 ? void 0 : intervalRight.end).getTime();

  // Throw an exception if start date is after end date or if any date is `Invalid Date`
  if (!(leftStartTime <= leftEndTime && rightStartTime <= rightEndTime)) {
    throw new RangeError('Invalid interval');
  }
  if (options !== null && options !== void 0 && options.inclusive) {
    return leftStartTime <= rightEndTime && rightStartTime <= leftEndTime;
  }
  return leftStartTime < rightEndTime && rightStartTime < leftEndTime;
}
},{"../toDate/index.js":243,"../_lib/requiredArgs/index.js":490}],163:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = max;

var _typeof2 = require("@babel/runtime/helpers/esm/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _index = require("../toDate/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name max
 * @category Common Helpers
 * @summary Return the latest of the given dates.
 *
 * @description
 * Return the latest of the given dates.
 *
 * @param {Date[]|Number[]} datesArray - the dates to compare
 * @returns {Date} the latest of the dates
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Which of these dates is the latest?
 * const result = max([
 *   new Date(1989, 6, 10),
 *   new Date(1987, 1, 11),
 *   new Date(1995, 6, 2),
 *   new Date(1990, 0, 1)
 * ])
 * //=> Sun Jul 02 1995 00:00:00
 */
function max(dirtyDatesArray) {
  (0, _index4.default)(1, arguments);
  var datesArray;
  // `dirtyDatesArray` is Array, Set or Map, or object with custom `forEach` method
  if (dirtyDatesArray && typeof dirtyDatesArray.forEach === 'function') {
    datesArray = dirtyDatesArray;

    // If `dirtyDatesArray` is Array-like Object, convert to Array.
  } else if ((0, _typeof3.default)(dirtyDatesArray) === 'object' && dirtyDatesArray !== null) {
    datesArray = Array.prototype.slice.call(dirtyDatesArray);
  } else {
    // `dirtyDatesArray` is non-iterable, return Invalid Date
    return new Date(NaN);
  }
  var result;
  datesArray.forEach(function (dirtyDate) {
    var currentDate = (0, _index2.default)(dirtyDate);
    if (result === undefined || result < currentDate || isNaN(Number(currentDate))) {
      result = currentDate;
    }
  });
  return result || new Date(NaN);
}
},{"@babel/runtime/helpers/esm/typeof":503,"../toDate/index.js":243,"../_lib/requiredArgs/index.js":490}],168:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = min;

var _typeof2 = require("@babel/runtime/helpers/esm/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _index = require("../toDate/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name min
 * @category Common Helpers
 * @summary Returns the earliest of the given dates.
 *
 * @description
 * Returns the earliest of the given dates.
 *
 * @param {Date[]|Number[]} datesArray - the dates to compare
 * @returns {Date} - the earliest of the dates
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Which of these dates is the earliest?
 * const result = min([
 *   new Date(1989, 6, 10),
 *   new Date(1987, 1, 11),
 *   new Date(1995, 6, 2),
 *   new Date(1990, 0, 1)
 * ])
 * //=> Wed Feb 11 1987 00:00:00
 */
function min(dirtyDatesArray) {
  (0, _index4.default)(1, arguments);
  var datesArray;
  // `dirtyDatesArray` is Array, Set or Map, or object with custom `forEach` method
  if (dirtyDatesArray && typeof dirtyDatesArray.forEach === 'function') {
    datesArray = dirtyDatesArray;
    // If `dirtyDatesArray` is Array-like Object, convert to Array.
  } else if ((0, _typeof3.default)(dirtyDatesArray) === 'object' && dirtyDatesArray !== null) {
    datesArray = Array.prototype.slice.call(dirtyDatesArray);
  } else {
    // `dirtyDatesArray` is non-iterable, return Invalid Date
    return new Date(NaN);
  }
  var result;
  datesArray.forEach(function (dirtyDate) {
    var currentDate = (0, _index2.default)(dirtyDate);
    if (result === undefined || result > currentDate || isNaN(currentDate.getDate())) {
      result = currentDate;
    }
  });
  return result || new Date(NaN);
}
},{"@babel/runtime/helpers/esm/typeof":503,"../toDate/index.js":243,"../_lib/requiredArgs/index.js":490}],21:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = clamp;

var _index = require("../max/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../min/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../_lib/requiredArgs/index.js");

var _index6 = _interopRequireDefault(_index5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name clamp
 * @category Interval Helpers
 * @summary Return a date bounded by the start and the end of the given interval
 *
 * @description
 * Clamps a date to the lower bound with the start of the interval and the upper
 * bound with the end of the interval.
 *
 * - When the date is less than the start of the interval, the start is returned.
 * - When the date is greater than the end of the interval, the end is returned.
 * - Otherwise the date is returned.
 *
 * @example
 * // What is Mar, 21, 2021 bounded to an interval starting at Mar, 22, 2021 and ending at Apr, 01, 2021
 * const result = clamp(new Date(2021, 2, 21), {
 *   start: new Date(2021, 2, 22),
 *   end: new Date(2021, 3, 1),
 * })
 * //=> Mon Mar 22 2021 00:00:00
 *
 * @param {Date | Number} date - the date to be bounded
 * @param {Interval} interval - the interval to bound to
 * @returns {Date} the date bounded by the start and the end of the interval
 * @throws {TypeError} 2 arguments required
 */
function clamp(date, _ref) {
  var start = _ref.start,
      end = _ref.end;
  (0, _index6.default)(2, arguments);
  return (0, _index4.default)([(0, _index2.default)([date, start]), end]);
}
},{"../max/index.js":163,"../min/index.js":168,"../_lib/requiredArgs/index.js":490}],22:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = closestIndexTo;

var _index = require("../toDate/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name closestIndexTo
 * @category Common Helpers
 * @summary Return an index of the closest date from the array comparing to the given date.
 *
 * @description
 * Return an index of the closest date from the array comparing to the given date.
 *
 * @param {Date | Number} dateToCompare - the date to compare with
 * @param {Array<Date> | Array<number>} datesArray - the array to search
 * @returns {Number | undefined} an index of the date closest to the given date or undefined if no valid value is given
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Which date is closer to 6 September 2015?
 * const dateToCompare = new Date(2015, 8, 6)
 * const datesArray = [
 *   new Date(2015, 0, 1),
 *   new Date(2016, 0, 1),
 *   new Date(2017, 0, 1)
 * ]
 * const result = closestIndexTo(dateToCompare, datesArray)
 * //=> 1
 */
function closestIndexTo(dirtyDateToCompare, dirtyDatesArray) {
  (0, _index4.default)(2, arguments);
  var dateToCompare = (0, _index2.default)(dirtyDateToCompare);
  if (isNaN(Number(dateToCompare))) return NaN;
  var timeToCompare = dateToCompare.getTime();
  var datesArray;
  // `dirtyDatesArray` is undefined or null
  if (dirtyDatesArray == null) {
    datesArray = [];

    // `dirtyDatesArray` is Array, Set or Map, or object with custom `forEach` method
  } else if (typeof dirtyDatesArray.forEach === 'function') {
    datesArray = dirtyDatesArray;

    // If `dirtyDatesArray` is Array-like Object, convert to Array. Otherwise, make it empty Array
  } else {
    datesArray = Array.prototype.slice.call(dirtyDatesArray);
  }
  var result;
  var minDistance;
  datesArray.forEach(function (dirtyDate, index) {
    var currentDate = (0, _index2.default)(dirtyDate);
    if (isNaN(Number(currentDate))) {
      result = NaN;
      minDistance = NaN;
      return;
    }
    var distance = Math.abs(timeToCompare - currentDate.getTime());
    if (result == null || distance < Number(minDistance)) {
      result = index;
      minDistance = distance;
    }
  });
  return result;
}
},{"../toDate/index.js":243,"../_lib/requiredArgs/index.js":490}],23:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = closestTo;

var _index = require("../toDate/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name closestTo
 * @category Common Helpers
 * @summary Return a date from the array closest to the given date.
 *
 * @description
 * Return a date from the array closest to the given date.
 *
 * @param {Date | Number} dateToCompare - the date to compare with
 * @param {Array<Date> | Array<number>} datesArray - the array to search
 * @returns {Date | undefined} the date from the array closest to the given date or undefined if no valid value is given
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Which date is closer to 6 September 2015: 1 January 2000 or 1 January 2030?
 * const dateToCompare = new Date(2015, 8, 6)
 * const result = closestTo(dateToCompare, [
 *   new Date(2000, 0, 1),
 *   new Date(2030, 0, 1)
 * ])
 * //=> Tue Jan 01 2030 00:00:00
 */
function closestTo(dirtyDateToCompare, dirtyDatesArray) {
  (0, _index4.default)(2, arguments);
  var dateToCompare = (0, _index2.default)(dirtyDateToCompare);
  if (isNaN(Number(dateToCompare))) return new Date(NaN);
  var timeToCompare = dateToCompare.getTime();
  var datesArray;
  // `dirtyDatesArray` is undefined or null
  if (dirtyDatesArray == null) {
    datesArray = [];

    // `dirtyDatesArray` is Array, Set or Map, or object with custom `forEach` method
  } else if (typeof dirtyDatesArray.forEach === 'function') {
    datesArray = dirtyDatesArray;

    // If `dirtyDatesArray` is Array-like Object, convert to Array. Otherwise, make it empty Array
  } else {
    datesArray = Array.prototype.slice.call(dirtyDatesArray);
  }
  var result;
  var minDistance;
  datesArray.forEach(function (dirtyDate) {
    var currentDate = (0, _index2.default)(dirtyDate);
    if (isNaN(Number(currentDate))) {
      result = new Date(NaN);
      minDistance = NaN;
      return;
    }
    var distance = Math.abs(timeToCompare - currentDate.getTime());
    if (result == null || distance < Number(minDistance)) {
      result = currentDate;
      minDistance = distance;
    }
  });
  return result;
}
},{"../toDate/index.js":243,"../_lib/requiredArgs/index.js":490}],24:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = compareAsc;

var _index = require("../toDate/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name compareAsc
 * @category Common Helpers
 * @summary Compare the two dates and return -1, 0 or 1.
 *
 * @description
 * Compare the two dates and return 1 if the first date is after the second,
 * -1 if the first date is before the second or 0 if dates are equal.
 *
 * @param {Date|Number} dateLeft - the first date to compare
 * @param {Date|Number} dateRight - the second date to compare
 * @returns {Number} the result of the comparison
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Compare 11 February 1987 and 10 July 1989:
 * const result = compareAsc(new Date(1987, 1, 11), new Date(1989, 6, 10))
 * //=> -1
 *
 * @example
 * // Sort the array of dates:
 * const result = [
 *   new Date(1995, 6, 2),
 *   new Date(1987, 1, 11),
 *   new Date(1989, 6, 10)
 * ].sort(compareAsc)
 * //=> [
 * //   Wed Feb 11 1987 00:00:00,
 * //   Mon Jul 10 1989 00:00:00,
 * //   Sun Jul 02 1995 00:00:00
 * // ]
 */
function compareAsc(dirtyDateLeft, dirtyDateRight) {
  (0, _index4.default)(2, arguments);
  var dateLeft = (0, _index2.default)(dirtyDateLeft);
  var dateRight = (0, _index2.default)(dirtyDateRight);
  var diff = dateLeft.getTime() - dateRight.getTime();
  if (diff < 0) {
    return -1;
  } else if (diff > 0) {
    return 1;
    // Return 0 if diff is 0; return NaN if diff is NaN
  } else {
    return diff;
  }
}
},{"../toDate/index.js":243,"../_lib/requiredArgs/index.js":490}],25:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = compareDesc;

var _index = require("../toDate/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name compareDesc
 * @category Common Helpers
 * @summary Compare the two dates reverse chronologically and return -1, 0 or 1.
 *
 * @description
 * Compare the two dates and return -1 if the first date is after the second,
 * 1 if the first date is before the second or 0 if dates are equal.
 *
 * @param {Date|Number} dateLeft - the first date to compare
 * @param {Date|Number} dateRight - the second date to compare
 * @returns {Number} the result of the comparison
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Compare 11 February 1987 and 10 July 1989 reverse chronologically:
 * const result = compareDesc(new Date(1987, 1, 11), new Date(1989, 6, 10))
 * //=> 1
 *
 * @example
 * // Sort the array of dates in reverse chronological order:
 * const result = [
 *   new Date(1995, 6, 2),
 *   new Date(1987, 1, 11),
 *   new Date(1989, 6, 10)
 * ].sort(compareDesc)
 * //=> [
 * //   Sun Jul 02 1995 00:00:00,
 * //   Mon Jul 10 1989 00:00:00,
 * //   Wed Feb 11 1987 00:00:00
 * // ]
 */
function compareDesc(dirtyDateLeft, dirtyDateRight) {
  (0, _index4.default)(2, arguments);
  var dateLeft = (0, _index2.default)(dirtyDateLeft);
  var dateRight = (0, _index2.default)(dirtyDateRight);
  var diff = dateLeft.getTime() - dateRight.getTime();
  if (diff > 0) {
    return -1;
  } else if (diff < 0) {
    return 1;
    // Return 0 if diff is 0; return NaN if diff is NaN
  } else {
    return diff;
  }
}
},{"../toDate/index.js":243,"../_lib/requiredArgs/index.js":490}],8:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Days in 1 week.
 *
 * @name daysInWeek
 * @constant
 * @type {number}
 * @default
 */
var daysInWeek = exports.daysInWeek = 7;

/**
 * Days in 1 year
 * One years equals 365.2425 days according to the formula:
 *
 * > Leap year occures every 4 years, except for years that are divisable by 100 and not divisable by 400.
 * > 1 mean year = (365+1/4-1/100+1/400) days = 365.2425 days
 *
 * @name daysInYear
 * @constant
 * @type {number}
 * @default
 */
var daysInYear = exports.daysInYear = 365.2425;

/**
 * Maximum allowed time.
 *
 * @name maxTime
 * @constant
 * @type {number}
 * @default
 */
var maxTime = exports.maxTime = Math.pow(10, 8) * 24 * 60 * 60 * 1000;

/**
 * Milliseconds in 1 minute
 *
 * @name millisecondsInMinute
 * @constant
 * @type {number}
 * @default
 */
var millisecondsInMinute = exports.millisecondsInMinute = 60000;

/**
 * Milliseconds in 1 hour
 *
 * @name millisecondsInHour
 * @constant
 * @type {number}
 * @default
 */
var millisecondsInHour = exports.millisecondsInHour = 3600000;

/**
 * Milliseconds in 1 second
 *
 * @name millisecondsInSecond
 * @constant
 * @type {number}
 * @default
 */
var millisecondsInSecond = exports.millisecondsInSecond = 1000;

/**
 * Minimum allowed time.
 *
 * @name minTime
 * @constant
 * @type {number}
 * @default
 */
var minTime = exports.minTime = -maxTime;

/**
 * Minutes in 1 hour
 *
 * @name minutesInHour
 * @constant
 * @type {number}
 * @default
 */
var minutesInHour = exports.minutesInHour = 60;

/**
 * Months in 1 quarter
 *
 * @name monthsInQuarter
 * @constant
 * @type {number}
 * @default
 */
var monthsInQuarter = exports.monthsInQuarter = 3;

/**
 * Months in 1 year
 *
 * @name monthsInYear
 * @constant
 * @type {number}
 * @default
 */
var monthsInYear = exports.monthsInYear = 12;

/**
 * Quarters in 1 year
 *
 * @name quartersInYear
 * @constant
 * @type {number}
 * @default
 */
var quartersInYear = exports.quartersInYear = 4;

/**
 * Seconds in 1 hour
 *
 * @name secondsInHour
 * @constant
 * @type {number}
 * @default
 */
var secondsInHour = exports.secondsInHour = 3600;

/**
 * Seconds in 1 minute
 *
 * @name secondsInMinute
 * @constant
 * @type {number}
 * @default
 */
var secondsInMinute = exports.secondsInMinute = 60;

/**
 * Seconds in 1 day
 *
 * @name secondsInDay
 * @constant
 * @type {number}
 * @default
 */
var secondsInDay = exports.secondsInDay = secondsInHour * 24;

/**
 * Seconds in 1 week
 *
 * @name secondsInWeek
 * @constant
 * @type {number}
 * @default
 */
var secondsInWeek = exports.secondsInWeek = secondsInDay * 7;

/**
 * Seconds in 1 year
 *
 * @name secondsInYear
 * @constant
 * @type {number}
 * @default
 */
var secondsInYear = exports.secondsInYear = secondsInDay * daysInYear;

/**
 * Seconds in 1 month
 *
 * @name secondsInMonth
 * @constant
 * @type {number}
 * @default
 */
var secondsInMonth = exports.secondsInMonth = secondsInYear / 12;

/**
 * Seconds in 1 quarter
 *
 * @name secondsInQuarter
 * @constant
 * @type {number}
 * @default
 */
var secondsInQuarter = exports.secondsInQuarter = secondsInMonth * 3;
},{}],28:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = daysToWeeks;

var _index = require("../_lib/requiredArgs/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../constants/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name daysToWeeks
 * @category Conversion Helpers
 * @summary Convert days to weeks.
 *
 * @description
 * Convert a number of days to a full number of weeks.
 *
 * @param {number} days - number of days to be converted
 *
 * @returns {number} the number of days converted in weeks
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Convert 14 days to weeks:
 * const result = daysToWeeks(14)
 * //=> 2
 *
 * @example
 * // It uses floor rounding:
 * const result = daysToWeeks(13)
 * //=> 1
 */
function daysToWeeks(days) {
  (0, _index2.default)(1, arguments);
  var weeks = days / _index3.daysInWeek;
  return Math.floor(weeks);
}
},{"../_lib/requiredArgs/index.js":490,"../constants/index.js":8}],126:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isSameDay;

var _index = require("../startOfDay/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name isSameDay
 * @category Day Helpers
 * @summary Are the given dates in the same day (and year and month)?
 *
 * @description
 * Are the given dates in the same day (and year and month)?
 *
 * @param {Date|Number} dateLeft - the first date to check
 * @param {Date|Number} dateRight - the second date to check
 * @returns {Boolean} the dates are in the same day (and year and month)
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Are 4 September 06:00:00 and 4 September 18:00:00 in the same day?
 * const result = isSameDay(new Date(2014, 8, 4, 6, 0), new Date(2014, 8, 4, 18, 0))
 * //=> true
 *
 * @example
 * // Are 4 September and 4 October in the same day?
 * const result = isSameDay(new Date(2014, 8, 4), new Date(2014, 9, 4))
 * //=> false
 *
 * @example
 * // Are 4 September, 2014 and 4 September, 2015 in the same day?
 * const result = isSameDay(new Date(2014, 8, 4), new Date(2015, 8, 4))
 * //=> false
 */
function isSameDay(dirtyDateLeft, dirtyDateRight) {
  (0, _index4.default)(2, arguments);
  var dateLeftStartOfDay = (0, _index2.default)(dirtyDateLeft);
  var dateRightStartOfDay = (0, _index2.default)(dirtyDateRight);
  return dateLeftStartOfDay.getTime() === dateRightStartOfDay.getTime();
}
},{"../startOfDay/index.js":213,"../_lib/requiredArgs/index.js":490}],112:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isDate;

var _typeof2 = require("@babel/runtime/helpers/esm/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _index = require("../_lib/requiredArgs/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name isDate
 * @category Common Helpers
 * @summary Is the given value a date?
 *
 * @description
 * Returns true if the given value is an instance of Date. The function works for dates transferred across iframes.
 *
 * @param {*} value - the value to check
 * @returns {boolean} true if the given value is a date
 * @throws {TypeError} 1 arguments required
 *
 * @example
 * // For a valid date:
 * const result = isDate(new Date())
 * //=> true
 *
 * @example
 * // For an invalid date:
 * const result = isDate(new Date(NaN))
 * //=> true
 *
 * @example
 * // For some value:
 * const result = isDate('2014-02-31')
 * //=> false
 *
 * @example
 * // For an object:
 * const result = isDate({})
 * //=> false
 */
function isDate(value) {
  (0, _index2.default)(1, arguments);
  return value instanceof Date || (0, _typeof3.default)(value) === 'object' && Object.prototype.toString.call(value) === '[object Date]';
}
},{"@babel/runtime/helpers/esm/typeof":503,"../_lib/requiredArgs/index.js":490}],151:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isValid;

var _index = require("../isDate/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../toDate/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../_lib/requiredArgs/index.js");

var _index6 = _interopRequireDefault(_index5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name isValid
 * @category Common Helpers
 * @summary Is the given date valid?
 *
 * @description
 * Returns false if argument is Invalid Date and true otherwise.
 * Argument is converted to Date using `toDate`. See [toDate]{@link https://date-fns.org/docs/toDate}
 * Invalid Date is a Date, whose time value is NaN.
 *
 * Time value of Date: http://es5.github.io/#x15.9.1.1
 *
 * @param {*} date - the date to check
 * @returns {Boolean} the date is valid
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // For the valid date:
 * const result = isValid(new Date(2014, 1, 31))
 * //=> true
 *
 * @example
 * // For the value, convertable into a date:
 * const result = isValid(1393804800000)
 * //=> true
 *
 * @example
 * // For the invalid date:
 * const result = isValid(new Date(''))
 * //=> false
 */
function isValid(dirtyDate) {
  (0, _index6.default)(1, arguments);
  if (!(0, _index2.default)(dirtyDate) && typeof dirtyDate !== 'number') {
    return false;
  }
  var date = (0, _index4.default)(dirtyDate);
  return !isNaN(Number(date));
}
},{"../isDate/index.js":112,"../toDate/index.js":243,"../_lib/requiredArgs/index.js":490}],26:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = differenceInBusinessDays;

var _index = require("../addDays/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../differenceInCalendarDays/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../isSameDay/index.js");

var _index6 = _interopRequireDefault(_index5);

var _index7 = require("../isValid/index.js");

var _index8 = _interopRequireDefault(_index7);

var _index9 = require("../isWeekend/index.js");

var _index10 = _interopRequireDefault(_index9);

var _index11 = require("../toDate/index.js");

var _index12 = _interopRequireDefault(_index11);

var _index13 = require("../_lib/requiredArgs/index.js");

var _index14 = _interopRequireDefault(_index13);

var _index15 = require("../_lib/toInteger/index.js");

var _index16 = _interopRequireDefault(_index15);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name differenceInBusinessDays
 * @category Day Helpers
 * @summary Get the number of business days between the given dates.
 *
 * @description
 * Get the number of business day periods between the given dates.
 * Business days being days that arent in the weekend.
 * Like `differenceInCalendarDays`, the function removes the times from
 * the dates before calculating the difference.
 *
 * @param {Date|Number} dateLeft - the later date
 * @param {Date|Number} dateRight - the earlier date
 * @returns {Number} the number of business days
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // How many business days are between
 * // 10 January 2014 and 20 July 2014?
 * const result = differenceInBusinessDays(
 *   new Date(2014, 6, 20),
 *   new Date(2014, 0, 10)
 * )
 * //=> 136
 *
 * // How many business days are between
 * // 30 November 2021 and 1 November 2021?
 * const result = differenceInBusinessDays(
 *   new Date(2021, 10, 30),
 *   new Date(2021, 10, 1)
 * )
 * //=> 21
 *
 * // How many business days are between
 * // 1 November 2021 and 1 December 2021?
 * const result = differenceInBusinessDays(
 *   new Date(2021, 10, 1),
 *   new Date(2021, 11, 1)
 * )
 * //=> -22
 *
 * // How many business days are between
 * // 1 November 2021 and 1 November 2021 ?
 * const result = differenceInBusinessDays(
 *   new Date(2021, 10, 1),
 *   new Date(2021, 10, 1)
 * )
 * //=> 0
 */
function differenceInBusinessDays(dirtyDateLeft, dirtyDateRight) {
  (0, _index14.default)(2, arguments);
  var dateLeft = (0, _index12.default)(dirtyDateLeft);
  var dateRight = (0, _index12.default)(dirtyDateRight);
  if (!(0, _index8.default)(dateLeft) || !(0, _index8.default)(dateRight)) return NaN;
  var calendarDifference = (0, _index4.default)(dateLeft, dateRight);
  var sign = calendarDifference < 0 ? -1 : 1;
  var weeks = (0, _index16.default)(calendarDifference / 7);
  var result = weeks * 5;
  dateRight = (0, _index2.default)(dateRight, weeks * 7);

  // the loop below will run at most 6 times to account for the remaining days that don't makeup a full week
  while (!(0, _index6.default)(dateLeft, dateRight)) {
    // sign is used to account for both negative and positive differences
    result += (0, _index10.default)(dateRight) ? 0 : sign;
    dateRight = (0, _index2.default)(dateRight, sign);
  }
  return result === 0 ? 0 : result;
}
},{"../addDays/index.js":11,"../differenceInCalendarDays/index.js":27,"../isSameDay/index.js":126,"../isValid/index.js":151,"../isWeekend/index.js":154,"../toDate/index.js":243,"../_lib/requiredArgs/index.js":490,"../_lib/toInteger/index.js":491}],29:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = differenceInCalendarISOWeekYears;

var _index = require("../getISOWeekYear/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name differenceInCalendarISOWeekYears
 * @category ISO Week-Numbering Year Helpers
 * @summary Get the number of calendar ISO week-numbering years between the given dates.
 *
 * @description
 * Get the number of calendar ISO week-numbering years between the given dates.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param {Date|Number} dateLeft - the later date
 * @param {Date|Number} dateRight - the earlier date
 * @returns {Number} the number of calendar ISO week-numbering years
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // How many calendar ISO week-numbering years are 1 January 2010 and 1 January 2012?
 * const result = differenceInCalendarISOWeekYears(
 *   new Date(2012, 0, 1),
 *   new Date(2010, 0, 1)
 * )
 * //=> 2
 */
function differenceInCalendarISOWeekYears(dirtyDateLeft, dirtyDateRight) {
  (0, _index4.default)(2, arguments);
  return (0, _index2.default)(dirtyDateLeft) - (0, _index2.default)(dirtyDateRight);
}
},{"../getISOWeekYear/index.js":90,"../_lib/requiredArgs/index.js":490}],30:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = differenceInCalendarISOWeeks;

var _index = require("../_lib/getTimezoneOffsetInMilliseconds/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../startOfISOWeek/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../_lib/requiredArgs/index.js");

var _index6 = _interopRequireDefault(_index5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MILLISECONDS_IN_WEEK = 604800000;

/**
 * @name differenceInCalendarISOWeeks
 * @category ISO Week Helpers
 * @summary Get the number of calendar ISO weeks between the given dates.
 *
 * @description
 * Get the number of calendar ISO weeks between the given dates.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param {Date|Number} dateLeft - the later date
 * @param {Date|Number} dateRight - the earlier date
 * @returns {Number} the number of calendar ISO weeks
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // How many calendar ISO weeks are between 6 July 2014 and 21 July 2014?
 * const result = differenceInCalendarISOWeeks(
 *   new Date(2014, 6, 21),
 *   new Date(2014, 6, 6)
 * )
 * //=> 3
 */
function differenceInCalendarISOWeeks(dirtyDateLeft, dirtyDateRight) {
  (0, _index6.default)(2, arguments);
  var startOfISOWeekLeft = (0, _index4.default)(dirtyDateLeft);
  var startOfISOWeekRight = (0, _index4.default)(dirtyDateRight);
  var timestampLeft = startOfISOWeekLeft.getTime() - (0, _index2.default)(startOfISOWeekLeft);
  var timestampRight = startOfISOWeekRight.getTime() - (0, _index2.default)(startOfISOWeekRight);

  // Round the number of days to the nearest integer
  // because the number of milliseconds in a week is not constant
  // (e.g. it's different in the week of the daylight saving time clock shift)
  return Math.round((timestampLeft - timestampRight) / MILLISECONDS_IN_WEEK);
}
},{"../_lib/getTimezoneOffsetInMilliseconds/index.js":492,"../startOfISOWeek/index.js":218,"../_lib/requiredArgs/index.js":490}],31:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = differenceInCalendarMonths;

var _index = require("../toDate/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name differenceInCalendarMonths
 * @category Month Helpers
 * @summary Get the number of calendar months between the given dates.
 *
 * @description
 * Get the number of calendar months between the given dates.
 *
 * @param {Date|Number} dateLeft - the later date
 * @param {Date|Number} dateRight - the earlier date
 * @returns {Number} the number of calendar months
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // How many calendar months are between 31 January 2014 and 1 September 2014?
 * const result = differenceInCalendarMonths(
 *   new Date(2014, 8, 1),
 *   new Date(2014, 0, 31)
 * )
 * //=> 8
 */
function differenceInCalendarMonths(dirtyDateLeft, dirtyDateRight) {
  (0, _index4.default)(2, arguments);
  var dateLeft = (0, _index2.default)(dirtyDateLeft);
  var dateRight = (0, _index2.default)(dirtyDateRight);
  var yearDiff = dateLeft.getFullYear() - dateRight.getFullYear();
  var monthDiff = dateLeft.getMonth() - dateRight.getMonth();
  return yearDiff * 12 + monthDiff;
}
},{"../toDate/index.js":243,"../_lib/requiredArgs/index.js":490}],102:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getQuarter;

var _index = require("../toDate/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name getQuarter
 * @category Quarter Helpers
 * @summary Get the year quarter of the given date.
 *
 * @description
 * Get the year quarter of the given date.
 *
 * @param {Date|Number} date - the given date
 * @returns {Number} the quarter
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Which quarter is 2 July 2014?
 * const result = getQuarter(new Date(2014, 6, 2))
 * //=> 3
 */
function getQuarter(dirtyDate) {
  (0, _index4.default)(1, arguments);
  var date = (0, _index2.default)(dirtyDate);
  var quarter = Math.floor(date.getMonth() / 3) + 1;
  return quarter;
}
},{"../toDate/index.js":243,"../_lib/requiredArgs/index.js":490}],32:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = differenceInCalendarQuarters;

var _index = require("../getQuarter/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../toDate/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../_lib/requiredArgs/index.js");

var _index6 = _interopRequireDefault(_index5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name differenceInCalendarQuarters
 * @category Quarter Helpers
 * @summary Get the number of calendar quarters between the given dates.
 *
 * @description
 * Get the number of calendar quarters between the given dates.
 *
 * @param {Date|Number} dateLeft - the later date
 * @param {Date|Number} dateRight - the earlier date
 * @returns {Number} the number of calendar quarters
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // How many calendar quarters are between 31 December 2013 and 2 July 2014?
 * const result = differenceInCalendarQuarters(
 *   new Date(2014, 6, 2),
 *   new Date(2013, 11, 31)
 * )
 * //=> 3
 */
function differenceInCalendarQuarters(dirtyDateLeft, dirtyDateRight) {
  (0, _index6.default)(2, arguments);
  var dateLeft = (0, _index4.default)(dirtyDateLeft);
  var dateRight = (0, _index4.default)(dirtyDateRight);
  var yearDiff = dateLeft.getFullYear() - dateRight.getFullYear();
  var quarterDiff = (0, _index2.default)(dateLeft) - (0, _index2.default)(dateRight);
  return yearDiff * 4 + quarterDiff;
}
},{"../getQuarter/index.js":102,"../toDate/index.js":243,"../_lib/requiredArgs/index.js":490}],33:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = differenceInCalendarWeeks;

var _index = require("../startOfWeek/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/getTimezoneOffsetInMilliseconds/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../_lib/requiredArgs/index.js");

var _index6 = _interopRequireDefault(_index5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MILLISECONDS_IN_WEEK = 604800000;

/**
 * @name differenceInCalendarWeeks
 * @category Week Helpers
 * @summary Get the number of calendar weeks between the given dates.
 *
 * @description
 * Get the number of calendar weeks between the given dates.
 *
 * @param {Date|Number} dateLeft - the later date
 * @param {Date|Number} dateRight - the earlier date
 * @param {Object} [options] - an object with options.
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @returns {Number} the number of calendar weeks
 * @throws {TypeError} 2 arguments required
 * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
 *
 * @example
 * // How many calendar weeks are between 5 July 2014 and 20 July 2014?
 * const result = differenceInCalendarWeeks(
 *   new Date(2014, 6, 20),
 *   new Date(2014, 6, 5)
 * )
 * //=> 3
 *
 * @example
 * // If the week starts on Monday,
 * // how many calendar weeks are between 5 July 2014 and 20 July 2014?
 * const result = differenceInCalendarWeeks(
 *   new Date(2014, 6, 20),
 *   new Date(2014, 6, 5),
 *   { weekStartsOn: 1 }
 * )
 * //=> 2
 */
function differenceInCalendarWeeks(dirtyDateLeft, dirtyDateRight, options) {
  (0, _index6.default)(2, arguments);
  var startOfWeekLeft = (0, _index2.default)(dirtyDateLeft, options);
  var startOfWeekRight = (0, _index2.default)(dirtyDateRight, options);
  var timestampLeft = startOfWeekLeft.getTime() - (0, _index4.default)(startOfWeekLeft);
  var timestampRight = startOfWeekRight.getTime() - (0, _index4.default)(startOfWeekRight);

  // Round the number of days to the nearest integer
  // because the number of milliseconds in a week is not constant
  // (e.g. it's different in the week of the daylight saving time clock shift)
  return Math.round((timestampLeft - timestampRight) / MILLISECONDS_IN_WEEK);
}
},{"../startOfWeek/index.js":226,"../_lib/getTimezoneOffsetInMilliseconds/index.js":492,"../_lib/requiredArgs/index.js":490}],37:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = differenceInCalendarYears;

var _index = require("../toDate/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name differenceInCalendarYears
 * @category Year Helpers
 * @summary Get the number of calendar years between the given dates.
 *
 * @description
 * Get the number of calendar years between the given dates.
 *
 * @param {Date|Number} dateLeft - the later date
 * @param {Date|Number} dateRight - the earlier date
 * @returns {Number} the number of calendar years
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // How many calendar years are between 31 December 2013 and 11 February 2015?
 * const result = differenceInCalendarYears(
 *   new Date(2015, 1, 11),
 *   new Date(2013, 11, 31)
 * )
 * //=> 2
 */
function differenceInCalendarYears(dirtyDateLeft, dirtyDateRight) {
  (0, _index4.default)(2, arguments);
  var dateLeft = (0, _index2.default)(dirtyDateLeft);
  var dateRight = (0, _index2.default)(dirtyDateRight);
  return dateLeft.getFullYear() - dateRight.getFullYear();
}
},{"../toDate/index.js":243,"../_lib/requiredArgs/index.js":490}],34:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = differenceInDays;

var _index = require("../toDate/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../differenceInCalendarDays/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../_lib/requiredArgs/index.js");

var _index6 = _interopRequireDefault(_index5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Like `compareAsc` but uses local time not UTC, which is needed
// for accurate equality comparisons of UTC timestamps that end up
// having the same representation in local time, e.g. one hour before
// DST ends vs. the instant that DST ends.
function compareLocalAsc(dateLeft, dateRight) {
  var diff = dateLeft.getFullYear() - dateRight.getFullYear() || dateLeft.getMonth() - dateRight.getMonth() || dateLeft.getDate() - dateRight.getDate() || dateLeft.getHours() - dateRight.getHours() || dateLeft.getMinutes() - dateRight.getMinutes() || dateLeft.getSeconds() - dateRight.getSeconds() || dateLeft.getMilliseconds() - dateRight.getMilliseconds();
  if (diff < 0) {
    return -1;
  } else if (diff > 0) {
    return 1;
    // Return 0 if diff is 0; return NaN if diff is NaN
  } else {
    return diff;
  }
}

/**
 * @name differenceInDays
 * @category Day Helpers
 * @summary Get the number of full days between the given dates.
 *
 * @description
 * Get the number of full day periods between two dates. Fractional days are
 * truncated towards zero.
 *
 * One "full day" is the distance between a local time in one day to the same
 * local time on the next or previous day. A full day can sometimes be less than
 * or more than 24 hours if a daylight savings change happens between two dates.
 *
 * To ignore DST and only measure exact 24-hour periods, use this instead:
 * `Math.floor(differenceInHours(dateLeft, dateRight)/24)|0`.
 *
 *
 * @param {Date|Number} dateLeft - the later date
 * @param {Date|Number} dateRight - the earlier date
 * @returns {Number} the number of full days according to the local timezone
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // How many full days are between
 * // 2 July 2011 23:00:00 and 2 July 2012 00:00:00?
 * const result = differenceInDays(
 *   new Date(2012, 6, 2, 0, 0),
 *   new Date(2011, 6, 2, 23, 0)
 * )
 * //=> 365
 * // How many full days are between
 * // 2 July 2011 23:59:00 and 3 July 2011 00:01:00?
 * const result = differenceInDays(
 *   new Date(2011, 6, 3, 0, 1),
 *   new Date(2011, 6, 2, 23, 59)
 * )
 * //=> 0
 * // How many full days are between
 * // 1 March 2020 0:00 and 1 June 2020 0:00 ?
 * // Note: because local time is used, the
 * // result will always be 92 days, even in
 * // time zones where DST starts and the
 * // period has only 92*24-1 hours.
 * const result = differenceInDays(
 *   new Date(2020, 5, 1),
 *   new Date(2020, 2, 1)
 * )
//=> 92
 */
function differenceInDays(dirtyDateLeft, dirtyDateRight) {
  (0, _index6.default)(2, arguments);
  var dateLeft = (0, _index2.default)(dirtyDateLeft);
  var dateRight = (0, _index2.default)(dirtyDateRight);
  var sign = compareLocalAsc(dateLeft, dateRight);
  var difference = Math.abs((0, _index4.default)(dateLeft, dateRight));
  dateLeft.setDate(dateLeft.getDate() - sign * difference);

  // Math.abs(diff in full days - diff in calendar days) === 1 if last calendar day is not full
  // If so, result must be decreased by 1 in absolute value
  var isLastDayNotFull = Number(compareLocalAsc(dateLeft, dateRight) === -sign);
  var result = sign * (difference - isLastDayNotFull);
  // Prevent negative zero
  return result === 0 ? 0 : result;
}
},{"../toDate/index.js":243,"../differenceInCalendarDays/index.js":27,"../_lib/requiredArgs/index.js":490}],38:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = differenceInMilliseconds;

var _index = require("../toDate/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name differenceInMilliseconds
 * @category Millisecond Helpers
 * @summary Get the number of milliseconds between the given dates.
 *
 * @description
 * Get the number of milliseconds between the given dates.
 *
 * @param {Date|Number} dateLeft - the later date
 * @param {Date|Number} dateRight - the earlier date
 * @returns {Number} the number of milliseconds
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // How many milliseconds are between
 * // 2 July 2014 12:30:20.600 and 2 July 2014 12:30:21.700?
 * const result = differenceInMilliseconds(
 *   new Date(2014, 6, 2, 12, 30, 21, 700),
 *   new Date(2014, 6, 2, 12, 30, 20, 600)
 * )
 * //=> 1100
 */
function differenceInMilliseconds(dateLeft, dateRight) {
  (0, _index4.default)(2, arguments);
  return (0, _index2.default)(dateLeft).getTime() - (0, _index2.default)(dateRight).getTime();
}
},{"../toDate/index.js":243,"../_lib/requiredArgs/index.js":490}],493:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRoundingMethod = getRoundingMethod;
var roundingMap = {
  ceil: Math.ceil,
  round: Math.round,
  floor: Math.floor,
  trunc: function trunc(value) {
    return value < 0 ? Math.ceil(value) : Math.floor(value);
  } // Math.trunc is not supported by IE
};

var defaultRoundingMethod = 'trunc';
function getRoundingMethod(method) {
  return method ? roundingMap[method] : roundingMap[defaultRoundingMethod];
}
},{}],35:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = differenceInHours;

var _index = require("../constants/index.js");

var _index2 = require("../differenceInMilliseconds/index.js");

var _index3 = _interopRequireDefault(_index2);

var _index4 = require("../_lib/requiredArgs/index.js");

var _index5 = _interopRequireDefault(_index4);

var _index6 = require("../_lib/roundingMethods/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name differenceInHours
 * @category Hour Helpers
 * @summary Get the number of hours between the given dates.
 *
 * @description
 * Get the number of hours between the given dates.
 *
 * @param {Date|Number} dateLeft - the later date
 * @param {Date|Number} dateRight - the earlier date
 * @param {Object} [options] - an object with options.
 * @param {String} [options.roundingMethod='trunc'] - a rounding method (`ceil`, `floor`, `round` or `trunc`)
 * @returns {Number} the number of hours
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // How many hours are between 2 July 2014 06:50:00 and 2 July 2014 19:00:00?
 * const result = differenceInHours(
 *   new Date(2014, 6, 2, 19, 0),
 *   new Date(2014, 6, 2, 6, 50)
 * )
 * //=> 12
 */
function differenceInHours(dateLeft, dateRight, options) {
  (0, _index5.default)(2, arguments);
  var diff = (0, _index3.default)(dateLeft, dateRight) / _index.millisecondsInHour;
  return (0, _index6.getRoundingMethod)(options === null || options === void 0 ? void 0 : options.roundingMethod)(diff);
}
},{"../constants/index.js":8,"../differenceInMilliseconds/index.js":38,"../_lib/requiredArgs/index.js":490,"../_lib/roundingMethods/index.js":493}],236:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = subISOWeekYears;

var _index = require("../addISOWeekYears/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../_lib/toInteger/index.js");

var _index6 = _interopRequireDefault(_index5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name subISOWeekYears
 * @category ISO Week-Numbering Year Helpers
 * @summary Subtract the specified number of ISO week-numbering years from the given date.
 *
 * @description
 * Subtract the specified number of ISO week-numbering years from the given date.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of ISO week-numbering years to be subtracted. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 * @returns {Date} the new date with the ISO week-numbering years subtracted
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Subtract 5 ISO week-numbering years from 1 September 2014:
 * const result = subISOWeekYears(new Date(2014, 8, 1), 5)
 * //=> Mon Aug 31 2009 00:00:00
 */
function subISOWeekYears(dirtyDate, dirtyAmount) {
  (0, _index4.default)(2, arguments);
  var amount = (0, _index6.default)(dirtyAmount);
  return (0, _index2.default)(dirtyDate, -amount);
}
},{"../addISOWeekYears/index.js":12,"../_lib/requiredArgs/index.js":490,"../_lib/toInteger/index.js":491}],36:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = differenceInISOWeekYears;

var _index = require("../toDate/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../differenceInCalendarISOWeekYears/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../compareAsc/index.js");

var _index6 = _interopRequireDefault(_index5);

var _index7 = require("../subISOWeekYears/index.js");

var _index8 = _interopRequireDefault(_index7);

var _index9 = require("../_lib/requiredArgs/index.js");

var _index10 = _interopRequireDefault(_index9);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name differenceInISOWeekYears
 * @category ISO Week-Numbering Year Helpers
 * @summary Get the number of full ISO week-numbering years between the given dates.
 *
 * @description
 * Get the number of full ISO week-numbering years between the given dates.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param {Date|Number} dateLeft - the later date
 * @param {Date|Number} dateRight - the earlier date
 * @returns {Number} the number of full ISO week-numbering years
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // How many full ISO week-numbering years are between 1 January 2010 and 1 January 2012?
 * const result = differenceInISOWeekYears(
 *   new Date(2012, 0, 1),
 *   new Date(2010, 0, 1)
 * )
 * //=> 1
 */
function differenceInISOWeekYears(dirtyDateLeft, dirtyDateRight) {
  (0, _index10.default)(2, arguments);
  var dateLeft = (0, _index2.default)(dirtyDateLeft);
  var dateRight = (0, _index2.default)(dirtyDateRight);
  var sign = (0, _index6.default)(dateLeft, dateRight);
  var difference = Math.abs((0, _index4.default)(dateLeft, dateRight));
  dateLeft = (0, _index8.default)(dateLeft, sign * difference);

  // Math.abs(diff in full ISO years - diff in calendar ISO years) === 1
  // if last calendar ISO year is not full
  // If so, result must be decreased by 1 in absolute value
  var isLastISOWeekYearNotFull = Number((0, _index6.default)(dateLeft, dateRight) === -sign);
  var result = sign * (difference - isLastISOWeekYearNotFull);
  // Prevent negative zero
  return result === 0 ? 0 : result;
}
},{"../toDate/index.js":243,"../differenceInCalendarISOWeekYears/index.js":29,"../compareAsc/index.js":24,"../subISOWeekYears/index.js":236,"../_lib/requiredArgs/index.js":490}],39:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = differenceInMinutes;

var _index = require("../constants/index.js");

var _index2 = require("../differenceInMilliseconds/index.js");

var _index3 = _interopRequireDefault(_index2);

var _index4 = require("../_lib/requiredArgs/index.js");

var _index5 = _interopRequireDefault(_index4);

var _index6 = require("../_lib/roundingMethods/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name differenceInMinutes
 * @category Minute Helpers
 * @summary Get the number of minutes between the given dates.
 *
 * @description
 * Get the signed number of full (rounded towards 0) minutes between the given dates.
 *
 * @param {Date|Number} dateLeft - the later date
 * @param {Date|Number} dateRight - the earlier date
 * @param {Object} [options] - an object with options.
 * @param {String} [options.roundingMethod='trunc'] - a rounding method (`ceil`, `floor`, `round` or `trunc`)
 * @returns {Number} the number of minutes
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // How many minutes are between 2 July 2014 12:07:59 and 2 July 2014 12:20:00?
 * const result = differenceInMinutes(
 *   new Date(2014, 6, 2, 12, 20, 0),
 *   new Date(2014, 6, 2, 12, 7, 59)
 * )
 * //=> 12
 *
 * @example
 * // How many minutes are between 10:01:59 and 10:00:00
 * const result = differenceInMinutes(
 *   new Date(2000, 0, 1, 10, 0, 0),
 *   new Date(2000, 0, 1, 10, 1, 59)
 * )
 * //=> -1
 */
function differenceInMinutes(dateLeft, dateRight, options) {
  (0, _index5.default)(2, arguments);
  var diff = (0, _index3.default)(dateLeft, dateRight) / _index.millisecondsInMinute;
  return (0, _index6.getRoundingMethod)(options === null || options === void 0 ? void 0 : options.roundingMethod)(diff);
}
},{"../constants/index.js":8,"../differenceInMilliseconds/index.js":38,"../_lib/requiredArgs/index.js":490,"../_lib/roundingMethods/index.js":493}],55:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = endOfDay;

var _index = require("../toDate/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name endOfDay
 * @category Day Helpers
 * @summary Return the end of a day for the given date.
 *
 * @description
 * Return the end of a day for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|Number} date - the original date
 * @returns {Date} the end of a day
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // The end of a day for 2 September 2014 11:55:00:
 * const result = endOfDay(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 02 2014 23:59:59.999
 */
function endOfDay(dirtyDate) {
  (0, _index4.default)(1, arguments);
  var date = (0, _index2.default)(dirtyDate);
  date.setHours(23, 59, 59, 999);
  return date;
}
},{"../toDate/index.js":243,"../_lib/requiredArgs/index.js":490}],60:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = endOfMonth;

var _index = require("../toDate/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name endOfMonth
 * @category Month Helpers
 * @summary Return the end of a month for the given date.
 *
 * @description
 * Return the end of a month for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|Number} date - the original date
 * @returns {Date} the end of a month
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // The end of a month for 2 September 2014 11:55:00:
 * const result = endOfMonth(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 30 2014 23:59:59.999
 */
function endOfMonth(dirtyDate) {
  (0, _index4.default)(1, arguments);
  var date = (0, _index2.default)(dirtyDate);
  var month = date.getMonth();
  date.setFullYear(date.getFullYear(), month + 1, 0);
  date.setHours(23, 59, 59, 999);
  return date;
}
},{"../toDate/index.js":243,"../_lib/requiredArgs/index.js":490}],122:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isLastDayOfMonth;

var _index = require("../toDate/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../endOfDay/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../endOfMonth/index.js");

var _index6 = _interopRequireDefault(_index5);

var _index7 = require("../_lib/requiredArgs/index.js");

var _index8 = _interopRequireDefault(_index7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name isLastDayOfMonth
 * @category Month Helpers
 * @summary Is the given date the last day of a month?
 *
 * @description
 * Is the given date the last day of a month?
 *
 * @param {Date|Number} date - the date to check
 * @returns {Boolean} the date is the last day of a month
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Is 28 February 2014 the last day of a month?
 * const result = isLastDayOfMonth(new Date(2014, 1, 28))
 * //=> true
 */
function isLastDayOfMonth(dirtyDate) {
  (0, _index8.default)(1, arguments);
  var date = (0, _index2.default)(dirtyDate);
  return (0, _index4.default)(date).getTime() === (0, _index6.default)(date).getTime();
}
},{"../toDate/index.js":243,"../endOfDay/index.js":55,"../endOfMonth/index.js":60,"../_lib/requiredArgs/index.js":490}],40:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = differenceInMonths;

var _index = require("../toDate/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../differenceInCalendarMonths/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../compareAsc/index.js");

var _index6 = _interopRequireDefault(_index5);

var _index7 = require("../_lib/requiredArgs/index.js");

var _index8 = _interopRequireDefault(_index7);

var _index9 = require("../isLastDayOfMonth/index.js");

var _index10 = _interopRequireDefault(_index9);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name differenceInMonths
 * @category Month Helpers
 * @summary Get the number of full months between the given dates.
 *
 * @description
 * Get the number of full months between the given dates using trunc as a default rounding method.
 *
 * @param {Date|Number} dateLeft - the later date
 * @param {Date|Number} dateRight - the earlier date
 * @returns {Number} the number of full months
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // How many full months are between 31 January 2014 and 1 September 2014?
 * const result = differenceInMonths(new Date(2014, 8, 1), new Date(2014, 0, 31))
 * //=> 7
 */
function differenceInMonths(dirtyDateLeft, dirtyDateRight) {
  (0, _index8.default)(2, arguments);
  var dateLeft = (0, _index2.default)(dirtyDateLeft);
  var dateRight = (0, _index2.default)(dirtyDateRight);
  var sign = (0, _index6.default)(dateLeft, dateRight);
  var difference = Math.abs((0, _index4.default)(dateLeft, dateRight));
  var result;

  // Check for the difference of less than month
  if (difference < 1) {
    result = 0;
  } else {
    if (dateLeft.getMonth() === 1 && dateLeft.getDate() > 27) {
      // This will check if the date is end of Feb and assign a higher end of month date
      // to compare it with Jan
      dateLeft.setDate(30);
    }
    dateLeft.setMonth(dateLeft.getMonth() - sign * difference);

    // Math.abs(diff in full months - diff in calendar months) === 1 if last calendar month is not full
    // If so, result must be decreased by 1 in absolute value
    var isLastMonthNotFull = (0, _index6.default)(dateLeft, dateRight) === -sign;

    // Check for cases of one full calendar month
    if ((0, _index10.default)((0, _index2.default)(dirtyDateLeft)) && difference === 1 && (0, _index6.default)(dirtyDateLeft, dateRight) === 1) {
      isLastMonthNotFull = false;
    }
    result = sign * (difference - Number(isLastMonthNotFull));
  }

  // Prevent negative zero
  return result === 0 ? 0 : result;
}
},{"../toDate/index.js":243,"../differenceInCalendarMonths/index.js":31,"../compareAsc/index.js":24,"../_lib/requiredArgs/index.js":490,"../isLastDayOfMonth/index.js":122}],41:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = differenceInQuarters;

var _index = require("../differenceInMonths/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../_lib/roundingMethods/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name differenceInQuarters
 * @category Quarter Helpers
 * @summary Get the number of quarters between the given dates.
 *
 * @description
 * Get the number of quarters between the given dates.
 *
 * @param {Date|Number} dateLeft - the later date
 * @param {Date|Number} dateRight - the earlier date
 * @param {Object} [options] - an object with options.
 * @param {String} [options.roundingMethod='trunc'] - a rounding method (`ceil`, `floor`, `round` or `trunc`)
 * @returns {Number} the number of full quarters
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // How many full quarters are between 31 December 2013 and 2 July 2014?
 * const result = differenceInQuarters(new Date(2014, 6, 2), new Date(2013, 11, 31))
 * //=> 2
 */
function differenceInQuarters(dateLeft, dateRight, options) {
  (0, _index4.default)(2, arguments);
  var diff = (0, _index2.default)(dateLeft, dateRight) / 3;
  return (0, _index5.getRoundingMethod)(options === null || options === void 0 ? void 0 : options.roundingMethod)(diff);
}
},{"../differenceInMonths/index.js":40,"../_lib/requiredArgs/index.js":490,"../_lib/roundingMethods/index.js":493}],42:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = differenceInSeconds;

var _index = require("../differenceInMilliseconds/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../_lib/roundingMethods/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name differenceInSeconds
 * @category Second Helpers
 * @summary Get the number of seconds between the given dates.
 *
 * @description
 * Get the number of seconds between the given dates.
 *
 * @param {Date|Number} dateLeft - the later date
 * @param {Date|Number} dateRight - the earlier date
 * @param {Object} [options] - an object with options.
 * @param {String} [options.roundingMethod='trunc'] - a rounding method (`ceil`, `floor`, `round` or `trunc`)
 * @returns {Number} the number of seconds
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // How many seconds are between
 * // 2 July 2014 12:30:07.999 and 2 July 2014 12:30:20.000?
 * const result = differenceInSeconds(
 *   new Date(2014, 6, 2, 12, 30, 20, 0),
 *   new Date(2014, 6, 2, 12, 30, 7, 999)
 * )
 * //=> 12
 */
function differenceInSeconds(dateLeft, dateRight, options) {
  (0, _index4.default)(2, arguments);
  var diff = (0, _index2.default)(dateLeft, dateRight) / 1000;
  return (0, _index5.getRoundingMethod)(options === null || options === void 0 ? void 0 : options.roundingMethod)(diff);
}
},{"../differenceInMilliseconds/index.js":38,"../_lib/requiredArgs/index.js":490,"../_lib/roundingMethods/index.js":493}],43:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = differenceInWeeks;

var _index = require("../differenceInDays/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../_lib/roundingMethods/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name differenceInWeeks
 * @category Week Helpers
 * @summary Get the number of full weeks between the given dates.
 *
 * @description
 * Get the number of full weeks between two dates. Fractional weeks are
 * truncated towards zero by default.
 *
 * One "full week" is the distance between a local time in one day to the same
 * local time 7 days earlier or later. A full week can sometimes be less than
 * or more than 7*24 hours if a daylight savings change happens between two dates.
 *
 * To ignore DST and only measure exact 7*24-hour periods, use this instead:
 * `Math.floor(differenceInHours(dateLeft, dateRight)/(7*24))|0`.
 *
 *
 * @param {Date|Number} dateLeft - the later date
 * @param {Date|Number} dateRight - the earlier date
 * @param {Object} [options] - an object with options.
 * @param {String} [options.roundingMethod='trunc'] - a rounding method (`ceil`, `floor`, `round` or `trunc`)
 * @returns {Number} the number of full weeks
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // How many full weeks are between 5 July 2014 and 20 July 2014?
 * const result = differenceInWeeks(new Date(2014, 6, 20), new Date(2014, 6, 5))
 * //=> 2
 *
 * // How many full weeks are between
 * // 1 March 2020 0:00 and 6 June 2020 0:00 ?
 * // Note: because local time is used, the
 * // result will always be 8 weeks (54 days),
 * // even if DST starts and the period has
 * // only 54*24-1 hours.
 * const result = differenceInWeeks(
 *   new Date(2020, 5, 1),
 *   new Date(2020, 2, 6)
 * )
 * //=> 8
 */
function differenceInWeeks(dateLeft, dateRight, options) {
  (0, _index4.default)(2, arguments);
  var diff = (0, _index2.default)(dateLeft, dateRight) / 7;
  return (0, _index5.getRoundingMethod)(options === null || options === void 0 ? void 0 : options.roundingMethod)(diff);
}
},{"../differenceInDays/index.js":34,"../_lib/requiredArgs/index.js":490,"../_lib/roundingMethods/index.js":493}],44:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = differenceInYears;

var _index = require("../toDate/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../differenceInCalendarYears/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../compareAsc/index.js");

var _index6 = _interopRequireDefault(_index5);

var _index7 = require("../_lib/requiredArgs/index.js");

var _index8 = _interopRequireDefault(_index7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name differenceInYears
 * @category Year Helpers
 * @summary Get the number of full years between the given dates.
 *
 * @description
 * Get the number of full years between the given dates.
 *
 * @param {Date|Number} dateLeft - the later date
 * @param {Date|Number} dateRight - the earlier date
 * @returns {Number} the number of full years
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // How many full years are between 31 December 2013 and 11 February 2015?
 * const result = differenceInYears(new Date(2015, 1, 11), new Date(2013, 11, 31))
 * //=> 1
 */
function differenceInYears(dirtyDateLeft, dirtyDateRight) {
  (0, _index8.default)(2, arguments);
  var dateLeft = (0, _index2.default)(dirtyDateLeft);
  var dateRight = (0, _index2.default)(dirtyDateRight);
  var sign = (0, _index6.default)(dateLeft, dateRight);
  var difference = Math.abs((0, _index4.default)(dateLeft, dateRight));

  // Set both dates to a valid leap year for accurate comparison when dealing
  // with leap days
  dateLeft.setFullYear(1584);
  dateRight.setFullYear(1584);

  // Math.abs(diff in full years - diff in calendar years) === 1 if last calendar year is not full
  // If so, result must be decreased by 1 in absolute value
  var isLastYearNotFull = (0, _index6.default)(dateLeft, dateRight) === -sign;
  var result = sign * (difference - Number(isLastYearNotFull));
  // Prevent negative zero
  return result === 0 ? 0 : result;
}
},{"../toDate/index.js":243,"../differenceInCalendarYears/index.js":37,"../compareAsc/index.js":24,"../_lib/requiredArgs/index.js":490}],45:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = eachDayOfInterval;

var _index = require("../toDate/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name eachDayOfInterval
 * @category Interval Helpers
 * @summary Return the array of dates within the specified time interval.
 *
 * @description
 * Return the array of dates within the specified time interval.
 *
 * @param {Interval} interval - the interval. See [Interval]{@link https://date-fns.org/docs/Interval}
 * @param {Object} [options] - an object with options.
 * @param {Number} [options.step=1] - the step to increment by. The value should be more than 1.
 * @returns {Date[]} the array with starts of days from the day of the interval start to the day of the interval end
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} `options.step` must be a number greater than 1
 * @throws {RangeError} The start of an interval cannot be after its end
 * @throws {RangeError} Date in interval cannot be `Invalid Date`
 *
 * @example
 * // Each day between 6 October 2014 and 10 October 2014:
 * const result = eachDayOfInterval({
 *   start: new Date(2014, 9, 6),
 *   end: new Date(2014, 9, 10)
 * })
 * //=> [
 * //   Mon Oct 06 2014 00:00:00,
 * //   Tue Oct 07 2014 00:00:00,
 * //   Wed Oct 08 2014 00:00:00,
 * //   Thu Oct 09 2014 00:00:00,
 * //   Fri Oct 10 2014 00:00:00
 * // ]
 */
function eachDayOfInterval(dirtyInterval, options) {
  var _options$step;
  (0, _index4.default)(1, arguments);
  var interval = dirtyInterval || {};
  var startDate = (0, _index2.default)(interval.start);
  var endDate = (0, _index2.default)(interval.end);
  var endTime = endDate.getTime();

  // Throw an exception if start date is after end date or if any date is `Invalid Date`
  if (!(startDate.getTime() <= endTime)) {
    throw new RangeError('Invalid interval');
  }
  var dates = [];
  var currentDate = startDate;
  currentDate.setHours(0, 0, 0, 0);
  var step = Number((_options$step = options === null || options === void 0 ? void 0 : options.step) !== null && _options$step !== void 0 ? _options$step : 1);
  if (step < 1 || isNaN(step)) throw new RangeError('`options.step` must be a number greater than 1');
  while (currentDate.getTime() <= endTime) {
    dates.push((0, _index2.default)(currentDate));
    currentDate.setDate(currentDate.getDate() + step);
    currentDate.setHours(0, 0, 0, 0);
  }
  return dates;
}
},{"../toDate/index.js":243,"../_lib/requiredArgs/index.js":490}],46:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = eachHourOfInterval;

var _index = require("../addHours/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../toDate/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../_lib/requiredArgs/index.js");

var _index6 = _interopRequireDefault(_index5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name eachHourOfInterval
 * @category Interval Helpers
 * @summary Return the array of hours within the specified time interval.
 *
 * @description
 * Return the array of hours within the specified time interval.
 *
 * @param {Interval} interval - the interval. See [Interval]{@link https://date-fns.org/docs/Interval}
 * @param {Object} [options] - an object with options.
 * @param {Number} [options.step=1] - the step to increment by. The value should be more than 1.
 * @returns {Date[]} the array with starts of hours from the hour of the interval start to the hour of the interval end
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} `options.step` must be a number greater than 1
 * @throws {RangeError} The start of an interval cannot be after its end
 * @throws {RangeError} Date in interval cannot be `Invalid Date`
 *
 * @example
 * // Each hour between 6 October 2014, 12:00 and 6 October 2014, 15:00
 * const result = eachHourOfInterval({
 *   start: new Date(2014, 9, 6, 12),
 *   end: new Date(2014, 9, 6, 15)
 * })
 * //=> [
 * //   Mon Oct 06 2014 12:00:00,
 * //   Mon Oct 06 2014 13:00:00,
 * //   Mon Oct 06 2014 14:00:00,
 * //   Mon Oct 06 2014 15:00:00
 * // ]
 */
function eachHourOfInterval(dirtyInterval, options) {
  var _options$step;
  (0, _index6.default)(1, arguments);
  var interval = dirtyInterval || {};
  var startDate = (0, _index4.default)(interval.start);
  var endDate = (0, _index4.default)(interval.end);
  var startTime = startDate.getTime();
  var endTime = endDate.getTime();

  // Throw an exception if start date is after end date or if any date is `Invalid Date`
  if (!(startTime <= endTime)) {
    throw new RangeError('Invalid interval');
  }
  var dates = [];
  var currentDate = startDate;
  currentDate.setMinutes(0, 0, 0);
  var step = Number((_options$step = options === null || options === void 0 ? void 0 : options.step) !== null && _options$step !== void 0 ? _options$step : 1);
  if (step < 1 || isNaN(step)) throw new RangeError('`options.step` must be a number greater than 1');
  while (currentDate.getTime() <= endTime) {
    dates.push((0, _index4.default)(currentDate));
    currentDate = (0, _index2.default)(currentDate, step);
  }
  return dates;
}
},{"../addHours/index.js":9,"../toDate/index.js":243,"../_lib/requiredArgs/index.js":490}],222:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = startOfMinute;

var _index = require("../toDate/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name startOfMinute
 * @category Minute Helpers
 * @summary Return the start of a minute for the given date.
 *
 * @description
 * Return the start of a minute for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|Number} date - the original date
 * @returns {Date} the start of a minute
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // The start of a minute for 1 December 2014 22:15:45.400:
 * const result = startOfMinute(new Date(2014, 11, 1, 22, 15, 45, 400))
 * //=> Mon Dec 01 2014 22:15:00
 */
function startOfMinute(dirtyDate) {
  (0, _index4.default)(1, arguments);
  var date = (0, _index2.default)(dirtyDate);
  date.setSeconds(0, 0);
  return date;
}
},{"../toDate/index.js":243,"../_lib/requiredArgs/index.js":490}],47:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = eachMinuteOfInterval;

var _index = require("../addMinutes/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../toDate/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../startOfMinute/index.js");

var _index6 = _interopRequireDefault(_index5);

var _index7 = require("../_lib/requiredArgs/index.js");

var _index8 = _interopRequireDefault(_index7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name eachMinuteOfInterval
 * @category Interval Helpers
 * @summary Return the array of minutes within the specified time interval.
 *
 * @description
 * Returns the array of minutes within the specified time interval.
 *
 * @param {Interval} interval - the interval. See [Interval]{@link https://date-fns.org/docs/Interval}
 * @param {Object} [options] - an object with options.
 * @param {Number} [options.step=1] - the step to increment by. The step must be equal to or greater than 1
 * @throws {TypeError} 1 argument required
 * @returns {Date[]} the array with starts of minutes from the minute of the interval start to the minute of the interval end
 * @throws {RangeError} `options.step` must be a number equal to or greater than 1
 * @throws {RangeError} The start of an interval cannot be after its end
 * @throws {RangeError} Date in interval cannot be `Invalid Date`
 *
 * @example
 * // Each minute between 14 October 2020, 13:00 and 14 October 2020, 13:03
 * const result = eachMinuteOfInterval({
 *   start: new Date(2014, 9, 14, 13),
 *   end: new Date(2014, 9, 14, 13, 3)
 * })
 * //=> [
 * //   Wed Oct 14 2014 13:00:00,
 * //   Wed Oct 14 2014 13:01:00,
 * //   Wed Oct 14 2014 13:02:00,
 * //   Wed Oct 14 2014 13:03:00
 * // ]
 */
function eachMinuteOfInterval(interval, options) {
  var _options$step;
  (0, _index8.default)(1, arguments);
  var startDate = (0, _index6.default)((0, _index4.default)(interval.start));
  var endDate = (0, _index4.default)(interval.end);
  var startTime = startDate.getTime();
  var endTime = endDate.getTime();
  if (startTime >= endTime) {
    throw new RangeError('Invalid interval');
  }
  var dates = [];
  var currentDate = startDate;
  var step = Number((_options$step = options === null || options === void 0 ? void 0 : options.step) !== null && _options$step !== void 0 ? _options$step : 1);
  if (step < 1 || isNaN(step)) throw new RangeError('`options.step` must be a number equal to or greater than 1');
  while (currentDate.getTime() <= endTime) {
    dates.push((0, _index4.default)(currentDate));
    currentDate = (0, _index2.default)(currentDate, step);
  }
  return dates;
}
},{"../addMinutes/index.js":14,"../toDate/index.js":243,"../startOfMinute/index.js":222,"../_lib/requiredArgs/index.js":490}],48:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = eachMonthOfInterval;

var _index = require("../toDate/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name eachMonthOfInterval
 * @category Interval Helpers
 * @summary Return the array of months within the specified time interval.
 *
 * @description
 * Return the array of months within the specified time interval.
 *
 * @param {Interval} interval - the interval. See [Interval]{@link https://date-fns.org/docs/Interval}
 * @returns {Date[]} the array with starts of months from the month of the interval start to the month of the interval end
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} The start of an interval cannot be after its end
 * @throws {RangeError} Date in interval cannot be `Invalid Date`
 *
 * @example
 * // Each month between 6 February 2014 and 10 August 2014:
 * const result = eachMonthOfInterval({
 *   start: new Date(2014, 1, 6),
 *   end: new Date(2014, 7, 10)
 * })
 * //=> [
 * //   Sat Feb 01 2014 00:00:00,
 * //   Sat Mar 01 2014 00:00:00,
 * //   Tue Apr 01 2014 00:00:00,
 * //   Thu May 01 2014 00:00:00,
 * //   Sun Jun 01 2014 00:00:00,
 * //   Tue Jul 01 2014 00:00:00,
 * //   Fri Aug 01 2014 00:00:00
 * // ]
 */
function eachMonthOfInterval(dirtyInterval) {
  (0, _index4.default)(1, arguments);
  var interval = dirtyInterval || {};
  var startDate = (0, _index2.default)(interval.start);
  var endDate = (0, _index2.default)(interval.end);
  var endTime = endDate.getTime();
  var dates = [];

  // Throw an exception if start date is after end date or if any date is `Invalid Date`
  if (!(startDate.getTime() <= endTime)) {
    throw new RangeError('Invalid interval');
  }
  var currentDate = startDate;
  currentDate.setHours(0, 0, 0, 0);
  currentDate.setDate(1);
  while (currentDate.getTime() <= endTime) {
    dates.push((0, _index2.default)(currentDate));
    currentDate.setMonth(currentDate.getMonth() + 1);
  }
  return dates;
}
},{"../toDate/index.js":243,"../_lib/requiredArgs/index.js":490}],228:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = startOfQuarter;

var _index = require("../toDate/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name startOfQuarter
 * @category Quarter Helpers
 * @summary Return the start of a year quarter for the given date.
 *
 * @description
 * Return the start of a year quarter for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|Number} date - the original date
 * @returns {Date} the start of a quarter
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // The start of a quarter for 2 September 2014 11:55:00:
 * const result = startOfQuarter(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Jul 01 2014 00:00:00
 */
function startOfQuarter(dirtyDate) {
  (0, _index4.default)(1, arguments);
  var date = (0, _index2.default)(dirtyDate);
  var currentMonth = date.getMonth();
  var month = currentMonth - currentMonth % 3;
  date.setMonth(month, 1);
  date.setHours(0, 0, 0, 0);
  return date;
}
},{"../toDate/index.js":243,"../_lib/requiredArgs/index.js":490}],49:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = eachQuarterOfInterval;

var _index = require("../addQuarters/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../startOfQuarter/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../toDate/index.js");

var _index6 = _interopRequireDefault(_index5);

var _index7 = require("../_lib/requiredArgs/index.js");

var _index8 = _interopRequireDefault(_index7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name eachQuarterOfInterval
 * @category Interval Helpers
 * @summary Return the array of quarters within the specified time interval.
 *
 * @description
 * Return the array of quarters within the specified time interval.
 *
 * @param {Interval} interval - the interval. See [Interval]{@link https://date-fns.org/docs/Interval}
 * @returns {Date[]} the array with starts of quarters from the quarter of the interval start to the quarter of the interval end
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} The start of an interval cannot be after its end
 * @throws {RangeError} Date in interval cannot be `Invalid Date`
 *
 * @example
 * // Each quarter within interval 6 February 2014 - 10 August 2014:
 * const result = eachQuarterOfInterval({
 *   start: new Date(2014, 1, 6),
 *   end: new Date(2014, 7, 10)
 * })
 * //=> [
 * //   Wed Jan 01 2014 00:00:00,
 * //   Tue Apr 01 2014 00:00:00,
 * //   Tue Jul 01 2014 00:00:00,
 * // ]
 */
function eachQuarterOfInterval(dirtyInterval) {
  (0, _index8.default)(1, arguments);
  var interval = dirtyInterval || {};
  var startDate = (0, _index6.default)(interval.start);
  var endDate = (0, _index6.default)(interval.end);
  var endTime = endDate.getTime();

  // Throw an exception if start date is after end date or if any date is `Invalid Date`
  if (!(startDate.getTime() <= endTime)) {
    throw new RangeError('Invalid interval');
  }
  var startDateQuarter = (0, _index4.default)(startDate);
  var endDateQuarter = (0, _index4.default)(endDate);
  endTime = endDateQuarter.getTime();
  var quarters = [];
  var currentQuarter = startDateQuarter;
  while (currentQuarter.getTime() <= endTime) {
    quarters.push((0, _index6.default)(currentQuarter));
    currentQuarter = (0, _index2.default)(currentQuarter, 1);
  }
  return quarters;
}
},{"../addQuarters/index.js":16,"../startOfQuarter/index.js":228,"../toDate/index.js":243,"../_lib/requiredArgs/index.js":490}],51:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = eachWeekOfInterval;

var _index = require("../addWeeks/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../startOfWeek/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../toDate/index.js");

var _index6 = _interopRequireDefault(_index5);

var _index7 = require("../_lib/requiredArgs/index.js");

var _index8 = _interopRequireDefault(_index7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name eachWeekOfInterval
 * @category Interval Helpers
 * @summary Return the array of weeks within the specified time interval.
 *
 * @description
 * Return the array of weeks within the specified time interval.
 *
 * @param {Interval} interval - the interval. See [Interval]{@link https://date-fns.org/docs/Interval}
 * @param {Object} [options] - an object with options.
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @returns {Date[]} the array with starts of weeks from the week of the interval start to the week of the interval end
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} `options.weekStartsOn` must be 0, 1, ..., 6
 * @throws {RangeError} The start of an interval cannot be after its end
 * @throws {RangeError} Date in interval cannot be `Invalid Date`
 *
 * @example
 * // Each week within interval 6 October 2014 - 23 November 2014:
 * const result = eachWeekOfInterval({
 *   start: new Date(2014, 9, 6),
 *   end: new Date(2014, 10, 23)
 * })
 * //=> [
 * //   Sun Oct 05 2014 00:00:00,
 * //   Sun Oct 12 2014 00:00:00,
 * //   Sun Oct 19 2014 00:00:00,
 * //   Sun Oct 26 2014 00:00:00,
 * //   Sun Nov 02 2014 00:00:00,
 * //   Sun Nov 09 2014 00:00:00,
 * //   Sun Nov 16 2014 00:00:00,
 * //   Sun Nov 23 2014 00:00:00
 * // ]
 */
function eachWeekOfInterval(dirtyInterval, options) {
  (0, _index8.default)(1, arguments);
  var interval = dirtyInterval || {};
  var startDate = (0, _index6.default)(interval.start);
  var endDate = (0, _index6.default)(interval.end);
  var endTime = endDate.getTime();

  // Throw an exception if start date is after end date or if any date is `Invalid Date`
  if (!(startDate.getTime() <= endTime)) {
    throw new RangeError('Invalid interval');
  }
  var startDateWeek = (0, _index4.default)(startDate, options);
  var endDateWeek = (0, _index4.default)(endDate, options);

  // Some timezones switch DST at midnight, making start of day unreliable in these timezones, 3pm is a safe bet
  startDateWeek.setHours(15);
  endDateWeek.setHours(15);
  endTime = endDateWeek.getTime();
  var weeks = [];
  var currentWeek = startDateWeek;
  while (currentWeek.getTime() <= endTime) {
    currentWeek.setHours(0);
    weeks.push((0, _index6.default)(currentWeek));
    currentWeek = (0, _index2.default)(currentWeek, 1);
    currentWeek.setHours(15);
  }
  return weeks;
}
},{"../addWeeks/index.js":18,"../startOfWeek/index.js":226,"../toDate/index.js":243,"../_lib/requiredArgs/index.js":490}],50:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = eachWeekendOfInterval;

var _index = require("../eachDayOfInterval/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../isSunday/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../isWeekend/index.js");

var _index6 = _interopRequireDefault(_index5);

var _index7 = require("../_lib/requiredArgs/index.js");

var _index8 = _interopRequireDefault(_index7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name eachWeekendOfInterval
 * @category Interval Helpers
 * @summary List all the Saturdays and Sundays in the given date interval.
 *
 * @description
 * Get all the Saturdays and Sundays in the given date interval.
 *
 * @param {Interval} interval - the given interval. See [Interval]{@link https://date-fns.org/docs/Interval}
 * @returns {Date[]} an array containing all the Saturdays and Sundays
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} The start of an interval cannot be after its end
 * @throws {RangeError} Date in interval cannot be `Invalid Date`
 *
 * @example
 * // Lists all Saturdays and Sundays in the given date interval
 * const result = eachWeekendOfInterval({
 *   start: new Date(2018, 8, 17),
 *   end: new Date(2018, 8, 30)
 * })
 * //=> [
 * //   Sat Sep 22 2018 00:00:00,
 * //   Sun Sep 23 2018 00:00:00,
 * //   Sat Sep 29 2018 00:00:00,
 * //   Sun Sep 30 2018 00:00:00
 * // ]
 */
function eachWeekendOfInterval(interval) {
  (0, _index8.default)(1, arguments);
  var dateInterval = (0, _index2.default)(interval);
  var weekends = [];
  var index = 0;
  while (index < dateInterval.length) {
    var date = dateInterval[index++];
    if ((0, _index6.default)(date)) {
      weekends.push(date);
      if ((0, _index4.default)(date)) index = index + 5;
    }
  }
  return weekends;
}
},{"../eachDayOfInterval/index.js":45,"../isSunday/index.js":139,"../isWeekend/index.js":154,"../_lib/requiredArgs/index.js":490}],223:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = startOfMonth;

var _index = require("../toDate/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name startOfMonth
 * @category Month Helpers
 * @summary Return the start of a month for the given date.
 *
 * @description
 * Return the start of a month for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|Number} date - the original date
 * @returns {Date} the start of a month
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // The start of a month for 2 September 2014 11:55:00:
 * const result = startOfMonth(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Mon Sep 01 2014 00:00:00
 */
function startOfMonth(dirtyDate) {
  (0, _index4.default)(1, arguments);
  var date = (0, _index2.default)(dirtyDate);
  date.setDate(1);
  date.setHours(0, 0, 0, 0);
  return date;
}
},{"../toDate/index.js":243,"../_lib/requiredArgs/index.js":490}],52:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = eachWeekendOfMonth;

var _index = require("../eachWeekendOfInterval/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../startOfMonth/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../endOfMonth/index.js");

var _index6 = _interopRequireDefault(_index5);

var _index7 = require("../_lib/requiredArgs/index.js");

var _index8 = _interopRequireDefault(_index7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name eachWeekendOfMonth
 * @category Month Helpers
 * @summary List all the Saturdays and Sundays in the given month.
 *
 * @description
 * Get all the Saturdays and Sundays in the given month.
 *
 * @param {Date|Number} date - the given month
 * @returns {Date[]} an array containing all the Saturdays and Sundays
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} The passed date is invalid
 *
 * @example
 * // Lists all Saturdays and Sundays in the given month
 * const result = eachWeekendOfMonth(new Date(2022, 1, 1))
 * //=> [
 * //   Sat Feb 05 2022 00:00:00,
 * //   Sun Feb 06 2022 00:00:00,
 * //   Sat Feb 12 2022 00:00:00,
 * //   Sun Feb 13 2022 00:00:00,
 * //   Sat Feb 19 2022 00:00:00,
 * //   Sun Feb 20 2022 00:00:00,
 * //   Sat Feb 26 2022 00:00:00,
 * //   Sun Feb 27 2022 00:00:00
 * // ]
 */
function eachWeekendOfMonth(dirtyDate) {
  (0, _index8.default)(1, arguments);
  var startDate = (0, _index4.default)(dirtyDate);
  if (isNaN(startDate.getTime())) throw new RangeError('The passed date is invalid');
  var endDate = (0, _index6.default)(dirtyDate);
  return (0, _index2.default)({
    start: startDate,
    end: endDate
  });
}
},{"../eachWeekendOfInterval/index.js":50,"../startOfMonth/index.js":223,"../endOfMonth/index.js":60,"../_lib/requiredArgs/index.js":490}],71:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = endOfYear;

var _index = require("../toDate/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name endOfYear
 * @category Year Helpers
 * @summary Return the end of a year for the given date.
 *
 * @description
 * Return the end of a year for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|Number} date - the original date
 * @returns {Date} the end of a year
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // The end of a year for 2 September 2014 11:55:00:
 * const result = endOfYear(new Date(2014, 8, 2, 11, 55, 00))
 * //=> Wed Dec 31 2014 23:59:59.999
 */
function endOfYear(dirtyDate) {
  (0, _index4.default)(1, arguments);
  var date = (0, _index2.default)(dirtyDate);
  var year = date.getFullYear();
  date.setFullYear(year + 1, 0, 0);
  date.setHours(23, 59, 59, 999);
  return date;
}
},{"../toDate/index.js":243,"../_lib/requiredArgs/index.js":490}],229:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = startOfYear;

var _index = require("../toDate/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name startOfYear
 * @category Year Helpers
 * @summary Return the start of a year for the given date.
 *
 * @description
 * Return the start of a year for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|Number} date - the original date
 * @returns {Date} the start of a year
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // The start of a year for 2 September 2014 11:55:00:
 * const result = startOfYear(new Date(2014, 8, 2, 11, 55, 00))
 * //=> Wed Jan 01 2014 00:00:00
 */
function startOfYear(dirtyDate) {
  (0, _index4.default)(1, arguments);
  var cleanDate = (0, _index2.default)(dirtyDate);
  var date = new Date(0);
  date.setFullYear(cleanDate.getFullYear(), 0, 1);
  date.setHours(0, 0, 0, 0);
  return date;
}
},{"../toDate/index.js":243,"../_lib/requiredArgs/index.js":490}],53:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = eachWeekendOfYear;

var _index = require("../eachWeekendOfInterval/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../endOfYear/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../startOfYear/index.js");

var _index6 = _interopRequireDefault(_index5);

var _index7 = require("../_lib/requiredArgs/index.js");

var _index8 = _interopRequireDefault(_index7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name eachWeekendOfYear
 * @category Year Helpers
 * @summary List all the Saturdays and Sundays in the year.
 *
 * @description
 * Get all the Saturdays and Sundays in the year.
 *
 * @param {Date|Number} date - the given year
 * @returns {Date[]} an array containing all the Saturdays and Sundays
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} The passed date is invalid
 *
 * @example
 * // Lists all Saturdays and Sundays in the year
 * const result = eachWeekendOfYear(new Date(2020, 1, 1))
 * //=> [
 * //   Sat Jan 03 2020 00:00:00,
 * //   Sun Jan 04 2020 00:00:00,
 * //   ...
 * //   Sun Dec 27 2020 00:00:00
 * // ]
 * ]
 */
function eachWeekendOfYear(dirtyDate) {
  (0, _index8.default)(1, arguments);
  var startDate = (0, _index6.default)(dirtyDate);
  var endDate = (0, _index4.default)(dirtyDate);
  return (0, _index2.default)({
    start: startDate,
    end: endDate
  });
}
},{"../eachWeekendOfInterval/index.js":50,"../endOfYear/index.js":71,"../startOfYear/index.js":229,"../_lib/requiredArgs/index.js":490}],54:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = eachYearOfInterval;

var _index = require("../toDate/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name eachYearOfInterval
 * @category Interval Helpers
 * @summary Return the array of yearly timestamps within the specified time interval.
 *
 * @description
 * Return the array of yearly timestamps within the specified time interval.
 *
 * @param {Interval} interval - the interval. See [Interval]{@link https://date-fns.org/docs/Interval}
 * @returns {Date[]} the array with starts of yearly timestamps from the month of the interval start to the month of the interval end
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} The start of an interval cannot be after its end
 * @throws {RangeError} Date in interval cannot be `Invalid Date`
 *
 * @example
 * // Each year between 6 February 2014 and 10 August 2017:
 * const result = eachYearOfInterval({
 *   start: new Date(2014, 1, 6),
 *   end: new Date(2017, 7, 10)
 * })
 * //=> [
 * //   Wed Jan 01 2014 00:00:00,
 * //   Thu Jan 01 2015 00:00:00,
 * //   Fri Jan 01 2016 00:00:00,
 * //   Sun Jan 01 2017 00:00:00
 * // ]
 */
function eachYearOfInterval(dirtyInterval) {
  (0, _index4.default)(1, arguments);
  var interval = dirtyInterval || {};
  var startDate = (0, _index2.default)(interval.start);
  var endDate = (0, _index2.default)(interval.end);
  var endTime = endDate.getTime();

  // Throw an exception if start date is after end date or if any date is `Invalid Date`
  if (!(startDate.getTime() <= endTime)) {
    throw new RangeError('Invalid interval');
  }
  var dates = [];
  var currentDate = startDate;
  currentDate.setHours(0, 0, 0, 0);
  currentDate.setMonth(0, 1);
  while (currentDate.getTime() <= endTime) {
    dates.push((0, _index2.default)(currentDate));
    currentDate.setFullYear(currentDate.getFullYear() + 1);
  }
  return dates;
}
},{"../toDate/index.js":243,"../_lib/requiredArgs/index.js":490}],56:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = endOfDecade;

var _index = require("../toDate/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name endOfDecade
 * @category Decade Helpers
 * @summary Return the end of a decade for the given date.
 *
 * @description
 * Return the end of a decade for the given date.
 *
 * @param {Date|Number} date - the original date
 * @returns {Date} the end of a decade
 * @param {Object} [options] - an object with options.
 * @param {0|1|2} [options.additionalDigits=2] - passed to `toDate`. See [toDate]{@link https://date-fns.org/docs/toDate}
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} `options.additionalDigits` must be 0, 1 or 2
 *
 * @example
 * // The end of a decade for 12 May 1984 00:00:00:
 * const result = endOfDecade(new Date(1984, 4, 12, 00, 00, 00))
 * //=> Dec 31 1989 23:59:59.999
 */
function endOfDecade(dirtyDate) {
  (0, _index4.default)(1, arguments);
  var date = (0, _index2.default)(dirtyDate);
  var year = date.getFullYear();
  var decade = 9 + Math.floor(year / 10) * 10;
  date.setFullYear(decade, 11, 31);
  date.setHours(23, 59, 59, 999);
  return date;
}
},{"../toDate/index.js":243,"../_lib/requiredArgs/index.js":490}],63:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = endOfHour;

var _index = require("../toDate/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name endOfHour
 * @category Hour Helpers
 * @summary Return the end of an hour for the given date.
 *
 * @description
 * Return the end of an hour for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|Number} date - the original date
 * @returns {Date} the end of an hour
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // The end of an hour for 2 September 2014 11:55:00:
 * const result = endOfHour(new Date(2014, 8, 2, 11, 55))
 * //=> Tue Sep 02 2014 11:59:59.999
 */
function endOfHour(dirtyDate) {
  (0, _index4.default)(1, arguments);
  var date = (0, _index2.default)(dirtyDate);
  date.setMinutes(59, 59, 999);
  return date;
}
},{"../toDate/index.js":243,"../_lib/requiredArgs/index.js":490}],66:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = endOfWeek;

var _index = require("../_lib/defaultOptions/index.js");

var _index2 = require("../toDate/index.js");

var _index3 = _interopRequireDefault(_index2);

var _index4 = require("../_lib/toInteger/index.js");

var _index5 = _interopRequireDefault(_index4);

var _index6 = require("../_lib/requiredArgs/index.js");

var _index7 = _interopRequireDefault(_index6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name endOfWeek
 * @category Week Helpers
 * @summary Return the end of a week for the given date.
 *
 * @description
 * Return the end of a week for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|Number} date - the original date
 * @param {Object} [options] - an object with options.
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @returns {Date} the end of a week
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
 *
 * @example
 * // The end of a week for 2 September 2014 11:55:00:
 * const result = endOfWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Sat Sep 06 2014 23:59:59.999
 *
 * @example
 * // If the week starts on Monday, the end of the week for 2 September 2014 11:55:00:
 * const result = endOfWeek(new Date(2014, 8, 2, 11, 55, 0), { weekStartsOn: 1 })
 * //=> Sun Sep 07 2014 23:59:59.999
 */
function endOfWeek(dirtyDate, options) {
  var _ref, _ref2, _ref3, _options$weekStartsOn, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
  (0, _index7.default)(1, arguments);
  var defaultOptions = (0, _index.getDefaultOptions)();
  var weekStartsOn = (0, _index5.default)((_ref = (_ref2 = (_ref3 = (_options$weekStartsOn = options === null || options === void 0 ? void 0 : options.weekStartsOn) !== null && _options$weekStartsOn !== void 0 ? _options$weekStartsOn : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.weekStartsOn) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions.weekStartsOn) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.weekStartsOn) !== null && _ref !== void 0 ? _ref : 0);

  // Test if weekStartsOn is between 0 and 6 _and_ is not NaN
  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError('weekStartsOn must be between 0 and 6 inclusively');
  }
  var date = (0, _index3.default)(dirtyDate);
  var day = date.getDay();
  var diff = (day < weekStartsOn ? -7 : 0) + 6 - (day - weekStartsOn);
  date.setDate(date.getDate() + diff);
  date.setHours(23, 59, 59, 999);
  return date;
}
},{"../_lib/defaultOptions/index.js":494,"../toDate/index.js":243,"../_lib/toInteger/index.js":491,"../_lib/requiredArgs/index.js":490}],57:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = endOfISOWeek;

var _index = require("../endOfWeek/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name endOfISOWeek
 * @category ISO Week Helpers
 * @summary Return the end of an ISO week for the given date.
 *
 * @description
 * Return the end of an ISO week for the given date.
 * The result will be in the local timezone.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param {Date|Number} date - the original date
 * @returns {Date} the end of an ISO week
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // The end of an ISO week for 2 September 2014 11:55:00:
 * const result = endOfISOWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Sun Sep 07 2014 23:59:59.999
 */
function endOfISOWeek(dirtyDate) {
  (0, _index4.default)(1, arguments);
  return (0, _index2.default)(dirtyDate, {
    weekStartsOn: 1
  });
}
},{"../endOfWeek/index.js":66,"../_lib/requiredArgs/index.js":490}],58:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = endOfISOWeekYear;

var _index = require("../getISOWeekYear/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../startOfISOWeek/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../_lib/requiredArgs/index.js");

var _index6 = _interopRequireDefault(_index5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name endOfISOWeekYear
 * @category ISO Week-Numbering Year Helpers
 * @summary Return the end of an ISO week-numbering year for the given date.
 *
 * @description
 * Return the end of an ISO week-numbering year,
 * which always starts 3 days before the year's first Thursday.
 * The result will be in the local timezone.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param {Date|Number} date - the original date
 * @returns {Date} the end of an ISO week-numbering year
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // The end of an ISO week-numbering year for 2 July 2005:
 * const result = endOfISOWeekYear(new Date(2005, 6, 2))
 * //=> Sun Jan 01 2006 23:59:59.999
 */
function endOfISOWeekYear(dirtyDate) {
  (0, _index6.default)(1, arguments);
  var year = (0, _index2.default)(dirtyDate);
  var fourthOfJanuaryOfNextYear = new Date(0);
  fourthOfJanuaryOfNextYear.setFullYear(year + 1, 0, 4);
  fourthOfJanuaryOfNextYear.setHours(0, 0, 0, 0);
  var date = (0, _index4.default)(fourthOfJanuaryOfNextYear);
  date.setMilliseconds(date.getMilliseconds() - 1);
  return date;
}
},{"../getISOWeekYear/index.js":90,"../startOfISOWeek/index.js":218,"../_lib/requiredArgs/index.js":490}],59:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = endOfMinute;

var _index = require("../toDate/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name endOfMinute
 * @category Minute Helpers
 * @summary Return the end of a minute for the given date.
 *
 * @description
 * Return the end of a minute for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|Number} date - the original date
 * @returns {Date} the end of a minute
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // The end of a minute for 1 December 2014 22:15:45.400:
 * const result = endOfMinute(new Date(2014, 11, 1, 22, 15, 45, 400))
 * //=> Mon Dec 01 2014 22:15:59.999
 */
function endOfMinute(dirtyDate) {
  (0, _index4.default)(1, arguments);
  var date = (0, _index2.default)(dirtyDate);
  date.setSeconds(59, 999);
  return date;
}
},{"../toDate/index.js":243,"../_lib/requiredArgs/index.js":490}],61:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = endOfQuarter;

var _index = require("../toDate/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name endOfQuarter
 * @category Quarter Helpers
 * @summary Return the end of a year quarter for the given date.
 *
 * @description
 * Return the end of a year quarter for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|Number} date - the original date
 * @returns {Date} the end of a quarter
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // The end of a quarter for 2 September 2014 11:55:00:
 * const result = endOfQuarter(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 30 2014 23:59:59.999
 */
function endOfQuarter(dirtyDate) {
  (0, _index4.default)(1, arguments);
  var date = (0, _index2.default)(dirtyDate);
  var currentMonth = date.getMonth();
  var month = currentMonth - currentMonth % 3 + 3;
  date.setMonth(month, 0);
  date.setHours(23, 59, 59, 999);
  return date;
}
},{"../toDate/index.js":243,"../_lib/requiredArgs/index.js":490}],64:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = endOfSecond;

var _index = require("../toDate/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name endOfSecond
 * @category Second Helpers
 * @summary Return the end of a second for the given date.
 *
 * @description
 * Return the end of a second for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|Number} date - the original date
 * @returns {Date} the end of a second
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // The end of a second for 1 December 2014 22:15:45.400:
 * const result = endOfSecond(new Date(2014, 11, 1, 22, 15, 45, 400))
 * //=> Mon Dec 01 2014 22:15:45.999
 */
function endOfSecond(dirtyDate) {
  (0, _index4.default)(1, arguments);
  var date = (0, _index2.default)(dirtyDate);
  date.setMilliseconds(999);
  return date;
}
},{"../toDate/index.js":243,"../_lib/requiredArgs/index.js":490}],62:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = endOfToday;

var _index = require("../endOfDay/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name endOfToday
 * @category Day Helpers
 * @summary Return the end of today.
 * @pure false
 *
 * @description
 * Return the end of today.
 *
 * > ⚠️ Please note that this function is not present in the FP submodule as
 * > it uses `Date.now()` internally hence impure and can't be safely curried.
 *
 * @returns {Date} the end of today
 *
 * @example
 * // If today is 6 October 2014:
 * const result = endOfToday()
 * //=> Mon Oct 6 2014 23:59:59.999
 */
function endOfToday() {
  return (0, _index2.default)(Date.now());
}
},{"../endOfDay/index.js":55}],65:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = endOfTomorrow;
/**
 * @name endOfTomorrow
 * @category Day Helpers
 * @summary Return the end of tomorrow.
 * @pure false
 *
 * @description
 * Return the end of tomorrow.
 *
 * > ⚠️ Please note that this function is not present in the FP submodule as
 * > it uses `new Date()` internally hence impure and can't be safely curried.
 *
 * @returns {Date} the end of tomorrow
 *
 * @example
 * // If today is 6 October 2014:
 * const result = endOfTomorrow()
 * //=> Tue Oct 7 2014 23:59:59.999
 */
function endOfTomorrow() {
  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth();
  var day = now.getDate();
  var date = new Date(0);
  date.setFullYear(year, month, day + 1);
  date.setHours(23, 59, 59, 999);
  return date;
}
},{}],68:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = endOfYesterday;
/**
 * @name endOfYesterday
 * @category Day Helpers
 * @summary Return the end of yesterday.
 * @pure false
 *
 * @description
 * Return the end of yesterday.
 *
 * > ⚠️ Please note that this function is not present in the FP submodule as
 * > it uses `new Date()` internally hence impure and can't be safely curried.
 *
 * @returns {Date} the end of yesterday
 *
 * @example
 * // If today is 6 October 2014:
 * const result = endOfYesterday()
 * //=> Sun Oct 5 2014 23:59:59.999
 */
function endOfYesterday() {
  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth();
  var day = now.getDate();
  var date = new Date(0);
  date.setFullYear(year, month, day - 1);
  date.setHours(23, 59, 59, 999);
  return date;
}
},{}],234:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = subMilliseconds;

var _index = require("../addMilliseconds/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../_lib/toInteger/index.js");

var _index6 = _interopRequireDefault(_index5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name subMilliseconds
 * @category Millisecond Helpers
 * @summary Subtract the specified number of milliseconds from the given date.
 *
 * @description
 * Subtract the specified number of milliseconds from the given date.
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of milliseconds to be subtracted. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 * @returns {Date} the new date with the milliseconds subtracted
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Subtract 750 milliseconds from 10 July 2014 12:45:30.000:
 * const result = subMilliseconds(new Date(2014, 6, 10, 12, 45, 30, 0), 750)
 * //=> Thu Jul 10 2014 12:45:29.250
 */
function subMilliseconds(dirtyDate, dirtyAmount) {
  (0, _index4.default)(2, arguments);
  var amount = (0, _index6.default)(dirtyAmount);
  return (0, _index2.default)(dirtyDate, -amount);
}
},{"../addMilliseconds/index.js":13,"../_lib/requiredArgs/index.js":490,"../_lib/toInteger/index.js":491}],507:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getUTCDayOfYear;

var _index = require("../../toDate/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MILLISECONDS_IN_DAY = 86400000;
function getUTCDayOfYear(dirtyDate) {
  (0, _index4.default)(1, arguments);
  var date = (0, _index2.default)(dirtyDate);
  var timestamp = date.getTime();
  date.setUTCMonth(0, 1);
  date.setUTCHours(0, 0, 0, 0);
  var startOfYearTimestamp = date.getTime();
  var difference = timestamp - startOfYearTimestamp;
  return Math.floor(difference / MILLISECONDS_IN_DAY) + 1;
}
},{"../../toDate/index.js":243,"../requiredArgs/index.js":490}],556:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = startOfUTCISOWeek;

var _index = require("../../toDate/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function startOfUTCISOWeek(dirtyDate) {
  (0, _index4.default)(1, arguments);
  var weekStartsOn = 1;
  var date = (0, _index2.default)(dirtyDate);
  var day = date.getUTCDay();
  var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
  date.setUTCDate(date.getUTCDate() - diff);
  date.setUTCHours(0, 0, 0, 0);
  return date;
}
},{"../../toDate/index.js":243,"../requiredArgs/index.js":490}],509:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getUTCISOWeekYear;

var _index = require("../../toDate/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../startOfUTCISOWeek/index.js");

var _index6 = _interopRequireDefault(_index5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getUTCISOWeekYear(dirtyDate) {
  (0, _index4.default)(1, arguments);
  var date = (0, _index2.default)(dirtyDate);
  var year = date.getUTCFullYear();
  var fourthOfJanuaryOfNextYear = new Date(0);
  fourthOfJanuaryOfNextYear.setUTCFullYear(year + 1, 0, 4);
  fourthOfJanuaryOfNextYear.setUTCHours(0, 0, 0, 0);
  var startOfNextYear = (0, _index6.default)(fourthOfJanuaryOfNextYear);
  var fourthOfJanuaryOfThisYear = new Date(0);
  fourthOfJanuaryOfThisYear.setUTCFullYear(year, 0, 4);
  fourthOfJanuaryOfThisYear.setUTCHours(0, 0, 0, 0);
  var startOfThisYear = (0, _index6.default)(fourthOfJanuaryOfThisYear);
  if (date.getTime() >= startOfNextYear.getTime()) {
    return year + 1;
  } else if (date.getTime() >= startOfThisYear.getTime()) {
    return year;
  } else {
    return year - 1;
  }
}
},{"../../toDate/index.js":243,"../requiredArgs/index.js":490,"../startOfUTCISOWeek/index.js":556}],555:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = startOfUTCISOWeekYear;

var _index = require("../getUTCISOWeekYear/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../startOfUTCISOWeek/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../requiredArgs/index.js");

var _index6 = _interopRequireDefault(_index5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function startOfUTCISOWeekYear(dirtyDate) {
  (0, _index6.default)(1, arguments);
  var year = (0, _index2.default)(dirtyDate);
  var fourthOfJanuary = new Date(0);
  fourthOfJanuary.setUTCFullYear(year, 0, 4);
  fourthOfJanuary.setUTCHours(0, 0, 0, 0);
  var date = (0, _index4.default)(fourthOfJanuary);
  return date;
}
},{"../getUTCISOWeekYear/index.js":509,"../startOfUTCISOWeek/index.js":556,"../requiredArgs/index.js":490}],508:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getUTCISOWeek;

var _index = require("../../toDate/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../startOfUTCISOWeek/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../startOfUTCISOWeekYear/index.js");

var _index6 = _interopRequireDefault(_index5);

var _index7 = require("../requiredArgs/index.js");

var _index8 = _interopRequireDefault(_index7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MILLISECONDS_IN_WEEK = 604800000;
function getUTCISOWeek(dirtyDate) {
  (0, _index8.default)(1, arguments);
  var date = (0, _index2.default)(dirtyDate);
  var diff = (0, _index4.default)(date).getTime() - (0, _index6.default)(date).getTime();

  // Round the number of days to the nearest integer
  // because the number of milliseconds in a week is not constant
  // (e.g. it's different in the week of the daylight saving time clock shift)
  return Math.round(diff / MILLISECONDS_IN_WEEK) + 1;
}
},{"../../toDate/index.js":243,"../startOfUTCISOWeek/index.js":556,"../startOfUTCISOWeekYear/index.js":555,"../requiredArgs/index.js":490}],557:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = startOfUTCWeek;

var _index = require("../../toDate/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../toInteger/index.js");

var _index6 = _interopRequireDefault(_index5);

var _index7 = require("../defaultOptions/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function startOfUTCWeek(dirtyDate, options) {
  var _ref, _ref2, _ref3, _options$weekStartsOn, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
  (0, _index4.default)(1, arguments);
  var defaultOptions = (0, _index7.getDefaultOptions)();
  var weekStartsOn = (0, _index6.default)((_ref = (_ref2 = (_ref3 = (_options$weekStartsOn = options === null || options === void 0 ? void 0 : options.weekStartsOn) !== null && _options$weekStartsOn !== void 0 ? _options$weekStartsOn : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.weekStartsOn) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions.weekStartsOn) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.weekStartsOn) !== null && _ref !== void 0 ? _ref : 0);

  // Test if weekStartsOn is between 0 and 6 _and_ is not NaN
  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError('weekStartsOn must be between 0 and 6 inclusively');
  }
  var date = (0, _index2.default)(dirtyDate);
  var day = date.getUTCDay();
  var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
  date.setUTCDate(date.getUTCDate() - diff);
  date.setUTCHours(0, 0, 0, 0);
  return date;
}
},{"../../toDate/index.js":243,"../requiredArgs/index.js":490,"../toInteger/index.js":491,"../defaultOptions/index.js":494}],511:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getUTCWeekYear;

var _index = require("../../toDate/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../startOfUTCWeek/index.js");

var _index6 = _interopRequireDefault(_index5);

var _index7 = require("../toInteger/index.js");

var _index8 = _interopRequireDefault(_index7);

var _index9 = require("../defaultOptions/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getUTCWeekYear(dirtyDate, options) {
  var _ref, _ref2, _ref3, _options$firstWeekCon, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
  (0, _index4.default)(1, arguments);
  var date = (0, _index2.default)(dirtyDate);
  var year = date.getUTCFullYear();
  var defaultOptions = (0, _index9.getDefaultOptions)();
  var firstWeekContainsDate = (0, _index8.default)((_ref = (_ref2 = (_ref3 = (_options$firstWeekCon = options === null || options === void 0 ? void 0 : options.firstWeekContainsDate) !== null && _options$firstWeekCon !== void 0 ? _options$firstWeekCon : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.firstWeekContainsDate) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions.firstWeekContainsDate) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.firstWeekContainsDate) !== null && _ref !== void 0 ? _ref : 1);

  // Test if weekStartsOn is between 1 and 7 _and_ is not NaN
  if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {
    throw new RangeError('firstWeekContainsDate must be between 1 and 7 inclusively');
  }
  var firstWeekOfNextYear = new Date(0);
  firstWeekOfNextYear.setUTCFullYear(year + 1, 0, firstWeekContainsDate);
  firstWeekOfNextYear.setUTCHours(0, 0, 0, 0);
  var startOfNextYear = (0, _index6.default)(firstWeekOfNextYear, options);
  var firstWeekOfThisYear = new Date(0);
  firstWeekOfThisYear.setUTCFullYear(year, 0, firstWeekContainsDate);
  firstWeekOfThisYear.setUTCHours(0, 0, 0, 0);
  var startOfThisYear = (0, _index6.default)(firstWeekOfThisYear, options);
  if (date.getTime() >= startOfNextYear.getTime()) {
    return year + 1;
  } else if (date.getTime() >= startOfThisYear.getTime()) {
    return year;
  } else {
    return year - 1;
  }
}
},{"../../toDate/index.js":243,"../requiredArgs/index.js":490,"../startOfUTCWeek/index.js":557,"../toInteger/index.js":491,"../defaultOptions/index.js":494}],558:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = startOfUTCWeekYear;

var _index = require("../getUTCWeekYear/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../startOfUTCWeek/index.js");

var _index6 = _interopRequireDefault(_index5);

var _index7 = require("../toInteger/index.js");

var _index8 = _interopRequireDefault(_index7);

var _index9 = require("../defaultOptions/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function startOfUTCWeekYear(dirtyDate, options) {
  var _ref, _ref2, _ref3, _options$firstWeekCon, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
  (0, _index4.default)(1, arguments);
  var defaultOptions = (0, _index9.getDefaultOptions)();
  var firstWeekContainsDate = (0, _index8.default)((_ref = (_ref2 = (_ref3 = (_options$firstWeekCon = options === null || options === void 0 ? void 0 : options.firstWeekContainsDate) !== null && _options$firstWeekCon !== void 0 ? _options$firstWeekCon : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.firstWeekContainsDate) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions.firstWeekContainsDate) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.firstWeekContainsDate) !== null && _ref !== void 0 ? _ref : 1);
  var year = (0, _index2.default)(dirtyDate, options);
  var firstWeek = new Date(0);
  firstWeek.setUTCFullYear(year, 0, firstWeekContainsDate);
  firstWeek.setUTCHours(0, 0, 0, 0);
  var date = (0, _index6.default)(firstWeek, options);
  return date;
}
},{"../getUTCWeekYear/index.js":511,"../requiredArgs/index.js":490,"../startOfUTCWeek/index.js":557,"../toInteger/index.js":491,"../defaultOptions/index.js":494}],510:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getUTCWeek;

var _index = require("../../toDate/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../startOfUTCWeek/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../startOfUTCWeekYear/index.js");

var _index6 = _interopRequireDefault(_index5);

var _index7 = require("../requiredArgs/index.js");

var _index8 = _interopRequireDefault(_index7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MILLISECONDS_IN_WEEK = 604800000;
function getUTCWeek(dirtyDate, options) {
  (0, _index8.default)(1, arguments);
  var date = (0, _index2.default)(dirtyDate);
  var diff = (0, _index4.default)(date, options).getTime() - (0, _index6.default)(date, options).getTime();

  // Round the number of days to the nearest integer
  // because the number of milliseconds in a week is not constant
  // (e.g. it's different in the week of the daylight saving time clock shift)
  return Math.round(diff / MILLISECONDS_IN_WEEK) + 1;
}
},{"../../toDate/index.js":243,"../startOfUTCWeek/index.js":557,"../startOfUTCWeekYear/index.js":558,"../requiredArgs/index.js":490}],495:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addLeadingZeros;
function addLeadingZeros(number, targetLength) {
  var sign = number < 0 ? '-' : '';
  var output = Math.abs(number).toString();
  while (output.length < targetLength) {
    output = '0' + output;
  }
  return sign + output;
}
},{}],502:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('../../addLeadingZeros/index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * |     | Unit                           |     | Unit                           |
 * |-----|--------------------------------|-----|--------------------------------|
 * |  a  | AM, PM                         |  A* |                                |
 * |  d  | Day of month                   |  D  |                                |
 * |  h  | Hour [1-12]                    |  H  | Hour [0-23]                    |
 * |  m  | Minute                         |  M  | Month                          |
 * |  s  | Second                         |  S  | Fraction of second             |
 * |  y  | Year (abs)                     |  Y  |                                |
 *
 * Letters marked by * are not implemented but reserved by Unicode standard.
 */
var formatters = {
  // Year
  y: function y(date, token) {
    // From http://www.unicode.org/reports/tr35/tr35-31/tr35-dates.html#Date_Format_tokens
    // | Year     |     y | yy |   yyy |  yyyy | yyyyy |
    // |----------|-------|----|-------|-------|-------|
    // | AD 1     |     1 | 01 |   001 |  0001 | 00001 |
    // | AD 12    |    12 | 12 |   012 |  0012 | 00012 |
    // | AD 123   |   123 | 23 |   123 |  0123 | 00123 |
    // | AD 1234  |  1234 | 34 |  1234 |  1234 | 01234 |
    // | AD 12345 | 12345 | 45 | 12345 | 12345 | 12345 |

    var signedYear = date.getUTCFullYear();
    // Returns 1 for 1 BC (which is year 0 in JavaScript)
    var year = signedYear > 0 ? signedYear : 1 - signedYear;
    return (0, _index2.default)(token === 'yy' ? year % 100 : year, token.length);
  },
  // Month
  M: function M(date, token) {
    var month = date.getUTCMonth();
    return token === 'M' ? String(month + 1) : (0, _index2.default)(month + 1, 2);
  },
  // Day of the month
  d: function d(date, token) {
    return (0, _index2.default)(date.getUTCDate(), token.length);
  },
  // AM or PM
  a: function a(date, token) {
    var dayPeriodEnumValue = date.getUTCHours() / 12 >= 1 ? 'pm' : 'am';
    switch (token) {
      case 'a':
      case 'aa':
        return dayPeriodEnumValue.toUpperCase();
      case 'aaa':
        return dayPeriodEnumValue;
      case 'aaaaa':
        return dayPeriodEnumValue[0];
      case 'aaaa':
      default:
        return dayPeriodEnumValue === 'am' ? 'a.m.' : 'p.m.';
    }
  },
  // Hour [1-12]
  h: function h(date, token) {
    return (0, _index2.default)(date.getUTCHours() % 12 || 12, token.length);
  },
  // Hour [0-23]
  H: function H(date, token) {
    return (0, _index2.default)(date.getUTCHours(), token.length);
  },
  // Minute
  m: function m(date, token) {
    return (0, _index2.default)(date.getUTCMinutes(), token.length);
  },
  // Second
  s: function s(date, token) {
    return (0, _index2.default)(date.getUTCSeconds(), token.length);
  },
  // Fraction of second
  S: function S(date, token) {
    var numberOfDigits = token.length;
    var milliseconds = date.getUTCMilliseconds();
    var fractionalSeconds = Math.floor(milliseconds * Math.pow(10, numberOfDigits - 3));
    return (0, _index2.default)(fractionalSeconds, token.length);
  }
};
exports.default = formatters;
},{"../../addLeadingZeros/index.js":495}],500:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require("../../../_lib/getUTCDayOfYear/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../../../_lib/getUTCISOWeek/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../../../_lib/getUTCISOWeekYear/index.js");

var _index6 = _interopRequireDefault(_index5);

var _index7 = require("../../../_lib/getUTCWeek/index.js");

var _index8 = _interopRequireDefault(_index7);

var _index9 = require("../../../_lib/getUTCWeekYear/index.js");

var _index10 = _interopRequireDefault(_index9);

var _index11 = require("../../addLeadingZeros/index.js");

var _index12 = _interopRequireDefault(_index11);

var _index13 = require("../lightFormatters/index.js");

var _index14 = _interopRequireDefault(_index13);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dayPeriodEnum = {
  am: 'am',
  pm: 'pm',
  midnight: 'midnight',
  noon: 'noon',
  morning: 'morning',
  afternoon: 'afternoon',
  evening: 'evening',
  night: 'night'
};
/*
 * |     | Unit                           |     | Unit                           |
 * |-----|--------------------------------|-----|--------------------------------|
 * |  a  | AM, PM                         |  A* | Milliseconds in day            |
 * |  b  | AM, PM, noon, midnight         |  B  | Flexible day period            |
 * |  c  | Stand-alone local day of week  |  C* | Localized hour w/ day period   |
 * |  d  | Day of month                   |  D  | Day of year                    |
 * |  e  | Local day of week              |  E  | Day of week                    |
 * |  f  |                                |  F* | Day of week in month           |
 * |  g* | Modified Julian day            |  G  | Era                            |
 * |  h  | Hour [1-12]                    |  H  | Hour [0-23]                    |
 * |  i! | ISO day of week                |  I! | ISO week of year               |
 * |  j* | Localized hour w/ day period   |  J* | Localized hour w/o day period  |
 * |  k  | Hour [1-24]                    |  K  | Hour [0-11]                    |
 * |  l* | (deprecated)                   |  L  | Stand-alone month              |
 * |  m  | Minute                         |  M  | Month                          |
 * |  n  |                                |  N  |                                |
 * |  o! | Ordinal number modifier        |  O  | Timezone (GMT)                 |
 * |  p! | Long localized time            |  P! | Long localized date            |
 * |  q  | Stand-alone quarter            |  Q  | Quarter                        |
 * |  r* | Related Gregorian year         |  R! | ISO week-numbering year        |
 * |  s  | Second                         |  S  | Fraction of second             |
 * |  t! | Seconds timestamp              |  T! | Milliseconds timestamp         |
 * |  u  | Extended year                  |  U* | Cyclic year                    |
 * |  v* | Timezone (generic non-locat.)  |  V* | Timezone (location)            |
 * |  w  | Local week of year             |  W* | Week of month                  |
 * |  x  | Timezone (ISO-8601 w/o Z)      |  X  | Timezone (ISO-8601)            |
 * |  y  | Year (abs)                     |  Y  | Local week-numbering year      |
 * |  z  | Timezone (specific non-locat.) |  Z* | Timezone (aliases)             |
 *
 * Letters marked by * are not implemented but reserved by Unicode standard.
 *
 * Letters marked by ! are non-standard, but implemented by date-fns:
 * - `o` modifies the previous token to turn it into an ordinal (see `format` docs)
 * - `i` is ISO day of week. For `i` and `ii` is returns numeric ISO week days,
 *   i.e. 7 for Sunday, 1 for Monday, etc.
 * - `I` is ISO week of year, as opposed to `w` which is local week of year.
 * - `R` is ISO week-numbering year, as opposed to `Y` which is local week-numbering year.
 *   `R` is supposed to be used in conjunction with `I` and `i`
 *   for universal ISO week-numbering date, whereas
 *   `Y` is supposed to be used in conjunction with `w` and `e`
 *   for week-numbering date specific to the locale.
 * - `P` is long localized date format
 * - `p` is long localized time format
 */

var formatters = {
  // Era
  G: function G(date, token, localize) {
    var era = date.getUTCFullYear() > 0 ? 1 : 0;
    switch (token) {
      // AD, BC
      case 'G':
      case 'GG':
      case 'GGG':
        return localize.era(era, {
          width: 'abbreviated'
        });
      // A, B
      case 'GGGGG':
        return localize.era(era, {
          width: 'narrow'
        });
      // Anno Domini, Before Christ
      case 'GGGG':
      default:
        return localize.era(era, {
          width: 'wide'
        });
    }
  },
  // Year
  y: function y(date, token, localize) {
    // Ordinal number
    if (token === 'yo') {
      var signedYear = date.getUTCFullYear();
      // Returns 1 for 1 BC (which is year 0 in JavaScript)
      var year = signedYear > 0 ? signedYear : 1 - signedYear;
      return localize.ordinalNumber(year, {
        unit: 'year'
      });
    }
    return _index14.default.y(date, token);
  },
  // Local week-numbering year
  Y: function Y(date, token, localize, options) {
    var signedWeekYear = (0, _index10.default)(date, options);
    // Returns 1 for 1 BC (which is year 0 in JavaScript)
    var weekYear = signedWeekYear > 0 ? signedWeekYear : 1 - signedWeekYear;

    // Two digit year
    if (token === 'YY') {
      var twoDigitYear = weekYear % 100;
      return (0, _index12.default)(twoDigitYear, 2);
    }

    // Ordinal number
    if (token === 'Yo') {
      return localize.ordinalNumber(weekYear, {
        unit: 'year'
      });
    }

    // Padding
    return (0, _index12.default)(weekYear, token.length);
  },
  // ISO week-numbering year
  R: function R(date, token) {
    var isoWeekYear = (0, _index6.default)(date);

    // Padding
    return (0, _index12.default)(isoWeekYear, token.length);
  },
  // Extended year. This is a single number designating the year of this calendar system.
  // The main difference between `y` and `u` localizers are B.C. years:
  // | Year | `y` | `u` |
  // |------|-----|-----|
  // | AC 1 |   1 |   1 |
  // | BC 1 |   1 |   0 |
  // | BC 2 |   2 |  -1 |
  // Also `yy` always returns the last two digits of a year,
  // while `uu` pads single digit years to 2 characters and returns other years unchanged.
  u: function u(date, token) {
    var year = date.getUTCFullYear();
    return (0, _index12.default)(year, token.length);
  },
  // Quarter
  Q: function Q(date, token, localize) {
    var quarter = Math.ceil((date.getUTCMonth() + 1) / 3);
    switch (token) {
      // 1, 2, 3, 4
      case 'Q':
        return String(quarter);
      // 01, 02, 03, 04
      case 'QQ':
        return (0, _index12.default)(quarter, 2);
      // 1st, 2nd, 3rd, 4th
      case 'Qo':
        return localize.ordinalNumber(quarter, {
          unit: 'quarter'
        });
      // Q1, Q2, Q3, Q4
      case 'QQQ':
        return localize.quarter(quarter, {
          width: 'abbreviated',
          context: 'formatting'
        });
      // 1, 2, 3, 4 (narrow quarter; could be not numerical)
      case 'QQQQQ':
        return localize.quarter(quarter, {
          width: 'narrow',
          context: 'formatting'
        });
      // 1st quarter, 2nd quarter, ...
      case 'QQQQ':
      default:
        return localize.quarter(quarter, {
          width: 'wide',
          context: 'formatting'
        });
    }
  },
  // Stand-alone quarter
  q: function q(date, token, localize) {
    var quarter = Math.ceil((date.getUTCMonth() + 1) / 3);
    switch (token) {
      // 1, 2, 3, 4
      case 'q':
        return String(quarter);
      // 01, 02, 03, 04
      case 'qq':
        return (0, _index12.default)(quarter, 2);
      // 1st, 2nd, 3rd, 4th
      case 'qo':
        return localize.ordinalNumber(quarter, {
          unit: 'quarter'
        });
      // Q1, Q2, Q3, Q4
      case 'qqq':
        return localize.quarter(quarter, {
          width: 'abbreviated',
          context: 'standalone'
        });
      // 1, 2, 3, 4 (narrow quarter; could be not numerical)
      case 'qqqqq':
        return localize.quarter(quarter, {
          width: 'narrow',
          context: 'standalone'
        });
      // 1st quarter, 2nd quarter, ...
      case 'qqqq':
      default:
        return localize.quarter(quarter, {
          width: 'wide',
          context: 'standalone'
        });
    }
  },
  // Month
  M: function M(date, token, localize) {
    var month = date.getUTCMonth();
    switch (token) {
      case 'M':
      case 'MM':
        return _index14.default.M(date, token);
      // 1st, 2nd, ..., 12th
      case 'Mo':
        return localize.ordinalNumber(month + 1, {
          unit: 'month'
        });
      // Jan, Feb, ..., Dec
      case 'MMM':
        return localize.month(month, {
          width: 'abbreviated',
          context: 'formatting'
        });
      // J, F, ..., D
      case 'MMMMM':
        return localize.month(month, {
          width: 'narrow',
          context: 'formatting'
        });
      // January, February, ..., December
      case 'MMMM':
      default:
        return localize.month(month, {
          width: 'wide',
          context: 'formatting'
        });
    }
  },
  // Stand-alone month
  L: function L(date, token, localize) {
    var month = date.getUTCMonth();
    switch (token) {
      // 1, 2, ..., 12
      case 'L':
        return String(month + 1);
      // 01, 02, ..., 12
      case 'LL':
        return (0, _index12.default)(month + 1, 2);
      // 1st, 2nd, ..., 12th
      case 'Lo':
        return localize.ordinalNumber(month + 1, {
          unit: 'month'
        });
      // Jan, Feb, ..., Dec
      case 'LLL':
        return localize.month(month, {
          width: 'abbreviated',
          context: 'standalone'
        });
      // J, F, ..., D
      case 'LLLLL':
        return localize.month(month, {
          width: 'narrow',
          context: 'standalone'
        });
      // January, February, ..., December
      case 'LLLL':
      default:
        return localize.month(month, {
          width: 'wide',
          context: 'standalone'
        });
    }
  },
  // Local week of year
  w: function w(date, token, localize, options) {
    var week = (0, _index8.default)(date, options);
    if (token === 'wo') {
      return localize.ordinalNumber(week, {
        unit: 'week'
      });
    }
    return (0, _index12.default)(week, token.length);
  },
  // ISO week of year
  I: function I(date, token, localize) {
    var isoWeek = (0, _index4.default)(date);
    if (token === 'Io') {
      return localize.ordinalNumber(isoWeek, {
        unit: 'week'
      });
    }
    return (0, _index12.default)(isoWeek, token.length);
  },
  // Day of the month
  d: function d(date, token, localize) {
    if (token === 'do') {
      return localize.ordinalNumber(date.getUTCDate(), {
        unit: 'date'
      });
    }
    return _index14.default.d(date, token);
  },
  // Day of year
  D: function D(date, token, localize) {
    var dayOfYear = (0, _index2.default)(date);
    if (token === 'Do') {
      return localize.ordinalNumber(dayOfYear, {
        unit: 'dayOfYear'
      });
    }
    return (0, _index12.default)(dayOfYear, token.length);
  },
  // Day of week
  E: function E(date, token, localize) {
    var dayOfWeek = date.getUTCDay();
    switch (token) {
      // Tue
      case 'E':
      case 'EE':
      case 'EEE':
        return localize.day(dayOfWeek, {
          width: 'abbreviated',
          context: 'formatting'
        });
      // T
      case 'EEEEE':
        return localize.day(dayOfWeek, {
          width: 'narrow',
          context: 'formatting'
        });
      // Tu
      case 'EEEEEE':
        return localize.day(dayOfWeek, {
          width: 'short',
          context: 'formatting'
        });
      // Tuesday
      case 'EEEE':
      default:
        return localize.day(dayOfWeek, {
          width: 'wide',
          context: 'formatting'
        });
    }
  },
  // Local day of week
  e: function e(date, token, localize, options) {
    var dayOfWeek = date.getUTCDay();
    var localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
    switch (token) {
      // Numerical value (Nth day of week with current locale or weekStartsOn)
      case 'e':
        return String(localDayOfWeek);
      // Padded numerical value
      case 'ee':
        return (0, _index12.default)(localDayOfWeek, 2);
      // 1st, 2nd, ..., 7th
      case 'eo':
        return localize.ordinalNumber(localDayOfWeek, {
          unit: 'day'
        });
      case 'eee':
        return localize.day(dayOfWeek, {
          width: 'abbreviated',
          context: 'formatting'
        });
      // T
      case 'eeeee':
        return localize.day(dayOfWeek, {
          width: 'narrow',
          context: 'formatting'
        });
      // Tu
      case 'eeeeee':
        return localize.day(dayOfWeek, {
          width: 'short',
          context: 'formatting'
        });
      // Tuesday
      case 'eeee':
      default:
        return localize.day(dayOfWeek, {
          width: 'wide',
          context: 'formatting'
        });
    }
  },
  // Stand-alone local day of week
  c: function c(date, token, localize, options) {
    var dayOfWeek = date.getUTCDay();
    var localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
    switch (token) {
      // Numerical value (same as in `e`)
      case 'c':
        return String(localDayOfWeek);
      // Padded numerical value
      case 'cc':
        return (0, _index12.default)(localDayOfWeek, token.length);
      // 1st, 2nd, ..., 7th
      case 'co':
        return localize.ordinalNumber(localDayOfWeek, {
          unit: 'day'
        });
      case 'ccc':
        return localize.day(dayOfWeek, {
          width: 'abbreviated',
          context: 'standalone'
        });
      // T
      case 'ccccc':
        return localize.day(dayOfWeek, {
          width: 'narrow',
          context: 'standalone'
        });
      // Tu
      case 'cccccc':
        return localize.day(dayOfWeek, {
          width: 'short',
          context: 'standalone'
        });
      // Tuesday
      case 'cccc':
      default:
        return localize.day(dayOfWeek, {
          width: 'wide',
          context: 'standalone'
        });
    }
  },
  // ISO day of week
  i: function i(date, token, localize) {
    var dayOfWeek = date.getUTCDay();
    var isoDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;
    switch (token) {
      // 2
      case 'i':
        return String(isoDayOfWeek);
      // 02
      case 'ii':
        return (0, _index12.default)(isoDayOfWeek, token.length);
      // 2nd
      case 'io':
        return localize.ordinalNumber(isoDayOfWeek, {
          unit: 'day'
        });
      // Tue
      case 'iii':
        return localize.day(dayOfWeek, {
          width: 'abbreviated',
          context: 'formatting'
        });
      // T
      case 'iiiii':
        return localize.day(dayOfWeek, {
          width: 'narrow',
          context: 'formatting'
        });
      // Tu
      case 'iiiiii':
        return localize.day(dayOfWeek, {
          width: 'short',
          context: 'formatting'
        });
      // Tuesday
      case 'iiii':
      default:
        return localize.day(dayOfWeek, {
          width: 'wide',
          context: 'formatting'
        });
    }
  },
  // AM or PM
  a: function a(date, token, localize) {
    var hours = date.getUTCHours();
    var dayPeriodEnumValue = hours / 12 >= 1 ? 'pm' : 'am';
    switch (token) {
      case 'a':
      case 'aa':
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'abbreviated',
          context: 'formatting'
        });
      case 'aaa':
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'abbreviated',
          context: 'formatting'
        }).toLowerCase();
      case 'aaaaa':
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'narrow',
          context: 'formatting'
        });
      case 'aaaa':
      default:
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'wide',
          context: 'formatting'
        });
    }
  },
  // AM, PM, midnight, noon
  b: function b(date, token, localize) {
    var hours = date.getUTCHours();
    var dayPeriodEnumValue;
    if (hours === 12) {
      dayPeriodEnumValue = dayPeriodEnum.noon;
    } else if (hours === 0) {
      dayPeriodEnumValue = dayPeriodEnum.midnight;
    } else {
      dayPeriodEnumValue = hours / 12 >= 1 ? 'pm' : 'am';
    }
    switch (token) {
      case 'b':
      case 'bb':
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'abbreviated',
          context: 'formatting'
        });
      case 'bbb':
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'abbreviated',
          context: 'formatting'
        }).toLowerCase();
      case 'bbbbb':
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'narrow',
          context: 'formatting'
        });
      case 'bbbb':
      default:
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'wide',
          context: 'formatting'
        });
    }
  },
  // in the morning, in the afternoon, in the evening, at night
  B: function B(date, token, localize) {
    var hours = date.getUTCHours();
    var dayPeriodEnumValue;
    if (hours >= 17) {
      dayPeriodEnumValue = dayPeriodEnum.evening;
    } else if (hours >= 12) {
      dayPeriodEnumValue = dayPeriodEnum.afternoon;
    } else if (hours >= 4) {
      dayPeriodEnumValue = dayPeriodEnum.morning;
    } else {
      dayPeriodEnumValue = dayPeriodEnum.night;
    }
    switch (token) {
      case 'B':
      case 'BB':
      case 'BBB':
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'abbreviated',
          context: 'formatting'
        });
      case 'BBBBB':
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'narrow',
          context: 'formatting'
        });
      case 'BBBB':
      default:
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'wide',
          context: 'formatting'
        });
    }
  },
  // Hour [1-12]
  h: function h(date, token, localize) {
    if (token === 'ho') {
      var hours = date.getUTCHours() % 12;
      if (hours === 0) hours = 12;
      return localize.ordinalNumber(hours, {
        unit: 'hour'
      });
    }
    return _index14.default.h(date, token);
  },
  // Hour [0-23]
  H: function H(date, token, localize) {
    if (token === 'Ho') {
      return localize.ordinalNumber(date.getUTCHours(), {
        unit: 'hour'
      });
    }
    return _index14.default.H(date, token);
  },
  // Hour [0-11]
  K: function K(date, token, localize) {
    var hours = date.getUTCHours() % 12;
    if (token === 'Ko') {
      return localize.ordinalNumber(hours, {
        unit: 'hour'
      });
    }
    return (0, _index12.default)(hours, token.length);
  },
  // Hour [1-24]
  k: function k(date, token, localize) {
    var hours = date.getUTCHours();
    if (hours === 0) hours = 24;
    if (token === 'ko') {
      return localize.ordinalNumber(hours, {
        unit: 'hour'
      });
    }
    return (0, _index12.default)(hours, token.length);
  },
  // Minute
  m: function m(date, token, localize) {
    if (token === 'mo') {
      return localize.ordinalNumber(date.getUTCMinutes(), {
        unit: 'minute'
      });
    }
    return _index14.default.m(date, token);
  },
  // Second
  s: function s(date, token, localize) {
    if (token === 'so') {
      return localize.ordinalNumber(date.getUTCSeconds(), {
        unit: 'second'
      });
    }
    return _index14.default.s(date, token);
  },
  // Fraction of second
  S: function S(date, token) {
    return _index14.default.S(date, token);
  },
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function X(date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timezoneOffset = originalDate.getTimezoneOffset();
    if (timezoneOffset === 0) {
      return 'Z';
    }
    switch (token) {
      // Hours and optional minutes
      case 'X':
        return formatTimezoneWithOptionalMinutes(timezoneOffset);

      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XX`
      case 'XXXX':
      case 'XX':
        // Hours and minutes without `:` delimiter
        return formatTimezone(timezoneOffset);

      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XXX`
      case 'XXXXX':
      case 'XXX': // Hours and minutes with `:` delimiter
      default:
        return formatTimezone(timezoneOffset, ':');
    }
  },
  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function x(date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timezoneOffset = originalDate.getTimezoneOffset();
    switch (token) {
      // Hours and optional minutes
      case 'x':
        return formatTimezoneWithOptionalMinutes(timezoneOffset);

      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xx`
      case 'xxxx':
      case 'xx':
        // Hours and minutes without `:` delimiter
        return formatTimezone(timezoneOffset);

      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xxx`
      case 'xxxxx':
      case 'xxx': // Hours and minutes with `:` delimiter
      default:
        return formatTimezone(timezoneOffset, ':');
    }
  },
  // Timezone (GMT)
  O: function O(date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timezoneOffset = originalDate.getTimezoneOffset();
    switch (token) {
      // Short
      case 'O':
      case 'OO':
      case 'OOO':
        return 'GMT' + formatTimezoneShort(timezoneOffset, ':');
      // Long
      case 'OOOO':
      default:
        return 'GMT' + formatTimezone(timezoneOffset, ':');
    }
  },
  // Timezone (specific non-location)
  z: function z(date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timezoneOffset = originalDate.getTimezoneOffset();
    switch (token) {
      // Short
      case 'z':
      case 'zz':
      case 'zzz':
        return 'GMT' + formatTimezoneShort(timezoneOffset, ':');
      // Long
      case 'zzzz':
      default:
        return 'GMT' + formatTimezone(timezoneOffset, ':');
    }
  },
  // Seconds timestamp
  t: function t(date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timestamp = Math.floor(originalDate.getTime() / 1000);
    return (0, _index12.default)(timestamp, token.length);
  },
  // Milliseconds timestamp
  T: function T(date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timestamp = originalDate.getTime();
    return (0, _index12.default)(timestamp, token.length);
  }
};
function formatTimezoneShort(offset, dirtyDelimiter) {
  var sign = offset > 0 ? '-' : '+';
  var absOffset = Math.abs(offset);
  var hours = Math.floor(absOffset / 60);
  var minutes = absOffset % 60;
  if (minutes === 0) {
    return sign + String(hours);
  }
  var delimiter = dirtyDelimiter || '';
  return sign + String(hours) + delimiter + (0, _index12.default)(minutes, 2);
}
function formatTimezoneWithOptionalMinutes(offset, dirtyDelimiter) {
  if (offset % 60 === 0) {
    var sign = offset > 0 ? '-' : '+';
    return sign + (0, _index12.default)(Math.abs(offset) / 60, 2);
  }
  return formatTimezone(offset, dirtyDelimiter);
}
function formatTimezone(offset, dirtyDelimiter) {
  var delimiter = dirtyDelimiter || '';
  var sign = offset > 0 ? '-' : '+';
  var absOffset = Math.abs(offset);
  var hours = (0, _index12.default)(Math.floor(absOffset / 60), 2);
  var minutes = (0, _index12.default)(absOffset % 60, 2);
  return sign + hours + delimiter + minutes;
}
exports.default = formatters;
},{"../../../_lib/getUTCDayOfYear/index.js":507,"../../../_lib/getUTCISOWeek/index.js":508,"../../../_lib/getUTCISOWeekYear/index.js":509,"../../../_lib/getUTCWeek/index.js":510,"../../../_lib/getUTCWeekYear/index.js":511,"../../addLeadingZeros/index.js":495,"../lightFormatters/index.js":502}],501:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var dateLongFormatter = function dateLongFormatter(pattern, formatLong) {
  switch (pattern) {
    case 'P':
      return formatLong.date({
        width: 'short'
      });
    case 'PP':
      return formatLong.date({
        width: 'medium'
      });
    case 'PPP':
      return formatLong.date({
        width: 'long'
      });
    case 'PPPP':
    default:
      return formatLong.date({
        width: 'full'
      });
  }
};
var timeLongFormatter = function timeLongFormatter(pattern, formatLong) {
  switch (pattern) {
    case 'p':
      return formatLong.time({
        width: 'short'
      });
    case 'pp':
      return formatLong.time({
        width: 'medium'
      });
    case 'ppp':
      return formatLong.time({
        width: 'long'
      });
    case 'pppp':
    default:
      return formatLong.time({
        width: 'full'
      });
  }
};
var dateTimeLongFormatter = function dateTimeLongFormatter(pattern, formatLong) {
  var matchResult = pattern.match(/(P+)(p+)?/) || [];
  var datePattern = matchResult[1];
  var timePattern = matchResult[2];
  if (!timePattern) {
    return dateLongFormatter(pattern, formatLong);
  }
  var dateTimeFormat;
  switch (datePattern) {
    case 'P':
      dateTimeFormat = formatLong.dateTime({
        width: 'short'
      });
      break;
    case 'PP':
      dateTimeFormat = formatLong.dateTime({
        width: 'medium'
      });
      break;
    case 'PPP':
      dateTimeFormat = formatLong.dateTime({
        width: 'long'
      });
      break;
    case 'PPPP':
    default:
      dateTimeFormat = formatLong.dateTime({
        width: 'full'
      });
      break;
  }
  return dateTimeFormat.replace('{{date}}', dateLongFormatter(datePattern, formatLong)).replace('{{time}}', timeLongFormatter(timePattern, formatLong));
};
var longFormatters = {
  p: timeLongFormatter,
  P: dateTimeLongFormatter
};
exports.default = longFormatters;
},{}],499:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isProtectedDayOfYearToken = isProtectedDayOfYearToken;
exports.isProtectedWeekYearToken = isProtectedWeekYearToken;
exports.throwProtectedError = throwProtectedError;
var protectedDayOfYearTokens = ['D', 'DD'];
var protectedWeekYearTokens = ['YY', 'YYYY'];
function isProtectedDayOfYearToken(token) {
  return protectedDayOfYearTokens.indexOf(token) !== -1;
}
function isProtectedWeekYearToken(token) {
  return protectedWeekYearTokens.indexOf(token) !== -1;
}
function throwProtectedError(token, format, input) {
  if (token === 'YYYY') {
    throw new RangeError("Use `yyyy` instead of `YYYY` (in `".concat(format, "`) for formatting years to the input `").concat(input, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
  } else if (token === 'YY') {
    throw new RangeError("Use `yy` instead of `YY` (in `".concat(format, "`) for formatting years to the input `").concat(input, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
  } else if (token === 'D') {
    throw new RangeError("Use `d` instead of `D` (in `".concat(format, "`) for formatting days of the month to the input `").concat(input, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
  } else if (token === 'DD') {
    throw new RangeError("Use `dd` instead of `DD` (in `".concat(format, "`) for formatting days of the month to the input `").concat(input, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
  }
}
},{}],550:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var formatDistanceLocale = {
  lessThanXSeconds: {
    one: 'less than a second',
    other: 'less than {{count}} seconds'
  },
  xSeconds: {
    one: '1 second',
    other: '{{count}} seconds'
  },
  halfAMinute: 'half a minute',
  lessThanXMinutes: {
    one: 'less than a minute',
    other: 'less than {{count}} minutes'
  },
  xMinutes: {
    one: '1 minute',
    other: '{{count}} minutes'
  },
  aboutXHours: {
    one: 'about 1 hour',
    other: 'about {{count}} hours'
  },
  xHours: {
    one: '1 hour',
    other: '{{count}} hours'
  },
  xDays: {
    one: '1 day',
    other: '{{count}} days'
  },
  aboutXWeeks: {
    one: 'about 1 week',
    other: 'about {{count}} weeks'
  },
  xWeeks: {
    one: '1 week',
    other: '{{count}} weeks'
  },
  aboutXMonths: {
    one: 'about 1 month',
    other: 'about {{count}} months'
  },
  xMonths: {
    one: '1 month',
    other: '{{count}} months'
  },
  aboutXYears: {
    one: 'about 1 year',
    other: 'about {{count}} years'
  },
  xYears: {
    one: '1 year',
    other: '{{count}} years'
  },
  overXYears: {
    one: 'over 1 year',
    other: 'over {{count}} years'
  },
  almostXYears: {
    one: 'almost 1 year',
    other: 'almost {{count}} years'
  }
};
var formatDistance = function formatDistance(token, count, options) {
  var result;
  var tokenValue = formatDistanceLocale[token];
  if (typeof tokenValue === 'string') {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace('{{count}}', count.toString());
  }
  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return 'in ' + result;
    } else {
      return result + ' ago';
    }
  }
  return result;
};
exports.default = formatDistance;
},{}],567:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildFormatLongFn;
function buildFormatLongFn(args) {
  return function () {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    // TODO: Remove String()
    var width = options.width ? String(options.width) : args.defaultWidth;
    var format = args.formats[width] || args.formats[args.defaultWidth];
    return format;
  };
}
},{}],548:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('../../../_lib/buildFormatLongFn/index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dateFormats = {
  full: 'EEEE, MMMM do, y',
  long: 'MMMM do, y',
  medium: 'MMM d, y',
  short: 'MM/dd/yyyy'
};
var timeFormats = {
  full: 'h:mm:ss a zzzz',
  long: 'h:mm:ss a z',
  medium: 'h:mm:ss a',
  short: 'h:mm a'
};
var dateTimeFormats = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: '{{date}}, {{time}}',
  short: '{{date}}, {{time}}'
};
var formatLong = {
  date: (0, _index2.default)({
    formats: dateFormats,
    defaultWidth: 'full'
  }),
  time: (0, _index2.default)({
    formats: timeFormats,
    defaultWidth: 'full'
  }),
  dateTime: (0, _index2.default)({
    formats: dateTimeFormats,
    defaultWidth: 'full'
  })
};
exports.default = formatLong;
},{"../../../_lib/buildFormatLongFn/index.js":567}],549:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var formatRelativeLocale = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: 'P'
};
var formatRelative = function formatRelative(token, _date, _baseDate, _options) {
  return formatRelativeLocale[token];
};
exports.default = formatRelative;
},{}],569:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildLocalizeFn;
function buildLocalizeFn(args) {
  return function (dirtyIndex, options) {
    var context = options !== null && options !== void 0 && options.context ? String(options.context) : 'standalone';
    var valuesArray;
    if (context === 'formatting' && args.formattingValues) {
      var defaultWidth = args.defaultFormattingWidth || args.defaultWidth;
      var width = options !== null && options !== void 0 && options.width ? String(options.width) : defaultWidth;
      valuesArray = args.formattingValues[width] || args.formattingValues[defaultWidth];
    } else {
      var _defaultWidth = args.defaultWidth;
      var _width = options !== null && options !== void 0 && options.width ? String(options.width) : args.defaultWidth;
      valuesArray = args.values[_width] || args.values[_defaultWidth];
    }
    var index = args.argumentCallback ? args.argumentCallback(dirtyIndex) : dirtyIndex;
    // @ts-ignore: For some reason TypeScript just don't want to match it, no matter how hard we try. I challenge you to try to remove it!
    return valuesArray[index];
  };
}
},{}],551:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('../../../_lib/buildLocalizeFn/index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var eraValues = {
  narrow: ['B', 'A'],
  abbreviated: ['BC', 'AD'],
  wide: ['Before Christ', 'Anno Domini']
};
var quarterValues = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['Q1', 'Q2', 'Q3', 'Q4'],
  wide: ['1st quarter', '2nd quarter', '3rd quarter', '4th quarter']
};

// Note: in English, the names of days of the week and months are capitalized.
// If you are making a new locale based on this one, check if the same is true for the language you're working on.
// Generally, formatted dates should look like they are in the middle of a sentence,
// e.g. in Spanish language the weekdays and months should be in the lowercase.
var monthValues = {
  narrow: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  abbreviated: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  wide: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
};
var dayValues = {
  narrow: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  short: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  abbreviated: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  wide: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
};
var dayPeriodValues = {
  narrow: {
    am: 'a',
    pm: 'p',
    midnight: 'mi',
    noon: 'n',
    morning: 'morning',
    afternoon: 'afternoon',
    evening: 'evening',
    night: 'night'
  },
  abbreviated: {
    am: 'AM',
    pm: 'PM',
    midnight: 'midnight',
    noon: 'noon',
    morning: 'morning',
    afternoon: 'afternoon',
    evening: 'evening',
    night: 'night'
  },
  wide: {
    am: 'a.m.',
    pm: 'p.m.',
    midnight: 'midnight',
    noon: 'noon',
    morning: 'morning',
    afternoon: 'afternoon',
    evening: 'evening',
    night: 'night'
  }
};
var formattingDayPeriodValues = {
  narrow: {
    am: 'a',
    pm: 'p',
    midnight: 'mi',
    noon: 'n',
    morning: 'in the morning',
    afternoon: 'in the afternoon',
    evening: 'in the evening',
    night: 'at night'
  },
  abbreviated: {
    am: 'AM',
    pm: 'PM',
    midnight: 'midnight',
    noon: 'noon',
    morning: 'in the morning',
    afternoon: 'in the afternoon',
    evening: 'in the evening',
    night: 'at night'
  },
  wide: {
    am: 'a.m.',
    pm: 'p.m.',
    midnight: 'midnight',
    noon: 'noon',
    morning: 'in the morning',
    afternoon: 'in the afternoon',
    evening: 'in the evening',
    night: 'at night'
  }
};
var ordinalNumber = function ordinalNumber(dirtyNumber, _options) {
  var number = Number(dirtyNumber);

  // If ordinal numbers depend on context, for example,
  // if they are different for different grammatical genders,
  // use `options.unit`.
  //
  // `unit` can be 'year', 'quarter', 'month', 'week', 'date', 'dayOfYear',
  // 'day', 'hour', 'minute', 'second'.

  var rem100 = number % 100;
  if (rem100 > 20 || rem100 < 10) {
    switch (rem100 % 10) {
      case 1:
        return number + 'st';
      case 2:
        return number + 'nd';
      case 3:
        return number + 'rd';
    }
  }
  return number + 'th';
};
var localize = {
  ordinalNumber: ordinalNumber,
  era: (0, _index2.default)({
    values: eraValues,
    defaultWidth: 'wide'
  }),
  quarter: (0, _index2.default)({
    values: quarterValues,
    defaultWidth: 'wide',
    argumentCallback: function argumentCallback(quarter) {
      return quarter - 1;
    }
  }),
  month: (0, _index2.default)({
    values: monthValues,
    defaultWidth: 'wide'
  }),
  day: (0, _index2.default)({
    values: dayValues,
    defaultWidth: 'wide'
  }),
  dayPeriod: (0, _index2.default)({
    values: dayPeriodValues,
    defaultWidth: 'wide',
    formattingValues: formattingDayPeriodValues,
    defaultFormattingWidth: 'wide'
  })
};
exports.default = localize;
},{"../../../_lib/buildLocalizeFn/index.js":569}],571:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildMatchFn;
function buildMatchFn(args) {
  return function (string) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var width = options.width;
    var matchPattern = width && args.matchPatterns[width] || args.matchPatterns[args.defaultMatchWidth];
    var matchResult = string.match(matchPattern);
    if (!matchResult) {
      return null;
    }
    var matchedString = matchResult[0];
    var parsePatterns = width && args.parsePatterns[width] || args.parsePatterns[args.defaultParseWidth];
    var key = Array.isArray(parsePatterns) ? findIndex(parsePatterns, function (pattern) {
      return pattern.test(matchedString);
    }) : findKey(parsePatterns, function (pattern) {
      return pattern.test(matchedString);
    });
    var value;
    value = args.valueCallback ? args.valueCallback(key) : key;
    value = options.valueCallback ? options.valueCallback(value) : value;
    var rest = string.slice(matchedString.length);
    return {
      value: value,
      rest: rest
    };
  };
}
function findKey(object, predicate) {
  for (var key in object) {
    if (object.hasOwnProperty(key) && predicate(object[key])) {
      return key;
    }
  }
  return undefined;
}
function findIndex(array, predicate) {
  for (var key = 0; key < array.length; key++) {
    if (predicate(array[key])) {
      return key;
    }
  }
  return undefined;
}
},{}],570:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildMatchPatternFn;
function buildMatchPatternFn(args) {
  return function (string) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var matchResult = string.match(args.matchPattern);
    if (!matchResult) return null;
    var matchedString = matchResult[0];
    var parseResult = string.match(args.parsePattern);
    if (!parseResult) return null;
    var value = args.valueCallback ? args.valueCallback(parseResult[0]) : parseResult[0];
    value = options.valueCallback ? options.valueCallback(value) : value;
    var rest = string.slice(matchedString.length);
    return {
      value: value,
      rest: rest
    };
  };
}
},{}],552:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require("../../../_lib/buildMatchFn/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../../../_lib/buildMatchPatternFn/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var matchOrdinalNumberPattern = /^(\d+)(th|st|nd|rd)?/i;
var parseOrdinalNumberPattern = /\d+/i;
var matchEraPatterns = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
};
var parseEraPatterns = {
  any: [/^b/i, /^(a|c)/i]
};
var matchQuarterPatterns = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
};
var parseQuarterPatterns = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
};
var parseMonthPatterns = {
  narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^may/i, /^jun/i, /^jul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
};
var matchDayPatterns = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
};
var parseDayPatterns = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
};
var matchDayPeriodPatterns = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
};
var parseDayPeriodPatterns = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mi/i,
    noon: /^no/i,
    morning: /morning/i,
    afternoon: /afternoon/i,
    evening: /evening/i,
    night: /night/i
  }
};
var match = {
  ordinalNumber: (0, _index4.default)({
    matchPattern: matchOrdinalNumberPattern,
    parsePattern: parseOrdinalNumberPattern,
    valueCallback: function valueCallback(value) {
      return parseInt(value, 10);
    }
  }),
  era: (0, _index2.default)({
    matchPatterns: matchEraPatterns,
    defaultMatchWidth: 'wide',
    parsePatterns: parseEraPatterns,
    defaultParseWidth: 'any'
  }),
  quarter: (0, _index2.default)({
    matchPatterns: matchQuarterPatterns,
    defaultMatchWidth: 'wide',
    parsePatterns: parseQuarterPatterns,
    defaultParseWidth: 'any',
    valueCallback: function valueCallback(index) {
      return index + 1;
    }
  }),
  month: (0, _index2.default)({
    matchPatterns: matchMonthPatterns,
    defaultMatchWidth: 'wide',
    parsePatterns: parseMonthPatterns,
    defaultParseWidth: 'any'
  }),
  day: (0, _index2.default)({
    matchPatterns: matchDayPatterns,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPatterns,
    defaultParseWidth: 'any'
  }),
  dayPeriod: (0, _index2.default)({
    matchPatterns: matchDayPeriodPatterns,
    defaultMatchWidth: 'any',
    parsePatterns: parseDayPeriodPatterns,
    defaultParseWidth: 'any'
  })
};
exports.default = match;
},{"../../../_lib/buildMatchFn/index.js":571,"../../../_lib/buildMatchPatternFn/index.js":570}],505:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require("./_lib/formatDistance/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("./_lib/formatLong/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("./_lib/formatRelative/index.js");

var _index6 = _interopRequireDefault(_index5);

var _index7 = require("./_lib/localize/index.js");

var _index8 = _interopRequireDefault(_index7);

var _index9 = require("./_lib/match/index.js");

var _index10 = _interopRequireDefault(_index9);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @type {Locale}
 * @category Locales
 * @summary English locale (United States).
 * @language English
 * @iso-639-2 eng
 * @author Sasha Koss [@kossnocorp]{@link https://github.com/kossnocorp}
 * @author Lesha Koss [@leshakoss]{@link https://github.com/leshakoss}
 */
var locale = {
  code: 'en-US',
  formatDistance: _index2.default,
  formatLong: _index4.default,
  formatRelative: _index6.default,
  localize: _index8.default,
  match: _index10.default,
  options: {
    weekStartsOn: 0 /* Sunday */
    , firstWeekContainsDate: 1
  }
};
exports.default = locale;
},{"./_lib/formatDistance/index.js":550,"./_lib/formatLong/index.js":548,"./_lib/formatRelative/index.js":549,"./_lib/localize/index.js":551,"./_lib/match/index.js":552}],496:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require("../../locale/en-US/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _index2.default;
},{"../../locale/en-US/index.js":505}],69:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = format;

var _index = require("../isValid/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../subMilliseconds/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../toDate/index.js");

var _index6 = _interopRequireDefault(_index5);

var _index7 = require("../_lib/format/formatters/index.js");

var _index8 = _interopRequireDefault(_index7);

var _index9 = require("../_lib/format/longFormatters/index.js");

var _index10 = _interopRequireDefault(_index9);

var _index11 = require("../_lib/getTimezoneOffsetInMilliseconds/index.js");

var _index12 = _interopRequireDefault(_index11);

var _index13 = require("../_lib/protectedTokens/index.js");

var _index14 = require("../_lib/toInteger/index.js");

var _index15 = _interopRequireDefault(_index14);

var _index16 = require("../_lib/requiredArgs/index.js");

var _index17 = _interopRequireDefault(_index16);

var _index18 = require("../_lib/defaultOptions/index.js");

var _index19 = require("../_lib/defaultLocale/index.js");

var _index20 = _interopRequireDefault(_index19);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This RegExp consists of three parts separated by `|`:
// - [yYQqMLwIdDecihHKkms]o matches any available ordinal number token
//   (one of the certain letters followed by `o`)
// - (\w)\1* matches any sequences of the same letter
// - '' matches two quote characters in a row
// - '(''|[^'])+('|$) matches anything surrounded by two quote characters ('),
//   except a single quote symbol, which ends the sequence.
//   Two quote characters do not end the sequence.
//   If there is no matching single quote
//   then the sequence will continue until the end of the string.
// - . matches any single character unmatched by previous parts of the RegExps
var formattingTokensRegExp = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g;

// This RegExp catches symbols escaped by quotes, and also
// sequences of symbols P, p, and the combinations like `PPPPPPPppppp`
var longFormattingTokensRegExp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;
var escapedStringRegExp = /^'([^]*?)'?$/;
var doubleQuoteRegExp = /''/g;
var unescapedLatinCharacterRegExp = /[a-zA-Z]/;

/**
 * @name format
 * @category Common Helpers
 * @summary Format the date.
 *
 * @description
 * Return the formatted date string in the given format. The result may vary by locale.
 *
 * > ⚠️ Please note that the `format` tokens differ from Moment.js and other libraries.
 * > See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 *
 * The characters wrapped between two single quotes characters (') are escaped.
 * Two single quotes in a row, whether inside or outside a quoted sequence, represent a 'real' single quote.
 * (see the last example)
 *
 * Format of the string is based on Unicode Technical Standard #35:
 * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
 * with a few additions (see note 7 below the table).
 *
 * Accepted patterns:
 * | Unit                            | Pattern | Result examples                   | Notes |
 * |---------------------------------|---------|-----------------------------------|-------|
 * | Era                             | G..GGG  | AD, BC                            |       |
 * |                                 | GGGG    | Anno Domini, Before Christ        | 2     |
 * |                                 | GGGGG   | A, B                              |       |
 * | Calendar year                   | y       | 44, 1, 1900, 2017                 | 5     |
 * |                                 | yo      | 44th, 1st, 0th, 17th              | 5,7   |
 * |                                 | yy      | 44, 01, 00, 17                    | 5     |
 * |                                 | yyy     | 044, 001, 1900, 2017              | 5     |
 * |                                 | yyyy    | 0044, 0001, 1900, 2017            | 5     |
 * |                                 | yyyyy   | ...                               | 3,5   |
 * | Local week-numbering year       | Y       | 44, 1, 1900, 2017                 | 5     |
 * |                                 | Yo      | 44th, 1st, 1900th, 2017th         | 5,7   |
 * |                                 | YY      | 44, 01, 00, 17                    | 5,8   |
 * |                                 | YYY     | 044, 001, 1900, 2017              | 5     |
 * |                                 | YYYY    | 0044, 0001, 1900, 2017            | 5,8   |
 * |                                 | YYYYY   | ...                               | 3,5   |
 * | ISO week-numbering year         | R       | -43, 0, 1, 1900, 2017             | 5,7   |
 * |                                 | RR      | -43, 00, 01, 1900, 2017           | 5,7   |
 * |                                 | RRR     | -043, 000, 001, 1900, 2017        | 5,7   |
 * |                                 | RRRR    | -0043, 0000, 0001, 1900, 2017     | 5,7   |
 * |                                 | RRRRR   | ...                               | 3,5,7 |
 * | Extended year                   | u       | -43, 0, 1, 1900, 2017             | 5     |
 * |                                 | uu      | -43, 01, 1900, 2017               | 5     |
 * |                                 | uuu     | -043, 001, 1900, 2017             | 5     |
 * |                                 | uuuu    | -0043, 0001, 1900, 2017           | 5     |
 * |                                 | uuuuu   | ...                               | 3,5   |
 * | Quarter (formatting)            | Q       | 1, 2, 3, 4                        |       |
 * |                                 | Qo      | 1st, 2nd, 3rd, 4th                | 7     |
 * |                                 | QQ      | 01, 02, 03, 04                    |       |
 * |                                 | QQQ     | Q1, Q2, Q3, Q4                    |       |
 * |                                 | QQQQ    | 1st quarter, 2nd quarter, ...     | 2     |
 * |                                 | QQQQQ   | 1, 2, 3, 4                        | 4     |
 * | Quarter (stand-alone)           | q       | 1, 2, 3, 4                        |       |
 * |                                 | qo      | 1st, 2nd, 3rd, 4th                | 7     |
 * |                                 | qq      | 01, 02, 03, 04                    |       |
 * |                                 | qqq     | Q1, Q2, Q3, Q4                    |       |
 * |                                 | qqqq    | 1st quarter, 2nd quarter, ...     | 2     |
 * |                                 | qqqqq   | 1, 2, 3, 4                        | 4     |
 * | Month (formatting)              | M       | 1, 2, ..., 12                     |       |
 * |                                 | Mo      | 1st, 2nd, ..., 12th               | 7     |
 * |                                 | MM      | 01, 02, ..., 12                   |       |
 * |                                 | MMM     | Jan, Feb, ..., Dec                |       |
 * |                                 | MMMM    | January, February, ..., December  | 2     |
 * |                                 | MMMMM   | J, F, ..., D                      |       |
 * | Month (stand-alone)             | L       | 1, 2, ..., 12                     |       |
 * |                                 | Lo      | 1st, 2nd, ..., 12th               | 7     |
 * |                                 | LL      | 01, 02, ..., 12                   |       |
 * |                                 | LLL     | Jan, Feb, ..., Dec                |       |
 * |                                 | LLLL    | January, February, ..., December  | 2     |
 * |                                 | LLLLL   | J, F, ..., D                      |       |
 * | Local week of year              | w       | 1, 2, ..., 53                     |       |
 * |                                 | wo      | 1st, 2nd, ..., 53th               | 7     |
 * |                                 | ww      | 01, 02, ..., 53                   |       |
 * | ISO week of year                | I       | 1, 2, ..., 53                     | 7     |
 * |                                 | Io      | 1st, 2nd, ..., 53th               | 7     |
 * |                                 | II      | 01, 02, ..., 53                   | 7     |
 * | Day of month                    | d       | 1, 2, ..., 31                     |       |
 * |                                 | do      | 1st, 2nd, ..., 31st               | 7     |
 * |                                 | dd      | 01, 02, ..., 31                   |       |
 * | Day of year                     | D       | 1, 2, ..., 365, 366               | 9     |
 * |                                 | Do      | 1st, 2nd, ..., 365th, 366th       | 7     |
 * |                                 | DD      | 01, 02, ..., 365, 366             | 9     |
 * |                                 | DDD     | 001, 002, ..., 365, 366           |       |
 * |                                 | DDDD    | ...                               | 3     |
 * | Day of week (formatting)        | E..EEE  | Mon, Tue, Wed, ..., Sun           |       |
 * |                                 | EEEE    | Monday, Tuesday, ..., Sunday      | 2     |
 * |                                 | EEEEE   | M, T, W, T, F, S, S               |       |
 * |                                 | EEEEEE  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
 * | ISO day of week (formatting)    | i       | 1, 2, 3, ..., 7                   | 7     |
 * |                                 | io      | 1st, 2nd, ..., 7th                | 7     |
 * |                                 | ii      | 01, 02, ..., 07                   | 7     |
 * |                                 | iii     | Mon, Tue, Wed, ..., Sun           | 7     |
 * |                                 | iiii    | Monday, Tuesday, ..., Sunday      | 2,7   |
 * |                                 | iiiii   | M, T, W, T, F, S, S               | 7     |
 * |                                 | iiiiii  | Mo, Tu, We, Th, Fr, Sa, Su        | 7     |
 * | Local day of week (formatting)  | e       | 2, 3, 4, ..., 1                   |       |
 * |                                 | eo      | 2nd, 3rd, ..., 1st                | 7     |
 * |                                 | ee      | 02, 03, ..., 01                   |       |
 * |                                 | eee     | Mon, Tue, Wed, ..., Sun           |       |
 * |                                 | eeee    | Monday, Tuesday, ..., Sunday      | 2     |
 * |                                 | eeeee   | M, T, W, T, F, S, S               |       |
 * |                                 | eeeeee  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
 * | Local day of week (stand-alone) | c       | 2, 3, 4, ..., 1                   |       |
 * |                                 | co      | 2nd, 3rd, ..., 1st                | 7     |
 * |                                 | cc      | 02, 03, ..., 01                   |       |
 * |                                 | ccc     | Mon, Tue, Wed, ..., Sun           |       |
 * |                                 | cccc    | Monday, Tuesday, ..., Sunday      | 2     |
 * |                                 | ccccc   | M, T, W, T, F, S, S               |       |
 * |                                 | cccccc  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
 * | AM, PM                          | a..aa   | AM, PM                            |       |
 * |                                 | aaa     | am, pm                            |       |
 * |                                 | aaaa    | a.m., p.m.                        | 2     |
 * |                                 | aaaaa   | a, p                              |       |
 * | AM, PM, noon, midnight          | b..bb   | AM, PM, noon, midnight            |       |
 * |                                 | bbb     | am, pm, noon, midnight            |       |
 * |                                 | bbbb    | a.m., p.m., noon, midnight        | 2     |
 * |                                 | bbbbb   | a, p, n, mi                       |       |
 * | Flexible day period             | B..BBB  | at night, in the morning, ...     |       |
 * |                                 | BBBB    | at night, in the morning, ...     | 2     |
 * |                                 | BBBBB   | at night, in the morning, ...     |       |
 * | Hour [1-12]                     | h       | 1, 2, ..., 11, 12                 |       |
 * |                                 | ho      | 1st, 2nd, ..., 11th, 12th         | 7     |
 * |                                 | hh      | 01, 02, ..., 11, 12               |       |
 * | Hour [0-23]                     | H       | 0, 1, 2, ..., 23                  |       |
 * |                                 | Ho      | 0th, 1st, 2nd, ..., 23rd          | 7     |
 * |                                 | HH      | 00, 01, 02, ..., 23               |       |
 * | Hour [0-11]                     | K       | 1, 2, ..., 11, 0                  |       |
 * |                                 | Ko      | 1st, 2nd, ..., 11th, 0th          | 7     |
 * |                                 | KK      | 01, 02, ..., 11, 00               |       |
 * | Hour [1-24]                     | k       | 24, 1, 2, ..., 23                 |       |
 * |                                 | ko      | 24th, 1st, 2nd, ..., 23rd         | 7     |
 * |                                 | kk      | 24, 01, 02, ..., 23               |       |
 * | Minute                          | m       | 0, 1, ..., 59                     |       |
 * |                                 | mo      | 0th, 1st, ..., 59th               | 7     |
 * |                                 | mm      | 00, 01, ..., 59                   |       |
 * | Second                          | s       | 0, 1, ..., 59                     |       |
 * |                                 | so      | 0th, 1st, ..., 59th               | 7     |
 * |                                 | ss      | 00, 01, ..., 59                   |       |
 * | Fraction of second              | S       | 0, 1, ..., 9                      |       |
 * |                                 | SS      | 00, 01, ..., 99                   |       |
 * |                                 | SSS     | 000, 001, ..., 999                |       |
 * |                                 | SSSS    | ...                               | 3     |
 * | Timezone (ISO-8601 w/ Z)        | X       | -08, +0530, Z                     |       |
 * |                                 | XX      | -0800, +0530, Z                   |       |
 * |                                 | XXX     | -08:00, +05:30, Z                 |       |
 * |                                 | XXXX    | -0800, +0530, Z, +123456          | 2     |
 * |                                 | XXXXX   | -08:00, +05:30, Z, +12:34:56      |       |
 * | Timezone (ISO-8601 w/o Z)       | x       | -08, +0530, +00                   |       |
 * |                                 | xx      | -0800, +0530, +0000               |       |
 * |                                 | xxx     | -08:00, +05:30, +00:00            | 2     |
 * |                                 | xxxx    | -0800, +0530, +0000, +123456      |       |
 * |                                 | xxxxx   | -08:00, +05:30, +00:00, +12:34:56 |       |
 * | Timezone (GMT)                  | O...OOO | GMT-8, GMT+5:30, GMT+0            |       |
 * |                                 | OOOO    | GMT-08:00, GMT+05:30, GMT+00:00   | 2     |
 * | Timezone (specific non-locat.)  | z...zzz | GMT-8, GMT+5:30, GMT+0            | 6     |
 * |                                 | zzzz    | GMT-08:00, GMT+05:30, GMT+00:00   | 2,6   |
 * | Seconds timestamp               | t       | 512969520                         | 7     |
 * |                                 | tt      | ...                               | 3,7   |
 * | Milliseconds timestamp          | T       | 512969520900                      | 7     |
 * |                                 | TT      | ...                               | 3,7   |
 * | Long localized date             | P       | 04/29/1453                        | 7     |
 * |                                 | PP      | Apr 29, 1453                      | 7     |
 * |                                 | PPP     | April 29th, 1453                  | 7     |
 * |                                 | PPPP    | Friday, April 29th, 1453          | 2,7   |
 * | Long localized time             | p       | 12:00 AM                          | 7     |
 * |                                 | pp      | 12:00:00 AM                       | 7     |
 * |                                 | ppp     | 12:00:00 AM GMT+2                 | 7     |
 * |                                 | pppp    | 12:00:00 AM GMT+02:00             | 2,7   |
 * | Combination of date and time    | Pp      | 04/29/1453, 12:00 AM              | 7     |
 * |                                 | PPpp    | Apr 29, 1453, 12:00:00 AM         | 7     |
 * |                                 | PPPppp  | April 29th, 1453 at ...           | 7     |
 * |                                 | PPPPpppp| Friday, April 29th, 1453 at ...   | 2,7   |
 * Notes:
 * 1. "Formatting" units (e.g. formatting quarter) in the default en-US locale
 *    are the same as "stand-alone" units, but are different in some languages.
 *    "Formatting" units are declined according to the rules of the language
 *    in the context of a date. "Stand-alone" units are always nominative singular:
 *
 *    `format(new Date(2017, 10, 6), 'do LLLL', {locale: cs}) //=> '6. listopad'`
 *
 *    `format(new Date(2017, 10, 6), 'do MMMM', {locale: cs}) //=> '6. listopadu'`
 *
 * 2. Any sequence of the identical letters is a pattern, unless it is escaped by
 *    the single quote characters (see below).
 *    If the sequence is longer than listed in table (e.g. `EEEEEEEEEEE`)
 *    the output will be the same as default pattern for this unit, usually
 *    the longest one (in case of ISO weekdays, `EEEE`). Default patterns for units
 *    are marked with "2" in the last column of the table.
 *
 *    `format(new Date(2017, 10, 6), 'MMM') //=> 'Nov'`
 *
 *    `format(new Date(2017, 10, 6), 'MMMM') //=> 'November'`
 *
 *    `format(new Date(2017, 10, 6), 'MMMMM') //=> 'N'`
 *
 *    `format(new Date(2017, 10, 6), 'MMMMMM') //=> 'November'`
 *
 *    `format(new Date(2017, 10, 6), 'MMMMMMM') //=> 'November'`
 *
 * 3. Some patterns could be unlimited length (such as `yyyyyyyy`).
 *    The output will be padded with zeros to match the length of the pattern.
 *
 *    `format(new Date(2017, 10, 6), 'yyyyyyyy') //=> '00002017'`
 *
 * 4. `QQQQQ` and `qqqqq` could be not strictly numerical in some locales.
 *    These tokens represent the shortest form of the quarter.
 *
 * 5. The main difference between `y` and `u` patterns are B.C. years:
 *
 *    | Year | `y` | `u` |
 *    |------|-----|-----|
 *    | AC 1 |   1 |   1 |
 *    | BC 1 |   1 |   0 |
 *    | BC 2 |   2 |  -1 |
 *
 *    Also `yy` always returns the last two digits of a year,
 *    while `uu` pads single digit years to 2 characters and returns other years unchanged:
 *
 *    | Year | `yy` | `uu` |
 *    |------|------|------|
 *    | 1    |   01 |   01 |
 *    | 14   |   14 |   14 |
 *    | 376  |   76 |  376 |
 *    | 1453 |   53 | 1453 |
 *
 *    The same difference is true for local and ISO week-numbering years (`Y` and `R`),
 *    except local week-numbering years are dependent on `options.weekStartsOn`
 *    and `options.firstWeekContainsDate` (compare [getISOWeekYear]{@link https://date-fns.org/docs/getISOWeekYear}
 *    and [getWeekYear]{@link https://date-fns.org/docs/getWeekYear}).
 *
 * 6. Specific non-location timezones are currently unavailable in `date-fns`,
 *    so right now these tokens fall back to GMT timezones.
 *
 * 7. These patterns are not in the Unicode Technical Standard #35:
 *    - `i`: ISO day of week
 *    - `I`: ISO week of year
 *    - `R`: ISO week-numbering year
 *    - `t`: seconds timestamp
 *    - `T`: milliseconds timestamp
 *    - `o`: ordinal number modifier
 *    - `P`: long localized date
 *    - `p`: long localized time
 *
 * 8. `YY` and `YYYY` tokens represent week-numbering years but they are often confused with years.
 *    You should enable `options.useAdditionalWeekYearTokens` to use them. See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 *
 * 9. `D` and `DD` tokens represent days of the year but they are often confused with days of the month.
 *    You should enable `options.useAdditionalDayOfYearTokens` to use them. See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 *
 * @param {Date|Number} date - the original date
 * @param {String} format - the string of tokens
 * @param {Object} [options] - an object with options.
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @param {Number} [options.firstWeekContainsDate=1] - the day of January, which is
 * @param {Boolean} [options.useAdditionalWeekYearTokens=false] - if true, allows usage of the week-numbering year tokens `YY` and `YYYY`;
 *   see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 * @param {Boolean} [options.useAdditionalDayOfYearTokens=false] - if true, allows usage of the day of year tokens `D` and `DD`;
 *   see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 * @returns {String} the formatted date string
 * @throws {TypeError} 2 arguments required
 * @throws {RangeError} `date` must not be Invalid Date
 * @throws {RangeError} `options.locale` must contain `localize` property
 * @throws {RangeError} `options.locale` must contain `formatLong` property
 * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
 * @throws {RangeError} `options.firstWeekContainsDate` must be between 1 and 7
 * @throws {RangeError} use `yyyy` instead of `YYYY` for formatting years using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 * @throws {RangeError} use `yy` instead of `YY` for formatting years using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 * @throws {RangeError} use `d` instead of `D` for formatting days of the month using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 * @throws {RangeError} use `dd` instead of `DD` for formatting days of the month using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 * @throws {RangeError} format string contains an unescaped latin alphabet character
 *
 * @example
 * // Represent 11 February 2014 in middle-endian format:
 * const result = format(new Date(2014, 1, 11), 'MM/dd/yyyy')
 * //=> '02/11/2014'
 *
 * @example
 * // Represent 2 July 2014 in Esperanto:
 * import { eoLocale } from 'date-fns/locale/eo'
 * const result = format(new Date(2014, 6, 2), "do 'de' MMMM yyyy", {
 *   locale: eoLocale
 * })
 * //=> '2-a de julio 2014'
 *
 * @example
 * // Escape string by single quote characters:
 * const result = format(new Date(2014, 6, 2, 15), "h 'o''clock'")
 * //=> "3 o'clock"
 */

function format(dirtyDate, dirtyFormatStr, options) {
  var _ref, _options$locale, _ref2, _ref3, _ref4, _options$firstWeekCon, _options$locale2, _options$locale2$opti, _defaultOptions$local, _defaultOptions$local2, _ref5, _ref6, _ref7, _options$weekStartsOn, _options$locale3, _options$locale3$opti, _defaultOptions$local3, _defaultOptions$local4;
  (0, _index17.default)(2, arguments);
  var formatStr = String(dirtyFormatStr);
  var defaultOptions = (0, _index18.getDefaultOptions)();
  var locale = (_ref = (_options$locale = options === null || options === void 0 ? void 0 : options.locale) !== null && _options$locale !== void 0 ? _options$locale : defaultOptions.locale) !== null && _ref !== void 0 ? _ref : _index20.default;
  var firstWeekContainsDate = (0, _index15.default)((_ref2 = (_ref3 = (_ref4 = (_options$firstWeekCon = options === null || options === void 0 ? void 0 : options.firstWeekContainsDate) !== null && _options$firstWeekCon !== void 0 ? _options$firstWeekCon : options === null || options === void 0 ? void 0 : (_options$locale2 = options.locale) === null || _options$locale2 === void 0 ? void 0 : (_options$locale2$opti = _options$locale2.options) === null || _options$locale2$opti === void 0 ? void 0 : _options$locale2$opti.firstWeekContainsDate) !== null && _ref4 !== void 0 ? _ref4 : defaultOptions.firstWeekContainsDate) !== null && _ref3 !== void 0 ? _ref3 : (_defaultOptions$local = defaultOptions.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.firstWeekContainsDate) !== null && _ref2 !== void 0 ? _ref2 : 1);

  // Test if weekStartsOn is between 1 and 7 _and_ is not NaN
  if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {
    throw new RangeError('firstWeekContainsDate must be between 1 and 7 inclusively');
  }
  var weekStartsOn = (0, _index15.default)((_ref5 = (_ref6 = (_ref7 = (_options$weekStartsOn = options === null || options === void 0 ? void 0 : options.weekStartsOn) !== null && _options$weekStartsOn !== void 0 ? _options$weekStartsOn : options === null || options === void 0 ? void 0 : (_options$locale3 = options.locale) === null || _options$locale3 === void 0 ? void 0 : (_options$locale3$opti = _options$locale3.options) === null || _options$locale3$opti === void 0 ? void 0 : _options$locale3$opti.weekStartsOn) !== null && _ref7 !== void 0 ? _ref7 : defaultOptions.weekStartsOn) !== null && _ref6 !== void 0 ? _ref6 : (_defaultOptions$local3 = defaultOptions.locale) === null || _defaultOptions$local3 === void 0 ? void 0 : (_defaultOptions$local4 = _defaultOptions$local3.options) === null || _defaultOptions$local4 === void 0 ? void 0 : _defaultOptions$local4.weekStartsOn) !== null && _ref5 !== void 0 ? _ref5 : 0);

  // Test if weekStartsOn is between 0 and 6 _and_ is not NaN
  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError('weekStartsOn must be between 0 and 6 inclusively');
  }
  if (!locale.localize) {
    throw new RangeError('locale must contain localize property');
  }
  if (!locale.formatLong) {
    throw new RangeError('locale must contain formatLong property');
  }
  var originalDate = (0, _index6.default)(dirtyDate);
  if (!(0, _index2.default)(originalDate)) {
    throw new RangeError('Invalid time value');
  }

  // Convert the date in system timezone to the same date in UTC+00:00 timezone.
  // This ensures that when UTC functions will be implemented, locales will be compatible with them.
  // See an issue about UTC functions: https://github.com/date-fns/date-fns/issues/376
  var timezoneOffset = (0, _index12.default)(originalDate);
  var utcDate = (0, _index4.default)(originalDate, timezoneOffset);
  var formatterOptions = {
    firstWeekContainsDate: firstWeekContainsDate,
    weekStartsOn: weekStartsOn,
    locale: locale,
    _originalDate: originalDate
  };
  var result = formatStr.match(longFormattingTokensRegExp).map(function (substring) {
    var firstCharacter = substring[0];
    if (firstCharacter === 'p' || firstCharacter === 'P') {
      var longFormatter = _index10.default[firstCharacter];
      return longFormatter(substring, locale.formatLong);
    }
    return substring;
  }).join('').match(formattingTokensRegExp).map(function (substring) {
    // Replace two single quote characters with one single quote character
    if (substring === "''") {
      return "'";
    }
    var firstCharacter = substring[0];
    if (firstCharacter === "'") {
      return cleanEscapedString(substring);
    }
    var formatter = _index8.default[firstCharacter];
    if (formatter) {
      if (!(options !== null && options !== void 0 && options.useAdditionalWeekYearTokens) && (0, _index13.isProtectedWeekYearToken)(substring)) {
        (0, _index13.throwProtectedError)(substring, dirtyFormatStr, String(dirtyDate));
      }
      if (!(options !== null && options !== void 0 && options.useAdditionalDayOfYearTokens) && (0, _index13.isProtectedDayOfYearToken)(substring)) {
        (0, _index13.throwProtectedError)(substring, dirtyFormatStr, String(dirtyDate));
      }
      return formatter(utcDate, substring, locale.localize, formatterOptions);
    }
    if (firstCharacter.match(unescapedLatinCharacterRegExp)) {
      throw new RangeError('Format string contains an unescaped latin alphabet character `' + firstCharacter + '`');
    }
    return substring;
  }).join('');
  return result;
}
function cleanEscapedString(input) {
  var matched = input.match(escapedStringRegExp);
  if (!matched) {
    return input;
  }
  return matched[1].replace(doubleQuoteRegExp, "'");
}
},{"../isValid/index.js":151,"../subMilliseconds/index.js":234,"../toDate/index.js":243,"../_lib/format/formatters/index.js":500,"../_lib/format/longFormatters/index.js":501,"../_lib/getTimezoneOffsetInMilliseconds/index.js":492,"../_lib/protectedTokens/index.js":499,"../_lib/toInteger/index.js":491,"../_lib/requiredArgs/index.js":490,"../_lib/defaultOptions/index.js":494,"../_lib/defaultLocale/index.js":496}],498:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = assign;
function assign(target, object) {
  if (target == null) {
    throw new TypeError('assign requires that input parameter not be null or undefined');
  }
  for (var property in object) {
    if (Object.prototype.hasOwnProperty.call(object, property)) {
      ;
      target[property] = object[property];
    }
  }
  return target;
}
},{}],497:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = cloneObject;

var _index = require("../assign/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function cloneObject(object) {
  return (0, _index2.default)({}, object);
}
},{"../assign/index.js":498}],74:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = formatDistance;

var _index = require("../_lib/defaultOptions/index.js");

var _index2 = require("../compareAsc/index.js");

var _index3 = _interopRequireDefault(_index2);

var _index4 = require("../differenceInMonths/index.js");

var _index5 = _interopRequireDefault(_index4);

var _index6 = require("../differenceInSeconds/index.js");

var _index7 = _interopRequireDefault(_index6);

var _index8 = require("../_lib/defaultLocale/index.js");

var _index9 = _interopRequireDefault(_index8);

var _index10 = require("../toDate/index.js");

var _index11 = _interopRequireDefault(_index10);

var _index12 = require("../_lib/cloneObject/index.js");

var _index13 = _interopRequireDefault(_index12);

var _index14 = require("../_lib/assign/index.js");

var _index15 = _interopRequireDefault(_index14);

var _index16 = require("../_lib/getTimezoneOffsetInMilliseconds/index.js");

var _index17 = _interopRequireDefault(_index16);

var _index18 = require("../_lib/requiredArgs/index.js");

var _index19 = _interopRequireDefault(_index18);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MINUTES_IN_DAY = 1440;
var MINUTES_IN_ALMOST_TWO_DAYS = 2520;
var MINUTES_IN_MONTH = 43200;
var MINUTES_IN_TWO_MONTHS = 86400;

/**
 * @name formatDistance
 * @category Common Helpers
 * @summary Return the distance between the given dates in words.
 *
 * @description
 * Return the distance between the given dates in words.
 *
 * | Distance between dates                                            | Result              |
 * |-------------------------------------------------------------------|---------------------|
 * | 0 ... 30 secs                                                     | less than a minute  |
 * | 30 secs ... 1 min 30 secs                                         | 1 minute            |
 * | 1 min 30 secs ... 44 mins 30 secs                                 | [2..44] minutes     |
 * | 44 mins ... 30 secs ... 89 mins 30 secs                           | about 1 hour        |
 * | 89 mins 30 secs ... 23 hrs 59 mins 30 secs                        | about [2..24] hours |
 * | 23 hrs 59 mins 30 secs ... 41 hrs 59 mins 30 secs                 | 1 day               |
 * | 41 hrs 59 mins 30 secs ... 29 days 23 hrs 59 mins 30 secs         | [2..30] days        |
 * | 29 days 23 hrs 59 mins 30 secs ... 44 days 23 hrs 59 mins 30 secs | about 1 month       |
 * | 44 days 23 hrs 59 mins 30 secs ... 59 days 23 hrs 59 mins 30 secs | about 2 months      |
 * | 59 days 23 hrs 59 mins 30 secs ... 1 yr                           | [2..12] months      |
 * | 1 yr ... 1 yr 3 months                                            | about 1 year        |
 * | 1 yr 3 months ... 1 yr 9 month s                                  | over 1 year         |
 * | 1 yr 9 months ... 2 yrs                                           | almost 2 years      |
 * | N yrs ... N yrs 3 months                                          | about N years       |
 * | N yrs 3 months ... N yrs 9 months                                 | over N years        |
 * | N yrs 9 months ... N+1 yrs                                        | almost N+1 years    |
 *
 * With `options.includeSeconds == true`:
 * | Distance between dates | Result               |
 * |------------------------|----------------------|
 * | 0 secs ... 5 secs      | less than 5 seconds  |
 * | 5 secs ... 10 secs     | less than 10 seconds |
 * | 10 secs ... 20 secs    | less than 20 seconds |
 * | 20 secs ... 40 secs    | half a minute        |
 * | 40 secs ... 60 secs    | less than a minute   |
 * | 60 secs ... 90 secs    | 1 minute             |
 *
 * @param {Date|Number} date - the date
 * @param {Date|Number} baseDate - the date to compare with
 * @param {Object} [options] - an object with options.
 * @param {Boolean} [options.includeSeconds=false] - distances less than a minute are more detailed
 * @param {Boolean} [options.addSuffix=false] - result indicates if the second date is earlier or later than the first
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @returns {String} the distance in words
 * @throws {TypeError} 2 arguments required
 * @throws {RangeError} `date` must not be Invalid Date
 * @throws {RangeError} `baseDate` must not be Invalid Date
 * @throws {RangeError} `options.locale` must contain `formatDistance` property
 *
 * @example
 * // What is the distance between 2 July 2014 and 1 January 2015?
 * const result = formatDistance(new Date(2014, 6, 2), new Date(2015, 0, 1))
 * //=> '6 months'
 *
 * @example
 * // What is the distance between 1 January 2015 00:00:15
 * // and 1 January 2015 00:00:00, including seconds?
 * const result = formatDistance(
 *   new Date(2015, 0, 1, 0, 0, 15),
 *   new Date(2015, 0, 1, 0, 0, 0),
 *   { includeSeconds: true }
 * )
 * //=> 'less than 20 seconds'
 *
 * @example
 * // What is the distance from 1 January 2016
 * // to 1 January 2015, with a suffix?
 * const result = formatDistance(new Date(2015, 0, 1), new Date(2016, 0, 1), {
 *   addSuffix: true
 * })
 * //=> 'about 1 year ago'
 *
 * @example
 * // What is the distance between 1 August 2016 and 1 January 2015 in Esperanto?
 * import { eoLocale } from 'date-fns/locale/eo'
 * const result = formatDistance(new Date(2016, 7, 1), new Date(2015, 0, 1), {
 *   locale: eoLocale
 * })
 * //=> 'pli ol 1 jaro'
 */

function formatDistance(dirtyDate, dirtyBaseDate, options) {
  var _ref, _options$locale;
  (0, _index19.default)(2, arguments);
  var defaultOptions = (0, _index.getDefaultOptions)();
  var locale = (_ref = (_options$locale = options === null || options === void 0 ? void 0 : options.locale) !== null && _options$locale !== void 0 ? _options$locale : defaultOptions.locale) !== null && _ref !== void 0 ? _ref : _index9.default;
  if (!locale.formatDistance) {
    throw new RangeError('locale must contain formatDistance property');
  }
  var comparison = (0, _index3.default)(dirtyDate, dirtyBaseDate);
  if (isNaN(comparison)) {
    throw new RangeError('Invalid time value');
  }
  var localizeOptions = (0, _index15.default)((0, _index13.default)(options), {
    addSuffix: Boolean(options === null || options === void 0 ? void 0 : options.addSuffix),
    comparison: comparison
  });
  var dateLeft;
  var dateRight;
  if (comparison > 0) {
    dateLeft = (0, _index11.default)(dirtyBaseDate);
    dateRight = (0, _index11.default)(dirtyDate);
  } else {
    dateLeft = (0, _index11.default)(dirtyDate);
    dateRight = (0, _index11.default)(dirtyBaseDate);
  }
  var seconds = (0, _index7.default)(dateRight, dateLeft);
  var offsetInSeconds = ((0, _index17.default)(dateRight) - (0, _index17.default)(dateLeft)) / 1000;
  var minutes = Math.round((seconds - offsetInSeconds) / 60);
  var months;

  // 0 up to 2 mins
  if (minutes < 2) {
    if (options !== null && options !== void 0 && options.includeSeconds) {
      if (seconds < 5) {
        return locale.formatDistance('lessThanXSeconds', 5, localizeOptions);
      } else if (seconds < 10) {
        return locale.formatDistance('lessThanXSeconds', 10, localizeOptions);
      } else if (seconds < 20) {
        return locale.formatDistance('lessThanXSeconds', 20, localizeOptions);
      } else if (seconds < 40) {
        return locale.formatDistance('halfAMinute', 0, localizeOptions);
      } else if (seconds < 60) {
        return locale.formatDistance('lessThanXMinutes', 1, localizeOptions);
      } else {
        return locale.formatDistance('xMinutes', 1, localizeOptions);
      }
    } else {
      if (minutes === 0) {
        return locale.formatDistance('lessThanXMinutes', 1, localizeOptions);
      } else {
        return locale.formatDistance('xMinutes', minutes, localizeOptions);
      }
    }

    // 2 mins up to 0.75 hrs
  } else if (minutes < 45) {
    return locale.formatDistance('xMinutes', minutes, localizeOptions);

    // 0.75 hrs up to 1.5 hrs
  } else if (minutes < 90) {
    return locale.formatDistance('aboutXHours', 1, localizeOptions);

    // 1.5 hrs up to 24 hrs
  } else if (minutes < MINUTES_IN_DAY) {
    var hours = Math.round(minutes / 60);
    return locale.formatDistance('aboutXHours', hours, localizeOptions);

    // 1 day up to 1.75 days
  } else if (minutes < MINUTES_IN_ALMOST_TWO_DAYS) {
    return locale.formatDistance('xDays', 1, localizeOptions);

    // 1.75 days up to 30 days
  } else if (minutes < MINUTES_IN_MONTH) {
    var days = Math.round(minutes / MINUTES_IN_DAY);
    return locale.formatDistance('xDays', days, localizeOptions);

    // 1 month up to 2 months
  } else if (minutes < MINUTES_IN_TWO_MONTHS) {
    months = Math.round(minutes / MINUTES_IN_MONTH);
    return locale.formatDistance('aboutXMonths', months, localizeOptions);
  }
  months = (0, _index5.default)(dateRight, dateLeft);

  // 2 months up to 12 months
  if (months < 12) {
    var nearestMonth = Math.round(minutes / MINUTES_IN_MONTH);
    return locale.formatDistance('xMonths', nearestMonth, localizeOptions);

    // 1 year up to max Date
  } else {
    var monthsSinceStartOfYear = months % 12;
    var years = Math.floor(months / 12);

    // N years up to 1 years 3 months
    if (monthsSinceStartOfYear < 3) {
      return locale.formatDistance('aboutXYears', years, localizeOptions);

      // N years 3 months up to N years 9 months
    } else if (monthsSinceStartOfYear < 9) {
      return locale.formatDistance('overXYears', years, localizeOptions);

      // N years 9 months up to N year 12 months
    } else {
      return locale.formatDistance('almostXYears', years + 1, localizeOptions);
    }
  }
}
},{"../_lib/defaultOptions/index.js":494,"../compareAsc/index.js":24,"../differenceInMonths/index.js":40,"../differenceInSeconds/index.js":42,"../_lib/defaultLocale/index.js":496,"../toDate/index.js":243,"../_lib/cloneObject/index.js":497,"../_lib/assign/index.js":498,"../_lib/getTimezoneOffsetInMilliseconds/index.js":492,"../_lib/requiredArgs/index.js":490}],116:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = formatDistanceStrict;

var _index = require("../_lib/defaultOptions/index.js");

var _index2 = require("../_lib/getTimezoneOffsetInMilliseconds/index.js");

var _index3 = _interopRequireDefault(_index2);

var _index4 = require("../compareAsc/index.js");

var _index5 = _interopRequireDefault(_index4);

var _index6 = require("../toDate/index.js");

var _index7 = _interopRequireDefault(_index6);

var _index8 = require("../_lib/cloneObject/index.js");

var _index9 = _interopRequireDefault(_index8);

var _index10 = require("../_lib/assign/index.js");

var _index11 = _interopRequireDefault(_index10);

var _index12 = require("../_lib/defaultLocale/index.js");

var _index13 = _interopRequireDefault(_index12);

var _index14 = require("../_lib/requiredArgs/index.js");

var _index15 = _interopRequireDefault(_index14);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MILLISECONDS_IN_MINUTE = 1000 * 60;
var MINUTES_IN_DAY = 60 * 24;
var MINUTES_IN_MONTH = MINUTES_IN_DAY * 30;
var MINUTES_IN_YEAR = MINUTES_IN_DAY * 365;

/**
 * @name formatDistanceStrict
 * @category Common Helpers
 * @summary Return the distance between the given dates in words.
 *
 * @description
 * Return the distance between the given dates in words, using strict units.
 * This is like `formatDistance`, but does not use helpers like 'almost', 'over',
 * 'less than' and the like.
 *
 * | Distance between dates | Result              |
 * |------------------------|---------------------|
 * | 0 ... 59 secs          | [0..59] seconds     |
 * | 1 ... 59 mins          | [1..59] minutes     |
 * | 1 ... 23 hrs           | [1..23] hours       |
 * | 1 ... 29 days          | [1..29] days        |
 * | 1 ... 11 months        | [1..11] months      |
 * | 1 ... N years          | [1..N]  years       |
 *
 * @param {Date|Number} date - the date
 * @param {Date|Number} baseDate - the date to compare with
 * @param {Object} [options] - an object with options.
 * @param {Boolean} [options.addSuffix=false] - result indicates if the second date is earlier or later than the first
 * @param {'second'|'minute'|'hour'|'day'|'month'|'year'} [options.unit] - if specified, will force a unit
 * @param {'floor'|'ceil'|'round'} [options.roundingMethod='round'] - which way to round partial units
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @returns {String} the distance in words
 * @throws {TypeError} 2 arguments required
 * @throws {RangeError} `date` must not be Invalid Date
 * @throws {RangeError} `baseDate` must not be Invalid Date
 * @throws {RangeError} `options.roundingMethod` must be 'floor', 'ceil' or 'round'
 * @throws {RangeError} `options.unit` must be 'second', 'minute', 'hour', 'day', 'month' or 'year'
 * @throws {RangeError} `options.locale` must contain `formatDistance` property
 *
 * @example
 * // What is the distance between 2 July 2014 and 1 January 2015?
 * const result = formatDistanceStrict(new Date(2014, 6, 2), new Date(2015, 0, 2))
 * //=> '6 months'
 *
 * @example
 * // What is the distance between 1 January 2015 00:00:15
 * // and 1 January 2015 00:00:00?
 * const result = formatDistanceStrict(
 *   new Date(2015, 0, 1, 0, 0, 15),
 *   new Date(2015, 0, 1, 0, 0, 0)
 * )
 * //=> '15 seconds'
 *
 * @example
 * // What is the distance from 1 January 2016
 * // to 1 January 2015, with a suffix?
 * const result = formatDistanceStrict(new Date(2015, 0, 1), new Date(2016, 0, 1), {
 *   addSuffix: true
 * })
 * //=> '1 year ago'
 *
 * @example
 * // What is the distance from 1 January 2016
 * // to 1 January 2015, in minutes?
 * const result = formatDistanceStrict(new Date(2016, 0, 1), new Date(2015, 0, 1), {
 *   unit: 'minute'
 * })
 * //=> '525600 minutes'
 *
 * @example
 * // What is the distance from 1 January 2015
 * // to 28 January 2015, in months, rounded up?
 * const result = formatDistanceStrict(new Date(2015, 0, 28), new Date(2015, 0, 1), {
 *   unit: 'month',
 *   roundingMethod: 'ceil'
 * })
 * //=> '1 month'
 *
 * @example
 * // What is the distance between 1 August 2016 and 1 January 2015 in Esperanto?
 * import { eoLocale } from 'date-fns/locale/eo'
 * const result = formatDistanceStrict(new Date(2016, 7, 1), new Date(2015, 0, 1), {
 *   locale: eoLocale
 * })
 * //=> '1 jaro'
 */

function formatDistanceStrict(dirtyDate, dirtyBaseDate, options) {
  var _ref, _options$locale, _options$roundingMeth;
  (0, _index15.default)(2, arguments);
  var defaultOptions = (0, _index.getDefaultOptions)();
  var locale = (_ref = (_options$locale = options === null || options === void 0 ? void 0 : options.locale) !== null && _options$locale !== void 0 ? _options$locale : defaultOptions.locale) !== null && _ref !== void 0 ? _ref : _index13.default;
  if (!locale.formatDistance) {
    throw new RangeError('locale must contain localize.formatDistance property');
  }
  var comparison = (0, _index5.default)(dirtyDate, dirtyBaseDate);
  if (isNaN(comparison)) {
    throw new RangeError('Invalid time value');
  }
  var localizeOptions = (0, _index11.default)((0, _index9.default)(options), {
    addSuffix: Boolean(options === null || options === void 0 ? void 0 : options.addSuffix),
    comparison: comparison
  });
  var dateLeft;
  var dateRight;
  if (comparison > 0) {
    dateLeft = (0, _index7.default)(dirtyBaseDate);
    dateRight = (0, _index7.default)(dirtyDate);
  } else {
    dateLeft = (0, _index7.default)(dirtyDate);
    dateRight = (0, _index7.default)(dirtyBaseDate);
  }
  var roundingMethod = String((_options$roundingMeth = options === null || options === void 0 ? void 0 : options.roundingMethod) !== null && _options$roundingMeth !== void 0 ? _options$roundingMeth : 'round');
  var roundingMethodFn;
  if (roundingMethod === 'floor') {
    roundingMethodFn = Math.floor;
  } else if (roundingMethod === 'ceil') {
    roundingMethodFn = Math.ceil;
  } else if (roundingMethod === 'round') {
    roundingMethodFn = Math.round;
  } else {
    throw new RangeError("roundingMethod must be 'floor', 'ceil' or 'round'");
  }
  var milliseconds = dateRight.getTime() - dateLeft.getTime();
  var minutes = milliseconds / MILLISECONDS_IN_MINUTE;
  var timezoneOffset = (0, _index3.default)(dateRight) - (0, _index3.default)(dateLeft);

  // Use DST-normalized difference in minutes for years, months and days;
  // use regular difference in minutes for hours, minutes and seconds.
  var dstNormalizedMinutes = (milliseconds - timezoneOffset) / MILLISECONDS_IN_MINUTE;
  var defaultUnit = options === null || options === void 0 ? void 0 : options.unit;
  var unit;
  if (!defaultUnit) {
    if (minutes < 1) {
      unit = 'second';
    } else if (minutes < 60) {
      unit = 'minute';
    } else if (minutes < MINUTES_IN_DAY) {
      unit = 'hour';
    } else if (dstNormalizedMinutes < MINUTES_IN_MONTH) {
      unit = 'day';
    } else if (dstNormalizedMinutes < MINUTES_IN_YEAR) {
      unit = 'month';
    } else {
      unit = 'year';
    }
  } else {
    unit = String(defaultUnit);
  }

  // 0 up to 60 seconds
  if (unit === 'second') {
    var seconds = roundingMethodFn(milliseconds / 1000);
    return locale.formatDistance('xSeconds', seconds, localizeOptions);

    // 1 up to 60 mins
  } else if (unit === 'minute') {
    var roundedMinutes = roundingMethodFn(minutes);
    return locale.formatDistance('xMinutes', roundedMinutes, localizeOptions);

    // 1 up to 24 hours
  } else if (unit === 'hour') {
    var hours = roundingMethodFn(minutes / 60);
    return locale.formatDistance('xHours', hours, localizeOptions);

    // 1 up to 30 days
  } else if (unit === 'day') {
    var days = roundingMethodFn(dstNormalizedMinutes / MINUTES_IN_DAY);
    return locale.formatDistance('xDays', days, localizeOptions);

    // 1 up to 12 months
  } else if (unit === 'month') {
    var months = roundingMethodFn(dstNormalizedMinutes / MINUTES_IN_MONTH);
    return months === 12 && defaultUnit !== 'month' ? locale.formatDistance('xYears', 1, localizeOptions) : locale.formatDistance('xMonths', months, localizeOptions);

    // 1 year up to max Date
  } else if (unit === 'year') {
    var years = roundingMethodFn(dstNormalizedMinutes / MINUTES_IN_YEAR);
    return locale.formatDistance('xYears', years, localizeOptions);
  }
  throw new RangeError("unit must be 'second', 'minute', 'hour', 'day', 'month' or 'year'");
}
},{"../_lib/defaultOptions/index.js":494,"../_lib/getTimezoneOffsetInMilliseconds/index.js":492,"../compareAsc/index.js":24,"../toDate/index.js":243,"../_lib/cloneObject/index.js":497,"../_lib/assign/index.js":498,"../_lib/defaultLocale/index.js":496,"../_lib/requiredArgs/index.js":490}],70:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = formatDistanceToNow;

var _index = require("../formatDistance/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name formatDistanceToNow
 * @category Common Helpers
 * @summary Return the distance between the given date and now in words.
 * @pure false
 *
 * @description
 * Return the distance between the given date and now in words.
 *
 * | Distance to now                                                   | Result              |
 * |-------------------------------------------------------------------|---------------------|
 * | 0 ... 30 secs                                                     | less than a minute  |
 * | 30 secs ... 1 min 30 secs                                         | 1 minute            |
 * | 1 min 30 secs ... 44 mins 30 secs                                 | [2..44] minutes     |
 * | 44 mins ... 30 secs ... 89 mins 30 secs                           | about 1 hour        |
 * | 89 mins 30 secs ... 23 hrs 59 mins 30 secs                        | about [2..24] hours |
 * | 23 hrs 59 mins 30 secs ... 41 hrs 59 mins 30 secs                 | 1 day               |
 * | 41 hrs 59 mins 30 secs ... 29 days 23 hrs 59 mins 30 secs         | [2..30] days        |
 * | 29 days 23 hrs 59 mins 30 secs ... 44 days 23 hrs 59 mins 30 secs | about 1 month       |
 * | 44 days 23 hrs 59 mins 30 secs ... 59 days 23 hrs 59 mins 30 secs | about 2 months      |
 * | 59 days 23 hrs 59 mins 30 secs ... 1 yr                           | [2..12] months      |
 * | 1 yr ... 1 yr 3 months                                            | about 1 year        |
 * | 1 yr 3 months ... 1 yr 9 month s                                  | over 1 year         |
 * | 1 yr 9 months ... 2 yrs                                           | almost 2 years      |
 * | N yrs ... N yrs 3 months                                          | about N years       |
 * | N yrs 3 months ... N yrs 9 months                                 | over N years        |
 * | N yrs 9 months ... N+1 yrs                                        | almost N+1 years    |
 *
 * With `options.includeSeconds == true`:
 * | Distance to now     | Result               |
 * |---------------------|----------------------|
 * | 0 secs ... 5 secs   | less than 5 seconds  |
 * | 5 secs ... 10 secs  | less than 10 seconds |
 * | 10 secs ... 20 secs | less than 20 seconds |
 * | 20 secs ... 40 secs | half a minute        |
 * | 40 secs ... 60 secs | less than a minute   |
 * | 60 secs ... 90 secs | 1 minute             |
 *
 * > ⚠️ Please note that this function is not present in the FP submodule as
 * > it uses `Date.now()` internally hence impure and can't be safely curried.
 *
 * @param {Date|Number} date - the given date
 * @param {Object} [options] - the object with options
 * @param {Boolean} [options.includeSeconds=false] - distances less than a minute are more detailed
 * @param {Boolean} [options.addSuffix=false] - result specifies if now is earlier or later than the passed date
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @returns {String} the distance in words
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} `date` must not be Invalid Date
 * @throws {RangeError} `options.locale` must contain `formatDistance` property
 *
 * @example
 * // If today is 1 January 2015, what is the distance to 2 July 2014?
 * const result = formatDistanceToNow(
 *   new Date(2014, 6, 2)
 * )
 * //=> '6 months'
 *
 * @example
 * // If now is 1 January 2015 00:00:00,
 * // what is the distance to 1 January 2015 00:00:15, including seconds?
 * const result = formatDistanceToNow(
 *   new Date(2015, 0, 1, 0, 0, 15),
 *   {includeSeconds: true}
 * )
 * //=> 'less than 20 seconds'
 *
 * @example
 * // If today is 1 January 2015,
 * // what is the distance to 1 January 2016, with a suffix?
 * const result = formatDistanceToNow(
 *   new Date(2016, 0, 1),
 *   {addSuffix: true}
 * )
 * //=> 'in about 1 year'
 *
 * @example
 * // If today is 1 January 2015,
 * // what is the distance to 1 August 2016 in Esperanto?
 * const eoLocale = require('date-fns/locale/eo')
 * const result = formatDistanceToNow(
 *   new Date(2016, 7, 1),
 *   {locale: eoLocale}
 * )
 * //=> 'pli ol 1 jaro'
 */
function formatDistanceToNow(dirtyDate, options) {
  (0, _index4.default)(1, arguments);
  return (0, _index2.default)(dirtyDate, Date.now(), options);
}
},{"../formatDistance/index.js":74,"../_lib/requiredArgs/index.js":490}],72:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = formatDistanceToNowStrict;

var _index = require("../formatDistanceStrict/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name formatDistanceToNowStrict
 * @category Common Helpers
 * @summary Return the distance between the given date and now in words.
 * @pure false
 *
 * @description
 * Return the distance between the given dates in words, using strict units.
 * This is like `formatDistance`, but does not use helpers like 'almost', 'over',
 * 'less than' and the like.
 *
 * | Distance between dates | Result              |
 * |------------------------|---------------------|
 * | 0 ... 59 secs          | [0..59] seconds     |
 * | 1 ... 59 mins          | [1..59] minutes     |
 * | 1 ... 23 hrs           | [1..23] hours       |
 * | 1 ... 29 days          | [1..29] days        |
 * | 1 ... 11 months        | [1..11] months      |
 * | 1 ... N years          | [1..N]  years       |
 *
 * @param {Date|Number} date - the given date
 * @param {Object} [options] - an object with options.
 * @param {Boolean} [options.addSuffix=false] - result indicates if the second date is earlier or later than the first
 * @param {'second'|'minute'|'hour'|'day'|'month'|'year'} [options.unit] - if specified, will force a unit
 * @param {'floor'|'ceil'|'round'} [options.roundingMethod='round'] - which way to round partial units
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @returns {String} the distance in words
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} `date` must not be Invalid Date
 * @throws {RangeError} `options.locale` must contain `formatDistance` property
 *
 * @example
 * // If today is 1 January 2015, what is the distance to 2 July 2014?
 * const result = formatDistanceToNowStrict(
 *   new Date(2014, 6, 2)
 * )
 * //=> '6 months'
 *
 * @example
 * // If now is 1 January 2015 00:00:00,
 * // what is the distance to 1 January 2015 00:00:15, including seconds?
 * const result = formatDistanceToNowStrict(
 *   new Date(2015, 0, 1, 0, 0, 15)
 * )
 * //=> '15 seconds'
 *
 * @example
 * // If today is 1 January 2015,
 * // what is the distance to 1 January 2016, with a suffix?
 * const result = formatDistanceToNowStrict(
 *   new Date(2016, 0, 1),
 *   {addSuffix: true}
 * )
 * //=> 'in 1 year'
 *
 * @example
 * // If today is 28 January 2015,
 * // what is the distance to 1 January 2015, in months, rounded up??
 * const result = formatDistanceToNowStrict(new Date(2015, 0, 1), {
 *   unit: 'month',
 *   roundingMethod: 'ceil'
 * })
 * //=> '1 month'
 *
 * @example
 * // If today is 1 January 2015,
 * // what is the distance to 1 January 2016 in Esperanto?
 * const eoLocale = require('date-fns/locale/eo')
 * const result = formatDistanceToNowStrict(
 *   new Date(2016, 0, 1),
 *   {locale: eoLocale}
 * )
 * //=> '1 jaro'
 */
function formatDistanceToNowStrict(dirtyDate, options) {
  (0, _index4.default)(1, arguments);
  return (0, _index2.default)(dirtyDate, Date.now(), options);
}
},{"../formatDistanceStrict/index.js":116,"../_lib/requiredArgs/index.js":490}],75:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = formatDuration;

var _index = require("../_lib/defaultOptions/index.js");

var _index2 = require("../_lib/defaultLocale/index.js");

var _index3 = _interopRequireDefault(_index2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultFormat = ['years', 'months', 'weeks', 'days', 'hours', 'minutes', 'seconds'];

/**
 * @name formatDuration
 * @category Common Helpers
 * @summary Formats a duration in human-readable format
 *
 * @description
 * Return human-readable duration string i.e. "9 months 2 days"
 *
 * @param {Duration} duration - the duration to format
 * @param {Object} [options] - an object with options.
 * @param {string[]} [options.format=['years', 'months', 'weeks', 'days', 'hours', 'minutes', 'seconds']] - the array of units to format
 * @param {boolean} [options.zero=false] - should zeros be included in the output?
 * @param {string} [options.delimiter=' '] - delimiter string
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @returns {string} the formatted date string
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Format full duration
 * formatDuration({
 *   years: 2,
 *   months: 9,
 *   weeks: 1,
 *   days: 7,
 *   hours: 5,
 *   minutes: 9,
 *   seconds: 30
 * })
 * //=> '2 years 9 months 1 week 7 days 5 hours 9 minutes 30 seconds'
 *
 * @example
 * // Format partial duration
 * formatDuration({ months: 9, days: 2 })
 * //=> '9 months 2 days'
 *
 * @example
 * // Customize the format
 * formatDuration(
 *   {
 *     years: 2,
 *     months: 9,
 *     weeks: 1,
 *     days: 7,
 *     hours: 5,
 *     minutes: 9,
 *     seconds: 30
 *   },
 *   { format: ['months', 'weeks'] }
 * ) === '9 months 1 week'
 *
 * @example
 * // Customize the zeros presence
 * formatDuration({ years: 0, months: 9 })
 * //=> '9 months'
 * formatDuration({ years: 0, months: 9 }, { zero: true })
 * //=> '0 years 9 months'
 *
 * @example
 * // Customize the delimiter
 * formatDuration({ years: 2, months: 9, weeks: 3 }, { delimiter: ', ' })
 * //=> '2 years, 9 months, 3 weeks'
 */
function formatDuration(duration, options) {
  var _ref, _options$locale, _options$format, _options$zero, _options$delimiter;
  if (arguments.length < 1) {
    throw new TypeError("1 argument required, but only ".concat(arguments.length, " present"));
  }
  var defaultOptions = (0, _index.getDefaultOptions)();
  var locale = (_ref = (_options$locale = options === null || options === void 0 ? void 0 : options.locale) !== null && _options$locale !== void 0 ? _options$locale : defaultOptions.locale) !== null && _ref !== void 0 ? _ref : _index3.default;
  var format = (_options$format = options === null || options === void 0 ? void 0 : options.format) !== null && _options$format !== void 0 ? _options$format : defaultFormat;
  var zero = (_options$zero = options === null || options === void 0 ? void 0 : options.zero) !== null && _options$zero !== void 0 ? _options$zero : false;
  var delimiter = (_options$delimiter = options === null || options === void 0 ? void 0 : options.delimiter) !== null && _options$delimiter !== void 0 ? _options$delimiter : ' ';
  if (!locale.formatDistance) {
    return '';
  }
  var result = format.reduce(function (acc, unit) {
    var token = "x".concat(unit.replace(/(^.)/, function (m) {
      return m.toUpperCase();
    }));
    var value = duration[unit];
    if (typeof value === 'number' && (zero || duration[unit])) {
      return acc.concat(locale.formatDistance(token, value));
    }
    return acc;
  }, []).join(delimiter);
  return result;
}
},{"../_lib/defaultOptions/index.js":494,"../_lib/defaultLocale/index.js":496}],73:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = formatISO;

var _index = require("../toDate/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/addLeadingZeros/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../_lib/requiredArgs/index.js");

var _index6 = _interopRequireDefault(_index5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name formatISO
 * @category Common Helpers
 * @summary Format the date according to the ISO 8601 standard (https://support.sas.com/documentation/cdl/en/lrdict/64316/HTML/default/viewer.htm#a003169814.htm).
 *
 * @description
 * Return the formatted date string in ISO 8601 format. Options may be passed to control the parts and notations of the date.
 *
 * @param {Date|Number} date - the original date
 * @param {Object} [options] - an object with options.
 * @param {'extended'|'basic'} [options.format='extended'] - if 'basic', hide delimiters between date and time values.
 * @param {'complete'|'date'|'time'} [options.representation='complete'] - format date, time with local time zone, or both.
 * @returns {String} the formatted date string (in local time zone)
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} `date` must not be Invalid Date
 * @throws {RangeError} `options.format` must be 'extended' or 'basic'
 * @throws {RangeError} `options.representation` must be 'date', 'time' or 'complete'
 *
 * @example
 * // Represent 18 September 2019 in ISO 8601 format (local time zone is UTC):
 * const result = formatISO(new Date(2019, 8, 18, 19, 0, 52))
 * //=> '2019-09-18T19:00:52Z'
 *
 * @example
 * // Represent 18 September 2019 in ISO 8601, short format (local time zone is UTC):
 * const result = formatISO(new Date(2019, 8, 18, 19, 0, 52), { format: 'basic' })
 * //=> '20190918T190052'
 *
 * @example
 * // Represent 18 September 2019 in ISO 8601 format, date only:
 * const result = formatISO(new Date(2019, 8, 18, 19, 0, 52), { representation: 'date' })
 * //=> '2019-09-18'
 *
 * @example
 * // Represent 18 September 2019 in ISO 8601 format, time only (local time zone is UTC):
 * const result = formatISO(new Date(2019, 8, 18, 19, 0, 52), { representation: 'time' })
 * //=> '19:00:52Z'
 */
function formatISO(date, options) {
  var _options$format, _options$representati;
  (0, _index6.default)(1, arguments);
  var originalDate = (0, _index2.default)(date);
  if (isNaN(originalDate.getTime())) {
    throw new RangeError('Invalid time value');
  }
  var format = String((_options$format = options === null || options === void 0 ? void 0 : options.format) !== null && _options$format !== void 0 ? _options$format : 'extended');
  var representation = String((_options$representati = options === null || options === void 0 ? void 0 : options.representation) !== null && _options$representati !== void 0 ? _options$representati : 'complete');
  if (format !== 'extended' && format !== 'basic') {
    throw new RangeError("format must be 'extended' or 'basic'");
  }
  if (representation !== 'date' && representation !== 'time' && representation !== 'complete') {
    throw new RangeError("representation must be 'date', 'time', or 'complete'");
  }
  var result = '';
  var tzOffset = '';
  var dateDelimiter = format === 'extended' ? '-' : '';
  var timeDelimiter = format === 'extended' ? ':' : '';

  // Representation is either 'date' or 'complete'
  if (representation !== 'time') {
    var day = (0, _index4.default)(originalDate.getDate(), 2);
    var month = (0, _index4.default)(originalDate.getMonth() + 1, 2);
    var year = (0, _index4.default)(originalDate.getFullYear(), 4);

    // yyyyMMdd or yyyy-MM-dd.
    result = "".concat(year).concat(dateDelimiter).concat(month).concat(dateDelimiter).concat(day);
  }

  // Representation is either 'time' or 'complete'
  if (representation !== 'date') {
    // Add the timezone.
    var offset = originalDate.getTimezoneOffset();
    if (offset !== 0) {
      var absoluteOffset = Math.abs(offset);
      var hourOffset = (0, _index4.default)(Math.floor(absoluteOffset / 60), 2);
      var minuteOffset = (0, _index4.default)(absoluteOffset % 60, 2);
      // If less than 0, the sign is +, because it is ahead of time.
      var sign = offset < 0 ? '+' : '-';
      tzOffset = "".concat(sign).concat(hourOffset, ":").concat(minuteOffset);
    } else {
      tzOffset = 'Z';
    }
    var hour = (0, _index4.default)(originalDate.getHours(), 2);
    var minute = (0, _index4.default)(originalDate.getMinutes(), 2);
    var second = (0, _index4.default)(originalDate.getSeconds(), 2);

    // If there's also date, separate it with time with 'T'
    var separator = result === '' ? '' : 'T';

    // Creates a time string consisting of hour, minute, and second, separated by delimiters, if defined.
    var time = [hour, minute, second].join(timeDelimiter);

    // HHmmss or HH:mm:ss.
    result = "".concat(result).concat(separator).concat(time).concat(tzOffset);
  }
  return result;
}
},{"../toDate/index.js":243,"../_lib/addLeadingZeros/index.js":495,"../_lib/requiredArgs/index.js":490}],76:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = formatISO9075;

var _index = require("../toDate/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../isValid/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../_lib/addLeadingZeros/index.js");

var _index6 = _interopRequireDefault(_index5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name formatISO9075
 * @category Common Helpers
 * @summary Format the date according to the ISO 9075 standard (https://dev.mysql.com/doc/refman/5.7/en/date-and-time-functions.html#function_get-format).
 *
 * @description
 * Return the formatted date string in ISO 9075 format. Options may be passed to control the parts and notations of the date.
 *
 * @param {Date|Number} date - the original date
 * @param {Object} [options] - an object with options.
 * @param {'extended'|'basic'} [options.format='extended'] - if 'basic', hide delimiters between date and time values.
 * @param {'complete'|'date'|'time'} [options.representation='complete'] - format date, time, or both.
 * @returns {String} the formatted date string
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} `date` must not be Invalid Date
 * @throws {RangeError} `options.format` must be 'extended' or 'basic'
 * @throws {RangeError} `options.representation` must be 'date', 'time' or 'complete'
 *
 * @example
 * // Represent 18 September 2019 in ISO 9075 format:
 * const result = formatISO9075(new Date(2019, 8, 18, 19, 0, 52))
 * //=> '2019-09-18 19:00:52'
 *
 * @example
 * // Represent 18 September 2019 in ISO 9075, short format:
 * const result = formatISO9075(new Date(2019, 8, 18, 19, 0, 52), { format: 'basic' })
 * //=> '20190918 190052'
 *
 * @example
 * // Represent 18 September 2019 in ISO 9075 format, date only:
 * const result = formatISO9075(new Date(2019, 8, 18, 19, 0, 52), { representation: 'date' })
 * //=> '2019-09-18'
 *
 * @example
 * // Represent 18 September 2019 in ISO 9075 format, time only:
 * const result = formatISO9075(new Date(2019, 8, 18, 19, 0, 52), { representation: 'time' })
 * //=> '19:00:52'
 */
function formatISO9075(dirtyDate, options) {
  var _options$format, _options$representati;
  if (arguments.length < 1) {
    throw new TypeError("1 argument required, but only ".concat(arguments.length, " present"));
  }
  var originalDate = (0, _index2.default)(dirtyDate);
  if (!(0, _index4.default)(originalDate)) {
    throw new RangeError('Invalid time value');
  }
  var format = String((_options$format = options === null || options === void 0 ? void 0 : options.format) !== null && _options$format !== void 0 ? _options$format : 'extended');
  var representation = String((_options$representati = options === null || options === void 0 ? void 0 : options.representation) !== null && _options$representati !== void 0 ? _options$representati : 'complete');
  if (format !== 'extended' && format !== 'basic') {
    throw new RangeError("format must be 'extended' or 'basic'");
  }
  if (representation !== 'date' && representation !== 'time' && representation !== 'complete') {
    throw new RangeError("representation must be 'date', 'time', or 'complete'");
  }
  var result = '';
  var dateDelimiter = format === 'extended' ? '-' : '';
  var timeDelimiter = format === 'extended' ? ':' : '';

  // Representation is either 'date' or 'complete'
  if (representation !== 'time') {
    var day = (0, _index6.default)(originalDate.getDate(), 2);
    var month = (0, _index6.default)(originalDate.getMonth() + 1, 2);
    var year = (0, _index6.default)(originalDate.getFullYear(), 4);

    // yyyyMMdd or yyyy-MM-dd.
    result = "".concat(year).concat(dateDelimiter).concat(month).concat(dateDelimiter).concat(day);
  }

  // Representation is either 'time' or 'complete'
  if (representation !== 'date') {
    var hour = (0, _index6.default)(originalDate.getHours(), 2);
    var minute = (0, _index6.default)(originalDate.getMinutes(), 2);
    var second = (0, _index6.default)(originalDate.getSeconds(), 2);

    // If there's also date, separate it with time with a space
    var separator = result === '' ? '' : ' ';

    // HHmmss or HH:mm:ss.
    result = "".concat(result).concat(separator).concat(hour).concat(timeDelimiter).concat(minute).concat(timeDelimiter).concat(second);
  }
  return result;
}
},{"../toDate/index.js":243,"../isValid/index.js":151,"../_lib/addLeadingZeros/index.js":495}],77:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = formatISODuration;

var _typeof2 = require("@babel/runtime/helpers/esm/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _index = require("../_lib/requiredArgs/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name formatISODuration
 * @category Common Helpers
 * @summary Format a duration object according as ISO 8601 duration string
 *
 * @description
 * Format a duration object according to the ISO 8601 duration standard (https://www.digi.com/resources/documentation/digidocs/90001437-13/reference/r_iso_8601_duration_format.htm)
 *
 * @param {Duration} duration - the duration to format
 *
 * @returns {String} The ISO 8601 duration string
 * @throws {TypeError} Requires 1 argument
 * @throws {Error} Argument must be an object
 *
 * @example
 * // Format the given duration as ISO 8601 string
 * const result = formatISODuration({
 *   years: 39,
 *   months: 2,
 *   days: 20,
 *   hours: 7,
 *   minutes: 5,
 *   seconds: 0
 * })
 * //=> 'P39Y2M20DT0H0M0S'
 */
function formatISODuration(duration) {
  (0, _index2.default)(1, arguments);
  if ((0, _typeof3.default)(duration) !== 'object') throw new Error('Duration must be an object');
  var _duration$years = duration.years,
      years = _duration$years === void 0 ? 0 : _duration$years,
      _duration$months = duration.months,
      months = _duration$months === void 0 ? 0 : _duration$months,
      _duration$days = duration.days,
      days = _duration$days === void 0 ? 0 : _duration$days,
      _duration$hours = duration.hours,
      hours = _duration$hours === void 0 ? 0 : _duration$hours,
      _duration$minutes = duration.minutes,
      minutes = _duration$minutes === void 0 ? 0 : _duration$minutes,
      _duration$seconds = duration.seconds,
      seconds = _duration$seconds === void 0 ? 0 : _duration$seconds;
  return "P".concat(years, "Y").concat(months, "M").concat(days, "DT").concat(hours, "H").concat(minutes, "M").concat(seconds, "S");
}
},{"@babel/runtime/helpers/esm/typeof":503,"../_lib/requiredArgs/index.js":490}],78:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = formatRFC3339;

var _index = require("../toDate/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../isValid/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../_lib/addLeadingZeros/index.js");

var _index6 = _interopRequireDefault(_index5);

var _index7 = require("../_lib/toInteger/index.js");

var _index8 = _interopRequireDefault(_index7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name formatRFC3339
 * @category Common Helpers
 * @summary Format the date according to the RFC 3339 standard (https://tools.ietf.org/html/rfc3339#section-5.6).
 *
 * @description
 * Return the formatted date string in RFC 3339 format. Options may be passed to control the parts and notations of the date.
 *
 * @param {Date|Number} date - the original date
 * @param {Object} [options] - an object with options.
 * @param {0|1|2|3} [options.fractionDigits=0] - number of digits after the decimal point after seconds
 * @returns {String} the formatted date string
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} `date` must not be Invalid Date
 * @throws {RangeError} `options.fractionDigits` must be between 0 and 3
 *
 * @example
 * // Represent 18 September 2019 in RFC 3339 format:
 * const result = formatRFC3339(new Date(2019, 8, 18, 19, 0, 52))
 * //=> '2019-09-18T19:00:52Z'
 *
 * @example
 * // Represent 18 September 2019 in RFC 3339 format, 2 digits of second fraction:
 * const result = formatRFC3339(new Date(2019, 8, 18, 19, 0, 52, 234), { fractionDigits: 2 })
 * //=> '2019-09-18T19:00:52.23Z'
 *
 * @example
 * // Represent 18 September 2019 in RFC 3339 format, 3 digits of second fraction
 * const result = formatRFC3339(new Date(2019, 8, 18, 19, 0, 52, 234), { fractionDigits: 3 })
 * //=> '2019-09-18T19:00:52.234Z'
 */
function formatRFC3339(dirtyDate, options) {
  var _options$fractionDigi;
  if (arguments.length < 1) {
    throw new TypeError("1 arguments required, but only ".concat(arguments.length, " present"));
  }
  var originalDate = (0, _index2.default)(dirtyDate);
  if (!(0, _index4.default)(originalDate)) {
    throw new RangeError('Invalid time value');
  }
  var fractionDigits = Number((_options$fractionDigi = options === null || options === void 0 ? void 0 : options.fractionDigits) !== null && _options$fractionDigi !== void 0 ? _options$fractionDigi : 0);

  // Test if fractionDigits is between 0 and 3 _and_ is not NaN
  if (!(fractionDigits >= 0 && fractionDigits <= 3)) {
    throw new RangeError('fractionDigits must be between 0 and 3 inclusively');
  }
  var day = (0, _index6.default)(originalDate.getDate(), 2);
  var month = (0, _index6.default)(originalDate.getMonth() + 1, 2);
  var year = originalDate.getFullYear();
  var hour = (0, _index6.default)(originalDate.getHours(), 2);
  var minute = (0, _index6.default)(originalDate.getMinutes(), 2);
  var second = (0, _index6.default)(originalDate.getSeconds(), 2);
  var fractionalSecond = '';
  if (fractionDigits > 0) {
    var milliseconds = originalDate.getMilliseconds();
    var fractionalSeconds = Math.floor(milliseconds * Math.pow(10, fractionDigits - 3));
    fractionalSecond = '.' + (0, _index6.default)(fractionalSeconds, fractionDigits);
  }
  var offset = '';
  var tzOffset = originalDate.getTimezoneOffset();
  if (tzOffset !== 0) {
    var absoluteOffset = Math.abs(tzOffset);
    var hourOffset = (0, _index6.default)((0, _index8.default)(absoluteOffset / 60), 2);
    var minuteOffset = (0, _index6.default)(absoluteOffset % 60, 2);
    // If less than 0, the sign is +, because it is ahead of time.
    var sign = tzOffset < 0 ? '+' : '-';
    offset = "".concat(sign).concat(hourOffset, ":").concat(minuteOffset);
  } else {
    offset = 'Z';
  }
  return "".concat(year, "-").concat(month, "-").concat(day, "T").concat(hour, ":").concat(minute, ":").concat(second).concat(fractionalSecond).concat(offset);
}
},{"../toDate/index.js":243,"../isValid/index.js":151,"../_lib/addLeadingZeros/index.js":495,"../_lib/toInteger/index.js":491}],79:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = formatRFC7231;

var _index = require("../toDate/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../isValid/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../_lib/addLeadingZeros/index.js");

var _index6 = _interopRequireDefault(_index5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/**
 * @name formatRFC7231
 * @category Common Helpers
 * @summary Format the date according to the RFC 7231 standard (https://tools.ietf.org/html/rfc7231#section-7.1.1.1).
 *
 * @description
 * Return the formatted date string in RFC 7231 format.
 * The result will always be in UTC timezone.
 *
 * @param {Date|Number} date - the original date
 * @returns {String} the formatted date string
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} `date` must not be Invalid Date
 *
 * @example
 * // Represent 18 September 2019 in RFC 7231 format:
 * const result = formatRFC7231(new Date(2019, 8, 18, 19, 0, 52))
 * //=> 'Wed, 18 Sep 2019 19:00:52 GMT'
 */
function formatRFC7231(dirtyDate) {
  if (arguments.length < 1) {
    throw new TypeError("1 arguments required, but only ".concat(arguments.length, " present"));
  }
  var originalDate = (0, _index2.default)(dirtyDate);
  if (!(0, _index4.default)(originalDate)) {
    throw new RangeError('Invalid time value');
  }
  var dayName = days[originalDate.getUTCDay()];
  var dayOfMonth = (0, _index6.default)(originalDate.getUTCDate(), 2);
  var monthName = months[originalDate.getUTCMonth()];
  var year = originalDate.getUTCFullYear();
  var hour = (0, _index6.default)(originalDate.getUTCHours(), 2);
  var minute = (0, _index6.default)(originalDate.getUTCMinutes(), 2);
  var second = (0, _index6.default)(originalDate.getUTCSeconds(), 2);

  // Result variables.
  return "".concat(dayName, ", ").concat(dayOfMonth, " ").concat(monthName, " ").concat(year, " ").concat(hour, ":").concat(minute, ":").concat(second, " GMT");
}
},{"../toDate/index.js":243,"../isValid/index.js":151,"../_lib/addLeadingZeros/index.js":495}],80:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = formatRelative;

var _index = require("../_lib/defaultOptions/index.js");

var _index2 = require("../differenceInCalendarDays/index.js");

var _index3 = _interopRequireDefault(_index2);

var _index4 = require("../format/index.js");

var _index5 = _interopRequireDefault(_index4);

var _index6 = require("../_lib/defaultLocale/index.js");

var _index7 = _interopRequireDefault(_index6);

var _index8 = require("../subMilliseconds/index.js");

var _index9 = _interopRequireDefault(_index8);

var _index10 = require("../toDate/index.js");

var _index11 = _interopRequireDefault(_index10);

var _index12 = require("../_lib/getTimezoneOffsetInMilliseconds/index.js");

var _index13 = _interopRequireDefault(_index12);

var _index14 = require("../_lib/requiredArgs/index.js");

var _index15 = _interopRequireDefault(_index14);

var _index16 = require("../_lib/toInteger/index.js");

var _index17 = _interopRequireDefault(_index16);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name formatRelative
 * @category Common Helpers
 * @summary Represent the date in words relative to the given base date.
 *
 * @description
 * Represent the date in words relative to the given base date.
 *
 * | Distance to the base date | Result                    |
 * |---------------------------|---------------------------|
 * | Previous 6 days           | last Sunday at 04:30 AM   |
 * | Last day                  | yesterday at 04:30 AM     |
 * | Same day                  | today at 04:30 AM         |
 * | Next day                  | tomorrow at 04:30 AM      |
 * | Next 6 days               | Sunday at 04:30 AM        |
 * | Other                     | 12/31/2017                |
 *
 * @param {Date|Number} date - the date to format
 * @param {Date|Number} baseDate - the date to compare with
 * @param {Object} [options] - an object with options.
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @returns {String} the date in words
 * @throws {TypeError} 2 arguments required
 * @throws {RangeError} `date` must not be Invalid Date
 * @throws {RangeError} `baseDate` must not be Invalid Date
 * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
 * @throws {RangeError} `options.locale` must contain `localize` property
 * @throws {RangeError} `options.locale` must contain `formatLong` property
 * @throws {RangeError} `options.locale` must contain `formatRelative` property
 *
 * @example
 * // Represent the date of 6 days ago in words relative to the given base date. In this example, today is Wednesday
 * const result = formatRelative(addDays(new Date(), -6), new Date())
 * //=> "last Thursday at 12:45 AM"
 */
function formatRelative(dirtyDate, dirtyBaseDate, options) {
  var _ref, _options$locale, _ref2, _ref3, _ref4, _options$weekStartsOn, _options$locale2, _options$locale2$opti, _defaultOptions$local, _defaultOptions$local2;
  (0, _index15.default)(2, arguments);
  var date = (0, _index11.default)(dirtyDate);
  var baseDate = (0, _index11.default)(dirtyBaseDate);
  var defaultOptions = (0, _index.getDefaultOptions)();
  var locale = (_ref = (_options$locale = options === null || options === void 0 ? void 0 : options.locale) !== null && _options$locale !== void 0 ? _options$locale : defaultOptions.locale) !== null && _ref !== void 0 ? _ref : _index7.default;
  var weekStartsOn = (0, _index17.default)((_ref2 = (_ref3 = (_ref4 = (_options$weekStartsOn = options === null || options === void 0 ? void 0 : options.weekStartsOn) !== null && _options$weekStartsOn !== void 0 ? _options$weekStartsOn : options === null || options === void 0 ? void 0 : (_options$locale2 = options.locale) === null || _options$locale2 === void 0 ? void 0 : (_options$locale2$opti = _options$locale2.options) === null || _options$locale2$opti === void 0 ? void 0 : _options$locale2$opti.weekStartsOn) !== null && _ref4 !== void 0 ? _ref4 : defaultOptions.weekStartsOn) !== null && _ref3 !== void 0 ? _ref3 : (_defaultOptions$local = defaultOptions.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.weekStartsOn) !== null && _ref2 !== void 0 ? _ref2 : 0);
  if (!locale.localize) {
    throw new RangeError('locale must contain localize property');
  }
  if (!locale.formatLong) {
    throw new RangeError('locale must contain formatLong property');
  }
  if (!locale.formatRelative) {
    throw new RangeError('locale must contain formatRelative property');
  }
  var diff = (0, _index3.default)(date, baseDate);
  if (isNaN(diff)) {
    throw new RangeError('Invalid time value');
  }
  var token;
  if (diff < -6) {
    token = 'other';
  } else if (diff < -1) {
    token = 'lastWeek';
  } else if (diff < 0) {
    token = 'yesterday';
  } else if (diff < 1) {
    token = 'today';
  } else if (diff < 2) {
    token = 'tomorrow';
  } else if (diff < 7) {
    token = 'nextWeek';
  } else {
    token = 'other';
  }
  var utcDate = (0, _index9.default)(date, (0, _index13.default)(date));
  var utcBaseDate = (0, _index9.default)(baseDate, (0, _index13.default)(baseDate));
  var formatStr = locale.formatRelative(token, utcDate, utcBaseDate, {
    locale: locale,
    weekStartsOn: weekStartsOn
  });
  return (0, _index5.default)(date, formatStr, {
    locale: locale,
    weekStartsOn: weekStartsOn
  });
}
},{"../_lib/defaultOptions/index.js":494,"../differenceInCalendarDays/index.js":27,"../format/index.js":69,"../_lib/defaultLocale/index.js":496,"../subMilliseconds/index.js":234,"../toDate/index.js":243,"../_lib/getTimezoneOffsetInMilliseconds/index.js":492,"../_lib/requiredArgs/index.js":490,"../_lib/toInteger/index.js":491}],81:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = fromUnixTime;

var _index = require("../toDate/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/toInteger/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../_lib/requiredArgs/index.js");

var _index6 = _interopRequireDefault(_index5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name fromUnixTime
 * @category Timestamp Helpers
 * @summary Create a date from a Unix timestamp.
 *
 * @description
 * Create a date from a Unix timestamp (in seconds). Decimal values will be discarded.
 *
 * @param {Number} unixTime - the given Unix timestamp (in seconds)
 * @returns {Date} the date
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Create the date 29 February 2012 11:45:05:
 * const result = fromUnixTime(1330515905)
 * //=> Wed Feb 29 2012 11:45:05
 */
function fromUnixTime(dirtyUnixTime) {
  (0, _index6.default)(1, arguments);
  var unixTime = (0, _index4.default)(dirtyUnixTime);
  return (0, _index2.default)(unixTime * 1000);
}
},{"../toDate/index.js":243,"../_lib/toInteger/index.js":491,"../_lib/requiredArgs/index.js":490}],82:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getDate;

var _index = require("../toDate/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name getDate
 * @category Day Helpers
 * @summary Get the day of the month of the given date.
 *
 * @description
 * Get the day of the month of the given date.
 *
 * @param {Date|Number} date - the given date
 * @returns {Number} the day of month
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Which day of the month is 29 February 2012?
 * const result = getDate(new Date(2012, 1, 29))
 * //=> 29
 */
function getDate(dirtyDate) {
  (0, _index4.default)(1, arguments);
  var date = (0, _index2.default)(dirtyDate);
  var dayOfMonth = date.getDate();
  return dayOfMonth;
}
},{"../toDate/index.js":243,"../_lib/requiredArgs/index.js":490}],83:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getDay;

var _index = require("../toDate/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name getDay
 * @category Weekday Helpers
 * @summary Get the day of the week of the given date.
 *
 * @description
 * Get the day of the week of the given date.
 *
 * @param {Date|Number} date - the given date
 * @returns {0|1|2|3|4|5|6} the day of week, 0 represents Sunday
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Which day of the week is 29 February 2012?
 * const result = getDay(new Date(2012, 1, 29))
 * //=> 3
 */
function getDay(dirtyDate) {
  (0, _index4.default)(1, arguments);
  var date = (0, _index2.default)(dirtyDate);
  var day = date.getDay();
  return day;
}
},{"../toDate/index.js":243,"../_lib/requiredArgs/index.js":490}],84:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getDayOfYear;

var _index = require("../toDate/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../startOfYear/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../differenceInCalendarDays/index.js");

var _index6 = _interopRequireDefault(_index5);

var _index7 = require("../_lib/requiredArgs/index.js");

var _index8 = _interopRequireDefault(_index7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name getDayOfYear
 * @category Day Helpers
 * @summary Get the day of the year of the given date.
 *
 * @description
 * Get the day of the year of the given date.
 *
 * @param {Date|Number} date - the given date
 * @returns {Number} the day of year
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Which day of the year is 2 July 2014?
 * const result = getDayOfYear(new Date(2014, 6, 2))
 * //=> 183
 */
function getDayOfYear(dirtyDate) {
  (0, _index8.default)(1, arguments);
  var date = (0, _index2.default)(dirtyDate);
  var diff = (0, _index6.default)(date, (0, _index4.default)(date));
  var dayOfYear = diff + 1;
  return dayOfYear;
}
},{"../toDate/index.js":243,"../startOfYear/index.js":229,"../differenceInCalendarDays/index.js":27,"../_lib/requiredArgs/index.js":490}],85:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getDaysInMonth;

var _index = require("../toDate/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name getDaysInMonth
 * @category Month Helpers
 * @summary Get the number of days in a month of the given date.
 *
 * @description
 * Get the number of days in a month of the given date.
 *
 * @param {Date|Number} date - the given date
 * @returns {Number} the number of days in a month
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // How many days are in February 2000?
 * const result = getDaysInMonth(new Date(2000, 1))
 * //=> 29
 */
function getDaysInMonth(dirtyDate) {
  (0, _index4.default)(1, arguments);
  var date = (0, _index2.default)(dirtyDate);
  var year = date.getFullYear();
  var monthIndex = date.getMonth();
  var lastDayOfMonth = new Date(0);
  lastDayOfMonth.setFullYear(year, monthIndex + 1, 0);
  lastDayOfMonth.setHours(0, 0, 0, 0);
  return lastDayOfMonth.getDate();
}
},{"../toDate/index.js":243,"../_lib/requiredArgs/index.js":490}],121:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isLeapYear;

var _index = require("../toDate/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name isLeapYear
 * @category Year Helpers
 * @summary Is the given date in the leap year?
 *
 * @description
 * Is the given date in the leap year?
 *
 * @param {Date|Number} date - the date to check
 * @returns {Boolean} the date is in the leap year
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Is 1 September 2012 in the leap year?
 * const result = isLeapYear(new Date(2012, 8, 1))
 * //=> true
 */
function isLeapYear(dirtyDate) {
  (0, _index4.default)(1, arguments);
  var date = (0, _index2.default)(dirtyDate);
  var year = date.getFullYear();
  return year % 400 === 0 || year % 4 === 0 && year % 100 !== 0;
}
},{"../toDate/index.js":243,"../_lib/requiredArgs/index.js":490}],86:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getDaysInYear;

var _index = require("../toDate/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../isLeapYear/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../_lib/requiredArgs/index.js");

var _index6 = _interopRequireDefault(_index5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name getDaysInYear
 * @category Year Helpers
 * @summary Get the number of days in a year of the given date.
 *
 * @description
 * Get the number of days in a year of the given date.
 *
 * @param {Date|Number} date - the given date
 * @returns {Number} the number of days in a year
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // How many days are in 2012?
 * const result = getDaysInYear(new Date(2012, 0, 1))
 * //=> 366
 */
function getDaysInYear(dirtyDate) {
  (0, _index6.default)(1, arguments);
  var date = (0, _index2.default)(dirtyDate);
  if (String(new Date(date)) === 'Invalid Date') {
    return NaN;
  }
  return (0, _index4.default)(date) ? 366 : 365;
}
},{"../toDate/index.js":243,"../isLeapYear/index.js":121,"../_lib/requiredArgs/index.js":490}],87:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getDecade;

var _index = require("../toDate/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name getDecade
 * @category Decade Helpers
 * @summary Get the decade of the given date.
 *
 * @description
 * Get the decade of the given date.
 *
 * @param {Date|Number} date - the given date
 * @returns {Number} the year of decade
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Which decade belongs 27 November 1942?
 * const result = getDecade(new Date(1942, 10, 27))
 * //=> 1940
 */
function getDecade(dirtyDate) {
  (0, _index4.default)(1, arguments);
  var date = (0, _index2.default)(dirtyDate);
  var year = date.getFullYear();
  var decade = Math.floor(year / 10) * 10;
  return decade;
}
},{"../toDate/index.js":243,"../_lib/requiredArgs/index.js":490}],89:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getDefaultOptions;

var _index = require("../_lib/defaultOptions/index.js");

var _index2 = require("../_lib/assign/index.js");

var _index3 = _interopRequireDefault(_index2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name getDefaultOptions
 * @category Common Helpers
 * @summary Get default options.
 * @pure false
 *
 * @description
 * Returns an object that contains defaults for
 * `options.locale`, `options.weekStartsOn` and `options.firstWeekContainsDate`
 * arguments for all functions.
 *
 * You can change these with [setDefaultOptions]{@link https://date-fns.org/docs/setDefaultOptions}.
 *
 * @returns {Object} default options
 *
 * @example
 * const result = getDefaultOptions()
 * //=> {}
 *
 * @example
 * setDefaultOptions({ weekStarsOn: 1, firstWeekContainsDate: 4 })
 * const result = getDefaultOptions()
 * //=> { weekStarsOn: 1, firstWeekContainsDate: 4 }
 */
function getDefaultOptions() {
  return (0, _index3.default)({}, (0, _index.getDefaultOptions)());
}
},{"../_lib/defaultOptions/index.js":494,"../_lib/assign/index.js":498}],88:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getHours;

var _index = require("../toDate/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name getHours
 * @category Hour Helpers
 * @summary Get the hours of the given date.
 *
 * @description
 * Get the hours of the given date.
 *
 * @param {Date|Number} date - the given date
 * @returns {Number} the hours
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Get the hours of 29 February 2012 11:45:00:
 * const result = getHours(new Date(2012, 1, 29, 11, 45))
 * //=> 11
 */
function getHours(dirtyDate) {
  (0, _index4.default)(1, arguments);
  var date = (0, _index2.default)(dirtyDate);
  var hours = date.getHours();
  return hours;
}
},{"../toDate/index.js":243,"../_lib/requiredArgs/index.js":490}],93:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getISODay;

var _index = require("../toDate/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name getISODay
 * @category Weekday Helpers
 * @summary Get the day of the ISO week of the given date.
 *
 * @description
 * Get the day of the ISO week of the given date,
 * which is 7 for Sunday, 1 for Monday etc.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param {Date|Number} date - the given date
 * @returns {Number} the day of ISO week
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Which day of the ISO week is 26 February 2012?
 * const result = getISODay(new Date(2012, 1, 26))
 * //=> 7
 */
function getISODay(dirtyDate) {
  (0, _index4.default)(1, arguments);
  var date = (0, _index2.default)(dirtyDate);
  var day = date.getDay();
  if (day === 0) {
    day = 7;
  }
  return day;
}
},{"../toDate/index.js":243,"../_lib/requiredArgs/index.js":490}],91:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getISOWeek;

var _index = require("../toDate/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../startOfISOWeek/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../startOfISOWeekYear/index.js");

var _index6 = _interopRequireDefault(_index5);

var _index7 = require("../_lib/requiredArgs/index.js");

var _index8 = _interopRequireDefault(_index7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MILLISECONDS_IN_WEEK = 604800000;

/**
 * @name getISOWeek
 * @category ISO Week Helpers
 * @summary Get the ISO week of the given date.
 *
 * @description
 * Get the ISO week of the given date.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param {Date|Number} date - the given date
 * @returns {Number} the ISO week
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Which week of the ISO-week numbering year is 2 January 2005?
 * const result = getISOWeek(new Date(2005, 0, 2))
 * //=> 53
 */
function getISOWeek(dirtyDate) {
  (0, _index8.default)(1, arguments);
  var date = (0, _index2.default)(dirtyDate);
  var diff = (0, _index4.default)(date).getTime() - (0, _index6.default)(date).getTime();

  // Round the number of days to the nearest integer
  // because the number of milliseconds in a week is not constant
  // (e.g. it's different in the week of the daylight saving time clock shift)
  return Math.round(diff / MILLISECONDS_IN_WEEK) + 1;
}
},{"../toDate/index.js":243,"../startOfISOWeek/index.js":218,"../startOfISOWeekYear/index.js":217,"../_lib/requiredArgs/index.js":490}],94:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getISOWeeksInYear;

var _index = require("../startOfISOWeekYear/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../addWeeks/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../_lib/requiredArgs/index.js");

var _index6 = _interopRequireDefault(_index5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MILLISECONDS_IN_WEEK = 604800000;

/**
 * @name getISOWeeksInYear
 * @category ISO Week-Numbering Year Helpers
 * @summary Get the number of weeks in an ISO week-numbering year of the given date.
 *
 * @description
 * Get the number of weeks in an ISO week-numbering year of the given date.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param {Date|Number} date - the given date
 * @returns {Number} the number of ISO weeks in a year
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // How many weeks are in ISO week-numbering year 2015?
 * const result = getISOWeeksInYear(new Date(2015, 1, 11))
 * //=> 53
 */
function getISOWeeksInYear(dirtyDate) {
  (0, _index6.default)(1, arguments);
  var thisYear = (0, _index2.default)(dirtyDate);
  var nextYear = (0, _index2.default)((0, _index4.default)(thisYear, 60));
  var diff = nextYear.valueOf() - thisYear.valueOf();
  // Round the number of weeks to the nearest integer
  // because the number of milliseconds in a week is not constant
  // (e.g. it's different in the week of the daylight saving time clock shift)
  return Math.round(diff / MILLISECONDS_IN_WEEK);
}
},{"../startOfISOWeekYear/index.js":217,"../addWeeks/index.js":18,"../_lib/requiredArgs/index.js":490}],92:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getMilliseconds;

var _index = require("../toDate/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name getMilliseconds
 * @category Millisecond Helpers
 * @summary Get the milliseconds of the given date.
 *
 * @description
 * Get the milliseconds of the given date.
 *
 * @param {Date|Number} date - the given date
 * @returns {Number} the milliseconds
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Get the milliseconds of 29 February 2012 11:45:05.123:
 * const result = getMilliseconds(new Date(2012, 1, 29, 11, 45, 5, 123))
 * //=> 123
 */
function getMilliseconds(dirtyDate) {
  (0, _index4.default)(1, arguments);
  var date = (0, _index2.default)(dirtyDate);
  var milliseconds = date.getMilliseconds();
  return milliseconds;
}
},{"../toDate/index.js":243,"../_lib/requiredArgs/index.js":490}],95:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getMinutes;

var _index = require("../toDate/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name getMinutes
 * @category Minute Helpers
 * @summary Get the minutes of the given date.
 *
 * @description
 * Get the minutes of the given date.
 *
 * @param {Date|Number} date - the given date
 * @returns {Number} the minutes
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Get the minutes of 29 February 2012 11:45:05:
 * const result = getMinutes(new Date(2012, 1, 29, 11, 45, 5))
 * //=> 45
 */
function getMinutes(dirtyDate) {
  (0, _index4.default)(1, arguments);
  var date = (0, _index2.default)(dirtyDate);
  var minutes = date.getMinutes();
  return minutes;
}
},{"../toDate/index.js":243,"../_lib/requiredArgs/index.js":490}],100:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getMonth;

var _index = require("../toDate/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name getMonth
 * @category Month Helpers
 * @summary Get the month of the given date.
 *
 * @description
 * Get the month of the given date.
 *
 * @param {Date|Number} date - the given date
 * @returns {Number} the month
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Which month is 29 February 2012?
 * const result = getMonth(new Date(2012, 1, 29))
 * //=> 1
 */
function getMonth(dirtyDate) {
  (0, _index4.default)(1, arguments);
  var date = (0, _index2.default)(dirtyDate);
  var month = date.getMonth();
  return month;
}
},{"../toDate/index.js":243,"../_lib/requiredArgs/index.js":490}],97:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getOverlappingDaysInIntervals;

var _index = require("../toDate/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MILLISECONDS_IN_DAY = 24 * 60 * 60 * 1000;

/**
 * @name getOverlappingDaysInIntervals
 * @category Interval Helpers
 * @summary Get the number of days that overlap in two time intervals
 *
 * @description
 * Get the number of days that overlap in two time intervals
 *
 * @param {Interval} intervalLeft - the first interval to compare. See [Interval]{@link docs/Interval}
 * @param {Interval} intervalRight - the second interval to compare. See [Interval]{@link docs/Interval}
 * @returns {Number} the number of days that overlap in two time intervals
 * @throws {TypeError} 2 arguments required
 * @throws {RangeError} The start of an interval cannot be after its end
 * @throws {RangeError} Date in interval cannot be `Invalid Date`
 *
 * @example
 * // For overlapping time intervals adds 1 for each started overlapping day:
 * getOverlappingDaysInIntervals(
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
 *   { start: new Date(2014, 0, 17), end: new Date(2014, 0, 21) }
 * )
 * //=> 3
 *
 * @example
 * // For non-overlapping time intervals returns 0:
 * getOverlappingDaysInIntervals(
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
 *   { start: new Date(2014, 0, 21), end: new Date(2014, 0, 22) }
 * )
 * //=> 0
 */

function getOverlappingDaysInIntervals(dirtyIntervalLeft, dirtyIntervalRight) {
  (0, _index4.default)(2, arguments);
  var intervalLeft = dirtyIntervalLeft || {};
  var intervalRight = dirtyIntervalRight || {};
  var leftStartTime = (0, _index2.default)(intervalLeft.start).getTime();
  var leftEndTime = (0, _index2.default)(intervalLeft.end).getTime();
  var rightStartTime = (0, _index2.default)(intervalRight.start).getTime();
  var rightEndTime = (0, _index2.default)(intervalRight.end).getTime();

  // Throw an exception if start date is after end date or if any date is `Invalid Date`
  if (!(leftStartTime <= leftEndTime && rightStartTime <= rightEndTime)) {
    throw new RangeError('Invalid interval');
  }
  var isOverlapping = leftStartTime < rightEndTime && rightStartTime < leftEndTime;
  if (!isOverlapping) {
    return 0;
  }
  var overlapStartDate = rightStartTime < leftStartTime ? leftStartTime : rightStartTime;
  var overlapEndDate = rightEndTime > leftEndTime ? leftEndTime : rightEndTime;
  var differenceInMs = overlapEndDate - overlapStartDate;
  return Math.ceil(differenceInMs / MILLISECONDS_IN_DAY);
}
},{"../toDate/index.js":243,"../_lib/requiredArgs/index.js":490}],98:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getSeconds;

var _index = require("../toDate/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name getSeconds
 * @category Second Helpers
 * @summary Get the seconds of the given date.
 *
 * @description
 * Get the seconds of the given date.
 *
 * @param {Date|Number} date - the given date
 * @returns {Number} the seconds
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Get the seconds of 29 February 2012 11:45:05.123:
 * const result = getSeconds(new Date(2012, 1, 29, 11, 45, 5, 123))
 * //=> 5
 */
function getSeconds(dirtyDate) {
  (0, _index4.default)(1, arguments);
  var date = (0, _index2.default)(dirtyDate);
  var seconds = date.getSeconds();
  return seconds;
}
},{"../toDate/index.js":243,"../_lib/requiredArgs/index.js":490}],96:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getTime;

var _index = require("../toDate/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name getTime
 * @category Timestamp Helpers
 * @summary Get the milliseconds timestamp of the given date.
 *
 * @description
 * Get the milliseconds timestamp of the given date.
 *
 * @param {Date|Number} date - the given date
 * @returns {Number} the timestamp
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Get the timestamp of 29 February 2012 11:45:05.123:
 * const result = getTime(new Date(2012, 1, 29, 11, 45, 5, 123))
 * //=> 1330515905123
 */
function getTime(dirtyDate) {
  (0, _index4.default)(1, arguments);
  var date = (0, _index2.default)(dirtyDate);
  var timestamp = date.getTime();
  return timestamp;
}
},{"../toDate/index.js":243,"../_lib/requiredArgs/index.js":490}],99:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getUnixTime;

var _index = require("../getTime/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name getUnixTime
 * @category Timestamp Helpers
 * @summary Get the seconds timestamp of the given date.
 *
 * @description
 * Get the seconds timestamp of the given date.
 *
 * @param {Date|Number} date - the given date
 * @returns {Number} the timestamp
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Get the timestamp of 29 February 2012 11:45:05 CET:
 * const result = getUnixTime(new Date(2012, 1, 29, 11, 45, 5))
 * //=> 1330512305
 */
function getUnixTime(dirtyDate) {
  (0, _index4.default)(1, arguments);
  return Math.floor((0, _index2.default)(dirtyDate) / 1000);
}
},{"../getTime/index.js":96,"../_lib/requiredArgs/index.js":490}],103:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getWeekYear;

var _index = require("../startOfWeek/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../toDate/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../_lib/toInteger/index.js");

var _index6 = _interopRequireDefault(_index5);

var _index7 = require("../_lib/requiredArgs/index.js");

var _index8 = _interopRequireDefault(_index7);

var _index9 = require("../_lib/defaultOptions/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name getWeekYear
 * @category Week-Numbering Year Helpers
 * @summary Get the local week-numbering year of the given date.
 *
 * @description
 * Get the local week-numbering year of the given date.
 * The exact calculation depends on the values of
 * `options.weekStartsOn` (which is the index of the first day of the week)
 * and `options.firstWeekContainsDate` (which is the day of January, which is always in
 * the first week of the week-numbering year)
 *
 * Week numbering: https://en.wikipedia.org/wiki/Week#Week_numbering
 *
 * @param {Date|Number} date - the given date
 * @param {Object} [options] - an object with options.
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @param {1|2|3|4|5|6|7} [options.firstWeekContainsDate=1] - the day of January, which is always in the first week of the year
 * @returns {Number} the local week-numbering year
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
 * @throws {RangeError} `options.firstWeekContainsDate` must be between 1 and 7
 *
 * @example
 * // Which week numbering year is 26 December 2004 with the default settings?
 * const result = getWeekYear(new Date(2004, 11, 26))
 * //=> 2005
 *
 * @example
 * // Which week numbering year is 26 December 2004 if week starts on Saturday?
 * const result = getWeekYear(new Date(2004, 11, 26), { weekStartsOn: 6 })
 * //=> 2004
 *
 * @example
 * // Which week numbering year is 26 December 2004 if the first week contains 4 January?
 * const result = getWeekYear(new Date(2004, 11, 26), { firstWeekContainsDate: 4 })
 * //=> 2004
 */
function getWeekYear(dirtyDate, options) {
  var _ref, _ref2, _ref3, _options$firstWeekCon, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
  (0, _index8.default)(1, arguments);
  var date = (0, _index4.default)(dirtyDate);
  var year = date.getFullYear();
  var defaultOptions = (0, _index9.getDefaultOptions)();
  var firstWeekContainsDate = (0, _index6.default)((_ref = (_ref2 = (_ref3 = (_options$firstWeekCon = options === null || options === void 0 ? void 0 : options.firstWeekContainsDate) !== null && _options$firstWeekCon !== void 0 ? _options$firstWeekCon : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.firstWeekContainsDate) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions.firstWeekContainsDate) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.firstWeekContainsDate) !== null && _ref !== void 0 ? _ref : 1);

  // Test if weekStartsOn is between 1 and 7 _and_ is not NaN
  if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {
    throw new RangeError('firstWeekContainsDate must be between 1 and 7 inclusively');
  }
  var firstWeekOfNextYear = new Date(0);
  firstWeekOfNextYear.setFullYear(year + 1, 0, firstWeekContainsDate);
  firstWeekOfNextYear.setHours(0, 0, 0, 0);
  var startOfNextYear = (0, _index2.default)(firstWeekOfNextYear, options);
  var firstWeekOfThisYear = new Date(0);
  firstWeekOfThisYear.setFullYear(year, 0, firstWeekContainsDate);
  firstWeekOfThisYear.setHours(0, 0, 0, 0);
  var startOfThisYear = (0, _index2.default)(firstWeekOfThisYear, options);
  if (date.getTime() >= startOfNextYear.getTime()) {
    return year + 1;
  } else if (date.getTime() >= startOfThisYear.getTime()) {
    return year;
  } else {
    return year - 1;
  }
}
},{"../startOfWeek/index.js":226,"../toDate/index.js":243,"../_lib/toInteger/index.js":491,"../_lib/requiredArgs/index.js":490,"../_lib/defaultOptions/index.js":494}],227:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = startOfWeekYear;

var _index = require("../getWeekYear/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../startOfWeek/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../_lib/toInteger/index.js");

var _index6 = _interopRequireDefault(_index5);

var _index7 = require("../_lib/requiredArgs/index.js");

var _index8 = _interopRequireDefault(_index7);

var _index9 = require("../_lib/defaultOptions/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name startOfWeekYear
 * @category Week-Numbering Year Helpers
 * @summary Return the start of a local week-numbering year for the given date.
 *
 * @description
 * Return the start of a local week-numbering year.
 * The exact calculation depends on the values of
 * `options.weekStartsOn` (which is the index of the first day of the week)
 * and `options.firstWeekContainsDate` (which is the day of January, which is always in
 * the first week of the week-numbering year)
 *
 * Week numbering: https://en.wikipedia.org/wiki/Week#Week_numbering
 *
 * @param {Date|Number} date - the original date
 * @param {Object} [options] - an object with options.
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @param {1|2|3|4|5|6|7} [options.firstWeekContainsDate=1] - the day of January, which is always in the first week of the year
 * @returns {Date} the start of a week-numbering year
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
 * @throws {RangeError} `options.firstWeekContainsDate` must be between 1 and 7
 *
 * @example
 * // The start of an a week-numbering year for 2 July 2005 with default settings:
 * const result = startOfWeekYear(new Date(2005, 6, 2))
 * //=> Sun Dec 26 2004 00:00:00
 *
 * @example
 * // The start of a week-numbering year for 2 July 2005
 * // if Monday is the first day of week
 * // and 4 January is always in the first week of the year:
 * const result = startOfWeekYear(new Date(2005, 6, 2), {
 *   weekStartsOn: 1,
 *   firstWeekContainsDate: 4
 * })
 * //=> Mon Jan 03 2005 00:00:00
 */
function startOfWeekYear(dirtyDate, options) {
  var _ref, _ref2, _ref3, _options$firstWeekCon, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
  (0, _index8.default)(1, arguments);
  var defaultOptions = (0, _index9.getDefaultOptions)();
  var firstWeekContainsDate = (0, _index6.default)((_ref = (_ref2 = (_ref3 = (_options$firstWeekCon = options === null || options === void 0 ? void 0 : options.firstWeekContainsDate) !== null && _options$firstWeekCon !== void 0 ? _options$firstWeekCon : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.firstWeekContainsDate) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions.firstWeekContainsDate) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.firstWeekContainsDate) !== null && _ref !== void 0 ? _ref : 1);
  var year = (0, _index2.default)(dirtyDate, options);
  var firstWeek = new Date(0);
  firstWeek.setFullYear(year, 0, firstWeekContainsDate);
  firstWeek.setHours(0, 0, 0, 0);
  var date = (0, _index4.default)(firstWeek, options);
  return date;
}
},{"../getWeekYear/index.js":103,"../startOfWeek/index.js":226,"../_lib/toInteger/index.js":491,"../_lib/requiredArgs/index.js":490,"../_lib/defaultOptions/index.js":494}],101:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getWeek;

var _index = require("../startOfWeek/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../startOfWeekYear/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../toDate/index.js");

var _index6 = _interopRequireDefault(_index5);

var _index7 = require("../_lib/requiredArgs/index.js");

var _index8 = _interopRequireDefault(_index7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MILLISECONDS_IN_WEEK = 604800000;

/**
 * @name getWeek
 * @category Week Helpers
 * @summary Get the local week index of the given date.
 *
 * @description
 * Get the local week index of the given date.
 * The exact calculation depends on the values of
 * `options.weekStartsOn` (which is the index of the first day of the week)
 * and `options.firstWeekContainsDate` (which is the day of January, which is always in
 * the first week of the week-numbering year)
 *
 * Week numbering: https://en.wikipedia.org/wiki/Week#Week_numbering
 *
 * @param {Date|Number} date - the given date
 * @param {Object} [options] - an object with options.
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @param {1|2|3|4|5|6|7} [options.firstWeekContainsDate=1] - the day of January, which is always in the first week of the year
 * @returns {Number} the week
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
 * @throws {RangeError} `options.firstWeekContainsDate` must be between 1 and 7
 *
 * @example
 * // Which week of the local week numbering year is 2 January 2005 with default options?
 * const result = getWeek(new Date(2005, 0, 2))
 * //=> 2
 *
 * // Which week of the local week numbering year is 2 January 2005,
 * // if Monday is the first day of the week,
 * // and the first week of the year always contains 4 January?
 * const result = getWeek(new Date(2005, 0, 2), {
 *   weekStartsOn: 1,
 *   firstWeekContainsDate: 4
 * })
 * //=> 53
 */

function getWeek(dirtyDate, options) {
  (0, _index8.default)(1, arguments);
  var date = (0, _index6.default)(dirtyDate);
  var diff = (0, _index2.default)(date, options).getTime() - (0, _index4.default)(date, options).getTime();

  // Round the number of days to the nearest integer
  // because the number of milliseconds in a week is not constant
  // (e.g. it's different in the week of the daylight saving time clock shift)
  return Math.round(diff / MILLISECONDS_IN_WEEK) + 1;
}
},{"../startOfWeek/index.js":226,"../startOfWeekYear/index.js":227,"../toDate/index.js":243,"../_lib/requiredArgs/index.js":490}],106:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getWeekOfMonth;

var _index = require("../_lib/defaultOptions/index.js");

var _index2 = require("../getDate/index.js");

var _index3 = _interopRequireDefault(_index2);

var _index4 = require("../getDay/index.js");

var _index5 = _interopRequireDefault(_index4);

var _index6 = require("../startOfMonth/index.js");

var _index7 = _interopRequireDefault(_index6);

var _index8 = require("../_lib/requiredArgs/index.js");

var _index9 = _interopRequireDefault(_index8);

var _index10 = require("../_lib/toInteger/index.js");

var _index11 = _interopRequireDefault(_index10);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name getWeekOfMonth
 * @category Week Helpers
 * @summary Get the week of the month of the given date.
 *
 * @description
 * Get the week of the month of the given date.
 *
 * @param {Date|Number} date - the given date
 * @param {Object} [options] - an object with options.
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @returns {Number} the week of month
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6 inclusively
 *
 * @example
 * // Which week of the month is 9 November 2017?
 * const result = getWeekOfMonth(new Date(2017, 10, 9))
 * //=> 2
 */
function getWeekOfMonth(date, options) {
  var _ref, _ref2, _ref3, _options$weekStartsOn, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
  (0, _index9.default)(1, arguments);
  var defaultOptions = (0, _index.getDefaultOptions)();
  var weekStartsOn = (0, _index11.default)((_ref = (_ref2 = (_ref3 = (_options$weekStartsOn = options === null || options === void 0 ? void 0 : options.weekStartsOn) !== null && _options$weekStartsOn !== void 0 ? _options$weekStartsOn : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.weekStartsOn) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions.weekStartsOn) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.weekStartsOn) !== null && _ref !== void 0 ? _ref : 0);
  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError('weekStartsOn must be between 0 and 6 inclusively');
  }
  var currentDayOfMonth = (0, _index3.default)(date);
  if (isNaN(currentDayOfMonth)) return NaN;
  var startWeekDay = (0, _index5.default)((0, _index7.default)(date));
  var lastDayOfFirstWeek = weekStartsOn - startWeekDay;
  if (lastDayOfFirstWeek <= 0) lastDayOfFirstWeek += 7;
  var remainingDaysAfterFirstWeek = currentDayOfMonth - lastDayOfFirstWeek;
  return Math.ceil(remainingDaysAfterFirstWeek / 7) + 1;
}
},{"../_lib/defaultOptions/index.js":494,"../getDate/index.js":82,"../getDay/index.js":83,"../startOfMonth/index.js":223,"../_lib/requiredArgs/index.js":490,"../_lib/toInteger/index.js":491}],161:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = lastDayOfMonth;

var _index = require("../toDate/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name lastDayOfMonth
 * @category Month Helpers
 * @summary Return the last day of a month for the given date.
 *
 * @description
 * Return the last day of a month for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|Number} date - the original date
 * @returns {Date} the last day of a month
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // The last day of a month for 2 September 2014 11:55:00:
 * const result = lastDayOfMonth(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 30 2014 00:00:00
 */
function lastDayOfMonth(dirtyDate) {
  (0, _index4.default)(1, arguments);
  var date = (0, _index2.default)(dirtyDate);
  var month = date.getMonth();
  date.setFullYear(date.getFullYear(), month + 1, 0);
  date.setHours(0, 0, 0, 0);
  return date;
}
},{"../toDate/index.js":243,"../_lib/requiredArgs/index.js":490}],104:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getWeeksInMonth;

var _index = require("../differenceInCalendarWeeks/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../lastDayOfMonth/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../startOfMonth/index.js");

var _index6 = _interopRequireDefault(_index5);

var _index7 = require("../_lib/requiredArgs/index.js");

var _index8 = _interopRequireDefault(_index7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name getWeeksInMonth
 * @category Week Helpers
 * @summary Get the number of calendar weeks a month spans.
 *
 * @description
 * Get the number of calendar weeks the month in the given date spans.
 *
 * @param {Date|Number} date - the given date
 * @param {Object} [options] - an object with options.
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @returns {Number} the number of calendar weeks
 * @throws {TypeError} 2 arguments required
 * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
 *
 * @example
 * // How many calendar weeks does February 2015 span?
 * const result = getWeeksInMonth(new Date(2015, 1, 8))
 * //=> 4
 *
 * @example
 * // If the week starts on Monday,
 * // how many calendar weeks does July 2017 span?
 * const result = getWeeksInMonth(new Date(2017, 6, 5), { weekStartsOn: 1 })
 * //=> 6
 */
function getWeeksInMonth(date, options) {
  (0, _index8.default)(1, arguments);
  return (0, _index2.default)((0, _index4.default)(date), (0, _index6.default)(date), options) + 1;
}
},{"../differenceInCalendarWeeks/index.js":33,"../lastDayOfMonth/index.js":161,"../startOfMonth/index.js":223,"../_lib/requiredArgs/index.js":490}],105:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getYear;

var _index = require("../toDate/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name getYear
 * @category Year Helpers
 * @summary Get the year of the given date.
 *
 * @description
 * Get the year of the given date.
 *
 * @param {Date|Number} date - the given date
 * @returns {Number} the year
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Which year is 2 July 2014?
 * const result = getYear(new Date(2014, 6, 2))
 * //=> 2014
 */
function getYear(dirtyDate) {
  (0, _index4.default)(1, arguments);
  return (0, _index2.default)(dirtyDate).getFullYear();
}
},{"../toDate/index.js":243,"../_lib/requiredArgs/index.js":490}],138:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = hoursToMilliseconds;

var _index = require("../_lib/requiredArgs/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../constants/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name hoursToMilliseconds
 * @category  Conversion Helpers
 * @summary Convert hours to milliseconds.
 *
 * @description
 * Convert a number of hours to a full number of milliseconds.
 *
 * @param {number} hours - number of hours to be converted
 *
 * @returns {number} the number of hours converted to milliseconds
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Convert 2 hours to milliseconds:
 * const result = hoursToMilliseconds(2)
 * //=> 7200000
 */
function hoursToMilliseconds(hours) {
  (0, _index2.default)(1, arguments);
  return Math.floor(hours * _index3.millisecondsInHour);
}
},{"../_lib/requiredArgs/index.js":490,"../constants/index.js":8}],107:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = hoursToMinutes;

var _index = require("../_lib/requiredArgs/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../constants/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name hoursToMinutes
 * @category Conversion Helpers
 * @summary Convert hours to minutes.
 *
 * @description
 * Convert a number of hours to a full number of minutes.
 *
 * @param {number} hours - number of hours to be converted
 *
 * @returns {number} the number of hours converted in minutes
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Convert 2 hours to minutes:
 * const result = hoursToMinutes(2)
 * //=> 120
 */
function hoursToMinutes(hours) {
  (0, _index2.default)(1, arguments);
  return Math.floor(hours * _index3.minutesInHour);
}
},{"../_lib/requiredArgs/index.js":490,"../constants/index.js":8}],108:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = hoursToSeconds;

var _index = require("../_lib/requiredArgs/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../constants/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name hoursToSeconds
 * @category Conversion Helpers
 * @summary Convert hours to seconds.
 *
 * @description
 * Convert a number of hours to a full number of seconds.
 *
 * @param {number} hours - number of hours to be converted
 *
 * @returns {number} the number of hours converted in seconds
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Convert 2 hours to seconds:
 * const result = hoursToSeconds(2)
 * //=> 7200
 */
function hoursToSeconds(hours) {
  (0, _index2.default)(1, arguments);
  return Math.floor(hours * _index3.secondsInHour);
}
},{"../_lib/requiredArgs/index.js":490,"../constants/index.js":8}],109:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = intervalToDuration;

var _index = require("../compareAsc/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../add/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../differenceInDays/index.js");

var _index6 = _interopRequireDefault(_index5);

var _index7 = require("../differenceInHours/index.js");

var _index8 = _interopRequireDefault(_index7);

var _index9 = require("../differenceInMinutes/index.js");

var _index10 = _interopRequireDefault(_index9);

var _index11 = require("../differenceInMonths/index.js");

var _index12 = _interopRequireDefault(_index11);

var _index13 = require("../differenceInSeconds/index.js");

var _index14 = _interopRequireDefault(_index13);

var _index15 = require("../differenceInYears/index.js");

var _index16 = _interopRequireDefault(_index15);

var _index17 = require("../toDate/index.js");

var _index18 = _interopRequireDefault(_index17);

var _index19 = require("../_lib/requiredArgs/index.js");

var _index20 = _interopRequireDefault(_index19);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name intervalToDuration
 * @category Common Helpers
 * @summary Convert interval to duration
 *
 * @description
 * Convert a interval object to a duration object.
 *
 * @param {Interval} interval - the interval to convert to duration
 *
 * @returns {Duration} The duration Object
 * @throws {TypeError} Requires 2 arguments
 * @throws {RangeError} `start` must not be Invalid Date
 * @throws {RangeError} `end` must not be Invalid Date
 *
 * @example
 * // Get the duration between January 15, 1929 and April 4, 1968.
 * intervalToDuration({
 *   start: new Date(1929, 0, 15, 12, 0, 0),
 *   end: new Date(1968, 3, 4, 19, 5, 0)
 * })
 * // => { years: 39, months: 2, days: 20, hours: 7, minutes: 5, seconds: 0 }
 */
function intervalToDuration(interval) {
  (0, _index20.default)(1, arguments);
  var start = (0, _index18.default)(interval.start);
  var end = (0, _index18.default)(interval.end);
  if (isNaN(start.getTime())) throw new RangeError('Start Date is invalid');
  if (isNaN(end.getTime())) throw new RangeError('End Date is invalid');
  var duration = {};
  duration.years = Math.abs((0, _index16.default)(end, start));
  var sign = (0, _index2.default)(end, start);
  var remainingMonths = (0, _index4.default)(start, {
    years: sign * duration.years
  });
  duration.months = Math.abs((0, _index12.default)(end, remainingMonths));
  var remainingDays = (0, _index4.default)(remainingMonths, {
    months: sign * duration.months
  });
  duration.days = Math.abs((0, _index6.default)(end, remainingDays));
  var remainingHours = (0, _index4.default)(remainingDays, {
    days: sign * duration.days
  });
  duration.hours = Math.abs((0, _index8.default)(end, remainingHours));
  var remainingMinutes = (0, _index4.default)(remainingHours, {
    hours: sign * duration.hours
  });
  duration.minutes = Math.abs((0, _index10.default)(end, remainingMinutes));
  var remainingSeconds = (0, _index4.default)(remainingMinutes, {
    minutes: sign * duration.minutes
  });
  duration.seconds = Math.abs((0, _index14.default)(end, remainingSeconds));
  return duration;
}
},{"../compareAsc/index.js":24,"../add/index.js":67,"../differenceInDays/index.js":34,"../differenceInHours/index.js":35,"../differenceInMinutes/index.js":39,"../differenceInMonths/index.js":40,"../differenceInSeconds/index.js":42,"../differenceInYears/index.js":44,"../toDate/index.js":243,"../_lib/requiredArgs/index.js":490}],111:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = intlFormat;

var _index = require("../_lib/requiredArgs/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name intlFormat
 * @category Common Helpers
 * @summary  Format the date with Intl.DateTimeFormat (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat).
 *
 * @description
 * Return the formatted date string in the given format.
 * The method uses [`Intl.DateTimeFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat) inside.
 * formatOptions are the same as [`Intl.DateTimeFormat` options](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat#using_options)
 *
 * > ⚠️ Please note that before Node version 13.0.0, only the locale data for en-US is available by default.
 *
 * @param {Date|Number} argument - the original date.
 * @param {Object} [formatOptions] - an object with options.
 * @param {'lookup'|'best fit'} [formatOptions.localeMatcher='best fit'] - locale selection algorithm.
 * @param {'narrow'|'short'|'long'} [formatOptions.weekday] - representation the days of the week.
 * @param {'narrow'|'short'|'long'} [formatOptions.era] - representation of eras.
 * @param {'numeric'|'2-digit'} [formatOptions.year] - representation of years.
 * @param {'numeric'|'2-digit'|'narrow'|'short'|'long'} [formatOptions.month='numeric'] - representation of month.
 * @param {'numeric'|'2-digit'} [formatOptions.day='numeric'] - representation of day.
 * @param {'numeric'|'2-digit'} [formatOptions.hour='numeric'] - representation of hours.
 * @param {'numeric'|'2-digit'} [formatOptions.minute] - representation of minutes.
 * @param {'numeric'|'2-digit'} [formatOptions.second] - representation of seconds.
 * @param {'short'|'long'} [formatOptions.timeZoneName] - representation of names of time zones.
 * @param {'basic'|'best fit'} [formatOptions.formatMatcher='best fit'] - format selection algorithm.
 * @param {Boolean} [formatOptions.hour12] - determines whether to use 12-hour time format.
 * @param {String} [formatOptions.timeZone] - the time zone to use.
 * @param {Object} [localeOptions] - an object with locale.
 * @param {String|String[]} [localeOptions.locale] - the locale code
 * @returns {String} the formatted date string.
 * @throws {TypeError} 1 argument required.
 * @throws {RangeError} `date` must not be Invalid Date
 *
 * @example
 * // Represent 10 October 2019 in German.
 * // Convert the date with format's options and locale's options.
 * const result = intlFormat(new Date(2019, 9, 4, 12, 30, 13, 456), {
 *      weekday: 'long',
 *      year: 'numeric',
 *      month: 'long',
 *      day: 'numeric',
 *    }, {
 *      locale: 'de-DE',
 *  })
 * //=> Freitag, 4. Oktober 2019
 *
 * @example
 * // Represent 10 October 2019.
 * // Convert the date with format's options.
 * const result = intlFormat.default(new Date(2019, 9, 4, 12, 30, 13, 456), {
 *      year: 'numeric',
 *      month: 'numeric',
 *      day: 'numeric',
 *      hour: 'numeric',
 *  })
 * //=> 10/4/2019, 12 PM
 *
 * @example
 * // Represent 10 October 2019 in Korean.
 * // Convert the date with locale's options.
 * const result = intlFormat(new Date(2019, 9, 4, 12, 30, 13, 456), {
 *      locale: 'ko-KR',
 *  })
 * //=> 2019. 10. 4.
 *
 * @example
 * // Represent 10 October 2019 in middle-endian format:
 * const result = intlFormat(new Date(2019, 9, 4, 12, 30, 13, 456))
 * //=> 10/4/2019
 */
function intlFormat(date, formatOrLocale, localeOptions) {
  var _localeOptions;
  (0, _index2.default)(1, arguments);
  var formatOptions;
  if (isFormatOptions(formatOrLocale)) {
    formatOptions = formatOrLocale;
  } else {
    localeOptions = formatOrLocale;
  }
  return new Intl.DateTimeFormat((_localeOptions = localeOptions) === null || _localeOptions === void 0 ? void 0 : _localeOptions.locale, formatOptions).format(date);
}
function isFormatOptions(opts) {
  return opts !== undefined && !('locale' in opts);
}
},{"../_lib/requiredArgs/index.js":490}],110:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = intlFormatDistance;

var _index = require("../constants/index.js");

var _index2 = require("../differenceInCalendarDays/index.js");

var _index3 = _interopRequireDefault(_index2);

var _index4 = require("../differenceInCalendarMonths/index.js");

var _index5 = _interopRequireDefault(_index4);

var _index6 = require("../differenceInCalendarQuarters/index.js");

var _index7 = _interopRequireDefault(_index6);

var _index8 = require("../differenceInCalendarWeeks/index.js");

var _index9 = _interopRequireDefault(_index8);

var _index10 = require("../differenceInCalendarYears/index.js");

var _index11 = _interopRequireDefault(_index10);

var _index12 = require("../differenceInHours/index.js");

var _index13 = _interopRequireDefault(_index12);

var _index14 = require("../differenceInMinutes/index.js");

var _index15 = _interopRequireDefault(_index14);

var _index16 = require("../differenceInSeconds/index.js");

var _index17 = _interopRequireDefault(_index16);

var _index18 = require("../toDate/index.js");

var _index19 = _interopRequireDefault(_index18);

var _index20 = require("../_lib/requiredArgs/index.js");

var _index21 = _interopRequireDefault(_index20);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name intlFormatDistance
 * @category Common Helpers
 * @summary Formats distance between two dates in a human-readable format
 * @description
 * The function calculates the difference between two dates and formats it as a human-readable string.
 *
 * The function will pick the most appropriate unit depending on the distance between dates. For example, if the distance is a few hours, it might return `x hours`. If the distance is a few months, it might return `x months`.
 *
 * You can also specify a unit to force using it regardless of the distance to get a result like `123456 hours`.
 *
 * See the table below for the unit picking logic:
 *
 * | Distance between dates | Result (past)  | Result (future) |
 * | ---------------------- | -------------- | --------------- |
 * | 0 seconds              | now            | now             |
 * | 1-59 seconds           | X seconds ago  | in X seconds    |
 * | 1-59 minutes           | X minutes ago  | in X minutes    |
 * | 1-23 hours             | X hours ago    | in X hours      |
 * | 1 day                  | yesterday      | tomorrow        |
 * | 2-6 days               | X days ago     | in X days       |
 * | 7 days                 | last week      | next week       |
 * | 8 days-1 month         | X weeks ago    | in X weeks      |
 * | 1 month                | last month     | next month      |
 * | 2-3 months             | X months ago   | in X months     |
 * | 1 quarter              | last quarter   | next quarter    |
 * | 2-3 quarters           | X quarters ago | in X quarters   |
 * | 1 year                 | last year      | next year       |
 * | 2+ years               | X years ago    | in X years      |
 *
 * @param {Date|Number} date - the date
 * @param {Date|Number} baseDate - the date to compare with.
 * @param {Object} [options] - an object with options.
 * @param {String} [options.unit] - formats the distance with the given unit ('year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second').
 * @param {String|String[]} [options.locale] - the locale to use.
 * @param {String} [options.localeMatcher='best fit'] - the locale matching algorithm to use. Other value: 'lookup'.
 * See MDN for details [Locale identification and negotiation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locale_identification_and_negotiation)
 * @param {String} [options.numeric='auto'] - the output message format. The values are 'auto' (e.g. `yesterday`), 'always'(e.g. `1 day ago`).
 * @param {String} [options.style='long'] - the length of the result. The values are: 'long' (e.g. `1 month`), 'short' (e.g. 'in 1 mo.'), 'narrow' (e.g. 'in 1 mo.').
 * The narrow one could be similar to the short one for some locales.
 * @returns {String} the distance in words according to language-sensitive relative time formatting.
 * @throws {TypeError} 2 arguments required
 * @throws {RangeError} `date` must not be Invalid Date
 * @throws {RangeError} `baseDate` must not be Invalid Date
 * @throws {RangeError} `options.unit` must not be invalid Unit
 * @throws {RangeError} `options.locale` must not be invalid locale
 * @throws {RangeError} `options.localeMatcher` must not be invalid localeMatcher
 * @throws {RangeError} `options.numeric` must not be invalid numeric
 * @throws {RangeError} `options.style` must not be invalid style
 *
 * @example
 * // What is the distance between the dates when the fist date is after the second?
 * intlFormatDistance(
 *   new Date(1986, 3, 4, 11, 30, 0),
 *   new Date(1986, 3, 4, 10, 30, 0)
 * )
 * //=> 'in 1 hour'
 *
 * // What is the distance between the dates when the fist date is before the second?
 * intlFormatDistance(
 *   new Date(1986, 3, 4, 10, 30, 0),
 *   new Date(1986, 3, 4, 11, 30, 0)
 * )
 * //=> '1 hour ago'
 *
 * @example
 * // Use the unit option to force the function to output the result in quarters. Without setting it, the example would return "next year"
 * intlFormatDistance(
 *   new Date(1987, 6, 4, 10, 30, 0),
 *   new Date(1986, 3, 4, 10, 30, 0),
 *   { unit: 'quarter' }
 * )
 * //=> 'in 5 quarters'
 *
 * @example
 * // Use the locale option to get the result in Spanish. Without setting it, the example would return "in 1 hour".
 * intlFormatDistance(
 *   new Date(1986, 3, 4, 11, 30, 0),
 *   new Date(1986, 3, 4, 10, 30, 0),
 *   { locale: 'es' }
 * )
 * //=> 'dentro de 1 hora'
 *
 * @example
 * // Use the numeric option to force the function to use numeric values. Without setting it, the example would return "tomorrow".
 * intlFormatDistance(
 *   new Date(1986, 3, 5, 11, 30, 0),
 *   new Date(1986, 3, 4, 11, 30, 0),
 *   { numeric: 'always' }
 * )
 * //=> 'in 1 day'
 *
 * @example
 * // Use the style option to force the function to use short values. Without setting it, the example would return "in 2 years".
 * intlFormatDistance(
 *   new Date(1988, 3, 4, 11, 30, 0),
 *   new Date(1986, 3, 4, 11, 30, 0),
 *   { style: 'short' }
 * )
 * //=> 'in 2 yr'
 */
function intlFormatDistance(date, baseDate, options) {
  (0, _index21.default)(2, arguments);
  var value = 0;
  var unit;
  var dateLeft = (0, _index19.default)(date);
  var dateRight = (0, _index19.default)(baseDate);
  if (!(options !== null && options !== void 0 && options.unit)) {
    // Get the unit based on diffInSeconds calculations if no unit is specified
    var diffInSeconds = (0, _index17.default)(dateLeft, dateRight); // The smallest unit

    if (Math.abs(diffInSeconds) < _index.secondsInMinute) {
      value = (0, _index17.default)(dateLeft, dateRight);
      unit = 'second';
    } else if (Math.abs(diffInSeconds) < _index.secondsInHour) {
      value = (0, _index15.default)(dateLeft, dateRight);
      unit = 'minute';
    } else if (Math.abs(diffInSeconds) < _index.secondsInDay && Math.abs((0, _index3.default)(dateLeft, dateRight)) < 1) {
      value = (0, _index13.default)(dateLeft, dateRight);
      unit = 'hour';
    } else if (Math.abs(diffInSeconds) < _index.secondsInWeek && (value = (0, _index3.default)(dateLeft, dateRight)) && Math.abs(value) < 7) {
      unit = 'day';
    } else if (Math.abs(diffInSeconds) < _index.secondsInMonth) {
      value = (0, _index9.default)(dateLeft, dateRight);
      unit = 'week';
    } else if (Math.abs(diffInSeconds) < _index.secondsInQuarter) {
      value = (0, _index5.default)(dateLeft, dateRight);
      unit = 'month';
    } else if (Math.abs(diffInSeconds) < _index.secondsInYear) {
      if ((0, _index7.default)(dateLeft, dateRight) < 4) {
        // To filter out cases that are less than a year but match 4 quarters
        value = (0, _index7.default)(dateLeft, dateRight);
        unit = 'quarter';
      } else {
        value = (0, _index11.default)(dateLeft, dateRight);
        unit = 'year';
      }
    } else {
      value = (0, _index11.default)(dateLeft, dateRight);
      unit = 'year';
    }
  } else {
    // Get the value if unit is specified
    unit = options === null || options === void 0 ? void 0 : options.unit;
    if (unit === 'second') {
      value = (0, _index17.default)(dateLeft, dateRight);
    } else if (unit === 'minute') {
      value = (0, _index15.default)(dateLeft, dateRight);
    } else if (unit === 'hour') {
      value = (0, _index13.default)(dateLeft, dateRight);
    } else if (unit === 'day') {
      value = (0, _index3.default)(dateLeft, dateRight);
    } else if (unit === 'week') {
      value = (0, _index9.default)(dateLeft, dateRight);
    } else if (unit === 'month') {
      value = (0, _index5.default)(dateLeft, dateRight);
    } else if (unit === 'quarter') {
      value = (0, _index7.default)(dateLeft, dateRight);
    } else if (unit === 'year') {
      value = (0, _index11.default)(dateLeft, dateRight);
    }
  }
  var rtf = new Intl.RelativeTimeFormat(options === null || options === void 0 ? void 0 : options.locale, {
    localeMatcher: options === null || options === void 0 ? void 0 : options.localeMatcher,
    numeric: (options === null || options === void 0 ? void 0 : options.numeric) || 'auto',
    style: options === null || options === void 0 ? void 0 : options.style
  });
  return rtf.format(value, unit);
}
},{"../constants/index.js":8,"../differenceInCalendarDays/index.js":27,"../differenceInCalendarMonths/index.js":31,"../differenceInCalendarQuarters/index.js":32,"../differenceInCalendarWeeks/index.js":33,"../differenceInCalendarYears/index.js":37,"../differenceInHours/index.js":35,"../differenceInMinutes/index.js":39,"../differenceInSeconds/index.js":42,"../toDate/index.js":243,"../_lib/requiredArgs/index.js":490}],114:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isAfter;

var _index = require("../toDate/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name isAfter
 * @category Common Helpers
 * @summary Is the first date after the second one?
 *
 * @description
 * Is the first date after the second one?
 *
 * @param {Date|Number} date - the date that should be after the other one to return true
 * @param {Date|Number} dateToCompare - the date to compare with
 * @returns {Boolean} the first date is after the second date
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Is 10 July 1989 after 11 February 1987?
 * const result = isAfter(new Date(1989, 6, 10), new Date(1987, 1, 11))
 * //=> true
 */
function isAfter(dirtyDate, dirtyDateToCompare) {
  (0, _index4.default)(2, arguments);
  var date = (0, _index2.default)(dirtyDate);
  var dateToCompare = (0, _index2.default)(dirtyDateToCompare);
  return date.getTime() > dateToCompare.getTime();
}
},{"../toDate/index.js":243,"../_lib/requiredArgs/index.js":490}],115:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isBefore;

var _index = require("../toDate/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name isBefore
 * @category Common Helpers
 * @summary Is the first date before the second one?
 *
 * @description
 * Is the first date before the second one?
 *
 * @param {Date|Number} date - the date that should be before the other one to return true
 * @param {Date|Number} dateToCompare - the date to compare with
 * @returns {Boolean} the first date is before the second date
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Is 10 July 1989 before 11 February 1987?
 * const result = isBefore(new Date(1989, 6, 10), new Date(1987, 1, 11))
 * //=> false
 */
function isBefore(dirtyDate, dirtyDateToCompare) {
  (0, _index4.default)(2, arguments);
  var date = (0, _index2.default)(dirtyDate);
  var dateToCompare = (0, _index2.default)(dirtyDateToCompare);
  return date.getTime() < dateToCompare.getTime();
}
},{"../toDate/index.js":243,"../_lib/requiredArgs/index.js":490}],113:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isEqual;

var _index = require("../toDate/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name isEqual
 * @category Common Helpers
 * @summary Are the given dates equal?
 *
 * @description
 * Are the given dates equal?
 *
 * @param {Date|Number} dateLeft - the first date to compare
 * @param {Date|Number} dateRight - the second date to compare
 * @returns {Boolean} the dates are equal
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Are 2 July 2014 06:30:45.000 and 2 July 2014 06:30:45.500 equal?
 * const result = isEqual(
 *   new Date(2014, 6, 2, 6, 30, 45, 0),
 *   new Date(2014, 6, 2, 6, 30, 45, 500)
 * )
 * //=> false
 */
function isEqual(dirtyLeftDate, dirtyRightDate) {
  (0, _index4.default)(2, arguments);
  var dateLeft = (0, _index2.default)(dirtyLeftDate);
  var dateRight = (0, _index2.default)(dirtyRightDate);
  return dateLeft.getTime() === dateRight.getTime();
}
},{"../toDate/index.js":243,"../_lib/requiredArgs/index.js":490}],117:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isExists;
/**
 * @name isExists
 * @category Common Helpers
 * @summary Is the given date exists?
 *
 * @description
 * Checks if the given arguments convert to an existing date.
 *
 * @param {Number} year of the date to check
 * @param {Number} month of the date to check
 * @param {Number} day of the date to check
 * @returns {Boolean} the date exists
 * @throws {TypeError} 3 arguments required
 *
 * @example
 * // For the valid date:
 * const result = isExists(2018, 0, 31)
 * //=> true
 *
 * @example
 * // For the invalid date:
 * const result = isExists(2018, 1, 31)
 * //=> false
 */
function isExists(year, month, day) {
  if (arguments.length < 3) {
    throw new TypeError('3 argument required, but only ' + arguments.length + ' present');
  }
  var date = new Date(year, month, day);
  return date.getFullYear() === year && date.getMonth() === month && date.getDate() === day;
}
},{}],118:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isFirstDayOfMonth;

var _index = require("../toDate/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name isFirstDayOfMonth
 * @category Month Helpers
 * @summary Is the given date the first day of a month?
 *
 * @description
 * Is the given date the first day of a month?
 *
 * @param {Date|Number} date - the date to check
 * @returns {Boolean} the date is the first day of a month
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Is 1 September 2014 the first day of a month?
 * const result = isFirstDayOfMonth(new Date(2014, 8, 1))
 * //=> true
 */
function isFirstDayOfMonth(dirtyDate) {
  (0, _index4.default)(1, arguments);
  return (0, _index2.default)(dirtyDate).getDate() === 1;
}
},{"../toDate/index.js":243,"../_lib/requiredArgs/index.js":490}],119:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isFriday;

var _index = require("../toDate/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name isFriday
 * @category Weekday Helpers
 * @summary Is the given date Friday?
 *
 * @description
 * Is the given date Friday?
 *
 * @param {Date|Number} date - the date to check
 * @returns {Boolean} the date is Friday
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Is 26 September 2014 Friday?
 * const result = isFriday(new Date(2014, 8, 26))
 * //=> true
 */
function isFriday(dirtyDate) {
  (0, _index4.default)(1, arguments);
  return (0, _index2.default)(dirtyDate).getDay() === 5;
}
},{"../toDate/index.js":243,"../_lib/requiredArgs/index.js":490}],120:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isFuture;

var _index = require("../toDate/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name isFuture
 * @category Common Helpers
 * @summary Is the given date in the future?
 * @pure false
 *
 * @description
 * Is the given date in the future?
 *
 * > ⚠️ Please note that this function is not present in the FP submodule as
 * > it uses `Date.now()` internally hence impure and can't be safely curried.
 *
 * @param {Date|Number} date - the date to check
 * @returns {Boolean} the date is in the future
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // If today is 6 October 2014, is 31 December 2014 in the future?
 * const result = isFuture(new Date(2014, 11, 31))
 * //=> true
 */
function isFuture(dirtyDate) {
  (0, _index4.default)(1, arguments);
  return (0, _index2.default)(dirtyDate).getTime() > Date.now();
}
},{"../toDate/index.js":243,"../_lib/requiredArgs/index.js":490}],554:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _arrayLikeToArray;
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
},{}],506:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _unsupportedIterableToArray;

var _arrayLikeToArray = require("./arrayLikeToArray.js");

var _arrayLikeToArray2 = _interopRequireDefault(_arrayLikeToArray);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return (0, _arrayLikeToArray2.default)(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return (0, _arrayLikeToArray2.default)(o, minLen);
}
},{"./arrayLikeToArray.js":554}],504:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _createForOfIteratorHelper;

var _unsupportedIterableToArray = require("./unsupportedIterableToArray.js");

var _unsupportedIterableToArray2 = _interopRequireDefault(_unsupportedIterableToArray);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = (0, _unsupportedIterableToArray2.default)(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;
      var F = function F() {};
      return {
        s: F,
        n: function n() {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function e(_e) {
          throw _e;
        },
        f: F
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = true,
      didErr = false,
      err;
  return {
    s: function s() {
      it = it.call(o);
    },
    n: function n() {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function e(_e2) {
      didErr = true;
      err = _e2;
    },
    f: function f() {
      try {
        if (!normalCompletion && it["return"] != null) it["return"]();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}
},{"./unsupportedIterableToArray.js":506}],514:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _assertThisInitialized;
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
},{}],560:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _setPrototypeOf;
function _setPrototypeOf(o, p) {
  exports.default = _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}
},{}],512:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _inherits;

var _setPrototypeOf = require("./setPrototypeOf.js");

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) (0, _setPrototypeOf2.default)(subClass, superClass);
}
},{"./setPrototypeOf.js":560}],561:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _getPrototypeOf;
function _getPrototypeOf(o) {
  exports.default = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}
},{}],562:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _isNativeReflectConstruct;
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
},{}],563:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _possibleConstructorReturn;

var _typeof2 = require("./typeof.js");

var _typeof3 = _interopRequireDefault(_typeof2);

var _assertThisInitialized = require("./assertThisInitialized.js");

var _assertThisInitialized2 = _interopRequireDefault(_assertThisInitialized);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) {
  if (call && ((0, _typeof3.default)(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return (0, _assertThisInitialized2.default)(self);
}
},{"./typeof.js":503,"./assertThisInitialized.js":514}],513:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _createSuper;

var _getPrototypeOf = require("./getPrototypeOf.js");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _isNativeReflectConstruct = require("./isNativeReflectConstruct.js");

var _isNativeReflectConstruct2 = _interopRequireDefault(_isNativeReflectConstruct);

var _possibleConstructorReturn = require("./possibleConstructorReturn.js");

var _possibleConstructorReturn2 = _interopRequireDefault(_possibleConstructorReturn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _createSuper(Derived) {
  var hasNativeReflectConstruct = (0, _isNativeReflectConstruct2.default)();
  return function _createSuperInternal() {
    var Super = (0, _getPrototypeOf2.default)(Derived),
        result;
    if (hasNativeReflectConstruct) {
      var NewTarget = (0, _getPrototypeOf2.default)(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return (0, _possibleConstructorReturn2.default)(this, result);
  };
}
},{"./getPrototypeOf.js":561,"./isNativeReflectConstruct.js":562,"./possibleConstructorReturn.js":563}],517:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _classCallCheck;
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
},{}],573:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _toPrimitive;

var _typeof2 = require("./typeof.js");

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toPrimitive(input, hint) {
  if ((0, _typeof3.default)(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if ((0, _typeof3.default)(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
},{"./typeof.js":503}],559:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _toPropertyKey;

var _typeof2 = require("./typeof.js");

var _typeof3 = _interopRequireDefault(_typeof2);

var _toPrimitive = require("./toPrimitive.js");

var _toPrimitive2 = _interopRequireDefault(_toPrimitive);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toPropertyKey(arg) {
  var key = (0, _toPrimitive2.default)(arg, "string");
  return (0, _typeof3.default)(key) === "symbol" ? key : String(key);
}
},{"./typeof.js":503,"./toPrimitive.js":573}],516:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _createClass;

var _toPropertyKey = require("./toPropertyKey.js");

var _toPropertyKey2 = _interopRequireDefault(_toPropertyKey);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, (0, _toPropertyKey2.default)(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
},{"./toPropertyKey.js":559}],515:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _defineProperty;

var _toPropertyKey = require("./toPropertyKey.js");

var _toPropertyKey2 = _interopRequireDefault(_toPropertyKey);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) {
  key = (0, _toPropertyKey2.default)(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
},{"./toPropertyKey.js":559}],488:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DateToSystemTimezoneSetter = exports.ValueSetter = exports.Setter = undefined;

var _assertThisInitialized2 = require("@babel/runtime/helpers/esm/assertThisInitialized");

var _assertThisInitialized3 = _interopRequireDefault(_assertThisInitialized2);

var _inherits2 = require("@babel/runtime/helpers/esm/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _createSuper2 = require("@babel/runtime/helpers/esm/createSuper");

var _createSuper3 = _interopRequireDefault(_createSuper2);

var _classCallCheck2 = require("@babel/runtime/helpers/esm/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("@babel/runtime/helpers/esm/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _defineProperty2 = require("@babel/runtime/helpers/esm/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TIMEZONE_UNIT_PRIORITY = 10;
var Setter = /*#__PURE__*/exports.Setter = function () {
  function Setter() {
    (0, _classCallCheck3.default)(this, Setter);
    (0, _defineProperty3.default)(this, "priority", void 0);
    (0, _defineProperty3.default)(this, "subPriority", 0);
  }
  (0, _createClass3.default)(Setter, [{
    key: "validate",
    value: function validate(_utcDate, _options) {
      return true;
    }
  }]);
  return Setter;
}();
var ValueSetter = /*#__PURE__*/exports.ValueSetter = function (_Setter) {
  (0, _inherits3.default)(ValueSetter, _Setter);
  var _super = (0, _createSuper3.default)(ValueSetter);
  function ValueSetter(value, validateValue, setValue, priority, subPriority) {
    var _this;
    (0, _classCallCheck3.default)(this, ValueSetter);
    _this = _super.call(this);
    _this.value = value;
    _this.validateValue = validateValue;
    _this.setValue = setValue;
    _this.priority = priority;
    if (subPriority) {
      _this.subPriority = subPriority;
    }
    return _this;
  }
  (0, _createClass3.default)(ValueSetter, [{
    key: "validate",
    value: function validate(utcDate, options) {
      return this.validateValue(utcDate, this.value, options);
    }
  }, {
    key: "set",
    value: function set(utcDate, flags, options) {
      return this.setValue(utcDate, flags, this.value, options);
    }
  }]);
  return ValueSetter;
}(Setter);
var DateToSystemTimezoneSetter = /*#__PURE__*/exports.DateToSystemTimezoneSetter = function (_Setter2) {
  (0, _inherits3.default)(DateToSystemTimezoneSetter, _Setter2);
  var _super2 = (0, _createSuper3.default)(DateToSystemTimezoneSetter);
  function DateToSystemTimezoneSetter() {
    var _this2;
    (0, _classCallCheck3.default)(this, DateToSystemTimezoneSetter);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this2 = _super2.call.apply(_super2, [this].concat(args));
    (0, _defineProperty3.default)((0, _assertThisInitialized3.default)(_this2), "priority", TIMEZONE_UNIT_PRIORITY);
    (0, _defineProperty3.default)((0, _assertThisInitialized3.default)(_this2), "subPriority", -1);
    return _this2;
  }
  (0, _createClass3.default)(DateToSystemTimezoneSetter, [{
    key: "set",
    value: function set(date, flags) {
      if (flags.timestampIsSet) {
        return date;
      }
      var convertedDate = new Date(0);
      convertedDate.setFullYear(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
      convertedDate.setHours(date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds(), date.getUTCMilliseconds());
      return convertedDate;
    }
  }]);
  return DateToSystemTimezoneSetter;
}(Setter);
},{"@babel/runtime/helpers/esm/assertThisInitialized":514,"@babel/runtime/helpers/esm/inherits":512,"@babel/runtime/helpers/esm/createSuper":513,"@babel/runtime/helpers/esm/classCallCheck":517,"@babel/runtime/helpers/esm/createClass":516,"@babel/runtime/helpers/esm/defineProperty":515}],564:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Parser = undefined;

var _classCallCheck2 = require("@babel/runtime/helpers/esm/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("@babel/runtime/helpers/esm/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _defineProperty2 = require("@babel/runtime/helpers/esm/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _Setter = require("./Setter.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Parser = /*#__PURE__*/exports.Parser = function () {
  function Parser() {
    (0, _classCallCheck3.default)(this, Parser);
    (0, _defineProperty3.default)(this, "incompatibleTokens", void 0);
    (0, _defineProperty3.default)(this, "priority", void 0);
    (0, _defineProperty3.default)(this, "subPriority", void 0);
  }
  (0, _createClass3.default)(Parser, [{
    key: "run",
    value: function run(dateString, token, match, options) {
      var result = this.parse(dateString, token, match, options);
      if (!result) {
        return null;
      }
      return {
        setter: new _Setter.ValueSetter(result.value, this.validate, this.set, this.priority, this.subPriority),
        rest: result.rest
      };
    }
  }, {
    key: "validate",
    value: function validate(_utcDate, _value, _options) {
      return true;
    }
  }]);
  return Parser;
}();
},{"@babel/runtime/helpers/esm/classCallCheck":517,"@babel/runtime/helpers/esm/createClass":516,"@babel/runtime/helpers/esm/defineProperty":515,"./Setter.js":488}],518:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EraParser = undefined;

var _classCallCheck2 = require("@babel/runtime/helpers/esm/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("@babel/runtime/helpers/esm/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _assertThisInitialized2 = require("@babel/runtime/helpers/esm/assertThisInitialized");

var _assertThisInitialized3 = _interopRequireDefault(_assertThisInitialized2);

var _inherits2 = require("@babel/runtime/helpers/esm/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _createSuper2 = require("@babel/runtime/helpers/esm/createSuper");

var _createSuper3 = _interopRequireDefault(_createSuper2);

var _defineProperty2 = require("@babel/runtime/helpers/esm/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _Parser2 = require("../Parser.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EraParser = /*#__PURE__*/exports.EraParser = function (_Parser) {
  (0, _inherits3.default)(EraParser, _Parser);
  var _super = (0, _createSuper3.default)(EraParser);
  function EraParser() {
    var _this;
    (0, _classCallCheck3.default)(this, EraParser);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty3.default)((0, _assertThisInitialized3.default)(_this), "priority", 140);
    (0, _defineProperty3.default)((0, _assertThisInitialized3.default)(_this), "incompatibleTokens", ['R', 'u', 't', 'T']);
    return _this;
  }
  (0, _createClass3.default)(EraParser, [{
    key: "parse",
    value: function parse(dateString, token, match) {
      switch (token) {
        // AD, BC
        case 'G':
        case 'GG':
        case 'GGG':
          return match.era(dateString, {
            width: 'abbreviated'
          }) || match.era(dateString, {
            width: 'narrow'
          });
        // A, B
        case 'GGGGG':
          return match.era(dateString, {
            width: 'narrow'
          });
        // Anno Domini, Before Christ
        case 'GGGG':
        default:
          return match.era(dateString, {
            width: 'wide'
          }) || match.era(dateString, {
            width: 'abbreviated'
          }) || match.era(dateString, {
            width: 'narrow'
          });
      }
    }
  }, {
    key: "set",
    value: function set(date, flags, value) {
      flags.era = value;
      date.setUTCFullYear(value, 0, 1);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    }
  }]);
  return EraParser;
}(_Parser2.Parser);
},{"@babel/runtime/helpers/esm/classCallCheck":517,"@babel/runtime/helpers/esm/createClass":516,"@babel/runtime/helpers/esm/assertThisInitialized":514,"@babel/runtime/helpers/esm/inherits":512,"@babel/runtime/helpers/esm/createSuper":513,"@babel/runtime/helpers/esm/defineProperty":515,"../Parser.js":564}],565:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var numericPatterns = exports.numericPatterns = {
  month: /^(1[0-2]|0?\d)/,
  // 0 to 12
  date: /^(3[0-1]|[0-2]?\d)/,
  // 0 to 31
  dayOfYear: /^(36[0-6]|3[0-5]\d|[0-2]?\d?\d)/,
  // 0 to 366
  week: /^(5[0-3]|[0-4]?\d)/,
  // 0 to 53
  hour23h: /^(2[0-3]|[0-1]?\d)/,
  // 0 to 23
  hour24h: /^(2[0-4]|[0-1]?\d)/,
  // 0 to 24
  hour11h: /^(1[0-1]|0?\d)/,
  // 0 to 11
  hour12h: /^(1[0-2]|0?\d)/,
  // 0 to 12
  minute: /^[0-5]?\d/,
  // 0 to 59
  second: /^[0-5]?\d/,
  // 0 to 59

  singleDigit: /^\d/,
  // 0 to 9
  twoDigits: /^\d{1,2}/,
  // 0 to 99
  threeDigits: /^\d{1,3}/,
  // 0 to 999
  fourDigits: /^\d{1,4}/,
  // 0 to 9999

  anyDigitsSigned: /^-?\d+/,
  singleDigitSigned: /^-?\d/,
  // 0 to 9, -0 to -9
  twoDigitsSigned: /^-?\d{1,2}/,
  // 0 to 99, -0 to -99
  threeDigitsSigned: /^-?\d{1,3}/,
  // 0 to 999, -0 to -999
  fourDigitsSigned: /^-?\d{1,4}/ // 0 to 9999, -0 to -9999
};

var timezonePatterns = exports.timezonePatterns = {
  basicOptionalMinutes: /^([+-])(\d{2})(\d{2})?|Z/,
  basic: /^([+-])(\d{2})(\d{2})|Z/,
  basicOptionalSeconds: /^([+-])(\d{2})(\d{2})((\d{2}))?|Z/,
  extended: /^([+-])(\d{2}):(\d{2})|Z/,
  extendedOptionalSeconds: /^([+-])(\d{2}):(\d{2})(:(\d{2}))?|Z/
};
},{}],566:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapValue = mapValue;
exports.parseNumericPattern = parseNumericPattern;
exports.parseTimezonePattern = parseTimezonePattern;
exports.parseAnyDigitsSigned = parseAnyDigitsSigned;
exports.parseNDigits = parseNDigits;
exports.parseNDigitsSigned = parseNDigitsSigned;
exports.dayPeriodEnumToHours = dayPeriodEnumToHours;
exports.normalizeTwoDigitYear = normalizeTwoDigitYear;
exports.isLeapYearIndex = isLeapYearIndex;

var _index = require("../../constants/index.js");

var _constants = require("./constants.js");

function mapValue(parseFnResult, mapFn) {
  if (!parseFnResult) {
    return parseFnResult;
  }
  return {
    value: mapFn(parseFnResult.value),
    rest: parseFnResult.rest
  };
}
function parseNumericPattern(pattern, dateString) {
  var matchResult = dateString.match(pattern);
  if (!matchResult) {
    return null;
  }
  return {
    value: parseInt(matchResult[0], 10),
    rest: dateString.slice(matchResult[0].length)
  };
}
function parseTimezonePattern(pattern, dateString) {
  var matchResult = dateString.match(pattern);
  if (!matchResult) {
    return null;
  }

  // Input is 'Z'
  if (matchResult[0] === 'Z') {
    return {
      value: 0,
      rest: dateString.slice(1)
    };
  }
  var sign = matchResult[1] === '+' ? 1 : -1;
  var hours = matchResult[2] ? parseInt(matchResult[2], 10) : 0;
  var minutes = matchResult[3] ? parseInt(matchResult[3], 10) : 0;
  var seconds = matchResult[5] ? parseInt(matchResult[5], 10) : 0;
  return {
    value: sign * (hours * _index.millisecondsInHour + minutes * _index.millisecondsInMinute + seconds * _index.millisecondsInSecond),
    rest: dateString.slice(matchResult[0].length)
  };
}
function parseAnyDigitsSigned(dateString) {
  return parseNumericPattern(_constants.numericPatterns.anyDigitsSigned, dateString);
}
function parseNDigits(n, dateString) {
  switch (n) {
    case 1:
      return parseNumericPattern(_constants.numericPatterns.singleDigit, dateString);
    case 2:
      return parseNumericPattern(_constants.numericPatterns.twoDigits, dateString);
    case 3:
      return parseNumericPattern(_constants.numericPatterns.threeDigits, dateString);
    case 4:
      return parseNumericPattern(_constants.numericPatterns.fourDigits, dateString);
    default:
      return parseNumericPattern(new RegExp('^\\d{1,' + n + '}'), dateString);
  }
}
function parseNDigitsSigned(n, dateString) {
  switch (n) {
    case 1:
      return parseNumericPattern(_constants.numericPatterns.singleDigitSigned, dateString);
    case 2:
      return parseNumericPattern(_constants.numericPatterns.twoDigitsSigned, dateString);
    case 3:
      return parseNumericPattern(_constants.numericPatterns.threeDigitsSigned, dateString);
    case 4:
      return parseNumericPattern(_constants.numericPatterns.fourDigitsSigned, dateString);
    default:
      return parseNumericPattern(new RegExp('^-?\\d{1,' + n + '}'), dateString);
  }
}
function dayPeriodEnumToHours(dayPeriod) {
  switch (dayPeriod) {
    case 'morning':
      return 4;
    case 'evening':
      return 17;
    case 'pm':
    case 'noon':
    case 'afternoon':
      return 12;
    case 'am':
    case 'midnight':
    case 'night':
    default:
      return 0;
  }
}
function normalizeTwoDigitYear(twoDigitYear, currentYear) {
  var isCommonEra = currentYear > 0;
  // Absolute number of the current year:
  // 1 -> 1 AC
  // 0 -> 1 BC
  // -1 -> 2 BC
  var absCurrentYear = isCommonEra ? currentYear : 1 - currentYear;
  var result;
  if (absCurrentYear <= 50) {
    result = twoDigitYear || 100;
  } else {
    var rangeEnd = absCurrentYear + 50;
    var rangeEndCentury = Math.floor(rangeEnd / 100) * 100;
    var isPreviousCentury = twoDigitYear >= rangeEnd % 100;
    result = twoDigitYear + rangeEndCentury - (isPreviousCentury ? 100 : 0);
  }
  return isCommonEra ? result : 1 - result;
}
function isLeapYearIndex(year) {
  return year % 400 === 0 || year % 4 === 0 && year % 100 !== 0;
}
},{"../../constants/index.js":8,"./constants.js":565}],519:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.YearParser = undefined;

var _classCallCheck2 = require("@babel/runtime/helpers/esm/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("@babel/runtime/helpers/esm/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _assertThisInitialized2 = require("@babel/runtime/helpers/esm/assertThisInitialized");

var _assertThisInitialized3 = _interopRequireDefault(_assertThisInitialized2);

var _inherits2 = require("@babel/runtime/helpers/esm/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _createSuper2 = require("@babel/runtime/helpers/esm/createSuper");

var _createSuper3 = _interopRequireDefault(_createSuper2);

var _defineProperty2 = require("@babel/runtime/helpers/esm/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _Parser2 = require("../Parser.js");

var _utils = require("../utils.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// From http://www.unicode.org/reports/tr35/tr35-31/tr35-dates.html#Date_Format_Patterns
// | Year     |     y | yy |   yyy |  yyyy | yyyyy |
// |----------|-------|----|-------|-------|-------|
// | AD 1     |     1 | 01 |   001 |  0001 | 00001 |
// | AD 12    |    12 | 12 |   012 |  0012 | 00012 |
// | AD 123   |   123 | 23 |   123 |  0123 | 00123 |
// | AD 1234  |  1234 | 34 |  1234 |  1234 | 01234 |
// | AD 12345 | 12345 | 45 | 12345 | 12345 | 12345 |
var YearParser = /*#__PURE__*/exports.YearParser = function (_Parser) {
  (0, _inherits3.default)(YearParser, _Parser);
  var _super = (0, _createSuper3.default)(YearParser);
  function YearParser() {
    var _this;
    (0, _classCallCheck3.default)(this, YearParser);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty3.default)((0, _assertThisInitialized3.default)(_this), "priority", 130);
    (0, _defineProperty3.default)((0, _assertThisInitialized3.default)(_this), "incompatibleTokens", ['Y', 'R', 'u', 'w', 'I', 'i', 'e', 'c', 't', 'T']);
    return _this;
  }
  (0, _createClass3.default)(YearParser, [{
    key: "parse",
    value: function parse(dateString, token, match) {
      var valueCallback = function valueCallback(year) {
        return {
          year: year,
          isTwoDigitYear: token === 'yy'
        };
      };
      switch (token) {
        case 'y':
          return (0, _utils.mapValue)((0, _utils.parseNDigits)(4, dateString), valueCallback);
        case 'yo':
          return (0, _utils.mapValue)(match.ordinalNumber(dateString, {
            unit: 'year'
          }), valueCallback);
        default:
          return (0, _utils.mapValue)((0, _utils.parseNDigits)(token.length, dateString), valueCallback);
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value.isTwoDigitYear || value.year > 0;
    }
  }, {
    key: "set",
    value: function set(date, flags, value) {
      var currentYear = date.getUTCFullYear();
      if (value.isTwoDigitYear) {
        var normalizedTwoDigitYear = (0, _utils.normalizeTwoDigitYear)(value.year, currentYear);
        date.setUTCFullYear(normalizedTwoDigitYear, 0, 1);
        date.setUTCHours(0, 0, 0, 0);
        return date;
      }
      var year = !('era' in flags) || flags.era === 1 ? value.year : 1 - value.year;
      date.setUTCFullYear(year, 0, 1);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    }
  }]);
  return YearParser;
}(_Parser2.Parser);
},{"@babel/runtime/helpers/esm/classCallCheck":517,"@babel/runtime/helpers/esm/createClass":516,"@babel/runtime/helpers/esm/assertThisInitialized":514,"@babel/runtime/helpers/esm/inherits":512,"@babel/runtime/helpers/esm/createSuper":513,"@babel/runtime/helpers/esm/defineProperty":515,"../Parser.js":564,"../utils.js":566}],520:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LocalWeekYearParser = undefined;

var _classCallCheck2 = require("@babel/runtime/helpers/esm/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("@babel/runtime/helpers/esm/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _assertThisInitialized2 = require("@babel/runtime/helpers/esm/assertThisInitialized");

var _assertThisInitialized3 = _interopRequireDefault(_assertThisInitialized2);

var _inherits2 = require("@babel/runtime/helpers/esm/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _createSuper2 = require("@babel/runtime/helpers/esm/createSuper");

var _createSuper3 = _interopRequireDefault(_createSuper2);

var _defineProperty2 = require("@babel/runtime/helpers/esm/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _Parser2 = require("../Parser.js");

var _utils = require("../utils.js");

var _index = require("../../../_lib/getUTCWeekYear/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../../../_lib/startOfUTCWeek/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Local week-numbering year
var LocalWeekYearParser = /*#__PURE__*/exports.LocalWeekYearParser = function (_Parser) {
  (0, _inherits3.default)(LocalWeekYearParser, _Parser);
  var _super = (0, _createSuper3.default)(LocalWeekYearParser);
  function LocalWeekYearParser() {
    var _this;
    (0, _classCallCheck3.default)(this, LocalWeekYearParser);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty3.default)((0, _assertThisInitialized3.default)(_this), "priority", 130);
    (0, _defineProperty3.default)((0, _assertThisInitialized3.default)(_this), "incompatibleTokens", ['y', 'R', 'u', 'Q', 'q', 'M', 'L', 'I', 'd', 'D', 'i', 't', 'T']);
    return _this;
  }
  (0, _createClass3.default)(LocalWeekYearParser, [{
    key: "parse",
    value: function parse(dateString, token, match) {
      var valueCallback = function valueCallback(year) {
        return {
          year: year,
          isTwoDigitYear: token === 'YY'
        };
      };
      switch (token) {
        case 'Y':
          return (0, _utils.mapValue)((0, _utils.parseNDigits)(4, dateString), valueCallback);
        case 'Yo':
          return (0, _utils.mapValue)(match.ordinalNumber(dateString, {
            unit: 'year'
          }), valueCallback);
        default:
          return (0, _utils.mapValue)((0, _utils.parseNDigits)(token.length, dateString), valueCallback);
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value.isTwoDigitYear || value.year > 0;
    }
  }, {
    key: "set",
    value: function set(date, flags, value, options) {
      var currentYear = (0, _index2.default)(date, options);
      if (value.isTwoDigitYear) {
        var normalizedTwoDigitYear = (0, _utils.normalizeTwoDigitYear)(value.year, currentYear);
        date.setUTCFullYear(normalizedTwoDigitYear, 0, options.firstWeekContainsDate);
        date.setUTCHours(0, 0, 0, 0);
        return (0, _index4.default)(date, options);
      }
      var year = !('era' in flags) || flags.era === 1 ? value.year : 1 - value.year;
      date.setUTCFullYear(year, 0, options.firstWeekContainsDate);
      date.setUTCHours(0, 0, 0, 0);
      return (0, _index4.default)(date, options);
    }
  }]);
  return LocalWeekYearParser;
}(_Parser2.Parser);
},{"@babel/runtime/helpers/esm/classCallCheck":517,"@babel/runtime/helpers/esm/createClass":516,"@babel/runtime/helpers/esm/assertThisInitialized":514,"@babel/runtime/helpers/esm/inherits":512,"@babel/runtime/helpers/esm/createSuper":513,"@babel/runtime/helpers/esm/defineProperty":515,"../Parser.js":564,"../utils.js":566,"../../../_lib/getUTCWeekYear/index.js":511,"../../../_lib/startOfUTCWeek/index.js":557}],521:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ISOWeekYearParser = undefined;

var _classCallCheck2 = require("@babel/runtime/helpers/esm/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("@babel/runtime/helpers/esm/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _assertThisInitialized2 = require("@babel/runtime/helpers/esm/assertThisInitialized");

var _assertThisInitialized3 = _interopRequireDefault(_assertThisInitialized2);

var _inherits2 = require("@babel/runtime/helpers/esm/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _createSuper2 = require("@babel/runtime/helpers/esm/createSuper");

var _createSuper3 = _interopRequireDefault(_createSuper2);

var _defineProperty2 = require("@babel/runtime/helpers/esm/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _Parser2 = require("../Parser.js");

var _utils = require("../utils.js");

var _index = require("../../../_lib/startOfUTCISOWeek/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ISO week-numbering year
var ISOWeekYearParser = /*#__PURE__*/exports.ISOWeekYearParser = function (_Parser) {
  (0, _inherits3.default)(ISOWeekYearParser, _Parser);
  var _super = (0, _createSuper3.default)(ISOWeekYearParser);
  function ISOWeekYearParser() {
    var _this;
    (0, _classCallCheck3.default)(this, ISOWeekYearParser);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty3.default)((0, _assertThisInitialized3.default)(_this), "priority", 130);
    (0, _defineProperty3.default)((0, _assertThisInitialized3.default)(_this), "incompatibleTokens", ['G', 'y', 'Y', 'u', 'Q', 'q', 'M', 'L', 'w', 'd', 'D', 'e', 'c', 't', 'T']);
    return _this;
  }
  (0, _createClass3.default)(ISOWeekYearParser, [{
    key: "parse",
    value: function parse(dateString, token) {
      if (token === 'R') {
        return (0, _utils.parseNDigitsSigned)(4, dateString);
      }
      return (0, _utils.parseNDigitsSigned)(token.length, dateString);
    }
  }, {
    key: "set",
    value: function set(_date, _flags, value) {
      var firstWeekOfYear = new Date(0);
      firstWeekOfYear.setUTCFullYear(value, 0, 4);
      firstWeekOfYear.setUTCHours(0, 0, 0, 0);
      return (0, _index2.default)(firstWeekOfYear);
    }
  }]);
  return ISOWeekYearParser;
}(_Parser2.Parser);
},{"@babel/runtime/helpers/esm/classCallCheck":517,"@babel/runtime/helpers/esm/createClass":516,"@babel/runtime/helpers/esm/assertThisInitialized":514,"@babel/runtime/helpers/esm/inherits":512,"@babel/runtime/helpers/esm/createSuper":513,"@babel/runtime/helpers/esm/defineProperty":515,"../Parser.js":564,"../utils.js":566,"../../../_lib/startOfUTCISOWeek/index.js":556}],522:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExtendedYearParser = undefined;

var _classCallCheck2 = require("@babel/runtime/helpers/esm/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("@babel/runtime/helpers/esm/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _assertThisInitialized2 = require("@babel/runtime/helpers/esm/assertThisInitialized");

var _assertThisInitialized3 = _interopRequireDefault(_assertThisInitialized2);

var _inherits2 = require("@babel/runtime/helpers/esm/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _createSuper2 = require("@babel/runtime/helpers/esm/createSuper");

var _createSuper3 = _interopRequireDefault(_createSuper2);

var _defineProperty2 = require("@babel/runtime/helpers/esm/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _Parser2 = require("../Parser.js");

var _utils = require("../utils.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ExtendedYearParser = /*#__PURE__*/exports.ExtendedYearParser = function (_Parser) {
  (0, _inherits3.default)(ExtendedYearParser, _Parser);
  var _super = (0, _createSuper3.default)(ExtendedYearParser);
  function ExtendedYearParser() {
    var _this;
    (0, _classCallCheck3.default)(this, ExtendedYearParser);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty3.default)((0, _assertThisInitialized3.default)(_this), "priority", 130);
    (0, _defineProperty3.default)((0, _assertThisInitialized3.default)(_this), "incompatibleTokens", ['G', 'y', 'Y', 'R', 'w', 'I', 'i', 'e', 'c', 't', 'T']);
    return _this;
  }
  (0, _createClass3.default)(ExtendedYearParser, [{
    key: "parse",
    value: function parse(dateString, token) {
      if (token === 'u') {
        return (0, _utils.parseNDigitsSigned)(4, dateString);
      }
      return (0, _utils.parseNDigitsSigned)(token.length, dateString);
    }
  }, {
    key: "set",
    value: function set(date, _flags, value) {
      date.setUTCFullYear(value, 0, 1);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    }
  }]);
  return ExtendedYearParser;
}(_Parser2.Parser);
},{"@babel/runtime/helpers/esm/classCallCheck":517,"@babel/runtime/helpers/esm/createClass":516,"@babel/runtime/helpers/esm/assertThisInitialized":514,"@babel/runtime/helpers/esm/inherits":512,"@babel/runtime/helpers/esm/createSuper":513,"@babel/runtime/helpers/esm/defineProperty":515,"../Parser.js":564,"../utils.js":566}],523:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuarterParser = undefined;

var _classCallCheck2 = require("@babel/runtime/helpers/esm/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("@babel/runtime/helpers/esm/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _assertThisInitialized2 = require("@babel/runtime/helpers/esm/assertThisInitialized");

var _assertThisInitialized3 = _interopRequireDefault(_assertThisInitialized2);

var _inherits2 = require("@babel/runtime/helpers/esm/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _createSuper2 = require("@babel/runtime/helpers/esm/createSuper");

var _createSuper3 = _interopRequireDefault(_createSuper2);

var _defineProperty2 = require("@babel/runtime/helpers/esm/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _Parser2 = require("../Parser.js");

var _utils = require("../utils.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var QuarterParser = /*#__PURE__*/exports.QuarterParser = function (_Parser) {
  (0, _inherits3.default)(QuarterParser, _Parser);
  var _super = (0, _createSuper3.default)(QuarterParser);
  function QuarterParser() {
    var _this;
    (0, _classCallCheck3.default)(this, QuarterParser);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty3.default)((0, _assertThisInitialized3.default)(_this), "priority", 120);
    (0, _defineProperty3.default)((0, _assertThisInitialized3.default)(_this), "incompatibleTokens", ['Y', 'R', 'q', 'M', 'L', 'w', 'I', 'd', 'D', 'i', 'e', 'c', 't', 'T']);
    return _this;
  }
  (0, _createClass3.default)(QuarterParser, [{
    key: "parse",
    value: function parse(dateString, token, match) {
      switch (token) {
        // 1, 2, 3, 4
        case 'Q':
        case 'QQ':
          // 01, 02, 03, 04
          return (0, _utils.parseNDigits)(token.length, dateString);
        // 1st, 2nd, 3rd, 4th
        case 'Qo':
          return match.ordinalNumber(dateString, {
            unit: 'quarter'
          });
        // Q1, Q2, Q3, Q4
        case 'QQQ':
          return match.quarter(dateString, {
            width: 'abbreviated',
            context: 'formatting'
          }) || match.quarter(dateString, {
            width: 'narrow',
            context: 'formatting'
          });
        // 1, 2, 3, 4 (narrow quarter; could be not numerical)
        case 'QQQQQ':
          return match.quarter(dateString, {
            width: 'narrow',
            context: 'formatting'
          });
        // 1st quarter, 2nd quarter, ...
        case 'QQQQ':
        default:
          return match.quarter(dateString, {
            width: 'wide',
            context: 'formatting'
          }) || match.quarter(dateString, {
            width: 'abbreviated',
            context: 'formatting'
          }) || match.quarter(dateString, {
            width: 'narrow',
            context: 'formatting'
          });
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value >= 1 && value <= 4;
    }
  }, {
    key: "set",
    value: function set(date, _flags, value) {
      date.setUTCMonth((value - 1) * 3, 1);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    }
  }]);
  return QuarterParser;
}(_Parser2.Parser);
},{"@babel/runtime/helpers/esm/classCallCheck":517,"@babel/runtime/helpers/esm/createClass":516,"@babel/runtime/helpers/esm/assertThisInitialized":514,"@babel/runtime/helpers/esm/inherits":512,"@babel/runtime/helpers/esm/createSuper":513,"@babel/runtime/helpers/esm/defineProperty":515,"../Parser.js":564,"../utils.js":566}],524:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StandAloneQuarterParser = undefined;

var _classCallCheck2 = require("@babel/runtime/helpers/esm/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("@babel/runtime/helpers/esm/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _assertThisInitialized2 = require("@babel/runtime/helpers/esm/assertThisInitialized");

var _assertThisInitialized3 = _interopRequireDefault(_assertThisInitialized2);

var _inherits2 = require("@babel/runtime/helpers/esm/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _createSuper2 = require("@babel/runtime/helpers/esm/createSuper");

var _createSuper3 = _interopRequireDefault(_createSuper2);

var _defineProperty2 = require("@babel/runtime/helpers/esm/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _Parser2 = require("../Parser.js");

var _utils = require("../utils.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StandAloneQuarterParser = /*#__PURE__*/exports.StandAloneQuarterParser = function (_Parser) {
  (0, _inherits3.default)(StandAloneQuarterParser, _Parser);
  var _super = (0, _createSuper3.default)(StandAloneQuarterParser);
  function StandAloneQuarterParser() {
    var _this;
    (0, _classCallCheck3.default)(this, StandAloneQuarterParser);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty3.default)((0, _assertThisInitialized3.default)(_this), "priority", 120);
    (0, _defineProperty3.default)((0, _assertThisInitialized3.default)(_this), "incompatibleTokens", ['Y', 'R', 'Q', 'M', 'L', 'w', 'I', 'd', 'D', 'i', 'e', 'c', 't', 'T']);
    return _this;
  }
  (0, _createClass3.default)(StandAloneQuarterParser, [{
    key: "parse",
    value: function parse(dateString, token, match) {
      switch (token) {
        // 1, 2, 3, 4
        case 'q':
        case 'qq':
          // 01, 02, 03, 04
          return (0, _utils.parseNDigits)(token.length, dateString);
        // 1st, 2nd, 3rd, 4th
        case 'qo':
          return match.ordinalNumber(dateString, {
            unit: 'quarter'
          });
        // Q1, Q2, Q3, Q4
        case 'qqq':
          return match.quarter(dateString, {
            width: 'abbreviated',
            context: 'standalone'
          }) || match.quarter(dateString, {
            width: 'narrow',
            context: 'standalone'
          });
        // 1, 2, 3, 4 (narrow quarter; could be not numerical)
        case 'qqqqq':
          return match.quarter(dateString, {
            width: 'narrow',
            context: 'standalone'
          });
        // 1st quarter, 2nd quarter, ...
        case 'qqqq':
        default:
          return match.quarter(dateString, {
            width: 'wide',
            context: 'standalone'
          }) || match.quarter(dateString, {
            width: 'abbreviated',
            context: 'standalone'
          }) || match.quarter(dateString, {
            width: 'narrow',
            context: 'standalone'
          });
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value >= 1 && value <= 4;
    }
  }, {
    key: "set",
    value: function set(date, _flags, value) {
      date.setUTCMonth((value - 1) * 3, 1);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    }
  }]);
  return StandAloneQuarterParser;
}(_Parser2.Parser);
},{"@babel/runtime/helpers/esm/classCallCheck":517,"@babel/runtime/helpers/esm/createClass":516,"@babel/runtime/helpers/esm/assertThisInitialized":514,"@babel/runtime/helpers/esm/inherits":512,"@babel/runtime/helpers/esm/createSuper":513,"@babel/runtime/helpers/esm/defineProperty":515,"../Parser.js":564,"../utils.js":566}],525:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MonthParser = undefined;

var _classCallCheck2 = require("@babel/runtime/helpers/esm/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("@babel/runtime/helpers/esm/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _assertThisInitialized2 = require("@babel/runtime/helpers/esm/assertThisInitialized");

var _assertThisInitialized3 = _interopRequireDefault(_assertThisInitialized2);

var _inherits2 = require("@babel/runtime/helpers/esm/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _createSuper2 = require("@babel/runtime/helpers/esm/createSuper");

var _createSuper3 = _interopRequireDefault(_createSuper2);

var _defineProperty2 = require("@babel/runtime/helpers/esm/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _utils = require("../utils.js");

var _Parser2 = require("../Parser.js");

var _constants = require("../constants.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MonthParser = /*#__PURE__*/exports.MonthParser = function (_Parser) {
  (0, _inherits3.default)(MonthParser, _Parser);
  var _super = (0, _createSuper3.default)(MonthParser);
  function MonthParser() {
    var _this;
    (0, _classCallCheck3.default)(this, MonthParser);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty3.default)((0, _assertThisInitialized3.default)(_this), "incompatibleTokens", ['Y', 'R', 'q', 'Q', 'L', 'w', 'I', 'D', 'i', 'e', 'c', 't', 'T']);
    (0, _defineProperty3.default)((0, _assertThisInitialized3.default)(_this), "priority", 110);
    return _this;
  }
  (0, _createClass3.default)(MonthParser, [{
    key: "parse",
    value: function parse(dateString, token, match) {
      var valueCallback = function valueCallback(value) {
        return value - 1;
      };
      switch (token) {
        // 1, 2, ..., 12
        case 'M':
          return (0, _utils.mapValue)((0, _utils.parseNumericPattern)(_constants.numericPatterns.month, dateString), valueCallback);
        // 01, 02, ..., 12
        case 'MM':
          return (0, _utils.mapValue)((0, _utils.parseNDigits)(2, dateString), valueCallback);
        // 1st, 2nd, ..., 12th
        case 'Mo':
          return (0, _utils.mapValue)(match.ordinalNumber(dateString, {
            unit: 'month'
          }), valueCallback);
        // Jan, Feb, ..., Dec
        case 'MMM':
          return match.month(dateString, {
            width: 'abbreviated',
            context: 'formatting'
          }) || match.month(dateString, {
            width: 'narrow',
            context: 'formatting'
          });
        // J, F, ..., D
        case 'MMMMM':
          return match.month(dateString, {
            width: 'narrow',
            context: 'formatting'
          });
        // January, February, ..., December
        case 'MMMM':
        default:
          return match.month(dateString, {
            width: 'wide',
            context: 'formatting'
          }) || match.month(dateString, {
            width: 'abbreviated',
            context: 'formatting'
          }) || match.month(dateString, {
            width: 'narrow',
            context: 'formatting'
          });
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value >= 0 && value <= 11;
    }
  }, {
    key: "set",
    value: function set(date, _flags, value) {
      date.setUTCMonth(value, 1);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    }
  }]);
  return MonthParser;
}(_Parser2.Parser);
},{"@babel/runtime/helpers/esm/classCallCheck":517,"@babel/runtime/helpers/esm/createClass":516,"@babel/runtime/helpers/esm/assertThisInitialized":514,"@babel/runtime/helpers/esm/inherits":512,"@babel/runtime/helpers/esm/createSuper":513,"@babel/runtime/helpers/esm/defineProperty":515,"../utils.js":566,"../Parser.js":564,"../constants.js":565}],526:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StandAloneMonthParser = undefined;

var _classCallCheck2 = require("@babel/runtime/helpers/esm/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("@babel/runtime/helpers/esm/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _assertThisInitialized2 = require("@babel/runtime/helpers/esm/assertThisInitialized");

var _assertThisInitialized3 = _interopRequireDefault(_assertThisInitialized2);

var _inherits2 = require("@babel/runtime/helpers/esm/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _createSuper2 = require("@babel/runtime/helpers/esm/createSuper");

var _createSuper3 = _interopRequireDefault(_createSuper2);

var _defineProperty2 = require("@babel/runtime/helpers/esm/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _Parser2 = require("../Parser.js");

var _constants = require("../constants.js");

var _utils = require("../utils.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StandAloneMonthParser = /*#__PURE__*/exports.StandAloneMonthParser = function (_Parser) {
  (0, _inherits3.default)(StandAloneMonthParser, _Parser);
  var _super = (0, _createSuper3.default)(StandAloneMonthParser);
  function StandAloneMonthParser() {
    var _this;
    (0, _classCallCheck3.default)(this, StandAloneMonthParser);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty3.default)((0, _assertThisInitialized3.default)(_this), "priority", 110);
    (0, _defineProperty3.default)((0, _assertThisInitialized3.default)(_this), "incompatibleTokens", ['Y', 'R', 'q', 'Q', 'M', 'w', 'I', 'D', 'i', 'e', 'c', 't', 'T']);
    return _this;
  }
  (0, _createClass3.default)(StandAloneMonthParser, [{
    key: "parse",
    value: function parse(dateString, token, match) {
      var valueCallback = function valueCallback(value) {
        return value - 1;
      };
      switch (token) {
        // 1, 2, ..., 12
        case 'L':
          return (0, _utils.mapValue)((0, _utils.parseNumericPattern)(_constants.numericPatterns.month, dateString), valueCallback);
        // 01, 02, ..., 12
        case 'LL':
          return (0, _utils.mapValue)((0, _utils.parseNDigits)(2, dateString), valueCallback);
        // 1st, 2nd, ..., 12th
        case 'Lo':
          return (0, _utils.mapValue)(match.ordinalNumber(dateString, {
            unit: 'month'
          }), valueCallback);
        // Jan, Feb, ..., Dec
        case 'LLL':
          return match.month(dateString, {
            width: 'abbreviated',
            context: 'standalone'
          }) || match.month(dateString, {
            width: 'narrow',
            context: 'standalone'
          });
        // J, F, ..., D
        case 'LLLLL':
          return match.month(dateString, {
            width: 'narrow',
            context: 'standalone'
          });
        // January, February, ..., December
        case 'LLLL':
        default:
          return match.month(dateString, {
            width: 'wide',
            context: 'standalone'
          }) || match.month(dateString, {
            width: 'abbreviated',
            context: 'standalone'
          }) || match.month(dateString, {
            width: 'narrow',
            context: 'standalone'
          });
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value >= 0 && value <= 11;
    }
  }, {
    key: "set",
    value: function set(date, _flags, value) {
      date.setUTCMonth(value, 1);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    }
  }]);
  return StandAloneMonthParser;
}(_Parser2.Parser);
},{"@babel/runtime/helpers/esm/classCallCheck":517,"@babel/runtime/helpers/esm/createClass":516,"@babel/runtime/helpers/esm/assertThisInitialized":514,"@babel/runtime/helpers/esm/inherits":512,"@babel/runtime/helpers/esm/createSuper":513,"@babel/runtime/helpers/esm/defineProperty":515,"../Parser.js":564,"../constants.js":565,"../utils.js":566}],568:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setUTCWeek;

var _index = require("../toInteger/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../../toDate/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../getUTCWeek/index.js");

var _index6 = _interopRequireDefault(_index5);

var _index7 = require("../requiredArgs/index.js");

var _index8 = _interopRequireDefault(_index7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function setUTCWeek(dirtyDate, dirtyWeek, options) {
  (0, _index8.default)(2, arguments);
  var date = (0, _index4.default)(dirtyDate);
  var week = (0, _index2.default)(dirtyWeek);
  var diff = (0, _index6.default)(date, options) - week;
  date.setUTCDate(date.getUTCDate() - diff * 7);
  return date;
}
},{"../toInteger/index.js":491,"../../toDate/index.js":243,"../getUTCWeek/index.js":510,"../requiredArgs/index.js":490}],527:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LocalWeekParser = undefined;

var _classCallCheck2 = require("@babel/runtime/helpers/esm/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("@babel/runtime/helpers/esm/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _assertThisInitialized2 = require("@babel/runtime/helpers/esm/assertThisInitialized");

var _assertThisInitialized3 = _interopRequireDefault(_assertThisInitialized2);

var _inherits2 = require("@babel/runtime/helpers/esm/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _createSuper2 = require("@babel/runtime/helpers/esm/createSuper");

var _createSuper3 = _interopRequireDefault(_createSuper2);

var _defineProperty2 = require("@babel/runtime/helpers/esm/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _Parser2 = require("../Parser.js");

var _constants = require("../constants.js");

var _utils = require("../utils.js");

var _index = require("../../../_lib/setUTCWeek/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../../../_lib/startOfUTCWeek/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Local week of year
var LocalWeekParser = /*#__PURE__*/exports.LocalWeekParser = function (_Parser) {
  (0, _inherits3.default)(LocalWeekParser, _Parser);
  var _super = (0, _createSuper3.default)(LocalWeekParser);
  function LocalWeekParser() {
    var _this;
    (0, _classCallCheck3.default)(this, LocalWeekParser);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty3.default)((0, _assertThisInitialized3.default)(_this), "priority", 100);
    (0, _defineProperty3.default)((0, _assertThisInitialized3.default)(_this), "incompatibleTokens", ['y', 'R', 'u', 'q', 'Q', 'M', 'L', 'I', 'd', 'D', 'i', 't', 'T']);
    return _this;
  }
  (0, _createClass3.default)(LocalWeekParser, [{
    key: "parse",
    value: function parse(dateString, token, match) {
      switch (token) {
        case 'w':
          return (0, _utils.parseNumericPattern)(_constants.numericPatterns.week, dateString);
        case 'wo':
          return match.ordinalNumber(dateString, {
            unit: 'week'
          });
        default:
          return (0, _utils.parseNDigits)(token.length, dateString);
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value >= 1 && value <= 53;
    }
  }, {
    key: "set",
    value: function set(date, _flags, value, options) {
      return (0, _index4.default)((0, _index2.default)(date, value, options), options);
    }
  }]);
  return LocalWeekParser;
}(_Parser2.Parser);
},{"@babel/runtime/helpers/esm/classCallCheck":517,"@babel/runtime/helpers/esm/createClass":516,"@babel/runtime/helpers/esm/assertThisInitialized":514,"@babel/runtime/helpers/esm/inherits":512,"@babel/runtime/helpers/esm/createSuper":513,"@babel/runtime/helpers/esm/defineProperty":515,"../Parser.js":564,"../constants.js":565,"../utils.js":566,"../../../_lib/setUTCWeek/index.js":568,"../../../_lib/startOfUTCWeek/index.js":557}],574:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setUTCISOWeek;

var _index = require("../toInteger/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../../toDate/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../getUTCISOWeek/index.js");

var _index6 = _interopRequireDefault(_index5);

var _index7 = require("../requiredArgs/index.js");

var _index8 = _interopRequireDefault(_index7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function setUTCISOWeek(dirtyDate, dirtyISOWeek) {
  (0, _index8.default)(2, arguments);
  var date = (0, _index4.default)(dirtyDate);
  var isoWeek = (0, _index2.default)(dirtyISOWeek);
  var diff = (0, _index6.default)(date) - isoWeek;
  date.setUTCDate(date.getUTCDate() - diff * 7);
  return date;
}
},{"../toInteger/index.js":491,"../../toDate/index.js":243,"../getUTCISOWeek/index.js":508,"../requiredArgs/index.js":490}],528:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ISOWeekParser = undefined;

var _classCallCheck2 = require("@babel/runtime/helpers/esm/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("@babel/runtime/helpers/esm/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _assertThisInitialized2 = require("@babel/runtime/helpers/esm/assertThisInitialized");

var _assertThisInitialized3 = _interopRequireDefault(_assertThisInitialized2);

var _inherits2 = require("@babel/runtime/helpers/esm/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _createSuper2 = require("@babel/runtime/helpers/esm/createSuper");

var _createSuper3 = _interopRequireDefault(_createSuper2);

var _defineProperty2 = require("@babel/runtime/helpers/esm/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _Parser2 = require("../Parser.js");

var _constants = require("../constants.js");

var _utils = require("../utils.js");

var _index = require("../../../_lib/setUTCISOWeek/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../../../_lib/startOfUTCISOWeek/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ISO week of year
var ISOWeekParser = /*#__PURE__*/exports.ISOWeekParser = function (_Parser) {
  (0, _inherits3.default)(ISOWeekParser, _Parser);
  var _super = (0, _createSuper3.default)(ISOWeekParser);
  function ISOWeekParser() {
    var _this;
    (0, _classCallCheck3.default)(this, ISOWeekParser);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty3.default)((0, _assertThisInitialized3.default)(_this), "priority", 100);
    (0, _defineProperty3.default)((0, _assertThisInitialized3.default)(_this), "incompatibleTokens", ['y', 'Y', 'u', 'q', 'Q', 'M', 'L', 'w', 'd', 'D', 'e', 'c', 't', 'T']);
    return _this;
  }
  (0, _createClass3.default)(ISOWeekParser, [{
    key: "parse",
    value: function parse(dateString, token, match) {
      switch (token) {
        case 'I':
          return (0, _utils.parseNumericPattern)(_constants.numericPatterns.week, dateString);
        case 'Io':
          return match.ordinalNumber(dateString, {
            unit: 'week'
          });
        default:
          return (0, _utils.parseNDigits)(token.length, dateString);
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value >= 1 && value <= 53;
    }
  }, {
    key: "set",
    value: function set(date, _flags, value) {
      return (0, _index4.default)((0, _index2.default)(date, value));
    }
  }]);
  return ISOWeekParser;
}(_Parser2.Parser);
},{"@babel/runtime/helpers/esm/classCallCheck":517,"@babel/runtime/helpers/esm/createClass":516,"@babel/runtime/helpers/esm/assertThisInitialized":514,"@babel/runtime/helpers/esm/inherits":512,"@babel/runtime/helpers/esm/createSuper":513,"@babel/runtime/helpers/esm/defineProperty":515,"../Parser.js":564,"../constants.js":565,"../utils.js":566,"../../../_lib/setUTCISOWeek/index.js":574,"../../../_lib/startOfUTCISOWeek/index.js":556}],529:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DateParser = undefined;

var _classCallCheck2 = require("@babel/runtime/helpers/esm/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("@babel/runtime/helpers/esm/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _assertThisInitialized2 = require("@babel/runtime/helpers/esm/assertThisInitialized");

var _assertThisInitialized3 = _interopRequireDefault(_assertThisInitialized2);

var _inherits2 = require("@babel/runtime/helpers/esm/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _createSuper2 = require("@babel/runtime/helpers/esm/createSuper");

var _createSuper3 = _interopRequireDefault(_createSuper2);

var _defineProperty2 = require("@babel/runtime/helpers/esm/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _utils = require("../utils.js");

var _Parser2 = require("../Parser.js");

var _constants = require("../constants.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var DAYS_IN_MONTH_LEAP_YEAR = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// Day of the month
var DateParser = /*#__PURE__*/exports.DateParser = function (_Parser) {
  (0, _inherits3.default)(DateParser, _Parser);
  var _super = (0, _createSuper3.default)(DateParser);
  function DateParser() {
    var _this;
    (0, _classCallCheck3.default)(this, DateParser);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty3.default)((0, _assertThisInitialized3.default)(_this), "priority", 90);
    (0, _defineProperty3.default)((0, _assertThisInitialized3.default)(_this), "subPriority", 1);
    (0, _defineProperty3.default)((0, _assertThisInitialized3.default)(_this), "incompatibleTokens", ['Y', 'R', 'q', 'Q', 'w', 'I', 'D', 'i', 'e', 'c', 't', 'T']);
    return _this;
  }
  (0, _createClass3.default)(DateParser, [{
    key: "parse",
    value: function parse(dateString, token, match) {
      switch (token) {
        case 'd':
          return (0, _utils.parseNumericPattern)(_constants.numericPatterns.date, dateString);
        case 'do':
          return match.ordinalNumber(dateString, {
            unit: 'date'
          });
        default:
          return (0, _utils.parseNDigits)(token.length, dateString);
      }
    }
  }, {
    key: "validate",
    value: function validate(date, value) {
      var year = date.getUTCFullYear();
      var isLeapYear = (0, _utils.isLeapYearIndex)(year);
      var month = date.getUTCMonth();
      if (isLeapYear) {
        return value >= 1 && value <= DAYS_IN_MONTH_LEAP_YEAR[month];
      } else {
        return value >= 1 && value <= DAYS_IN_MONTH[month];
      }
    }
  }, {
    key: "set",
    value: function set(date, _flags, value) {
      date.setUTCDate(value);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    }
  }]);
  return DateParser;
}(_Parser2.Parser);
},{"@babel/runtime/helpers/esm/classCallCheck":517,"@babel/runtime/helpers/esm/createClass":516,"@babel/runtime/helpers/esm/assertThisInitialized":514,"@babel/runtime/helpers/esm/inherits":512,"@babel/runtime/helpers/esm/createSuper":513,"@babel/runtime/helpers/esm/defineProperty":515,"../utils.js":566,"../Parser.js":564,"../constants.js":565}],530:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DayOfYearParser = undefined;

var _classCallCheck2 = require("@babel/runtime/helpers/esm/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("@babel/runtime/helpers/esm/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _assertThisInitialized2 = require("@babel/runtime/helpers/esm/assertThisInitialized");

var _assertThisInitialized3 = _interopRequireDefault(_assertThisInitialized2);

var _inherits2 = require("@babel/runtime/helpers/esm/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _createSuper2 = require("@babel/runtime/helpers/esm/createSuper");

var _createSuper3 = _interopRequireDefault(_createSuper2);

var _defineProperty2 = require("@babel/runtime/helpers/esm/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _Parser2 = require("../Parser.js");

var _constants = require("../constants.js");

var _utils = require("../utils.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DayOfYearParser = /*#__PURE__*/exports.DayOfYearParser = function (_Parser) {
  (0, _inherits3.default)(DayOfYearParser, _Parser);
  var _super = (0, _createSuper3.default)(DayOfYearParser);
  function DayOfYearParser() {
    var _this;
    (0, _classCallCheck3.default)(this, DayOfYearParser);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty3.default)((0, _assertThisInitialized3.default)(_this), "priority", 90);
    (0, _defineProperty3.default)((0, _assertThisInitialized3.default)(_this), "subpriority", 1);
    (0, _defineProperty3.default)((0, _assertThisInitialized3.default)(_this), "incompatibleTokens", ['Y', 'R', 'q', 'Q', 'M', 'L', 'w', 'I', 'd', 'E', 'i', 'e', 'c', 't', 'T']);
    return _this;
  }
  (0, _createClass3.default)(DayOfYearParser, [{
    key: "parse",
    value: function parse(dateString, token, match) {
      switch (token) {
        case 'D':
        case 'DD':
          return (0, _utils.parseNumericPattern)(_constants.numericPatterns.dayOfYear, dateString);
        case 'Do':
          return match.ordinalNumber(dateString, {
            unit: 'date'
          });
        default:
          return (0, _utils.parseNDigits)(token.length, dateString);
      }
    }
  }, {
    key: "validate",
    value: function validate(date, value) {
      var year = date.getUTCFullYear();
      var isLeapYear = (0, _utils.isLeapYearIndex)(year);
      if (isLeapYear) {
        return value >= 1 && value <= 366;
      } else {
        return value >= 1 && value <= 365;
      }
    }
  }, {
    key: "set",
    value: function set(date, _flags, value) {
      date.setUTCMonth(0, value);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    }
  }]);
  return DayOfYearParser;
}(_Parser2.Parser);
},{"@babel/runtime/helpers/esm/classCallCheck":517,"@babel/runtime/helpers/esm/createClass":516,"@babel/runtime/helpers/esm/assertThisInitialized":514,"@babel/runtime/helpers/esm/inherits":512,"@babel/runtime/helpers/esm/createSuper":513,"@babel/runtime/helpers/esm/defineProperty":515,"../Parser.js":564,"../constants.js":565,"../utils.js":566}],575:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setUTCDay;

var _index = require("../../toDate/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../toInteger/index.js");

var _index6 = _interopRequireDefault(_index5);

var _index7 = require("../defaultOptions/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function setUTCDay(dirtyDate, dirtyDay, options) {
  var _ref, _ref2, _ref3, _options$weekStartsOn, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
  (0, _index4.default)(2, arguments);
  var defaultOptions = (0, _index7.getDefaultOptions)();
  var weekStartsOn = (0, _index6.default)((_ref = (_ref2 = (_ref3 = (_options$weekStartsOn = options === null || options === void 0 ? void 0 : options.weekStartsOn) !== null && _options$weekStartsOn !== void 0 ? _options$weekStartsOn : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.weekStartsOn) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions.weekStartsOn) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.weekStartsOn) !== null && _ref !== void 0 ? _ref : 0);

  // Test if weekStartsOn is between 0 and 6 _and_ is not NaN
  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError('weekStartsOn must be between 0 and 6 inclusively');
  }
  var date = (0, _index2.default)(dirtyDate);
  var day = (0, _index6.default)(dirtyDay);
  var currentDay = date.getUTCDay();
  var remainder = day % 7;
  var dayIndex = (remainder + 7) % 7;
  var diff = (dayIndex < weekStartsOn ? 7 : 0) + day - currentDay;
  date.setUTCDate(date.getUTCDate() + diff);
  return date;
}
},{"../../toDate/index.js":243,"../requiredArgs/index.js":490,"../toInteger/index.js":491,"../defaultOptions/index.js":494}],531:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DayParser = undefined;

var _classCallCheck2 = require("@babel/runtime/helpers/esm/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("@babel/runtime/helpers/esm/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _assertThisInitialized2 = require("@babel/runtime/helpers/esm/assertThisInitialized");

var _assertThisInitialized3 = _interopRequireDefault(_assertThisInitialized2);

var _inherits2 = require("@babel/runtime/helpers/esm/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _createSuper2 = require("@babel/runtime/helpers/esm/createSuper");

var _createSuper3 = _interopRequireDefault(_createSuper2);

var _defineProperty2 = require("@babel/runtime/helpers/esm/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _Parser2 = require("../Parser.js");

var _index = require("../../../_lib/setUTCDay/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Day of week
var DayParser = /*#__PURE__*/exports.DayParser = function (_Parser) {
  (0, _inherits3.default)(DayParser, _Parser);
  var _super = (0, _createSuper3.default)(DayParser);
  function DayParser() {
    var _this;
    (0, _classCallCheck3.default)(this, DayParser);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty3.default)((0, _assertThisInitialized3.default)(_this), "priority", 90);
    (0, _defineProperty3.default)((0, _assertThisInitialized3.default)(_this), "incompatibleTokens", ['D', 'i', 'e', 'c', 't', 'T']);
    return _this;
  }
  (0, _createClass3.default)(DayParser, [{
    key: "parse",
    value: function parse(dateString, token, match) {
      switch (token) {
        // Tue
        case 'E':
        case 'EE':
        case 'EEE':
          return match.day(dateString, {
            width: 'abbreviated',
            context: 'formatting'
          }) || match.day(dateString, {
            width: 'short',
            context: 'formatting'
          }) || match.day(dateString, {
            width: 'narrow',
            context: 'formatting'
          });
        // T
        case 'EEEEE':
          return match.day(dateString, {
            width: 'narrow',
            context: 'formatting'
          });
        // Tu
        case 'EEEEEE':
          return match.day(dateString, {
            width: 'short',
            context: 'formatting'
          }) || match.day(dateString, {
            width: 'narrow',
            context: 'formatting'
          });
        // Tuesday
        case 'EEEE':
        default:
          return match.day(dateString, {
            width: 'wide',
            context: 'formatting'
          }) || match.day(dateString, {
            width: 'abbreviated',
            context: 'formatting'
          }) || match.day(dateString, {
            width: 'short',
            context: 'formatting'
          }) || match.day(dateString, {
            width: 'narrow',
            context: 'formatting'
          });
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value >= 0 && value <= 6;
    }
  }, {
    key: "set",
    value: function set(date, _flags, value, options) {
      date = (0, _index2.default)(date, value, options);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    }
  }]);
  return DayParser;
}(_Parser2.Parser);
},{"@babel/runtime/helpers/esm/classCallCheck":517,"@babel/runtime/helpers/esm/createClass":516,"@babel/runtime/helpers/esm/assertThisInitialized":514,"@babel/runtime/helpers/esm/inherits":512,"@babel/runtime/helpers/esm/createSuper":513,"@babel/runtime/helpers/esm/defineProperty":515,"../Parser.js":564,"../../../_lib/setUTCDay/index.js":575}],532:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LocalDayParser = undefined;

var _classCallCheck2 = require("@babel/runtime/helpers/esm/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("@babel/runtime/helpers/esm/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _assertThisInitialized2 = require("@babel/runtime/helpers/esm/assertThisInitialized");

var _assertThisInitialized3 = _interopRequireDefault(_assertThisInitialized2);

var _inherits2 = require("@babel/runtime/helpers/esm/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _createSuper2 = require("@babel/runtime/helpers/esm/createSuper");

var _createSuper3 = _interopRequireDefault(_createSuper2);

var _defineProperty2 = require("@babel/runtime/helpers/esm/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _Parser2 = require("../Parser.js");

var _utils = require("../utils.js");

var _index = require("../../../_lib/setUTCDay/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Local day of week
var LocalDayParser = /*#__PURE__*/exports.LocalDayParser = function (_Parser) {
  (0, _inherits3.default)(LocalDayParser, _Parser);
  var _super = (0, _createSuper3.default)(LocalDayParser);
  function LocalDayParser() {
    var _this;
    (0, _classCallCheck3.default)(this, LocalDayParser);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty3.default)((0, _assertThisInitialized3.default)(_this), "priority", 90);
    (0, _defineProperty3.default)((0, _assertThisInitialized3.default)(_this), "incompatibleTokens", ['y', 'R', 'u', 'q', 'Q', 'M', 'L', 'I', 'd', 'D', 'E', 'i', 'c', 't', 'T']);
    return _this;
  }
  (0, _createClass3.default)(LocalDayParser, [{
    key: "parse",
    value: function parse(dateString, token, match, options) {
      var valueCallback = function valueCallback(value) {
        var wholeWeekDays = Math.floor((value - 1) / 7) * 7;
        return (value + options.weekStartsOn + 6) % 7 + wholeWeekDays;
      };
      switch (token) {
        // 3
        case 'e':
        case 'ee':
          // 03
          return (0, _utils.mapValue)((0, _utils.parseNDigits)(token.length, dateString), valueCallback);
        // 3rd
        case 'eo':
          return (0, _utils.mapValue)(match.ordinalNumber(dateString, {
            unit: 'day'
          }), valueCallback);
        // Tue
        case 'eee':
          return match.day(dateString, {
            width: 'abbreviated',
            context: 'formatting'
          }) || match.day(dateString, {
            width: 'short',
            context: 'formatting'
          }) || match.day(dateString, {
            width: 'narrow',
            context: 'formatting'
          });
        // T
        case 'eeeee':
          return match.day(dateString, {
            width: 'narrow',
            context: 'formatting'
          });
        // Tu
        case 'eeeeee':
          return match.day(dateString, {
            width: 'short',
            context: 'formatting'
          }) || match.day(dateString, {
            width: 'narrow',
            context: 'formatting'
          });
        // Tuesday
        case 'eeee':
        default:
          return match.day(dateString, {
            width: 'wide',
            context: 'formatting'
          }) || match.day(dateString, {
            width: 'abbreviated',
            context: 'formatting'
          }) || match.day(dateString, {
            width: 'short',
            context: 'formatting'
          }) || match.day(dateString, {
            width: 'narrow',
            context: 'formatting'
          });
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value >= 0 && value <= 6;
    }
  }, {
    key: "set",
    value: function set(date, _flags, value, options) {
      date = (0, _index2.default)(date, value, options);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    }
  }]);
  return LocalDayParser;
}(_Parser2.Parser);
},{"@babel/runtime/helpers/esm/classCallCheck":517,"@babel/runtime/helpers/esm/createClass":516,"@babel/runtime/helpers/esm/assertThisInitialized":514,"@babel/runtime/helpers/esm/inherits":512,"@babel/runtime/helpers/esm/createSuper":513,"@babel/runtime/helpers/esm/defineProperty":515,"../Parser.js":564,"../utils.js":566,"../../../_lib/setUTCDay/index.js":575}],533:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StandAloneLocalDayParser = undefined;

var _classCallCheck2 = require("@babel/runtime/helpers/esm/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("@babel/runtime/helpers/esm/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _assertThisInitialized2 = require("@babel/runtime/helpers/esm/assertThisInitialized");

var _assertThisInitialized3 = _interopRequireDefault(_assertThisInitialized2);

var _inherits2 = require("@babel/runtime/helpers/esm/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _createSuper2 = require("@babel/runtime/helpers/esm/createSuper");

var _createSuper3 = _interopRequireDefault(_createSuper2);

var _defineProperty2 = require("@babel/runtime/helpers/esm/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _Parser2 = require("../Parser.js");

var _utils = require("../utils.js");

var _index = require("../../../_lib/setUTCDay/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Stand-alone local day of week
var StandAloneLocalDayParser = /*#__PURE__*/exports.StandAloneLocalDayParser = function (_Parser) {
  (0, _inherits3.default)(StandAloneLocalDayParser, _Parser);
  var _super = (0, _createSuper3.default)(StandAloneLocalDayParser);
  function StandAloneLocalDayParser() {
    var _this;
    (0, _classCallCheck3.default)(this, StandAloneLocalDayParser);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty3.default)((0, _assertThisInitialized3.default)(_this), "priority", 90);
    (0, _defineProperty3.default)((0, _assertThisInitialized3.default)(_this), "incompatibleTokens", ['y', 'R', 'u', 'q', 'Q', 'M', 'L', 'I', 'd', 'D', 'E', 'i', 'e', 't', 'T']);
    return _this;
  }
  (0, _createClass3.default)(StandAloneLocalDayParser, [{
    key: "parse",
    value: function parse(dateString, token, match, options) {
      var valueCallback = function valueCallback(value) {
        var wholeWeekDays = Math.floor((value - 1) / 7) * 7;
        return (value + options.weekStartsOn + 6) % 7 + wholeWeekDays;
      };
      switch (token) {
        // 3
        case 'c':
        case 'cc':
          // 03
          return (0, _utils.mapValue)((0, _utils.parseNDigits)(token.length, dateString), valueCallback);
        // 3rd
        case 'co':
          return (0, _utils.mapValue)(match.ordinalNumber(dateString, {
            unit: 'day'
          }), valueCallback);
        // Tue
        case 'ccc':
          return match.day(dateString, {
            width: 'abbreviated',
            context: 'standalone'
          }) || match.day(dateString, {
            width: 'short',
            context: 'standalone'
          }) || match.day(dateString, {
            width: 'narrow',
            context: 'standalone'
          });
        // T
        case 'ccccc':
          return match.day(dateString, {
            width: 'narrow',
            context: 'standalone'
          });
        // Tu
        case 'cccccc':
          return match.day(dateString, {
            width: 'short',
            context: 'standalone'
          }) || match.day(dateString, {
            width: 'narrow',
            context: 'standalone'
          });
        // Tuesday
        case 'cccc':
        default:
          return match.day(dateString, {
            width: 'wide',
            context: 'standalone'
          }) || match.day(dateString, {
            width: 'abbreviated',
            context: 'standalone'
          }) || match.day(dateString, {
            width: 'short',
            context: 'standalone'
          }) || match.day(dateString, {
            width: 'narrow',
            context: 'standalone'
          });
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value >= 0 && value <= 6;
    }
  }, {
    key: "set",
    value: function set(date, _flags, value, options) {
      date = (0, _index2.default)(date, value, options);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    }
  }]);
  return StandAloneLocalDayParser;
}(_Parser2.Parser);
},{"@babel/runtime/helpers/esm/classCallCheck":517,"@babel/runtime/helpers/esm/createClass":516,"@babel/runtime/helpers/esm/assertThisInitialized":514,"@babel/runtime/helpers/esm/inherits":512,"@babel/runtime/helpers/esm/createSuper":513,"@babel/runtime/helpers/esm/defineProperty":515,"../Parser.js":564,"../utils.js":566,"../../../_lib/setUTCDay/index.js":575}],572:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setUTCISODay;

var _index = require("../../toDate/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../toInteger/index.js");

var _index6 = _interopRequireDefault(_index5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function setUTCISODay(dirtyDate, dirtyDay) {
  (0, _index4.default)(2, arguments);
  var day = (0, _index6.default)(dirtyDay);
  if (day % 7 === 0) {
    day = day - 7;
  }
  var weekStartsOn = 1;
  var date = (0, _index2.default)(dirtyDate);
  var currentDay = date.getUTCDay();
  var remainder = day % 7;
  var dayIndex = (remainder + 7) % 7;
  var diff = (dayIndex < weekStartsOn ? 7 : 0) + day - currentDay;
  date.setUTCDate(date.getUTCDate() + diff);
  return date;
}
},{"../../toDate/index.js":243,"../requiredArgs/index.js":490,"../toInteger/index.js":491}],534:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ISODayParser = undefined;

var _classCallCheck2 = require("@babel/runtime/helpers/esm/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("@babel/runtime/helpers/esm/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _assertThisInitialized2 = require("@babel/runtime/helpers/esm/assertThisInitialized");

var _assertThisInitialized3 = _interopRequireDefault(_assertThisInitialized2);

var _inherits2 = require("@babel/runtime/helpers/esm/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _createSuper2 = require("@babel/runtime/helpers/esm/createSuper");

var _createSuper3 = _interopRequireDefault(_createSuper2);

var _defineProperty2 = require("@babel/runtime/helpers/esm/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _Parser2 = require("../Parser.js");

var _utils = require("../utils.js");

var _index = require("../../../_lib/setUTCISODay/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ISO day of week
var ISODayParser = /*#__PURE__*/exports.ISODayParser = function (_Parser) {
  (0, _inherits3.default)(ISODayParser, _Parser);
  var _super = (0, _createSuper3.default)(ISODayParser);
  function ISODayParser() {
    var _this;
    (0, _classCallCheck3.default)(this, ISODayParser);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty3.default)((0, _assertThisInitialized3.default)(_this), "priority", 90);
    (0, _defineProperty3.default)((0, _assertThisInitialized3.default)(_this), "incompatibleTokens", ['y', 'Y', 'u', 'q', 'Q', 'M', 'L', 'w', 'd', 'D', 'E', 'e', 'c', 't', 'T']);
    return _this;
  }
  (0, _createClass3.default)(ISODayParser, [{
    key: "parse",
    value: function parse(dateString, token, match) {
      var valueCallback = function valueCallback(value) {
        if (value === 0) {
          return 7;
        }
        return value;
      };
      switch (token) {
        // 2
        case 'i':
        case 'ii':
          // 02
          return (0, _utils.parseNDigits)(token.length, dateString);
        // 2nd
        case 'io':
          return match.ordinalNumber(dateString, {
            unit: 'day'
          });
        // Tue
        case 'iii':
          return (0, _utils.mapValue)(match.day(dateString, {
            width: 'abbreviated',
            context: 'formatting'
          }) || match.day(dateString, {
            width: 'short',
            context: 'formatting'
          }) || match.day(dateString, {
            width: 'narrow',
            context: 'formatting'
          }), valueCallback);
        // T
        case 'iiiii':
          return (0, _utils.mapValue)(match.day(dateString, {
            width: 'narrow',
            context: 'formatting'
          }), valueCallback);
        // Tu
        case 'iiiiii':
          return (0, _utils.mapValue)(match.day(dateString, {
            width: 'short',
            context: 'formatting'
          }) || match.day(dateString, {
            width: 'narrow',
            context: 'formatting'
          }), valueCallback);
        // Tuesday
        case 'iiii':
        default:
          return (0, _utils.mapValue)(match.day(dateString, {
            width: 'wide',
            context: 'formatting'
          }) || match.day(dateString, {
            width: 'abbreviated',
            context: 'formatting'
          }) || match.day(dateString, {
            width: 'short',
            context: 'formatting'
          }) || match.day(dateString, {
            width: 'narrow',
            context: 'formatting'
          }), valueCallback);
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value >= 1 && value <= 7;
    }
  }, {
    key: "set",
    value: function set(date, _flags, value) {
      date = (0, _index2.default)(date, value);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    }
  }]);
  return ISODayParser;
}(_Parser2.Parser);
},{"@babel/runtime/helpers/esm/classCallCheck":517,"@babel/runtime/helpers/esm/createClass":516,"@babel/runtime/helpers/esm/assertThisInitialized":514,"@babel/runtime/helpers/esm/inherits":512,"@babel/runtime/helpers/esm/createSuper":513,"@babel/runtime/helpers/esm/defineProperty":515,"../Parser.js":564,"../utils.js":566,"../../../_lib/setUTCISODay/index.js":572}],535:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AMPMParser = undefined;

var _classCallCheck2 = require("@babel/runtime/helpers/esm/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("@babel/runtime/helpers/esm/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _assertThisInitialized2 = require("@babel/runtime/helpers/esm/assertThisInitialized");

var _assertThisInitialized3 = _interopRequireDefault(_assertThisInitialized2);

var _inherits2 = require("@babel/runtime/helpers/esm/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _createSuper2 = require("@babel/runtime/helpers/esm/createSuper");

var _createSuper3 = _interopRequireDefault(_createSuper2);

var _defineProperty2 = require("@babel/runtime/helpers/esm/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _Parser2 = require("../Parser.js");

var _utils = require("../utils.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AMPMParser = /*#__PURE__*/exports.AMPMParser = function (_Parser) {
  (0, _inherits3.default)(AMPMParser, _Parser);
  var _super = (0, _createSuper3.default)(AMPMParser);
  function AMPMParser() {
    var _this;
    (0, _classCallCheck3.default)(this, AMPMParser);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty3.default)((0, _assertThisInitialized3.default)(_this), "priority", 80);
    (0, _defineProperty3.default)((0, _assertThisInitialized3.default)(_this), "incompatibleTokens", ['b', 'B', 'H', 'k', 't', 'T']);
    return _this;
  }
  (0, _createClass3.default)(AMPMParser, [{
    key: "parse",
    value: function parse(dateString, token, match) {
      switch (token) {
        case 'a':
        case 'aa':
        case 'aaa':
          return match.dayPeriod(dateString, {
            width: 'abbreviated',
            context: 'formatting'
          }) || match.dayPeriod(dateString, {
            width: 'narrow',
            context: 'formatting'
          });
        case 'aaaaa':
          return match.dayPeriod(dateString, {
            width: 'narrow',
            context: 'formatting'
          });
        case 'aaaa':
        default:
          return match.dayPeriod(dateString, {
            width: 'wide',
            context: 'formatting'
          }) || match.dayPeriod(dateString, {
            width: 'abbreviated',
            context: 'formatting'
          }) || match.dayPeriod(dateString, {
            width: 'narrow',
            context: 'formatting'
          });
      }
    }
  }, {
    key: "set",
    value: function set(date, _flags, value) {
      date.setUTCHours((0, _utils.dayPeriodEnumToHours)(value), 0, 0, 0);
      return date;
    }
  }]);
  return AMPMParser;
}(_Parser2.Parser);
},{"@babel/runtime/helpers/esm/classCallCheck":517,"@babel/runtime/helpers/esm/createClass":516,"@babel/runtime/helpers/esm/assertThisInitialized":514,"@babel/runtime/helpers/esm/inherits":512,"@babel/runtime/helpers/esm/createSuper":513,"@babel/runtime/helpers/esm/defineProperty":515,"../Parser.js":564,"../utils.js":566}],536:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AMPMMidnightParser = undefined;

var _classCallCheck2 = require("@babel/runtime/helpers/esm/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("@babel/runtime/helpers/esm/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _assertThisInitialized2 = require("@babel/runtime/helpers/esm/assertThisInitialized");

var _assertThisInitialized3 = _interopRequireDefault(_assertThisInitialized2);

var _inherits2 = require("@babel/runtime/helpers/esm/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _createSuper2 = require("@babel/runtime/helpers/esm/createSuper");

var _createSuper3 = _interopRequireDefault(_createSuper2);

var _defineProperty2 = require("@babel/runtime/helpers/esm/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _Parser2 = require("../Parser.js");

var _utils = require("../utils.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AMPMMidnightParser = /*#__PURE__*/exports.AMPMMidnightParser = function (_Parser) {
  (0, _inherits3.default)(AMPMMidnightParser, _Parser);
  var _super = (0, _createSuper3.default)(AMPMMidnightParser);
  function AMPMMidnightParser() {
    var _this;
    (0, _classCallCheck3.default)(this, AMPMMidnightParser);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty3.default)((0, _assertThisInitialized3.default)(_this), "priority", 80);
    (0, _defineProperty3.default)((0, _assertThisInitialized3.default)(_this), "incompatibleTokens", ['a', 'B', 'H', 'k', 't', 'T']);
    return _this;
  }
  (0, _createClass3.default)(AMPMMidnightParser, [{
    key: "parse",
    value: function parse(dateString, token, match) {
      switch (token) {
        case 'b':
        case 'bb':
        case 'bbb':
          return match.dayPeriod(dateString, {
            width: 'abbreviated',
            context: 'formatting'
          }) || match.dayPeriod(dateString, {
            width: 'narrow',
            context: 'formatting'
          });
        case 'bbbbb':
          return match.dayPeriod(dateString, {
            width: 'narrow',
            context: 'formatting'
          });
        case 'bbbb':
        default:
          return match.dayPeriod(dateString, {
            width: 'wide',
            context: 'formatting'
          }) || match.dayPeriod(dateString, {
            width: 'abbreviated',
            context: 'formatting'
          }) || match.dayPeriod(dateString, {
            width: 'narrow',
            context: 'formatting'
          });
      }
    }
  }, {
    key: "set",
    value: function set(date, _flags, value) {
      date.setUTCHours((0, _utils.dayPeriodEnumToHours)(value), 0, 0, 0);
      return date;
    }
  }]);
  return AMPMMidnightParser;
}(_Parser2.Parser);
},{"@babel/runtime/helpers/esm/classCallCheck":517,"@babel/runtime/helpers/esm/createClass":516,"@babel/runtime/helpers/esm/assertThisInitialized":514,"@babel/runtime/helpers/esm/inherits":512,"@babel/runtime/helpers/esm/createSuper":513,"@babel/runtime/helpers/esm/defineProperty":515,"../Parser.js":564,"../utils.js":566}],537:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DayPeriodParser = undefined;

var _classCallCheck2 = require("@babel/runtime/helpers/esm/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("@babel/runtime/helpers/esm/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _assertThisInitialized2 = require("@babel/runtime/helpers/esm/assertThisInitialized");

var _assertThisInitialized3 = _interopRequireDefault(_assertThisInitialized2);

var _inherits2 = require("@babel/runtime/helpers/esm/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _createSuper2 = require("@babel/runtime/helpers/esm/createSuper");

var _createSuper3 = _interopRequireDefault(_createSuper2);

var _defineProperty2 = require("@babel/runtime/helpers/esm/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _Parser2 = require("../Parser.js");

var _utils = require("../utils.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// in the morning, in the afternoon, in the evening, at night
var DayPeriodParser = /*#__PURE__*/exports.DayPeriodParser = function (_Parser) {
  (0, _inherits3.default)(DayPeriodParser, _Parser);
  var _super = (0, _createSuper3.default)(DayPeriodParser);
  function DayPeriodParser() {
    var _this;
    (0, _classCallCheck3.default)(this, DayPeriodParser);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty3.default)((0, _assertThisInitialized3.default)(_this), "priority", 80);
    (0, _defineProperty3.default)((0, _assertThisInitialized3.default)(_this), "incompatibleTokens", ['a', 'b', 't', 'T']);
    return _this;
  }
  (0, _createClass3.default)(DayPeriodParser, [{
    key: "parse",
    value: function parse(dateString, token, match) {
      switch (token) {
        case 'B':
        case 'BB':
        case 'BBB':
          return match.dayPeriod(dateString, {
            width: 'abbreviated',
            context: 'formatting'
          }) || match.dayPeriod(dateString, {
            width: 'narrow',
            context: 'formatting'
          });
        case 'BBBBB':
          return match.dayPeriod(dateString, {
            width: 'narrow',
            context: 'formatting'
          });
        case 'BBBB':
        default:
          return match.dayPeriod(dateString, {
            width: 'wide',
            context: 'formatting'
          }) || match.dayPeriod(dateString, {
            width: 'abbreviated',
            context: 'formatting'
          }) || match.dayPeriod(dateString, {
            width: 'narrow',
            context: 'formatting'
          });
      }
    }
  }, {
    key: "set",
    value: function set(date, _flags, value) {
      date.setUTCHours((0, _utils.dayPeriodEnumToHours)(value), 0, 0, 0);
      return date;
    }
  }]);
  return DayPeriodParser;
}(_Parser2.Parser);
},{"@babel/runtime/helpers/esm/classCallCheck":517,"@babel/runtime/helpers/esm/createClass":516,"@babel/runtime/helpers/esm/assertThisInitialized":514,"@babel/runtime/helpers/esm/inherits":512,"@babel/runtime/helpers/esm/createSuper":513,"@babel/runtime/helpers/esm/defineProperty":515,"../Parser.js":564,"../utils.js":566}],538:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Hour1to12Parser = undefined;

var _classCallCheck2 = require("@babel/runtime/helpers/esm/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("@babel/runtime/helpers/esm/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _assertThisInitialized2 = require("@babel/runtime/helpers/esm/assertThisInitialized");

var _assertThisInitialized3 = _interopRequireDefault(_assertThisInitialized2);

var _inherits2 = require("@babel/runtime/helpers/esm/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _createSuper2 = require("@babel/runtime/helpers/esm/createSuper");

var _createSuper3 = _interopRequireDefault(_createSuper2);

var _defineProperty2 = require("@babel/runtime/helpers/esm/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _Parser2 = require("../Parser.js");

var _constants = require("../constants.js");

var _utils = require("../utils.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Hour1to12Parser = /*#__PURE__*/exports.Hour1to12Parser = function (_Parser) {
  (0, _inherits3.default)(Hour1to12Parser, _Parser);
  var _super = (0, _createSuper3.default)(Hour1to12Parser);
  function Hour1to12Parser() {
    var _this;
    (0, _classCallCheck3.default)(this, Hour1to12Parser);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty3.default)((0, _assertThisInitialized3.default)(_this), "priority", 70);
    (0, _defineProperty3.default)((0, _assertThisInitialized3.default)(_this), "incompatibleTokens", ['H', 'K', 'k', 't', 'T']);
    return _this;
  }
  (0, _createClass3.default)(Hour1to12Parser, [{
    key: "parse",
    value: function parse(dateString, token, match) {
      switch (token) {
        case 'h':
          return (0, _utils.parseNumericPattern)(_constants.numericPatterns.hour12h, dateString);
        case 'ho':
          return match.ordinalNumber(dateString, {
            unit: 'hour'
          });
        default:
          return (0, _utils.parseNDigits)(token.length, dateString);
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value >= 1 && value <= 12;
    }
  }, {
    key: "set",
    value: function set(date, _flags, value) {
      var isPM = date.getUTCHours() >= 12;
      if (isPM && value < 12) {
        date.setUTCHours(value + 12, 0, 0, 0);
      } else if (!isPM && value === 12) {
        date.setUTCHours(0, 0, 0, 0);
      } else {
        date.setUTCHours(value, 0, 0, 0);
      }
      return date;
    }
  }]);
  return Hour1to12Parser;
}(_Parser2.Parser);
},{"@babel/runtime/helpers/esm/classCallCheck":517,"@babel/runtime/helpers/esm/createClass":516,"@babel/runtime/helpers/esm/assertThisInitialized":514,"@babel/runtime/helpers/esm/inherits":512,"@babel/runtime/helpers/esm/createSuper":513,"@babel/runtime/helpers/esm/defineProperty":515,"../Parser.js":564,"../constants.js":565,"../utils.js":566}],539:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Hour0to23Parser = undefined;

var _classCallCheck2 = require("@babel/runtime/helpers/esm/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("@babel/runtime/helpers/esm/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _assertThisInitialized2 = require("@babel/runtime/helpers/esm/assertThisInitialized");

var _assertThisInitialized3 = _interopRequireDefault(_assertThisInitialized2);

var _inherits2 = require("@babel/runtime/helpers/esm/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _createSuper2 = require("@babel/runtime/helpers/esm/createSuper");

var _createSuper3 = _interopRequireDefault(_createSuper2);

var _defineProperty2 = require("@babel/runtime/helpers/esm/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _Parser2 = require("../Parser.js");

var _constants = require("../constants.js");

var _utils = require("../utils.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Hour0to23Parser = /*#__PURE__*/exports.Hour0to23Parser = function (_Parser) {
  (0, _inherits3.default)(Hour0to23Parser, _Parser);
  var _super = (0, _createSuper3.default)(Hour0to23Parser);
  function Hour0to23Parser() {
    var _this;
    (0, _classCallCheck3.default)(this, Hour0to23Parser);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty3.default)((0, _assertThisInitialized3.default)(_this), "priority", 70);
    (0, _defineProperty3.default)((0, _assertThisInitialized3.default)(_this), "incompatibleTokens", ['a', 'b', 'h', 'K', 'k', 't', 'T']);
    return _this;
  }
  (0, _createClass3.default)(Hour0to23Parser, [{
    key: "parse",
    value: function parse(dateString, token, match) {
      switch (token) {
        case 'H':
          return (0, _utils.parseNumericPattern)(_constants.numericPatterns.hour23h, dateString);
        case 'Ho':
          return match.ordinalNumber(dateString, {
            unit: 'hour'
          });
        default:
          return (0, _utils.parseNDigits)(token.length, dateString);
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value >= 0 && value <= 23;
    }
  }, {
    key: "set",
    value: function set(date, _flags, value) {
      date.setUTCHours(value, 0, 0, 0);
      return date;
    }
  }]);
  return Hour0to23Parser;
}(_Parser2.Parser);
},{"@babel/runtime/helpers/esm/classCallCheck":517,"@babel/runtime/helpers/esm/createClass":516,"@babel/runtime/helpers/esm/assertThisInitialized":514,"@babel/runtime/helpers/esm/inherits":512,"@babel/runtime/helpers/esm/createSuper":513,"@babel/runtime/helpers/esm/defineProperty":515,"../Parser.js":564,"../constants.js":565,"../utils.js":566}],540:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Hour0To11Parser = undefined;

var _classCallCheck2 = require("@babel/runtime/helpers/esm/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("@babel/runtime/helpers/esm/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _assertThisInitialized2 = require("@babel/runtime/helpers/esm/assertThisInitialized");

var _assertThisInitialized3 = _interopRequireDefault(_assertThisInitialized2);

var _inherits2 = require("@babel/runtime/helpers/esm/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _createSuper2 = require("@babel/runtime/helpers/esm/createSuper");

var _createSuper3 = _interopRequireDefault(_createSuper2);

var _defineProperty2 = require("@babel/runtime/helpers/esm/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _Parser2 = require("../Parser.js");

var _constants = require("../constants.js");

var _utils = require("../utils.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Hour0To11Parser = /*#__PURE__*/exports.Hour0To11Parser = function (_Parser) {
  (0, _inherits3.default)(Hour0To11Parser, _Parser);
  var _super = (0, _createSuper3.default)(Hour0To11Parser);
  function Hour0To11Parser() {
    var _this;
    (0, _classCallCheck3.default)(this, Hour0To11Parser);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty3.default)((0, _assertThisInitialized3.default)(_this), "priority", 70);
    (0, _defineProperty3.default)((0, _assertThisInitialized3.default)(_this), "incompatibleTokens", ['h', 'H', 'k', 't', 'T']);
    return _this;
  }
  (0, _createClass3.default)(Hour0To11Parser, [{
    key: "parse",
    value: function parse(dateString, token, match) {
      switch (token) {
        case 'K':
          return (0, _utils.parseNumericPattern)(_constants.numericPatterns.hour11h, dateString);
        case 'Ko':
          return match.ordinalNumber(dateString, {
            unit: 'hour'
          });
        default:
          return (0, _utils.parseNDigits)(token.length, dateString);
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value >= 0 && value <= 11;
    }
  }, {
    key: "set",
    value: function set(date, _flags, value) {
      var isPM = date.getUTCHours() >= 12;
      if (isPM && value < 12) {
        date.setUTCHours(value + 12, 0, 0, 0);
      } else {
        date.setUTCHours(value, 0, 0, 0);
      }
      return date;
    }
  }]);
  return Hour0To11Parser;
}(_Parser2.Parser);
},{"@babel/runtime/helpers/esm/classCallCheck":517,"@babel/runtime/helpers/esm/createClass":516,"@babel/runtime/helpers/esm/assertThisInitialized":514,"@babel/runtime/helpers/esm/inherits":512,"@babel/runtime/helpers/esm/createSuper":513,"@babel/runtime/helpers/esm/defineProperty":515,"../Parser.js":564,"../constants.js":565,"../utils.js":566}],541:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Hour1To24Parser = undefined;

var _classCallCheck2 = require("@babel/runtime/helpers/esm/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("@babel/runtime/helpers/esm/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _assertThisInitialized2 = require("@babel/runtime/helpers/esm/assertThisInitialized");

var _assertThisInitialized3 = _interopRequireDefault(_assertThisInitialized2);

var _inherits2 = require("@babel/runtime/helpers/esm/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _createSuper2 = require("@babel/runtime/helpers/esm/createSuper");

var _createSuper3 = _interopRequireDefault(_createSuper2);

var _defineProperty2 = require("@babel/runtime/helpers/esm/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _Parser2 = require("../Parser.js");

var _constants = require("../constants.js");

var _utils = require("../utils.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Hour1To24Parser = /*#__PURE__*/exports.Hour1To24Parser = function (_Parser) {
  (0, _inherits3.default)(Hour1To24Parser, _Parser);
  var _super = (0, _createSuper3.default)(Hour1To24Parser);
  function Hour1To24Parser() {
    var _this;
    (0, _classCallCheck3.default)(this, Hour1To24Parser);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty3.default)((0, _assertThisInitialized3.default)(_this), "priority", 70);
    (0, _defineProperty3.default)((0, _assertThisInitialized3.default)(_this), "incompatibleTokens", ['a', 'b', 'h', 'H', 'K', 't', 'T']);
    return _this;
  }
  (0, _createClass3.default)(Hour1To24Parser, [{
    key: "parse",
    value: function parse(dateString, token, match) {
      switch (token) {
        case 'k':
          return (0, _utils.parseNumericPattern)(_constants.numericPatterns.hour24h, dateString);
        case 'ko':
          return match.ordinalNumber(dateString, {
            unit: 'hour'
          });
        default:
          return (0, _utils.parseNDigits)(token.length, dateString);
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value >= 1 && value <= 24;
    }
  }, {
    key: "set",
    value: function set(date, _flags, value) {
      var hours = value <= 24 ? value % 24 : value;
      date.setUTCHours(hours, 0, 0, 0);
      return date;
    }
  }]);
  return Hour1To24Parser;
}(_Parser2.Parser);
},{"@babel/runtime/helpers/esm/classCallCheck":517,"@babel/runtime/helpers/esm/createClass":516,"@babel/runtime/helpers/esm/assertThisInitialized":514,"@babel/runtime/helpers/esm/inherits":512,"@babel/runtime/helpers/esm/createSuper":513,"@babel/runtime/helpers/esm/defineProperty":515,"../Parser.js":564,"../constants.js":565,"../utils.js":566}],542:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MinuteParser = undefined;

var _classCallCheck2 = require("@babel/runtime/helpers/esm/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("@babel/runtime/helpers/esm/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _assertThisInitialized2 = require("@babel/runtime/helpers/esm/assertThisInitialized");

var _assertThisInitialized3 = _interopRequireDefault(_assertThisInitialized2);

var _inherits2 = require("@babel/runtime/helpers/esm/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _createSuper2 = require("@babel/runtime/helpers/esm/createSuper");

var _createSuper3 = _interopRequireDefault(_createSuper2);

var _defineProperty2 = require("@babel/runtime/helpers/esm/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _Parser2 = require("../Parser.js");

var _constants = require("../constants.js");

var _utils = require("../utils.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MinuteParser = /*#__PURE__*/exports.MinuteParser = function (_Parser) {
  (0, _inherits3.default)(MinuteParser, _Parser);
  var _super = (0, _createSuper3.default)(MinuteParser);
  function MinuteParser() {
    var _this;
    (0, _classCallCheck3.default)(this, MinuteParser);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty3.default)((0, _assertThisInitialized3.default)(_this), "priority", 60);
    (0, _defineProperty3.default)((0, _assertThisInitialized3.default)(_this), "incompatibleTokens", ['t', 'T']);
    return _this;
  }
  (0, _createClass3.default)(MinuteParser, [{
    key: "parse",
    value: function parse(dateString, token, match) {
      switch (token) {
        case 'm':
          return (0, _utils.parseNumericPattern)(_constants.numericPatterns.minute, dateString);
        case 'mo':
          return match.ordinalNumber(dateString, {
            unit: 'minute'
          });
        default:
          return (0, _utils.parseNDigits)(token.length, dateString);
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value >= 0 && value <= 59;
    }
  }, {
    key: "set",
    value: function set(date, _flags, value) {
      date.setUTCMinutes(value, 0, 0);
      return date;
    }
  }]);
  return MinuteParser;
}(_Parser2.Parser);
},{"@babel/runtime/helpers/esm/classCallCheck":517,"@babel/runtime/helpers/esm/createClass":516,"@babel/runtime/helpers/esm/assertThisInitialized":514,"@babel/runtime/helpers/esm/inherits":512,"@babel/runtime/helpers/esm/createSuper":513,"@babel/runtime/helpers/esm/defineProperty":515,"../Parser.js":564,"../constants.js":565,"../utils.js":566}],543:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SecondParser = undefined;

var _classCallCheck2 = require("@babel/runtime/helpers/esm/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("@babel/runtime/helpers/esm/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _assertThisInitialized2 = require("@babel/runtime/helpers/esm/assertThisInitialized");

var _assertThisInitialized3 = _interopRequireDefault(_assertThisInitialized2);

var _inherits2 = require("@babel/runtime/helpers/esm/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _createSuper2 = require("@babel/runtime/helpers/esm/createSuper");

var _createSuper3 = _interopRequireDefault(_createSuper2);

var _defineProperty2 = require("@babel/runtime/helpers/esm/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _Parser2 = require("../Parser.js");

var _constants = require("../constants.js");

var _utils = require("../utils.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SecondParser = /*#__PURE__*/exports.SecondParser = function (_Parser) {
  (0, _inherits3.default)(SecondParser, _Parser);
  var _super = (0, _createSuper3.default)(SecondParser);
  function SecondParser() {
    var _this;
    (0, _classCallCheck3.default)(this, SecondParser);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty3.default)((0, _assertThisInitialized3.default)(_this), "priority", 50);
    (0, _defineProperty3.default)((0, _assertThisInitialized3.default)(_this), "incompatibleTokens", ['t', 'T']);
    return _this;
  }
  (0, _createClass3.default)(SecondParser, [{
    key: "parse",
    value: function parse(dateString, token, match) {
      switch (token) {
        case 's':
          return (0, _utils.parseNumericPattern)(_constants.numericPatterns.second, dateString);
        case 'so':
          return match.ordinalNumber(dateString, {
            unit: 'second'
          });
        default:
          return (0, _utils.parseNDigits)(token.length, dateString);
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value >= 0 && value <= 59;
    }
  }, {
    key: "set",
    value: function set(date, _flags, value) {
      date.setUTCSeconds(value, 0);
      return date;
    }
  }]);
  return SecondParser;
}(_Parser2.Parser);
},{"@babel/runtime/helpers/esm/classCallCheck":517,"@babel/runtime/helpers/esm/createClass":516,"@babel/runtime/helpers/esm/assertThisInitialized":514,"@babel/runtime/helpers/esm/inherits":512,"@babel/runtime/helpers/esm/createSuper":513,"@babel/runtime/helpers/esm/defineProperty":515,"../Parser.js":564,"../constants.js":565,"../utils.js":566}],544:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FractionOfSecondParser = undefined;

var _classCallCheck2 = require("@babel/runtime/helpers/esm/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("@babel/runtime/helpers/esm/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _assertThisInitialized2 = require("@babel/runtime/helpers/esm/assertThisInitialized");

var _assertThisInitialized3 = _interopRequireDefault(_assertThisInitialized2);

var _inherits2 = require("@babel/runtime/helpers/esm/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _createSuper2 = require("@babel/runtime/helpers/esm/createSuper");

var _createSuper3 = _interopRequireDefault(_createSuper2);

var _defineProperty2 = require("@babel/runtime/helpers/esm/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _Parser2 = require("../Parser.js");

var _utils = require("../utils.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FractionOfSecondParser = /*#__PURE__*/exports.FractionOfSecondParser = function (_Parser) {
  (0, _inherits3.default)(FractionOfSecondParser, _Parser);
  var _super = (0, _createSuper3.default)(FractionOfSecondParser);
  function FractionOfSecondParser() {
    var _this;
    (0, _classCallCheck3.default)(this, FractionOfSecondParser);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty3.default)((0, _assertThisInitialized3.default)(_this), "priority", 30);
    (0, _defineProperty3.default)((0, _assertThisInitialized3.default)(_this), "incompatibleTokens", ['t', 'T']);
    return _this;
  }
  (0, _createClass3.default)(FractionOfSecondParser, [{
    key: "parse",
    value: function parse(dateString, token) {
      var valueCallback = function valueCallback(value) {
        return Math.floor(value * Math.pow(10, -token.length + 3));
      };
      return (0, _utils.mapValue)((0, _utils.parseNDigits)(token.length, dateString), valueCallback);
    }
  }, {
    key: "set",
    value: function set(date, _flags, value) {
      date.setUTCMilliseconds(value);
      return date;
    }
  }]);
  return FractionOfSecondParser;
}(_Parser2.Parser);
},{"@babel/runtime/helpers/esm/classCallCheck":517,"@babel/runtime/helpers/esm/createClass":516,"@babel/runtime/helpers/esm/assertThisInitialized":514,"@babel/runtime/helpers/esm/inherits":512,"@babel/runtime/helpers/esm/createSuper":513,"@babel/runtime/helpers/esm/defineProperty":515,"../Parser.js":564,"../utils.js":566}],547:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ISOTimezoneWithZParser = undefined;

var _classCallCheck2 = require("@babel/runtime/helpers/esm/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("@babel/runtime/helpers/esm/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _assertThisInitialized2 = require("@babel/runtime/helpers/esm/assertThisInitialized");

var _assertThisInitialized3 = _interopRequireDefault(_assertThisInitialized2);

var _inherits2 = require("@babel/runtime/helpers/esm/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _createSuper2 = require("@babel/runtime/helpers/esm/createSuper");

var _createSuper3 = _interopRequireDefault(_createSuper2);

var _defineProperty2 = require("@babel/runtime/helpers/esm/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _Parser2 = require("../Parser.js");

var _constants = require("../constants.js");

var _utils = require("../utils.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Timezone (ISO-8601. +00:00 is `'Z'`)
var ISOTimezoneWithZParser = /*#__PURE__*/exports.ISOTimezoneWithZParser = function (_Parser) {
  (0, _inherits3.default)(ISOTimezoneWithZParser, _Parser);
  var _super = (0, _createSuper3.default)(ISOTimezoneWithZParser);
  function ISOTimezoneWithZParser() {
    var _this;
    (0, _classCallCheck3.default)(this, ISOTimezoneWithZParser);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty3.default)((0, _assertThisInitialized3.default)(_this), "priority", 10);
    (0, _defineProperty3.default)((0, _assertThisInitialized3.default)(_this), "incompatibleTokens", ['t', 'T', 'x']);
    return _this;
  }
  (0, _createClass3.default)(ISOTimezoneWithZParser, [{
    key: "parse",
    value: function parse(dateString, token) {
      switch (token) {
        case 'X':
          return (0, _utils.parseTimezonePattern)(_constants.timezonePatterns.basicOptionalMinutes, dateString);
        case 'XX':
          return (0, _utils.parseTimezonePattern)(_constants.timezonePatterns.basic, dateString);
        case 'XXXX':
          return (0, _utils.parseTimezonePattern)(_constants.timezonePatterns.basicOptionalSeconds, dateString);
        case 'XXXXX':
          return (0, _utils.parseTimezonePattern)(_constants.timezonePatterns.extendedOptionalSeconds, dateString);
        case 'XXX':
        default:
          return (0, _utils.parseTimezonePattern)(_constants.timezonePatterns.extended, dateString);
      }
    }
  }, {
    key: "set",
    value: function set(date, flags, value) {
      if (flags.timestampIsSet) {
        return date;
      }
      return new Date(date.getTime() - value);
    }
  }]);
  return ISOTimezoneWithZParser;
}(_Parser2.Parser);
},{"@babel/runtime/helpers/esm/classCallCheck":517,"@babel/runtime/helpers/esm/createClass":516,"@babel/runtime/helpers/esm/assertThisInitialized":514,"@babel/runtime/helpers/esm/inherits":512,"@babel/runtime/helpers/esm/createSuper":513,"@babel/runtime/helpers/esm/defineProperty":515,"../Parser.js":564,"../constants.js":565,"../utils.js":566}],545:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ISOTimezoneParser = undefined;

var _classCallCheck2 = require("@babel/runtime/helpers/esm/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("@babel/runtime/helpers/esm/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _assertThisInitialized2 = require("@babel/runtime/helpers/esm/assertThisInitialized");

var _assertThisInitialized3 = _interopRequireDefault(_assertThisInitialized2);

var _inherits2 = require("@babel/runtime/helpers/esm/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _createSuper2 = require("@babel/runtime/helpers/esm/createSuper");

var _createSuper3 = _interopRequireDefault(_createSuper2);

var _defineProperty2 = require("@babel/runtime/helpers/esm/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _Parser2 = require("../Parser.js");

var _constants = require("../constants.js");

var _utils = require("../utils.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Timezone (ISO-8601)
var ISOTimezoneParser = /*#__PURE__*/exports.ISOTimezoneParser = function (_Parser) {
  (0, _inherits3.default)(ISOTimezoneParser, _Parser);
  var _super = (0, _createSuper3.default)(ISOTimezoneParser);
  function ISOTimezoneParser() {
    var _this;
    (0, _classCallCheck3.default)(this, ISOTimezoneParser);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty3.default)((0, _assertThisInitialized3.default)(_this), "priority", 10);
    (0, _defineProperty3.default)((0, _assertThisInitialized3.default)(_this), "incompatibleTokens", ['t', 'T', 'X']);
    return _this;
  }
  (0, _createClass3.default)(ISOTimezoneParser, [{
    key: "parse",
    value: function parse(dateString, token) {
      switch (token) {
        case 'x':
          return (0, _utils.parseTimezonePattern)(_constants.timezonePatterns.basicOptionalMinutes, dateString);
        case 'xx':
          return (0, _utils.parseTimezonePattern)(_constants.timezonePatterns.basic, dateString);
        case 'xxxx':
          return (0, _utils.parseTimezonePattern)(_constants.timezonePatterns.basicOptionalSeconds, dateString);
        case 'xxxxx':
          return (0, _utils.parseTimezonePattern)(_constants.timezonePatterns.extendedOptionalSeconds, dateString);
        case 'xxx':
        default:
          return (0, _utils.parseTimezonePattern)(_constants.timezonePatterns.extended, dateString);
      }
    }
  }, {
    key: "set",
    value: function set(date, flags, value) {
      if (flags.timestampIsSet) {
        return date;
      }
      return new Date(date.getTime() - value);
    }
  }]);
  return ISOTimezoneParser;
}(_Parser2.Parser);
},{"@babel/runtime/helpers/esm/classCallCheck":517,"@babel/runtime/helpers/esm/createClass":516,"@babel/runtime/helpers/esm/assertThisInitialized":514,"@babel/runtime/helpers/esm/inherits":512,"@babel/runtime/helpers/esm/createSuper":513,"@babel/runtime/helpers/esm/defineProperty":515,"../Parser.js":564,"../constants.js":565,"../utils.js":566}],546:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimestampSecondsParser = undefined;

var _classCallCheck2 = require("@babel/runtime/helpers/esm/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("@babel/runtime/helpers/esm/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _assertThisInitialized2 = require("@babel/runtime/helpers/esm/assertThisInitialized");

var _assertThisInitialized3 = _interopRequireDefault(_assertThisInitialized2);

var _inherits2 = require("@babel/runtime/helpers/esm/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _createSuper2 = require("@babel/runtime/helpers/esm/createSuper");

var _createSuper3 = _interopRequireDefault(_createSuper2);

var _defineProperty2 = require("@babel/runtime/helpers/esm/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _Parser2 = require("../Parser.js");

var _utils = require("../utils.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TimestampSecondsParser = /*#__PURE__*/exports.TimestampSecondsParser = function (_Parser) {
  (0, _inherits3.default)(TimestampSecondsParser, _Parser);
  var _super = (0, _createSuper3.default)(TimestampSecondsParser);
  function TimestampSecondsParser() {
    var _this;
    (0, _classCallCheck3.default)(this, TimestampSecondsParser);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty3.default)((0, _assertThisInitialized3.default)(_this), "priority", 40);
    (0, _defineProperty3.default)((0, _assertThisInitialized3.default)(_this), "incompatibleTokens", '*');
    return _this;
  }
  (0, _createClass3.default)(TimestampSecondsParser, [{
    key: "parse",
    value: function parse(dateString) {
      return (0, _utils.parseAnyDigitsSigned)(dateString);
    }
  }, {
    key: "set",
    value: function set(_date, _flags, value) {
      return [new Date(value * 1000), {
        timestampIsSet: true
      }];
    }
  }]);
  return TimestampSecondsParser;
}(_Parser2.Parser);
},{"@babel/runtime/helpers/esm/classCallCheck":517,"@babel/runtime/helpers/esm/createClass":516,"@babel/runtime/helpers/esm/assertThisInitialized":514,"@babel/runtime/helpers/esm/inherits":512,"@babel/runtime/helpers/esm/createSuper":513,"@babel/runtime/helpers/esm/defineProperty":515,"../Parser.js":564,"../utils.js":566}],553:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimestampMillisecondsParser = undefined;

var _classCallCheck2 = require("@babel/runtime/helpers/esm/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("@babel/runtime/helpers/esm/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _assertThisInitialized2 = require("@babel/runtime/helpers/esm/assertThisInitialized");

var _assertThisInitialized3 = _interopRequireDefault(_assertThisInitialized2);

var _inherits2 = require("@babel/runtime/helpers/esm/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _createSuper2 = require("@babel/runtime/helpers/esm/createSuper");

var _createSuper3 = _interopRequireDefault(_createSuper2);

var _defineProperty2 = require("@babel/runtime/helpers/esm/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _Parser2 = require("../Parser.js");

var _utils = require("../utils.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TimestampMillisecondsParser = /*#__PURE__*/exports.TimestampMillisecondsParser = function (_Parser) {
  (0, _inherits3.default)(TimestampMillisecondsParser, _Parser);
  var _super = (0, _createSuper3.default)(TimestampMillisecondsParser);
  function TimestampMillisecondsParser() {
    var _this;
    (0, _classCallCheck3.default)(this, TimestampMillisecondsParser);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty3.default)((0, _assertThisInitialized3.default)(_this), "priority", 20);
    (0, _defineProperty3.default)((0, _assertThisInitialized3.default)(_this), "incompatibleTokens", '*');
    return _this;
  }
  (0, _createClass3.default)(TimestampMillisecondsParser, [{
    key: "parse",
    value: function parse(dateString) {
      return (0, _utils.parseAnyDigitsSigned)(dateString);
    }
  }, {
    key: "set",
    value: function set(_date, _flags, value) {
      return [new Date(value), {
        timestampIsSet: true
      }];
    }
  }]);
  return TimestampMillisecondsParser;
}(_Parser2.Parser);
},{"@babel/runtime/helpers/esm/classCallCheck":517,"@babel/runtime/helpers/esm/createClass":516,"@babel/runtime/helpers/esm/assertThisInitialized":514,"@babel/runtime/helpers/esm/inherits":512,"@babel/runtime/helpers/esm/createSuper":513,"@babel/runtime/helpers/esm/defineProperty":515,"../Parser.js":564,"../utils.js":566}],489:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parsers = undefined;

var _EraParser = require("./EraParser.js");

var _YearParser = require("./YearParser.js");

var _LocalWeekYearParser = require("./LocalWeekYearParser.js");

var _ISOWeekYearParser = require("./ISOWeekYearParser.js");

var _ExtendedYearParser = require("./ExtendedYearParser.js");

var _QuarterParser = require("./QuarterParser.js");

var _StandAloneQuarterParser = require("./StandAloneQuarterParser.js");

var _MonthParser = require("./MonthParser.js");

var _StandAloneMonthParser = require("./StandAloneMonthParser.js");

var _LocalWeekParser = require("./LocalWeekParser.js");

var _ISOWeekParser = require("./ISOWeekParser.js");

var _DateParser = require("./DateParser.js");

var _DayOfYearParser = require("./DayOfYearParser.js");

var _DayParser = require("./DayParser.js");

var _LocalDayParser = require("./LocalDayParser.js");

var _StandAloneLocalDayParser = require("./StandAloneLocalDayParser.js");

var _ISODayParser = require("./ISODayParser.js");

var _AMPMParser = require("./AMPMParser.js");

var _AMPMMidnightParser = require("./AMPMMidnightParser.js");

var _DayPeriodParser = require("./DayPeriodParser.js");

var _Hour1to12Parser = require("./Hour1to12Parser.js");

var _Hour0to23Parser = require("./Hour0to23Parser.js");

var _Hour0To11Parser = require("./Hour0To11Parser.js");

var _Hour1To24Parser = require("./Hour1To24Parser.js");

var _MinuteParser = require("./MinuteParser.js");

var _SecondParser = require("./SecondParser.js");

var _FractionOfSecondParser = require("./FractionOfSecondParser.js");

var _ISOTimezoneWithZParser = require("./ISOTimezoneWithZParser.js");

var _ISOTimezoneParser = require("./ISOTimezoneParser.js");

var _TimestampSecondsParser = require("./TimestampSecondsParser.js");

var _TimestampMillisecondsParser = require("./TimestampMillisecondsParser.js");

/*
 * |     | Unit                           |     | Unit                           |
 * |-----|--------------------------------|-----|--------------------------------|
 * |  a  | AM, PM                         |  A* | Milliseconds in day            |
 * |  b  | AM, PM, noon, midnight         |  B  | Flexible day period            |
 * |  c  | Stand-alone local day of week  |  C* | Localized hour w/ day period   |
 * |  d  | Day of month                   |  D  | Day of year                    |
 * |  e  | Local day of week              |  E  | Day of week                    |
 * |  f  |                                |  F* | Day of week in month           |
 * |  g* | Modified Julian day            |  G  | Era                            |
 * |  h  | Hour [1-12]                    |  H  | Hour [0-23]                    |
 * |  i! | ISO day of week                |  I! | ISO week of year               |
 * |  j* | Localized hour w/ day period   |  J* | Localized hour w/o day period  |
 * |  k  | Hour [1-24]                    |  K  | Hour [0-11]                    |
 * |  l* | (deprecated)                   |  L  | Stand-alone month              |
 * |  m  | Minute                         |  M  | Month                          |
 * |  n  |                                |  N  |                                |
 * |  o! | Ordinal number modifier        |  O* | Timezone (GMT)                 |
 * |  p  |                                |  P  |                                |
 * |  q  | Stand-alone quarter            |  Q  | Quarter                        |
 * |  r* | Related Gregorian year         |  R! | ISO week-numbering year        |
 * |  s  | Second                         |  S  | Fraction of second             |
 * |  t! | Seconds timestamp              |  T! | Milliseconds timestamp         |
 * |  u  | Extended year                  |  U* | Cyclic year                    |
 * |  v* | Timezone (generic non-locat.)  |  V* | Timezone (location)            |
 * |  w  | Local week of year             |  W* | Week of month                  |
 * |  x  | Timezone (ISO-8601 w/o Z)      |  X  | Timezone (ISO-8601)            |
 * |  y  | Year (abs)                     |  Y  | Local week-numbering year      |
 * |  z* | Timezone (specific non-locat.) |  Z* | Timezone (aliases)             |
 *
 * Letters marked by * are not implemented but reserved by Unicode standard.
 *
 * Letters marked by ! are non-standard, but implemented by date-fns:
 * - `o` modifies the previous token to turn it into an ordinal (see `parse` docs)
 * - `i` is ISO day of week. For `i` and `ii` is returns numeric ISO week days,
 *   i.e. 7 for Sunday, 1 for Monday, etc.
 * - `I` is ISO week of year, as opposed to `w` which is local week of year.
 * - `R` is ISO week-numbering year, as opposed to `Y` which is local week-numbering year.
 *   `R` is supposed to be used in conjunction with `I` and `i`
 *   for universal ISO week-numbering date, whereas
 *   `Y` is supposed to be used in conjunction with `w` and `e`
 *   for week-numbering date specific to the locale.
 */
var parsers = exports.parsers = {
  G: new _EraParser.EraParser(),
  y: new _YearParser.YearParser(),
  Y: new _LocalWeekYearParser.LocalWeekYearParser(),
  R: new _ISOWeekYearParser.ISOWeekYearParser(),
  u: new _ExtendedYearParser.ExtendedYearParser(),
  Q: new _QuarterParser.QuarterParser(),
  q: new _StandAloneQuarterParser.StandAloneQuarterParser(),
  M: new _MonthParser.MonthParser(),
  L: new _StandAloneMonthParser.StandAloneMonthParser(),
  w: new _LocalWeekParser.LocalWeekParser(),
  I: new _ISOWeekParser.ISOWeekParser(),
  d: new _DateParser.DateParser(),
  D: new _DayOfYearParser.DayOfYearParser(),
  E: new _DayParser.DayParser(),
  e: new _LocalDayParser.LocalDayParser(),
  c: new _StandAloneLocalDayParser.StandAloneLocalDayParser(),
  i: new _ISODayParser.ISODayParser(),
  a: new _AMPMParser.AMPMParser(),
  b: new _AMPMMidnightParser.AMPMMidnightParser(),
  B: new _DayPeriodParser.DayPeriodParser(),
  h: new _Hour1to12Parser.Hour1to12Parser(),
  H: new _Hour0to23Parser.Hour0to23Parser(),
  K: new _Hour0To11Parser.Hour0To11Parser(),
  k: new _Hour1To24Parser.Hour1To24Parser(),
  m: new _MinuteParser.MinuteParser(),
  s: new _SecondParser.SecondParser(),
  S: new _FractionOfSecondParser.FractionOfSecondParser(),
  X: new _ISOTimezoneWithZParser.ISOTimezoneWithZParser(),
  x: new _ISOTimezoneParser.ISOTimezoneParser(),
  t: new _TimestampSecondsParser.TimestampSecondsParser(),
  T: new _TimestampMillisecondsParser.TimestampMillisecondsParser()
};
},{"./EraParser.js":518,"./YearParser.js":519,"./LocalWeekYearParser.js":520,"./ISOWeekYearParser.js":521,"./ExtendedYearParser.js":522,"./QuarterParser.js":523,"./StandAloneQuarterParser.js":524,"./MonthParser.js":525,"./StandAloneMonthParser.js":526,"./LocalWeekParser.js":527,"./ISOWeekParser.js":528,"./DateParser.js":529,"./DayOfYearParser.js":530,"./DayParser.js":531,"./LocalDayParser.js":532,"./StandAloneLocalDayParser.js":533,"./ISODayParser.js":534,"./AMPMParser.js":535,"./AMPMMidnightParser.js":536,"./DayPeriodParser.js":537,"./Hour1to12Parser.js":538,"./Hour0to23Parser.js":539,"./Hour0To11Parser.js":540,"./Hour1To24Parser.js":541,"./MinuteParser.js":542,"./SecondParser.js":543,"./FractionOfSecondParser.js":544,"./ISOTimezoneWithZParser.js":547,"./ISOTimezoneParser.js":545,"./TimestampSecondsParser.js":546,"./TimestampMillisecondsParser.js":553}],186:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parse;

var _typeof2 = require("@babel/runtime/helpers/esm/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _createForOfIteratorHelper2 = require("@babel/runtime/helpers/esm/createForOfIteratorHelper");

var _createForOfIteratorHelper3 = _interopRequireDefault(_createForOfIteratorHelper2);

var _index = require("../_lib/defaultLocale/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../subMilliseconds/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../toDate/index.js");

var _index6 = _interopRequireDefault(_index5);

var _index7 = require("../_lib/assign/index.js");

var _index8 = _interopRequireDefault(_index7);

var _index9 = require("../_lib/format/longFormatters/index.js");

var _index10 = _interopRequireDefault(_index9);

var _index11 = require("../_lib/getTimezoneOffsetInMilliseconds/index.js");

var _index12 = _interopRequireDefault(_index11);

var _index13 = require("../_lib/protectedTokens/index.js");

var _index14 = require("../_lib/toInteger/index.js");

var _index15 = _interopRequireDefault(_index14);

var _index16 = require("../_lib/requiredArgs/index.js");

var _index17 = _interopRequireDefault(_index16);

var _Setter = require("./_lib/Setter.js");

var _index18 = require("./_lib/parsers/index.js");

var _index19 = require("../_lib/defaultOptions/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This RegExp consists of three parts separated by `|`:
// - [yYQqMLwIdDecihHKkms]o matches any available ordinal number token
//   (one of the certain letters followed by `o`)
// - (\w)\1* matches any sequences of the same letter
// - '' matches two quote characters in a row
// - '(''|[^'])+('|$) matches anything surrounded by two quote characters ('),
//   except a single quote symbol, which ends the sequence.
//   Two quote characters do not end the sequence.
//   If there is no matching single quote
//   then the sequence will continue until the end of the string.
// - . matches any single character unmatched by previous parts of the RegExps
var formattingTokensRegExp = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g;

// This RegExp catches symbols escaped by quotes, and also
// sequences of symbols P, p, and the combinations like `PPPPPPPppppp`
var longFormattingTokensRegExp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;
var escapedStringRegExp = /^'([^]*?)'?$/;
var doubleQuoteRegExp = /''/g;
var notWhitespaceRegExp = /\S/;
var unescapedLatinCharacterRegExp = /[a-zA-Z]/;

/**
 * @name parse
 * @category Common Helpers
 * @summary Parse the date.
 *
 * @description
 * Return the date parsed from string using the given format string.
 *
 * > ⚠️ Please note that the `format` tokens differ from Moment.js and other libraries.
 * > See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 *
 * The characters in the format string wrapped between two single quotes characters (') are escaped.
 * Two single quotes in a row, whether inside or outside a quoted sequence, represent a 'real' single quote.
 *
 * Format of the format string is based on Unicode Technical Standard #35:
 * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
 * with a few additions (see note 5 below the table).
 *
 * Not all tokens are compatible. Combinations that don't make sense or could lead to bugs are prohibited
 * and will throw `RangeError`. For example usage of 24-hour format token with AM/PM token will throw an exception:
 *
 * ```javascript
 * parse('23 AM', 'HH a', new Date())
 * //=> RangeError: The format string mustn't contain `HH` and `a` at the same time
 * ```
 *
 * See the compatibility table: https://docs.google.com/spreadsheets/d/e/2PACX-1vQOPU3xUhplll6dyoMmVUXHKl_8CRDs6_ueLmex3SoqwhuolkuN3O05l4rqx5h1dKX8eb46Ul-CCSrq/pubhtml?gid=0&single=true
 *
 * Accepted format string patterns:
 * | Unit                            |Prior| Pattern | Result examples                   | Notes |
 * |---------------------------------|-----|---------|-----------------------------------|-------|
 * | Era                             | 140 | G..GGG  | AD, BC                            |       |
 * |                                 |     | GGGG    | Anno Domini, Before Christ        | 2     |
 * |                                 |     | GGGGG   | A, B                              |       |
 * | Calendar year                   | 130 | y       | 44, 1, 1900, 2017, 9999           | 4     |
 * |                                 |     | yo      | 44th, 1st, 1900th, 9999999th      | 4,5   |
 * |                                 |     | yy      | 44, 01, 00, 17                    | 4     |
 * |                                 |     | yyy     | 044, 001, 123, 999                | 4     |
 * |                                 |     | yyyy    | 0044, 0001, 1900, 2017            | 4     |
 * |                                 |     | yyyyy   | ...                               | 2,4   |
 * | Local week-numbering year       | 130 | Y       | 44, 1, 1900, 2017, 9000           | 4     |
 * |                                 |     | Yo      | 44th, 1st, 1900th, 9999999th      | 4,5   |
 * |                                 |     | YY      | 44, 01, 00, 17                    | 4,6   |
 * |                                 |     | YYY     | 044, 001, 123, 999                | 4     |
 * |                                 |     | YYYY    | 0044, 0001, 1900, 2017            | 4,6   |
 * |                                 |     | YYYYY   | ...                               | 2,4   |
 * | ISO week-numbering year         | 130 | R       | -43, 1, 1900, 2017, 9999, -9999   | 4,5   |
 * |                                 |     | RR      | -43, 01, 00, 17                   | 4,5   |
 * |                                 |     | RRR     | -043, 001, 123, 999, -999         | 4,5   |
 * |                                 |     | RRRR    | -0043, 0001, 2017, 9999, -9999    | 4,5   |
 * |                                 |     | RRRRR   | ...                               | 2,4,5 |
 * | Extended year                   | 130 | u       | -43, 1, 1900, 2017, 9999, -999    | 4     |
 * |                                 |     | uu      | -43, 01, 99, -99                  | 4     |
 * |                                 |     | uuu     | -043, 001, 123, 999, -999         | 4     |
 * |                                 |     | uuuu    | -0043, 0001, 2017, 9999, -9999    | 4     |
 * |                                 |     | uuuuu   | ...                               | 2,4   |
 * | Quarter (formatting)            | 120 | Q       | 1, 2, 3, 4                        |       |
 * |                                 |     | Qo      | 1st, 2nd, 3rd, 4th                | 5     |
 * |                                 |     | QQ      | 01, 02, 03, 04                    |       |
 * |                                 |     | QQQ     | Q1, Q2, Q3, Q4                    |       |
 * |                                 |     | QQQQ    | 1st quarter, 2nd quarter, ...     | 2     |
 * |                                 |     | QQQQQ   | 1, 2, 3, 4                        | 4     |
 * | Quarter (stand-alone)           | 120 | q       | 1, 2, 3, 4                        |       |
 * |                                 |     | qo      | 1st, 2nd, 3rd, 4th                | 5     |
 * |                                 |     | qq      | 01, 02, 03, 04                    |       |
 * |                                 |     | qqq     | Q1, Q2, Q3, Q4                    |       |
 * |                                 |     | qqqq    | 1st quarter, 2nd quarter, ...     | 2     |
 * |                                 |     | qqqqq   | 1, 2, 3, 4                        | 3     |
 * | Month (formatting)              | 110 | M       | 1, 2, ..., 12                     |       |
 * |                                 |     | Mo      | 1st, 2nd, ..., 12th               | 5     |
 * |                                 |     | MM      | 01, 02, ..., 12                   |       |
 * |                                 |     | MMM     | Jan, Feb, ..., Dec                |       |
 * |                                 |     | MMMM    | January, February, ..., December  | 2     |
 * |                                 |     | MMMMM   | J, F, ..., D                      |       |
 * | Month (stand-alone)             | 110 | L       | 1, 2, ..., 12                     |       |
 * |                                 |     | Lo      | 1st, 2nd, ..., 12th               | 5     |
 * |                                 |     | LL      | 01, 02, ..., 12                   |       |
 * |                                 |     | LLL     | Jan, Feb, ..., Dec                |       |
 * |                                 |     | LLLL    | January, February, ..., December  | 2     |
 * |                                 |     | LLLLL   | J, F, ..., D                      |       |
 * | Local week of year              | 100 | w       | 1, 2, ..., 53                     |       |
 * |                                 |     | wo      | 1st, 2nd, ..., 53th               | 5     |
 * |                                 |     | ww      | 01, 02, ..., 53                   |       |
 * | ISO week of year                | 100 | I       | 1, 2, ..., 53                     | 5     |
 * |                                 |     | Io      | 1st, 2nd, ..., 53th               | 5     |
 * |                                 |     | II      | 01, 02, ..., 53                   | 5     |
 * | Day of month                    |  90 | d       | 1, 2, ..., 31                     |       |
 * |                                 |     | do      | 1st, 2nd, ..., 31st               | 5     |
 * |                                 |     | dd      | 01, 02, ..., 31                   |       |
 * | Day of year                     |  90 | D       | 1, 2, ..., 365, 366               | 7     |
 * |                                 |     | Do      | 1st, 2nd, ..., 365th, 366th       | 5     |
 * |                                 |     | DD      | 01, 02, ..., 365, 366             | 7     |
 * |                                 |     | DDD     | 001, 002, ..., 365, 366           |       |
 * |                                 |     | DDDD    | ...                               | 2     |
 * | Day of week (formatting)        |  90 | E..EEE  | Mon, Tue, Wed, ..., Sun           |       |
 * |                                 |     | EEEE    | Monday, Tuesday, ..., Sunday      | 2     |
 * |                                 |     | EEEEE   | M, T, W, T, F, S, S               |       |
 * |                                 |     | EEEEEE  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
 * | ISO day of week (formatting)    |  90 | i       | 1, 2, 3, ..., 7                   | 5     |
 * |                                 |     | io      | 1st, 2nd, ..., 7th                | 5     |
 * |                                 |     | ii      | 01, 02, ..., 07                   | 5     |
 * |                                 |     | iii     | Mon, Tue, Wed, ..., Sun           | 5     |
 * |                                 |     | iiii    | Monday, Tuesday, ..., Sunday      | 2,5   |
 * |                                 |     | iiiii   | M, T, W, T, F, S, S               | 5     |
 * |                                 |     | iiiiii  | Mo, Tu, We, Th, Fr, Sa, Su        | 5     |
 * | Local day of week (formatting)  |  90 | e       | 2, 3, 4, ..., 1                   |       |
 * |                                 |     | eo      | 2nd, 3rd, ..., 1st                | 5     |
 * |                                 |     | ee      | 02, 03, ..., 01                   |       |
 * |                                 |     | eee     | Mon, Tue, Wed, ..., Sun           |       |
 * |                                 |     | eeee    | Monday, Tuesday, ..., Sunday      | 2     |
 * |                                 |     | eeeee   | M, T, W, T, F, S, S               |       |
 * |                                 |     | eeeeee  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
 * | Local day of week (stand-alone) |  90 | c       | 2, 3, 4, ..., 1                   |       |
 * |                                 |     | co      | 2nd, 3rd, ..., 1st                | 5     |
 * |                                 |     | cc      | 02, 03, ..., 01                   |       |
 * |                                 |     | ccc     | Mon, Tue, Wed, ..., Sun           |       |
 * |                                 |     | cccc    | Monday, Tuesday, ..., Sunday      | 2     |
 * |                                 |     | ccccc   | M, T, W, T, F, S, S               |       |
 * |                                 |     | cccccc  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
 * | AM, PM                          |  80 | a..aaa  | AM, PM                            |       |
 * |                                 |     | aaaa    | a.m., p.m.                        | 2     |
 * |                                 |     | aaaaa   | a, p                              |       |
 * | AM, PM, noon, midnight          |  80 | b..bbb  | AM, PM, noon, midnight            |       |
 * |                                 |     | bbbb    | a.m., p.m., noon, midnight        | 2     |
 * |                                 |     | bbbbb   | a, p, n, mi                       |       |
 * | Flexible day period             |  80 | B..BBB  | at night, in the morning, ...     |       |
 * |                                 |     | BBBB    | at night, in the morning, ...     | 2     |
 * |                                 |     | BBBBB   | at night, in the morning, ...     |       |
 * | Hour [1-12]                     |  70 | h       | 1, 2, ..., 11, 12                 |       |
 * |                                 |     | ho      | 1st, 2nd, ..., 11th, 12th         | 5     |
 * |                                 |     | hh      | 01, 02, ..., 11, 12               |       |
 * | Hour [0-23]                     |  70 | H       | 0, 1, 2, ..., 23                  |       |
 * |                                 |     | Ho      | 0th, 1st, 2nd, ..., 23rd          | 5     |
 * |                                 |     | HH      | 00, 01, 02, ..., 23               |       |
 * | Hour [0-11]                     |  70 | K       | 1, 2, ..., 11, 0                  |       |
 * |                                 |     | Ko      | 1st, 2nd, ..., 11th, 0th          | 5     |
 * |                                 |     | KK      | 01, 02, ..., 11, 00               |       |
 * | Hour [1-24]                     |  70 | k       | 24, 1, 2, ..., 23                 |       |
 * |                                 |     | ko      | 24th, 1st, 2nd, ..., 23rd         | 5     |
 * |                                 |     | kk      | 24, 01, 02, ..., 23               |       |
 * | Minute                          |  60 | m       | 0, 1, ..., 59                     |       |
 * |                                 |     | mo      | 0th, 1st, ..., 59th               | 5     |
 * |                                 |     | mm      | 00, 01, ..., 59                   |       |
 * | Second                          |  50 | s       | 0, 1, ..., 59                     |       |
 * |                                 |     | so      | 0th, 1st, ..., 59th               | 5     |
 * |                                 |     | ss      | 00, 01, ..., 59                   |       |
 * | Seconds timestamp               |  40 | t       | 512969520                         |       |
 * |                                 |     | tt      | ...                               | 2     |
 * | Fraction of second              |  30 | S       | 0, 1, ..., 9                      |       |
 * |                                 |     | SS      | 00, 01, ..., 99                   |       |
 * |                                 |     | SSS     | 000, 001, ..., 999                |       |
 * |                                 |     | SSSS    | ...                               | 2     |
 * | Milliseconds timestamp          |  20 | T       | 512969520900                      |       |
 * |                                 |     | TT      | ...                               | 2     |
 * | Timezone (ISO-8601 w/ Z)        |  10 | X       | -08, +0530, Z                     |       |
 * |                                 |     | XX      | -0800, +0530, Z                   |       |
 * |                                 |     | XXX     | -08:00, +05:30, Z                 |       |
 * |                                 |     | XXXX    | -0800, +0530, Z, +123456          | 2     |
 * |                                 |     | XXXXX   | -08:00, +05:30, Z, +12:34:56      |       |
 * | Timezone (ISO-8601 w/o Z)       |  10 | x       | -08, +0530, +00                   |       |
 * |                                 |     | xx      | -0800, +0530, +0000               |       |
 * |                                 |     | xxx     | -08:00, +05:30, +00:00            | 2     |
 * |                                 |     | xxxx    | -0800, +0530, +0000, +123456      |       |
 * |                                 |     | xxxxx   | -08:00, +05:30, +00:00, +12:34:56 |       |
 * | Long localized date             |  NA | P       | 05/29/1453                        | 5,8   |
 * |                                 |     | PP      | May 29, 1453                      |       |
 * |                                 |     | PPP     | May 29th, 1453                    |       |
 * |                                 |     | PPPP    | Sunday, May 29th, 1453            | 2,5,8 |
 * | Long localized time             |  NA | p       | 12:00 AM                          | 5,8   |
 * |                                 |     | pp      | 12:00:00 AM                       |       |
 * | Combination of date and time    |  NA | Pp      | 05/29/1453, 12:00 AM              |       |
 * |                                 |     | PPpp    | May 29, 1453, 12:00:00 AM         |       |
 * |                                 |     | PPPpp   | May 29th, 1453 at ...             |       |
 * |                                 |     | PPPPpp  | Sunday, May 29th, 1453 at ...     | 2,5,8 |
 * Notes:
 * 1. "Formatting" units (e.g. formatting quarter) in the default en-US locale
 *    are the same as "stand-alone" units, but are different in some languages.
 *    "Formatting" units are declined according to the rules of the language
 *    in the context of a date. "Stand-alone" units are always nominative singular.
 *    In `format` function, they will produce different result:
 *
 *    `format(new Date(2017, 10, 6), 'do LLLL', {locale: cs}) //=> '6. listopad'`
 *
 *    `format(new Date(2017, 10, 6), 'do MMMM', {locale: cs}) //=> '6. listopadu'`
 *
 *    `parse` will try to match both formatting and stand-alone units interchangably.
 *
 * 2. Any sequence of the identical letters is a pattern, unless it is escaped by
 *    the single quote characters (see below).
 *    If the sequence is longer than listed in table:
 *    - for numerical units (`yyyyyyyy`) `parse` will try to match a number
 *      as wide as the sequence
 *    - for text units (`MMMMMMMM`) `parse` will try to match the widest variation of the unit.
 *      These variations are marked with "2" in the last column of the table.
 *
 * 3. `QQQQQ` and `qqqqq` could be not strictly numerical in some locales.
 *    These tokens represent the shortest form of the quarter.
 *
 * 4. The main difference between `y` and `u` patterns are B.C. years:
 *
 *    | Year | `y` | `u` |
 *    |------|-----|-----|
 *    | AC 1 |   1 |   1 |
 *    | BC 1 |   1 |   0 |
 *    | BC 2 |   2 |  -1 |
 *
 *    Also `yy` will try to guess the century of two digit year by proximity with `referenceDate`:
 *
 *    `parse('50', 'yy', new Date(2018, 0, 1)) //=> Sat Jan 01 2050 00:00:00`
 *
 *    `parse('75', 'yy', new Date(2018, 0, 1)) //=> Wed Jan 01 1975 00:00:00`
 *
 *    while `uu` will just assign the year as is:
 *
 *    `parse('50', 'uu', new Date(2018, 0, 1)) //=> Sat Jan 01 0050 00:00:00`
 *
 *    `parse('75', 'uu', new Date(2018, 0, 1)) //=> Tue Jan 01 0075 00:00:00`
 *
 *    The same difference is true for local and ISO week-numbering years (`Y` and `R`),
 *    except local week-numbering years are dependent on `options.weekStartsOn`
 *    and `options.firstWeekContainsDate` (compare [setISOWeekYear]{@link https://date-fns.org/docs/setISOWeekYear}
 *    and [setWeekYear]{@link https://date-fns.org/docs/setWeekYear}).
 *
 * 5. These patterns are not in the Unicode Technical Standard #35:
 *    - `i`: ISO day of week
 *    - `I`: ISO week of year
 *    - `R`: ISO week-numbering year
 *    - `o`: ordinal number modifier
 *    - `P`: long localized date
 *    - `p`: long localized time
 *
 * 6. `YY` and `YYYY` tokens represent week-numbering years but they are often confused with years.
 *    You should enable `options.useAdditionalWeekYearTokens` to use them. See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 *
 * 7. `D` and `DD` tokens represent days of the year but they are ofthen confused with days of the month.
 *    You should enable `options.useAdditionalDayOfYearTokens` to use them. See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 *
 * 8. `P+` tokens do not have a defined priority since they are merely aliases to other tokens based
 *    on the given locale.
 *
 *    using `en-US` locale: `P` => `MM/dd/yyyy`
 *    using `en-US` locale: `p` => `hh:mm a`
 *    using `pt-BR` locale: `P` => `dd/MM/yyyy`
 *    using `pt-BR` locale: `p` => `HH:mm`
 *
 * Values will be assigned to the date in the descending order of its unit's priority.
 * Units of an equal priority overwrite each other in the order of appearance.
 *
 * If no values of higher priority are parsed (e.g. when parsing string 'January 1st' without a year),
 * the values will be taken from 3rd argument `referenceDate` which works as a context of parsing.
 *
 * `referenceDate` must be passed for correct work of the function.
 * If you're not sure which `referenceDate` to supply, create a new instance of Date:
 * `parse('02/11/2014', 'MM/dd/yyyy', new Date())`
 * In this case parsing will be done in the context of the current date.
 * If `referenceDate` is `Invalid Date` or a value not convertible to valid `Date`,
 * then `Invalid Date` will be returned.
 *
 * The result may vary by locale.
 *
 * If `formatString` matches with `dateString` but does not provides tokens, `referenceDate` will be returned.
 *
 * If parsing failed, `Invalid Date` will be returned.
 * Invalid Date is a Date, whose time value is NaN.
 * Time value of Date: http://es5.github.io/#x15.9.1.1
 *
 * @param {String} dateString - the string to parse
 * @param {String} formatString - the string of tokens
 * @param {Date|Number} referenceDate - defines values missing from the parsed dateString
 * @param {Object} [options] - an object with options.
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @param {1|2|3|4|5|6|7} [options.firstWeekContainsDate=1] - the day of January, which is always in the first week of the year
 * @param {Boolean} [options.useAdditionalWeekYearTokens=false] - if true, allows usage of the week-numbering year tokens `YY` and `YYYY`;
 *   see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 * @param {Boolean} [options.useAdditionalDayOfYearTokens=false] - if true, allows usage of the day of year tokens `D` and `DD`;
 *   see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 * @returns {Date} the parsed date
 * @throws {TypeError} 3 arguments required
 * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
 * @throws {RangeError} `options.firstWeekContainsDate` must be between 1 and 7
 * @throws {RangeError} `options.locale` must contain `match` property
 * @throws {RangeError} use `yyyy` instead of `YYYY` for formatting years using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 * @throws {RangeError} use `yy` instead of `YY` for formatting years using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 * @throws {RangeError} use `d` instead of `D` for formatting days of the month using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 * @throws {RangeError} use `dd` instead of `DD` for formatting days of the month using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 * @throws {RangeError} format string contains an unescaped latin alphabet character
 *
 * @example
 * // Parse 11 February 2014 from middle-endian format:
 * var result = parse('02/11/2014', 'MM/dd/yyyy', new Date())
 * //=> Tue Feb 11 2014 00:00:00
 *
 * @example
 * // Parse 28th of February in Esperanto locale in the context of 2010 year:
 * import eo from 'date-fns/locale/eo'
 * var result = parse('28-a de februaro', "do 'de' MMMM", new Date(2010, 0, 1), {
 *   locale: eo
 * })
 * //=> Sun Feb 28 2010 00:00:00
 */
function parse(dirtyDateString, dirtyFormatString, dirtyReferenceDate, options) {
  var _ref, _options$locale, _ref2, _ref3, _ref4, _options$firstWeekCon, _options$locale2, _options$locale2$opti, _defaultOptions$local, _defaultOptions$local2, _ref5, _ref6, _ref7, _options$weekStartsOn, _options$locale3, _options$locale3$opti, _defaultOptions$local3, _defaultOptions$local4;
  (0, _index17.default)(3, arguments);
  var dateString = String(dirtyDateString);
  var formatString = String(dirtyFormatString);
  var defaultOptions = (0, _index19.getDefaultOptions)();
  var locale = (_ref = (_options$locale = options === null || options === void 0 ? void 0 : options.locale) !== null && _options$locale !== void 0 ? _options$locale : defaultOptions.locale) !== null && _ref !== void 0 ? _ref : _index2.default;
  if (!locale.match) {
    throw new RangeError('locale must contain match property');
  }
  var firstWeekContainsDate = (0, _index15.default)((_ref2 = (_ref3 = (_ref4 = (_options$firstWeekCon = options === null || options === void 0 ? void 0 : options.firstWeekContainsDate) !== null && _options$firstWeekCon !== void 0 ? _options$firstWeekCon : options === null || options === void 0 ? void 0 : (_options$locale2 = options.locale) === null || _options$locale2 === void 0 ? void 0 : (_options$locale2$opti = _options$locale2.options) === null || _options$locale2$opti === void 0 ? void 0 : _options$locale2$opti.firstWeekContainsDate) !== null && _ref4 !== void 0 ? _ref4 : defaultOptions.firstWeekContainsDate) !== null && _ref3 !== void 0 ? _ref3 : (_defaultOptions$local = defaultOptions.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.firstWeekContainsDate) !== null && _ref2 !== void 0 ? _ref2 : 1);

  // Test if weekStartsOn is between 1 and 7 _and_ is not NaN
  if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {
    throw new RangeError('firstWeekContainsDate must be between 1 and 7 inclusively');
  }
  var weekStartsOn = (0, _index15.default)((_ref5 = (_ref6 = (_ref7 = (_options$weekStartsOn = options === null || options === void 0 ? void 0 : options.weekStartsOn) !== null && _options$weekStartsOn !== void 0 ? _options$weekStartsOn : options === null || options === void 0 ? void 0 : (_options$locale3 = options.locale) === null || _options$locale3 === void 0 ? void 0 : (_options$locale3$opti = _options$locale3.options) === null || _options$locale3$opti === void 0 ? void 0 : _options$locale3$opti.weekStartsOn) !== null && _ref7 !== void 0 ? _ref7 : defaultOptions.weekStartsOn) !== null && _ref6 !== void 0 ? _ref6 : (_defaultOptions$local3 = defaultOptions.locale) === null || _defaultOptions$local3 === void 0 ? void 0 : (_defaultOptions$local4 = _defaultOptions$local3.options) === null || _defaultOptions$local4 === void 0 ? void 0 : _defaultOptions$local4.weekStartsOn) !== null && _ref5 !== void 0 ? _ref5 : 0);

  // Test if weekStartsOn is between 0 and 6 _and_ is not NaN
  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError('weekStartsOn must be between 0 and 6 inclusively');
  }
  if (formatString === '') {
    if (dateString === '') {
      return (0, _index6.default)(dirtyReferenceDate);
    } else {
      return new Date(NaN);
    }
  }
  var subFnOptions = {
    firstWeekContainsDate: firstWeekContainsDate,
    weekStartsOn: weekStartsOn,
    locale: locale
  };

  // If timezone isn't specified, it will be set to the system timezone
  var setters = [new _Setter.DateToSystemTimezoneSetter()];
  var tokens = formatString.match(longFormattingTokensRegExp).map(function (substring) {
    var firstCharacter = substring[0];
    if (firstCharacter in _index10.default) {
      var longFormatter = _index10.default[firstCharacter];
      return longFormatter(substring, locale.formatLong);
    }
    return substring;
  }).join('').match(formattingTokensRegExp);
  var usedTokens = [];
  var _iterator = (0, _createForOfIteratorHelper3.default)(tokens),
      _step;
  try {
    var _loop = function _loop() {
      var token = _step.value;
      if (!(options !== null && options !== void 0 && options.useAdditionalWeekYearTokens) && (0, _index13.isProtectedWeekYearToken)(token)) {
        (0, _index13.throwProtectedError)(token, formatString, dirtyDateString);
      }
      if (!(options !== null && options !== void 0 && options.useAdditionalDayOfYearTokens) && (0, _index13.isProtectedDayOfYearToken)(token)) {
        (0, _index13.throwProtectedError)(token, formatString, dirtyDateString);
      }
      var firstCharacter = token[0];
      var parser = _index18.parsers[firstCharacter];
      if (parser) {
        var incompatibleTokens = parser.incompatibleTokens;
        if (Array.isArray(incompatibleTokens)) {
          var incompatibleToken = usedTokens.find(function (usedToken) {
            return incompatibleTokens.includes(usedToken.token) || usedToken.token === firstCharacter;
          });
          if (incompatibleToken) {
            throw new RangeError("The format string mustn't contain `".concat(incompatibleToken.fullToken, "` and `").concat(token, "` at the same time"));
          }
        } else if (parser.incompatibleTokens === '*' && usedTokens.length > 0) {
          throw new RangeError("The format string mustn't contain `".concat(token, "` and any other token at the same time"));
        }
        usedTokens.push({
          token: firstCharacter,
          fullToken: token
        });
        var parseResult = parser.run(dateString, token, locale.match, subFnOptions);
        if (!parseResult) {
          return {
            v: new Date(NaN)
          };
        }
        setters.push(parseResult.setter);
        dateString = parseResult.rest;
      } else {
        if (firstCharacter.match(unescapedLatinCharacterRegExp)) {
          throw new RangeError('Format string contains an unescaped latin alphabet character `' + firstCharacter + '`');
        }

        // Replace two single quote characters with one single quote character
        if (token === "''") {
          token = "'";
        } else if (firstCharacter === "'") {
          token = cleanEscapedString(token);
        }

        // Cut token from string, or, if string doesn't match the token, return Invalid Date
        if (dateString.indexOf(token) === 0) {
          dateString = dateString.slice(token.length);
        } else {
          return {
            v: new Date(NaN)
          };
        }
      }
    };
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _ret = _loop();
      if ((0, _typeof3.default)(_ret) === "object") return _ret.v;
    }

    // Check if the remaining input contains something other than whitespace
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  if (dateString.length > 0 && notWhitespaceRegExp.test(dateString)) {
    return new Date(NaN);
  }
  var uniquePrioritySetters = setters.map(function (setter) {
    return setter.priority;
  }).sort(function (a, b) {
    return b - a;
  }).filter(function (priority, index, array) {
    return array.indexOf(priority) === index;
  }).map(function (priority) {
    return setters.filter(function (setter) {
      return setter.priority === priority;
    }).sort(function (a, b) {
      return b.subPriority - a.subPriority;
    });
  }).map(function (setterArray) {
    return setterArray[0];
  });
  var date = (0, _index6.default)(dirtyReferenceDate);
  if (isNaN(date.getTime())) {
    return new Date(NaN);
  }

  // Convert the date in system timezone to the same date in UTC+00:00 timezone.
  var utcDate = (0, _index4.default)(date, (0, _index12.default)(date));
  var flags = {};
  var _iterator2 = (0, _createForOfIteratorHelper3.default)(uniquePrioritySetters),
      _step2;
  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var setter = _step2.value;
      if (!setter.validate(utcDate, subFnOptions)) {
        return new Date(NaN);
      }
      var result = setter.set(utcDate, flags, subFnOptions);
      // Result is tuple (date, flags)
      if (Array.isArray(result)) {
        utcDate = result[0];
        (0, _index8.default)(flags, result[1]);
        // Result is date
      } else {
        utcDate = result;
      }
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
  return utcDate;
}
function cleanEscapedString(input) {
  return input.match(escapedStringRegExp)[1].replace(doubleQuoteRegExp, "'");
}
},{"@babel/runtime/helpers/esm/typeof":503,"@babel/runtime/helpers/esm/createForOfIteratorHelper":504,"../_lib/defaultLocale/index.js":496,"../subMilliseconds/index.js":234,"../toDate/index.js":243,"../_lib/assign/index.js":498,"../_lib/format/longFormatters/index.js":501,"../_lib/getTimezoneOffsetInMilliseconds/index.js":492,"../_lib/protectedTokens/index.js":499,"../_lib/toInteger/index.js":491,"../_lib/requiredArgs/index.js":490,"./_lib/Setter.js":488,"./_lib/parsers/index.js":489,"../_lib/defaultOptions/index.js":494}],123:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isMatch;

var _index = require("../parse/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../isValid/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../_lib/requiredArgs/index.js");

var _index6 = _interopRequireDefault(_index5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name isMatch
 * @category Common Helpers
 * @summary validates the date string against given formats
 *
 * @description
 * Return the true if given date is string correct against the given format else
 * will return false.
 *
 * > ⚠️ Please note that the `format` tokens differ from Moment.js and other libraries.
 * > See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 *
 * The characters in the format string wrapped between two single quotes characters (') are escaped.
 * Two single quotes in a row, whether inside or outside a quoted sequence, represent a 'real' single quote.
 *
 * Format of the format string is based on Unicode Technical Standard #35:
 * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
 * with a few additions (see note 5 below the table).
 *
 * Not all tokens are compatible. Combinations that don't make sense or could lead to bugs are prohibited
 * and will throw `RangeError`. For example usage of 24-hour format token with AM/PM token will throw an exception:
 *
 * ```javascript
 * isMatch('23 AM', 'HH a')
 * //=> RangeError: The format string mustn't contain `HH` and `a` at the same time
 * ```
 *
 * See the compatibility table: https://docs.google.com/spreadsheets/d/e/2PACX-1vQOPU3xUhplll6dyoMmVUXHKl_8CRDs6_ueLmex3SoqwhuolkuN3O05l4rqx5h1dKX8eb46Ul-CCSrq/pubhtml?gid=0&single=true
 *
 * Accepted format string patterns:
 * | Unit                            |Prior| Pattern | Result examples                   | Notes |
 * |---------------------------------|-----|---------|-----------------------------------|-------|
 * | Era                             | 140 | G..GGG  | AD, BC                            |       |
 * |                                 |     | GGGG    | Anno Domini, Before Christ        | 2     |
 * |                                 |     | GGGGG   | A, B                              |       |
 * | Calendar year                   | 130 | y       | 44, 1, 1900, 2017, 9999           | 4     |
 * |                                 |     | yo      | 44th, 1st, 1900th, 9999999th      | 4,5   |
 * |                                 |     | yy      | 44, 01, 00, 17                    | 4     |
 * |                                 |     | yyy     | 044, 001, 123, 999                | 4     |
 * |                                 |     | yyyy    | 0044, 0001, 1900, 2017            | 4     |
 * |                                 |     | yyyyy   | ...                               | 2,4   |
 * | Local week-numbering year       | 130 | Y       | 44, 1, 1900, 2017, 9000           | 4     |
 * |                                 |     | Yo      | 44th, 1st, 1900th, 9999999th      | 4,5   |
 * |                                 |     | YY      | 44, 01, 00, 17                    | 4,6   |
 * |                                 |     | YYY     | 044, 001, 123, 999                | 4     |
 * |                                 |     | YYYY    | 0044, 0001, 1900, 2017            | 4,6   |
 * |                                 |     | YYYYY   | ...                               | 2,4   |
 * | ISO week-numbering year         | 130 | R       | -43, 1, 1900, 2017, 9999, -9999   | 4,5   |
 * |                                 |     | RR      | -43, 01, 00, 17                   | 4,5   |
 * |                                 |     | RRR     | -043, 001, 123, 999, -999         | 4,5   |
 * |                                 |     | RRRR    | -0043, 0001, 2017, 9999, -9999    | 4,5   |
 * |                                 |     | RRRRR   | ...                               | 2,4,5 |
 * | Extended year                   | 130 | u       | -43, 1, 1900, 2017, 9999, -999    | 4     |
 * |                                 |     | uu      | -43, 01, 99, -99                  | 4     |
 * |                                 |     | uuu     | -043, 001, 123, 999, -999         | 4     |
 * |                                 |     | uuuu    | -0043, 0001, 2017, 9999, -9999    | 4     |
 * |                                 |     | uuuuu   | ...                               | 2,4   |
 * | Quarter (formatting)            | 120 | Q       | 1, 2, 3, 4                        |       |
 * |                                 |     | Qo      | 1st, 2nd, 3rd, 4th                | 5     |
 * |                                 |     | QQ      | 01, 02, 03, 04                    |       |
 * |                                 |     | QQQ     | Q1, Q2, Q3, Q4                    |       |
 * |                                 |     | QQQQ    | 1st quarter, 2nd quarter, ...     | 2     |
 * |                                 |     | QQQQQ   | 1, 2, 3, 4                        | 4     |
 * | Quarter (stand-alone)           | 120 | q       | 1, 2, 3, 4                        |       |
 * |                                 |     | qo      | 1st, 2nd, 3rd, 4th                | 5     |
 * |                                 |     | qq      | 01, 02, 03, 04                    |       |
 * |                                 |     | qqq     | Q1, Q2, Q3, Q4                    |       |
 * |                                 |     | qqqq    | 1st quarter, 2nd quarter, ...     | 2     |
 * |                                 |     | qqqqq   | 1, 2, 3, 4                        | 3     |
 * | Month (formatting)              | 110 | M       | 1, 2, ..., 12                     |       |
 * |                                 |     | Mo      | 1st, 2nd, ..., 12th               | 5     |
 * |                                 |     | MM      | 01, 02, ..., 12                   |       |
 * |                                 |     | MMM     | Jan, Feb, ..., Dec                |       |
 * |                                 |     | MMMM    | January, February, ..., December  | 2     |
 * |                                 |     | MMMMM   | J, F, ..., D                      |       |
 * | Month (stand-alone)             | 110 | L       | 1, 2, ..., 12                     |       |
 * |                                 |     | Lo      | 1st, 2nd, ..., 12th               | 5     |
 * |                                 |     | LL      | 01, 02, ..., 12                   |       |
 * |                                 |     | LLL     | Jan, Feb, ..., Dec                |       |
 * |                                 |     | LLLL    | January, February, ..., December  | 2     |
 * |                                 |     | LLLLL   | J, F, ..., D                      |       |
 * | Local week of year              | 100 | w       | 1, 2, ..., 53                     |       |
 * |                                 |     | wo      | 1st, 2nd, ..., 53th               | 5     |
 * |                                 |     | ww      | 01, 02, ..., 53                   |       |
 * | ISO week of year                | 100 | I       | 1, 2, ..., 53                     | 5     |
 * |                                 |     | Io      | 1st, 2nd, ..., 53th               | 5     |
 * |                                 |     | II      | 01, 02, ..., 53                   | 5     |
 * | Day of month                    |  90 | d       | 1, 2, ..., 31                     |       |
 * |                                 |     | do      | 1st, 2nd, ..., 31st               | 5     |
 * |                                 |     | dd      | 01, 02, ..., 31                   |       |
 * | Day of year                     |  90 | D       | 1, 2, ..., 365, 366               | 7     |
 * |                                 |     | Do      | 1st, 2nd, ..., 365th, 366th       | 5     |
 * |                                 |     | DD      | 01, 02, ..., 365, 366             | 7     |
 * |                                 |     | DDD     | 001, 002, ..., 365, 366           |       |
 * |                                 |     | DDDD    | ...                               | 2     |
 * | Day of week (formatting)        |  90 | E..EEE  | Mon, Tue, Wed, ..., Su            |       |
 * |                                 |     | EEEE    | Monday, Tuesday, ..., Sunday      | 2     |
 * |                                 |     | EEEEE   | M, T, W, T, F, S, S               |       |
 * |                                 |     | EEEEEE  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
 * | ISO day of week (formatting)    |  90 | i       | 1, 2, 3, ..., 7                   | 5     |
 * |                                 |     | io      | 1st, 2nd, ..., 7th                | 5     |
 * |                                 |     | ii      | 01, 02, ..., 07                   | 5     |
 * |                                 |     | iii     | Mon, Tue, Wed, ..., Su            | 5     |
 * |                                 |     | iiii    | Monday, Tuesday, ..., Sunday      | 2,5   |
 * |                                 |     | iiiii   | M, T, W, T, F, S, S               | 5     |
 * |                                 |     | iiiiii  | Mo, Tu, We, Th, Fr, Sa, Su        | 5     |
 * | Local day of week (formatting)  |  90 | e       | 2, 3, 4, ..., 1                   |       |
 * |                                 |     | eo      | 2nd, 3rd, ..., 1st                | 5     |
 * |                                 |     | ee      | 02, 03, ..., 01                   |       |
 * |                                 |     | eee     | Mon, Tue, Wed, ..., Su            |       |
 * |                                 |     | eeee    | Monday, Tuesday, ..., Sunday      | 2     |
 * |                                 |     | eeeee   | M, T, W, T, F, S, S               |       |
 * |                                 |     | eeeeee  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
 * | Local day of week (stand-alone) |  90 | c       | 2, 3, 4, ..., 1                   |       |
 * |                                 |     | co      | 2nd, 3rd, ..., 1st                | 5     |
 * |                                 |     | cc      | 02, 03, ..., 01                   |       |
 * |                                 |     | ccc     | Mon, Tue, Wed, ..., Su            |       |
 * |                                 |     | cccc    | Monday, Tuesday, ..., Sunday      | 2     |
 * |                                 |     | ccccc   | M, T, W, T, F, S, S               |       |
 * |                                 |     | cccccc  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
 * | AM, PM                          |  80 | a..aaa  | AM, PM                            |       |
 * |                                 |     | aaaa    | a.m., p.m.                        | 2     |
 * |                                 |     | aaaaa   | a, p                              |       |
 * | AM, PM, noon, midnight          |  80 | b..bbb  | AM, PM, noon, midnight            |       |
 * |                                 |     | bbbb    | a.m., p.m., noon, midnight        | 2     |
 * |                                 |     | bbbbb   | a, p, n, mi                       |       |
 * | Flexible day period             |  80 | B..BBB  | at night, in the morning, ...     |       |
 * |                                 |     | BBBB    | at night, in the morning, ...     | 2     |
 * |                                 |     | BBBBB   | at night, in the morning, ...     |       |
 * | Hour [1-12]                     |  70 | h       | 1, 2, ..., 11, 12                 |       |
 * |                                 |     | ho      | 1st, 2nd, ..., 11th, 12th         | 5     |
 * |                                 |     | hh      | 01, 02, ..., 11, 12               |       |
 * | Hour [0-23]                     |  70 | H       | 0, 1, 2, ..., 23                  |       |
 * |                                 |     | Ho      | 0th, 1st, 2nd, ..., 23rd          | 5     |
 * |                                 |     | HH      | 00, 01, 02, ..., 23               |       |
 * | Hour [0-11]                     |  70 | K       | 1, 2, ..., 11, 0                  |       |
 * |                                 |     | Ko      | 1st, 2nd, ..., 11th, 0th          | 5     |
 * |                                 |     | KK      | 01, 02, ..., 11, 00               |       |
 * | Hour [1-24]                     |  70 | k       | 24, 1, 2, ..., 23                 |       |
 * |                                 |     | ko      | 24th, 1st, 2nd, ..., 23rd         | 5     |
 * |                                 |     | kk      | 24, 01, 02, ..., 23               |       |
 * | Minute                          |  60 | m       | 0, 1, ..., 59                     |       |
 * |                                 |     | mo      | 0th, 1st, ..., 59th               | 5     |
 * |                                 |     | mm      | 00, 01, ..., 59                   |       |
 * | Second                          |  50 | s       | 0, 1, ..., 59                     |       |
 * |                                 |     | so      | 0th, 1st, ..., 59th               | 5     |
 * |                                 |     | ss      | 00, 01, ..., 59                   |       |
 * | Seconds timestamp               |  40 | t       | 512969520                         |       |
 * |                                 |     | tt      | ...                               | 2     |
 * | Fraction of second              |  30 | S       | 0, 1, ..., 9                      |       |
 * |                                 |     | SS      | 00, 01, ..., 99                   |       |
 * |                                 |     | SSS     | 000, 001, ..., 999                |       |
 * |                                 |     | SSSS    | ...                               | 2     |
 * | Milliseconds timestamp          |  20 | T       | 512969520900                      |       |
 * |                                 |     | TT      | ...                               | 2     |
 * | Timezone (ISO-8601 w/ Z)        |  10 | X       | -08, +0530, Z                     |       |
 * |                                 |     | XX      | -0800, +0530, Z                   |       |
 * |                                 |     | XXX     | -08:00, +05:30, Z                 |       |
 * |                                 |     | XXXX    | -0800, +0530, Z, +123456          | 2     |
 * |                                 |     | XXXXX   | -08:00, +05:30, Z, +12:34:56      |       |
 * | Timezone (ISO-8601 w/o Z)       |  10 | x       | -08, +0530, +00                   |       |
 * |                                 |     | xx      | -0800, +0530, +0000               |       |
 * |                                 |     | xxx     | -08:00, +05:30, +00:00            | 2     |
 * |                                 |     | xxxx    | -0800, +0530, +0000, +123456      |       |
 * |                                 |     | xxxxx   | -08:00, +05:30, +00:00, +12:34:56 |       |
 * | Long localized date             |  NA | P       | 05/29/1453                        | 5,8   |
 * |                                 |     | PP      | May 29, 1453                      |       |
 * |                                 |     | PPP     | May 29th, 1453                    |       |
 * |                                 |     | PPPP    | Sunday, May 29th, 1453            | 2,5,8 |
 * | Long localized time             |  NA | p       | 12:00 AM                          | 5,8   |
 * |                                 |     | pp      | 12:00:00 AM                       |       |
 * | Combination of date and time    |  NA | Pp      | 05/29/1453, 12:00 AM              |       |
 * |                                 |     | PPpp    | May 29, 1453, 12:00:00 AM         |       |
 * |                                 |     | PPPpp   | May 29th, 1453 at ...             |       |
 * |                                 |     | PPPPpp  | Sunday, May 29th, 1453 at ...     | 2,5,8 |
 * Notes:
 * 1. "Formatting" units (e.g. formatting quarter) in the default en-US locale
 *    are the same as "stand-alone" units, but are different in some languages.
 *    "Formatting" units are declined according to the rules of the language
 *    in the context of a date. "Stand-alone" units are always nominative singular.
 *    In `format` function, they will produce different result:
 *
 *    `format(new Date(2017, 10, 6), 'do LLLL', {locale: cs}) //=> '6. listopad'`
 *
 *    `format(new Date(2017, 10, 6), 'do MMMM', {locale: cs}) //=> '6. listopadu'`
 *
 *    `isMatch` will try to match both formatting and stand-alone units interchangably.
 *
 * 2. Any sequence of the identical letters is a pattern, unless it is escaped by
 *    the single quote characters (see below).
 *    If the sequence is longer than listed in table:
 *    - for numerical units (`yyyyyyyy`) `isMatch` will try to match a number
 *      as wide as the sequence
 *    - for text units (`MMMMMMMM`) `isMatch` will try to match the widest variation of the unit.
 *      These variations are marked with "2" in the last column of the table.
 *
 * 3. `QQQQQ` and `qqqqq` could be not strictly numerical in some locales.
 *    These tokens represent the shortest form of the quarter.
 *
 * 4. The main difference between `y` and `u` patterns are B.C. years:
 *
 *    | Year | `y` | `u` |
 *    |------|-----|-----|
 *    | AC 1 |   1 |   1 |
 *    | BC 1 |   1 |   0 |
 *    | BC 2 |   2 |  -1 |
 *
 *    Also `yy` will try to guess the century of two digit year by proximity with `referenceDate`:
 *
 *    `isMatch('50', 'yy') //=> true`
 *
 *    `isMatch('75', 'yy') //=> true`
 *
 *    while `uu` will use the year as is:
 *
 *    `isMatch('50', 'uu') //=> true`
 *
 *    `isMatch('75', 'uu') //=> true`
 *
 *    The same difference is true for local and ISO week-numbering years (`Y` and `R`),
 *    except local week-numbering years are dependent on `options.weekStartsOn`
 *    and `options.firstWeekContainsDate` (compare [setISOWeekYear]{@link https://date-fns.org/docs/setISOWeekYear}
 *    and [setWeekYear]{@link https://date-fns.org/docs/setWeekYear}).
 *
 * 5. These patterns are not in the Unicode Technical Standard #35:
 *    - `i`: ISO day of week
 *    - `I`: ISO week of year
 *    - `R`: ISO week-numbering year
 *    - `o`: ordinal number modifier
 *    - `P`: long localized date
 *    - `p`: long localized time
 *
 * 6. `YY` and `YYYY` tokens represent week-numbering years but they are often confused with years.
 *    You should enable `options.useAdditionalWeekYearTokens` to use them. See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 *
 * 7. `D` and `DD` tokens represent days of the year but they are ofthen confused with days of the month.
 *    You should enable `options.useAdditionalDayOfYearTokens` to use them. See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 *
 * 8. `P+` tokens do not have a defined priority since they are merely aliases to other tokens based
 *    on the given locale.
 *
 *    using `en-US` locale: `P` => `MM/dd/yyyy`
 *    using `en-US` locale: `p` => `hh:mm a`
 *    using `pt-BR` locale: `P` => `dd/MM/yyyy`
 *    using `pt-BR` locale: `p` => `HH:mm`
 *
 * Values will be checked in the descending order of its unit's priority.
 * Units of an equal priority overwrite each other in the order of appearance.
 *
 * If no values of higher priority are matched (e.g. when matching string 'January 1st' without a year),
 * the values will be taken from today's using `new Date()` date which works as a context of parsing.
 *
 * The result may vary by locale.
 *
 * If `formatString` matches with `dateString` but does not provides tokens, `referenceDate` will be returned.
 *
 *
 *
 * @param {String} dateString - the date string to verify
 * @param {String} formatString - the string of tokens
 * @param {Object} [options] - an object with options.
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @param {1|2|3|4|5|6|7} [options.firstWeekContainsDate=1] - the day of January, which is always in the first week of the year
 * @param {Boolean} [options.useAdditionalWeekYearTokens=false] - if true, allows usage of the week-numbering year tokens `YY` and `YYYY`;
 *   see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 * @param {Boolean} [options.useAdditionalDayOfYearTokens=false] - if true, allows usage of the day of year tokens `D` and `DD`;
 *   see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 * @returns {Boolean}
 * @throws {TypeError} 2 arguments required
 * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
 * @throws {RangeError} `options.firstWeekContainsDate` must be between 1 and 7
 * @throws {RangeError} `options.locale` must contain `match` property
 * @throws {RangeError} use `yyyy` instead of `YYYY` for formatting years; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 * @throws {RangeError} use `yy` instead of `YY` for formatting years; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 * @throws {RangeError} use `d` instead of `D` for formatting days of the month; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 * @throws {RangeError} use `dd` instead of `DD` for formatting days of the month; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 * @throws {RangeError} format string contains an unescaped latin alphabet character
 *
 * @example
 * // Match 11 February 2014 from middle-endian format:
 * const result = isMatch('02/11/2014', 'MM/dd/yyyy')
 * //=> true
 *
 * @example
 * // Match 28th of February in Esperanto locale in the context of 2010 year:
 * import eo from 'date-fns/locale/eo'
 * const result = isMatch('28-a de februaro', "do 'de' MMMM", {
 *   locale: eo
 * })
 * //=> true
 */
function isMatch(dateString, formatString, options) {
  (0, _index6.default)(2, arguments);
  return (0, _index4.default)((0, _index2.default)(dateString, formatString, new Date(), options));
}
},{"../parse/index.js":186,"../isValid/index.js":151,"../_lib/requiredArgs/index.js":490}],125:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isMonday;

var _index = require("../toDate/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name isMonday
 * @category Weekday Helpers
 * @summary Is the given date Monday?
 *
 * @description
 * Is the given date Monday?
 *
 * @param {Date|Number} date - the date to check
 * @returns {Boolean} the date is Monday
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Is 22 September 2014 Monday?
 * const result = isMonday(new Date(2014, 8, 22))
 * //=> true
 */
function isMonday(date) {
  (0, _index4.default)(1, arguments);
  return (0, _index2.default)(date).getDay() === 1;
}
},{"../toDate/index.js":243,"../_lib/requiredArgs/index.js":490}],124:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isPast;

var _index = require("../toDate/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name isPast
 * @category Common Helpers
 * @summary Is the given date in the past?
 * @pure false
 *
 * @description
 * Is the given date in the past?
 *
 * > ⚠️ Please note that this function is not present in the FP submodule as
 * > it uses `Date.now()` internally hence impure and can't be safely curried.
 *
 * @param {Date|Number} date - the date to check
 * @returns {Boolean} the date is in the past
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // If today is 6 October 2014, is 2 July 2014 in the past?
 * const result = isPast(new Date(2014, 6, 2))
 * //=> true
 */
function isPast(dirtyDate) {
  (0, _index4.default)(1, arguments);
  return (0, _index2.default)(dirtyDate).getTime() < Date.now();
}
},{"../toDate/index.js":243,"../_lib/requiredArgs/index.js":490}],214:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = startOfHour;

var _index = require("../toDate/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name startOfHour
 * @category Hour Helpers
 * @summary Return the start of an hour for the given date.
 *
 * @description
 * Return the start of an hour for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|Number} date - the original date
 * @returns {Date} the start of an hour
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // The start of an hour for 2 September 2014 11:55:00:
 * const result = startOfHour(new Date(2014, 8, 2, 11, 55))
 * //=> Tue Sep 02 2014 11:00:00
 */
function startOfHour(dirtyDate) {
  (0, _index4.default)(1, arguments);
  var date = (0, _index2.default)(dirtyDate);
  date.setMinutes(0, 0, 0);
  return date;
}
},{"../toDate/index.js":243,"../_lib/requiredArgs/index.js":490}],129:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isSameHour;

var _index = require("../startOfHour/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name isSameHour
 * @category Hour Helpers
 * @summary Are the given dates in the same hour (and same day)?
 *
 * @description
 * Are the given dates in the same hour (and same day)?
 *
 * @param {Date|Number} dateLeft - the first date to check
 * @param {Date|Number} dateRight - the second date to check
 * @returns {Boolean} the dates are in the same hour (and same day)
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Are 4 September 2014 06:00:00 and 4 September 06:30:00 in the same hour?
 * const result = isSameHour(new Date(2014, 8, 4, 6, 0), new Date(2014, 8, 4, 6, 30))
 * //=> true
 *
 * @example
 * // Are 4 September 2014 06:00:00 and 5 September 06:00:00 in the same hour?
 * const result = isSameHour(new Date(2014, 8, 4, 6, 0), new Date(2014, 8, 5, 6, 0))
 * //=> false
 */
function isSameHour(dirtyDateLeft, dirtyDateRight) {
  (0, _index4.default)(2, arguments);
  var dateLeftStartOfHour = (0, _index2.default)(dirtyDateLeft);
  var dateRightStartOfHour = (0, _index2.default)(dirtyDateRight);
  return dateLeftStartOfHour.getTime() === dateRightStartOfHour.getTime();
}
},{"../startOfHour/index.js":214,"../_lib/requiredArgs/index.js":490}],135:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isSameWeek;

var _index = require("../startOfWeek/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name isSameWeek
 * @category Week Helpers
 * @summary Are the given dates in the same week (and month and year)?
 *
 * @description
 * Are the given dates in the same week (and month and year)?
 *
 * @param {Date|Number} dateLeft - the first date to check
 * @param {Date|Number} dateRight - the second date to check
 * @param {Object} [options] - an object with options.
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @returns {Boolean} the dates are in the same week (and month and year)
 * @throws {TypeError} 2 arguments required
 * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
 *
 * @example
 * // Are 31 August 2014 and 4 September 2014 in the same week?
 * const result = isSameWeek(new Date(2014, 7, 31), new Date(2014, 8, 4))
 * //=> true
 *
 * @example
 * // If week starts with Monday,
 * // are 31 August 2014 and 4 September 2014 in the same week?
 * const result = isSameWeek(new Date(2014, 7, 31), new Date(2014, 8, 4), {
 *   weekStartsOn: 1
 * })
 * //=> false
 *
 * @example
 * // Are 1 January 2014 and 1 January 2015 in the same week?
 * const result = isSameWeek(new Date(2014, 0, 1), new Date(2015, 0, 1))
 * //=> false
 */
function isSameWeek(dirtyDateLeft, dirtyDateRight, options) {
  (0, _index4.default)(2, arguments);
  var dateLeftStartOfWeek = (0, _index2.default)(dirtyDateLeft, options);
  var dateRightStartOfWeek = (0, _index2.default)(dirtyDateRight, options);
  return dateLeftStartOfWeek.getTime() === dateRightStartOfWeek.getTime();
}
},{"../startOfWeek/index.js":226,"../_lib/requiredArgs/index.js":490}],127:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isSameISOWeek;

var _index = require("../isSameWeek/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name isSameISOWeek
 * @category ISO Week Helpers
 * @summary Are the given dates in the same ISO week (and year)?
 *
 * @description
 * Are the given dates in the same ISO week (and year)?
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param {Date|Number} dateLeft - the first date to check
 * @param {Date|Number} dateRight - the second date to check
 * @returns {Boolean} the dates are in the same ISO week (and year)
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Are 1 September 2014 and 7 September 2014 in the same ISO week?
 * const result = isSameISOWeek(new Date(2014, 8, 1), new Date(2014, 8, 7))
 * //=> true
 *
 * @example
 * // Are 1 September 2014 and 1 September 2015 in the same ISO week?
 * const result = isSameISOWeek(new Date(2014, 8, 1), new Date(2015, 8, 1))
 * //=> false
 */
function isSameISOWeek(dirtyDateLeft, dirtyDateRight) {
  (0, _index4.default)(2, arguments);
  return (0, _index2.default)(dirtyDateLeft, dirtyDateRight, {
    weekStartsOn: 1
  });
}
},{"../isSameWeek/index.js":135,"../_lib/requiredArgs/index.js":490}],128:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isSameISOWeekYear;

var _index = require("../startOfISOWeekYear/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name isSameISOWeekYear
 * @category ISO Week-Numbering Year Helpers
 * @summary Are the given dates in the same ISO week-numbering year?
 *
 * @description
 * Are the given dates in the same ISO week-numbering year?
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param {Date|Number} dateLeft - the first date to check
 * @param {Date|Number} dateRight - the second date to check
 * @returns {Boolean} the dates are in the same ISO week-numbering year
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Are 29 December 2003 and 2 January 2005 in the same ISO week-numbering year?
 * const result = isSameISOWeekYear(new Date(2003, 11, 29), new Date(2005, 0, 2))
 * //=> true
 */
function isSameISOWeekYear(dirtyDateLeft, dirtyDateRight) {
  (0, _index4.default)(2, arguments);
  var dateLeftStartOfYear = (0, _index2.default)(dirtyDateLeft);
  var dateRightStartOfYear = (0, _index2.default)(dirtyDateRight);
  return dateLeftStartOfYear.getTime() === dateRightStartOfYear.getTime();
}
},{"../startOfISOWeekYear/index.js":217,"../_lib/requiredArgs/index.js":490}],130:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isSameMinute;

var _index = require("../startOfMinute/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name isSameMinute
 * @category Minute Helpers
 * @summary Are the given dates in the same minute (and hour and day)?
 *
 * @description
 * Are the given dates in the same minute (and hour and day)?
 *
 * @param {Date|Number} dateLeft - the first date to check
 * @param {Date|Number} dateRight - the second date to check
 * @returns {Boolean} the dates are in the same minute (and hour and day)
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Are 4 September 2014 06:30:00 and 4 September 2014 06:30:15 in the same minute?
 * const result = isSameMinute(
 *   new Date(2014, 8, 4, 6, 30),
 *   new Date(2014, 8, 4, 6, 30, 15)
 * )
 * //=> true
 *
 * @example
 * // Are 4 September 2014 06:30:00 and 5 September 2014 06:30:00 in the same minute?
 * const result = isSameMinute(
 *   new Date(2014, 8, 4, 6, 30),
 *   new Date(2014, 8, 5, 6, 30)
 * )
 * //=> false
 */
function isSameMinute(dirtyDateLeft, dirtyDateRight) {
  (0, _index4.default)(2, arguments);
  var dateLeftStartOfMinute = (0, _index2.default)(dirtyDateLeft);
  var dateRightStartOfMinute = (0, _index2.default)(dirtyDateRight);
  return dateLeftStartOfMinute.getTime() === dateRightStartOfMinute.getTime();
}
},{"../startOfMinute/index.js":222,"../_lib/requiredArgs/index.js":490}],132:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isSameMonth;

var _index = require("../toDate/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name isSameMonth
 * @category Month Helpers
 * @summary Are the given dates in the same month (and year)?
 *
 * @description
 * Are the given dates in the same month (and year)?
 *
 * @param {Date|Number} dateLeft - the first date to check
 * @param {Date|Number} dateRight - the second date to check
 * @returns {Boolean} the dates are in the same month (and year)
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Are 2 September 2014 and 25 September 2014 in the same month?
 * const result = isSameMonth(new Date(2014, 8, 2), new Date(2014, 8, 25))
 * //=> true
 *
 * @example
 * // Are 2 September 2014 and 25 September 2015 in the same month?
 * const result = isSameMonth(new Date(2014, 8, 2), new Date(2015, 8, 25))
 * //=> false
 */
function isSameMonth(dirtyDateLeft, dirtyDateRight) {
  (0, _index4.default)(2, arguments);
  var dateLeft = (0, _index2.default)(dirtyDateLeft);
  var dateRight = (0, _index2.default)(dirtyDateRight);
  return dateLeft.getFullYear() === dateRight.getFullYear() && dateLeft.getMonth() === dateRight.getMonth();
}
},{"../toDate/index.js":243,"../_lib/requiredArgs/index.js":490}],131:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isSameQuarter;

var _index = require("../startOfQuarter/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name isSameQuarter
 * @category Quarter Helpers
 * @summary Are the given dates in the same quarter (and year)?
 *
 * @description
 * Are the given dates in the same quarter (and year)?
 *
 * @param {Date|Number} dateLeft - the first date to check
 * @param {Date|Number} dateRight - the second date to check
 * @returns {Boolean} the dates are in the same quarter (and year)
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Are 1 January 2014 and 8 March 2014 in the same quarter?
 * const result = isSameQuarter(new Date(2014, 0, 1), new Date(2014, 2, 8))
 * //=> true
 *
 * @example
 * // Are 1 January 2014 and 1 January 2015 in the same quarter?
 * const result = isSameQuarter(new Date(2014, 0, 1), new Date(2015, 0, 1))
 * //=> false
 */
function isSameQuarter(dirtyDateLeft, dirtyDateRight) {
  (0, _index4.default)(2, arguments);
  var dateLeftStartOfQuarter = (0, _index2.default)(dirtyDateLeft);
  var dateRightStartOfQuarter = (0, _index2.default)(dirtyDateRight);
  return dateLeftStartOfQuarter.getTime() === dateRightStartOfQuarter.getTime();
}
},{"../startOfQuarter/index.js":228,"../_lib/requiredArgs/index.js":490}],224:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = startOfSecond;

var _index = require("../toDate/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name startOfSecond
 * @category Second Helpers
 * @summary Return the start of a second for the given date.
 *
 * @description
 * Return the start of a second for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|Number} date - the original date
 * @returns {Date} the start of a second
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // The start of a second for 1 December 2014 22:15:45.400:
 * const result = startOfSecond(new Date(2014, 11, 1, 22, 15, 45, 400))
 * //=> Mon Dec 01 2014 22:15:45.000
 */
function startOfSecond(dirtyDate) {
  (0, _index4.default)(1, arguments);
  var date = (0, _index2.default)(dirtyDate);
  date.setMilliseconds(0);
  return date;
}
},{"../toDate/index.js":243,"../_lib/requiredArgs/index.js":490}],133:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isSameSecond;

var _index = require("../startOfSecond/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name isSameSecond
 * @category Second Helpers
 * @summary Are the given dates in the same second (and hour and day)?
 *
 * @description
 * Are the given dates in the same second (and hour and day)?
 *
 * @param {Date|Number} dateLeft - the first date to check
 * @param {Date|Number} dateRight - the second date to check
 * @returns {Boolean} the dates are in the same second (and hour and day)
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Are 4 September 2014 06:30:15.000 and 4 September 2014 06:30.15.500 in the same second?
 * const result = isSameSecond(
 *   new Date(2014, 8, 4, 6, 30, 15),
 *   new Date(2014, 8, 4, 6, 30, 15, 500)
 * )
 * //=> true
 *
 * @example
 * // Are 4 September 2014 06:00:15.000 and 4 September 2014 06:01.15.000 in the same second?
 * const result = isSameSecond(
 *   new Date(2014, 8, 4, 6, 0, 15),
 *   new Date(2014, 8, 4, 6, 1, 15)
 * )
 * //=> false
 *
 * @example
 * // Are 4 September 2014 06:00:15.000 and 5 September 2014 06:00.15.000 in the same second?
 * const result = isSameSecond(
 *   new Date(2014, 8, 4, 6, 0, 15),
 *   new Date(2014, 8, 5, 6, 0, 15)
 * )
 * //=> false
 */
function isSameSecond(dirtyDateLeft, dirtyDateRight) {
  (0, _index4.default)(2, arguments);
  var dateLeftStartOfSecond = (0, _index2.default)(dirtyDateLeft);
  var dateRightStartOfSecond = (0, _index2.default)(dirtyDateRight);
  return dateLeftStartOfSecond.getTime() === dateRightStartOfSecond.getTime();
}
},{"../startOfSecond/index.js":224,"../_lib/requiredArgs/index.js":490}],134:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isSameYear;

var _index = require("../toDate/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name isSameYear
 * @category Year Helpers
 * @summary Are the given dates in the same year?
 *
 * @description
 * Are the given dates in the same year?
 *
 * @param {Date|Number} dateLeft - the first date to check
 * @param {Date|Number} dateRight - the second date to check
 * @returns {Boolean} the dates are in the same year
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Are 2 September 2014 and 25 September 2014 in the same year?
 * const result = isSameYear(new Date(2014, 8, 2), new Date(2014, 8, 25))
 * //=> true
 */
function isSameYear(dirtyDateLeft, dirtyDateRight) {
  (0, _index4.default)(2, arguments);
  var dateLeft = (0, _index2.default)(dirtyDateLeft);
  var dateRight = (0, _index2.default)(dirtyDateRight);
  return dateLeft.getFullYear() === dateRight.getFullYear();
}
},{"../toDate/index.js":243,"../_lib/requiredArgs/index.js":490}],136:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isThisHour;

var _index = require("../isSameHour/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name isThisHour
 * @category Hour Helpers
 * @summary Is the given date in the same hour as the current date?
 * @pure false
 *
 * @description
 * Is the given date in the same hour as the current date?
 *
 * > ⚠️ Please note that this function is not present in the FP submodule as
 * > it uses `Date.now()` internally hence impure and can't be safely curried.
 *
 * @param {Date|Number} date - the date to check
 * @returns {Boolean} the date is in this hour
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // If now is 25 September 2014 18:30:15.500,
 * // is 25 September 2014 18:00:00 in this hour?
 * const result = isThisHour(new Date(2014, 8, 25, 18))
 * //=> true
 */
function isThisHour(dirtyDate) {
  (0, _index4.default)(1, arguments);
  return (0, _index2.default)(Date.now(), dirtyDate);
}
},{"../isSameHour/index.js":129,"../_lib/requiredArgs/index.js":490}],142:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isThisISOWeek;

var _index = require("../isSameISOWeek/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name isThisISOWeek
 * @category ISO Week Helpers
 * @summary Is the given date in the same ISO week as the current date?
 * @pure false
 *
 * @description
 * Is the given date in the same ISO week as the current date?
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * > ⚠️ Please note that this function is not present in the FP submodule as
 * > it uses `Date.now()` internally hence impure and can't be safely curried.
 *
 * @param {Date|Number} date - the date to check
 * @returns {Boolean} the date is in this ISO week
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // If today is 25 September 2014, is 22 September 2014 in this ISO week?
 * const result = isThisISOWeek(new Date(2014, 8, 22))
 * //=> true
 */
function isThisISOWeek(dirtyDate) {
  (0, _index4.default)(1, arguments);
  return (0, _index2.default)(dirtyDate, Date.now());
}
},{"../isSameISOWeek/index.js":127,"../_lib/requiredArgs/index.js":490}],140:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isThisMinute;

var _index = require("../isSameMinute/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name isThisMinute
 * @category Minute Helpers
 * @summary Is the given date in the same minute as the current date?
 * @pure false
 *
 * @description
 * Is the given date in the same minute as the current date?
 *
 * > ⚠️ Please note that this function is not present in the FP submodule as
 * > it uses `Date.now()` internally hence impure and can't be safely curried.
 *
 * @param {Date|Number} date - the date to check
 * @returns {Boolean} the date is in this minute
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // If now is 25 September 2014 18:30:15.500,
 * // is 25 September 2014 18:30:00 in this minute?
 * const result = isThisMinute(new Date(2014, 8, 25, 18, 30))
 * //=> true
 */
function isThisMinute(dirtyDate) {
  (0, _index4.default)(1, arguments);
  return (0, _index2.default)(Date.now(), dirtyDate);
}
},{"../isSameMinute/index.js":130,"../_lib/requiredArgs/index.js":490}],141:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isThisMonth;

var _index = require("../isSameMonth/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name isThisMonth
 * @category Month Helpers
 * @summary Is the given date in the same month as the current date?
 * @pure false
 *
 * @description
 * Is the given date in the same month as the current date?
 *
 * > ⚠️ Please note that this function is not present in the FP submodule as
 * > it uses `Date.now()` internally hence impure and can't be safely curried.
 *
 * @param {Date|Number} date - the date to check
 * @returns {Boolean} the date is in this month
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // If today is 25 September 2014, is 15 September 2014 in this month?
 * const result = isThisMonth(new Date(2014, 8, 15))
 * //=> true
 */
function isThisMonth(dirtyDate) {
  (0, _index4.default)(1, arguments);
  return (0, _index2.default)(Date.now(), dirtyDate);
}
},{"../isSameMonth/index.js":132,"../_lib/requiredArgs/index.js":490}],144:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isThisQuarter;

var _index = require("../isSameQuarter/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name isThisQuarter
 * @category Quarter Helpers
 * @summary Is the given date in the same quarter as the current date?
 * @pure false
 *
 * @description
 * Is the given date in the same quarter as the current date?
 *
 * > ⚠️ Please note that this function is not present in the FP submodule as
 * > it uses `Date.now()` internally hence impure and can't be safely curried.
 *
 * @param {Date|Number} date - the date to check
 * @returns {Boolean} the date is in this quarter
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // If today is 25 September 2014, is 2 July 2014 in this quarter?
 * const result = isThisQuarter(new Date(2014, 6, 2))
 * //=> true
 */
function isThisQuarter(dirtyDate) {
  (0, _index4.default)(1, arguments);
  return (0, _index2.default)(Date.now(), dirtyDate);
}
},{"../isSameQuarter/index.js":131,"../_lib/requiredArgs/index.js":490}],143:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isThisSecond;

var _index = require("../isSameSecond/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name isThisSecond
 * @category Second Helpers
 * @summary Is the given date in the same second as the current date?
 * @pure false
 *
 * @description
 * Is the given date in the same second as the current date?
 *
 * > ⚠️ Please note that this function is not present in the FP submodule as
 * > it uses `Date.now()` internally hence impure and can't be safely curried.
 *
 * @param {Date|Number} date - the date to check
 * @returns {Boolean} the date is in this second
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // If now is 25 September 2014 18:30:15.500,
 * // is 25 September 2014 18:30:15.000 in this second?
 * const result = isThisSecond(new Date(2014, 8, 25, 18, 30, 15))
 * //=> true
 */
function isThisSecond(dirtyDate) {
  (0, _index4.default)(1, arguments);
  return (0, _index2.default)(Date.now(), dirtyDate);
}
},{"../isSameSecond/index.js":133,"../_lib/requiredArgs/index.js":490}],147:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isThisWeek;

var _index = require("../isSameWeek/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name isThisWeek
 * @category Week Helpers
 * @summary Is the given date in the same week as the current date?
 * @pure false
 *
 * @description
 * Is the given date in the same week as the current date?
 *
 * > ⚠️ Please note that this function is not present in the FP submodule as
 * > it uses `Date.now()` internally hence impure and can't be safely curried.
 *
 * @param {Date|Number} date - the date to check
 * @param {Object} [options] - the object with options
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @returns {Boolean} the date is in this week
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
 *
 * @example
 * // If today is 25 September 2014, is 21 September 2014 in this week?
 * const result = isThisWeek(new Date(2014, 8, 21))
 * //=> true
 *
 * @example
 * // If today is 25 September 2014 and week starts with Monday
 * // is 21 September 2014 in this week?
 * const result = isThisWeek(new Date(2014, 8, 21), { weekStartsOn: 1 })
 * //=> false
 */

function isThisWeek(dirtyDate, options) {
  (0, _index4.default)(1, arguments);
  return (0, _index2.default)(dirtyDate, Date.now(), options);
}
},{"../isSameWeek/index.js":135,"../_lib/requiredArgs/index.js":490}],146:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isThisYear;

var _index = require("../isSameYear/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name isThisYear
 * @category Year Helpers
 * @summary Is the given date in the same year as the current date?
 * @pure false
 *
 * @description
 * Is the given date in the same year as the current date?
 *
 * > ⚠️ Please note that this function is not present in the FP submodule as
 * > it uses `Date.now()` internally hence impure and can't be safely curried.
 *
 * @param {Date|Number} date - the date to check
 * @returns {Boolean} the date is in this year
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // If today is 25 September 2014, is 2 July 2014 in this year?
 * const result = isThisYear(new Date(2014, 6, 2))
 * //=> true
 */
function isThisYear(dirtyDate) {
  (0, _index4.default)(1, arguments);
  return (0, _index2.default)(dirtyDate, Date.now());
}
},{"../isSameYear/index.js":134,"../_lib/requiredArgs/index.js":490}],150:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isThursday;

var _index = require("../toDate/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name isThursday
 * @category Weekday Helpers
 * @summary Is the given date Thursday?
 *
 * @description
 * Is the given date Thursday?
 *
 * @param {Date|Number} date - the date to check
 * @returns {Boolean} the date is Thursday
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Is 25 September 2014 Thursday?
 * const result = isThursday(new Date(2014, 8, 25))
 * //=> true
 */
function isThursday(dirtyDate) {
  (0, _index4.default)(1, arguments);
  return (0, _index2.default)(dirtyDate).getDay() === 4;
}
},{"../toDate/index.js":243,"../_lib/requiredArgs/index.js":490}],145:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isToday;

var _index = require("../isSameDay/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name isToday
 * @category Day Helpers
 * @summary Is the given date today?
 * @pure false
 *
 * @description
 * Is the given date today?
 *
 * > ⚠️ Please note that this function is not present in the FP submodule as
 * > it uses `Date.now()` internally hence impure and can't be safely curried.
 *
 * @param {Date|Number} date - the date to check
 * @returns {Boolean} the date is today
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // If today is 6 October 2014, is 6 October 14:00:00 today?
 * const result = isToday(new Date(2014, 9, 6, 14, 0))
 * //=> true
 */
function isToday(dirtyDate) {
  (0, _index4.default)(1, arguments);
  return (0, _index2.default)(dirtyDate, Date.now());
}
},{"../isSameDay/index.js":126,"../_lib/requiredArgs/index.js":490}],148:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isTomorrow;

var _index = require("../addDays/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../isSameDay/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../_lib/requiredArgs/index.js");

var _index6 = _interopRequireDefault(_index5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name isTomorrow
 * @category Day Helpers
 * @summary Is the given date tomorrow?
 * @pure false
 *
 * @description
 * Is the given date tomorrow?
 *
 * > ⚠️ Please note that this function is not present in the FP submodule as
 * > it uses `Date.now()` internally hence impure and can't be safely curried.
 *
 * @param {Date|Number} date - the date to check
 * @returns {Boolean} the date is tomorrow
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // If today is 6 October 2014, is 7 October 14:00:00 tomorrow?
 * const result = isTomorrow(new Date(2014, 9, 7, 14, 0))
 * //=> true
 */
function isTomorrow(dirtyDate) {
  (0, _index6.default)(1, arguments);
  return (0, _index4.default)(dirtyDate, (0, _index2.default)(Date.now(), 1));
}
},{"../addDays/index.js":11,"../isSameDay/index.js":126,"../_lib/requiredArgs/index.js":490}],152:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isTuesday;

var _index = require("../toDate/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name isTuesday
 * @category Weekday Helpers
 * @summary Is the given date Tuesday?
 *
 * @description
 * Is the given date Tuesday?
 *
 * @param {Date|Number} date - the date to check
 * @returns {Boolean} the date is Tuesday
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Is 23 September 2014 Tuesday?
 * const result = isTuesday(new Date(2014, 8, 23))
 * //=> true
 */
function isTuesday(dirtyDate) {
  (0, _index4.default)(1, arguments);
  return (0, _index2.default)(dirtyDate).getDay() === 2;
}
},{"../toDate/index.js":243,"../_lib/requiredArgs/index.js":490}],149:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isWednesday;

var _index = require("../toDate/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name isWednesday
 * @category Weekday Helpers
 * @summary Is the given date Wednesday?
 *
 * @description
 * Is the given date Wednesday?
 *
 * @param {Date|Number} date - the date to check
 * @returns {Boolean} the date is Wednesday
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Is 24 September 2014 Wednesday?
 * const result = isWednesday(new Date(2014, 8, 24))
 * //=> true
 */
function isWednesday(dirtyDate) {
  (0, _index4.default)(1, arguments);
  return (0, _index2.default)(dirtyDate).getDay() === 3;
}
},{"../toDate/index.js":243,"../_lib/requiredArgs/index.js":490}],153:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isWithinInterval;

var _index = require("../toDate/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name isWithinInterval
 * @category Interval Helpers
 * @summary Is the given date within the interval?
 *
 * @description
 * Is the given date within the interval? (Including start and end.)
 *
 * @param {Date|Number} date - the date to check
 * @param {Interval} interval - the interval to check
 * @returns {Boolean} the date is within the interval
 * @throws {TypeError} 2 arguments required
 * @throws {RangeError} The start of an interval cannot be after its end
 * @throws {RangeError} Date in interval cannot be `Invalid Date`
 *
 * @example
 * // For the date within the interval:
 * isWithinInterval(new Date(2014, 0, 3), {
 *   start: new Date(2014, 0, 1),
 *   end: new Date(2014, 0, 7)
 * })
 * //=> true
 *
 * @example
 * // For the date outside of the interval:
 * isWithinInterval(new Date(2014, 0, 10), {
 *   start: new Date(2014, 0, 1),
 *   end: new Date(2014, 0, 7)
 * })
 * //=> false
 *
 * @example
 * // For date equal to interval start:
 * isWithinInterval(date, { start, end: date }) // => true
 *
 * @example
 * // For date equal to interval end:
 * isWithinInterval(date, { start: date, end }) // => true
 */
function isWithinInterval(dirtyDate, interval) {
  (0, _index4.default)(2, arguments);
  var time = (0, _index2.default)(dirtyDate).getTime();
  var startTime = (0, _index2.default)(interval.start).getTime();
  var endTime = (0, _index2.default)(interval.end).getTime();

  // Throw an exception if start date is after end date or if any date is `Invalid Date`
  if (!(startTime <= endTime)) {
    throw new RangeError('Invalid interval');
  }
  return time >= startTime && time <= endTime;
}
},{"../toDate/index.js":243,"../_lib/requiredArgs/index.js":490}],246:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = subDays;

var _index = require("../addDays/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../_lib/toInteger/index.js");

var _index6 = _interopRequireDefault(_index5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name subDays
 * @category Day Helpers
 * @summary Subtract the specified number of days from the given date.
 *
 * @description
 * Subtract the specified number of days from the given date.
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of days to be subtracted. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 * @returns {Date} the new date with the days subtracted
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Subtract 10 days from 1 September 2014:
 * const result = subDays(new Date(2014, 8, 1), 10)
 * //=> Fri Aug 22 2014 00:00:00
 */
function subDays(dirtyDate, dirtyAmount) {
  (0, _index4.default)(2, arguments);
  var amount = (0, _index6.default)(dirtyAmount);
  return (0, _index2.default)(dirtyDate, -amount);
}
},{"../addDays/index.js":11,"../_lib/requiredArgs/index.js":490,"../_lib/toInteger/index.js":491}],157:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isYesterday;

var _index = require("../isSameDay/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../subDays/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../_lib/requiredArgs/index.js");

var _index6 = _interopRequireDefault(_index5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name isYesterday
 * @category Day Helpers
 * @summary Is the given date yesterday?
 * @pure false
 *
 * @description
 * Is the given date yesterday?
 *
 * > ⚠️ Please note that this function is not present in the FP submodule as
 * > it uses `Date.now()` internally hence impure and can't be safely curried.
 *
 * @param {Date|Number} date - the date to check
 * @returns {Boolean} the date is yesterday
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // If today is 6 October 2014, is 5 October 14:00:00 yesterday?
 * const result = isYesterday(new Date(2014, 9, 5, 14, 0))
 * //=> true
 */
function isYesterday(dirtyDate) {
  (0, _index6.default)(1, arguments);
  return (0, _index2.default)(dirtyDate, (0, _index4.default)(Date.now(), 1));
}
},{"../isSameDay/index.js":126,"../subDays/index.js":246,"../_lib/requiredArgs/index.js":490}],156:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = lastDayOfDecade;

var _index = require("../toDate/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name lastDayOfDecade
 * @category Decade Helpers
 * @summary Return the last day of a decade for the given date.
 *
 * @description
 * Return the last day of a decade for the given date.
 *
 * @param {Date|Number} date - the original date
 * @returns {Date} the last day of a decade
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // The last day of a decade for 21 December 2012 21:12:00:
 * const result = lastDayOfDecade(new Date(2012, 11, 21, 21, 12, 00))
 * //=> Wed Dec 31 2019 00:00:00
 */
function lastDayOfDecade(dirtyDate) {
  (0, _index4.default)(1, arguments);
  var date = (0, _index2.default)(dirtyDate);
  var year = date.getFullYear();
  var decade = 9 + Math.floor(year / 10) * 10;
  date.setFullYear(decade + 1, 0, 0);
  date.setHours(0, 0, 0, 0);
  return date;
}
},{"../toDate/index.js":243,"../_lib/requiredArgs/index.js":490}],160:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = lastDayOfWeek;

var _index = require("../toDate/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/toInteger/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../_lib/requiredArgs/index.js");

var _index6 = _interopRequireDefault(_index5);

var _index7 = require("../_lib/defaultOptions/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name lastDayOfWeek
 * @category Week Helpers
 * @summary Return the last day of a week for the given date.
 *
 * @description
 * Return the last day of a week for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|Number} date - the original date
 * @param {Object} [options] - an object with options.
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @returns {Date} the last day of a week
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
 *
 * @example
 * // The last day of a week for 2 September 2014 11:55:00:
 * const result = lastDayOfWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Sat Sep 06 2014 00:00:00
 *
 * @example
 * // If the week starts on Monday, the last day of the week for 2 September 2014 11:55:00:
 * const result = lastDayOfWeek(new Date(2014, 8, 2, 11, 55, 0), { weekStartsOn: 1 })
 * //=> Sun Sep 07 2014 00:00:00
 */
function lastDayOfWeek(dirtyDate, options) {
  var _ref, _ref2, _ref3, _options$weekStartsOn, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
  (0, _index6.default)(1, arguments);
  var defaultOptions = (0, _index7.getDefaultOptions)();
  var weekStartsOn = (0, _index4.default)((_ref = (_ref2 = (_ref3 = (_options$weekStartsOn = options === null || options === void 0 ? void 0 : options.weekStartsOn) !== null && _options$weekStartsOn !== void 0 ? _options$weekStartsOn : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.weekStartsOn) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions.weekStartsOn) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.weekStartsOn) !== null && _ref !== void 0 ? _ref : 0);

  // Test if weekStartsOn is between 0 and 6 _and_ is not NaN
  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError('weekStartsOn must be between 0 and 6');
  }
  var date = (0, _index2.default)(dirtyDate);
  var day = date.getDay();
  var diff = (day < weekStartsOn ? -7 : 0) + 6 - (day - weekStartsOn);
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + diff);
  return date;
}
},{"../toDate/index.js":243,"../_lib/toInteger/index.js":491,"../_lib/requiredArgs/index.js":490,"../_lib/defaultOptions/index.js":494}],155:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = lastDayOfISOWeek;

var _index = require("../lastDayOfWeek/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name lastDayOfISOWeek
 * @category ISO Week Helpers
 * @summary Return the last day of an ISO week for the given date.
 *
 * @description
 * Return the last day of an ISO week for the given date.
 * The result will be in the local timezone.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param {Date|Number} date - the original date
 * @returns {Date} the last day of an ISO week
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // The last day of an ISO week for 2 September 2014 11:55:00:
 * const result = lastDayOfISOWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Sun Sep 07 2014 00:00:00
 */
function lastDayOfISOWeek(dirtyDate) {
  (0, _index4.default)(1, arguments);
  return (0, _index2.default)(dirtyDate, {
    weekStartsOn: 1
  });
}
},{"../lastDayOfWeek/index.js":160,"../_lib/requiredArgs/index.js":490}],158:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = lastDayOfISOWeekYear;

var _index = require("../getISOWeekYear/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../startOfISOWeek/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../_lib/requiredArgs/index.js");

var _index6 = _interopRequireDefault(_index5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name lastDayOfISOWeekYear
 * @category ISO Week-Numbering Year Helpers
 * @summary Return the last day of an ISO week-numbering year for the given date.
 *
 * @description
 * Return the last day of an ISO week-numbering year,
 * which always starts 3 days before the year's first Thursday.
 * The result will be in the local timezone.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param {Date|Number} date - the original date
 * @returns {Date} the end of an ISO week-numbering year
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // The last day of an ISO week-numbering year for 2 July 2005:
 * const result = lastDayOfISOWeekYear(new Date(2005, 6, 2))
 * //=> Sun Jan 01 2006 00:00:00
 */
function lastDayOfISOWeekYear(dirtyDate) {
  (0, _index6.default)(1, arguments);
  var year = (0, _index2.default)(dirtyDate);
  var fourthOfJanuary = new Date(0);
  fourthOfJanuary.setFullYear(year + 1, 0, 4);
  fourthOfJanuary.setHours(0, 0, 0, 0);
  var date = (0, _index4.default)(fourthOfJanuary);
  date.setDate(date.getDate() - 1);
  return date;
}
},{"../getISOWeekYear/index.js":90,"../startOfISOWeek/index.js":218,"../_lib/requiredArgs/index.js":490}],159:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = lastDayOfQuarter;

var _index = require("../toDate/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name lastDayOfQuarter
 * @category Quarter Helpers
 * @summary Return the last day of a year quarter for the given date.
 *
 * @description
 * Return the last day of a year quarter for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|Number} date - the original date
 * @param {Object} [options] - an object with options.
 * @param {0|1|2} [options.additionalDigits=2] - passed to `toDate`. See [toDate]{@link https://date-fns.org/docs/toDate}
 * @returns {Date} the last day of a quarter
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} `options.additionalDigits` must be 0, 1 or 2
 *
 * @example
 * // The last day of a quarter for 2 September 2014 11:55:00:
 * const result = lastDayOfQuarter(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 30 2014 00:00:00
 */
function lastDayOfQuarter(dirtyDate) {
  (0, _index4.default)(1, arguments);
  var date = (0, _index2.default)(dirtyDate);
  var currentMonth = date.getMonth();
  var month = currentMonth - currentMonth % 3 + 3;
  date.setMonth(month, 0);
  date.setHours(0, 0, 0, 0);
  return date;
}
},{"../toDate/index.js":243,"../_lib/requiredArgs/index.js":490}],162:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = lastDayOfYear;

var _index = require("../toDate/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name lastDayOfYear
 * @category Year Helpers
 * @summary Return the last day of a year for the given date.
 *
 * @description
 * Return the last day of a year for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|Number} date - the original date
 * @returns {Date} the last day of a year
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // The last day of a year for 2 September 2014 11:55:00:
 * const result = lastDayOfYear(new Date(2014, 8, 2, 11, 55, 00))
 * //=> Wed Dec 31 2014 00:00:00
 */
function lastDayOfYear(dirtyDate) {
  (0, _index4.default)(1, arguments);
  var date = (0, _index2.default)(dirtyDate);
  var year = date.getFullYear();
  date.setFullYear(year + 1, 0, 0);
  date.setHours(0, 0, 0, 0);
  return date;
}
},{"../toDate/index.js":243,"../_lib/requiredArgs/index.js":490}],164:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = lightFormat;

var _index = require("../toDate/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/format/lightFormatters/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../_lib/getTimezoneOffsetInMilliseconds/index.js");

var _index6 = _interopRequireDefault(_index5);

var _index7 = require("../isValid/index.js");

var _index8 = _interopRequireDefault(_index7);

var _index9 = require("../subMilliseconds/index.js");

var _index10 = _interopRequireDefault(_index9);

var _index11 = require("../_lib/requiredArgs/index.js");

var _index12 = _interopRequireDefault(_index11);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This RegExp consists of three parts separated by `|`:
// - (\w)\1* matches any sequences of the same letter
// - '' matches two quote characters in a row
// - '(''|[^'])+('|$) matches anything surrounded by two quote characters ('),
//   except a single quote symbol, which ends the sequence.
//   Two quote characters do not end the sequence.
//   If there is no matching single quote
//   then the sequence will continue until the end of the string.
// - . matches any single character unmatched by previous parts of the RegExps
var formattingTokensRegExp = /(\w)\1*|''|'(''|[^'])+('|$)|./g;
var escapedStringRegExp = /^'([^]*?)'?$/;
var doubleQuoteRegExp = /''/g;
var unescapedLatinCharacterRegExp = /[a-zA-Z]/;

/**
 * @name lightFormat
 * @category Common Helpers
 * @summary Format the date.
 *
 * @description
 * Return the formatted date string in the given format. Unlike `format`,
 * `lightFormat` doesn't use locales and outputs date using the most popular tokens.
 *
 * > ⚠️ Please note that the `lightFormat` tokens differ from Moment.js and other libraries.
 * > See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 *
 * The characters wrapped between two single quotes characters (') are escaped.
 * Two single quotes in a row, whether inside or outside a quoted sequence, represent a 'real' single quote.
 *
 * Format of the string is based on Unicode Technical Standard #35:
 * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
 *
 * Accepted patterns:
 * | Unit                            | Pattern | Result examples                   |
 * |---------------------------------|---------|-----------------------------------|
 * | AM, PM                          | a..aaa  | AM, PM                            |
 * |                                 | aaaa    | a.m., p.m.                        |
 * |                                 | aaaaa   | a, p                              |
 * | Calendar year                   | y       | 44, 1, 1900, 2017                 |
 * |                                 | yy      | 44, 01, 00, 17                    |
 * |                                 | yyy     | 044, 001, 000, 017                |
 * |                                 | yyyy    | 0044, 0001, 1900, 2017            |
 * | Month (formatting)              | M       | 1, 2, ..., 12                     |
 * |                                 | MM      | 01, 02, ..., 12                   |
 * | Day of month                    | d       | 1, 2, ..., 31                     |
 * |                                 | dd      | 01, 02, ..., 31                   |
 * | Hour [1-12]                     | h       | 1, 2, ..., 11, 12                 |
 * |                                 | hh      | 01, 02, ..., 11, 12               |
 * | Hour [0-23]                     | H       | 0, 1, 2, ..., 23                  |
 * |                                 | HH      | 00, 01, 02, ..., 23               |
 * | Minute                          | m       | 0, 1, ..., 59                     |
 * |                                 | mm      | 00, 01, ..., 59                   |
 * | Second                          | s       | 0, 1, ..., 59                     |
 * |                                 | ss      | 00, 01, ..., 59                   |
 * | Fraction of second              | S       | 0, 1, ..., 9                      |
 * |                                 | SS      | 00, 01, ..., 99                   |
 * |                                 | SSS     | 000, 001, ..., 999                |
 * |                                 | SSSS    | ...                               |
 *
 * @param {Date|Number} date - the original date
 * @param {String} format - the string of tokens
 * @returns {String} the formatted date string
 * @throws {TypeError} 2 arguments required
 * @throws {RangeError} format string contains an unescaped latin alphabet character
 *
 * @example
 * const result = lightFormat(new Date(2014, 1, 11), 'yyyy-MM-dd')
 * //=> '2014-02-11'
 */

function lightFormat(dirtyDate, formatStr) {
  (0, _index12.default)(2, arguments);
  var originalDate = (0, _index2.default)(dirtyDate);
  if (!(0, _index8.default)(originalDate)) {
    throw new RangeError('Invalid time value');
  }

  // Convert the date in system timezone to the same date in UTC+00:00 timezone.
  // This ensures that when UTC functions will be implemented, locales will be compatible with them.
  // See an issue about UTC functions: https://github.com/date-fns/date-fns/issues/376
  var timezoneOffset = (0, _index6.default)(originalDate);
  var utcDate = (0, _index10.default)(originalDate, timezoneOffset);
  var tokens = formatStr.match(formattingTokensRegExp);

  // The only case when formattingTokensRegExp doesn't match the string is when it's empty
  if (!tokens) return '';
  var result = tokens.map(function (substring) {
    // Replace two single quote characters with one single quote character
    if (substring === "''") {
      return "'";
    }
    var firstCharacter = substring[0];
    if (firstCharacter === "'") {
      return cleanEscapedString(substring);
    }
    var formatter = _index4.default[firstCharacter];
    if (formatter) {
      return formatter(utcDate, substring);
    }
    if (firstCharacter.match(unescapedLatinCharacterRegExp)) {
      throw new RangeError('Format string contains an unescaped latin alphabet character `' + firstCharacter + '`');
    }
    return substring;
  }).join('');
  return result;
}
function cleanEscapedString(input) {
  var matches = input.match(escapedStringRegExp);
  if (!matches) {
    return input;
  }
  return matches[1].replace(doubleQuoteRegExp, "'");
}
},{"../toDate/index.js":243,"../_lib/format/lightFormatters/index.js":502,"../_lib/getTimezoneOffsetInMilliseconds/index.js":492,"../isValid/index.js":151,"../subMilliseconds/index.js":234,"../_lib/requiredArgs/index.js":490}],165:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = milliseconds;

var _index = require("../_lib/requiredArgs/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Leap year occures every 4 years, except for years that are divisable by 100 and not divisable by 400.
// 1 mean year = (365+1/4-1/100+1/400) days = 365.2425 days
var daysInYear = 365.2425;

/**
 * @name milliseconds
 * @category Millisecond Helpers
 * @summary
 * Returns the number of milliseconds in the specified, years, months, weeks, days, hours, minutes and seconds.
 *
 * @description
 * Returns the number of milliseconds in the specified, years, months, weeks, days, hours, minutes and seconds.
 *
 * One years equals 365.2425 days according to the formula:
 *
 * > Leap year occures every 4 years, except for years that are divisable by 100 and not divisable by 400.
 * > 1 mean year = (365+1/4-1/100+1/400) days = 365.2425 days
 *
 * One month is a year divided by 12.
 *
 * @param {Duration} duration - the object with years, months, weeks, days, hours, minutes and seconds to be added. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 * @returns {number} the milliseconds
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // 1 year in milliseconds
 * milliseconds({ years: 1 })
 * //=> 31556952000
 *
 * // 3 months in milliseconds
 * milliseconds({ months: 3 })
 * //=> 7889238000
 */
function milliseconds(_ref) {
  var years = _ref.years,
      months = _ref.months,
      weeks = _ref.weeks,
      days = _ref.days,
      hours = _ref.hours,
      minutes = _ref.minutes,
      seconds = _ref.seconds;
  (0, _index2.default)(1, arguments);
  var totalDays = 0;
  if (years) totalDays += years * daysInYear;
  if (months) totalDays += months * (daysInYear / 12);
  if (weeks) totalDays += weeks * 7;
  if (days) totalDays += days;
  var totalSeconds = totalDays * 24 * 60 * 60;
  if (hours) totalSeconds += hours * 60 * 60;
  if (minutes) totalSeconds += minutes * 60;
  if (seconds) totalSeconds += seconds;
  return Math.round(totalSeconds * 1000);
}
},{"../_lib/requiredArgs/index.js":490}],166:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = millisecondsToHours;

var _index = require("../_lib/requiredArgs/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../constants/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name millisecondsToHours
 * @category Conversion Helpers
 * @summary Convert milliseconds to hours.
 *
 * @description
 * Convert a number of milliseconds to a full number of hours.
 *
 * @param {number} milliseconds - number of milliseconds to be converted
 *
 * @returns {number} the number of milliseconds converted in hours
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Convert 7200000 milliseconds to hours:
 * const result = millisecondsToHours(7200000)
 * //=> 2
 *
 * @example
 * // It uses floor rounding:
 * const result = millisecondsToHours(7199999)
 * //=> 1
 */
function millisecondsToHours(milliseconds) {
  (0, _index2.default)(1, arguments);
  var hours = milliseconds / _index3.millisecondsInHour;
  return Math.floor(hours);
}
},{"../_lib/requiredArgs/index.js":490,"../constants/index.js":8}],170:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = millisecondsToMinutes;

var _index = require("../_lib/requiredArgs/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../constants/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name millisecondsToMinutes
 * @category Conversion Helpers
 * @summary Convert milliseconds to minutes.
 *
 * @description
 * Convert a number of milliseconds to a full number of minutes.
 *
 * @param {number} milliseconds - number of milliseconds to be converted.
 *
 * @returns {number} the number of milliseconds converted in minutes
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Convert 60000 milliseconds to minutes:
 * const result = millisecondsToMinutes(60000)
 * //=> 1
 *
 * @example
 * // It uses floor rounding:
 * const result = millisecondsToMinutes(119999)
 * //=> 1
 */
function millisecondsToMinutes(milliseconds) {
  (0, _index2.default)(1, arguments);
  var minutes = milliseconds / _index3.millisecondsInMinute;
  return Math.floor(minutes);
}
},{"../_lib/requiredArgs/index.js":490,"../constants/index.js":8}],167:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = millisecondsToSeconds;

var _index = require("../_lib/requiredArgs/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../constants/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name millisecondsToSeconds
 * @category Conversion Helpers
 * @summary Convert milliseconds to seconds.
 *
 * @description
 * Convert a number of milliseconds to a full number of seconds.
 *
 * @param {number} milliseconds - number of milliseconds to be converted
 *
 * @returns {number} the number of milliseconds converted in seconds
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Convert 1000 miliseconds to seconds:
 * const result = millisecondsToSeconds(1000)
 * //=> 1
 *
 * @example
 * // It uses floor rounding:
 * const result = millisecondsToSeconds(1999)
 * //=> 1
 */
function millisecondsToSeconds(milliseconds) {
  (0, _index2.default)(1, arguments);
  var seconds = milliseconds / _index3.millisecondsInSecond;
  return Math.floor(seconds);
}
},{"../_lib/requiredArgs/index.js":490,"../constants/index.js":8}],171:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = minutesToHours;

var _index = require("../_lib/requiredArgs/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../constants/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name minutesToHours
 * @category Conversion Helpers
 * @summary Convert minutes to hours.
 *
 * @description
 * Convert a number of minutes to a full number of hours.
 *
 * @param {number} minutes - number of minutes to be converted
 *
 * @returns {number} the number of minutes converted in hours
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Convert 140 minutes to hours:
 * const result = minutesToHours(120)
 * //=> 2
 *
 * @example
 * // It uses floor rounding:
 * const result = minutesToHours(179)
 * //=> 2
 */
function minutesToHours(minutes) {
  (0, _index2.default)(1, arguments);
  var hours = minutes / _index3.minutesInHour;
  return Math.floor(hours);
}
},{"../_lib/requiredArgs/index.js":490,"../constants/index.js":8}],173:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = minutesToMilliseconds;

var _index = require("../_lib/requiredArgs/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../constants/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name minutesToMilliseconds
 * @category Conversion Helpers
 * @summary Convert minutes to milliseconds.
 *
 * @description
 * Convert a number of minutes to a full number of milliseconds.
 *
 * @param {number} minutes - number of minutes to be converted
 *
 * @returns {number} the number of minutes converted in milliseconds
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Convert 2 minutes to milliseconds
 * const result = minutesToMilliseconds(2)
 * //=> 120000
 */
function minutesToMilliseconds(minutes) {
  (0, _index2.default)(1, arguments);
  return Math.floor(minutes * _index3.millisecondsInMinute);
}
},{"../_lib/requiredArgs/index.js":490,"../constants/index.js":8}],169:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = minutesToSeconds;

var _index = require("../_lib/requiredArgs/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../constants/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name minutesToSeconds
 * @category Conversion Helpers
 * @summary Convert minutes to seconds.
 *
 * @description
 * Convert a number of minutes to a full number of seconds.
 *
 * @param { number } minutes - number of minutes to be converted
 *
 * @returns {number} the number of minutes converted in seconds
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Convert 2 minutes to seconds
 * const result = minutesToSeconds(2)
 * //=> 120
 */
function minutesToSeconds(minutes) {
  (0, _index2.default)(1, arguments);
  return Math.floor(minutes * _index3.secondsInMinute);
}
},{"../_lib/requiredArgs/index.js":490,"../constants/index.js":8}],172:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = monthsToQuarters;

var _index = require("../_lib/requiredArgs/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../constants/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name monthsToQuarters
 * @category Conversion Helpers
 * @summary Convert number of months to quarters.
 *
 * @description
 * Convert a number of months to a full number of quarters.
 *
 * @param {number} months - number of months to be converted.
 *
 * @returns {number} the number of months converted in quarters
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Convert 6 months to quarters:
 * const result = monthsToQuarters(6)
 * //=> 2
 *
 * @example
 * // It uses floor rounding:
 * const result = monthsToQuarters(7)
 * //=> 2
 */
function monthsToQuarters(months) {
  (0, _index2.default)(1, arguments);
  var quarters = months / _index3.monthsInQuarter;
  return Math.floor(quarters);
}
},{"../_lib/requiredArgs/index.js":490,"../constants/index.js":8}],175:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = monthsToYears;

var _index = require("../_lib/requiredArgs/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../constants/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name monthsToYears
 * @category Conversion Helpers
 * @summary Convert number of months to years.
 *
 * @description
 * Convert a number of months to a full number of years.
 *
 * @param {number} months - number of months to be converted
 *
 * @returns {number} the number of months converted in years
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Convert 36 months to years:
 * const result = monthsToYears(36)
 * //=> 3
 *
 * // It uses floor rounding:
 * const result = monthsToYears(40)
 * //=> 3
 */
function monthsToYears(months) {
  (0, _index2.default)(1, arguments);
  var years = months / _index3.monthsInYear;
  return Math.floor(years);
}
},{"../_lib/requiredArgs/index.js":490,"../constants/index.js":8}],174:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = nextDay;

var _index = require("../addDays/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../getDay/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../_lib/requiredArgs/index.js");

var _index6 = _interopRequireDefault(_index5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name nextDay
 * @category Weekday Helpers
 * @summary When is the next day of the week?
 *
 * @description
 * When is the next day of the week? 0-6 the day of the week, 0 represents Sunday.
 *
 * @param {Date | number} date - the date to check
 * @param {Day} day - day of the week
 * @returns {Date} - the date is the next day of week
 * @throws {TypeError} - 2 arguments required
 *
 * @example
 * // When is the next Monday after Mar, 20, 2020?
 * const result = nextDay(new Date(2020, 2, 20), 1)
 * //=> Mon Mar 23 2020 00:00:00
 *
 * @example
 * // When is the next Tuesday after Mar, 21, 2020?
 * const result = nextDay(new Date(2020, 2, 21), 2)
 * //=> Tue Mar 24 2020 00:00:00
 */
function nextDay(date, day) {
  (0, _index6.default)(2, arguments);
  var delta = day - (0, _index4.default)(date);
  if (delta <= 0) delta += 7;
  return (0, _index2.default)(date, delta);
}
},{"../addDays/index.js":11,"../getDay/index.js":83,"../_lib/requiredArgs/index.js":490}],180:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = nextFriday;

var _index = require("../nextDay/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name nextFriday
 * @category Weekday Helpers
 * @summary When is the next Friday?
 *
 * @description
 * When is the next Friday?
 *
 * @param {Date | number} date - the date to start counting from
 * @returns {Date} the next Friday
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // When is the next Friday after Mar, 22, 2020?
 * const result = nextFriday(new Date(2020, 2, 22))
 * //=> Fri Mar 27 2020 00:00:00
 */
function nextFriday(date) {
  (0, _index4.default)(1, arguments);
  return (0, _index2.default)(date, 5);
}
},{"../nextDay/index.js":174,"../_lib/requiredArgs/index.js":490}],177:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = nextMonday;

var _index = require("../nextDay/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name nextMonday
 * @category Weekday Helpers
 * @summary When is the next Monday?
 *
 * @description
 * When is the next Monday?
 *
 * @param {Date | number} date - the date to start counting from
 * @returns {Date} the next Monday
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // When is the next Monday after Mar, 22, 2020?
 * const result = nextMonday(new Date(2020, 2, 22))
 * //=> Mon Mar 23 2020 00:00:00
 */
function nextMonday(date) {
  (0, _index4.default)(1, arguments);
  return (0, _index2.default)(date, 1);
}
},{"../nextDay/index.js":174,"../_lib/requiredArgs/index.js":490}],176:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = nextSaturday;

var _index = require("../nextDay/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name nextSaturday
 * @category Weekday Helpers
 * @summary When is the next Saturday?
 *
 * @description
 * When is the next Saturday?
 *
 * @param {Date | number} date - the date to start counting from
 * @returns {Date} the next Saturday
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // When is the next Saturday after Mar, 22, 2020?
 * const result = nextSaturday(new Date(2020, 2, 22))
 * //=> Sat Mar 28 2020 00:00:00
 */
function nextSaturday(date) {
  (0, _index4.default)(1, arguments);
  return (0, _index2.default)(date, 6);
}
},{"../nextDay/index.js":174,"../_lib/requiredArgs/index.js":490}],181:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = nextSunday;

var _index = require("../nextDay/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name nextSunday
 * @category Weekday Helpers
 * @summary When is the next Sunday?
 *
 * @description
 * When is the next Sunday?
 *
 * @param {Date | number} date - the date to start counting from
 * @returns {Date} the next Sunday
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // When is the next Sunday after Mar, 22, 2020?
 * const result = nextSunday(new Date(2020, 2, 22))
 * //=> Sun Mar 29 2020 00:00:00
 */
function nextSunday(date) {
  (0, _index4.default)(1, arguments);
  return (0, _index2.default)(date, 0);
}
},{"../nextDay/index.js":174,"../_lib/requiredArgs/index.js":490}],178:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = nextThursday;

var _index = require("../nextDay/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name nextThursday
 * @category Weekday Helpers
 * @summary When is the next Thursday?
 *
 * @description
 * When is the next Thursday?
 *
 * @param {Date | number} date - the date to start counting from
 * @returns {Date} the next Thursday
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // When is the next Thursday after Mar, 22, 2020?
 * const result = nextThursday(new Date(2020, 2, 22))
 * //=> Thur Mar 26 2020 00:00:00
 */
function nextThursday(date) {
  (0, _index4.default)(1, arguments);
  return (0, _index2.default)(date, 4);
}
},{"../nextDay/index.js":174,"../_lib/requiredArgs/index.js":490}],179:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = nextTuesday;

var _index = require("../nextDay/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name nextTuesday
 * @category Weekday Helpers
 * @summary When is the next Tuesday?
 *
 * @description
 * When is the next Tuesday?
 *
 * @param {Date | number} date - the date to start counting from
 * @returns {Date} the next Tuesday
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // When is the next Tuesday after Mar, 22, 2020?
 * const result = nextTuesday(new Date(2020, 2, 22))
 * //=> Tue Mar 24 2020 00:00:00
 */
function nextTuesday(date) {
  (0, _index4.default)(1, arguments);
  return (0, _index2.default)(date, 2);
}
},{"../nextDay/index.js":174,"../_lib/requiredArgs/index.js":490}],182:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = nextWednesday;

var _index = require("../nextDay/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name nextWednesday
 * @category Weekday Helpers
 * @summary When is the next Wednesday?
 *
 * @description
 * When is the next Wednesday?
 *
 * @param {Date | number} date - the date to start counting from
 * @returns {Date} the next Wednesday
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // When is the next Wednesday after Mar, 22, 2020?
 * const result = nextWednesday(new Date(2020, 2, 22))
 * //=> Wed Mar 25 2020 00:00:00
 */
function nextWednesday(date) {
  (0, _index4.default)(1, arguments);
  return (0, _index2.default)(date, 3);
}
},{"../nextDay/index.js":174,"../_lib/requiredArgs/index.js":490}],184:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parseISO;

var _index = require("../constants/index.js");

var _index2 = require("../_lib/requiredArgs/index.js");

var _index3 = _interopRequireDefault(_index2);

var _index4 = require("../_lib/toInteger/index.js");

var _index5 = _interopRequireDefault(_index4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name parseISO
 * @category Common Helpers
 * @summary Parse ISO string
 *
 * @description
 * Parse the given string in ISO 8601 format and return an instance of Date.
 *
 * Function accepts complete ISO 8601 formats as well as partial implementations.
 * ISO 8601: http://en.wikipedia.org/wiki/ISO_8601
 *
 * If the argument isn't a string, the function cannot parse the string or
 * the values are invalid, it returns Invalid Date.
 *
 * @param {String} argument - the value to convert
 * @param {Object} [options] - an object with options.
 * @param {0|1|2} [options.additionalDigits=2] - the additional number of digits in the extended year format
 * @returns {Date} the parsed date in the local time zone
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} `options.additionalDigits` must be 0, 1 or 2
 *
 * @example
 * // Convert string '2014-02-11T11:30:30' to date:
 * const result = parseISO('2014-02-11T11:30:30')
 * //=> Tue Feb 11 2014 11:30:30
 *
 * @example
 * // Convert string '+02014101' to date,
 * // if the additional number of digits in the extended year format is 1:
 * const result = parseISO('+02014101', { additionalDigits: 1 })
 * //=> Fri Apr 11 2014 00:00:00
 */
function parseISO(argument, options) {
  var _options$additionalDi;
  (0, _index3.default)(1, arguments);
  var additionalDigits = (0, _index5.default)((_options$additionalDi = options === null || options === void 0 ? void 0 : options.additionalDigits) !== null && _options$additionalDi !== void 0 ? _options$additionalDi : 2);
  if (additionalDigits !== 2 && additionalDigits !== 1 && additionalDigits !== 0) {
    throw new RangeError('additionalDigits must be 0, 1 or 2');
  }
  if (!(typeof argument === 'string' || Object.prototype.toString.call(argument) === '[object String]')) {
    return new Date(NaN);
  }
  var dateStrings = splitDateString(argument);
  var date;
  if (dateStrings.date) {
    var parseYearResult = parseYear(dateStrings.date, additionalDigits);
    date = parseDate(parseYearResult.restDateString, parseYearResult.year);
  }
  if (!date || isNaN(date.getTime())) {
    return new Date(NaN);
  }
  var timestamp = date.getTime();
  var time = 0;
  var offset;
  if (dateStrings.time) {
    time = parseTime(dateStrings.time);
    if (isNaN(time)) {
      return new Date(NaN);
    }
  }
  if (dateStrings.timezone) {
    offset = parseTimezone(dateStrings.timezone);
    if (isNaN(offset)) {
      return new Date(NaN);
    }
  } else {
    var dirtyDate = new Date(timestamp + time);
    // js parsed string assuming it's in UTC timezone
    // but we need it to be parsed in our timezone
    // so we use utc values to build date in our timezone.
    // Year values from 0 to 99 map to the years 1900 to 1999
    // so set year explicitly with setFullYear.
    var result = new Date(0);
    result.setFullYear(dirtyDate.getUTCFullYear(), dirtyDate.getUTCMonth(), dirtyDate.getUTCDate());
    result.setHours(dirtyDate.getUTCHours(), dirtyDate.getUTCMinutes(), dirtyDate.getUTCSeconds(), dirtyDate.getUTCMilliseconds());
    return result;
  }
  return new Date(timestamp + time + offset);
}
var patterns = {
  dateTimeDelimiter: /[T ]/,
  timeZoneDelimiter: /[Z ]/i,
  timezone: /([Z+-].*)$/
};
var dateRegex = /^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/;
var timeRegex = /^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/;
var timezoneRegex = /^([+-])(\d{2})(?::?(\d{2}))?$/;
function splitDateString(dateString) {
  var dateStrings = {};
  var array = dateString.split(patterns.dateTimeDelimiter);
  var timeString;

  // The regex match should only return at maximum two array elements.
  // [date], [time], or [date, time].
  if (array.length > 2) {
    return dateStrings;
  }
  if (/:/.test(array[0])) {
    timeString = array[0];
  } else {
    dateStrings.date = array[0];
    timeString = array[1];
    if (patterns.timeZoneDelimiter.test(dateStrings.date)) {
      dateStrings.date = dateString.split(patterns.timeZoneDelimiter)[0];
      timeString = dateString.substr(dateStrings.date.length, dateString.length);
    }
  }
  if (timeString) {
    var token = patterns.timezone.exec(timeString);
    if (token) {
      dateStrings.time = timeString.replace(token[1], '');
      dateStrings.timezone = token[1];
    } else {
      dateStrings.time = timeString;
    }
  }
  return dateStrings;
}
function parseYear(dateString, additionalDigits) {
  var regex = new RegExp('^(?:(\\d{4}|[+-]\\d{' + (4 + additionalDigits) + '})|(\\d{2}|[+-]\\d{' + (2 + additionalDigits) + '})$)');
  var captures = dateString.match(regex);
  // Invalid ISO-formatted year
  if (!captures) return {
    year: NaN,
    restDateString: ''
  };
  var year = captures[1] ? parseInt(captures[1]) : null;
  var century = captures[2] ? parseInt(captures[2]) : null;

  // either year or century is null, not both
  return {
    year: century === null ? year : century * 100,
    restDateString: dateString.slice((captures[1] || captures[2]).length)
  };
}
function parseDate(dateString, year) {
  // Invalid ISO-formatted year
  if (year === null) return new Date(NaN);
  var captures = dateString.match(dateRegex);
  // Invalid ISO-formatted string
  if (!captures) return new Date(NaN);
  var isWeekDate = !!captures[4];
  var dayOfYear = parseDateUnit(captures[1]);
  var month = parseDateUnit(captures[2]) - 1;
  var day = parseDateUnit(captures[3]);
  var week = parseDateUnit(captures[4]);
  var dayOfWeek = parseDateUnit(captures[5]) - 1;
  if (isWeekDate) {
    if (!validateWeekDate(year, week, dayOfWeek)) {
      return new Date(NaN);
    }
    return dayOfISOWeekYear(year, week, dayOfWeek);
  } else {
    var date = new Date(0);
    if (!validateDate(year, month, day) || !validateDayOfYearDate(year, dayOfYear)) {
      return new Date(NaN);
    }
    date.setUTCFullYear(year, month, Math.max(dayOfYear, day));
    return date;
  }
}
function parseDateUnit(value) {
  return value ? parseInt(value) : 1;
}
function parseTime(timeString) {
  var captures = timeString.match(timeRegex);
  if (!captures) return NaN; // Invalid ISO-formatted time

  var hours = parseTimeUnit(captures[1]);
  var minutes = parseTimeUnit(captures[2]);
  var seconds = parseTimeUnit(captures[3]);
  if (!validateTime(hours, minutes, seconds)) {
    return NaN;
  }
  return hours * _index.millisecondsInHour + minutes * _index.millisecondsInMinute + seconds * 1000;
}
function parseTimeUnit(value) {
  return value && parseFloat(value.replace(',', '.')) || 0;
}
function parseTimezone(timezoneString) {
  if (timezoneString === 'Z') return 0;
  var captures = timezoneString.match(timezoneRegex);
  if (!captures) return 0;
  var sign = captures[1] === '+' ? -1 : 1;
  var hours = parseInt(captures[2]);
  var minutes = captures[3] && parseInt(captures[3]) || 0;
  if (!validateTimezone(hours, minutes)) {
    return NaN;
  }
  return sign * (hours * _index.millisecondsInHour + minutes * _index.millisecondsInMinute);
}
function dayOfISOWeekYear(isoWeekYear, week, day) {
  var date = new Date(0);
  date.setUTCFullYear(isoWeekYear, 0, 4);
  var fourthOfJanuaryDay = date.getUTCDay() || 7;
  var diff = (week - 1) * 7 + day + 1 - fourthOfJanuaryDay;
  date.setUTCDate(date.getUTCDate() + diff);
  return date;
}

// Validation functions

// February is null to handle the leap year (using ||)
var daysInMonths = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function isLeapYearIndex(year) {
  return year % 400 === 0 || year % 4 === 0 && year % 100 !== 0;
}
function validateDate(year, month, date) {
  return month >= 0 && month <= 11 && date >= 1 && date <= (daysInMonths[month] || (isLeapYearIndex(year) ? 29 : 28));
}
function validateDayOfYearDate(year, dayOfYear) {
  return dayOfYear >= 1 && dayOfYear <= (isLeapYearIndex(year) ? 366 : 365);
}
function validateWeekDate(_year, week, day) {
  return week >= 1 && week <= 53 && day >= 0 && day <= 6;
}
function validateTime(hours, minutes, seconds) {
  if (hours === 24) {
    return minutes === 0 && seconds === 0;
  }
  return seconds >= 0 && seconds < 60 && minutes >= 0 && minutes < 60 && hours >= 0 && hours < 25;
}
function validateTimezone(_hours, minutes) {
  return minutes >= 0 && minutes <= 59;
}
},{"../constants/index.js":8,"../_lib/requiredArgs/index.js":490,"../_lib/toInteger/index.js":491}],183:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parseJSON;

var _index = require("../toDate/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name parseJSON
 * @category Common Helpers
 * @summary Parse a JSON date string
 *
 * @description
 * Converts a complete ISO date string in UTC time, the typical format for transmitting
 * a date in JSON, to a JavaScript `Date` instance.
 *
 * This is a minimal implementation for converting dates retrieved from a JSON API to
 * a `Date` instance which can be used with other functions in the `date-fns` library.
 * The following formats are supported:
 *
 * - `2000-03-15T05:20:10.123Z`: The output of `.toISOString()` and `JSON.stringify(new Date())`
 * - `2000-03-15T05:20:10Z`: Without milliseconds
 * - `2000-03-15T05:20:10+00:00`: With a zero offset, the default JSON encoded format in some other languages
 * - `2000-03-15T05:20:10+05:45`: With a positive or negative offset, the default JSON encoded format in some other languages
 * - `2000-03-15T05:20:10+0000`: With a zero offset without a colon
 * - `2000-03-15T05:20:10`: Without a trailing 'Z' symbol
 * - `2000-03-15T05:20:10.1234567`: Up to 7 digits in milliseconds field. Only first 3 are taken into account since JS does not allow fractional milliseconds
 * - `2000-03-15 05:20:10`: With a space instead of a 'T' separator for APIs returning a SQL date without reformatting
 *
 * For convenience and ease of use these other input types are also supported
 * via [toDate]{@link https://date-fns.org/docs/toDate}:
 *
 * - A `Date` instance will be cloned
 * - A `number` will be treated as a timestamp
 *
 * Any other input type or invalid date strings will return an `Invalid Date`.
 *
 * @param {String|Number|Date} argument A fully formed ISO8601 date string to convert
 * @returns {Date} the parsed date in the local time zone
 * @throws {TypeError} 1 argument required
 */
function parseJSON(argument) {
  (0, _index4.default)(1, arguments);
  if (typeof argument === 'string') {
    var parts = argument.match(/(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2}):(\d{2})(?:\.(\d{0,7}))?(?:Z|(.)(\d{2}):?(\d{2})?)?/);
    if (parts) {
      // Group 8 matches the sign
      return new Date(Date.UTC(+parts[1], +parts[2] - 1, +parts[3], +parts[4] - (+parts[9] || 0) * (parts[8] == '-' ? -1 : 1), +parts[5] - (+parts[10] || 0) * (parts[8] == '-' ? -1 : 1), +parts[6], +((parts[7] || '0') + '00').substring(0, 3)));
    }
    return new Date(NaN);
  }
  return (0, _index2.default)(argument);
}
},{"../toDate/index.js":243,"../_lib/requiredArgs/index.js":490}],191:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = previousDay;

var _index = require("../_lib/requiredArgs/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../getDay/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../subDays/index.js");

var _index6 = _interopRequireDefault(_index5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name previousDay
 * @category Weekday Helpers
 * @summary When is the previous day of the week?
 *
 * @description
 * When is the previous day of the week? 0-6 the day of the week, 0 represents Sunday.
 *
 * @param {Date | number} date - the date to check
 * @param {number} day - day of the week
 * @returns {Date} - the date is the previous day of week
 * @throws {TypeError} - 2 arguments required
 *
 * @example
 * // When is the previous Monday before Mar, 20, 2020?
 * const result = previousDay(new Date(2020, 2, 20), 1)
 * //=> Mon Mar 16 2020 00:00:00
 *
 * @example
 * // When is the previous Tuesday before Mar, 21, 2020?
 * const result = previousDay(new Date(2020, 2, 21), 2)
 * //=> Tue Mar 17 2020 00:00:00
 */
function previousDay(date, day) {
  (0, _index2.default)(2, arguments);
  var delta = (0, _index4.default)(date) - day;
  if (delta <= 0) delta += 7;
  return (0, _index6.default)(date, delta);
}
},{"../_lib/requiredArgs/index.js":490,"../getDay/index.js":83,"../subDays/index.js":246}],188:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = previousFriday;

var _index = require("../_lib/requiredArgs/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../previousDay/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name previousFriday
 * @category Weekday Helpers
 * @summary When is the previous Friday?
 *
 * @description
 * When is the previous Friday?
 *
 * @param {Date | number} date - the date to start counting from
 * @returns {Date} the previous Friday
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // When is the previous Friday before Jun, 19, 2021?
 * const result = previousFriday(new Date(2021, 5, 19))
 * //=> Fri June 18 2021 00:00:00
 */
function previousFriday(date) {
  (0, _index2.default)(1, arguments);
  return (0, _index4.default)(date, 5);
}
},{"../_lib/requiredArgs/index.js":490,"../previousDay/index.js":191}],185:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = previousMonday;

var _index = require("../_lib/requiredArgs/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../previousDay/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name previousMonday
 * @category Weekday Helpers
 * @summary When is the previous Monday?
 *
 * @description
 * When is the previous Monday?
 *
 * @param {Date | number} date - the date to start counting from
 * @returns {Date} the previous Monday
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // When is the previous Monday before Jun, 18, 2021?
 * const result = previousMonday(new Date(2021, 5, 18))
 * //=> Mon June 14 2021 00:00:00
 */
function previousMonday(date) {
  (0, _index2.default)(1, arguments);
  return (0, _index4.default)(date, 1);
}
},{"../_lib/requiredArgs/index.js":490,"../previousDay/index.js":191}],190:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = previousSaturday;

var _index = require("../_lib/requiredArgs/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../previousDay/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name previousSaturday
 * @category Weekday Helpers
 * @summary When is the previous Saturday?
 *
 * @description
 * When is the previous Saturday?
 *
 * @param {Date | number} date - the date to start counting from
 * @returns {Date} the previous Saturday
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // When is the previous Saturday before Jun, 20, 2021?
 * const result = previousSaturday(new Date(2021, 5, 20))
 * //=> Sat June 19 2021 00:00:00
 */
function previousSaturday(date) {
  (0, _index2.default)(1, arguments);
  return (0, _index4.default)(date, 6);
}
},{"../_lib/requiredArgs/index.js":490,"../previousDay/index.js":191}],189:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = previousSunday;

var _index = require("../_lib/requiredArgs/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../previousDay/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name previousSunday
 * @category Weekday Helpers
 * @summary When is the previous Sunday?
 *
 * @description
 * When is the previous Sunday?
 *
 * @param {Date | number} date - the date to start counting from
 * @returns {Date} the previous Sunday
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // When is the previous Sunday before Jun, 21, 2021?
 * const result = previousSunday(new Date(2021, 5, 21))
 * //=> Sun June 20 2021 00:00:00
 */
function previousSunday(date) {
  (0, _index2.default)(1, arguments);
  return (0, _index4.default)(date, 0);
}
},{"../_lib/requiredArgs/index.js":490,"../previousDay/index.js":191}],187:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = previousThursday;

var _index = require("../_lib/requiredArgs/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../previousDay/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name previousThursday
 * @category Weekday Helpers
 * @summary When is the previous Thursday?
 *
 * @description
 * When is the previous Thursday?
 *
 * @param {Date | number} date - the date to start counting from
 * @returns {Date} the previous Thursday
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // When is the previous Thursday before Jun, 18, 2021?
 * const result = previousThursday(new Date(2021, 5, 18))
 * //=> Thu June 17 2021 00:00:00
 */
function previousThursday(date) {
  (0, _index2.default)(1, arguments);
  return (0, _index4.default)(date, 4);
}
},{"../_lib/requiredArgs/index.js":490,"../previousDay/index.js":191}],192:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = previousTuesday;

var _index = require("../_lib/requiredArgs/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../previousDay/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name previousTuesday
 * @category Weekday Helpers
 * @summary When is the previous Tuesday?
 *
 * @description
 * When is the previous Tuesday?
 *
 * @param {Date | number} date - the date to start counting from
 * @returns {Date} the previous Tuesday
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // When is the previous Tuesday before Jun, 18, 2021?
 * const result = previousTuesday(new Date(2021, 5, 18))
 * //=> Tue June 15 2021 00:00:00
 */
function previousTuesday(date) {
  (0, _index2.default)(1, arguments);
  return (0, _index4.default)(date, 2);
}
},{"../_lib/requiredArgs/index.js":490,"../previousDay/index.js":191}],193:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = previousWednesday;

var _index = require("../_lib/requiredArgs/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../previousDay/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name previousWednesday
 * @category Weekday Helpers
 * @summary When is the previous Wednesday?
 *
 * @description
 * When is the previous Wednesday?
 *
 * @param {Date | number} date - the date to start counting from
 * @returns {Date} the previous Wednesday
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // When is the previous Wednesday before Jun, 18, 2021?
 * const result = previousWednesday(new Date(2021, 5, 18))
 * //=> Wed June 16 2021 00:00:00
 */
function previousWednesday(date) {
  (0, _index2.default)(1, arguments);
  return (0, _index4.default)(date, 3);
}
},{"../_lib/requiredArgs/index.js":490,"../previousDay/index.js":191}],194:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = quartersToMonths;

var _index = require("../_lib/requiredArgs/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../constants/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name quartersToMonths
 * @category Conversion Helpers
 * @summary Convert number of quarters to months.
 *
 * @description
 * Convert a number of quarters to a full number of months.
 *
 * @param {number} quarters - number of quarters to be converted
 *
 * @returns {number} the number of quarters converted in months
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Convert 2 quarters to months
 * const result = quartersToMonths(2)
 * //=> 6
 */
function quartersToMonths(quarters) {
  (0, _index2.default)(1, arguments);
  return Math.floor(quarters * _index3.monthsInQuarter);
}
},{"../_lib/requiredArgs/index.js":490,"../constants/index.js":8}],195:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = quartersToYears;

var _index = require("../_lib/requiredArgs/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../constants/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name quartersToYears
 * @category Conversion Helpers
 * @summary Convert number of quarters to years.
 *
 * @description
 * Convert a number of quarters to a full number of years.
 *
 * @param {number} quarters - number of quarters to be converted
 *
 * @returns {number} the number of quarters converted in years
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Convert 8 quarters to years
 * const result = quartersToYears(8)
 * //=> 2
 *
 * @example
 * // It uses floor rounding:
 * const result = quartersToYears(11)
 * //=> 2
 */
function quartersToYears(quarters) {
  (0, _index2.default)(1, arguments);
  var years = quarters / _index3.quartersInYear;
  return Math.floor(years);
}
},{"../_lib/requiredArgs/index.js":490,"../constants/index.js":8}],198:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = roundToNearestMinutes;

var _index = require("../toDate/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/roundingMethods/index.js");

var _index4 = require("../_lib/toInteger/index.js");

var _index5 = _interopRequireDefault(_index4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name roundToNearestMinutes
 * @category Minute Helpers
 * @summary Rounds the given date to the nearest minute
 *
 * @description
 * Rounds the given date to the nearest minute (or number of minutes).
 * Rounds up when the given date is exactly between the nearest round minutes.
 *
 * @param {Date|Number} date - the date to round
 * @param {Object} [options] - an object with options.
 * @param {Number} [options.nearestTo=1] - nearest number of minutes to round to. E.g. `15` to round to quarter hours.
 * @param {String} [options.roundingMethod='trunc'] - a rounding method (`ceil`, `floor`, `round` or `trunc`)
 * @returns {Date} the new date rounded to the closest minute
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} `options.nearestTo` must be between 1 and 30
 *
 * @example
 * // Round 10 July 2014 12:12:34 to nearest minute:
 * const result = roundToNearestMinutes(new Date(2014, 6, 10, 12, 12, 34))
 * //=> Thu Jul 10 2014 12:13:00
 *
 * @example
 * // Round 10 July 2014 12:07:30 to nearest quarter hour:
 * const result = roundToNearestMinutes(new Date(2014, 6, 10, 12, 12, 34), { nearestTo: 15 })
 * // rounds up because given date is exactly between 12:00:00 and 12:15:00
 * //=> Thu Jul 10 2014 12:15:00
 */
function roundToNearestMinutes(dirtyDate, options) {
  var _options$nearestTo;
  if (arguments.length < 1) {
    throw new TypeError('1 argument required, but only none provided present');
  }
  var nearestTo = (0, _index5.default)((_options$nearestTo = options === null || options === void 0 ? void 0 : options.nearestTo) !== null && _options$nearestTo !== void 0 ? _options$nearestTo : 1);
  if (nearestTo < 1 || nearestTo > 30) {
    throw new RangeError('`options.nearestTo` must be between 1 and 30');
  }
  var date = (0, _index2.default)(dirtyDate);
  var seconds = date.getSeconds(); // relevant if nearestTo is 1, which is the default case
  var minutes = date.getMinutes() + seconds / 60;
  var roundingMethod = (0, _index3.getRoundingMethod)(options === null || options === void 0 ? void 0 : options.roundingMethod);
  var roundedMinutes = roundingMethod(minutes / nearestTo) * nearestTo;
  var remainderMinutes = minutes % nearestTo;
  var addedMinutes = Math.round(remainderMinutes / nearestTo) * nearestTo;
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), roundedMinutes + addedMinutes);
}
},{"../toDate/index.js":243,"../_lib/roundingMethods/index.js":493,"../_lib/toInteger/index.js":491}],196:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = secondsToHours;

var _index = require("../_lib/requiredArgs/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../constants/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name secondsToHours
 * @category Conversion Helpers
 * @summary Convert seconds to hours.
 *
 * @description
 * Convert a number of seconds to a full number of hours.
 *
 * @param {number} seconds - number of seconds to be converted
 *
 * @returns {number} the number of seconds converted in hours
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Convert 7200 seconds into hours
 * const result = secondsToHours(7200)
 * //=> 2
 *
 * @example
 * // It uses floor rounding:
 * const result = secondsToHours(7199)
 * //=> 1
 */
function secondsToHours(seconds) {
  (0, _index2.default)(1, arguments);
  var hours = seconds / _index3.secondsInHour;
  return Math.floor(hours);
}
},{"../_lib/requiredArgs/index.js":490,"../constants/index.js":8}],197:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = secondsToMilliseconds;

var _index = require("../_lib/requiredArgs/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../constants/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name secondsToMilliseconds
 * @category Conversion Helpers
 * @summary Convert seconds to milliseconds.
 *
 * @description
 * Convert a number of seconds to a full number of milliseconds.
 *
 * @param {number} seconds - number of seconds to be converted
 *
 * @returns {number} the number of seconds converted in milliseconds
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Convert 2 seconds into milliseconds
 * const result = secondsToMilliseconds(2)
 * //=> 2000
 */
function secondsToMilliseconds(seconds) {
  (0, _index2.default)(1, arguments);
  return seconds * _index3.millisecondsInSecond;
}
},{"../_lib/requiredArgs/index.js":490,"../constants/index.js":8}],199:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = secondsToMinutes;

var _index = require("../_lib/requiredArgs/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../constants/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name secondsToMinutes
 * @category Conversion Helpers
 * @summary Convert seconds to minutes.
 *
 * @description
 * Convert a number of seconds to a full number of minutes.
 *
 * @param {number} seconds - number of seconds to be converted
 *
 * @returns {number} the number of seconds converted in minutes
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Convert 120 seconds into minutes
 * const result = secondsToMinutes(120)
 * //=> 2
 *
 * @example
 * // It uses floor rounding:
 * const result = secondsToMinutes(119)
 * //=> 1
 */
function secondsToMinutes(seconds) {
  (0, _index2.default)(1, arguments);
  var minutes = seconds / _index3.secondsInMinute;
  return Math.floor(minutes);
}
},{"../_lib/requiredArgs/index.js":490,"../constants/index.js":8}],210:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setMonth;

var _index = require("../_lib/toInteger/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../toDate/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../getDaysInMonth/index.js");

var _index6 = _interopRequireDefault(_index5);

var _index7 = require("../_lib/requiredArgs/index.js");

var _index8 = _interopRequireDefault(_index7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name setMonth
 * @category Month Helpers
 * @summary Set the month to the given date.
 *
 * @description
 * Set the month to the given date.
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} month - the month of the new date
 * @returns {Date} the new date with the month set
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Set February to 1 September 2014:
 * const result = setMonth(new Date(2014, 8, 1), 1)
 * //=> Sat Feb 01 2014 00:00:00
 */
function setMonth(dirtyDate, dirtyMonth) {
  (0, _index8.default)(2, arguments);
  var date = (0, _index4.default)(dirtyDate);
  var month = (0, _index2.default)(dirtyMonth);
  var year = date.getFullYear();
  var day = date.getDate();
  var dateWithDesiredMonth = new Date(0);
  dateWithDesiredMonth.setFullYear(year, month, 15);
  dateWithDesiredMonth.setHours(0, 0, 0, 0);
  var daysInMonth = (0, _index6.default)(dateWithDesiredMonth);
  // Set the last day of the new month
  // if the original date was the last day of the longer month
  date.setMonth(month, Math.min(day, daysInMonth));
  return date;
}
},{"../_lib/toInteger/index.js":491,"../toDate/index.js":243,"../getDaysInMonth/index.js":85,"../_lib/requiredArgs/index.js":490}],205:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = set;

var _typeof2 = require("@babel/runtime/helpers/esm/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _index = require("../toDate/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../setMonth/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../_lib/toInteger/index.js");

var _index6 = _interopRequireDefault(_index5);

var _index7 = require("../_lib/requiredArgs/index.js");

var _index8 = _interopRequireDefault(_index7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name set
 * @category Common Helpers
 * @summary Set date values to a given date.
 *
 * @description
 * Set date values to a given date.
 *
 * Sets time values to date from object `values`.
 * A value is not set if it is undefined or null or doesn't exist in `values`.
 *
 * Note about bundle size: `set` does not internally use `setX` functions from date-fns but instead opts
 * to use native `Date#setX` methods. If you use this function, you may not want to include the
 * other `setX` functions that date-fns provides if you are concerned about the bundle size.
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Object} values - an object with options
 * @param {Number} [values.year] - the number of years to be set
 * @param {Number} [values.month] - the number of months to be set
 * @param {Number} [values.date] - the number of days to be set
 * @param {Number} [values.hours] - the number of hours to be set
 * @param {Number} [values.minutes] - the number of minutes to be set
 * @param {Number} [values.seconds] - the number of seconds to be set
 * @param {Number} [values.milliseconds] - the number of milliseconds to be set
 * @returns {Date} the new date with options set
 * @throws {TypeError} 2 arguments required
 * @throws {RangeError} `values` must be an object
 *
 * @example
 * // Transform 1 September 2014 into 20 October 2015 in a single line:
 * const result = set(new Date(2014, 8, 20), { year: 2015, month: 9, date: 20 })
 * //=> Tue Oct 20 2015 00:00:00
 *
 * @example
 * // Set 12 PM to 1 September 2014 01:23:45 to 1 September 2014 12:00:00:
 * const result = set(new Date(2014, 8, 1, 1, 23, 45), { hours: 12 })
 * //=> Mon Sep 01 2014 12:23:45
 */
function set(dirtyDate, values) {
  (0, _index8.default)(2, arguments);
  if ((0, _typeof3.default)(values) !== 'object' || values === null) {
    throw new RangeError('values parameter must be an object');
  }
  var date = (0, _index2.default)(dirtyDate);

  // Check if date is Invalid Date because Date.prototype.setFullYear ignores the value of Invalid Date
  if (isNaN(date.getTime())) {
    return new Date(NaN);
  }
  if (values.year != null) {
    date.setFullYear(values.year);
  }
  if (values.month != null) {
    date = (0, _index4.default)(date, values.month);
  }
  if (values.date != null) {
    date.setDate((0, _index6.default)(values.date));
  }
  if (values.hours != null) {
    date.setHours((0, _index6.default)(values.hours));
  }
  if (values.minutes != null) {
    date.setMinutes((0, _index6.default)(values.minutes));
  }
  if (values.seconds != null) {
    date.setSeconds((0, _index6.default)(values.seconds));
  }
  if (values.milliseconds != null) {
    date.setMilliseconds((0, _index6.default)(values.milliseconds));
  }
  return date;
}
},{"@babel/runtime/helpers/esm/typeof":503,"../toDate/index.js":243,"../setMonth/index.js":210,"../_lib/toInteger/index.js":491,"../_lib/requiredArgs/index.js":490}],201:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setDate;

var _index = require("../_lib/toInteger/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../toDate/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../_lib/requiredArgs/index.js");

var _index6 = _interopRequireDefault(_index5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name setDate
 * @category Day Helpers
 * @summary Set the day of the month to the given date.
 *
 * @description
 * Set the day of the month to the given date.
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} dayOfMonth - the day of the month of the new date
 * @returns {Date} the new date with the day of the month set
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Set the 30th day of the month to 1 September 2014:
 * const result = setDate(new Date(2014, 8, 1), 30)
 * //=> Tue Sep 30 2014 00:00:00
 */
function setDate(dirtyDate, dirtyDayOfMonth) {
  (0, _index6.default)(2, arguments);
  var date = (0, _index4.default)(dirtyDate);
  var dayOfMonth = (0, _index2.default)(dirtyDayOfMonth);
  date.setDate(dayOfMonth);
  return date;
}
},{"../_lib/toInteger/index.js":491,"../toDate/index.js":243,"../_lib/requiredArgs/index.js":490}],200:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setDay;

var _index = require("../addDays/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../toDate/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../_lib/toInteger/index.js");

var _index6 = _interopRequireDefault(_index5);

var _index7 = require("../_lib/requiredArgs/index.js");

var _index8 = _interopRequireDefault(_index7);

var _index9 = require("../_lib/defaultOptions/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name setDay
 * @category Weekday Helpers
 * @summary Set the day of the week to the given date.
 *
 * @description
 * Set the day of the week to the given date.
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} day - the day of the week of the new date
 * @param {Object} [options] - an object with options.
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @returns {Date} the new date with the day of the week set
 * @throws {TypeError} 2 arguments required
 * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
 *
 * @example
 * // Set week day to Sunday, with the default weekStartsOn of Sunday:
 * const result = setDay(new Date(2014, 8, 1), 0)
 * //=> Sun Aug 31 2014 00:00:00
 *
 * @example
 * // Set week day to Sunday, with a weekStartsOn of Monday:
 * const result = setDay(new Date(2014, 8, 1), 0, { weekStartsOn: 1 })
 * //=> Sun Sep 07 2014 00:00:00
 */
function setDay(dirtyDate, dirtyDay, options) {
  var _ref, _ref2, _ref3, _options$weekStartsOn, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
  (0, _index8.default)(2, arguments);
  var defaultOptions = (0, _index9.getDefaultOptions)();
  var weekStartsOn = (0, _index6.default)((_ref = (_ref2 = (_ref3 = (_options$weekStartsOn = options === null || options === void 0 ? void 0 : options.weekStartsOn) !== null && _options$weekStartsOn !== void 0 ? _options$weekStartsOn : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.weekStartsOn) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions.weekStartsOn) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.weekStartsOn) !== null && _ref !== void 0 ? _ref : 0);

  // Test if weekStartsOn is between 0 and 6 _and_ is not NaN
  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError('weekStartsOn must be between 0 and 6 inclusively');
  }
  var date = (0, _index4.default)(dirtyDate);
  var day = (0, _index6.default)(dirtyDay);
  var currentDay = date.getDay();
  var remainder = day % 7;
  var dayIndex = (remainder + 7) % 7;
  var delta = 7 - weekStartsOn;
  var diff = day < 0 || day > 6 ? day - (currentDay + delta) % 7 : (dayIndex + delta) % 7 - (currentDay + delta) % 7;
  return (0, _index2.default)(date, diff);
}
},{"../addDays/index.js":11,"../toDate/index.js":243,"../_lib/toInteger/index.js":491,"../_lib/requiredArgs/index.js":490,"../_lib/defaultOptions/index.js":494}],202:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setDayOfYear;

var _index = require("../_lib/toInteger/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../toDate/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../_lib/requiredArgs/index.js");

var _index6 = _interopRequireDefault(_index5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name setDayOfYear
 * @category Day Helpers
 * @summary Set the day of the year to the given date.
 *
 * @description
 * Set the day of the year to the given date.
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} dayOfYear - the day of the year of the new date
 * @returns {Date} the new date with the day of the year set
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Set the 2nd day of the year to 2 July 2014:
 * const result = setDayOfYear(new Date(2014, 6, 2), 2)
 * //=> Thu Jan 02 2014 00:00:00
 */
function setDayOfYear(dirtyDate, dirtyDayOfYear) {
  (0, _index6.default)(2, arguments);
  var date = (0, _index4.default)(dirtyDate);
  var dayOfYear = (0, _index2.default)(dirtyDayOfYear);
  date.setMonth(0);
  date.setDate(dayOfYear);
  return date;
}
},{"../_lib/toInteger/index.js":491,"../toDate/index.js":243,"../_lib/requiredArgs/index.js":490}],206:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setDefaultOptions;

var _index = require("../_lib/defaultOptions/index.js");

var _index2 = require("../_lib/requiredArgs/index.js");

var _index3 = _interopRequireDefault(_index2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name setDefaultOptions
 * @category Common Helpers
 * @summary Set default options including locale.
 * @pure false
 *
 * @description
 * Sets the defaults for
 * `options.locale`, `options.weekStartsOn` and `options.firstWeekContainsDate`
 * arguments for all functions.
 *
 * @param {Object} newOptions - an object with options.
 * @param {Locale} [newOptions.locale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @param {0|1|2|3|4|5|6} [newOptions.weekStartsOn] - the index of the first day of the week (0 - Sunday)
 * @param {1|2|3|4|5|6|7} [newOptions.firstWeekContainsDate] - the day of January, which is always in the first week of the year
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Set global locale:
 * import { es } from 'date-fns/locale'
 * setDefaultOptions({ locale: es })
 * const result = format(new Date(2014, 8, 2), 'PPPP')
 * //=> 'martes, 2 de septiembre de 2014'
 *
 * @example
 * // Start of the week for 2 September 2014:
 * const result = startOfWeek(new Date(2014, 8, 2))
 * //=> Sun Aug 31 2014 00:00:00
 *
 * @example
 * // Start of the week for 2 September 2014,
 * // when we set that week starts on Monday by default:
 * setDefaultOptions({ weekStartsOn: 1 })
 * const result = startOfWeek(new Date(2014, 8, 2))
 * //=> Mon Sep 01 2014 00:00:00
 *
 * @example
 * // Manually set options take priority over default options:
 * setDefaultOptions({ weekStartsOn: 1 })
 * const result = startOfWeek(new Date(2014, 8, 2), { weekStartsOn: 0 })
 * //=> Sun Aug 31 2014 00:00:00
 *
 * @example
 * // Remove the option by setting it to `undefined`:
 * setDefaultOptions({ weekStartsOn: 1 })
 * setDefaultOptions({ weekStartsOn: undefined })
 * const result = startOfWeek(new Date(2014, 8, 2))
 * //=> Sun Aug 31 2014 00:00:00
 */
function setDefaultOptions(newOptions) {
  (0, _index3.default)(1, arguments);
  var result = {};
  var defaultOptions = (0, _index.getDefaultOptions)();
  for (var property in defaultOptions) {
    if (Object.prototype.hasOwnProperty.call(defaultOptions, property)) {
      ;
      result[property] = defaultOptions[property];
    }
  }
  for (var _property in newOptions) {
    if (Object.prototype.hasOwnProperty.call(newOptions, _property)) {
      if (newOptions[_property] === undefined) {
        delete result[_property];
      } else {
        ;
        result[_property] = newOptions[_property];
      }
    }
  }
  (0, _index.setDefaultOptions)(result);
}
},{"../_lib/defaultOptions/index.js":494,"../_lib/requiredArgs/index.js":490}],203:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setHours;

var _index = require("../_lib/toInteger/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../toDate/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../_lib/requiredArgs/index.js");

var _index6 = _interopRequireDefault(_index5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name setHours
 * @category Hour Helpers
 * @summary Set the hours to the given date.
 *
 * @description
 * Set the hours to the given date.
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} hours - the hours of the new date
 * @returns {Date} the new date with the hours set
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Set 4 hours to 1 September 2014 11:30:00:
 * const result = setHours(new Date(2014, 8, 1, 11, 30), 4)
 * //=> Mon Sep 01 2014 04:30:00
 */
function setHours(dirtyDate, dirtyHours) {
  (0, _index6.default)(2, arguments);
  var date = (0, _index4.default)(dirtyDate);
  var hours = (0, _index2.default)(dirtyHours);
  date.setHours(hours);
  return date;
}
},{"../_lib/toInteger/index.js":491,"../toDate/index.js":243,"../_lib/requiredArgs/index.js":490}],204:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setISODay;

var _index = require("../_lib/toInteger/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../toDate/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../addDays/index.js");

var _index6 = _interopRequireDefault(_index5);

var _index7 = require("../getISODay/index.js");

var _index8 = _interopRequireDefault(_index7);

var _index9 = require("../_lib/requiredArgs/index.js");

var _index10 = _interopRequireDefault(_index9);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name setISODay
 * @category Weekday Helpers
 * @summary Set the day of the ISO week to the given date.
 *
 * @description
 * Set the day of the ISO week to the given date.
 * ISO week starts with Monday.
 * 7 is the index of Sunday, 1 is the index of Monday etc.
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} day - the day of the ISO week of the new date
 * @returns {Date} the new date with the day of the ISO week set
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Set Sunday to 1 September 2014:
 * const result = setISODay(new Date(2014, 8, 1), 7)
 * //=> Sun Sep 07 2014 00:00:00
 */
function setISODay(dirtyDate, dirtyDay) {
  (0, _index10.default)(2, arguments);
  var date = (0, _index4.default)(dirtyDate);
  var day = (0, _index2.default)(dirtyDay);
  var currentDay = (0, _index8.default)(date);
  var diff = day - currentDay;
  return (0, _index6.default)(date, diff);
}
},{"../_lib/toInteger/index.js":491,"../toDate/index.js":243,"../addDays/index.js":11,"../getISODay/index.js":93,"../_lib/requiredArgs/index.js":490}],207:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setISOWeek;

var _index = require("../_lib/toInteger/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../toDate/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../getISOWeek/index.js");

var _index6 = _interopRequireDefault(_index5);

var _index7 = require("../_lib/requiredArgs/index.js");

var _index8 = _interopRequireDefault(_index7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name setISOWeek
 * @category ISO Week Helpers
 * @summary Set the ISO week to the given date.
 *
 * @description
 * Set the ISO week to the given date, saving the weekday number.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} isoWeek - the ISO week of the new date
 * @returns {Date} the new date with the ISO week set
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Set the 53rd ISO week to 7 August 2004:
 * const result = setISOWeek(new Date(2004, 7, 7), 53)
 * //=> Sat Jan 01 2005 00:00:00
 */
function setISOWeek(dirtyDate, dirtyISOWeek) {
  (0, _index8.default)(2, arguments);
  var date = (0, _index4.default)(dirtyDate);
  var isoWeek = (0, _index2.default)(dirtyISOWeek);
  var diff = (0, _index6.default)(date) - isoWeek;
  date.setDate(date.getDate() - diff * 7);
  return date;
}
},{"../_lib/toInteger/index.js":491,"../toDate/index.js":243,"../getISOWeek/index.js":91,"../_lib/requiredArgs/index.js":490}],208:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setMilliseconds;

var _index = require("../_lib/toInteger/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../toDate/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../_lib/requiredArgs/index.js");

var _index6 = _interopRequireDefault(_index5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name setMilliseconds
 * @category Millisecond Helpers
 * @summary Set the milliseconds to the given date.
 *
 * @description
 * Set the milliseconds to the given date.
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} milliseconds - the milliseconds of the new date
 * @returns {Date} the new date with the milliseconds set
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Set 300 milliseconds to 1 September 2014 11:30:40.500:
 * const result = setMilliseconds(new Date(2014, 8, 1, 11, 30, 40, 500), 300)
 * //=> Mon Sep 01 2014 11:30:40.300
 */
function setMilliseconds(dirtyDate, dirtyMilliseconds) {
  (0, _index6.default)(2, arguments);
  var date = (0, _index4.default)(dirtyDate);
  var milliseconds = (0, _index2.default)(dirtyMilliseconds);
  date.setMilliseconds(milliseconds);
  return date;
}
},{"../_lib/toInteger/index.js":491,"../toDate/index.js":243,"../_lib/requiredArgs/index.js":490}],209:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setMinutes;

var _index = require("../_lib/toInteger/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../toDate/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../_lib/requiredArgs/index.js");

var _index6 = _interopRequireDefault(_index5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name setMinutes
 * @category Minute Helpers
 * @summary Set the minutes to the given date.
 *
 * @description
 * Set the minutes to the given date.
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} minutes - the minutes of the new date
 * @returns {Date} the new date with the minutes set
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Set 45 minutes to 1 September 2014 11:30:40:
 * const result = setMinutes(new Date(2014, 8, 1, 11, 30, 40), 45)
 * //=> Mon Sep 01 2014 11:45:40
 */
function setMinutes(dirtyDate, dirtyMinutes) {
  (0, _index6.default)(2, arguments);
  var date = (0, _index4.default)(dirtyDate);
  var minutes = (0, _index2.default)(dirtyMinutes);
  date.setMinutes(minutes);
  return date;
}
},{"../_lib/toInteger/index.js":491,"../toDate/index.js":243,"../_lib/requiredArgs/index.js":490}],219:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setQuarter;

var _index = require("../_lib/toInteger/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../toDate/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../setMonth/index.js");

var _index6 = _interopRequireDefault(_index5);

var _index7 = require("../_lib/requiredArgs/index.js");

var _index8 = _interopRequireDefault(_index7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name setQuarter
 * @category Quarter Helpers
 * @summary Set the year quarter to the given date.
 *
 * @description
 * Set the year quarter to the given date.
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} quarter - the quarter of the new date
 * @returns {Date} the new date with the quarter set
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Set the 2nd quarter to 2 July 2014:
 * const result = setQuarter(new Date(2014, 6, 2), 2)
 * //=> Wed Apr 02 2014 00:00:00
 */
function setQuarter(dirtyDate, dirtyQuarter) {
  (0, _index8.default)(2, arguments);
  var date = (0, _index4.default)(dirtyDate);
  var quarter = (0, _index2.default)(dirtyQuarter);
  var oldQuarter = Math.floor(date.getMonth() / 3) + 1;
  var diff = quarter - oldQuarter;
  return (0, _index6.default)(date, date.getMonth() + diff * 3);
}
},{"../_lib/toInteger/index.js":491,"../toDate/index.js":243,"../setMonth/index.js":210,"../_lib/requiredArgs/index.js":490}],211:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setSeconds;

var _index = require("../_lib/toInteger/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../toDate/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../_lib/requiredArgs/index.js");

var _index6 = _interopRequireDefault(_index5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name setSeconds
 * @category Second Helpers
 * @summary Set the seconds to the given date.
 *
 * @description
 * Set the seconds to the given date.
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} seconds - the seconds of the new date
 * @returns {Date} the new date with the seconds set
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Set 45 seconds to 1 September 2014 11:30:40:
 * const result = setSeconds(new Date(2014, 8, 1, 11, 30, 40), 45)
 * //=> Mon Sep 01 2014 11:30:45
 */
function setSeconds(dirtyDate, dirtySeconds) {
  (0, _index6.default)(2, arguments);
  var date = (0, _index4.default)(dirtyDate);
  var seconds = (0, _index2.default)(dirtySeconds);
  date.setSeconds(seconds);
  return date;
}
},{"../_lib/toInteger/index.js":491,"../toDate/index.js":243,"../_lib/requiredArgs/index.js":490}],212:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setWeek;

var _index = require("../getWeek/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../toDate/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../_lib/requiredArgs/index.js");

var _index6 = _interopRequireDefault(_index5);

var _index7 = require("../_lib/toInteger/index.js");

var _index8 = _interopRequireDefault(_index7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name setWeek
 * @category Week Helpers
 * @summary Set the local week to the given date.
 *
 * @description
 * Set the local week to the given date, saving the weekday number.
 * The exact calculation depends on the values of
 * `options.weekStartsOn` (which is the index of the first day of the week)
 * and `options.firstWeekContainsDate` (which is the day of January, which is always in
 * the first week of the week-numbering year)
 *
 * Week numbering: https://en.wikipedia.org/wiki/Week#Week_numbering
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} week - the week of the new date
 * @param {Object} [options] - an object with options.
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @param {1|2|3|4|5|6|7} [options.firstWeekContainsDate=1] - the day of January, which is always in the first week of the year
 * @returns {Date} the new date with the local week set
 * @throws {TypeError} 2 arguments required
 * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
 * @throws {RangeError} `options.firstWeekContainsDate` must be between 1 and 7
 *
 * @example
 * // Set the 1st week to 2 January 2005 with default options:
 * const result = setWeek(new Date(2005, 0, 2), 1)
 * //=> Sun Dec 26 2004 00:00:00
 *
 * @example
 * // Set the 1st week to 2 January 2005,
 * // if Monday is the first day of the week,
 * // and the first week of the year always contains 4 January:
 * const result = setWeek(new Date(2005, 0, 2), 1, {
 *   weekStartsOn: 1,
 *   firstWeekContainsDate: 4
 * })
 * //=> Sun Jan 4 2004 00:00:00
 */
function setWeek(dirtyDate, dirtyWeek, options) {
  (0, _index6.default)(2, arguments);
  var date = (0, _index4.default)(dirtyDate);
  var week = (0, _index8.default)(dirtyWeek);
  var diff = (0, _index2.default)(date, options) - week;
  date.setDate(date.getDate() - diff * 7);
  return date;
}
},{"../getWeek/index.js":101,"../toDate/index.js":243,"../_lib/requiredArgs/index.js":490,"../_lib/toInteger/index.js":491}],220:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setWeekYear;

var _index = require("../differenceInCalendarDays/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../startOfWeekYear/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../toDate/index.js");

var _index6 = _interopRequireDefault(_index5);

var _index7 = require("../_lib/toInteger/index.js");

var _index8 = _interopRequireDefault(_index7);

var _index9 = require("../_lib/requiredArgs/index.js");

var _index10 = _interopRequireDefault(_index9);

var _index11 = require("../_lib/defaultOptions/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name setWeekYear
 * @category Week-Numbering Year Helpers
 * @summary Set the local week-numbering year to the given date.
 *
 * @description
 * Set the local week-numbering year to the given date,
 * saving the week number and the weekday number.
 * The exact calculation depends on the values of
 * `options.weekStartsOn` (which is the index of the first day of the week)
 * and `options.firstWeekContainsDate` (which is the day of January, which is always in
 * the first week of the week-numbering year)
 *
 * Week numbering: https://en.wikipedia.org/wiki/Week#Week_numbering
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} weekYear - the local week-numbering year of the new date
 * @param {Object} [options] - an object with options.
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @param {1|2|3|4|5|6|7} [options.firstWeekContainsDate=1] - the day of January, which is always in the first week of the year
 * @returns {Date} the new date with the local week-numbering year set
 * @throws {TypeError} 2 arguments required
 * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
 * @throws {RangeError} `options.firstWeekContainsDate` must be between 1 and 7
 *
 * @example
 * // Set the local week-numbering year 2004 to 2 January 2010 with default options:
 * const result = setWeekYear(new Date(2010, 0, 2), 2004)
 * //=> Sat Jan 03 2004 00:00:00
 *
 * @example
 * // Set the local week-numbering year 2004 to 2 January 2010,
 * // if Monday is the first day of week
 * // and 4 January is always in the first week of the year:
 * const result = setWeekYear(new Date(2010, 0, 2), 2004, {
 *   weekStartsOn: 1,
 *   firstWeekContainsDate: 4
 * })
 * //=> Sat Jan 01 2005 00:00:00
 */
function setWeekYear(dirtyDate, dirtyWeekYear, options) {
  var _ref, _ref2, _ref3, _options$firstWeekCon, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
  (0, _index10.default)(2, arguments);
  var defaultOptions = (0, _index11.getDefaultOptions)();
  var firstWeekContainsDate = (0, _index8.default)((_ref = (_ref2 = (_ref3 = (_options$firstWeekCon = options === null || options === void 0 ? void 0 : options.firstWeekContainsDate) !== null && _options$firstWeekCon !== void 0 ? _options$firstWeekCon : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.firstWeekContainsDate) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions.firstWeekContainsDate) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.firstWeekContainsDate) !== null && _ref !== void 0 ? _ref : 1);
  var date = (0, _index6.default)(dirtyDate);
  var weekYear = (0, _index8.default)(dirtyWeekYear);
  var diff = (0, _index2.default)(date, (0, _index4.default)(date, options));
  var firstWeek = new Date(0);
  firstWeek.setFullYear(weekYear, 0, firstWeekContainsDate);
  firstWeek.setHours(0, 0, 0, 0);
  date = (0, _index4.default)(firstWeek, options);
  date.setDate(date.getDate() + diff);
  return date;
}
},{"../differenceInCalendarDays/index.js":27,"../startOfWeekYear/index.js":227,"../toDate/index.js":243,"../_lib/toInteger/index.js":491,"../_lib/requiredArgs/index.js":490,"../_lib/defaultOptions/index.js":494}],215:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setYear;

var _index = require("../_lib/toInteger/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../toDate/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../_lib/requiredArgs/index.js");

var _index6 = _interopRequireDefault(_index5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name setYear
 * @category Year Helpers
 * @summary Set the year to the given date.
 *
 * @description
 * Set the year to the given date.
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} year - the year of the new date
 * @returns {Date} the new date with the year set
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Set year 2013 to 1 September 2014:
 * const result = setYear(new Date(2014, 8, 1), 2013)
 * //=> Sun Sep 01 2013 00:00:00
 */
function setYear(dirtyDate, dirtyYear) {
  (0, _index6.default)(2, arguments);
  var date = (0, _index4.default)(dirtyDate);
  var year = (0, _index2.default)(dirtyYear);

  // Check if date is Invalid Date because Date.prototype.setFullYear ignores the value of Invalid Date
  if (isNaN(date.getTime())) {
    return new Date(NaN);
  }
  date.setFullYear(year);
  return date;
}
},{"../_lib/toInteger/index.js":491,"../toDate/index.js":243,"../_lib/requiredArgs/index.js":490}],216:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = startOfDecade;

var _index = require("../toDate/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name startOfDecade
 * @category Decade Helpers
 * @summary Return the start of a decade for the given date.
 *
 * @description
 * Return the start of a decade for the given date.
 *
 * @param {Date|Number} date - the original date
 * @returns {Date} the start of a decade
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // The start of a decade for 21 October 2015 00:00:00:
 * const result = startOfDecade(new Date(2015, 9, 21, 00, 00, 00))
 * //=> Jan 01 2010 00:00:00
 */
function startOfDecade(dirtyDate) {
  (0, _index4.default)(1, arguments);
  var date = (0, _index2.default)(dirtyDate);
  var year = date.getFullYear();
  var decade = Math.floor(year / 10) * 10;
  date.setFullYear(decade, 0, 1);
  date.setHours(0, 0, 0, 0);
  return date;
}
},{"../toDate/index.js":243,"../_lib/requiredArgs/index.js":490}],225:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = startOfToday;

var _index = require("../startOfDay/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name startOfToday
 * @category Day Helpers
 * @summary Return the start of today.
 * @pure false
 *
 * @description
 * Return the start of today.
 *
 * > ⚠️ Please note that this function is not present in the FP submodule as
 * > it uses `Date.now()` internally hence impure and can't be safely curried.
 *
 * @returns {Date} the start of today
 *
 * @example
 * // If today is 6 October 2014:
 * const result = startOfToday()
 * //=> Mon Oct 6 2014 00:00:00
 */
function startOfToday() {
  return (0, _index2.default)(Date.now());
}
},{"../startOfDay/index.js":213}],230:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = startOfTomorrow;
/**
 * @name startOfTomorrow
 * @category Day Helpers
 * @summary Return the start of tomorrow.
 * @pure false
 *
 * @description
 * Return the start of tomorrow.
 *
 * > ⚠️ Please note that this function is not present in the FP submodule as
 * > it uses `new Date()` internally hence impure and can't be safely curried.
 *
 * @returns {Date} the start of tomorrow
 *
 * @example
 * // If today is 6 October 2014:
 * const result = startOfTomorrow()
 * //=> Tue Oct 7 2014 00:00:00
 */
function startOfTomorrow() {
  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth();
  var day = now.getDate();
  var date = new Date(0);
  date.setFullYear(year, month, day + 1);
  date.setHours(0, 0, 0, 0);
  return date;
}
},{}],231:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = startOfYesterday;
/**
 * @name startOfYesterday
 * @category Day Helpers
 * @summary Return the start of yesterday.
 * @pure false
 *
 * @description
 * Return the start of yesterday.
 *
 * > ⚠️ Please note that this function is not present in the FP submodule as
 * > it uses `new Date()` internally hence impure and can't be safely curried.
 *
 * @returns {Date} the start of yesterday
 *
 * @example
 * // If today is 6 October 2014:
 * const result = startOfYesterday()
 * //=> Sun Oct 5 2014 00:00:00
 */
function startOfYesterday() {
  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth();
  var day = now.getDate();
  var date = new Date(0);
  date.setFullYear(year, month, day - 1);
  date.setHours(0, 0, 0, 0);
  return date;
}
},{}],239:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = subMonths;

var _index = require("../_lib/toInteger/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../addMonths/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../_lib/requiredArgs/index.js");

var _index6 = _interopRequireDefault(_index5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name subMonths
 * @category Month Helpers
 * @summary Subtract the specified number of months from the given date.
 *
 * @description
 * Subtract the specified number of months from the given date.
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of months to be subtracted. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 * @returns {Date} the new date with the months subtracted
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Subtract 5 months from 1 February 2015:
 * const result = subMonths(new Date(2015, 1, 1), 5)
 * //=> Mon Sep 01 2014 00:00:00
 */
function subMonths(dirtyDate, dirtyAmount) {
  (0, _index6.default)(2, arguments);
  var amount = (0, _index2.default)(dirtyAmount);
  return (0, _index4.default)(dirtyDate, -amount);
}
},{"../_lib/toInteger/index.js":491,"../addMonths/index.js":15,"../_lib/requiredArgs/index.js":490}],233:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = sub;

var _typeof2 = require("@babel/runtime/helpers/esm/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _index = require("../subDays/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../subMonths/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../_lib/requiredArgs/index.js");

var _index6 = _interopRequireDefault(_index5);

var _index7 = require("../_lib/toInteger/index.js");

var _index8 = _interopRequireDefault(_index7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name sub
 * @category Common Helpers
 * @summary Subtract the specified years, months, weeks, days, hours, minutes and seconds from the given date.
 *
 * @description
 * Subtract the specified years, months, weeks, days, hours, minutes and seconds from the given date.
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Duration} duration - the object with years, months, weeks, days, hours, minutes and seconds to be subtracted
 *
 * | Key     | Description                        |
 * |---------|------------------------------------|
 * | years   | Amount of years to be subtracted   |
 * | months  | Amount of months to be subtracted  |
 * | weeks   | Amount of weeks to be subtracted   |
 * | days    | Amount of days to be subtracted    |
 * | hours   | Amount of hours to be subtracted   |
 * | minutes | Amount of minutes to be subtracted |
 * | seconds | Amount of seconds to be subtracted |
 *
 * All values default to 0
 *
 * @returns {Date} the new date with the seconds subtracted
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Subtract the following duration from 15 June 2017 15:29:20
 * const result = sub(new Date(2017, 5, 15, 15, 29, 20), {
 *   years: 2,
 *   months: 9,
 *   weeks: 1,
 *   days: 7,
 *   hours: 5,
 *   minutes: 9,
 *   seconds: 30
 * })
 * //=> Mon Sep 1 2014 10:19:50
 */
function sub(date, duration) {
  (0, _index6.default)(2, arguments);
  if (!duration || (0, _typeof3.default)(duration) !== 'object') return new Date(NaN);
  var years = duration.years ? (0, _index8.default)(duration.years) : 0;
  var months = duration.months ? (0, _index8.default)(duration.months) : 0;
  var weeks = duration.weeks ? (0, _index8.default)(duration.weeks) : 0;
  var days = duration.days ? (0, _index8.default)(duration.days) : 0;
  var hours = duration.hours ? (0, _index8.default)(duration.hours) : 0;
  var minutes = duration.minutes ? (0, _index8.default)(duration.minutes) : 0;
  var seconds = duration.seconds ? (0, _index8.default)(duration.seconds) : 0;

  // Subtract years and months
  var dateWithoutMonths = (0, _index4.default)(date, months + years * 12);

  // Subtract weeks and days
  var dateWithoutDays = (0, _index2.default)(dateWithoutMonths, days + weeks * 7);

  // Subtract hours, minutes and seconds
  var minutestoSub = minutes + hours * 60;
  var secondstoSub = seconds + minutestoSub * 60;
  var mstoSub = secondstoSub * 1000;
  var finalDate = new Date(dateWithoutDays.getTime() - mstoSub);
  return finalDate;
}
},{"@babel/runtime/helpers/esm/typeof":503,"../subDays/index.js":246,"../subMonths/index.js":239,"../_lib/requiredArgs/index.js":490,"../_lib/toInteger/index.js":491}],232:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = subBusinessDays;

var _index = require("../addBusinessDays/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../_lib/toInteger/index.js");

var _index6 = _interopRequireDefault(_index5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name subBusinessDays
 * @category Day Helpers
 * @summary Substract the specified number of business days (mon - fri) to the given date.
 *
 * @description
 * Substract the specified number of business days (mon - fri) to the given date, ignoring weekends.
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of business days to be subtracted. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 * @returns {Date} the new date with the business days subtracted
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Substract 10 business days from 1 September 2014:
 * const result = subBusinessDays(new Date(2014, 8, 1), 10)
 * //=> Mon Aug 18 2014 00:00:00 (skipped weekend days)
 */
function subBusinessDays(dirtyDate, dirtyAmount) {
  (0, _index4.default)(2, arguments);
  var amount = (0, _index6.default)(dirtyAmount);
  return (0, _index2.default)(dirtyDate, -amount);
}
},{"../addBusinessDays/index.js":10,"../_lib/requiredArgs/index.js":490,"../_lib/toInteger/index.js":491}],235:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = subHours;

var _index = require("../addHours/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../_lib/toInteger/index.js");

var _index6 = _interopRequireDefault(_index5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name subHours
 * @category Hour Helpers
 * @summary Subtract the specified number of hours from the given date.
 *
 * @description
 * Subtract the specified number of hours from the given date.
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of hours to be subtracted. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 * @returns {Date} the new date with the hours subtracted
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Subtract 2 hours from 11 July 2014 01:00:00:
 * const result = subHours(new Date(2014, 6, 11, 1, 0), 2)
 * //=> Thu Jul 10 2014 23:00:00
 */
function subHours(dirtyDate, dirtyAmount) {
  (0, _index4.default)(2, arguments);
  var amount = (0, _index6.default)(dirtyAmount);
  return (0, _index2.default)(dirtyDate, -amount);
}
},{"../addHours/index.js":9,"../_lib/requiredArgs/index.js":490,"../_lib/toInteger/index.js":491}],238:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = subMinutes;

var _index = require("../addMinutes/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../_lib/requiredArgs/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../_lib/toInteger/index.js");

var _index6 = _interopRequireDefault(_index5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name subMinutes
 * @category Minute Helpers
 * @summary Subtract the specified number of minutes from the given date.
 *
 * @description
 * Subtract the specified number of minutes from the given date.
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of minutes to be subtracted. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 * @returns {Date} the new date with the minutes subtracted
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Subtract 30 minutes from 10 July 2014 12:00:00:
 * const result = subMinutes(new Date(2014, 6, 10, 12, 0), 30)
 * //=> Thu Jul 10 2014 11:30:00
 */
function subMinutes(dirtyDate, dirtyAmount) {
  (0, _index4.default)(2, arguments);
  var amount = (0, _index6.default)(dirtyAmount);
  return (0, _index2.default)(dirtyDate, -amount);
}
},{"../addMinutes/index.js":14,"../_lib/requiredArgs/index.js":490,"../_lib/toInteger/index.js":491}],237:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = subQuarters;

var _index = require("../_lib/toInteger/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../addQuarters/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../_lib/requiredArgs/index.js");

var _index6 = _interopRequireDefault(_index5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name subQuarters
 * @category Quarter Helpers
 * @summary Subtract the specified number of year quarters from the given date.
 *
 * @description
 * Subtract the specified number of year quarters from the given date.
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of quarters to be subtracted. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 * @returns {Date} the new date with the quarters subtracted
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Subtract 3 quarters from 1 September 2014:
 * const result = subQuarters(new Date(2014, 8, 1), 3)
 * //=> Sun Dec 01 2013 00:00:00
 */
function subQuarters(dirtyDate, dirtyAmount) {
  (0, _index6.default)(2, arguments);
  var amount = (0, _index2.default)(dirtyAmount);
  return (0, _index4.default)(dirtyDate, -amount);
}
},{"../_lib/toInteger/index.js":491,"../addQuarters/index.js":16,"../_lib/requiredArgs/index.js":490}],240:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = subSeconds;

var _index = require("../_lib/toInteger/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../addSeconds/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../_lib/requiredArgs/index.js");

var _index6 = _interopRequireDefault(_index5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name subSeconds
 * @category Second Helpers
 * @summary Subtract the specified number of seconds from the given date.
 *
 * @description
 * Subtract the specified number of seconds from the given date.
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of seconds to be subtracted. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 * @returns {Date} the new date with the seconds subtracted
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Subtract 30 seconds from 10 July 2014 12:45:00:
 * const result = subSeconds(new Date(2014, 6, 10, 12, 45, 0), 30)
 * //=> Thu Jul 10 2014 12:44:30
 */
function subSeconds(dirtyDate, dirtyAmount) {
  (0, _index6.default)(2, arguments);
  var amount = (0, _index2.default)(dirtyAmount);
  return (0, _index4.default)(dirtyDate, -amount);
}
},{"../_lib/toInteger/index.js":491,"../addSeconds/index.js":17,"../_lib/requiredArgs/index.js":490}],241:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = subWeeks;

var _index = require("../_lib/toInteger/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../addWeeks/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../_lib/requiredArgs/index.js");

var _index6 = _interopRequireDefault(_index5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name subWeeks
 * @category Week Helpers
 * @summary Subtract the specified number of weeks from the given date.
 *
 * @description
 * Subtract the specified number of weeks from the given date.
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of weeks to be subtracted. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 * @returns {Date} the new date with the weeks subtracted
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Subtract 4 weeks from 1 September 2014:
 * const result = subWeeks(new Date(2014, 8, 1), 4)
 * //=> Mon Aug 04 2014 00:00:00
 */
function subWeeks(dirtyDate, dirtyAmount) {
  (0, _index6.default)(2, arguments);
  var amount = (0, _index2.default)(dirtyAmount);
  return (0, _index4.default)(dirtyDate, -amount);
}
},{"../_lib/toInteger/index.js":491,"../addWeeks/index.js":18,"../_lib/requiredArgs/index.js":490}],242:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = subYears;

var _index = require("../_lib/toInteger/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../addYears/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../_lib/requiredArgs/index.js");

var _index6 = _interopRequireDefault(_index5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name subYears
 * @category Year Helpers
 * @summary Subtract the specified number of years from the given date.
 *
 * @description
 * Subtract the specified number of years from the given date.
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of years to be subtracted. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 * @returns {Date} the new date with the years subtracted
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Subtract 5 years from 1 September 2014:
 * const result = subYears(new Date(2014, 8, 1), 5)
 * //=> Tue Sep 01 2009 00:00:00
 */
function subYears(dirtyDate, dirtyAmount) {
  (0, _index6.default)(2, arguments);
  var amount = (0, _index2.default)(dirtyAmount);
  return (0, _index4.default)(dirtyDate, -amount);
}
},{"../_lib/toInteger/index.js":491,"../addYears/index.js":19,"../_lib/requiredArgs/index.js":490}],245:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = weeksToDays;

var _index = require("../_lib/requiredArgs/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../constants/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name weeksToDays
 * @category Conversion Helpers
 * @summary Convert weeks to days.
 *
 * @description
 * Convert a number of weeks to a full number of days.
 *
 * @param {number} weeks - number of weeks to be converted
 *
 * @returns {number} the number of weeks converted in days
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Convert 2 weeks into days
 * const result = weeksToDays(2)
 * //=> 14
 */
function weeksToDays(weeks) {
  (0, _index2.default)(1, arguments);
  return Math.floor(weeks * _index3.daysInWeek);
}
},{"../_lib/requiredArgs/index.js":490,"../constants/index.js":8}],244:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = yearsToMonths;

var _index = require("../_lib/requiredArgs/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../constants/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name yearsToMonths
 * @category Conversion Helpers
 * @summary Convert years to months.
 *
 * @description
 * Convert a number of years to a full number of months.
 *
 * @param {number} years - number of years to be converted
 *
 * @returns {number} the number of years converted in months
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Convert 2 years into months
 * const result = yearsToMonths(2)
 * //=> 24
 */
function yearsToMonths(years) {
  (0, _index2.default)(1, arguments);
  return Math.floor(years * _index3.monthsInYear);
}
},{"../_lib/requiredArgs/index.js":490,"../constants/index.js":8}],247:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = yearsToQuarters;

var _index = require("../_lib/requiredArgs/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../constants/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name yearsToQuarters
 * @category Conversion Helpers
 * @summary Convert years to quarters.
 *
 * @description
 * Convert a number of years to a full number of quarters.
 *
 * @param {number} years - number of years to be converted
 *
 * @returns {number} the number of years converted in quarters
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Convert 2 years to quarters
 * const result = yearsToQuarters(2)
 * //=> 8
 */
function yearsToQuarters(years) {
  (0, _index2.default)(1, arguments);
  return Math.floor(years * _index3.quartersInYear);
}
},{"../_lib/requiredArgs/index.js":490,"../constants/index.js":8}],6:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require("./add/index.js");

Object.defineProperty(exports, "add", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index).default;
  }
});

var _index2 = require("./addBusinessDays/index.js");

Object.defineProperty(exports, "addBusinessDays", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index2).default;
  }
});

var _index3 = require("./addDays/index.js");

Object.defineProperty(exports, "addDays", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index3).default;
  }
});

var _index4 = require("./addHours/index.js");

Object.defineProperty(exports, "addHours", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index4).default;
  }
});

var _index5 = require("./addISOWeekYears/index.js");

Object.defineProperty(exports, "addISOWeekYears", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index5).default;
  }
});

var _index6 = require("./addMilliseconds/index.js");

Object.defineProperty(exports, "addMilliseconds", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index6).default;
  }
});

var _index7 = require("./addMinutes/index.js");

Object.defineProperty(exports, "addMinutes", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index7).default;
  }
});

var _index8 = require("./addMonths/index.js");

Object.defineProperty(exports, "addMonths", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index8).default;
  }
});

var _index9 = require("./addQuarters/index.js");

Object.defineProperty(exports, "addQuarters", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index9).default;
  }
});

var _index10 = require("./addSeconds/index.js");

Object.defineProperty(exports, "addSeconds", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index10).default;
  }
});

var _index11 = require("./addWeeks/index.js");

Object.defineProperty(exports, "addWeeks", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index11).default;
  }
});

var _index12 = require("./addYears/index.js");

Object.defineProperty(exports, "addYears", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index12).default;
  }
});

var _index13 = require("./areIntervalsOverlapping/index.js");

Object.defineProperty(exports, "areIntervalsOverlapping", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index13).default;
  }
});

var _index14 = require("./clamp/index.js");

Object.defineProperty(exports, "clamp", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index14).default;
  }
});

var _index15 = require("./closestIndexTo/index.js");

Object.defineProperty(exports, "closestIndexTo", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index15).default;
  }
});

var _index16 = require("./closestTo/index.js");

Object.defineProperty(exports, "closestTo", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index16).default;
  }
});

var _index17 = require("./compareAsc/index.js");

Object.defineProperty(exports, "compareAsc", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index17).default;
  }
});

var _index18 = require("./compareDesc/index.js");

Object.defineProperty(exports, "compareDesc", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index18).default;
  }
});

var _index19 = require("./daysToWeeks/index.js");

Object.defineProperty(exports, "daysToWeeks", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index19).default;
  }
});

var _index20 = require("./differenceInBusinessDays/index.js");

Object.defineProperty(exports, "differenceInBusinessDays", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index20).default;
  }
});

var _index21 = require("./differenceInCalendarDays/index.js");

Object.defineProperty(exports, "differenceInCalendarDays", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index21).default;
  }
});

var _index22 = require("./differenceInCalendarISOWeekYears/index.js");

Object.defineProperty(exports, "differenceInCalendarISOWeekYears", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index22).default;
  }
});

var _index23 = require("./differenceInCalendarISOWeeks/index.js");

Object.defineProperty(exports, "differenceInCalendarISOWeeks", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index23).default;
  }
});

var _index24 = require("./differenceInCalendarMonths/index.js");

Object.defineProperty(exports, "differenceInCalendarMonths", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index24).default;
  }
});

var _index25 = require("./differenceInCalendarQuarters/index.js");

Object.defineProperty(exports, "differenceInCalendarQuarters", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index25).default;
  }
});

var _index26 = require("./differenceInCalendarWeeks/index.js");

Object.defineProperty(exports, "differenceInCalendarWeeks", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index26).default;
  }
});

var _index27 = require("./differenceInCalendarYears/index.js");

Object.defineProperty(exports, "differenceInCalendarYears", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index27).default;
  }
});

var _index28 = require("./differenceInDays/index.js");

Object.defineProperty(exports, "differenceInDays", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index28).default;
  }
});

var _index29 = require("./differenceInHours/index.js");

Object.defineProperty(exports, "differenceInHours", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index29).default;
  }
});

var _index30 = require("./differenceInISOWeekYears/index.js");

Object.defineProperty(exports, "differenceInISOWeekYears", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index30).default;
  }
});

var _index31 = require("./differenceInMilliseconds/index.js");

Object.defineProperty(exports, "differenceInMilliseconds", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index31).default;
  }
});

var _index32 = require("./differenceInMinutes/index.js");

Object.defineProperty(exports, "differenceInMinutes", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index32).default;
  }
});

var _index33 = require("./differenceInMonths/index.js");

Object.defineProperty(exports, "differenceInMonths", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index33).default;
  }
});

var _index34 = require("./differenceInQuarters/index.js");

Object.defineProperty(exports, "differenceInQuarters", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index34).default;
  }
});

var _index35 = require("./differenceInSeconds/index.js");

Object.defineProperty(exports, "differenceInSeconds", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index35).default;
  }
});

var _index36 = require("./differenceInWeeks/index.js");

Object.defineProperty(exports, "differenceInWeeks", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index36).default;
  }
});

var _index37 = require("./differenceInYears/index.js");

Object.defineProperty(exports, "differenceInYears", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index37).default;
  }
});

var _index38 = require("./eachDayOfInterval/index.js");

Object.defineProperty(exports, "eachDayOfInterval", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index38).default;
  }
});

var _index39 = require("./eachHourOfInterval/index.js");

Object.defineProperty(exports, "eachHourOfInterval", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index39).default;
  }
});

var _index40 = require("./eachMinuteOfInterval/index.js");

Object.defineProperty(exports, "eachMinuteOfInterval", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index40).default;
  }
});

var _index41 = require("./eachMonthOfInterval/index.js");

Object.defineProperty(exports, "eachMonthOfInterval", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index41).default;
  }
});

var _index42 = require("./eachQuarterOfInterval/index.js");

Object.defineProperty(exports, "eachQuarterOfInterval", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index42).default;
  }
});

var _index43 = require("./eachWeekOfInterval/index.js");

Object.defineProperty(exports, "eachWeekOfInterval", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index43).default;
  }
});

var _index44 = require("./eachWeekendOfInterval/index.js");

Object.defineProperty(exports, "eachWeekendOfInterval", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index44).default;
  }
});

var _index45 = require("./eachWeekendOfMonth/index.js");

Object.defineProperty(exports, "eachWeekendOfMonth", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index45).default;
  }
});

var _index46 = require("./eachWeekendOfYear/index.js");

Object.defineProperty(exports, "eachWeekendOfYear", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index46).default;
  }
});

var _index47 = require("./eachYearOfInterval/index.js");

Object.defineProperty(exports, "eachYearOfInterval", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index47).default;
  }
});

var _index48 = require("./endOfDay/index.js");

Object.defineProperty(exports, "endOfDay", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index48).default;
  }
});

var _index49 = require("./endOfDecade/index.js");

Object.defineProperty(exports, "endOfDecade", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index49).default;
  }
});

var _index50 = require("./endOfHour/index.js");

Object.defineProperty(exports, "endOfHour", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index50).default;
  }
});

var _index51 = require("./endOfISOWeek/index.js");

Object.defineProperty(exports, "endOfISOWeek", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index51).default;
  }
});

var _index52 = require("./endOfISOWeekYear/index.js");

Object.defineProperty(exports, "endOfISOWeekYear", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index52).default;
  }
});

var _index53 = require("./endOfMinute/index.js");

Object.defineProperty(exports, "endOfMinute", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index53).default;
  }
});

var _index54 = require("./endOfMonth/index.js");

Object.defineProperty(exports, "endOfMonth", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index54).default;
  }
});

var _index55 = require("./endOfQuarter/index.js");

Object.defineProperty(exports, "endOfQuarter", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index55).default;
  }
});

var _index56 = require("./endOfSecond/index.js");

Object.defineProperty(exports, "endOfSecond", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index56).default;
  }
});

var _index57 = require("./endOfToday/index.js");

Object.defineProperty(exports, "endOfToday", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index57).default;
  }
});

var _index58 = require("./endOfTomorrow/index.js");

Object.defineProperty(exports, "endOfTomorrow", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index58).default;
  }
});

var _index59 = require("./endOfWeek/index.js");

Object.defineProperty(exports, "endOfWeek", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index59).default;
  }
});

var _index60 = require("./endOfYear/index.js");

Object.defineProperty(exports, "endOfYear", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index60).default;
  }
});

var _index61 = require("./endOfYesterday/index.js");

Object.defineProperty(exports, "endOfYesterday", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index61).default;
  }
});

var _index62 = require("./format/index.js");

Object.defineProperty(exports, "format", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index62).default;
  }
});

var _index63 = require("./formatDistance/index.js");

Object.defineProperty(exports, "formatDistance", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index63).default;
  }
});

var _index64 = require("./formatDistanceStrict/index.js");

Object.defineProperty(exports, "formatDistanceStrict", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index64).default;
  }
});

var _index65 = require("./formatDistanceToNow/index.js");

Object.defineProperty(exports, "formatDistanceToNow", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index65).default;
  }
});

var _index66 = require("./formatDistanceToNowStrict/index.js");

Object.defineProperty(exports, "formatDistanceToNowStrict", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index66).default;
  }
});

var _index67 = require("./formatDuration/index.js");

Object.defineProperty(exports, "formatDuration", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index67).default;
  }
});

var _index68 = require("./formatISO/index.js");

Object.defineProperty(exports, "formatISO", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index68).default;
  }
});

var _index69 = require("./formatISO9075/index.js");

Object.defineProperty(exports, "formatISO9075", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index69).default;
  }
});

var _index70 = require("./formatISODuration/index.js");

Object.defineProperty(exports, "formatISODuration", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index70).default;
  }
});

var _index71 = require("./formatRFC3339/index.js");

Object.defineProperty(exports, "formatRFC3339", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index71).default;
  }
});

var _index72 = require("./formatRFC7231/index.js");

Object.defineProperty(exports, "formatRFC7231", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index72).default;
  }
});

var _index73 = require("./formatRelative/index.js");

Object.defineProperty(exports, "formatRelative", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index73).default;
  }
});

var _index74 = require("./fromUnixTime/index.js");

Object.defineProperty(exports, "fromUnixTime", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index74).default;
  }
});

var _index75 = require("./getDate/index.js");

Object.defineProperty(exports, "getDate", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index75).default;
  }
});

var _index76 = require("./getDay/index.js");

Object.defineProperty(exports, "getDay", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index76).default;
  }
});

var _index77 = require("./getDayOfYear/index.js");

Object.defineProperty(exports, "getDayOfYear", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index77).default;
  }
});

var _index78 = require("./getDaysInMonth/index.js");

Object.defineProperty(exports, "getDaysInMonth", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index78).default;
  }
});

var _index79 = require("./getDaysInYear/index.js");

Object.defineProperty(exports, "getDaysInYear", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index79).default;
  }
});

var _index80 = require("./getDecade/index.js");

Object.defineProperty(exports, "getDecade", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index80).default;
  }
});

var _index81 = require("./getDefaultOptions/index.js");

Object.defineProperty(exports, "getDefaultOptions", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index81).default;
  }
});

var _index82 = require("./getHours/index.js");

Object.defineProperty(exports, "getHours", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index82).default;
  }
});

var _index83 = require("./getISODay/index.js");

Object.defineProperty(exports, "getISODay", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index83).default;
  }
});

var _index84 = require("./getISOWeek/index.js");

Object.defineProperty(exports, "getISOWeek", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index84).default;
  }
});

var _index85 = require("./getISOWeekYear/index.js");

Object.defineProperty(exports, "getISOWeekYear", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index85).default;
  }
});

var _index86 = require("./getISOWeeksInYear/index.js");

Object.defineProperty(exports, "getISOWeeksInYear", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index86).default;
  }
});

var _index87 = require("./getMilliseconds/index.js");

Object.defineProperty(exports, "getMilliseconds", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index87).default;
  }
});

var _index88 = require("./getMinutes/index.js");

Object.defineProperty(exports, "getMinutes", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index88).default;
  }
});

var _index89 = require("./getMonth/index.js");

Object.defineProperty(exports, "getMonth", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index89).default;
  }
});

var _index90 = require("./getOverlappingDaysInIntervals/index.js");

Object.defineProperty(exports, "getOverlappingDaysInIntervals", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index90).default;
  }
});

var _index91 = require("./getQuarter/index.js");

Object.defineProperty(exports, "getQuarter", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index91).default;
  }
});

var _index92 = require("./getSeconds/index.js");

Object.defineProperty(exports, "getSeconds", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index92).default;
  }
});

var _index93 = require("./getTime/index.js");

Object.defineProperty(exports, "getTime", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index93).default;
  }
});

var _index94 = require("./getUnixTime/index.js");

Object.defineProperty(exports, "getUnixTime", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index94).default;
  }
});

var _index95 = require("./getWeek/index.js");

Object.defineProperty(exports, "getWeek", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index95).default;
  }
});

var _index96 = require("./getWeekOfMonth/index.js");

Object.defineProperty(exports, "getWeekOfMonth", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index96).default;
  }
});

var _index97 = require("./getWeekYear/index.js");

Object.defineProperty(exports, "getWeekYear", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index97).default;
  }
});

var _index98 = require("./getWeeksInMonth/index.js");

Object.defineProperty(exports, "getWeeksInMonth", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index98).default;
  }
});

var _index99 = require("./getYear/index.js");

Object.defineProperty(exports, "getYear", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index99).default;
  }
});

var _index100 = require("./hoursToMilliseconds/index.js");

Object.defineProperty(exports, "hoursToMilliseconds", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index100).default;
  }
});

var _index101 = require("./hoursToMinutes/index.js");

Object.defineProperty(exports, "hoursToMinutes", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index101).default;
  }
});

var _index102 = require("./hoursToSeconds/index.js");

Object.defineProperty(exports, "hoursToSeconds", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index102).default;
  }
});

var _index103 = require("./intervalToDuration/index.js");

Object.defineProperty(exports, "intervalToDuration", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index103).default;
  }
});

var _index104 = require("./intlFormat/index.js");

Object.defineProperty(exports, "intlFormat", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index104).default;
  }
});

var _index105 = require("./intlFormatDistance/index.js");

Object.defineProperty(exports, "intlFormatDistance", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index105).default;
  }
});

var _index106 = require("./isAfter/index.js");

Object.defineProperty(exports, "isAfter", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index106).default;
  }
});

var _index107 = require("./isBefore/index.js");

Object.defineProperty(exports, "isBefore", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index107).default;
  }
});

var _index108 = require("./isDate/index.js");

Object.defineProperty(exports, "isDate", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index108).default;
  }
});

var _index109 = require("./isEqual/index.js");

Object.defineProperty(exports, "isEqual", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index109).default;
  }
});

var _index110 = require("./isExists/index.js");

Object.defineProperty(exports, "isExists", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index110).default;
  }
});

var _index111 = require("./isFirstDayOfMonth/index.js");

Object.defineProperty(exports, "isFirstDayOfMonth", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index111).default;
  }
});

var _index112 = require("./isFriday/index.js");

Object.defineProperty(exports, "isFriday", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index112).default;
  }
});

var _index113 = require("./isFuture/index.js");

Object.defineProperty(exports, "isFuture", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index113).default;
  }
});

var _index114 = require("./isLastDayOfMonth/index.js");

Object.defineProperty(exports, "isLastDayOfMonth", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index114).default;
  }
});

var _index115 = require("./isLeapYear/index.js");

Object.defineProperty(exports, "isLeapYear", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index115).default;
  }
});

var _index116 = require("./isMatch/index.js");

Object.defineProperty(exports, "isMatch", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index116).default;
  }
});

var _index117 = require("./isMonday/index.js");

Object.defineProperty(exports, "isMonday", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index117).default;
  }
});

var _index118 = require("./isPast/index.js");

Object.defineProperty(exports, "isPast", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index118).default;
  }
});

var _index119 = require("./isSameDay/index.js");

Object.defineProperty(exports, "isSameDay", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index119).default;
  }
});

var _index120 = require("./isSameHour/index.js");

Object.defineProperty(exports, "isSameHour", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index120).default;
  }
});

var _index121 = require("./isSameISOWeek/index.js");

Object.defineProperty(exports, "isSameISOWeek", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index121).default;
  }
});

var _index122 = require("./isSameISOWeekYear/index.js");

Object.defineProperty(exports, "isSameISOWeekYear", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index122).default;
  }
});

var _index123 = require("./isSameMinute/index.js");

Object.defineProperty(exports, "isSameMinute", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index123).default;
  }
});

var _index124 = require("./isSameMonth/index.js");

Object.defineProperty(exports, "isSameMonth", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index124).default;
  }
});

var _index125 = require("./isSameQuarter/index.js");

Object.defineProperty(exports, "isSameQuarter", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index125).default;
  }
});

var _index126 = require("./isSameSecond/index.js");

Object.defineProperty(exports, "isSameSecond", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index126).default;
  }
});

var _index127 = require("./isSameWeek/index.js");

Object.defineProperty(exports, "isSameWeek", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index127).default;
  }
});

var _index128 = require("./isSameYear/index.js");

Object.defineProperty(exports, "isSameYear", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index128).default;
  }
});

var _index129 = require("./isSaturday/index.js");

Object.defineProperty(exports, "isSaturday", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index129).default;
  }
});

var _index130 = require("./isSunday/index.js");

Object.defineProperty(exports, "isSunday", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index130).default;
  }
});

var _index131 = require("./isThisHour/index.js");

Object.defineProperty(exports, "isThisHour", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index131).default;
  }
});

var _index132 = require("./isThisISOWeek/index.js");

Object.defineProperty(exports, "isThisISOWeek", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index132).default;
  }
});

var _index133 = require("./isThisMinute/index.js");

Object.defineProperty(exports, "isThisMinute", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index133).default;
  }
});

var _index134 = require("./isThisMonth/index.js");

Object.defineProperty(exports, "isThisMonth", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index134).default;
  }
});

var _index135 = require("./isThisQuarter/index.js");

Object.defineProperty(exports, "isThisQuarter", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index135).default;
  }
});

var _index136 = require("./isThisSecond/index.js");

Object.defineProperty(exports, "isThisSecond", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index136).default;
  }
});

var _index137 = require("./isThisWeek/index.js");

Object.defineProperty(exports, "isThisWeek", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index137).default;
  }
});

var _index138 = require("./isThisYear/index.js");

Object.defineProperty(exports, "isThisYear", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index138).default;
  }
});

var _index139 = require("./isThursday/index.js");

Object.defineProperty(exports, "isThursday", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index139).default;
  }
});

var _index140 = require("./isToday/index.js");

Object.defineProperty(exports, "isToday", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index140).default;
  }
});

var _index141 = require("./isTomorrow/index.js");

Object.defineProperty(exports, "isTomorrow", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index141).default;
  }
});

var _index142 = require("./isTuesday/index.js");

Object.defineProperty(exports, "isTuesday", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index142).default;
  }
});

var _index143 = require("./isValid/index.js");

Object.defineProperty(exports, "isValid", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index143).default;
  }
});

var _index144 = require("./isWednesday/index.js");

Object.defineProperty(exports, "isWednesday", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index144).default;
  }
});

var _index145 = require("./isWeekend/index.js");

Object.defineProperty(exports, "isWeekend", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index145).default;
  }
});

var _index146 = require("./isWithinInterval/index.js");

Object.defineProperty(exports, "isWithinInterval", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index146).default;
  }
});

var _index147 = require("./isYesterday/index.js");

Object.defineProperty(exports, "isYesterday", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index147).default;
  }
});

var _index148 = require("./lastDayOfDecade/index.js");

Object.defineProperty(exports, "lastDayOfDecade", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index148).default;
  }
});

var _index149 = require("./lastDayOfISOWeek/index.js");

Object.defineProperty(exports, "lastDayOfISOWeek", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index149).default;
  }
});

var _index150 = require("./lastDayOfISOWeekYear/index.js");

Object.defineProperty(exports, "lastDayOfISOWeekYear", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index150).default;
  }
});

var _index151 = require("./lastDayOfMonth/index.js");

Object.defineProperty(exports, "lastDayOfMonth", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index151).default;
  }
});

var _index152 = require("./lastDayOfQuarter/index.js");

Object.defineProperty(exports, "lastDayOfQuarter", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index152).default;
  }
});

var _index153 = require("./lastDayOfWeek/index.js");

Object.defineProperty(exports, "lastDayOfWeek", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index153).default;
  }
});

var _index154 = require("./lastDayOfYear/index.js");

Object.defineProperty(exports, "lastDayOfYear", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index154).default;
  }
});

var _index155 = require("./lightFormat/index.js");

Object.defineProperty(exports, "lightFormat", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index155).default;
  }
});

var _index156 = require("./max/index.js");

Object.defineProperty(exports, "max", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index156).default;
  }
});

var _index157 = require("./milliseconds/index.js");

Object.defineProperty(exports, "milliseconds", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index157).default;
  }
});

var _index158 = require("./millisecondsToHours/index.js");

Object.defineProperty(exports, "millisecondsToHours", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index158).default;
  }
});

var _index159 = require("./millisecondsToMinutes/index.js");

Object.defineProperty(exports, "millisecondsToMinutes", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index159).default;
  }
});

var _index160 = require("./millisecondsToSeconds/index.js");

Object.defineProperty(exports, "millisecondsToSeconds", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index160).default;
  }
});

var _index161 = require("./min/index.js");

Object.defineProperty(exports, "min", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index161).default;
  }
});

var _index162 = require("./minutesToHours/index.js");

Object.defineProperty(exports, "minutesToHours", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index162).default;
  }
});

var _index163 = require("./minutesToMilliseconds/index.js");

Object.defineProperty(exports, "minutesToMilliseconds", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index163).default;
  }
});

var _index164 = require("./minutesToSeconds/index.js");

Object.defineProperty(exports, "minutesToSeconds", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index164).default;
  }
});

var _index165 = require("./monthsToQuarters/index.js");

Object.defineProperty(exports, "monthsToQuarters", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index165).default;
  }
});

var _index166 = require("./monthsToYears/index.js");

Object.defineProperty(exports, "monthsToYears", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index166).default;
  }
});

var _index167 = require("./nextDay/index.js");

Object.defineProperty(exports, "nextDay", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index167).default;
  }
});

var _index168 = require("./nextFriday/index.js");

Object.defineProperty(exports, "nextFriday", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index168).default;
  }
});

var _index169 = require("./nextMonday/index.js");

Object.defineProperty(exports, "nextMonday", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index169).default;
  }
});

var _index170 = require("./nextSaturday/index.js");

Object.defineProperty(exports, "nextSaturday", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index170).default;
  }
});

var _index171 = require("./nextSunday/index.js");

Object.defineProperty(exports, "nextSunday", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index171).default;
  }
});

var _index172 = require("./nextThursday/index.js");

Object.defineProperty(exports, "nextThursday", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index172).default;
  }
});

var _index173 = require("./nextTuesday/index.js");

Object.defineProperty(exports, "nextTuesday", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index173).default;
  }
});

var _index174 = require("./nextWednesday/index.js");

Object.defineProperty(exports, "nextWednesday", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index174).default;
  }
});

var _index175 = require("./parse/index.js");

Object.defineProperty(exports, "parse", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index175).default;
  }
});

var _index176 = require("./parseISO/index.js");

Object.defineProperty(exports, "parseISO", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index176).default;
  }
});

var _index177 = require("./parseJSON/index.js");

Object.defineProperty(exports, "parseJSON", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index177).default;
  }
});

var _index178 = require("./previousDay/index.js");

Object.defineProperty(exports, "previousDay", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index178).default;
  }
});

var _index179 = require("./previousFriday/index.js");

Object.defineProperty(exports, "previousFriday", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index179).default;
  }
});

var _index180 = require("./previousMonday/index.js");

Object.defineProperty(exports, "previousMonday", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index180).default;
  }
});

var _index181 = require("./previousSaturday/index.js");

Object.defineProperty(exports, "previousSaturday", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index181).default;
  }
});

var _index182 = require("./previousSunday/index.js");

Object.defineProperty(exports, "previousSunday", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index182).default;
  }
});

var _index183 = require("./previousThursday/index.js");

Object.defineProperty(exports, "previousThursday", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index183).default;
  }
});

var _index184 = require("./previousTuesday/index.js");

Object.defineProperty(exports, "previousTuesday", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index184).default;
  }
});

var _index185 = require("./previousWednesday/index.js");

Object.defineProperty(exports, "previousWednesday", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index185).default;
  }
});

var _index186 = require("./quartersToMonths/index.js");

Object.defineProperty(exports, "quartersToMonths", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index186).default;
  }
});

var _index187 = require("./quartersToYears/index.js");

Object.defineProperty(exports, "quartersToYears", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index187).default;
  }
});

var _index188 = require("./roundToNearestMinutes/index.js");

Object.defineProperty(exports, "roundToNearestMinutes", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index188).default;
  }
});

var _index189 = require("./secondsToHours/index.js");

Object.defineProperty(exports, "secondsToHours", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index189).default;
  }
});

var _index190 = require("./secondsToMilliseconds/index.js");

Object.defineProperty(exports, "secondsToMilliseconds", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index190).default;
  }
});

var _index191 = require("./secondsToMinutes/index.js");

Object.defineProperty(exports, "secondsToMinutes", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index191).default;
  }
});

var _index192 = require("./set/index.js");

Object.defineProperty(exports, "set", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index192).default;
  }
});

var _index193 = require("./setDate/index.js");

Object.defineProperty(exports, "setDate", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index193).default;
  }
});

var _index194 = require("./setDay/index.js");

Object.defineProperty(exports, "setDay", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index194).default;
  }
});

var _index195 = require("./setDayOfYear/index.js");

Object.defineProperty(exports, "setDayOfYear", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index195).default;
  }
});

var _index196 = require("./setDefaultOptions/index.js");

Object.defineProperty(exports, "setDefaultOptions", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index196).default;
  }
});

var _index197 = require("./setHours/index.js");

Object.defineProperty(exports, "setHours", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index197).default;
  }
});

var _index198 = require("./setISODay/index.js");

Object.defineProperty(exports, "setISODay", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index198).default;
  }
});

var _index199 = require("./setISOWeek/index.js");

Object.defineProperty(exports, "setISOWeek", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index199).default;
  }
});

var _index200 = require("./setISOWeekYear/index.js");

Object.defineProperty(exports, "setISOWeekYear", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index200).default;
  }
});

var _index201 = require("./setMilliseconds/index.js");

Object.defineProperty(exports, "setMilliseconds", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index201).default;
  }
});

var _index202 = require("./setMinutes/index.js");

Object.defineProperty(exports, "setMinutes", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index202).default;
  }
});

var _index203 = require("./setMonth/index.js");

Object.defineProperty(exports, "setMonth", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index203).default;
  }
});

var _index204 = require("./setQuarter/index.js");

Object.defineProperty(exports, "setQuarter", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index204).default;
  }
});

var _index205 = require("./setSeconds/index.js");

Object.defineProperty(exports, "setSeconds", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index205).default;
  }
});

var _index206 = require("./setWeek/index.js");

Object.defineProperty(exports, "setWeek", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index206).default;
  }
});

var _index207 = require("./setWeekYear/index.js");

Object.defineProperty(exports, "setWeekYear", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index207).default;
  }
});

var _index208 = require("./setYear/index.js");

Object.defineProperty(exports, "setYear", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index208).default;
  }
});

var _index209 = require("./startOfDay/index.js");

Object.defineProperty(exports, "startOfDay", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index209).default;
  }
});

var _index210 = require("./startOfDecade/index.js");

Object.defineProperty(exports, "startOfDecade", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index210).default;
  }
});

var _index211 = require("./startOfHour/index.js");

Object.defineProperty(exports, "startOfHour", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index211).default;
  }
});

var _index212 = require("./startOfISOWeek/index.js");

Object.defineProperty(exports, "startOfISOWeek", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index212).default;
  }
});

var _index213 = require("./startOfISOWeekYear/index.js");

Object.defineProperty(exports, "startOfISOWeekYear", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index213).default;
  }
});

var _index214 = require("./startOfMinute/index.js");

Object.defineProperty(exports, "startOfMinute", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index214).default;
  }
});

var _index215 = require("./startOfMonth/index.js");

Object.defineProperty(exports, "startOfMonth", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index215).default;
  }
});

var _index216 = require("./startOfQuarter/index.js");

Object.defineProperty(exports, "startOfQuarter", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index216).default;
  }
});

var _index217 = require("./startOfSecond/index.js");

Object.defineProperty(exports, "startOfSecond", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index217).default;
  }
});

var _index218 = require("./startOfToday/index.js");

Object.defineProperty(exports, "startOfToday", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index218).default;
  }
});

var _index219 = require("./startOfTomorrow/index.js");

Object.defineProperty(exports, "startOfTomorrow", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index219).default;
  }
});

var _index220 = require("./startOfWeek/index.js");

Object.defineProperty(exports, "startOfWeek", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index220).default;
  }
});

var _index221 = require("./startOfWeekYear/index.js");

Object.defineProperty(exports, "startOfWeekYear", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index221).default;
  }
});

var _index222 = require("./startOfYear/index.js");

Object.defineProperty(exports, "startOfYear", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index222).default;
  }
});

var _index223 = require("./startOfYesterday/index.js");

Object.defineProperty(exports, "startOfYesterday", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index223).default;
  }
});

var _index224 = require("./sub/index.js");

Object.defineProperty(exports, "sub", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index224).default;
  }
});

var _index225 = require("./subBusinessDays/index.js");

Object.defineProperty(exports, "subBusinessDays", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index225).default;
  }
});

var _index226 = require("./subDays/index.js");

Object.defineProperty(exports, "subDays", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index226).default;
  }
});

var _index227 = require("./subHours/index.js");

Object.defineProperty(exports, "subHours", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index227).default;
  }
});

var _index228 = require("./subISOWeekYears/index.js");

Object.defineProperty(exports, "subISOWeekYears", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index228).default;
  }
});

var _index229 = require("./subMilliseconds/index.js");

Object.defineProperty(exports, "subMilliseconds", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index229).default;
  }
});

var _index230 = require("./subMinutes/index.js");

Object.defineProperty(exports, "subMinutes", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index230).default;
  }
});

var _index231 = require("./subMonths/index.js");

Object.defineProperty(exports, "subMonths", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index231).default;
  }
});

var _index232 = require("./subQuarters/index.js");

Object.defineProperty(exports, "subQuarters", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index232).default;
  }
});

var _index233 = require("./subSeconds/index.js");

Object.defineProperty(exports, "subSeconds", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index233).default;
  }
});

var _index234 = require("./subWeeks/index.js");

Object.defineProperty(exports, "subWeeks", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index234).default;
  }
});

var _index235 = require("./subYears/index.js");

Object.defineProperty(exports, "subYears", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index235).default;
  }
});

var _index236 = require("./toDate/index.js");

Object.defineProperty(exports, "toDate", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index236).default;
  }
});

var _index237 = require("./weeksToDays/index.js");

Object.defineProperty(exports, "weeksToDays", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index237).default;
  }
});

var _index238 = require("./yearsToMonths/index.js");

Object.defineProperty(exports, "yearsToMonths", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index238).default;
  }
});

var _index239 = require("./yearsToQuarters/index.js");

Object.defineProperty(exports, "yearsToQuarters", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_index239).default;
  }
});

var _index240 = require("./constants/index.js");

Object.keys(_index240).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index240[key];
    }
  });
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./add/index.js":67,"./addBusinessDays/index.js":10,"./addDays/index.js":11,"./addHours/index.js":9,"./addISOWeekYears/index.js":12,"./addMilliseconds/index.js":13,"./addMinutes/index.js":14,"./addMonths/index.js":15,"./addQuarters/index.js":16,"./addSeconds/index.js":17,"./addWeeks/index.js":18,"./addYears/index.js":19,"./areIntervalsOverlapping/index.js":20,"./clamp/index.js":21,"./closestIndexTo/index.js":22,"./closestTo/index.js":23,"./compareAsc/index.js":24,"./compareDesc/index.js":25,"./daysToWeeks/index.js":28,"./differenceInBusinessDays/index.js":26,"./differenceInCalendarDays/index.js":27,"./differenceInCalendarISOWeekYears/index.js":29,"./differenceInCalendarISOWeeks/index.js":30,"./differenceInCalendarMonths/index.js":31,"./differenceInCalendarQuarters/index.js":32,"./differenceInCalendarWeeks/index.js":33,"./differenceInCalendarYears/index.js":37,"./differenceInDays/index.js":34,"./differenceInHours/index.js":35,"./differenceInISOWeekYears/index.js":36,"./differenceInMilliseconds/index.js":38,"./differenceInMinutes/index.js":39,"./differenceInMonths/index.js":40,"./differenceInQuarters/index.js":41,"./differenceInSeconds/index.js":42,"./differenceInWeeks/index.js":43,"./differenceInYears/index.js":44,"./eachDayOfInterval/index.js":45,"./eachHourOfInterval/index.js":46,"./eachMinuteOfInterval/index.js":47,"./eachMonthOfInterval/index.js":48,"./eachQuarterOfInterval/index.js":49,"./eachWeekOfInterval/index.js":51,"./eachWeekendOfInterval/index.js":50,"./eachWeekendOfMonth/index.js":52,"./eachWeekendOfYear/index.js":53,"./eachYearOfInterval/index.js":54,"./endOfDay/index.js":55,"./endOfDecade/index.js":56,"./endOfHour/index.js":63,"./endOfISOWeek/index.js":57,"./endOfISOWeekYear/index.js":58,"./endOfMinute/index.js":59,"./endOfMonth/index.js":60,"./endOfQuarter/index.js":61,"./endOfSecond/index.js":64,"./endOfToday/index.js":62,"./endOfTomorrow/index.js":65,"./endOfWeek/index.js":66,"./endOfYear/index.js":71,"./endOfYesterday/index.js":68,"./format/index.js":69,"./formatDistance/index.js":74,"./formatDistanceStrict/index.js":116,"./formatDistanceToNow/index.js":70,"./formatDistanceToNowStrict/index.js":72,"./formatDuration/index.js":75,"./formatISO/index.js":73,"./formatISO9075/index.js":76,"./formatISODuration/index.js":77,"./formatRFC3339/index.js":78,"./formatRFC7231/index.js":79,"./formatRelative/index.js":80,"./fromUnixTime/index.js":81,"./getDate/index.js":82,"./getDay/index.js":83,"./getDayOfYear/index.js":84,"./getDaysInMonth/index.js":85,"./getDaysInYear/index.js":86,"./getDecade/index.js":87,"./getDefaultOptions/index.js":89,"./getHours/index.js":88,"./getISODay/index.js":93,"./getISOWeek/index.js":91,"./getISOWeekYear/index.js":90,"./getISOWeeksInYear/index.js":94,"./getMilliseconds/index.js":92,"./getMinutes/index.js":95,"./getMonth/index.js":100,"./getOverlappingDaysInIntervals/index.js":97,"./getQuarter/index.js":102,"./getSeconds/index.js":98,"./getTime/index.js":96,"./getUnixTime/index.js":99,"./getWeek/index.js":101,"./getWeekOfMonth/index.js":106,"./getWeekYear/index.js":103,"./getWeeksInMonth/index.js":104,"./getYear/index.js":105,"./hoursToMilliseconds/index.js":138,"./hoursToMinutes/index.js":107,"./hoursToSeconds/index.js":108,"./intervalToDuration/index.js":109,"./intlFormat/index.js":111,"./intlFormatDistance/index.js":110,"./isAfter/index.js":114,"./isBefore/index.js":115,"./isDate/index.js":112,"./isEqual/index.js":113,"./isExists/index.js":117,"./isFirstDayOfMonth/index.js":118,"./isFriday/index.js":119,"./isFuture/index.js":120,"./isLastDayOfMonth/index.js":122,"./isLeapYear/index.js":121,"./isMatch/index.js":123,"./isMonday/index.js":125,"./isPast/index.js":124,"./isSameDay/index.js":126,"./isSameHour/index.js":129,"./isSameISOWeek/index.js":127,"./isSameISOWeekYear/index.js":128,"./isSameMinute/index.js":130,"./isSameMonth/index.js":132,"./isSameQuarter/index.js":131,"./isSameSecond/index.js":133,"./isSameWeek/index.js":135,"./isSameYear/index.js":134,"./isSaturday/index.js":137,"./isSunday/index.js":139,"./isThisHour/index.js":136,"./isThisISOWeek/index.js":142,"./isThisMinute/index.js":140,"./isThisMonth/index.js":141,"./isThisQuarter/index.js":144,"./isThisSecond/index.js":143,"./isThisWeek/index.js":147,"./isThisYear/index.js":146,"./isThursday/index.js":150,"./isToday/index.js":145,"./isTomorrow/index.js":148,"./isTuesday/index.js":152,"./isValid/index.js":151,"./isWednesday/index.js":149,"./isWeekend/index.js":154,"./isWithinInterval/index.js":153,"./isYesterday/index.js":157,"./lastDayOfDecade/index.js":156,"./lastDayOfISOWeek/index.js":155,"./lastDayOfISOWeekYear/index.js":158,"./lastDayOfMonth/index.js":161,"./lastDayOfQuarter/index.js":159,"./lastDayOfWeek/index.js":160,"./lastDayOfYear/index.js":162,"./lightFormat/index.js":164,"./max/index.js":163,"./milliseconds/index.js":165,"./millisecondsToHours/index.js":166,"./millisecondsToMinutes/index.js":170,"./millisecondsToSeconds/index.js":167,"./min/index.js":168,"./minutesToHours/index.js":171,"./minutesToMilliseconds/index.js":173,"./minutesToSeconds/index.js":169,"./monthsToQuarters/index.js":172,"./monthsToYears/index.js":175,"./nextDay/index.js":174,"./nextFriday/index.js":180,"./nextMonday/index.js":177,"./nextSaturday/index.js":176,"./nextSunday/index.js":181,"./nextThursday/index.js":178,"./nextTuesday/index.js":179,"./nextWednesday/index.js":182,"./parse/index.js":186,"./parseISO/index.js":184,"./parseJSON/index.js":183,"./previousDay/index.js":191,"./previousFriday/index.js":188,"./previousMonday/index.js":185,"./previousSaturday/index.js":190,"./previousSunday/index.js":189,"./previousThursday/index.js":187,"./previousTuesday/index.js":192,"./previousWednesday/index.js":193,"./quartersToMonths/index.js":194,"./quartersToYears/index.js":195,"./roundToNearestMinutes/index.js":198,"./secondsToHours/index.js":196,"./secondsToMilliseconds/index.js":197,"./secondsToMinutes/index.js":199,"./set/index.js":205,"./setDate/index.js":201,"./setDay/index.js":200,"./setDayOfYear/index.js":202,"./setDefaultOptions/index.js":206,"./setHours/index.js":203,"./setISODay/index.js":204,"./setISOWeek/index.js":207,"./setISOWeekYear/index.js":221,"./setMilliseconds/index.js":208,"./setMinutes/index.js":209,"./setMonth/index.js":210,"./setQuarter/index.js":219,"./setSeconds/index.js":211,"./setWeek/index.js":212,"./setWeekYear/index.js":220,"./setYear/index.js":215,"./startOfDay/index.js":213,"./startOfDecade/index.js":216,"./startOfHour/index.js":214,"./startOfISOWeek/index.js":218,"./startOfISOWeekYear/index.js":217,"./startOfMinute/index.js":222,"./startOfMonth/index.js":223,"./startOfQuarter/index.js":228,"./startOfSecond/index.js":224,"./startOfToday/index.js":225,"./startOfTomorrow/index.js":230,"./startOfWeek/index.js":226,"./startOfWeekYear/index.js":227,"./startOfYear/index.js":229,"./startOfYesterday/index.js":231,"./sub/index.js":233,"./subBusinessDays/index.js":232,"./subDays/index.js":246,"./subHours/index.js":235,"./subISOWeekYears/index.js":236,"./subMilliseconds/index.js":234,"./subMinutes/index.js":238,"./subMonths/index.js":239,"./subQuarters/index.js":237,"./subSeconds/index.js":240,"./subWeeks/index.js":241,"./subYears/index.js":242,"./toDate/index.js":243,"./weeksToDays/index.js":245,"./yearsToMonths/index.js":244,"./yearsToQuarters/index.js":247,"./constants/index.js":8}],4:[function(require,module,exports) {
"use strict";

var _dateFns = require("date-fns");

var date = "1996-09-13 10:00:00";
document.body.textContent = (0, _dateFns.formatDistanceToNow)(new Date(date)) + " ago";
},{"date-fns":6}],576:[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';

var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '49477' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
      // Clear the console after HMR
      console.clear();
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},[576,4], null)
//# sourceMappingURL=/parcel-experiment.2dc88bdf.map