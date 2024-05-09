const greetd = await Service.import("greetd");

const userName = "emph";

async function login(pw) {
    const greetd = await Service.import("greetd");
    return greetd.login(userName, pw, "Hyprland").catch((res) => {
        response.label = JSON.stringify(res);
    });
}
const username = Widget.Label({
    label: `${userName}`,
});

const password = Widget.Entry({
    on_accept: ({ text }) => {
        login(text);
    },
});

const response = Widget.Label();

const win = Widget.Window({
    css: "background-color: transparent;",
    anchor: ["top", "left", "right", "bottom"],
    setup: self => {
        password.grab_focus()
    },
    child: Widget.Box({
        vertical: true,
        hpack: "center",
        vpack: "center",
        hexpand: true,
        vexpand: true,
        children: [               
                username,
                password,
                response,
        ],
    }),
});

App.config({ windows: [win] });
