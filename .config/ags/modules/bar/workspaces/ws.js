const hyprland = await Service.import("hyprland")

const dispatch = ws => hyprland.messageAsync(`dispatch workspace ${ws}`);

const Workspaces = Widget.Box({
	children: Array.from({ length: 10 }, (_, i) => i + 1).map(i => Widget.Button({
        	attribute: i,
	    	onClicked: () => dispatch(i),
	    	label: hyprland.active.workspace.bind("id").as(id => `${id === i ? "" : ""}`),	
        })),

        // remove this setup hook if you want fixed number of buttons
        setup: self => self.hook(hyprland, () => self.children.forEach(btn => {
        	btn.visible = hyprland.workspaces.some(ws => ws.id === btn.attribute);
        })),
})

export default () => Widget.EventBox({
    	class_name: "bar-workspaces",
    	on_scroll_up: () => dispatch("m+1"),
    	on_scroll_down: () => dispatch("m-1"),
    	child: Workspaces, 
})




//label: hyprland.active.workspaces.bind("id").as(id => `${id === i ? "" : ""}`),	
