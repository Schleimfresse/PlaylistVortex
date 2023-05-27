"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _ytdlCore = _interopRequireDefault(require("ytdl-core"));
var _ytpl = _interopRequireDefault(require("ytpl"));
var _fs = _interopRequireDefault(require("fs"));
var _readline = _interopRequireDefault(require("readline"));
var _os = _interopRequireDefault(require("os"));
var _path = _interopRequireDefault(require("path"));
var _cliProgress = require("cli-progress");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
process.stdout.setEncoding("utf-8");
var rl = _readline["default"].createInterface({
  input: process.stdin,
  output: process.stdout
});

/**
 * All color codes which are needed; used to color text in the console
 */
var colorCodes = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  bright: "\x1b[1m"
};
/**
 * Generates a 6 digit code in case a folder which is supposed to be generated for a downloaded playlist already exists
 * @returns a random 6 digit generated code
 * @since v.1.1.0
 */
var generateRandomCode = function generateRandomCode() {
  var characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var code = "";
  for (var i = 0; i < 6; i++) {
    var randomIndex = Math.floor(Math.random() * characters.length);
    code += characters[randomIndex];
  }
  return " " + code;
};

/**
 * main function
 * @param {*} playlistUrl URL of the playlist which gets downloaded
 * @param {*} ext extention for the files
 * @async
 * @since v1.0.0
 */
function downloadPlaylist(_x, _x2, _x3) {
  return _downloadPlaylist.apply(this, arguments);
}
/**
 * User input
 * @since v.1.0.0
 */
