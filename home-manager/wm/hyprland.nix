{ pkgs, lib, inputs, config, ... }: {

  options = {
    hyprMod.enable =
      lib.mkEnableOption "enables hyprMod";
  };

  config = lib mkIf config.hyprMod.enable {
    wayland.windowManager.hyprland = {
      enable = true;

      settings = {
        
      };
    };
  };
}
