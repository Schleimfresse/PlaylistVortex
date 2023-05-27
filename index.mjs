import ytdl from "ytdl-core";
import ytpl from "ytpl";
import fs from "fs";
import readline from "readline";
import os from "os";
import path from "path";
import { SingleBar, Presets } from "cli-progress";

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

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
 *
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
 * @param {*} playlistUrl URL of the playlist which gets downloaded
 * @param {*} ext extention for the files
 * @async
 * @since v1.0.0
 */
async function downloadPlaylist(playlistUrl, ext) {
	try {
		const playlistId = await ytpl.getPlaylistID(playlistUrl);
		const playlistInfo = await ytpl(playlistId);

		const downloadsPath = path.join(os.homedir(), "Downloads");
		let playlistTitle = playlistInfo.title.replace(/[^\w\s]/gi, "");
		let playlistFolderPath = path.join(downloadsPath, playlistTitle);
		console.log(playlistTitle);
		let folderExists = fs.existsSync(playlistFolderPath);
		while (folderExists) {
			console.warn(
				`${colorCodes.yellow}Folder at ${playlistFolderPath} already exists! Generating code for folder name...${colorCodes.reset}`
			);
			playlistTitle = playlistTitle + generateRandomCode();
			playlistFolderPath = path.join(downloadsPath, playlistTitle);
			console.log(playlistTitle, playlistFolderPath);
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

		progressBar.start(100, 0, { trackstotal: playlistInfo.items.length });

		for (const videoInfo of playlistInfo.items) {
			const videoTitle = videoInfo.title.replace(/[^\w\s]/gi, "");
			const videoUrl = videoInfo.shortUrl;
			progressBar.update(0, { title: videoTitle, tracknumber: playlistInfo.items.indexOf(videoInfo) + 1 });
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
				progressBar.update(receivedBytes);
			});

			videoStream.pipe(fileStream);

			await new Promise((resolve, reject) => {
				videoStream.on("end", resolve);
				videoStream.on("error", reject);
			});

			console.log(`\n${colorCodes.bright + colorCodes.green}Downloaded: ${colorCodes.reset + videoTitle}`);
		}

		progressBar.stop();
		console.log(`${colorCodes.green}Playlist download completed.${colorCodes.reset}`);
	} catch (error) {
		console.error(`${colorCodes.red}An error occurred:${colorCodes.reset}`, error);
	} finally {
		rl.close();
		process.exit(1);
	}
}

/**
 * User input
 * @since v.1.0.0
 */
rl.question(
	`${colorCodes.bright}Paste your YouTube playlist link here: ${colorCodes.reset}`,
	async (YTURL) => {
		if (!YTURL.includes("youtube.com")) {
			console.log(`${colorCodes.yellow}Please enter a valid YouTube link${colorCodes.reset}`);
			return retryurl();
		}
		rl.question(
			`${colorCodes.bright}Should the files have video and audio or only audio? (audio/video): ${colorCodes.reset}`,
			async (TYPE) => {
				if (TYPE.toLowerCase().trim() === "audio") {
					TYPE = "mp3";
				} else if (TYPE.toLowerCase().trim() === "video") {
					TYPE = "mp4";
				} else {
					console.log(`${colorCodes.yellow}Please enter valid values${colorCodes.reset}`);
					return retrymediatype(YTURL);
				}
				downloadPlaylist(String(YTURL), String(TYPE));
			}
		);
	}
);

/**
 * When the user inputs a invalid media type this function re-asks for input
 * @param {*} YTURL URL of the playlist which gets downloaded
 * @since v.1.0.0
 */
const retrymediatype = (YTURL) => {
	rl.question(
		`${colorCodes.bright}Should the files have video and audio or only audio? (audio/video): ${colorCodes.reset}`,
		async (TYPE) => {
			if (TYPE.toLowerCase().trim() === "audio") {
				TYPE = "mp3";
			} else if (TYPE.toLowerCase().trim() === "video") {
				TYPE = "mp4";
			} else {
				console.log(`${colorCodes.yellow}Please enter valid values${colorCodes.reset}`);
				return retrymediatype(YTURL);
			}
			downloadPlaylist(String(YTURL), String(TYPE));
		}
	);
};

/**
 * When the user inputs a invalid link this function re-asks for input
 * @since v.1.0.0
 */
const retryurl = () => {
	rl.question(
		`${colorCodes.bright}Paste your YouTube playlist link here: ${colorCodes.reset}`,
		async (YTURL) => {
			if (!YTURL.includes("youtube.com")) {
				console.log(`${colorCodes.yellow}Please enter a valid YouTube link${colorCodes.reset}`);
				return retryurl();
			}
			rl.question(
				`${colorCodes.bright}Should the files have video and audio or only audio? (audio/video): ${colorCodes.reset}`,
				async (TYPE) => {
					if (TYPE.toLowerCase().trim() === "audio") {
						TYPE = "mp3";
					} else if (TYPE.toLowerCase().trim() === "video") {
						TYPE = "mp4";
					} else {
						console.log(`${colorCodes.yellow}Please enter valid values${colorCodes.reset}`);
						return retrymediatype(YTURL);
					}
					downloadPlaylist(String(YTURL), String(TYPE));
				}
			);
		}
	);
};
