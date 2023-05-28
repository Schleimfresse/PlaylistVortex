import ytdl from "ytdl-core";
import ytpl from "ytpl";
import fs from "fs";
import readline from "readline";
import os from "os";
import path from "path";
import { SingleBar, Presets } from "cli-progress";
import argv from "./config/argsConfig.mjs";
import userInputHandler from "./util/userInputHandler.mjs";
process.stdout.setEncoding("utf-8");
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

const playlistUrl = argv.url;
const type = argv.type;
const duplicate = argv.noduplicates;

/**
 * All color codes which are needed; used to color text in the console
 */
const colorCodes = {
	reset: "\x1b[0m",
	red: "\x1b[31m",
	green: "\x1b[32m",
	yellow: "\x1b[33m",
	bright: "\x1b[1m",
};
/**
 * Generates a 6 digit code in case a folder which is supposed to be generated for a downloaded playlist already exists
 * @returns a random 6 digit generated code
 * @since v.1.1.0
 */
const generateRandomCode = () => {
	const characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	let code = "";

	for (let i = 0; i < 6; i++) {
		const randomIndex = Math.floor(Math.random() * characters.length);
		code += characters[randomIndex];
	}

	return " " + code;
};

/**
 * main function
 * @param {string} playlistUrl URL of the playlist which gets downloaded
 * @param {string} ext extention for the files
 * @param {boolean} duplicate when true duplicates in the playlists gets removed
 * @async
 * @since v1.0.0
 */
async function downloadPlaylist(playlistUrl, ext, duplicate) {
	try {
		const playlistId = await ytpl.getPlaylistID(playlistUrl);
		let playlistInfo = await ytpl(playlistId);
		if (duplicate) {
			let plural = "s were";
			const playlistInfo_Items = playlistInfo.items.filter((item, index, self) => {
				return self.findIndex((i) => i.id === item.id) === index;
			});
			const duplicatesRemoved = playlistInfo.items.length - playlistInfo_Items.length;
			playlistInfo.items = playlistInfo_Items;
			if (duplicatesRemoved === 1) {
				plural = " was";
			}
			console.log(`${duplicatesRemoved} duplicate${plural} removed`);
		} else {
			console.log("Duplicate removal: disabled");
		}
		const downloadsPath = path.join(os.homedir(), "Downloads");
		let playlistTitle = playlistInfo.title.replace(/[<>:"/\\|?*\x00-\x1F]/g, "_");
		let playlistFolderPath = path.join(downloadsPath, playlistTitle);
		let folderExists = fs.existsSync(playlistFolderPath);
		while (folderExists) {
			console.warn(
				`${colorCodes.yellow}Folder at "${playlistFolderPath}" already exists. Generating code for folder name...${colorCodes.reset}`
			);
			playlistTitle = playlistTitle + generateRandomCode();
			playlistFolderPath = path.join(downloadsPath, playlistTitle);
			folderExists = fs.existsSync(playlistFolderPath);
		}
		fs.mkdirSync(playlistFolderPath);

		const progressBar = new SingleBar(
			{
				format: `${colorCodes.bright + colorCodes.green}Downloading: ${colorCodes.reset + "{title}"} | ${
					"{tracknumber}" + "/" + "{trackstotal}"
				} | {bar} | {percentage}% | {value}/{total} bytes`,
				barCompleteChar: "\u2588",
				barIncompleteChar: "\u2591",
				hideCursor: true,
			},
			Presets.shades_classic
		);
		let plural = "s were";
		if (playlistInfo.items.length === 1) {
			plural = " was";
		}
		console.log(`${colorCodes.reset + playlistInfo.items.length} element${plural} found...`);
		for (const videoInfo of playlistInfo.items) {
			const videoTitle = videoInfo.title.replace(/[<>:"/\\|?*\x00-\x1F]/g, "_");
			const videoUrl = videoInfo.shortUrl;

			await new Promise((resolve, reject) => {
				progressBar.start(100, 0, {
					title: videoTitle,
					tracknumber: playlistInfo.items.indexOf(videoInfo) + 1,
					trackstotal: playlistInfo.items.length,
				});

				let videoStream;
				switch (ext) {
					case "mp4":
						videoStream = ytdl(videoUrl, { format: ext, filter: "videoandaudio", quality: "highestvideo" });
						break;
					case "mp3":
						videoStream = ytdl(videoUrl, { format: ext, filter: "audioonly", quality: "highestaudio" });
						break;
					default:
						throw new Error("No format was specified.");
				}

				const fileStream = fs.createWriteStream(path.join(playlistFolderPath, `${videoTitle}.${ext}`));

				let receivedBytes = 0;
				let totalBytes = 0;

				videoStream.on("response", (response) => {
					totalBytes = parseInt(response.headers["content-length"]);
					progressBar.setTotal(totalBytes);
				});

				videoStream.on("data", (chunk) => {
					receivedBytes += chunk.length;
					progressBar.update(receivedBytes, {
						title: videoTitle,
						tracknumber: playlistInfo.items.indexOf(videoInfo) + 1,
					});
				});

				videoStream.pipe(fileStream);

				fileStream.on("finish", () => {
					progressBar.stop();
					console.log(`${colorCodes.bright + colorCodes.green}Downloaded: ${colorCodes.reset + videoTitle}`);
					resolve();
				});

				videoStream.on("error", (error) => {
					reject(error);
				});
			});
		}
		console.log(`${colorCodes.green}Playlist download completed.${colorCodes.reset}`);
		progressBar.stop();
	} catch (error) {
		console.error(`${colorCodes.red}An error occurred:${colorCodes.reset}`, error);
	} finally {
		rl.close();
		process.exit(0);
	}
}

if (!playlistUrl) {
	console.log("No arguments provided, using interactive command-line interface (CLI) for input...");
	rl.question(
		`${colorCodes.bright}Paste your YouTube playlist link here: ${colorCodes.reset}`,
		async (YTURL) => {
			if (!YTURL.includes("youtube.com")) {
				console.log(`${colorCodes.yellow}Please enter a valid YouTube link${colorCodes.reset}`);
				return userInputHandler.retryurl();
			}
			rl.question(
				`${colorCodes.bright}Should the files have video and audio or only audio? (mp3/mp4): ${colorCodes.reset}`,
				async (TYPE) => {
					if (TYPE.toLowerCase().trim() !== "mp3" && TYPE.toLowerCase().trim() !== "mp4") {
						console.log(`${colorCodes.yellow}Please enter valid values${colorCodes.reset}`);
						return retrymediatype(YTURL);
					}
					rl.question(
						`${colorCodes.bright}Should duplicates be removed? (true/false): ${colorCodes.reset}`,
						async (DUPLICATE) => {
							if (DUPLICATE.toLowerCase().trim() !== "true" && DUPLICATE.toLowerCase().trim() !== "false") {
								console.log(`${colorCodes.yellow}Please enter a valid value${colorCodes.reset}`);
								return userInputHandler.retrydup();
							}
							downloadPlaylist(String(YTURL), String(TYPE), JSON.parse(DUPLICATE));
						}
					);
				}
			);
		}
	);
} else {
	downloadPlaylist(playlistUrl, type, duplicate);
}
