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

const colorCodes = {
	reset: "\x1b[0m",
	red: "\x1b[31m",
	green: "\x1b[32m",
	yellow: "\x1b[33m",
	bright: "\x1b[1m",
};

async function downloadPlaylist(playlistUrl, ext) {
	try {
		const playlistId = await ytpl.getPlaylistID(playlistUrl);
		const playlistInfo = await ytpl(playlistId);

		const downloadsPath = path.join(os.homedir(), "Downloads");
		const playlistTitle = playlistInfo.title.replace(/[^\w\s]/gi, "");
		const playlistFolderPath = path.join(downloadsPath, playlistTitle);
		fs.mkdirSync(playlistFolderPath);

		const progressBar = new SingleBar(
			{
				format: `${colorCodes.bright + colorCodes.green}Downloading: ${
					colorCodes.reset + "{bar}"
				} | {percentage}% | {value}/{total} bytes`,
				barCompleteChar: "\u2588",
				barIncompleteChar: "\u2591",
				hideCursor: true,
			},
			Presets.shades_classic
		);

		progressBar.start(100, 0);

		for (const videoInfo of playlistInfo.items) {
			const videoTitle = videoInfo.title.replace(/[^\w\s]/gi, "");
			const videoUrl = videoInfo.shortUrl;
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
			let totalBytes = 0;

			videoStream.on("response", (response) => {
				totalBytes = parseInt(response.headers["content-length"]);
				progressBar.setTotal(totalBytes);
			});

			videoStream.on("data", (chunk) => {
				progressBar.increment(chunk.length);
			});

			videoStream.pipe(fileStream);

			await new Promise((resolve, reject) => {
				videoStream.on("end", resolve);
				videoStream.on("error", reject);
			});

			progressBar.update(0);
			console.log(`${colorCodes.bright + colorCodes.green}Downloaded: ${colorCodes.reset + videoTitle}`);
		}

		progressBar.stop();
		console.log(`${colorCodes.green}Playlist download completed.`);
	} catch (error) {
		console.error(`${colorCodes.red}An error occurred:`, error);
	}
}

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
