const mpris = await Service.import('mpris')
const players = mpris.bind("players")

const SPOTIFY_ICON = "/usr/share/icons/rose-pine-icons/16x16/panel/spotify-indicator.svg"

function Media_Controll(player) {
	const Player = Widget.Button({
		child: Widget.Icon({
			icon: SPOTIFY_ICON,
			size: 20,
			class_name: "bar_media_icon",
		}),
		on_clicked: () => player.playPause(),
	})
	const Title = Widget.Label({
		label: player.bind("track_title"),
	})
	return Widget.Box([
		Player,
		//Title,
	])
}

export function Media() {
	return Widget.Box({
		class_name: "bar-media",
		children: players.as(p => p.filter(player => player.name === "spotify").map(Media_Controll)),
	})
}
