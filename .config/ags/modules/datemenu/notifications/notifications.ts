const notifications = await Service.import("notifications")
const notifs = notifications.bind("notifications")

const Notification_Label = Widget.Box({
    class_name: "notification-label",
    children: [ 
        Widget.Label({
        label: "Notification Center",
        }),
        Widget.Button({
            hexpand: true,
            hpack: "end",
            child: Widget.Icon({icon: "indicator-trashindicator",}),
            on_clicked: notifications.clear,
        }),
    ],

})

function NotificationIcon({ app_entry, app_icon, image }) {
    if (image) {
        return Widget.Box({
            css: `background-image: url("${image}");`
                + "background-size: contain;"
                + "background-repeat: no-repeat;"
                + "background-position: center;",
        })
    }

    let icon = "dialog-information-symbolic"
    if (Utils.lookUpIcon(app_icon))
        icon = app_icon

    if (app_entry && Utils.lookUpIcon(app_entry))
        icon = app_entry

    return Widget.Box({
        child: Widget.Icon(icon),
    })
}

/** @param {import('resource:///com/github/Aylur/ags/service/notifications.js').Notification} n */
function Notification(n) {
    const icon = Widget.Box({
        vpack: "start",
        class_name: "icon",
        child: NotificationIcon(n),
    })

    const title = Widget.Label({
        class_name: "title",
        xalign: 0,
        justification: "left",
        hexpand: true,
        max_width_chars: 24,
        truncate: "end",
        wrap: true,
        label: n.summary,
        use_markup: true,
    })

    const body = Widget.Label({
        class_name: "body",
        hexpand: true,
        use_markup: true,
        xalign: 0,
        justification: "left",
        label: n.body,
        wrap: true,
    })

    const actions = Widget.Box({
        class_name: "actions",
        children: n.actions.map(({ id, label }) => Widget.Button({
            class_name: "action-button",
            on_clicked: () => {
                n.invoke(id)
                n.dismiss()
            },
            hexpand: true,
            child: Widget.Label(label),
        })),
    })

    return Widget.EventBox(
        {
            attribute: { id: n.id },
            on_primary_click: n.dismiss,
        },
        Widget.Box(
            {
                class_name: `notification ${n.urgency}`,
                vertical: true,
            },
            Widget.Box([
                icon,
                Widget.Box(
                    { vertical: true, spacing: 10, },
                    title,
                    Widget.Separator({}),
                    body,
                ),
            ]),
            actions,
        ),
    )
}

const Placeholder = () => Widget.Box({
    class_name: "placeholder",
    vertical: true,
    vpack: "center",
    hpack: "center",
    vexpand: true,
    hexpand: true,
    visible: notifs.as(n => n.length === 0),
    children: [
        Widget.Icon("silent"),
        Widget.Label("Your inbox is empty"),
    ],
})

function  NotificationList(monitor = 0){
     const list = Widget.Box({
        class_name: "notification-list",
        vertical: true,
        spacing: 10,
        visible: notifs.as(n => n.length > 0),
        children: notifications.popups.map(notification => Notification(notification)),
    })

    function onNotified(_, /** @type {number} */ id) {
        const n = notifications.getNotification(id)
        if (n)
            list.children = [Notification(n), ...list.children]
    }

    function onDismissed(_, /** @type {number} */ id) {
        list.children.find(n => n.attribute.id === id)?.destroy()
    }

    list.hook(notifications, onNotified, "notified")
        .hook(notifications, onDismissed, "dismissed")

    return Widget.Box({
        class_name: "notifications",
        css: "min-width: 400px; min-height: 2px;",
        vertical: true,
        spacing: 10,
        children: [ Notification_Label,
            Widget.Separator({}),
            Widget.Box({children:[ list, Placeholder(),],}) ],

            /** this is a simple one liner that could be used instead of
                hooking into the 'notified' and 'dismissed' signals.
                but its not very optimized becuase it will recreate
                the whole list everytime a notification is added or dismissed */
            // children: notifications.bind('popups')
            //     .as(popups => popups.map(Notification))
        })
}   



export function Notifications() {
    return Widget.Box({
        css: "min-width: 400px;",
        children: [ NotificationList(), ],
    })
}
