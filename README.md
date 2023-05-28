# PlaylistVortex
## Features
- Download all videos from a YouTube playlist
- Save videos (or audios) to your local machine
- Simple and easy-to-use command-line interface
## Requirements
- Node.js version 18 or higher (may also run on lower versions but not guaranteed)
- npm (Node Package Manager)
## Usage
To download a YouTube playlist, follow these steps:

Obtain the URL of the YouTube playlist you want to download.
Open a terminal or command prompt and navigate to the project directory.
Run the following command:
1. Obtain the URL of the YouTube playlist you want to download.
2. Open a terminal or command prompt and navigate to the project directory.
3. Run the following command:
`
PlaylistVortex.js --url <playlist_url>
`
Replace <playlist_url> with the URL of the YouTube playlist you want to download.
Additional options:

`--type <type>`: Specify the file type. Available options are "mp3" and "mp4" (default: "mp4").
`--noduplicate`: Specifies whether duplicates are removed from the playlist or not, when given duplicates are removed (default: false)
## License
This project is licensed under the [MIT License](https://github.com/Schleimfresse/PlaylistVortex/blob/main/LICENSE).
## Disclaimer
This tool is intended for personal use only. Respect the intellectual property rights of the content creators and do not use this tool for unauthorized or illegal purposes.
