const audio = await Service.import('audio')
const icondir = "/usr/share/icons/rose-pine-icons/16x16/panel/"

const volumeIndicator = Widget.Icon().hook(audio.speaker, self => {
        const vol = audio.speaker.volume * 100;
        const icon = [
            [101, 'overamplified'],
            [67, 'high'],
            [34, 'medium'],
            [1, 'low'],
            [0, 'muted'],
        ].find(([threshold]) => threshold <= vol)?.[1];

        self.icon = `audio-volume-${icon}-symbolic`;
        self.tooltip_text = `Volume ${Math.floor(vol)}%`;
})

const Micicon = () => audio.microphone.is_muted || audio.microphone.stream?.is_muted
    ? `${icondir}mic-off.svg`
    : `${icondir}mic-ready.svg`

const micIndicator = Widget.Icon({
    icon: Utils.watch(Micicon(), audio.microphone, Micicon),
})

const VolumeSlider = (type = 'speaker') => Widget.Slider({
	class_name: "qs-slider",
	inverted: false,
	vertical: false,
    	hexpand: true,
    	drawValue: false,
    	onChange: ({ value }) => audio[type].volume = value,
    	value: audio[type].bind('volume'),
})

export function Sliders(){
	return Widget.Box({
		class_name: "qs-sliders",
		//vpack: "center",
		//hpack: "center",
		hexpand: true,
		vertical: true,
		spacing: 20,
		children: [
            Widget.Box({
                spacing: 10,
                children:[ volumeIndicator,
                    VolumeSlider('speaker'),
                ],
            }),
            Widget.Box({
                spacing: 10,
                children: [ micIndicator,
			        VolumeSlider('microphone'),
                ],
            }),
		],
	})
}


