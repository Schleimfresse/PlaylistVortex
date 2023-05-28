"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _yargs = _interopRequireDefault(require("yargs/yargs"));
var _helpers = require("yargs/helpers");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * Config for arguments
 * @since 1.4.0
 */
var argv = (0, _yargs["default"])((0, _helpers.hideBin)(process.argv)).option("url", {
  describe: "Paste your YouTube playlist link (use quotation marks or you get an error since some characters are not supported in the command prompt)",
  type: "string",
  demandOption: false,
  coerce: function coerce(url) {
    if (!url.includes("youtube.com")) {
      throw new Error("Please enter a valid YouTube link");
    }
    return url;
  },
  alias: "u"
}).option("type", {
  describe: "Should the files have video and audio or only audio?",
  type: "string",
  choices: ["mp3", "mp4"],
  demandOption: false,
  "default": "mp4",
  alias: "t"
}).option("duplicates", {
  describe: "Should duplicates be removed?",
  type: "boolean",
  demandOption: false,
  "default": false,
  alias: "d"
}).argv;
var _default = argv;
exports["default"] = _default;