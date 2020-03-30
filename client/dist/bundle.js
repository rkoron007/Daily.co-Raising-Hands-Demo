/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./client/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./client/index.js":
/*!*************************!*\
  !*** ./client/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_api_functions_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util/api-functions.js */ "./client/util/api-functions.js");
/* harmony import */ var _util_api_functions_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_util_api_functions_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util_ui_functions_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util/ui-functions.js */ "./client/util/ui-functions.js");
/* harmony import */ var _util_ui_functions_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_util_ui_functions_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _keys_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./keys.js */ "./client/keys.js");
/* harmony import */ var _keys_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_keys_js__WEBPACK_IMPORTED_MODULE_2__);

window.APIFunctions = _util_api_functions_js__WEBPACK_IMPORTED_MODULE_0__;

window.UIFunctions = _util_ui_functions_js__WEBPACK_IMPORTED_MODULE_1__;

window.APIKEY = _keys_js__WEBPACK_IMPORTED_MODULE_2___default.a;

/***/ }),

/***/ "./client/keys.js":
/*!************************!*\
  !*** ./client/keys.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

var APIKEY = "Cd67505b1e798a95f43638b3108601d48ef26b2100aca612507fc94fec9a272d";
module.exports = APIKEY;

/***/ }),

/***/ "./client/util/api-functions.js":
/*!**************************************!*\
  !*** ./client/util/api-functions.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// function for creating a post request
function makePostRequest(_x) {
  return _makePostRequest.apply(this, arguments);
} // function for creating a fetch request


function _makePostRequest() {
  _makePostRequest = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url) {
    var properties,
        _args = arguments;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            properties = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
            return _context.abrupt("return", fetch(url, {
              method: "POST",
              // here we ensure our passed in properties are wrapped in an object
              // with a properties key pointing at the values like so:
              // "{\"properties\":{\"start_audio_off\":true}}";
              body: JSON.stringify({
                properties: properties
              }),
              headers: {
                "Content-Type": "application/json",
                "X-Requested-With": "XMLHttpRequest",
                // imported from a file not checked into version control
                authorization: "Bearer ".concat(APIKEY)
              },
              credentials: "same-origin"
            }));

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _makePostRequest.apply(this, arguments);
}

function makeFetchRequest(_x2) {
  return _makeFetchRequest.apply(this, arguments);
} // will return a room object with the specified name


function _makeFetchRequest() {
  _makeFetchRequest = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(url) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", fetch(url, {
              method: "Get",
              headers: {
                "Content-Type": "application/json",
                // imported from a file not checked into version control
                authorization: "Bearer ".concat(APIKEY)
              },
              credentials: "same-origin"
            }));

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _makeFetchRequest.apply(this, arguments);
}

function fetchRoom(_x3) {
  return _fetchRoom.apply(this, arguments);
} // checks response status for errors, and returns response JSON


function _fetchRoom() {
  _fetchRoom = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(name) {
    var response;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return makeFetchRequest("https://api.daily.co/v1/rooms/".concat(name));

          case 2:
            response = _context3.sent;
            _context3.next = 5;
            return handleResponseJSON(response);

          case 5:
            room = _context3.sent;
            return _context3.abrupt("return", room);

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _fetchRoom.apply(this, arguments);
}

function handleResponseJSON(_x4) {
  return _handleResponseJSON.apply(this, arguments);
} // will return a room object with a url for joining that room


function _handleResponseJSON() {
  _handleResponseJSON = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(response) {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            if (!(response.status >= 201)) {
              _context4.next = 3;
              break;
            }

            console.log(response.statusText);
            throw new Error("Bad response from server");

          case 3:
            return _context4.abrupt("return", response.json());

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _handleResponseJSON.apply(this, arguments);
}

function createMtgRoom() {
  return _createMtgRoom.apply(this, arguments);
} // will create a meeting token for a provided meeting room
// then will return the room's url with the token appended


function _createMtgRoom() {
  _createMtgRoom = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
    var properties,
        response,
        _args5 = arguments;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            properties = _args5.length > 0 && _args5[0] !== undefined ? _args5[0] : {};
            _context5.next = 3;
            return makePostRequest("https://api.daily.co/v1/rooms", properties);

          case 3:
            response = _context5.sent;
            _context5.next = 6;
            return handleResponseJSON(response);

          case 6:
            room = _context5.sent;
            return _context5.abrupt("return", room);

          case 8:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _createMtgRoom.apply(this, arguments);
}

function createMtgLinkWithToken(_x5) {
  return _createMtgLinkWithToken.apply(this, arguments);
}

function _createMtgLinkWithToken() {
  _createMtgLinkWithToken = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(properties) {
    var response, _yield$handleResponse, token;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return makePostRequest("https://api.daily.co/v1/meeting-tokens", properties);

          case 2:
            response = _context6.sent;
            _context6.next = 5;
            return handleResponseJSON(response);

          case 5:
            _yield$handleResponse = _context6.sent;
            token = _yield$handleResponse.token;
            return _context6.abrupt("return", "".concat(room.url, "?t=").concat(token));

          case 8:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _createMtgLinkWithToken.apply(this, arguments);
}

module.exports = {
  createMtgLinkWithToken: createMtgLinkWithToken,
  createMtgRoom: createMtgRoom,
  fetchRoom: fetchRoom
};

/***/ }),

/***/ "./client/util/ui-functions.js":
/*!*************************************!*\
  !*** ./client/util/ui-functions.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function showEvent(e) {
  console.log("video call event -->", e);
} // will create a link with the current room name and insert that link
// into our HTML


function updateRoomUrlDisplay() {
  var roomEl = document.getElementById("meeting-room-info");
  var roomLink = document.location.href.replace("-human", "-device") + "?name=" + encodeURIComponent(room.name);
  roomEl.innerHTML = "\n      <div>\n        <h4>Room Info</h4>\n          <a href=\"".concat(roomLink, "\" target=\"_blank\">\n            <p>Open this link in incognito mode to log in as a student</p>     \n          </a>\n      </div>\n    ");
} // we've left the meeting so we will empty the participant list


function emptyParticipantList() {
  var participantList = document.getElementById("participants-list");
  participantList.innerHTML = "";
} // ui button functions


function buttonEnable() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  args.forEach(function (id) {
    var el = document.getElementById(id);

    if (el) {
      el.classList.remove("disabled");
    }
  });
}

function buttonDisable() {
  for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  args.forEach(function (id) {
    var el = document.getElementById(id);

    if (el) {
      el.classList.add("disabled");
    }
  });
} // functions that will connect to the call as either a student or teacher and
// handle showing/hiding buttons


function joinCallTeacher() {
  callFrame.join({
    url: ownerLink
  });
  buttonDisable("join-meeting-student", "join-meeting-teacher");
  buttonEnable("leave-meeting");
}

function joinCallStudent() {
  console.log("hello");
  callFrame.join({
    url: room.url,
    showLeaveButton: false
  });
  buttonDisable("join-meeting-student", "join-meeting-teacher");
  buttonEnable("raise-hand-btn", "leave-meeting");
}

module.exports = {
  showEvent: showEvent,
  joinCallStudent: joinCallStudent,
  joinCallTeacher: joinCallTeacher,
  buttonDisable: buttonDisable,
  buttonEnable: buttonEnable,
  emptyParticipantList: emptyParticipantList,
  updateRoomUrlDisplay: updateRoomUrlDisplay
};

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map