import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";

/**
 * Config for arguments
 * @since 1.4.0
 */
const argv = yargs(hideBin(process.argv))
	.option("url", {
		describe: "Paste your YouTube playlist link (use quotation marks or you get an error since some characters are not supported in the command prompt)",
		type: "string",
		demandOption: false,
		coerce: (url) => {
			if (!url.includes("youtube.com")) {
				throw new Error("Please enter a valid YouTube link");
			}
			return url;
		},
		alias: "u",
	})
	.option("type", {
		describe: "Should the files have video and audio or only audio?",
		type: "string",
		choices: ["mp3", "mp4"],
		demandOption: false,
		default: "mp4",
		alias: "t",
	})
	.option("noduplicates", {
		describe: "Should duplicates be removed?",
		type: "boolean",
		demandOption: false,
		default: false,
		alias: "d",
	}).argv;
export default argv;
