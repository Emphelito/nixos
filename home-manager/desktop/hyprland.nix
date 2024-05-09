{ pkgs, lib, config, ... }: {

  options = {
    desktop.hypr.enable =
      lib.mkEnableOption "enables Hyprland";
  };

  config = lib.mkIf config.desktop.hypr.enable {
    wayland.windowManager.hyprland = {
      enable = true;
    };
    home.packages = with pkgs; [
      clipman
      hyprpicker
      swww
      inputs.matugen.packages.${system}.default
      Thunar
    ];
  };
}