function _downloadPlaylist() {
  _downloadPlaylist = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(playlistUrl, ext, duplicate) {
    var playlistId, playlistInfo, plural, playlistInfo_Items, duplicatesRemoved, downloadsPath, playlistTitle, playlistFolderPath, folderExists, progressBar, _iterator, _step, _loop;
    return _regeneratorRuntime().wrap(function _callee10$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          _context11.next = 3;
          return _ytpl["default"].getPlaylistID(playlistUrl);
        case 3:
          playlistId = _context11.sent;
          _context11.next = 6;
          return (0, _ytpl["default"])(playlistId);
        case 6:
          playlistInfo = _context11.sent;
          _context11.t0 = duplicate;
          _context11.next = _context11.t0 === "yes" ? 10 : _context11.t0 === "no" ? 17 : 19;
          break;
        case 10:
          plural = "s were";
          playlistInfo_Items = playlistInfo.items.filter(function (item, index, self) {
            return self.findIndex(function (i) {
              return i.id === item.id;
            }) === index;
          });
          duplicatesRemoved = playlistInfo.items.length - playlistInfo_Items.length;
          playlistInfo.items = playlistInfo_Items;
          if (duplicatesRemoved === 1) {
            plural = " was";
          }
          console.log("".concat(duplicatesRemoved, " duplicate").concat(plural, " removed"));
          return _context11.abrupt("break", 20);
        case 17:
          console.log("Duplicate removal: disabled");
          return _context11.abrupt("break", 20);
        case 19:
          throw new Error("No value was specified.");
        case 20:
          downloadsPath = _path["default"].join(_os["default"].homedir(), "Downloads");
          playlistTitle = playlistInfo.title.replace(/[<>:"/\\|?*\x00-\x1F]/g, "_");
          playlistFolderPath = _path["default"].join(downloadsPath, playlistTitle);
          folderExists = _fs["default"].existsSync(playlistFolderPath);
          while (folderExists) {
            console.warn("".concat(colorCodes.yellow, "Folder at \"").concat(playlistFolderPath, "\" already exists. Generating code for folder name...").concat(colorCodes.reset));
            playlistTitle = playlistTitle + generateRandomCode();
            playlistFolderPath = _path["default"].join(downloadsPath, playlistTitle);
            folderExists = _fs["default"].existsSync(playlistFolderPath);
          }
          _fs["default"].mkdirSync(playlistFolderPath);
          progressBar = new _cliProgress.SingleBar({
            format: "".concat(colorCodes.bright + colorCodes.green, "Downloading: ").concat(colorCodes.reset + "{title}", " | ").concat("{tracknumber}" + "/" + "{trackstotal}", " | {bar} | {percentage}% | {value}/{total} bytes"),
            barCompleteChar: "\u2588",
            barIncompleteChar: "\u2591",
            hideCursor: true
          }, _cliProgress.Presets.shades_classic);
          console.log("".concat(colorCodes.reset + playlistInfo.items.length, " elements found..."));
          _iterator = _createForOfIteratorHelper(playlistInfo.items);
          _context11.prev = 29;
          _loop = /*#__PURE__*/_regeneratorRuntime().mark(function _loop() {
            var videoInfo, videoTitle, videoUrl;
            return _regeneratorRuntime().wrap(function _loop$(_context10) {
              while (1) switch (_context10.prev = _context10.next) {
                case 0:
                  videoInfo = _step.value;
                  videoTitle = videoInfo.title.replace(/[<>:"/\\|?*\x00-\x1F]/g, "_");
                  videoUrl = videoInfo.shortUrl;
                  _context10.next = 5;
                  return new Promise(function (resolve, reject) {
                    progressBar.start(100, 0, {
                      title: videoTitle,
                      tracknumber: playlistInfo.items.indexOf(videoInfo) + 1,
                      trackstotal: playlistInfo.items.length
                    });
                    var videoStream;
                    switch (ext) {
                      case "mp4":
                        videoStream = (0, _ytdlCore["default"])(videoUrl, {
                          format: ext,
                          filter: "videoandaudio",
                          quality: "highestvideo"
                        });
                        break;
                      case "mp3":
                        videoStream = (0, _ytdlCore["default"])(videoUrl, {
                          format: ext,
                          filter: "audioonly",
                          quality: "highestaudio"
                        });
                        break;
                      default:
                        throw new Error("No format was specified.");
                    }
                    var fileStream = _fs["default"].createWriteStream(_path["default"].join(playlistFolderPath, "".concat(videoTitle, ".").concat(ext)));
                    var receivedBytes = 0;
                    var totalBytes = 0;
                    videoStream.on("response", function (response) {
                      totalBytes = parseInt(response.headers["content-length"]);
                      progressBar.setTotal(totalBytes);
                    });
                    videoStream.on("data", function (chunk) {
                      receivedBytes += chunk.length;
                      progressBar.update(receivedBytes, {
                        title: videoTitle,
                        tracknumber: playlistInfo.items.indexOf(videoInfo) + 1
                      });
                    });
                    videoStream.pipe(fileStream);
                    fileStream.on("finish", function () {
                      progressBar.stop();
                      console.log("".concat(colorCodes.bright + colorCodes.green, "Downloaded: ").concat(colorCodes.reset + videoTitle));
                      resolve();
                    });
                    videoStream.on("error", function (error) {
                      reject(error);
                    });
                  });
                case 5:
                case "end":
                  return _context10.stop();
              }
            }, _loop);
          });
          _iterator.s();
        case 32:
          if ((_step = _iterator.n()).done) {
            _context11.next = 36;
            break;
          }
          return _context11.delegateYield(_loop(), "t1", 34);
        case 34:
          _context11.next = 32;
          break;
        case 36:
          _context11.next = 41;
          break;
        case 38:
          _context11.prev = 38;
          _context11.t2 = _context11["catch"](29);
          _iterator.e(_context11.t2);
        case 41:
          _context11.prev = 41;
          _iterator.f();
          return _context11.finish(41);
        case 44:
          console.log("".concat(colorCodes.green, "Playlist download completed.").concat(colorCodes.reset));
          progressBar.stop();
          _context11.next = 51;
          break;
        case 48:
          _context11.prev = 48;
          _context11.t3 = _context11["catch"](0);
          console.error("".concat(colorCodes.red, "An error occurred:").concat(colorCodes.reset), _context11.t3);
        case 51:
          _context11.prev = 51;
          rl.close();
          process.exit(1);
          return _context11.finish(51);
        case 55:
        case "end":
          return _context11.stop();
      }
    }, _callee10, null, [[0, 48, 51, 55], [29, 38, 41, 44]]);
  }));
  return _downloadPlaylist.apply(this, arguments);
}
rl.question("".concat(colorCodes.bright, "Paste your YouTube playlist link here: ").concat(colorCodes.reset), /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(YTURL) {
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          if (YTURL.includes("youtube.com")) {
            _context3.next = 3;
            break;
          }
          console.log("".concat(colorCodes.yellow, "Please enter a valid YouTube link").concat(colorCodes.reset));
          return _context3.abrupt("return", retryurl());
        case 3:
          rl.question("".concat(colorCodes.bright, "Should the files have video and audio or only audio? (audio/video): ").concat(colorCodes.reset), /*#__PURE__*/function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(TYPE) {
              return _regeneratorRuntime().wrap(function _callee2$(_context2) {
                while (1) switch (_context2.prev = _context2.next) {
                  case 0:
                    if (!(TYPE.toLowerCase().trim() === "audio")) {
                      _context2.next = 4;
                      break;
                    }
                    TYPE = "mp3";
                    _context2.next = 10;
                    break;
                  case 4:
                    if (!(TYPE.toLowerCase().trim() === "video")) {
                      _context2.next = 8;
                      break;
                    }
                    TYPE = "mp4";
                    _context2.next = 10;
                    break;
                  case 8:
                    console.log("".concat(colorCodes.yellow, "Please enter valid values").concat(colorCodes.reset));
                    return _context2.abrupt("return", retrymediatype(YTURL));
                  case 10:
                    rl.question("".concat(colorCodes.bright, "Should duplicates be removed? (yes/no): ").concat(colorCodes.reset), /*#__PURE__*/function () {
                      var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(DUPLICATE) {
                        return _regeneratorRuntime().wrap(function _callee$(_context) {
                          while (1) switch (_context.prev = _context.next) {
                            case 0:
                              if (!(DUPLICATE.toLowerCase().trim() !== "yes" && DUPLICATE.toLowerCase().trim() !== "no")) {
                                _context.next = 3;
                                break;
                              }
                              console.log("".concat(colorCodes.yellow, "Please enter a valid value").concat(colorCodes.reset));
                              return _context.abrupt("return", retrydup());
                            case 3:
                              downloadPlaylist(String(YTURL), String(TYPE), String(DUPLICATE));
                            case 4:
                            case "end":
                              return _context.stop();
                          }
                        }, _callee);
                      }));
                      return function (_x6) {
                        return _ref3.apply(this, arguments);
                      };
                    }());
                  case 11:
                  case "end":
                    return _context2.stop();
                }
              }, _callee2);
            }));
            return function (_x5) {
              return _ref2.apply(this, arguments);
            };
          }());
        case 4:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function (_x4) {
    return _ref.apply(this, arguments);
  };
}());

