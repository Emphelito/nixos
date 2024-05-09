const WINDOW_NAME = "Powermenu"

const Action = {
    SLEEP: { icon: 'weather-clear-night-symbolic', cmd: 'systemctl suspend' },
    REBOOT: { icon: 'system-reboot-symbolic', cmd: 'systemctl reboot' },
    SHUTDOWN: { icon: 'system-shutdown-symbolic', cmd: 'shutdown now' },
    LOGOUT: { icon: 'system-log-out-symbolic', cmd: 'hyprctl dispatch exit' },
};

function SysAction(action){

    return Widget.Button({
        class_name:"powermenu-action",
        child: Widget.Icon({
            icon: action.icon,
            size: 200,
        }),
        on_clicked: () => { Utils.exec(action.cmd); }
    })
}


export function Powermenu() {
    return Widget.Window({
        name: WINDOW_NAME,
        keymode: "exclusive",
        css: "background-color: transparent;",
        setup: self => self.keybind("Escape", () => {
            App.closeWindow(WINDOW_NAME)
        }),
        visible: false,
        child: Widget.Box({
            class_name: "powermenu",
            children: [
                SysAction(Action.SLEEP),
                SysAction(Action.SHUTDOWN),
                SysAction(Action.REBOOT),
                SysAction(Action.LOGOUT),
            ],
        }),
    })
}

