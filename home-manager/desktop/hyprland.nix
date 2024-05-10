{ pkgs, lib, config, inputs, ... }: {
  imports = [
    inputs.matugen.nixosModules.default
  ];

  options = {
    desktop.hypr.enable =
      lib.mkEnableOption "enables Hyprland";
  };

  config = lib.mkIf config.desktop.hypr.enable {
    wayland.windowManager.hyprland = {
      enable = true;
      xwayland.enable = true;
      settings = {
        monitor = ",3440x1440@144Hz,auto,auto";

        input = {
          kb_layout = "us";

          follow_mouse = 1;
          sensitivity = -0.5;
        };

        general = {
          gaps_in = 5;
          gaps_out = 10;
          border_size = 2;

          layout = "dwindle";

          allow_tearing = false;

          "col.active_border" = "rgba(b4befeee)";
          "col.inactive_border" = "rgba(6c7086ee)";
        };

        misc = {
          background_color = "rgba(191724FF)";
          vrr = 2;
        };

        decoration = {
          rounding = 10;

          blur = {
            enable = true;
            size = 5;
            passes = 3;
          };

          blurls = "hyprlock";

          drop_shadow = true;
          shadow_range = 4;
          shadow_render_power = 3;
          "col.shadow" = "rgba(21202eee)";
        };

        animations = {
          enable = true;

          bezier = "myBezier, 0.05, 0.9, 0.1, 1.05";

          animation = [
            "windows, 1, 7, myBezier"
            "windowsOut, 1, 7, default, popin 80%"
            "border, 1, 10, default"
            "borderangle, 1, 8, default"
            "fade, 1, 7, default"
            # "workspaces, 1, 3, default, slidevert"
            # "workspaces, 1, 3, myBezier, slidefadevert"
            "workspaces, 1, 3, myBezier, fade"
          ];
        };

        dwindle = {
          pseudotile = true;
          preserve_split = true;
        };

        master = {
          new_is_master = true;
        };

        windowrulev2 = "suppressevent maximize, class:.*";

        "$terminal" = "kitty";
        "$browser" = "firefox";
        "$fileManager" = "thunar";
        "$menu" = "wofi";

        "$mM" = "SUPER";
        bind = [
          #Keybinds System
          "$mM ALT_L, L, exit"
          #Keybinds Programs"
          "$mM, B, exec, $browser"
          "$mM, Q, exec, $terminal"
          "$mM, F, exec, $fileManager"
          "$mM, M, exec, $menu"
          "$mM, S, exec, steam"
          "$mM, R, exec, ags -t applauncher"

          #Keybinds Reloads"
          "bind=CTRL SHIFT, R,  exec, ags -q; ags"

          #Keybinds General Window"
          "$mM, C, killactive,"
          "$mM, V, togglefloating,"
          "$mM, P, pseudo,"
          "$mM, T, togglesplit,"
          "$mM SHIFT, V, fullscreen, "

          # Keybinds Window Focus"
          "$mM, H, movefocus, l"
          "$mM, L, movefocus, r"
          "$mM, K, movefocus, u"
          "$mM, J, movefocus, d"

          #Keybinds Move Window on workspace"
          "$mM SHIFT, H, movewindow, l"
          "$mM SHIFT, L, movewindow, r"
          "$mM SHIFT, K, movewindow, u"
          "$mM SHIFT, J, movewindow, d"

          #Keybinds Change Workspace"
          "$mM, 1, workspace, 1"
          "$mM, 2, workspace, 2"
          "$mM, 3, workspace, 3"
          "$mM, 4, workspace, 4"
          "$mM, 5, workspace, 5"
          "$mM, 6, workspace, 6"
          "$mM, 7, workspace, 7"
          "$mM, 8, workspace, 8"
          "$mM, 9, workspace, 9"
          "$mM, 0, workspace, 10"

          #Keybinds Move Active to Workspace"
          "$mM SHIFT, 1, movetoworkspace, 1"
          "$mM SHIFT, 2, movetoworkspace, 2"
          "$mM SHITF, 3, movetoworkspace, 3"
          "$mM SHIFT, 4, movetoworkspace, 4"
          "$mM SHIFT, 5, movetoworkspace, 5"
          "$mM SHIFT, 6, movetoworkspace, 6"
          "$mM SHIFT, 7, movetoworkspace, 7"
          "$mM SHIFT, 8, movetoworkspace, 8"
          "$mM SHIFT, 9, movetoworkspace, 9"
          "$mM SHIFT, 0, movetoworkspace, 10"
        ];
        bindm = [
          "$mM, mouse:272, movewindow"
          "$mM, mouse:273, resizewindow"
        ];

        #env
        env = [
          "XCURSOR_SIZE,24"
        ];

        exec-once = [
            "swww-daemon --format xrgb"
            "ags &"
        ];

      };
    };
    home.packages = with pkgs; [
      clipman
      hyprpicker
      swww
      #inputs.matugen.packages.${system}.default
      hyprlock
    ];
  };
}
