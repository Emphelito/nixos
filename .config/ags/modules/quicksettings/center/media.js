const mpris = await Service.import("mpris")
const players = mpris.bind("players")

const FALLBACK_ICON = "audio-x-generic-symbolic"
const PLAY_ICON = "media-playback-start-symbolic"
const PAUSE_ICON = "media-playback-pause-symbolic"
const PREV_ICON = "media-skip-backward-symbolic"
const NEXT_ICON = "media-skip-forward-symbolic"

/** @param {import('types/service/mpris').MprisPlayer} player */
function Player(player) {
    const img = Widget.Box({
        class_name: "img",
        vpack: "start",
        css: Utils.merge([
            player.bind("cover_path"),
            player.bind("track_cover_url"),
        ], (path, url, size) => `
            min-width: 100px;
            min-height: 100px;
            background-image: url('${path || url}');
            background-size: cover;
        `),
    })

    const title = Widget.Label({
        class_name: "title",
        hpack: "center",
	vpack: "end",
	vexpand: true,
        label: player.bind("track_title"),
        //player.bind("track_title").transform(a => a.length > 9 ? `${a.slice(0, 9)}...`: a),
    	
        //label: player.bind("track_title").transform(a => `${a.slice(0, 15)}...`),
    })

    const artist = Widget.Label({
        class_name: "artist",
        hpack: "center",
	vpack: "start",
	vexpand: true,
        label: player.bind("track_artists").transform(a => a.join(", ")),
        //label: player.bind("track_artists").transform(arr => {
  		//const transformedArtists = arr.map(a => a.length > 9 ? `${a.slice(0, 9)}...` : a);
  		//return transformedArtists[0];
	//}),
    })

    const playPause = Widget.Button({
        class_name: "play-pause",
        on_clicked: () => player.playPause(),
        visible: player.bind("can_play"),
        child: Widget.Icon({
            icon: player.bind("play_back_status").transform(s => {
                switch (s) {
                    case "Playing": return PAUSE_ICON
                    case "Paused":
                    case "Stopped": return PLAY_ICON
                }
            }),
        }),
    })

    const prev = Widget.Button({
        on_clicked: () => player.previous(),
        visible: player.bind("can_go_prev"),
        child: Widget.Icon(PREV_ICON),
    })

    const next = Widget.Button({
        on_clicked: () => player.next(),
        visible: player.bind("can_go_next"),
        child: Widget.Icon(NEXT_ICON),
    })

    return Widget.Box(
        { class_name: "qs-player"  },

        img,
        Widget.Box(
            {
                vertical: true,
                //hexpand: true,
            },
	    title,
            artist,
            Widget.Box({ vexpand: true }),
            Widget.Box({
		    hpack: "center",
		    hexpand: true,
		    children: [
                    prev,
                    playPause,
                    next,
		    ],
            }),
        ),
    )
}

export function Media() {
    return Widget.Box({
        vertical: true,
        class_name: "qs-player-top",
        //visible: players.as(p => p.map(Player => Player.name === "spotify" ? false : false)),
            css: "min-height: 2px; min-width: 2px;", // small hack to make it visible
            //visible: players.as(p => p.length > 0),
            children: players.as(p => p.filter(player => player.name === "spotify").map(Player)),
    })
}
