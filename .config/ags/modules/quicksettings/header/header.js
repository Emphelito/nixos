const image = '/home/emph/.local/share/user/Avatar.jpg'
const size = 92
const Action = {
	SLEEP: { icon: 'weather-clear-night', cmd: '' },
	REBOOT: { icon: 'system-reboot-symbolic', cmd: 'reboot now' },
	LOGOUT: { icon: 'system-log-out-symbolic', cmd: 'hyprctl dispatch exit' },
	SHUTDOWN: { icon: 'system-shutdown-panel', cmd: 'shutdown now' },
	SETTINGS: { icon: 'settings', cmd: '' }
};


const Avatar = () => Widget.Box({
	class_name: "qs-avatar",
	css: `min-width: ${size}px;`
	+	`min-height: ${size}px;`
	+       `background-image: url('${image}');`
	+	`background-size: cover;`
	+	`border-radius: 50px;`,
})

function SysHeader(action){
	return Widget.Button({
		vpack: "center",
		child: Widget.Icon({
			icon: action.icon,
			size: 30,
		}),
		on_clicked: () => Utils.execAsync('bash-c, `${action.icon}`'),
	})
}


export const Header = () => Widget.Box(
	{ class_name: "qs-header", css: "min-width: 400px;" },    
	Avatar(),
	Widget.Box({
        hexpand: true,
        hpack: "end",
		children: [
			SysHeader(Action.SETTINGS),
			SysHeader(Action.LOGOUT),
			SysHeader(Action.REBOOT),
			SysHeader(Action.SHUTDOWN),
		],
	})
)
