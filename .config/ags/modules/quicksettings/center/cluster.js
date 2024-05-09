import Gtk from "gi://Gtk?version=3.0"
const bluetooth = await Service.import('bluetooth')
const { wifi } = await Service.import("network")
const audio = await Service.import('audio')
const n = await Service.import("notifications")

import { menu, toggleButton } from '../toggleButton.ts'

const opened = Variable(false)

const iconSize = 45
const icondir = "/usr/share/icons/rose-pine-icons/16x16/panel/"

const BluetoothToggle = Widget.Box({
	//css: bluetooth.bind("enabled").as(on => `${on ? '' : 'background-color: #31748f;'}`),
    class_name: "arrowtoggle",
	children: [
        Widget.Icon({
		    icon: `bluetooth-symbolic`,
		    size: iconSize,
	    }),
        Widget.Label({
            label: Utils.watch("Disabled", bluetooth, () => {
                if (!bluetooth.enabled)
                    return "Disabled"

                if (bluetooth.connected_devices.length === 1)
                    return bluetooth.connected_devices[0].alias

                return `${bluetooth.connected_devices.length} Connected`
                }),      
        }),
        Widget.Button({
            hpack: "end",
            hexpand: true,
            child:Widget.Icon({
                icon: "down",
            }),
        }),
    ],
})
export const NetworkToggle = () => Widget.Box({
    class_name: "arrowtoggle",
    hexpand:true,
    children:[ 
        Widget.Box({ children: [
            Widget.Icon({ icon: wifi.bind("icon_name"), size: iconSize}),
            Widget.Label({ label: wifi.bind("ssid").as(ssid => ssid || "Not Connected"), truncate: 'end', }),
        ],
        }),

        toggleButton({
            name: "network",
            hexpand: true,
            hpack: "end",
            child: Widget.Icon({icon:"down"}),
        }),
    ],
})
const InternetToggle = () => menu({
    name: "network",
    icon: wifi.bind("icon_name"),
    title: "Wifi Selection",
    open: opened.bind().as(v => v ? true : false),
    content: [
        Widget.Box({
            vertical: true,
            setup: self => self.hook(wifi, () => self.children =
                wifi.access_points.map(ap => Widget.Button({
                    on_clicked: () => {
                        if (dependencies("nmcli"))
                            Utils.execAsync(`nmcli device wifi connect ${ap.bssid}`)
                    },
                    child: Widget.Box({
                        children: [
                            Widget.Icon(ap.iconName),
                            Widget.Label(ap.ssid || ""),
                            Widget.Icon({
                                icon: "checkmark",
                                hpack: "fill",
                                setup: self => Utils.idle(() => {
                                    if (!self.is_destroyed)
                                        self.visible = ap.active
                                }),
                            }),
                        ],
                    }),
                })),
            ),
        }),
        Widget.Separator(),
        Widget.Button({
            on_clicked: () => open = false,
            child: Widget.Box({
                children: [
                    Widget.Icon("settings"),
                    Widget.Label("Network"),
                ],
            }),
        }),
    ],
})

const dnd = n.bind("dnd")

export const DNDToggle = () => Widget.Button({
	child: Widget.Icon({
    		icon: dnd.as(dnd => dnd ? "notification-disabled-symbolic" : "notification-symbolic"),
		size: iconSize,
	}),
    	on_clicked: () => n.dnd = !n.dnd,
})

const Micicon = () => audio.microphone.is_muted || audio.microphone.stream?.is_muted
    ? `microphone-sensitivity-muted-symbolic`
    : `microphone-sensitivity-high-symbolic`


const MicToggle = Widget.Button({
	class_name: "",
	child: Widget.Icon({
		icon: Utils.watch(Micicon(), audio.microphone, Micicon), 
		size: iconSize,
	}),
	on_clicked: () => audio.microphone.is_muted = !audio.microphone.is_muted,
})

const WpSwitch = Widget.Button({
    class_name: "",
    child: Widget.Icon({
        icon: "image-x-generic-symbolic",
        size: iconSize,
    }),
    on_clicked: () => App.toggleWindow("ThemeSettings"),
})

const ThemeSwitch = Widget.Button({
    child: Widget.Icon({
        icon: "display-brightness-high-symbolic",
        size: iconSize,
    }),
})

export function Cluster() {
	return Widget.CenterBox({
		vpack: "center",
		class_name: "qs-cluster",
        css: "min-width: 400px;",
		vertical: false,
		startWidget: Widget.Box({
                class_name: "toggle-cluster",
                vertical: true,
				children: [
                    Widget.Box({
                        children: [ DNDToggle(), MicToggle, ],}),
                    Widget.Box({
                        children: [ WpSwitch, ThemeSwitch, ],}),
					],
			}),
		endWidget: Widget.Box({
                //class_name: "arrowtoggle",
                vertical: true,
				children: [BluetoothToggle,
					NetworkToggle(), InternetToggle()],
			}),
	})
}