/**
 * When the user inputs a invalid media type this function re-asks for input
 * @param {*} YTURL URL of the playlist which gets downloaded
 * @since v.1.0.0
 */
var retrymediatype = function retrymediatype(YTURL) {
  rl.question("".concat(colorCodes.bright, "Should the files have video and audio or only audio? (audio/video): ").concat(colorCodes.reset), /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(TYPE) {
      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            if (!(TYPE.toLowerCase().trim() === "audio")) {
              _context5.next = 4;
              break;
            }
            TYPE = "mp3";
            _context5.next = 10;
            break;
          case 4:
            if (!(TYPE.toLowerCase().trim() === "video")) {
              _context5.next = 8;
              break;
            }
            TYPE = "mp4";
            _context5.next = 10;
            break;
          case 8:
            console.log("".concat(colorCodes.yellow, "Please enter valid values").concat(colorCodes.reset));
            return _context5.abrupt("return", retrymediatype(YTURL));
          case 10:
            rl.question("".concat(colorCodes.bright, "Should duplicates be removed? (yes/no): ").concat(colorCodes.reset), /*#__PURE__*/function () {
              var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(DUPLICATE) {
                return _regeneratorRuntime().wrap(function _callee4$(_context4) {
                  while (1) switch (_context4.prev = _context4.next) {
                    case 0:
                      if (!(DUPLICATE.toLowerCase().trim() !== "yes" && DUPLICATE.toLowerCase().trim() !== "no")) {
                        _context4.next = 3;
                        break;
                      }
                      console.log("".concat(colorCodes.yellow, "Please enter a valid value").concat(colorCodes.reset));
                      return _context4.abrupt("return", retrydup());
                    case 3:
                      downloadPlaylist(String(YTURL), String(TYPE), String(DUPLICATE));
                    case 4:
                    case "end":
                      return _context4.stop();
                  }
                }, _callee4);
              }));
              return function (_x8) {
                return _ref5.apply(this, arguments);
              };
            }());
          case 11:
          case "end":
            return _context5.stop();
        }
      }, _callee5);
    }));
    return function (_x7) {
      return _ref4.apply(this, arguments);
    };
  }());
};

