const hyprland = await Service.import("hyprland")
const audio = await Service.import("audio")
const systemtray = await Service.import("systemtray")

import { Clock } from './clock/clock.js'
import { SysTray } from './tray/tray.js'
import { Media } from './media/media.js'
import { Powermenu } from './powermenu/powermenu.js'
import Workspaces from './workspaces/ws.js'
import QsToggle from './quicksettings/qs.js'
import { Notifs } from './notifications/notifs.ts'
import { ColorPicker } from './colorpicker/colorpicker.ts'

function ClientTitle() {
    const Title = hyprland.active.client.bind("title").as(t => `${t === "" ? "Desktop" : t }`);
    return Widget.Label({
        class_name: "active",
        label: Title,
        truncate: "end",
        maxWidthChars: 32,
    })
}


// layout of the bar
function Left() {
    return Widget.Box({
        spacing: 8,
        children: [
            Workspaces(),
	    ClientTitle(),
        ],
    })
}

function Center() {
    return Widget.Box({
        spacing: 8,
        children: [
	    Media(),
        Clock(),
        Notifs(),
	],
    })
}

function Right() {
    return Widget.Box({
        hpack: "end",
        spacing: 2,
        children: [
        ColorPicker(),
	    QsToggle(),
	    SysTray(),
            Powermenu(),
        ],
    })
}


export function Bar(monitor = 0) {
    return Widget.Window({
        name: `bar-${monitor}`, // name has to be unique
        class_name: "bar",
        monitor,
        anchor: ["top", "left", "right"],
        margins: [ 5, 5, 0, 5,],
        exclusivity: "exclusive",
        child: Widget.CenterBox({
	    css: 'padding: 5px 0px 5px 0px;',
	    start_widget: Left(),
            center_widget: Center(),
            end_widget: Right(),
        }),
    })
}

