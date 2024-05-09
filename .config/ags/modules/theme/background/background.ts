let Path = Utils.exec('zsh -c "echo $WALL_PATH"');
const wallPapers = Utils.exec(
  `zsh -c "find $WALL_PATH -type f -printf '%f\n'"`,
);
const wallArray = wallPapers.split("\n");

function bgBanner(bg) {
  return Widget.Box({
    class_name: "theme-banner",
    vertical: true,
    children: [
      Widget.Label({ label: `${bg}` }),
      Widget.Box({
        css:
          `min-width: 344px;` +
          `min-height: 144px;` +
          `background-image: url('${Path}/${bg}');` +
          `background-size: cover;`,
      }),
    ],
  });
}

export const backgroundPillar = () =>
  Widget.Scrollable({
    hscroll: "never",
    css: "min-height: 400px;",
    child: Widget.Box({
      class_name: "theme-bgPillar",
      vertical: true,
      children: Array.from(
        { length: wallArray.length - 1 },
        (_, i) => i + 1,
      ).map((i) =>
        Widget.Button({
          attribute: i,
          child: bgBanner(wallArray[i]),
            on_clicked: () => Utils.exec(`zsh -c "$HOME/.config/scripts/wallpaper/wallpaperSetter.sh 'dark' ${wallArray[i]}"`),
        }),
      ),
    }),
  });