/**
 * When the user inputs a invalid link this function re-asks for input
 * @since v.1.0.0
 */
var retryurl = function retryurl() {
  rl.question("".concat(colorCodes.bright, "Paste your YouTube playlist link here: ").concat(colorCodes.reset), /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(YTURL) {
      return _regeneratorRuntime().wrap(function _callee8$(_context8) {
        while (1) switch (_context8.prev = _context8.next) {
          case 0:
            if (YTURL.includes("youtube.com")) {
              _context8.next = 3;
              break;
            }
            console.log("".concat(colorCodes.yellow, "Please enter a valid YouTube link").concat(colorCodes.reset));
            return _context8.abrupt("return", retryurl());
          case 3:
            rl.question("".concat(colorCodes.bright, "Should the files have video and audio or only audio? (audio/video): ").concat(colorCodes.reset), /*#__PURE__*/function () {
              var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(TYPE) {
                return _regeneratorRuntime().wrap(function _callee7$(_context7) {
                  while (1) switch (_context7.prev = _context7.next) {
                    case 0:
                      if (!(TYPE.toLowerCase().trim() === "audio")) {
                        _context7.next = 4;
                        break;
                      }
                      TYPE = "mp3";
                      _context7.next = 10;
                      break;
                    case 4:
                      if (!(TYPE.toLowerCase().trim() === "video")) {
                        _context7.next = 8;
                        break;
                      }
                      TYPE = "mp4";
                      _context7.next = 10;
                      break;
                    case 8:
                      console.log("".concat(colorCodes.yellow, "Please enter valid values").concat(colorCodes.reset));
                      return _context7.abrupt("return", retrymediatype(YTURL));
                    case 10:
                      rl.question("".concat(colorCodes.bright, "Should duplicates be removed? (yes/no): ").concat(colorCodes.reset), /*#__PURE__*/function () {
                        var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(DUPLICATE) {
                          return _regeneratorRuntime().wrap(function _callee6$(_context6) {
                            while (1) switch (_context6.prev = _context6.next) {
                              case 0:
                                if (!(DUPLICATE.toLowerCase().trim() !== "yes" && DUPLICATE.toLowerCase().trim() !== "no")) {
                                  _context6.next = 3;
                                  break;
                                }
                                console.log("".concat(colorCodes.yellow, "Please enter a valid value").concat(colorCodes.reset));
                                return _context6.abrupt("return", retrydup());
                              case 3:
                                downloadPlaylist(String(YTURL), String(TYPE), String(DUPLICATE));
                              case 4:
                              case "end":
                                return _context6.stop();
                            }
                          }, _callee6);
                        }));
                        return function (_x11) {
                          return _ref8.apply(this, arguments);
                        };
                      }());
                    case 11:
                    case "end":
                      return _context7.stop();
                  }
                }, _callee7);
              }));
              return function (_x10) {
                return _ref7.apply(this, arguments);
              };
            }());
          case 4:
          case "end":
            return _context8.stop();
        }
      }, _callee8);
    }));
    return function (_x9) {
      return _ref6.apply(this, arguments);
    };
  }());
};

/**
 * @param {*} YTURL URL of the playlist which gets downloaded
 * @param {*} TYPE type whether the files are just audio files or video files
 * When the user inputs a invalid value this function re-asks for input
 * @since v.1.3.0
 */
var retrydup = function retrydup(YTURL, TYPE) {
  rl.question("".concat(colorCodes.bright, "Should duplicates be removed? (yes/no): ").concat(colorCodes.reset), /*#__PURE__*/function () {
    var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(DUPLICATE) {
      return _regeneratorRuntime().wrap(function _callee9$(_context9) {
        while (1) switch (_context9.prev = _context9.next) {
          case 0:
            if (!(DUPLICATE.toLowerCase().trim() !== "yes" && DUPLICATE.toLowerCase().trim() !== "no")) {
              _context9.next = 3;
              break;
            }
            console.log("".concat(colorCodes.yellow, "Please enter a valid value").concat(colorCodes.reset));
            return _context9.abrupt("return", retrydup());
          case 3:
            downloadPlaylist(String(YTURL), String(TYPE), String(DUPLICATE));
          case 4:
          case "end":
            return _context9.stop();
        }
      }, _callee9);
    }));
    return function (_x12) {
      return _ref9.apply(this, arguments);
    };
  }());
};