import { toggleButton } from '../toggleButton.ts'

const network = await Service.import('network')
const n = await Service.import("notifications")
const dnd = n.bind("dnd")

const audio = await Service.import('audio')

const volumeIndicator = Widget.Box({
    child: Widget.Icon().hook(audio.speaker, self => {
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
    }),
})


const NetworkIndicator = () => Widget.Icon().hook(network, self => {
    const icon = network[network.primary || "wifi"]?.icon_name
    self.icon = icon || ""
    self.visible = !!icon
})

const DND = () => Widget.Icon({
    icon: dnd.as(dnd => dnd ? "notification-disabled-symbolic" : "notification-symbolic"),
    visible: dnd.as(dnd => dnd ? true : false),
})

const SysIndicators = () => Widget.Box({
    spacing: 5,
    children: [
        NetworkIndicator(),
        DND(),
        volumeIndicator,
    ],
})

export default() => Widget.EventBox({
    class_name: "bar-qs",
    child: toggleButton({
            window: "Quicksettings",
            on_clicked: () => App.toggleWindow("Quicksettings"),
            child: SysIndicators(),
        }),
    on_scroll_up: () => audio.speaker.volume += 0.02,
    on_scroll_down: () => audio.speaker.volume -= 0.02,
})

