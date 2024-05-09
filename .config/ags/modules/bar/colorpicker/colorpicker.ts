export function ColorPicker() {
    return Widget.Box({
        class_name: "bar-colorpicker",
        child: Widget.Button({
            child: Widget.Icon({
                icon: "color-select-symbolic",
            }),
            on_clicked: () => Utils.exec('zsh -c "hyprpicker | copyq copy -"')
        })
    })
}
