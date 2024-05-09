const { query } = await Service.import("applications")
const WINDOW_NAME = "applauncher"

/** @param {import('resource:///com/github/Aylur/ags/service/applications.js').Application} app */
const AppItem = app => Widget.Button({
    on_clicked: () => {
        App.closeWindow(WINDOW_NAME)
        app.launch()
    },
    attribute: { app },
    child: Widget.Box({
        children: [
            Widget.Icon({
                icon: app.icon_name || "",
                size: 42,
            }),
            Widget.Label({
                class_name: "title",
                label: app.name,
                xalign: 0,
                vpack: "center",
                truncate: "end",
            }),
        ],
    }),
})

const PopularAppItem = app => Widget.Button({
    on_clicked: () => {
        App.closeWindow(WINDOW_NAME)
        app.launch()
    },

    class_name: "al-papp",
    attribute: { app },
    child: Widget.Box({
        children: [
            Widget.Icon({
                icon: app.icon_name || "",
                size: 70,
            }),
        ],
    }),
})

const Applauncher = ({ width = 500, height = 300, spacing = 12 }) => {
    // list of application buttons
    const opened = Variable(false)

    let applications = query("").map(AppItem)
    let papplications = query("").map(PopularAppItem)
    papplications = papplications.slice(0, 5)
    
    // container holding the buttons
    const list = Widget.Box({
        class_name: "al-list",
        vertical: true,
        children: applications,
        spacing: 12,
    })

    const plist = Widget.Box({
        class_name: "al-plist",
        hexpand: true,
        hpack: "center",
        children: papplications,
        spacing: 50,
    })

    // repopulate the box, so the most frequent apps are on top of the list
    function repopulate() {
        applications = query("").map(AppItem)
        list.children = applications
    }


    // search entry
    const entry = Widget.Entry({
        hexpand: true,
        css: `margin-bottom: ${spacing}px;`,

        // to launch the first item on Enter
        on_accept: () => {
            // make sure we only consider visible (searched for) applications
	    const results = applications.filter((item) => item.visible);
            if (results[0] && opened) {
                App.toggleWindow(WINDOW_NAME)
                results[0].attribute.app.launch()
            }
            if (entry.text.startsWith("zsh")){
                const zshRes = entry.text.substring(4)
                App.closeWindow(WINDOW_NAME)
                Utils.exec(`zsh -c "${zshRes}"`)
            }
        },

        // filter out the list
        on_change: ({ text }) => { if(applications.filter(element => element.visible === true).length === 0)repopulate();
            applications.forEach(item => {
            item.visible = item.attribute.app.match(text ?? "")});       
            if(entry.text === "" || entry.text.startsWith("zsh")) opened.value = false;
            else opened.value = true;
        },
    })

    return Widget.Box({
        vertical: true,
        class_name: "applauncher",
        css: `margin: ${spacing * 2}px;`
        + `padding: 20px;`,
        spacing: 12,
        children: [
            entry,
            Widget.Box({

            }),
            plist,
            // wrap the list in a scrollable
            Widget.Revealer({
                revealChild: opened.bind().as(v => v ? true : false),  
                child: Widget.Scrollable({
                    class_name: "al-scroll",
                    hscroll: "never",
                    css: `min-width: ${width}px;`
                        + `min-height: ${height}px;`,
                    child: list,
                })
            }),
        ],
        setup: self => self.hook(App, (_, windowName, visible) => {
            if (windowName !== WINDOW_NAME)
                return

            // when the applauncher shows up
            if (visible) {
                opened.value = false
                //repopulate()
                //entry.text = ""
                entry.grab_focus()
                applications.forEach(item =>{
                    item.visible = false})
            }
        }),
    })
}

// there needs to be only one instance
export const applauncher = Widget.Window({
    name: WINDOW_NAME,
    css: "background-color: transparent; border-radius: 20px;",
    setup: self => self.keybind("Escape", () => {
        App.closeWindow(WINDOW_NAME)
    }),
    visible: false,
    keymode: "exclusive",
    child: Applauncher({
        width: 500,
        height: 300,
        spacing: 0,
    }),
})
