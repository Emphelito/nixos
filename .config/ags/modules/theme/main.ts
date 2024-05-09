import { backgroundPillar } from "./background/background.ts";

const WINDOW_NAME = "ThemeSettings";

export function Theme() {
  return Widget.Window({
    name: WINDOW_NAME,
    visible: false,
    child: Widget.Box({
      class_name: "theme",
      vertical: false,
      spacing: 20,
      children: [backgroundPillar()],
    }),
  });
}
