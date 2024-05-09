export function Powermenu() {
	return Widget.Box({
		class_name: "bar-powermenu",
		child: Widget.Button({
			on_clicked: () => Utils.execAsync(['bash', '-c', 'ags -t Powermenu']),
			child: Widget.Icon({		
				icon: "/usr/share/icons/rose-pine-icons/16x16/apps/system-shut-down.svg",
				size: 20,
			}),
		})
	})
}

