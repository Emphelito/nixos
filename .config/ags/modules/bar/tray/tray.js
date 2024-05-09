const systemtray = await Service.import("systemtray")

export function SysTray() {
	const items = systemtray.bind("items")
		.as(items => items.map(item => Widget.Button({
			child: Widget.Icon({ icon: item.bind("icon"), size: 20, }),
			on_primary_click: (_, event) => item.activate(event),
			on_secondary_click: (_, event) => item.openMenu(event),
			tooltip_markup: item.bind("tooltip_markup"),
			class_name: "bar-tray-items",
		})))
	return Widget.Box({
		class_name: "bar-tray",
		css: "min-width: 100px;",
		children: items,
	})
}
