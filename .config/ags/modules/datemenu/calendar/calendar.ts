
const calendar = Widget.Calendar({
    class_name: "calendar",
})

const date = Variable("",{
    poll: [1000, ['bash', '-c', 'TZ="Europe/Stockholm" date "+%H:%M"']],
})

const clock = Widget.Label({
    class_name: "clock",
    css: "font-size: 100;",
    label: date.bind(),
})

export const Calendar = () => Widget.Box({
    vertical: true,
    class_name: "calendar-pillar",
    spacing: 10,
    children: [
        clock,
        calendar,
    ],
})
