import weather from '../../../services/weather.ts'

export function Weather() {
    return Widget.Box({
        class_name: "qs-weather",
        vertical: false,
        children:[
            Widget.Box({
                vertical: true,
                hexpand: true,
                hpack: "center",
                spacing: 10,
                children: [
                    Widget.Label({
                        setup: self => self.hook(weather, (self, City) => {
                            self.label = ` SE, ${weather['city']}`;
                        }),
                    }),
                    Widget.Label({
                        css: "font-size: 40;",
                        setup: self => self.hook(weather, (self, Temp) => {
                            self.label = `${weather['temp']}°C`;
                        }),
                    }),
                ],
            }),
            Widget.Separator({vertical: true,}),
            Widget.Box({
                vertical: true,
                hexpand: true,
                hpack: "center",
                spacing: 10,
                children: [
                    Widget.Label({
                        setup: self => self.hook(weather, (self, Weather) => {
                            self.label = `${weather['weather']}`;
                        }),
                    }),
                    Widget.Icon({
                        size: 60,
                        setup: self => self.hook(weather, (self, Icon) => {
                            self.icon = `${weather['icon']}`;
                        }),
                    }),
                ],
            }),
        ],
    })
}
