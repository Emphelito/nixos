import { Calendar } from './calendar/calendar.ts'
import { Notifications } from './notifications/notifications.ts'

const WINDOW_NAME = "Datemenu"

export function Datemenu() {
    return Widget.Window({
        name: WINDOW_NAME,
        anchor: ['top'],
        margins: [5, 0, 0, 0],
        keymode: "exclusive",
        setup: self => self.keybind("Escape", () => {
            App.closeWindow(WINDOW_NAME)
        }),
        css: "background-color: transparent;",
        visible: false,
        child: Widget.Box({
            class_name: "datemenu",
            spacing: 20,
            children: [Notifications(),
                Calendar()],
        }),
    })
}
