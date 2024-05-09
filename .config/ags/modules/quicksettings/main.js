import { Header } from './header/header.js'
import { Sliders } from './center/sliders.js'
import { Cluster } from './center/cluster.js'
import { Media } from './center/media.js'
import { Weather } from './footer/weather.ts'


const WINDOW_NAME = "Quicksettings"

const Title = Widget.Box({
	child: Widget.Label({label: WINDOW_NAME}),
})


export function Quicksettings() {
	return Widget.Window({
		name: WINDOW_NAME,
		anchor: ['top', 'right'],
		margins: [5, 5, 0, 0],
        keymode: "exclusive",
		css: "background-color: transparent;",
		setup: self => self.keybind("Escape", () => {
			App.closeWindow(WINDOW_NAME)
		}),
		visible: false,
		child: Widget.Box({
			class_name: "quicksettings",
			vertical: true,
            spacing: 20,
			children: [
				Header(),
				Sliders(),
				Cluster(),
		        Media(),
                Weather(),
            ],

		}),
	})
}
