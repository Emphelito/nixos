const notifications = await Service.import("notifications")
const notifs = notifications.bind("notifications")

export function Notifs(){
    return Widget.Box({
        class_name: "bar-notifs",
        child: Widget.Icon({
            icon: notifs.as(n => n.length > 0 ? "notification-new-symbolic" : ""),  
            }),
    })
}
    
