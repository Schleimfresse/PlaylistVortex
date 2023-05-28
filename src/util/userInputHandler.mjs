let userInputHandler = {};
/**
 * When the user inputs a invalid media type this function re-asks for input
 * @param {*} YTURL URL of the playlist which gets downloaded
 * @since v.1.0.0
 */
userInputHandler.retrymediatype = (YTURL) => {
	rl.question(
		`${colorCodes.bright}Should the files have video and audio or only audio? (audio/video): ${colorCodes.reset}`,
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
						return retrydup();
					}
					downloadPlaylist(String(YTURL), String(TYPE), JSON.parse(DUPLICATE));
				}
			);
		}
	);
};

/**
 * When the user inputs a invalid link this function re-asks for input
 * @since v.1.0.0
 */
userInputHandler.retryurl = () => {
	rl.question(
		`${colorCodes.bright}Paste your YouTube playlist link here: ${colorCodes.reset}`,
		async (YTURL) => {
			if (!YTURL.includes("youtube.com")) {
				console.log(`${colorCodes.yellow}Please enter a valid YouTube link${colorCodes.reset}`);
				return retryurl();
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
								return retrydup();
							}
							downloadPlaylist(String(YTURL), String(TYPE), JSON.parse(DUPLICATE));
						}
					);
				}
			);
		}
	);
};

/**
 * @param {*} YTURL URL of the playlist which gets downloaded
 * @param {*} TYPE type whether the files are just audio files or video files
 * When the user inputs a invalid value this function re-asks for input
 * @since v.1.3.0
 */
userInputHandler.retrydup = (YTURL, TYPE) => {
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
};

export default userInputHandler;
