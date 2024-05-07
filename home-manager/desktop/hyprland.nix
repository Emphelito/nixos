{ pkgs, lib, inputs, config, ... }: {

  options = {
    desktop.hypr.enable =
      lib.mkEnableOption "enables Hyprland";
  };

  config = lib.mkIf config.desktop.hypr.enable {
    wayland.windowManager.hyprland = {
      enable = true;

      settings = {
        
      };
    };
  };
}
