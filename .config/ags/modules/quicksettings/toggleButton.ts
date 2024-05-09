const opened = Variable(false)

export const menu = ({ name, icon, title, content = Gtk.Widget, open,}) => Widget.Revealer({
    revealChild: opened.bind(),
    transition: "slide_down",
    child: Widget.Box({
        class_names: ["menu", name],
        vertical: true,
        children: [
            Widget.Separator(),
            Widget.Box({
                vertical: true,
                class_name: "content vertical",
                children: content,
            }),
        ],
    }),
})

export function toggleButton({name, child, setup, ...rest}) {
    return Widget.Button({
        //visible: opened.bind().as(v => v ? false : true),
        child: Widget.Box ({ child }),
        on_clicked: () => opened.value = !opened.value,
    })
}
            
