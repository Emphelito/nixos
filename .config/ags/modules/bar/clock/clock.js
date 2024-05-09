import { toggleButton } from '../toggleButton.ts'

const date = Variable("",{
	poll: [1000, ['bash', '-c', 'TZ="Europe/Stockholm" date "+%H:%M %b %e."']],
})

export function Clock() {
	return Widget.Box({
        class_name: "bar-clock", 
        child: toggleButton({
            window: "Datemenu",
            on_clicked: () => App.toggleWindow("Datemenu"),
            child: Widget.Label({
                label: date.bind(),
            }),
        }),
	})
}
